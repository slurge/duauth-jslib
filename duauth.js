const input = document.getElementById('input');
let user = document.querySelector('.duauth-user');

let tiempoUltimoKey = null;
let agent = navigator.userAgent;
let arrayCadencia = [];
console.log(agent)
// Cancelamos el evento de paste para que la gente escriba su contraseña
input.addEventListener('paste', (evento) => evento.preventDefault());

// Usamos el evento de entrada para revisar si la entrada quedó vacia
// y si es el caso reinicializamos el array de cadencia y el tiempo de la ultima pulsación
input.addEventListener('input', (evento) => {
  if ( !input.value.trim() ) {
    tiempoUltimoKey = null;
    arrayCadencia = [];
  }
});

input.addEventListener('keydown', (evento) => {
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
  //console.log('cadencia', input.value, arrayCadencia);
  
  // console.log(diferenciaDeTiempo); // para DEBUG
  tiempoUltimoKey = tiempoActual;
});

function mandar() {
  console.log(user.value)
  var xmlhttp = new XMLHttpRequest();
  var data = {'cadencia': arrayCadencia,
                'agent' : agent,
                'token' : '000001',
                 'user' : user.value};
  xmlhttp.open('POST','http://localhost/duat/aber/aberapi', true);
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.send(JSON.stringify(data));
  console.log(xmlhttp);
  //console.log('cadencia', input.value, arrayCadencia); 
}