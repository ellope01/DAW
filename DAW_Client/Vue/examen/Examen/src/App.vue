<script setup>
import { reactive, ref, onMounted, watch } from "vue";
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

const borrarCita = (id) => {
  citas.value = citas.value.filter((c) => c.id !== id);
};


const guardarLocalStorage = () => {
  localStorage.setItem("citas", JSON.stringify(citas.value));
};


watch(
  citas,
  () => {
    guardarLocalStorage();
  },
  { deep: true }
);


onMounted(() => {
  const citasLS = localStorage.getItem("citas");
  if (citasLS) {
    citas.value = JSON.parse(citasLS);
  }
});
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
        class="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl"
      >
        <p class="font-bold mb-3 text-gray-700 uppercase">
          ID:
          <span class="font-normal normal-case">
            {{ citaItem.id }}
          </span>
        </p>

        <p class="font-bold mb-3 text-gray-700 uppercase">
          Mascota:
          <span class="font-normal normal-case">
            {{ citaItem.nombreMascota }}
          </span>
        </p>

        <p class="font-bold mb-3 text-gray-700 uppercase">
          Propietario:
          <span class="font-normal normal-case">
            {{ citaItem.nombrePropietario }}
          </span>
        </p>

        <p class="font-bold mb-3 text-gray-700 uppercase">
          Email:
          <span class="font-normal normal-case">
            {{ citaItem.email }}
          </span>
        </p>

        <p class="font-bold mb-3 text-gray-700 uppercase">
          Fecha:
          <span class="font-normal normal-case">
            {{ citaItem.cita }}
          </span>
        </p>

        <p class="font-bold mb-3 text-gray-700 uppercase">
          Síntomas:
          <span class="font-normal normal-case">
            {{ citaItem.sintomas }}
          </span>
        </p>

        <div class="grid md:grid-cols-2 gap-5 mt-10">
          <button
            type="button"
            class="block w-full py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          >
            Editar
          </button>

          <button
            type="button"
            class="block w-full py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
            @click="borrarCita(citaItem.id)"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
