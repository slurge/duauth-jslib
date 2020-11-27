const user = document.querySelector('.duauth-user');
const pass_input = document.querySelector('.duauth-pass');
const login_form = document.querySelector('.duauth-form')

let tiempoUltimoKey = null;
let agent = navigator.userAgent;
let arrayCadencia = [];
pass_input.addEventListener('paste', (evento) => evento.preventDefault());
login_form.addEventListener('submit', function(evento){ evento.preventDefault(); mandar(); });
pass_input.addEventListener('input', (evento) => {
  if ( !pass_input.value.trim() ) {
    tiempoUltimoKey = null;
    arrayCadencia = [];
  }
});

pass_input.addEventListener('keydown', (evento) => {
  if ( evento.key == 'Backspace' || evento.key == 'Delete' ) { return; }
  const tiempoActual = new Date().getTime();
  if ( !tiempoUltimoKey ) {
    tiempoUltimoKey = tiempoActual;
    return;
  }
  const diferenciaDeTiempo = tiempoActual - tiempoUltimoKey;
  arrayCadencia.push(diferenciaDeTiempo);
  tiempoUltimoKey = tiempoActual;
});

function mandar() {
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
  xmlhttp.onload = function(){
    let aber = JSON.parse(xmlhttp.response);
    alert((aber['response'] == 1 ? 'Usuario verificado' : 'Usuario ilegítimo'));
  }
  login_form.submit(); 
}