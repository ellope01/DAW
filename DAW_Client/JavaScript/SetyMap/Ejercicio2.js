let min, max;
do {
    min = parseInt(prompt("Introduce el número mínimo del rango:"));
    if (min === null) {
        alert("Programa cancelado");
        throw "Cancelado";
    }
} while (isNaN(min)); 

do {
    max = parseInt(prompt("Introduce el número máximo del rango:"));
    if (max === null) {
        alert("Programa cancelado");
        throw "Cancelado";
    }
} while (isNaN(max) || max < min); 


let repeticiones;
do {
    repeticiones = parseInt(prompt("Introduce el número de repeticiones:"));
    if (repeticiones === null) {
        alert("Programa cancelado");
        throw "Cancelado";
    }
} while (isNaN(repeticiones) || repeticiones <= 0);


let frecuencia = new Map();


for (let i = min; i <= max; i++) {
    frecuencia.set(i, 0);
}

for (let i = 0; i < repeticiones; i++) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    frecuencia.set(num, frecuencia.get(num) + 1);
}

document.write("<h2>Frecuencia de números del " + min + " al " + max + " en " + repeticiones + " repeticiones:</h2>");
document.write("<ul>");
frecuencia.forEach((valor, clave) => {
    document.write("<li>Número " + clave + ": " + valor + " veces</li>");
});
document.write("</ul>");
