const user = document.querySelector('.duauth-user');
const pass_input = document.querySelector('.duauth-pass');
const login_form = document.querySelector('.duauth-form')

let tiempoUltimoKey = null;
let agent = navigator.userAgent;
let arrayCadencia = [];
console.log(agent)
// Cancelamos el evento de paste para que la gente escriba su contraseña
pass_input.addEventListener('paste', (evento) => evento.preventDefault());

//cancelamos tambien el envio de formulario por defecto, para realizar la captura
login_form.addEventListener('submit', function(evento){ evento.preventDefault(); mandar(); });

// Usamos el evento de entrada para revisar si la entrada quedó vacia
// y si es el caso reinicializamos el array de cadencia y el tiempo de la ultima pulsación
pass_input.addEventListener('input', (evento) => {
  if ( !pass_input.value.trim() ) {
    tiempoUltimoKey = null;
    arrayCadencia = [];
  }
});

pass_input.addEventListener('keydown', (evento) => {
  // Evitamos las teclas de borrado
  if ( evento.key == 'Backspace' || evento.key == 'Delete' ) { return; }
  
  // Obtiene el tiempo POSIX cuando se activó el evento
  // ej: 1605560449327 (2020-11-16T21:00:49.327Z)
  const tiempoActual = new Date().getTime();
  
  // Si no se ha definido un ultimo tiempo, setteamos y terminamos
  // la funcion, porque no hay nada para comparar
  if ( !tiempoUltimoKey ) {
    tiempoUltimoKey = tiempoActual;
    return;
  }
  
  // Hacemos algo con la diferencia de tiempo
  const diferenciaDeTiempo = tiempoActual - tiempoUltimoKey;
  arrayCadencia.push(diferenciaDeTiempo);
  //console.log('cadencia', pass_input.value, arrayCadencia);
  
  // console.log(diferenciaDeTiempo); // para DEBUG
  tiempoUltimoKey = tiempoActual;
});

function mandar() {
  console.log(user.value)
  var xmlhttp = new XMLHttpRequest();
  var data = {
    'cadencia': arrayCadencia,
    'agent' : agent,
    'token' : '50e3a98aa53216d4c6faf15a9b250061851caef33be7e5a7a7bef961ce2cefcf',
     'user' : user.value
    };
  xmlhttp.open('POST','http://duat.test/api/aberapi', true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify(data));

  login_form.submit();
  
  //debug log, quitar pls
  xmlhttp.onload = function(){
    console.log(xmlhttp.response)
  }
  console.log(xmlhttp);
  //console.log('cadencia', pass_input.value, arrayCadencia); 
}