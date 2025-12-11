<template>
  <div class="modal">
    <div class="cerrar-modal">
      <img
        :src="cerrarModal"
        alt="cerrar Modal"
        @click="emit('ocultar-modal')"
      />
    </div>
    <div
      class="contenedor contenedor-formulario"
      :class="[modal.animar ? 'animar' : 'cerrar']"
    >
      <form class="nuevo-gasto" @submit.prevent="validarGasto()">
        <legend>Añadir Gasto</legend>
        <Alerta v-if="error !== ''">
          {{ error }}
        </Alerta>
        <div class="campo">
          <label for="nombre">Nombre Gasto:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del Gasto"
            :value="nombre"
            @input="$emit('update:nombre', $event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad"
            :value="cantidad"
            @input="$emit('update:cantidad', +$event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="categoria">Categoria:</label>
          <select
            id="categoria"
            @change="$emit('update:categoria', $event.target.value)"
            :value="categoria"
          >
            <option value="">-- Selecciona --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Cesta compra</option>
            <option value="casa">Casa</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
            <option value="gastos">Gastos Varios</option>
          </select>
        </div>
        <input type="submit" value="Añadir Gasto" />
      </form>
    </div>
  </div>
</template>

<script setup>
import cerrarModal from "../assets/cerrar.svg";
import Alerta from "./Alerta.vue";
import { ref } from "vue";

const error = ref("");
const gasto = ref([]);

const emit = defineEmits([
  "ocultar-modal",
  "update:nombre",
  "update:cantidad",
  "update:categoria",
  "guarda-Gasto"
]);
const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  cantidad: {
    type: [String, Number],
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
});

const validarGasto = () => {
  if (!props.nombre || !props.cantidad || !props.categoria) {
    error.value = "TODOS LOS CAMPOS SON OBLIGATORIOS";
    setTimeout(() => {
      error.value = "";
    }, 2000);
  } else if (props.cantidad < 0) {
    error.value = "LA CANTIDAD DEBE DE SER SUPERIOR A 0";
    setTimeout(() => {
      error.value = "";
    }, 2000);
  }
  emit("guarda-Gasto")
};
</script>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.cerrar-modal {
  position: absolute;
  right: 3rem;
  top: 3rem;
}
.cerrar-modal img {
  width: 3rem;
  cursor: pointer;
}
.nuevo-gasto {
  margin: 10rem auto 0 auto;
  display: grid;
  gap: 2rem;
}
.nuevo-gasto legend {
  text-align: center;
  color: var(--blanco);
  font-size: 3rem;
  font-weight: 700;
}
.campo {
  display: grid;
  gap: 2rem;
}
.nuevo-gasto input,
.nuevo-gasto select {
  background-color: var(--gris-claro);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
}
.nuevo-gasto label {
  color: var(--blanco);
  font-size: 3rem;
}
.nuevo-gasto input[type="submit"] {
  background-color: var(--azul);
  color: var(--blanco);
  font-weight: 700;
  cursor: pointer;
}
.contenedor-formulario {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}
.contenedor-formulario.animar {
  opacity: 1;
}
.contenedor-formulario.cerrar {
  opacity: 0;
}
</style>
