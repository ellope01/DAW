import { Poliza } from './clasePoliza.js';
import { generarAnios } from './funciones.js';

const formulario = document.querySelector('#cotizar-seguro');
const selectGama = document.querySelector('#gama');
const selectYear = document.querySelector('#year');
const resultado = document.querySelector('#resultado');

generarAnios(selectYear);

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
