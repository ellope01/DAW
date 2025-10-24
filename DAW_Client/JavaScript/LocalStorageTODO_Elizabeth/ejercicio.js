const formulario = document.querySelector('#formulario');
const btnAgregar = formulario.querySelector('input[type=submit]');
const divListaTareas = document.querySelector('#lista-tareas');

const listaTareas = [];

function validarTareas(errorTarea) {
    if (errorTarea.length >= 31) {
        return "La tarea es demasiado larga ...";
    } else if (errorTarea === "") {
        return "No has puesto ninguna tarea ...";
    } else if (listaTareas.some(ele => ele.includes(errorTarea.toUpperCase()))) {
        return "Tareas duplicadas"
    }
    return null;
}

function mostrarMensajeError(mensaje) {
    if (mensaje !== null) {
        const divMensj = document.createElement('div');
        divMensj.classList.add('error'); //ponemos el css ya creado

        divMensj.textContent = mensaje;
        document.querySelector('#contenido').appendChild(divMensj); //para que se fuarde al final
        setTimeout(() => divMensj.remove(), 1900); //dejamos un tiempo de 1900 milisegundos y luego borramos el mensaje
    }
}


//funcion para agregar tareas a las listas 
function agregarTarea(mensajeTarea, errorTarea) {
    if (errorTarea === null) {
        console.log('entra null')
        listaTareas.push(mensajeTarea.toUpperCase());
        console.log(listaTareas);
    }else {
        console.log('entra else')
    }

}

//funcion para mostrar la lista de tareas
function mostrarListaTareas() {

}

//funcion mara eliminar las tareas
function eliminarTareas() {

}


document.addEventListener('DOMContentLoaded', function () {
    formulario.addEventListener('submit', function (e) {
        const tarea = formulario.querySelector('#tarea').value;
        e.preventDefault();
        const mensaje = validarTareas(tarea);
        mostrarMensajeError(mensaje);
        agregarTarea(tarea, mensaje)
    })
});