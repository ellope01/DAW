<template>
  <header class="bg-slate-800" :class="{ header: paginaInicio }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'inicio' }">
            <img class="w-32" src="../public/logo.svg" alt="imagen logo" />
          </RouterLink>
        </div>
        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'inicio' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
          >
            Inicio
          </RouterLink>
          <RouterLink
            :to="{ name: 'favoritos' }"
            class="uppercase font-bold"
            active-class="text-orange-500"
          >
            Favoritos
          </RouterLink>
        </nav>
      </div>
      <form
        class="md:w-1/2 2x1:w-1/3 bg-orange-400 my-32 p-10 rounded-1g shadow space-y-6"
        v-if="paginaInicio"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
            >Nombre o Ingredientes</label
          >

          <input
            id="ingrediente"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none bg-white"
            placeholder="Nombre o Ingrediente: ej.Vodka, Tequila, etc"
            v-model="store.busqueda.nombre"
          />
        </div>

        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="categoria"
            >Categoria</label
          >

          <select
            id="categoria"
            class="p-3 w-full rounded-lg focus:outline-none bg-white"
            v-model="store.busqueda.categoria"
          >
            <option value="">--Seleccione--</option>
            <option
              v-for="categoria in store.categorias"
              :key="categoria.strCategory"
              :value="categoria.strCategory"
            >
              {{ categoria.strCategory }}
            </option>
          </select>
        </div>
        <input
          type="submit"
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
          value="Buscar Recetas"
        />
      </form>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useBebidasStore } from "./stores/bebibas";
const route = useRoute();

const paginaInicio = computed(() => route.name === "inicio");

const store = useBebidasStore();
console.log(store.categorias);
</script>

<style>
.header {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
