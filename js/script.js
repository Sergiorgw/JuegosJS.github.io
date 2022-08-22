document.getElementById('player').addEventListener("mouseover",sumarPuntos);

const nombre = prompt("Ingrese nombre de Jugador")
let puntos = 0;
let necesarios = 10;
let tiempo = 35;
// suma de puntos
function sumarPuntos(){
   puntos++;
   document.getElementById("puntos").innerHTML = "Puntos: <b>" + puntos + "/" + necesarios + "  </b>";
   randNum =  Math.round(Math.random()*500);
   randNum2 =  Math.round(Math.random()*500);
   document.getElementById("player").style.marginTop =randNum + "px";
   document.getElementById("player").style.marginLeft =randNum2 + "px";
   if (puntos == 10) {
      Swal.fire(
         'Buen trabajo!',
         'GANASTE ' + nombre,
         'success'
      );
   }
}
// restar tiempo
function restarTiempo() {
	tiempo--;
	document.getElementById("tiempo").innerHTML = "&nbsp;&nbsp;&nbsp;Tiempo: "+tiempo; 
	if (tiempo == 0) {
      Swal.fire({
         icon: 'error',
         title: 'Perdiste...',
         text: 'Lo siento pero perdiste 😥'
      });
		tiempo = 0;
		puntos = 0;
	}
}

setInterval(restarTiempo,1000);

document.getElementById("crear").addEventListener("click", crear);
document.getElementById("mostrar").addEventListener("click", mostrar);
document.getElementById("eliminar").addEventListener("click", eliminar);

function crear(){
   localStorage.setItem("puntaje", "10");
}

function mostrar() {
   Swal.fire
   (localStorage.getItem("puntaje"));
}

function eliminar(){
   localStorage.removeItem("puntaje");
}