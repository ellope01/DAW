const cad1 = prompt("Introduce la primera cadena:");
const cad2 = prompt("Introduce la segunda cadena:");

let trabajar = cad1.length >= cad2.length ? cad1 : cad2;

alert(`Trabajaremos sobre: "${trabajar}"`);

let caracteresUnicos = "";

for (let i = 0; i < trabajar.length; i++) {
    let char = trabajar[i];
    if (!caracteresUnicos.includes(char)) {
        caracteresUnicos += char;
    }
}

alert(`Caracteres no repetidos de "${trabajar}": ${caracteresUnicos.split("").join(", ")}`);
