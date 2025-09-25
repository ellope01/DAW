const nombre = prompt("Indica tu nombre:");
const edad = parseInt(prompt("¿Cuántos años tienes?"), 10);
const salario = parseFloat(prompt("¿Cuál es tu salario?"));
const hijo = parseInt(prompt("¿Cuántos hijos tienes?"), 10);

let salarioFinal = salario; 

switch (true) {
    case (edad < 30 && salario < 1000 && hijo >= 1):
        salarioFinal = 1200;
        break;
    case (edad < 30 && salario < 1000 && hijo === 0):
        salarioFinal = salario * 1.05; 
        break;
    case (edad > 45 && salario < 2000):
        salarioFinal = salario * 1.15; 
        break;
    case (edad >= 30 && edad <= 45 && hijo > 1 && salario < 1250):
        salarioFinal = salario * 1.10; 
        break;
    case (edad >= 30 && edad <= 45 && hijo >= 3 && salario < 1250):
        salarioFinal = salario * 1.15; 
        break;
    default:
        salarioFinal = salario;
}

alert(`${nombre}, su sueldo cambia de ${salario.toFixed(2)}€ a ${salarioFinal.toFixed(2)}€`);
