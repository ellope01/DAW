function clickarBoton() {
    let boton = document.querySelector('.btn-flotante');
    let footer = document.querySelector('.footer');

    boton.addEventListener("click", () => {
        footer.classList.toggle('activo');
        if (footer.classList.contains('activo')) {
            boton.style.backgroundColor = "red";
        } else {
            boton.style.backgroundColor = "white";
        }
    });
}

