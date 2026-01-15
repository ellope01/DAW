function redimensionaBarra() {
	if (!medio.ended) {
		var total = parseInt(medio.currentTime * maximo / medio.duration);
		progreso.style.width = total + 'px';
	}
	else {
		progreso.style.width = '0px';
		play.value = '\u25BA';
		window.clearInterval(bucle);
	}
}

function desplazarMedio(e) {
	if (!medio.paused && !medio.ended) {
		var ratonX = e.pageX - barra.offsetLeft;
		var nuevoTiempo = ratonX * medio.duration / maximo;
		medio.currentTime = nuevoTiempo;
		progreso.style.width = ratonX + 'px';
	}
}

function accionPlay() {
	if (!medio.paused && !medio.ended) {
		medio.pause();
		play.value = '\u25BA';
		window.clearInterval(bucle);
	}
	else {
		medio.play();
		play.value = '||';
		bucle = setInterval(redimensionaBarra, 1000);
	}
}


function iniciar() {
	maximo = 700;

	medio = document.getElementById('medio');
	barra = document.getElementById('barra');
	progreso = document.getElementById('progreso');
	play = document.getElementById('play');
	adelantar = document.getElementById('adelantar');
	adelantar = document.getElementById('adelantar');
	retrasar = document.getElementById('retrasar');
	reiniciar = document.getElementById('reiniciar');
	silenciar = document.getElementById('silenciar');
	menosVolumen = document.getElementById('menosVolumen');
	masVolumen = document.getElementById('masVolumen');
	/* obtener los objetos del resto de elementos necesarios */

	play.addEventListener('click', accionPlay, false);
	adelantar.addEventListener('click', adelantarFun, false);
	retrasar.addEventListener('click', retrasarFun, false);
	reiniciar.addEventListener('click', reiniciarFun, false);
	silenciar.addEventListener('click', silenciarFun, false);
	menosVolumen.addEventListener('click', menosVolumenFun, false);
	masVolumen.addEventListener('click', masVolumenFun, false);
	/* crear los manejadores de eventos para el resto de botones */

	barra.addEventListener('click', desplazarMedio, false);
}


function adelantarFun() {
	if (!medio.ended && !medio.paused) {
		medio.currentTime += 5
	}
}

function retrasarFun() {
	if (!medio.ended && !medio.paused) {
		medio.currentTime -= 5
	}
}

function reiniciarFun() {
	if (!medio.ended && !medio.paused) {
		medio.currentTime = 0
	}
}


function silenciarFun() {
	if (!medio.paused && !medio.ended && !medio.muted) {
		medio.muted = true;
		silenciar.value = 'sonido';
	} else {
		medio.muted = false;
		silenciar.value = 'escuchar';
	}

}


function menosVolumenFun() {
	if (!medio.ended && !medio.paused) {
		medio.volume -= 0.1
		console.log(medio.volume)
	}
}

function masVolumenFun() {
	if (!medio.ended && !medio.paused) {
		medio.volume += 0.1
		console.log(medio.volume)
	}
}


window.addEventListener('load', iniciar, false);