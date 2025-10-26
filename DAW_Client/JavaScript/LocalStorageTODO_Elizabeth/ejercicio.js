const formulario = document.querySelector('#formulario');
const btnAgregar = formulario.querySelector('input[type=submit]');
const divListaTareas = document.querySelector('#lista-tareas');

let listaTareas = JSON.parse(localStorage.getItem('tareas')) || [];

function validarTareas(errorTarea) {
    if (errorTarea.length >= 31) {
        return "La tarea es demasiado larga ...";
    } else if (errorTarea.trim() === "") {
        return "No has puesto ninguna tarea ...";
    } else if (listaTareas.some(ele => ele === errorTarea.toUpperCase())) {
        return "Tareas duplicadas";
    }
    return null;
}

function mostrarMensajeError(mensaje) {
    if (mensaje !== null && !document.querySelector('.error')) {
        const divMensj = document.createElement('div');
        divMensj.classList.add('error');
        divMensj.textContent = mensaje;
        document.querySelector('#contenido').appendChild(divMensj);
        setTimeout(() => divMensj.remove(), 1900);
    }
}


function agregarTarea(mensajeTarea, errorTarea) {
    if (errorTarea === null) {
        listaTareas.push(mensajeTarea.toUpperCase());
        localStorage.setItem('tareas', JSON.stringify(listaTareas)); 
        console.log(listaTareas);
    }
}

function mostrarListaTareas() {
    divListaTareas.innerHTML = ""; 
    listaTareas.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = tarea;

        const span = document.createElement('span');
        span.textContent = 'X';
        span.classList.add('borrar-tarea');

        li.appendChild(span);
        divListaTareas.appendChild(li);
    });
}

function eliminarTareas() {
    divListaTareas.addEventListener('click', function(e){
        if (e.target.classList.contains('borrar-tarea')) {
            const tareaTexto = e.target.parentElement.firstChild.textContent;
            const indice = listaTareas.indexOf(tareaTexto);
            if (indice !== -1) {
                listaTareas.splice(indice, 1);
                localStorage.setItem('tareas', JSON.stringify(listaTareas));
                mostrarListaTareas();
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    mostrarListaTareas();

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        const tarea = formulario.querySelector('#tarea').value;
        const mensaje = validarTareas(tarea);
        mostrarMensajeError(mensaje);
        agregarTarea(tarea, mensaje);
        mostrarListaTareas();
        formulario.reset(); 
    });
    
    eliminarTareas();
});
