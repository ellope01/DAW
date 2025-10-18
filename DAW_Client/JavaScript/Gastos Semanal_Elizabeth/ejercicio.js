let presupuesto;

do {
    presupuesto = Number(prompt("¿Cuál es tu presupuesto?"));
} while (isNaN(presupuesto) || presupuesto <= 0);


class Presupuesto {
    constructor(importeInicial) {
        this.presupuesto = Number(importeInicial);
        this.restante = Number(importeInicial);
        this.gastos = []
    }

    nuevoGasto(nuevoGasto) {
        this.gastos.push(nuevoGasto);
        this.calcularRestante();
    }
    calcularRestante() {
        const totalGastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - totalGastado;
    }
    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }
    
}

class Interfaz {

}