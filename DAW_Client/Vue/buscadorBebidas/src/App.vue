<script setup>
import Header from "./Header.vue";
import { RouterView, useRoute } from "vue-router";

const route = useRoute();
console.log(route);
</script>

<template>
  <Header />
  <main class="container mx-auto mt-10">
    <RouterView />
  </main>
</template>

<style scoped></style>
