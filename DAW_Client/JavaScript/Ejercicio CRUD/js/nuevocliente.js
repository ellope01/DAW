//todo lo relacionado con la validación y llamada a función conexión API


const formulario = document.querySelector('#formulario');
const nombreCliente = formulario.querySelector('#nombre');
const correoCliente = formulario.querySelector('#email');
const telefonoCliente = formulario.querySelector('#telefono');
const empresaCliente = formulario.querySelector('#empresa');
const btnagragarCliente = formulario.querySelector('input[type=submit]');

//llamar a la funcion comprobar campos

//llamar a la funcion de enseñar error

async function agregarCliente() {
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-type': 'application/json'
            }
        });

        return respuesta;
    } catch (error) {
        console.log('Error! Fallo al conectar con la base de datos');
        return ('Error! Fallo al conectar con la base de datos');
    }
}

btnagragarCliente.addEventListener('submit', e => {
    e.preventDefault();

    error = comprobarCampos()
    if (typeof error === String) {
        mensajeError(error);
    } else {
        agregarCliente();
    }
})