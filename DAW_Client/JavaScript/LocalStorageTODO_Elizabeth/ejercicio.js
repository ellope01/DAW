const formulario = document.querySelector('#formulario');
const btnAgregar = formulario.querySelector('input[type=submit]');

const listaTareas = [];

function validarTareas() {
    const tarea = formulario.querySelector('#tarea').value;
    if (tarea.length >= 31) {
        return "La tarea es demasiado larga ...";
    } else if (tarea === "") {
        return "No has puesto ninguna tarea ...";
    }
    return null;
}

function mostrarMensajeError(mensaje) {
    if (mensaje !== null) {
        const divMensj = document.createElement('div');
        divMensj.classList.add('error');

        divMensj.textContent = mensaje;
        document.querySelector('#contenido').appendChild(divMensj);
        setTimeout(() => divMensj.remove(), 1500);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        const mensaje = validarTareas();
        mostrarMensajeError(mensaje);
        
    })
});