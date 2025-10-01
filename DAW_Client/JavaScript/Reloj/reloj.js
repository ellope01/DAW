function mostrarReloj() {
    const hora = document.querySelector('#hora');
    const fecha = document.getElementById('fecha')
    hora.parentElement.classList.toggle('.animar');
    
    borde.classList.toggle(".animar");
    let date = new Date();

    dateFecha = date.toDateString()
    dateHora = date.toLocaleDateString()

    fecha.textContent = dateFecha;
    hora.textContent = dateHora;
}