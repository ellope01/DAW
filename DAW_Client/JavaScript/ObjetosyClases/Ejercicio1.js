//pedimos en numero de intervalo
const numeroMinimo = parseInt(prompt("Introduce el número por el que empieza el intervalo:"));
const numeroMaximo = parseInt(prompt("Introduce el número por donde acaba el intervalo:"));

//definimos intervaloNumerico
const intervaloNumerico = {
    numeroMinimo: numeroMinimo,
    numeroMaximo: numeroMaximo,

    //propiedad get genera array de numeros entre ek maximo y el minimo
    get ncomprendidos() {
        let arrayNumeros = [];
        let numero = this.numeroMinimo;
        do {
            arrayNumeros.push(numero);
            numero++;
        } while (numero <= this.numeroMaximo);
        return arrayNumeros;
    },

    //modifica el más pequeño y el mayor
    set numeros(arrayAleatorios) {
        this.numeroMinimo = Math.min(...arrayAleatorios);
        this.numeroMaximo = Math.max(...arrayAleatorios);
    }
};


console.log("Intervalo inicial:", intervaloNumerico.numeroMinimo, "-", intervaloNumerico.numeroMaximo);
console.log("Array inicial:", intervaloNumerico.ncomprendidos);

// GGeneran 5 numero aleatorios entre el 1 y el 100
let arrayAleatorios = [];
for (let i = 0; i < 5; i++) {
    arrayAleatorios.push(Math.floor(Math.random() * 100) + 1);
}

// se aplican los numeros al set
intervaloNumerico.numeros = arrayAleatorios;

console.log("Nuevos valores mínimo y máximo:", intervaloNumerico.numeroMinimo, "-", intervaloNumerico.numeroMaximo);
console.log("Nuevo array:", intervaloNumerico.ncomprendidos);
