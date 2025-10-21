class Presupuesto {
    // Constructor 
    constructor(importeInicial) {
        this._presupuesto = Number(importeInicial);
        this._restante = Number(importeInicial);
        this._gastos = [];
    }

    // Getters 
    get presupuesto() {
        return this._presupuesto;
    }
    get restante() {
        return this._restante;
    }
    get gastos() {
        return this._gastos;
    }

    // Setters 
    set presupuesto(nuevoPresupuesto) {
        if (isNaN(nuevoPresupuesto) || nuevoPresupuesto <= 0) {
            throw new Error('El presupuesto debe ser un número positivo');
        }
        this._presupuesto = Number(nuevoPresupuesto);
        this._restante = Number(nuevoPresupuesto);
    }

    set gastos(nuevosGastos) {
        if (!Array.isArray(nuevosGastos)) {
            throw new Error('Los gastos deben ser un array');
        }
        this._gastos = nuevosGastos;
        this.calcularRestante();
    }

    // Agrega un nuevo gasto y recalcula el dinero
    nuevoGasto(nuevoGasto) {
        this._gastos.push(nuevoGasto);
        this.calcularRestante();
    }

    // Cuánto dinero queda disponible
    calcularRestante() {
        const totalGastado = this._gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this._restante = this._presupuesto - totalGastado;
        return this._restante;
    }

    // Elimina un gasto
    eliminarGasto(id) {
        this._gastos = this._gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
    }
}
class Interfaz {
    // Muestra en pantalla el presupuesto total y el dinero restante
    imprimirPresupuesto(presupuestoP) {
        document.querySelector('#total').textContent = presupuestoP.presupuesto;
        document.querySelector('#restante').textContent = presupuestoP.restante;
        this.actualizarColorRestante(presupuestoP); // Cambia el color según el porcentaje gastado
    }

    // Cambia el color según el porcentaje gastado
    actualizarColorRestante(presupuestoP) {
        const restanteDiv = document.querySelector('.restante');

        const porcentajeGastado = ((presupuestoP.presupuesto - presupuestoP.restante) / presupuestoP.presupuesto) * 100;

        restanteDiv.classList.remove('alert-success', 'alert-warning', 'alert-danger');

        if (porcentajeGastado < 50) {
            restanteDiv.classList.add('alert-success');
        } else if (porcentajeGastado > 75) {
            restanteDiv.classList.add('alert-danger');
        } else {
            restanteDiv.classList.add('alert-warning');
        }
    }

    // Muestra mensajes de alerta temporales
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

        setTimeout(() => divMensj.remove(), 1500);
    }

    // Muestra todos los gastos
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

// Se pide el presupuesto inicial
let presupuesto;
do {
    presupuesto = Number(prompt("¿Cuál es tu presupuesto?"));
} while (isNaN(presupuesto) || presupuesto <= 0);

// Se crean los objetos 
const presupuestoUsuario = new Presupuesto(presupuesto);
const ui = new Interfaz();

ui.imprimirPresupuesto(presupuestoUsuario);


const formulario = document.querySelector('#agregar-gasto');
const btnAgregar = document.querySelector('#agregar-gasto button[type="submit"]');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombreGasto = document.querySelector('#gasto').value.trim();
    const cantidadGasto = Number(document.querySelector('#cantidad').value.trim());

    // Validaciones
    if (nombreGasto === '') {
        ui.imprimirAlertas('El campo gasto debe tener algo', 'error');
        return;
    } else if (isNaN(cantidadGasto)) {
        ui.imprimirAlertas('La cantidad debe ser numérica', 'error');
        return;
    } else if (cantidadGasto <= 0) {
        ui.imprimirAlertas('La cantidad debe ser positiva', 'error');
        return;
    }

    const gasto = {
        nombre: nombreGasto,
        cantidad: cantidadGasto,
        id: Date.now() // Se usa la fecha ID
    };

    // Se añade el gasto al presupuesto y se actualiza 
    presupuestoUsuario.nuevoGasto(gasto);
    ui.imprimirGastos(presupuestoUsuario.gastos);
    ui.imprimirPresupuesto(presupuestoUsuario);
    ui.imprimirAlertas('Gasto añadido correctamente', 'success');
    formulario.reset();

    if (presupuestoUsuario.restante <= 0) btnAgregar.disabled = true;
});

const btnGastos = document.querySelector('#gastos');

btnGastos.addEventListener('click', function (e) {
    if (e.target.classList.contains('borrar-gasto')) {
        const id = Number(e.target.parentElement.getAttribute('data-id'));

        presupuestoUsuario.eliminarGasto(id);

        ui.imprimirGastos(presupuestoUsuario.gastos);
        ui.imprimirPresupuesto(presupuestoUsuario);
        ui.imprimirAlertas('Gasto eliminado correctamente', 'success');

        if (presupuestoUsuario.restante > 0) btnAgregar.disabled = false;
    }
});
