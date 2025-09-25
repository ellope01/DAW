const filas = parseInt(prompt("Número de filas:"), 10);
const columnas = parseInt(prompt("Número de columnas:"), 10);
const nombreUsuario = prompt("Tu nombre (sin apellidos):");

let tabla = "<table border='1'>";

for (let i = 0; i < filas; i++) {
    tabla += "<tr>";
    for (let j = 0; j < columnas; j++) {
        tabla += `<td>${nombreUsuario}</td>`;
    }
    tabla += "</tr>";
}

tabla += "</table>";


document.body.innerHTML += tabla;
