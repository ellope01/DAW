//todo lo relacionado con la validación y llamada a función conexión API
const formulario = document.querySelector('#formulario');
const nombreCliente = formulario.querySelector('#nombre');
const correoCliente = formulario.querySelector('#email');
const telefonoCliente = formulario.querySelector('#telefono');
const empresaCliente = formulario.querySelector('#empresa');
const btnagragarCliente = formulario.querySelector('input[type=submit]');

function comprobarCampos() {
    if(nombreCliente.value === null || correoCliente.value === null || telefonoCliente.value === null || empresaCliente.value === null){
        mensaje = 'Error! Todos los campos son obligatorios';
        return(mensaje);
    }else{
        return true
    }
};

function mensajeError(mensaje) {

};

async function agregarCliente() {
    try {

        const respuesta = await fetch(url,{
            method : 'POST',
            body: JSON.stringify(cliente),
            headers:{
                'Content-type' : 'application/json'
            }
        });

        return respuesta;
    } catch (error) {
        console.log('Error al agregar cliente');
    }
}

btnagragarCliente.addEventListener('submit', e => {
    e.preventDefault();

    error = comprobarCampos()
    if(typeof error === String){
        mensajeError(error);
    }else{
        agregarCliente();
    }
})