
const formulario = document.querySelector('#formulario');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnEnviar = formulario.querySelector('button[type="submit"]');
const btnReset = formulario.querySelector('button[type="reset"]');
const spinnerContenedor = document.querySelector('#spinner');

//Objeto que guarda los datos del formulario
const datos = {
    email: '',
    asunto: '',
    mensaje: ''
};

//Validacion del email
email.addEventListener('input', function (e) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const valor = e.target.value.trim(); //elimianr espacios principio y final
    if (valor !== '' && regex.test(valor)) {
        datos.email = valor; // guardamos el valor válido
        mostrarError(true, e.target, "EMAIL");
    } else {
        datos.email = ''; // cadena vacía si no es válido
        mostrarError(false, e.target, "EMAIL");
    }
    comprobrarEnvio();
});

//validacion asunto
asunto.addEventListener('input', function (e) {
    const valor = e.target.value.trim();
    if (valor !== '') {
        datos.asunto = valor;
        mostrarError(true, e.target, "ASUNTO");
    } else {
        datos.asunto = '';
        mostrarError(false, e.target, "ASUNTO");
    }
    comprobrarEnvio();
});

//validacion mensaje
mensaje.addEventListener('input', function (e) {
    const valor = e.target.value.trim();
    if (valor !== '') {
        datos.mensaje = valor;
        mostrarError(true, e.target, "MENSAJE");
    } else {
        datos.mensaje = '';
        mostrarError(false, e.target, "MENSAJE");
    }
    comprobrarEnvio();
});

//boton reset
btnReset.addEventListener('click', function () {
    //ponemos los campos vacios
    email.value = '';
    asunto.value = '';
    mensaje.value = '';

    //eliminamos los mensajes de error
    const mensajeError = document.querySelectorAll('.error');
    mensajeError.forEach(error => error.remove());
});


//envio formulario
formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    //mostramos el spinner
    spinnerContenedor.classList.remove('hidden');
    spinnerContenedor.classList.add('flex', 'justify-center', 'mt-10');
    spinnerContenedor.innerHTML = `
        <div class="sk-chase">
            <div class="sk-chase-dot bg-orange-500"></div>
            <div class="sk-chase-dot bg-orange-500"></div>
            <div class="sk-chase-dot bg-orange-500"></div>
            <div class="sk-chase-dot bg-orange-500"></div>
            <div class="sk-chase-dot bg-orange-500"></div>
            <div class="sk-chase-dot bg-orange-500"></div>
        </div>
    `;
    //mostramos el spinner 4 segundos y lo eliminamos
    setTimeout(() => {
        //ocultamos el spinner
        spinnerContenedor.classList.add('hidden');
        spinnerContenedor.innerHTML = '';

        //reseteamos el formulario
        formulario.reset();
        btnEnviar.disabled = true;
        btnEnviar.classList.add('opacity-50');

        document.querySelectorAll('.error').forEach(err => err.remove());
        
        //mostramos mensaje
        const exito = document.createElement('div');
        exito.textContent = 'Mensaje enviado correctamente';
        exito.classList.add('exito', 'text-center', 'mt-4', 'p-3', 'rounded');
        exito.style.backgroundColor = '#16a34a';
        exito.style.color = 'white';
        formulario.appendChild(exito);
        
        //mostramos el mensaje 6 segundos y lo eliminamos
        setTimeout(() => exito.remove(), 6000);
        
    }, 4000)
})

//funcion para mostrar errores
function mostrarError(texto, input, campo) {
    const errorExistente = input.parentElement.querySelector('.error');

    //si el campo no es valido y no existe error previo, lo creamos
    if (!texto) {
        if (!errorExistente) {
            let mensajeError = document.createElement('div');
            mensajeError.classList.add('bg-red-600', 'text-white', 'error', 'p-2', 'text-center');
            mensajeError.textContent = `El campo ${campo} NO es válido`;
            input.parentElement.appendChild(mensajeError);
        }
    } else {
        //si el campo es valido y hay un error, lo eliminamos
        if (errorExistente) errorExistente.remove();
    }
}

//funcion para manejar boton enviar
function comprobrarEnvio() {
    if (datos.asunto && datos.mensaje && datos.email) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('opacity-50'); //lo activamos
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('opacity-50') //lo desactivamos
    }
}