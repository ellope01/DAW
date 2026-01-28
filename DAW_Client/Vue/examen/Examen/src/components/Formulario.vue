<script setup>
import { ref } from "vue";
import Alerta from "./Alerta.vue";

const props = defineProps({
  cita: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["guardar-cita"]);
const error = ref("");

const validarCita = () => {
  const { nombreMascota, nombrePropietario, email, cita, sintomas } =
    props.cita;

  if (!nombreMascota || !nombrePropietario || !email || !cita || !sintomas) {
    error.value = "TODOS LOS CAMPOS SON OBLIGATORIOS";
    setTimeout(() => (error.value = ""), 2000);
    return;
  } else {
    error.value = "CITA ALMACENADA CORRECTAMENTE";
    setTimeout(() => (error.value = ""), 2000);
    emit("guardar-cita");
  }
};
</script>

<template>
  <div class="md:w-1/2 px-5">
    <h2 class="font-black text-3xl text-center">Seguimiento Pacientes</h2>

    <p class="text-lg mt-5 text-center mb-10">
        Añade Citas de Pacientes y <span class="text-indigo-600 font-bold">Administralas</span>
    </p>
    <Alerta v-if="error">
      {{ error }}
    </Alerta>

    <form
      class="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      @submit.prevent="validarCita"
    >
      <div class="mb-5">
        <label class="block font-bold">Nombre Mascota</label>
        <input
          type="text"
          v-model="cita.nombreMascota"
          class="border-2 w-full p-2 mt-2 rounded-md"
        />
      </div>

      <div class="mb-5">
        <label class="block font-bold">Propietario</label>
        <input
          type="text"
          v-model="cita.nombrePropietario"
          class="border-2 w-full p-2 mt-2 rounded-md"
        />
      </div>

      <div class="mb-5">
        <label class="block font-bold">Email</label>
        <input
          type="email"
          v-model="cita.email"
          class="border-2 w-full p-2 mt-2 rounded-md"
        />
      </div>

      <div class="mb-5">
        <label class="block font-bold">Fecha</label>
        <input
          type="date"
          v-model="cita.cita"
          class="border-2 w-full p-2 mt-2 rounded-md"
        />
      </div>

      <div class="mb-5">
        <label class="block font-bold">Síntomas</label>
        <textarea
          v-model="cita.sintomas"
          class="border-2 w-full p-2 mt-2 rounded-md h-32"
        />
      </div>

      <input
        type="submit"
        :value="cita.id ? 'Guardar Cambios' : 'Registrar Cita'"
        class="bg-indigo-600 w-full p-3 text-white font-bold hover:bg-indigo-700"
      />
    </form>
  </div>
</template>
