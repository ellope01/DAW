function barraPorcentaje() {
    //seleccionamos los elementos que queremos modificar
    const porcentaje = document.querySelector('.contenedor .contador');
    const barraColor = document.querySelector('.contenedor .barraFront')
    let valor = 0

    //creamos un intervalo que se ejecuta cada 800 segundos
    const intervalo = setInterval(() => {
        valor++;
        //actualizamos el contenido de porcentaje y de la barra de color
        porcentaje.textContent = valor + '%'
        barraColor.style.width = valor + "%";

        //cuando el valor(contador) llega a 100 deja de contar
        if (valor >= 100) {
            clearInterval(intervalo);
        }
    }, 800);
}