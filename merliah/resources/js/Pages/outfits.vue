<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <Header activo="outfits" />

    <main class="flex-1">

      <!-- Hero -->
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 pt-8 pb-8">
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-sand/60 pb-8">
          <div>
            <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-2">Inspiración</p>
            <h2 class="text-4xl md:text-6xl font-display text-ink tracking-tight leading-none lowercase">
              looks<br /><em class="italic">curados</em>
            </h2>
          </div>
          <p class="text-sm text-stone max-w-xs leading-relaxed tracking-wide md:text-right">
            Combinaciones pensadas para ti. Cada look cuenta una historia, cada prenda tiene su lugar.
          </p>
        </div>
      </div>

      <!-- Filtros categoría -->
      <div class="border-b border-sand/60">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-10 flex gap-2 overflow-x-auto no-scrollbar py-3">
          <button v-for="cat in categorias" :key="cat"
            @click="categoriaActiva = cat"
            :class="categoriaActiva === cat
              ? 'bg-ink text-cream'
              : 'bg-cream-dark text-stone hover:bg-sand hover:text-ink'"
            class="text-[11px] tracking-[0.15em] uppercase font-medium px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap">
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Outfit Generator CTA -->
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        <div class="bg-ink rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-center md:text-left">
            <p class="text-[11px] tracking-[0.25em] uppercase text-taupe font-medium mb-2">✨ Nuevo</p>
            <h3 class="text-2xl md:text-3xl font-display text-cream tracking-tight mb-2">
              Genera tu outfit <em class="italic">perfecto</em>
            </h3>
            <p class="text-xs text-taupe tracking-wide max-w-sm">
              Basado en tu estilo, te creamos combinaciones únicas con las prendas de nuestra tienda.
            </p>
          </div>
          <button @click="generarOutfit"
            class="bg-cream text-ink text-[11px] tracking-[0.25em] uppercase font-medium px-8 py-4 rounded-full hover:bg-sand transition-colors duration-300 shrink-0">
            Generar outfit →
          </button>
        </div>
      </div>

      <!-- Generated Outfit Display -->
      <Transition name="slide-up">
        <div v-if="outfitGenerado" class="max-w-[1400px] mx-auto px-6 lg:px-10 pb-12">
          <div class="bg-cream-dark rounded-3xl p-8 md:p-10">
            <div class="flex justify-between items-start mb-6">
              <div>
                <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-1">Tu outfit personalizado</p>
                <h4 class="text-xl font-display text-ink">{{ outfitGenerado.nombre }}</h4>
              </div>
              <div class="flex gap-2">
                <button class="border border-sand px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium text-stone rounded-full hover:border-ink hover:text-ink transition-colors">
                  ♡ Guardar
                </button>
                <button @click="generarOutfit"
                  class="bg-ink text-cream px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-medium rounded-full hover:bg-charcoal transition-colors">
                  ↻ Nuevo
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="prenda in outfitGenerado.prendas" :key="prenda.tipo"
                class="group">
                <div class="aspect-[3/4] bg-cream rounded-2xl overflow-hidden mb-3 relative">
                  <img :src="prenda.imagen" :alt="prenda.nombre"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span class="absolute top-3 left-3 bg-ink/80 text-cream text-[9px] tracking-[0.15em] uppercase font-medium px-2.5 py-1 rounded-full">
                    {{ prenda.tipo }}
                  </span>
                </div>
                <p class="text-xs font-semibold text-ink tracking-wide uppercase">{{ prenda.nombre }}</p>
                <p class="text-xs text-stone mt-0.5">{{ prenda.precio }}</p>
              </div>
            </div>

            <div class="flex justify-between items-center mt-6 pt-6 border-t border-sand/60">
              <p class="text-sm text-stone">Total del look: <span class="text-ink font-semibold">{{ outfitGenerado.total }}</span></p>
              <button @click="añadirTodoAlCarrito" class="bg-ink text-cream text-[11px] tracking-[0.25em] uppercase font-medium px-8 py-3 rounded-full hover:bg-charcoal transition-colors">
                Añadir todo al carrito
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Grid editorial -->
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 md:py-12">

        <!-- Fila 1: featured + 2 pequeños -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <div class="md:col-span-2 group cursor-pointer">
            <div class="relative aspect-[4/3] bg-cream-dark rounded-3xl overflow-hidden mb-4">
              <img src="/images/hero/hero-collection.png" alt="Look editorial"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"></div>
              <div class="absolute top-5 left-5 bg-ink text-cream text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1.5 rounded-full">
                Editorial
              </div>
              <div class="absolute bottom-6 left-6 right-6">
                <div class="bg-cream/90 backdrop-blur-sm px-4 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 inline-block">
                  <p class="text-[11px] tracking-[0.15em] uppercase text-ink font-medium">Ver prendas →</p>
                </div>
              </div>
            </div>
            <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-1">Look 01 — Primavera</p>
            <h3 class="text-xl md:text-2xl font-display text-ink tracking-tight mb-1 lowercase">
              el blanco roto <em class="italic">perfecto</em>
            </h3>
            <p class="text-xs text-stone leading-relaxed tracking-wide max-w-sm">
              Vestido lino + sandalias planas + bolso de rafia. Simplicidad con intención.
            </p>
          </div>

          <div class="flex flex-col gap-5">
            <div v-for="i in 2" :key="i" class="group cursor-pointer">
              <div class="relative aspect-[3/4] bg-cream-dark rounded-2xl overflow-hidden mb-3">
                <img :src="i === 1 ? '/images/hero/hero-main.png' : '/images/hero/hero-outfit.png'" alt="Look"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent"></div>
              </div>
              <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-1">Look 0{{ i + 1 }}</p>
              <h3 class="text-base font-display text-ink tracking-tight lowercase">
                monocromo <em class="italic">arena</em>
              </h3>
            </div>
          </div>
        </div>

        <!-- Fila 2: 3 iguales -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <div v-for="i in 3" :key="i" class="group cursor-pointer">
            <div class="relative aspect-[3/4] bg-cream-dark rounded-2xl overflow-hidden mb-4">
              <img :src="['/images/hero/hero-outfit.png', '/images/hero/hero-main.png', '/images/hero/hero-collection.png'][i-1]"
                alt="Look"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <div class="bg-cream/90 backdrop-blur-sm px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 inline-block">
                  <p class="text-[10px] tracking-[0.15em] uppercase text-ink font-medium">Ver →</p>
                </div>
              </div>
            </div>
            <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-1">Look 0{{ i + 3 }}</p>
            <h3 class="text-base font-display text-ink tracking-tight mb-1 lowercase">
              look de <em class="italic">verano</em>
            </h3>
            <p class="text-xs text-stone tracking-wide">3 prendas · Desde 89€</p>
          </div>
        </div>

        <!-- CTA strip -->
        <div class="bg-ink rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
          <div class="text-center md:text-left">
            <p class="text-[11px] tracking-[0.25em] uppercase text-taupe font-medium mb-2">¿No sabes por dónde empezar?</p>
            <h3 class="text-2xl md:text-3xl font-display text-cream tracking-tight">
              Encuentra tu <em class="italic">estilo</em>
            </h3>
          </div>
          <a href="/registro"
            class="border border-cream/40 text-cream text-[11px] tracking-[0.25em] uppercase font-medium px-8 py-4 rounded-full hover:bg-cream hover:text-ink transition-all duration-300 shrink-0">
            Test de estilo →
          </a>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Inertia as router } from '@inertiajs/inertia'
import Header from './Partials/Header.vue'
import Footer from './Partials/Footer.vue'

defineProps({
  outfitsList: { type: Array, default: () => [] }
})

const categorias = ['Todos', 'Casual', 'Formal', 'Verano', 'Primavera']
const categoriaActiva = ref('Todos')

const outfitGenerado = ref(null)

function generarOutfit() {
  axios.post('/outfits/generar')
    .then(response => {
      outfitGenerado.value = response.data
    })
    .catch(error => {
      console.error('Error al generar outfit:', error)
    })
}

function añadirTodoAlCarrito() {
  if (!outfitGenerado.value) return
  
  const promesas = outfitGenerado.value.prendas.map(prenda => {
    return axios.post('/carrito', {
      producto_id: prenda.id,
      talla: 'M',
      color: 'Arena',
      cantidad: 1
    })
  })

  Promise.all(promesas)
    .then(() => {
      router.visit('/usuarioCarrito')
    })
    .catch(err => {
      console.error('Error al añadir conjunto al carrito:', err)
      router.visit('/usuarioCarrito')
    })
}
</script>