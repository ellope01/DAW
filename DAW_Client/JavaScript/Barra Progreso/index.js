function barraPorcentaje(){
    const porcentaje = document.querySelector('.contenedor .contador');
    console.log(porcentaje);

    for(let i=0; i<100;i++){
        porcentaje.textContent = porcentaje
        porcentaje ++;
    }

}