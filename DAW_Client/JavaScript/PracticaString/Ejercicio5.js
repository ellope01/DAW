let texto5;
//Pido un mínimo de 3 palabras
do {
    texto5 = prompt("Introduce un texto con mínimo 3 palabras:");
} while (texto5.trim().split(" ").length < 3);

//Se define el carácter a buscar
let caracter;
do {
    caracter = prompt("Introduce un solo carácter a buscar:");
} while (caracter.length !== 1);

//Recorre el texto buscando el caracter y los va contando
let contador = 0;
for (let i = 0; i < texto5.length; i++) {
    if (texto5[i] === caracter) {
        contador++;
    }
}

alert(`En el texto "${texto5}" el carácter "${caracter}" aparece ${contador} veces.`);
