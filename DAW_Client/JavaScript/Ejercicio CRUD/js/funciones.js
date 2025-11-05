//funciones generales que pueden servir para varios ficheros

function comprobarCampos() {
    if (nombreCliente.value === null || correoCliente.value === null || telefonoCliente.value === null || empresaCliente.value === null) {
        mensaje = 'Error! Todos los campos son obligatorios';
        return (mensaje);
    } else {
        return true
    }
};
