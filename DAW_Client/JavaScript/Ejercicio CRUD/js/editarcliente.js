/*EDITAR UN REGISTRO:
  Todo lo relacionado con las dos fases de la edición
*/
const formulario = document.querySelector('#formulario');
const nombreCliente = formulario.querySelector('#nombre');
const correoCliente = formulario.querySelector('#email');
const telefonoCliente = formulario.querySelector('#telefono');
const empresaCliente = formulario.querySelector('#empresa');
const btnGuardarCambios = formulario.querySelector('input[type=submit]');


const parametrosURL = new URLSearchParams(windos.location.search);
const idCliente = parseInt(parametrosURL.get('id'));