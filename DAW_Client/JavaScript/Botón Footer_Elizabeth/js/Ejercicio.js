//funcion para el boton y footer
function clickarBoton() {
    //seleccionamos el boton y el footer del documento
    let boton = document.querySelector('.btn-flotante');
    let footer = document.querySelector('.footer');

    //añadimos un evento que al hacer click
    //activamos y desactivamos el footer 
    //y cambiamos el color de rojo a blanco
    boton.addEventListener("click", () => {
        footer.classList.toggle('activo');
        if (footer.classList.contains('activo')) {
            boton.style.backgroundColor = "red";
        } else { 
            boton.style.backgroundColor = "white";
        }
    });
}

