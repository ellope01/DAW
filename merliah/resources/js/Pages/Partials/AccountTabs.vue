<template>
  <div class="border-b border-sand/60 bg-cream">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div class="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
        <a v-for="tab in tabs" :key="tab.key"
          :href="tab.href"
          :class="[
            'px-5 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-300 whitespace-nowrap',
            activo === tab.key
              ? 'bg-ink text-cream'
              : 'bg-cream-dark text-stone hover:bg-sand hover:text-ink'
          ]">
          {{ tab.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activo: { type: String, default: '' },
})

const tabs = [
  { key: 'pedidos',      label: 'Pedidos',       href: '/pedido' },
  { key: 'favoritos',    label: 'Favoritos',     href: '/favorito' },
  { key: 'informacion',  label: 'Información',   href: '/usuarioInfo' },
  { key: 'outfits',      label: 'Mis Outfits',   href: '/outfits' },
]
</script>
