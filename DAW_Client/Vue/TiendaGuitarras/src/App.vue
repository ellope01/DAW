<script setup>
import { ref, reactive, onMounted, warn, watch } from "vue";
import { db } from "./data/guitarra";
import Guitarra from "./components/Guitarra.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
/*const state = reactive({
  guitarras: db,
});*/
//console.log(state.guitarras);

const guitarras = ref(db);
const carrito = ref([]);
const guitarraGrande = ref({});
console.log(guitarras.value);

onMounted(() => {
  guitarras.value = db; //ref
  guitarraGrande.value = guitarras.value[4];
  localStorage.getItem('carrito', JSON.stringify(carrito))

  //state.guitarras = db; //reactive
});

const agregarCarrito = (guitarra) => {
  const articuloExistente = carrito.value.findIndex(
    (element) => guitarra.id === element.id
  );
  if (articuloExistente >= 0) {
    carrito.value[articuloExistente].cantidad++;
  } else {
    guitarra.cantidad = 1;
    carrito.value.push(guitarra);
  }
};

const guardarLocalStorage = () => {
  const localStorageCarrito = localStorage.getItem("carrito");
  return localStorageCarrito !== null ? JSON.parse(localStorageCarrito) : [];
};

watch(
  carrito,
  () => {
    guardarLocalStorage();
  },
  { deep: true }
);
</script>

<template>
  <Header
    v-bind:carrito="carrito"
    v-bind:guitarraGrande="guitarraGrande"
    @agregar-carrito="agregarCarrito"
  />
  <main class="container-xl mt-5">
    <h2 class="text-center">Nuestra Colección</h2>

    <div class="row mt-5">
      <Guitarra
        v-for="guitarra in guitarras"
        v-bind:guitarra="guitarra"
        @agregar-carrito="agregarCarrito"
      />
    </div>
  </main>
  <Footer />
</template>
