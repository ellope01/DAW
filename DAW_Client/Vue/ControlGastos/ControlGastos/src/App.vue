<script setup>
import Presupuesto from "./components/Presupuesto.vue";
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import Modal from "./components/Modal.vue";
import iconoNuevoGasto from "../src/assets/nuevo-gasto.svg";
import { generarID } from "./helpers";
import Gasto from "./components/Gasto.vue";
import Filtro from "./components/Filtro.vue";
import { reactive, ref, watch, computed } from "vue";

const presupuesto = ref(0);
const disponible = ref(0);
const gastos = ref([]);
const gastado = ref(0);
const filtro = ref('');
const modal = reactive({
  mostrar: false,
  animar: false,
});
const gasto = reactive({
  nombre: "",
  cantidad: "",
  categoria: "",
  id: null,
  fecha: new Date(),
});

watch(
  gastos,
  () => {
    if (modal.mostrar === false) {
      reiniciarGasto();
    } else {
      const total = gastos.value.reduce((total, gasto) => {
        return total + gasto.cantidad;
      }, 0);
      gastado.value = total;
      disponible.value = presupuesto.value - gastado.value;
    }
  },
  {
    deep: true,
  }
);

const definirPresupuesto = (cantidad) => {
  presupuesto.value = cantidad;
  disponible.value = presupuesto.value;
};

const mostrarModal = () => {
  modal.mostrar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 500);
};

const ocultarModal = () => {
  modal.animar = false;
  setTimeout(() => {
    modal.mostrar = false;
  }, 500);
};

const guardarGasto = () => {
  if (gasto.id) {
    const ind = gastos.value.findIndex((g) => g.id === gasto.id);
    gastos.value[ind] = { ...gasto };
  } else {
    console.log(gasto);
    gasto.id = generarID();
    gastos.value.push({ ...gasto });
  }
  reiniciarGasto();
};

const reiniciarGasto = () => {
  (gasto.nombre = ""),
    (gasto.cantidad = 0),
    (gasto.categoria = ""),
    (gasto.id = null),
    (gasto.fecha = new Date()),
    ocultarModal();
};

const seleccionarGasto = (id) => {
  const encontrar = gastos.value.find((gast) => gast.id === id);
  gasto.nombre = encontrar.nombre;
  gasto.cantidad = encontrar.cantidad;
  gasto.categoria = encontrar.categoria;
  gasto.id = encontrar.id;
  gasto.fecha = encontrar.fecha;

  mostrarModal();
  return encontrar;
};

const borrarGasto = (id) => {
  const index = gastos.value.findIndex((g) => g.id === id);
  if (index !== -1) {
    gastos.value.splice(index, 1);
  }
  ocultarModal();
};

const filtroGastos = computed(() => {
  if (!filtro.value) {
    return gastos.value;
  }
  return gastos.value.filter(g => g.categoria === filtro.value);
});

</script>

<template>
  <div :class="{ fijar: modal.mostrar }">
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto
          v-if="presupuesto === 0"
          @definir-presupuesto="definirPresupuesto"
        />
        <ControlPresupuesto
          v-if="presupuesto > 0"
          v-bind:presupuesto="presupuesto"
          v-bind:disponible="disponible"
          v-bind:gastado="gastado"
        />
      </div>
    </header>
    <main v-if="presupuesto > 0">
      <div class="crear-gasto" @click="mostrarModal()">
        <img :src="iconoNuevoGasto" alt="icono nuevo gasto" />
      </div>
      <Modal
        :modal="modal"
        v-if="modal.mostrar === true"
        @ocultar-modal="ocultarModal"
        @guardar-gasto="guardarGasto"
        @borrar-gasto="borrarGasto"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"
        v-model:id="gasto.id"
        v-bind:disponible="disponible"
      />
      <Filtro v-model:filtro="filtro" />
      <div class="listado-gastos contenedor">
        <h2>{{ gastos.length > 0 ? "Gastos:" : "NO hay gastos" }}</h2>
        <Gasto
          v-for="g in filtroGastos"
          :gasto="g"
          :key="g.id"
          @seleccionar-gasto="seleccionarGasto"
        />
      </div>
    </main>
  </div>
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #fff;
  --gris-claro: #f5f5f5;
  --gris: #94a3b8;
  --gris-oscuro: #64748b;
  --negro: #000;
}
html {
  font-size: 62.5%;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--gris-claro);
}
h1 {
  font-size: 4rem;
}
h2 {
  font-size: 3rem;
}
header {
  background-color: var(--azul);
}
header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}
.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}
.contenedor-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}
.sombra {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
  padding: 5rem;
}
.crear-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}
.crear-gasto img {
  width: 5rem;
  cursor: pointer;
}
.listado-gastos {
  margin-top: 10rem;
}
.listado-gastos h2 {
  font-weight: 900;
  color: var(--gris-oscuro);
}
.fijar {
  overflow: hidden;
  height: 100vh;
}
</style>
