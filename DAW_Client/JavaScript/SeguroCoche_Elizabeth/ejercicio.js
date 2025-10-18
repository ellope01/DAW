//Seleccionamos las cosas que queremos añadir del html
const formulario = document.querySelector('#formulario');
const año = document.querySelector('año');
const btnCalcularSeguro = formulario.querySelector('button[type="submit"]');
const tipo = document.querySelector();
const tipoSeguro = document.querySelector();

//si no se rellenan todos los campos aparecerá un mensaje de error (hecho formulario anterior)



//getters y setters 
//funciones calcularSeguro(), y mostrarInfoHTML()

class Poliza {
    constructor(gam, any, cobt, impr) {
        this.gama = gam;
        this.anyo = any;
        this.cobertura = cobt;
        this.importar = impr;
    };


    get gama() {
        return this.gama;
    };
    get anyo() {
        return this.anyo;
    };
    get cobertura() {
        return this.cobertura;
    };
    get importar() {
        return this.importar;
    };

    set gama(g) {
        this.gama = "";
    };

    set anyo(a) {
        this.gama = "";
    };

    set cobertura(c) {
        this.gama = "";
    };

    set importar(i) {
        this.gama = "";
    };


    function calcularSeguro(gama, anyo) {
    let poliza = 300;
    let incremento;
    let anyoBase = 2025;
    let totalAnyos;
    let incrAn;
    let incrBasico = 30;
    let incrCompleto = 50;
    let incrementoTotal;
    if (gama === "gamaBaja") {
        incremento = 0.05;
    } else if (gama === "gamaMedia") {
        incremento = 0.15;
    } else {
        incremento = 0.30;
    }

    totalAnyos = anyoBase - anyo;
    incrAn = totalAnyos * 0.03;

    incrementoTotal = incrAn + incremento + incrBasico;
    
    return incrementoTotal;
};


// Pop up 
    function mostrarInfoHTML(){

    }
};