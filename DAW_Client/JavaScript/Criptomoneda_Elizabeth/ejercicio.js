const campoCriptomoneda = document.querySelector("#criptomonedas");
const campoMoneda = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const contenedorResultado = document.querySelector('#resultado');

function comprobarCampos() {
    const monedaSeleccionada = campoMoneda.value;
    const criptoSeleccionada = campoCriptomoneda.value;

    if (monedaSeleccionada === "" || criptoSeleccionada === "") {
        mostrarErrores("AMBOS CAMPOS SON OBLIGATORIOS");
        return false;
    }
    return true;
}

function mostrarErrores(mensaje) {
    const errorExistente = document.querySelector('.error');
    if (errorExistente) errorExistente.remove();

    const error = document.createElement('div');
    error.classList.add('error');
    error.textContent = mensaje;

    const contenedorResultados = document.querySelector('#resultado');
    formulario.insertBefore(error, contenedorResultados);

    setTimeout(() => error.remove(), 2000);
}

async function obtenerNombreCriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const resultado = [];
        for (let i = 0; i < datos.Data.length; i++) {
            const { FullName, Name } = datos.Data[i].CoinInfo;
            resultado.push({ nombre: FullName, codigo: Name });
        }
        return resultado;
    } catch (error) {
        mostrarErrores("Error al cargar criptomonedas");
        console.log(error);
    }
}

async function mostrarCriptomoneda() {
    const criptos = await obtenerNombreCriptomonedas();
    criptos.forEach(cripto => {
        const option = document.createElement('option');
        option.value = cripto.codigo;
        option.textContent = cripto.nombre;
        campoCriptomoneda.appendChild(option);
    });
}

async function obtenerDatosCriptomoneda(moneda, cripto) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        const info = datos.DISPLAY[cripto][moneda];

        return {
            precio: info.PRICE,
            highday: info.HIGHDAY,
            lowday: info.LOWDAY,
            cambio24h: info.CHANGEPCT24HOUR,
            ultimaActualizacion: info.LASTUPDATE
        };
    } catch (error) {
        mostrarErrores("Error al obtener datos de la criptomoneda");
        console.log(error);
    }
}

function mostrarResultado(resultado) {
    contenedorResultado.innerHTML = "";

    const infoHTML = `
        <p>Precio: ${resultado.precio}</p>
        <p>Precio más alto del día: ${resultado.highday}</p>
        <p>Precio más bajo del día: ${resultado.lowday}</p>
        <p>Cambio últimas 24h: ${resultado.cambio24h}%</p>
        <p>Última actualización: ${resultado.ultimaActualizacion}</p>
    `;

    contenedorResultado.innerHTML = infoHTML;
}

document.addEventListener('DOMContentLoaded', mostrarCriptomoneda);

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (comprobarCampos()) {
        const monedaSeleccionada = campoMoneda.value;
        const criptoSeleccionada = campoCriptomoneda.value;

        const resultado = await obtenerDatosCriptomoneda(monedaSeleccionada, criptoSeleccionada);
        mostrarResultado(resultado);
    }
});
