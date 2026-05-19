<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <Header activo="cuenta" />
    <AccountTabs activo="pedidos" />

    <main class="flex-1">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16">

        <!-- Welcome -->
        <div class="mb-12">
          <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-2">Hola de nuevo</p>
          <h2 class="text-4xl md:text-5xl font-display text-ink tracking-tight lowercase">
            mi <em class="italic">cuenta</em>
          </h2>
        </div>

        <!-- Stats cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div v-for="stat in stats" :key="stat.label"
            class="bg-cream-dark rounded-2xl p-6 text-center">
            <p class="text-2xl md:text-3xl font-display text-ink mb-1">{{ stat.value }}</p>
            <p class="text-[10px] tracking-[0.2em] uppercase text-stone font-medium">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <a href="/pedido"
            class="bg-cream-dark rounded-2xl p-8 group hover:bg-sand/50 transition-colors duration-300">
            <div class="flex justify-between items-start mb-4">
              <div class="w-10 h-10 bg-ink/10 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <span class="text-stone group-hover:text-ink transition-colors text-lg">→</span>
            </div>
            <h3 class="text-base font-display text-ink mb-1 lowercase">Mis <em class="italic">pedidos</em></h3>
            <p class="text-xs text-stone tracking-wide">Consulta el estado de tus envíos</p>
          </a>

          <a href="/favorito"
            class="bg-cream-dark rounded-2xl p-8 group hover:bg-sand/50 transition-colors duration-300">
            <div class="flex justify-between items-start mb-4">
              <div class="w-10 h-10 bg-ink/10 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <span class="text-stone group-hover:text-ink transition-colors text-lg">→</span>
            </div>
            <h3 class="text-base font-display text-ink mb-1 lowercase">Mis <em class="italic">favoritos</em></h3>
            <p class="text-xs text-stone tracking-wide">Tus prendas guardadas</p>
          </a>

          <a href="/usuarioInfo"
            class="bg-cream-dark rounded-2xl p-8 group hover:bg-sand/50 transition-colors duration-300">
            <div class="flex justify-between items-start mb-4">
              <div class="w-10 h-10 bg-ink/10 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-ink" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <span class="text-stone group-hover:text-ink transition-colors text-lg">→</span>
            </div>
            <h3 class="text-base font-display text-ink mb-1 lowercase">Mi <em class="italic">información</em></h3>
            <p class="text-xs text-stone tracking-wide">Datos personales y dirección</p>
          </a>
        </div>

        <!-- Recomendaciones personalizadas -->
        <div class="mt-16 pt-12 border-t border-sand/60">
          <div class="flex justify-between items-end mb-8">
            <div>
              <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-2">Basado en tu estilo</p>
              <h3 class="text-2xl font-display text-ink tracking-tight lowercase">recomendado para <em class="italic">ti</em></h3>
            </div>
            <a href="/productos" class="text-[11px] tracking-[0.2em] uppercase font-medium text-ink link-underline hidden md:inline-block">
              Ver más →
            </a>
          </div>
          <div class="flex gap-5 overflow-x-auto no-scrollbar pb-4">
            <a v-for="p in recomendados" :key="p.id" :href="'/producto/' + p.slug"
              class="shrink-0 w-[220px] md:w-[260px] group cursor-pointer">
              <div class="aspect-[3/4] bg-cream-dark rounded-2xl overflow-hidden mb-3">
                <img :src="p.imagen" :alt="p.nombre"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p class="text-xs font-semibold text-ink tracking-wide uppercase">{{ p.nombre }}</p>
              <p class="text-xs text-ink font-medium mt-1">{{ p.precio }}</p>
            </a>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './Partials/Header.vue'
import Footer from './Partials/Footer.vue'
import AccountTabs from './Partials/AccountTabs.vue'

defineProps({
  stats: { type: Array, default: () => [] },
  recomendados: { type: Array, default: () => [] },
})
</script>