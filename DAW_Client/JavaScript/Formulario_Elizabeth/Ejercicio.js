const formulario = document.querySelector('#formulario');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnEnviar = formulario.querySelector('button[type="submit"]');
const btnReset = formulario.querySelector('button[type="reset"]');
const spinnerContenedor = document.querySelector('#spinner');
const datos = {
    email: '',
    asunto: '',
    mensaje: ''
};


email.addEventListener('input', function (e) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const valor = e.target.value.trim();
    if (valor !== '' && regex.test(valor)) {
        datos.email = valor; // guardamos el valor válido
        mostrarError(true, e.target, "EMAIL");
    } else {
        datos.email = ''; // cadena vacía si no es válido
        mostrarError(false, e.target, "EMAIL");
    }
    comprobrarEnvio();
});

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

btnReset.addEventListener('click', function () {

    email.value = '';
    asunto.value = '';
    mensaje.value = '';

    const mensajeError = document.querySelectorAll('.error');
    mensajeError.forEach(error => error.remove());
});



formulario.addEventListener('submit', function (e) {
    e.preventDefault();

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
    setTimeout(() => {

        spinnerContenedor.classList.add('hidden');
        spinnerContenedor.innerHTML = '';

        formulario.reset();
        btnEnviar.disabled = true;
        btnEnviar.classList.add('opacity-50');

        document.querySelectorAll('.error').forEach(err => err.remove());
        const exito = document.createElement('div');
        exito.textContent = 'Mensaje enviado correctamente';
        exito.classList.add('exito', 'text-center', 'mt-4', 'p-3', 'rounded');
        exito.style.backgroundColor = '#16a34a';
        exito.style.color = 'white';
        formulario.appendChild(exito);
        
    
        setTimeout(() => exito.remove(), 7000);
        
    }, 2000)
})

function mostrarError(texto, input, campo) {
    const errorExistente = input.parentElement.querySelector('.error');

    if (!texto) {
        if (!errorExistente) {
            let mensajeError = document.createElement('div');
            mensajeError.classList.add('bg-red-600', 'text-white', 'error', 'p-2', 'text-center');
            mensajeError.textContent = `El campo ${campo} NO es válido`;
            input.parentElement.appendChild(mensajeError);
        }
    } else {
        if (errorExistente) errorExistente.remove();
    }
}


function comprobrarEnvio() {
    if (datos.asunto && datos.mensaje && datos.email) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('opacity-50');
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('opacity-50')
    }
}