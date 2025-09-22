//Ejercicio 1
const intervaloNumerico = {
    numeroMinimo : window.prompt("Introduce el número por el que empieza el intervalo: "),
    numeroMaximo: window.prompt("Introduce el número por donde acaba el intervalo"),

    get ncomprendidos(){
        let arrayNumeros;
        do{
            numero = `${this.numeroMinimo}`;
            arrayNumeros[numero++]
        }
        while(numero <= `${this.numeroMaximo}`);
        return arrayNumeros
    },
    set numeros(arrayAleatorios){
        let arrayNumeros;
        do{
            numero = `${this.numeroMinimo}`;
            arrayNumeros[numero++]
        }
        while(numero <= `${this.numeroMaximo}`);
        return arrayNumeros
    }
};
let arrayAleatorios=[]
for(i=1;i<=5;i++){
    arrayAleatorios.push(numero.random())
}
console.log(intervaloNumerico.ncomprendidos)

