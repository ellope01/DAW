const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');

const registrosPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

formulario.addEventListener('submit', e => {
    e.preventDefault();

    const termino = document.querySelector('#termino').value.trim();

    if (termino === '') {
        mostrarAlerta('Por favor, escribe un término de búsqueda.');
        return;
    }

    paginaActual = 1;
    buscarImagenes(termino);
});

async function buscarImagenes(termino) {
    const key = '53100998-b8f586c7c819adaf722182ca2';
    const url = `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(
        termino
    )}&per_page=${registrosPorPagina}&page=${paginaActual}`;

    try {
        const respuesta = await fetch(url);
        const resultadoAPI = await respuesta.json();

        totalPaginas = calcularPaginas(resultadoAPI.totalHits);
        mostrarImagenes(resultadoAPI.hits);
    } catch (error) {
        console.error('Error al obtener imágenes:', error);
        mostrarAlerta('Error al conectar con la API de Pixabay.');
    }
}

function calcularPaginas(total) {
    return Math.ceil(total / registrosPorPagina);
}

function mostrarImagenes(imagenes) {
    limpiarHTML(resultado);
    limpiarHTML(paginacionDiv);

    if (imagenes.length === 0) {
        mostrarAlerta('No se han encontrado resultados.');
        return;
    }

    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 mb-4 p-3">
                <div class="bg-white rounded shadow">
                    <img class="w-full" src="${previewURL}" alt="Imagen Pixabay">
                    <div class="p-4">
                        <p class="font-bold">Likes: <span class="font-light">${likes}</span></p>
                        <p class="font-bold">Vistas: <span class="font-light">${views}</span></p>
                        <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                            href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                            Ver Imagen (Alta Resolución)
                        </a>
                    </div>
                </div>
            </div>
        `;
    });

    imprimirPaginador();
}

function limpiarHTML(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function mostrarAlerta(mensaje) {
    const alertaExistente = document.querySelector('.alerta');
    if (alertaExistente) return;

    const alerta = document.createElement('p');
    alerta.className =
        'alerta bg-red-500 text-white p-3 text-center rounded mt-5';
    alerta.textContent = mensaje;

    formulario.appendChild(alerta);
    setTimeout(() => alerta.remove(), 3000);
}

function* crearPaginador(total) {
    for (let i = 1; i <= total; i++) {
        yield i;
    }
}

function imprimirPaginador() {
    iterador = crearPaginador(totalPaginas);

    while (true) {
        const { value, done } = iterador.next();
        if (done) return;

        const boton = document.createElement('button');
        boton.textContent = value;
        boton.classList =
            'siguiente bg-yellow-400 px-4 py-1 mr-2 font-bold mb-4 rounded';
        boton.dataset.pagina = value;

        boton.onclick = () => {
            paginaActual = value;
            const termino = document.querySelector('#termino').value;
            buscarImagenes(termino);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        paginacionDiv.appendChild(boton);
    }
}
