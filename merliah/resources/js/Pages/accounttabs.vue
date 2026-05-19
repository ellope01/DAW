<template>
  <div class="border-b border-[#D6CAB8]">
    <div class="max-w-7xl mx-auto px-8">
      <div class="flex gap-8">
        <Link v-for="tab in tabs" :key="tab.nombre"
          :href="route(tab.ruta)"
          :class="activo === tab.key
            ? 'border-b-2 border-[#1A1208] text-[#1A1208]'
            : 'text-[#6B5E4E] hover:text-[#1A1208]'"
          class="text-xs tracking-[0.2em] uppercase py-4 transition-colors">
          {{ tab.nombre }}
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'

defineProps({
  activo: { type: String, default: 'resumen' },
})

const tabs = [
  { key: 'resumen',     nombre: 'Resumen',     ruta: 'usuario' },
  { key: 'pedidos',     nombre: 'Pedidos',     ruta: 'pedidos' },
  { key: 'favoritos',   nombre: 'Favoritos',   ruta: 'favoritos' },
  { key: 'informacion', nombre: 'Información', ruta: 'usuario.info' },
]
</script>