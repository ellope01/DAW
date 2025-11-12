// Selección de elementos del DOM
const formulario = document.querySelector('#formulario');
const mesa = document.querySelector('#mesa');
const hora = document.querySelector('#hora');
const btnCrearOrden = document.querySelector('#guardar-cliente');
const modalFormulario = document.querySelector('#formulario');
const url = 'http://localhost:3000/platillos';

const seccionPlatillos = document.querySelector('#platillos');
const seccionResumen = document.querySelector('#resumen');
const contenedorPlatillos = document.querySelector('#platillos .contenido');
const contenedorResumen = document.querySelector('#resumen .contenido');

// Objeto para almacenar la orden del cliente
const orden = {
    mesa: '',
    hora: '',
    platillos: []
};


function comprobarCampos() {
    const mesaSeleccionada = mesa.value.trim();
    const horaSeleccionada = hora.value.trim();

    if (mesaSeleccionada === "" || horaSeleccionada === "") {
        mostrarErrores("Todos los campos son obligatorios");
        return false;
    }

    // Guardar datos en la orden
    orden.mesa = mesaSeleccionada;
    orden.hora = horaSeleccionada;
    return true;
}

function mostrarErrores(mensaje) {
    const errorExistente = document.querySelector('.error');
    if (errorExistente) errorExistente.remove();

    const error = document.createElement('div');
    error.classList.add('invalid-feedback', 'd-block', 'text-center', 'error');
    error.textContent = mensaje;

    formulario.querySelector('.modal-body').appendChild(error);

    setTimeout(() => error.remove(), 1500);
}


const obtenerPlatillos = async () => {
    try {
        const resultado = await fetch(url);
        const platillos = await resultado.json();
        return platillos;
    } catch (error) {
        console.error("Error al obtener los platillos:", error);
        mostrarErrores("Error al cargar los platillos");
    }
};


async function mostrarPlatillos() {
    const platos = await obtenerPlatillos();
    contenedorPlatillos.innerHTML = "";

    platos.forEach(platillo => {
        const { id, nombre, precio, categoria } = platillo;
        const categorias = ["Vacío", "Comida", "Bebida", "Postre"];
        const tipo = categorias[categoria] || "Desconocido";

        // Crear contenedor de cada platillo
        const row = document.createElement('div');
        row.classList.add('row', 'py-3', 'border-top', 'align-items-center');

        // Nombre del platillo
        const nombreDiv = document.createElement('div');
        nombreDiv.classList.add('col-md-4');
        nombreDiv.textContent = nombre;

        // Precio
        const precioDiv = document.createElement('div');
        precioDiv.classList.add('col-md-3', 'fw-bold');
        precioDiv.textContent = `${precio} $`;

        // Categoría
        const categoriaDiv = document.createElement('div');
        categoriaDiv.classList.add('col-md-3');
        categoriaDiv.textContent = tipo;

        // Input de cantidad
        const cantidadDiv = document.createElement('div');
        cantidadDiv.classList.add('col-md-2');
        const inputCantidad = document.createElement('input');
        inputCantidad.classList.add('form-control');

        inputCantidad.addEventListener('input', () => actualizarCantidad(id, nombre, precio, inputCantidad.value));

        cantidadDiv.appendChild(inputCantidad);

        row.appendChild(nombreDiv);
        row.appendChild(precioDiv);
        row.appendChild(categoriaDiv);
        row.appendChild(cantidadDiv);

        contenedorPlatillos.appendChild(row);
    });

    // Mostrar secciones ocultas
    seccionPlatillos.classList.remove('d-none');
    seccionResumen.classList.remove('d-none');
}


function actualizarCantidad(id, nombre, precio, cantidad) {
    cantidad = parseInt(cantidad);

    // Buscar si ya existe el platillo en la orden
    const existe = orden.platillos.find(item => item.id === id);

    if (cantidad > 0) {
        if (existe) {
            existe.cantidad = cantidad;
        } else {
            orden.platillos.push({ id, nombre, precio, cantidad });
        }
    } else {
        // Si la cantidad es 0, eliminar del array
        orden.platillos = orden.platillos.filter(item => item.id !== id);
    }

    mostrarConsumo();
}

function mostrarConsumo() {
    contenedorResumen.innerHTML = "";


    const titulo = document.createElement('h3');
    titulo.classList.add('my-4', 'text-center');
    titulo.textContent = 'Consumicion';
    contenedorResumen.appendChild(titulo);

    // Datos mesa y hora
    const info = document.createElement('p');
    info.classList.add('text-center');
    info.innerHTML = `<strong>Mesa:</strong> ${orden.mesa} &nbsp;&nbsp; <strong>Hora:</strong> ${orden.hora}`;
    contenedorResumen.appendChild(info);

    // Lista de consumiciones
    const lista = document.createElement('ul');
    lista.classList.add('list-group', 'my-4');

    let totalGeneral = 0;

    orden.platillos.forEach(item => {
        const total = item.precio * item.cantidad;
        totalGeneral += total;

        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            <div>
                <p class="fw-bold mb-1">${item.nombre}</p>
                <small>Cantidad: ${item.cantidad}</small>
            </div>
            <span>${total.toFixed(2)} $</span>
        `;
        lista.appendChild(li);
    });

    contenedorResumen.appendChild(lista);

    // Total final
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('text-end', 'fw-bold', 'mt-3');
    totalDiv.textContent = `Total a pagar: ${totalGeneral.toFixed(2)} $`;
    contenedorResumen.appendChild(totalDiv);
}

btnCrearOrden.addEventListener('click', () => {
    if (!comprobarCampos()) return;

    // Ocultar modal (Bootstrap 5)
    const modal = bootstrap.Modal.getInstance(modalFormulario);
    modal.hide();

    // Mostrar platillos
    mostrarPlatillos();
});
