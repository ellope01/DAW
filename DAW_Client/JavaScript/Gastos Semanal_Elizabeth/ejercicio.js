class Presupuesto {
    constructor(importeInicial) {
        this.presupuesto = Number(importeInicial);
        this.restante = Number(importeInicial);
        this.gastos = [];
    }

    nuevoGasto(nuevoGasto) {
        this.gastos.push(nuevoGasto);
        this.calcularRestante();
    }

    calcularRestante() {
        const totalGastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        return this.restante = this.presupuesto - totalGastado;
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }
}

class Interfaz {
    imprimirPresupuesto(presupuestoP) {
        document.querySelector('#total').textContent = presupuestoP.presupuesto;
        document.querySelector('#restante').textContent = presupuestoP.restante;
        this.actualizarColorRestante(presupuestoP);
    }

    actualizarColorRestante(presupuestoP) {
        const restanteDiv = document.querySelector('.restante');
        const porcentajeGastado = ((presupuestoP.presupuesto - presupuestoP.restante) / presupuestoP.presupuesto) * 100;
        
        // Limpiar clases anteriores
        restanteDiv.classList.remove('alert-success', 'alert-warning', 'alert-danger');
        
        // Aplicar nueva clase según el porcentaje
        if (porcentajeGastado < 50) {
            restanteDiv.classList.add('alert-success');
        } else if (porcentajeGastado > 75) {
            restanteDiv.classList.add('alert-danger');
        } else {
            restanteDiv.classList.add('alert-warning');
        }
    }

    imprimirAlertas(mensaje, tipo) {
        const divMensj = document.createElement('div');

        divMensj.classList.add('alert', 'text-center');
        if (tipo === 'error') {
            divMensj.classList.add('alert-danger');
        } else {
            divMensj.classList.add('alert-success');
        }

        divMensj.textContent = mensaje;

        const formulario = document.querySelector('#agregar-gasto');
        formulario.parentElement.insertBefore(divMensj, formulario);

        setTimeout(() => {
            divMensj.remove();
        }, 1500);
    }

    imprimirGastos(gastos) {
        const lista = document.querySelector('#gastos ul');
        lista.innerHTML = '';
        for (let i = 0; i < gastos.length; i++) {
            const gastoItem = gastos[i];

            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.setAttribute('data-id', gastoItem.id);

            li.innerHTML = `
                ${gastoItem.nombre} <span class="badge badge-primary badge-pill">${gastoItem.cantidad}€</span>
                <button class="btn btn-danger btn-sm borrar-gasto">X</button>
            `;

            lista.appendChild(li);
        }
    }
}

let presupuesto;
do {
    presupuesto = Number(prompt("¿Cuál es tu presupuesto?"));
} while (isNaN(presupuesto) || presupuesto <= 0);

const presupuestoUsuario = new Presupuesto(presupuesto);
const ui = new Interfaz();
ui.imprimirPresupuesto(presupuestoUsuario);

const formulario = document.querySelector('#agregar-gasto');
const btnAgregar = document.querySelector('#agregar-gasto button[type="submit"]');
formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombreGasto = document.querySelector('#gasto').value.trim();
    const cantidadGasto = Number(document.querySelector('#cantidad').value.trim());

    if (nombreGasto === '') {
        ui.imprimirAlertas('El campo gasto debe tener algo', 'error');
        return;
    }else if(isNaN(cantidadGasto)){
        ui.imprimirAlertas('La cantidad debe ser numerica', 'error');
        return;
    }else if(cantidadGasto <= 0){
        ui.imprimirAlertas('La cantidad debe ser positiva', 'error');
        return;
    }

    const gasto = {
        nombre: nombreGasto,
        cantidad: cantidadGasto,
        id: Date.now()
    };

    presupuestoUsuario.nuevoGasto(gasto);

    ui.imprimirGastos(presupuestoUsuario.gastos);
    ui.imprimirPresupuesto(presupuestoUsuario);
    ui.imprimirAlertas('Gasto añadido correctamente', 'success');
    formulario.reset();
    if (presupuestoUsuario.calcularRestante() <= 0) btnAgregar.disabled = true;
});

const btnGastos = document.querySelector('#gastos');
btnGastos.addEventListener('click', function(e) {
    if (e.target.classList.contains('borrar-gasto')) {
        const id = Number(e.target.parentElement.getAttribute('data-id'));
        presupuestoUsuario.eliminarGasto(id);
        ui.imprimirGastos(presupuestoUsuario.gastos);
        ui.imprimirPresupuesto(presupuestoUsuario);
        ui.imprimirAlertas('Gasto eliminado correctamente', 'success');
        if (presupuestoUsuario.calcularRestante() > 0) btnAgregar.disabled = false;
    }
});
