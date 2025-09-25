const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let numCadenas = parseInt(prompt("¿Cuántas cadenas quieres generar?"), 10);

let vacias = 0;

for (let i = 0; i < numCadenas; i++) {
    let longitud = Math.floor(Math.random() * 11); 
    let subcadena = "";
    for (let j = 0; j < longitud; j++) {
        let pos = Math.floor(Math.random() * base.length);
        subcadena += base[pos];
    }
    if (subcadena === "") vacias++;
    console.log(`Cadena ${i + 1}: "${subcadena}"`);
}

console.log(`Número de cadenas vacías: ${vacias}`);
