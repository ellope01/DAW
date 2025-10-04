function mostrarReloj() {
    const hora = document.querySelector('#hora');
    let opcionesHora = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Europe/Madrid'
    };
    let opcionesFecha = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    };

    const fecha = document.getElementById('fecha');

    let date = new Date();

    dateFecha = date.toLocaleDateString('es-ES', { ...opcionesFecha, timeZone: 'Europe/Madrid' });

    dateHora = date.toLocaleTimeString('es-ES', opcionesHora);


    fecha.textContent = dateFecha;
    hora.textContent = dateHora;

    hora.parentElement.classList.toggle('animar');
}