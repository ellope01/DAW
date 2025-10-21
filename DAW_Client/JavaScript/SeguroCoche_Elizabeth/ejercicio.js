// Se obtienen los elementos principales del formulario desde el HTML:
const formulario = document.querySelector('#cotizar-seguro');
const selectGama = document.querySelector('#gama');
const selectYear = document.querySelector('#year');
const resultado = document.querySelector('#resultado');

// Calcula el año actual
const max = new Date().getFullYear();
const min = max - 20;

// Creamos select de los Años
for (let i = max; i >= min; i--) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  selectYear.appendChild(option);
}
class Poliza {
  // Constructor 
  constructor(gama, anyo, cobertura) {
    this.gama = gama;
    this.anyo = anyo;
    this.cobertura = cobertura;
    this.importe = 0;
  }

  calcularSeguro() {
    let base = 300; // Precio base
    let incrementoGama = 0;

    // Incremento según la gama del coche
    switch (this.gama) {
      case '1': incrementoGama = 0.05; break;
      case '2': incrementoGama = 0.15; break;
      case '3': incrementoGama = 0.30; break;
    }

    // Incremento por antigüedad 
    const antiguedad = new Date().getFullYear() - this.anyo;
    const incrementoAnyo = antiguedad * 0.03;

    // Incremento por tipo de cobertura
    let incrementoCobertura = 0;
    if (this.cobertura === 'Básico') incrementoCobertura = 0.30;
    else incrementoCobertura = 0.50;

    const total = base * (1 + incrementoGama + incrementoAnyo + incrementoCobertura);

    this.importe = Math.round(total);

    return this.importe;
  }


  mostrarInfoHTML() {
    const modal = new bootstrap.Modal(document.getElementById('modal'));
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    const modalFooter = document.querySelector('.modal-footer');

    modalTitle.textContent = 'RESUMEN DE PÓLIZA';

    modalBody.innerHTML = `
      <p class="font-bold">Gama: ${this.gama === '1' ? 'Baja' : this.gama === '2' ? 'Media' : 'Alta'}</p>
      <p class="font-bold">Año: ${this.anyo}</p>
      <p class="font-bold">Tipo de cobertura: ${this.cobertura}</p>
      <p class="font-bold text-lg">Importe total: ${this.importe} €</p>
    `;

    modalFooter.innerHTML = `
      <button type="button" class="btn btn-primary btn-raised col" data-bs-dismiss="modal">Cerrar</button>
    `;

    modal.show();
  }
}

formulario.addEventListener('submit', e => {
  e.preventDefault();

  const gama = selectGama.value;
  const anyo = selectYear.value;
  const cobertura = document.querySelector('input[name="tipo"]:checked')?.value;

  const errorExistente = document.querySelector('.error');
  if (errorExistente) errorExistente.remove();

  if (gama === '' || anyo === '' || cobertura === '') {
    const div = document.createElement('div');
    div.classList.add('error', 'mt-10', 'bg-red-500', 'text-black', 'p-3', 'text-center');
    div.textContent = 'Todos los campos son obligatorios';
    resultado.appendChild(div);

    setTimeout(() => div.remove(), 3000);
    return;
  }

  const poliza = new Poliza(gama, anyo, cobertura);

  poliza.calcularSeguro();

  poliza.mostrarInfoHTML();
});
