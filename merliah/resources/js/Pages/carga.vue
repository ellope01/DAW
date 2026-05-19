<template>
  <div class="min-h-screen bg-cream font-sans flex items-center justify-center">
    <div class="text-center animate-fade-in">
      <!-- Logo -->
      <h1 class="text-4xl md:text-5xl font-display font-semibold text-ink tracking-[0.04em] lowercase mb-8">
        merliah
      </h1>

      <!-- Spinner -->
      <div class="relative w-12 h-12 mx-auto mb-6">
        <div class="absolute inset-0 border-2 border-sand rounded-full"></div>
        <div class="absolute inset-0 border-2 border-transparent border-t-ink rounded-full animate-spin-slow"></div>
      </div>

      <!-- Text -->
      <p class="text-[11px] tracking-[0.3em] uppercase text-stone font-medium animate-pulse-dot">
        Cargando tu experiencia
      </p>
    </div>
  </div>
</template>

<script setup>
</script>