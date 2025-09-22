class Persona {
    static contadorPersonas = 0

    constructor(nombre, apellido, edad) {
        this._idPersona = ++Persona.contadorPersonas;
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
    }


    get IdPersona() { return this._idPersona }
    get nombre() { return this._nombre }
    get apellidos() { return this._apellido }
    get edad() { return this._edad }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    set apellido(apellido) {
        this._apellido = apellido
    }
    set edad(edad) {
        this._edad = edad
    }

    toString() {
        return `Persona [ID Persona: ${this._idPersona}, Nombre: ${this._nombre}, Apellido: ${this._apellido}, Edad: ${this._edad}]`;
    }
}

class Empleado extends Persona {
    static contadorEmpleados = 0;

    constructor(nombre, apellido, edad, sueldo) {
        super(nombre, apellido, edad);
        this._idEmpleado = ++Empleado.contadorEmpleados;
        this._sueldo = sueldo;
    }

    get IdEmpleado() {
        return this._idEmpleado;
    }

    get sueldo() {
        return this._sueldo;
    }
    set sueldo(sueldo) {
        this._sueldo = sueldo;
    }

    toString() {
        return `Empleado [ID Persona: ${this.IdPersona}, ID Empleado: ${this._idEmpleado}, Nombre: ${this._nombre}, Apellido: ${this._apellido}, Edad: ${this._edad}, Sueldo: ${this._sueldo}]`;
    }
}

class Cliente extends Persona {
    static contadorClientes = 0;

    constructor(nombre, apellido, edad, fechaRegistro) {
        super(nombre, apellido, edad);
        this._idCliente = ++Cliente.contadorClientes;
        this._fechaRegistro = fechaRegistro;
    }

    get IdCliente() {
        return this._idCliente;
    }

    get fechaRegistro() {
        return this._fechaRegistro;
    }
    set fechaRegistro(fecha) {
        this._fechaRegistro = fecha;
    }

    toString() {
        return `Cliente [ID Persona: ${this.IdPersona}, ID Cliente: ${this._idCliente}, Nombre: ${this._nombre}, Apellido: ${this._apellido}, Edad: ${this._edad}, Fecha Registro: ${this._fechaRegistro}]`;
    }
}


let p1 = new Persona("Ana", "López", 25);
let p2 = new Persona("Luis", "Martínez", 30);


let e1 = new Empleado("María", "García", 28, 2000);
let e2 = new Empleado("Carlos", "Ruiz", 35, 2500);

let c1 = new Cliente("Sofía", "Pérez", 22, "2025-09-22");
let c2 = new Cliente("Javier", "Torres", 40, "2025-09-21");

console.log(p1.toString());
console.log(p2.toString());
console.log(e1.toString());
console.log(e2.toString());
console.log(c1.toString());
console.log(c2.toString());
