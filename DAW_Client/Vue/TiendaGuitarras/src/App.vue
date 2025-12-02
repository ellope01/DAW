<script setup>
import { ref, reactive, onMounted } from "vue";
import { db } from "./data/guitarra";
import Guitarra from "./components/Guitarra.vue";
import Header from "./components/Header.vue";
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
</script>

<template>
  <Header v-bind:carrito="carrito" v-bind:guitarraGrande="guitarraGrande"/>
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

  <footer class="bg-dark mt-5 py-5">
    <div class="container-xl">
      <p class="text-white text-center fs-4 mt-4 m-md-0">
        GuitarLA - Todos los derechos Reservados
      </p>
    </div>
  </footer>
</template>
