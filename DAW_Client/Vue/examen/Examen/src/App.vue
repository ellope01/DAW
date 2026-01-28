<script setup>
import { reactive, ref } from "vue";
import Formulario from "./components/Formulario.vue";
import { generarID } from "./helpers";

const citas = ref([]);

const cita = reactive({
  nombreMascota: "",
  nombrePropietario: "",
  email: "",
  cita: "",
  sintomas: "",
  id: null,
});

const guardarCita = () => {
  if (cita.id) {
    const index = citas.value.findIndex((c) => c.id === cita.id);
    citas.value[index] = { ...cita };
  } else {
    cita.id = generarID();
    citas.value.push({ ...cita });
  }

  Object.assign(cita, {
    nombreMascota: "",
    nombrePropietario: "",
    email: "",
    cita: "",
    sintomas: "",
    id: null,
  });
};
</script>

<template>
  <div class="container mx-auto mt-20">
    <h1 class="font-black text-5xl text-center">
      Seguimiento de citas
      <span class="text-indigo-600">Veterinaria</span>
    </h1>
  </div>

  <div class="mt-12 md:flex">
    <Formulario :cita="cita" @guardar-cita="guardarCita" />

    <div class="md:w-1/2 md:h-screen overflow-y-scroll">
      <h3 class="font-black text-3xl text-center">Administra tus pacientes</h3>
      <div>
        <p class="text-lg mt-5 text-center mb-10">
          Información de
          <span class="text-indigo-600 font-bold">Citas de Pacientes</span>
        </p>
      </div>
      <div v-if="citas.length === 0" class="mt-20 text-2xl text-center">
        No hay Pacientes
      </div>

      <div
        v-for="citaItem in citas"
        :key="citaItem.id"
        class="bg-white shadow-md rounded-lg p-5 mb-5"
      >
        <p>
          <span class="font-bold">Mascota:</span> {{ citaItem.nombreMascota }}
        </p>
        <p>
          <span class="font-bold">Propietario:</span>
          {{ citaItem.nombrePropietario }}
        </p>
        <p><span class="font-bold">Email:</span> {{ citaItem.email }}</p>
        <p><span class="font-bold">Fecha:</span> {{ citaItem.cita }}</p>
        <p><span class="font-bold">Síntomas:</span> {{ citaItem.sintomas }}</p>

        <button
          class="mt-3 bg-indigo-600 text-white px-3 py-1 rounded"
          @click="Object.assign(cita, citaItem)"
        >
          Editar
        </button>
      </div>
    </div>
  </div>
</template>
