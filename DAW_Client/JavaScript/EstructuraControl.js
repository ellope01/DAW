
//Ejericicio 1
/*
    El ejercicio trata sobre una actualización de salario dependiendo sus distintos factores
*/ 

//Declaración de variables
const nombre = prompt ("Indicame tu nombre: ")
const edad = prompt("¿Cuantos años tienes?")
const salario = prompt("¿Cual es tu salario? ")
const hijo = prompt("¿Cuantos hijo tienes?")
let salarioFinal;

//Calculo del nuevo sueldo mediante switch
switch(true){
    case edad < 30 && salario < 1000 && hijo >= 1:
        salarioFinal = 1200;
        break;
    case edad < 30 && salario < 1000 && hijo == 0:
        salarioFinal = salario * 0.05;
        break;
    case edad > 45 && salario < 2000 :
        salarioFinal = salario * 1.15
        break;
    case edad >= 30 && edad < 45 && hijo >= 1 && salario < 1250:
        salarioFinal = salario * 0.10;
        break
    case edad >= 30 && edad < 45 && hijo >= 3 && salario < 1250:
        salarioFinal = salario * 0.15;
        break;
    default:
        salario = salarioFinal;
}

window.alert(`${nombre}, su sueldo cambia de ${salario} a ${salarioFinal}`)