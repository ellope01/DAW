function mostrarReloj() {
    //seleccionamos los elementos que queremos cambiar, en este caso la hora y la fecha
    const hora = document.querySelector('#hora');
    const fecha = document.getElementById('fecha');

    //creamos variables para asignar las opciones de la hora y de la fecha
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

    //creamos un Date
    let date = new Date();

    //configuramos lo que queremos que se muestre en la fecha y la hora
    dateFecha = date.toLocaleDateString('es-ES', { ...opcionesFecha, timeZone: 'Europe/Madrid' });
    dateHora = date.toLocaleTimeString('es-ES', opcionesHora);

    //mostramos los elementos cambiados
    fecha.textContent = dateFecha;
    hora.textContent = dateHora;

    //utilizamos un toggle para que se cambie como un intermitente el borde del reloj
    hora.parentElement.classList.toggle('animar');
}