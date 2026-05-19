<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <Header activo="tienda" />

    <main class="flex-1">

      <!-- Page title -->
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 pt-8 pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-sand/60">
        <div>
          <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-2">Catálogo completo</p>
          <h2 class="text-4xl md:text-5xl font-display text-ink tracking-tight lowercase">tienda</h2>
        </div>
        <p class="text-xs text-stone tracking-wide">{{ productos.total || productos.data?.length || 0 }} productos</p>
      </div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 flex gap-10">

        <!-- Sidebar filtros -->
        <aside class="hidden md:block w-56 shrink-0">
          <div class="sticky top-28">

            <div class="mb-8">
              <p class="text-[11px] tracking-[0.2em] uppercase text-ink font-semibold mb-4">Categoría</p>
              <div class="flex flex-col gap-2.5">
                <label v-for="cat in categorias" :key="cat.id" class="flex items-center gap-3 cursor-pointer group">
                  <div class="relative w-4 h-4 border border-sand rounded-sm flex items-center justify-center group-hover:border-stone transition-colors">
                    <input type="checkbox"
                      :value="cat.slug"
                      v-model="filtrosLocales.categoria"
                      class="absolute inset-0 opacity-0 cursor-pointer" />
                    <svg v-if="filtrosLocales.categoria?.includes?.(cat.slug)" class="w-3 h-3 text-ink" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span class="text-xs text-stone group-hover:text-ink transition-colors tracking-wide">{{ cat.nombre }}</span>
                </label>
              </div>
            </div>

            <div class="mb-8">
              <p class="text-[11px] tracking-[0.2em] uppercase text-ink font-semibold mb-4">Precio</p>
              <div class="flex flex-col gap-2.5">
                <label v-for="rango in rangosPrecios" :key="rango.label" class="flex items-center gap-3 cursor-pointer group">
                  <div class="relative w-4 h-4 border border-sand rounded-full flex items-center justify-center group-hover:border-stone transition-colors">
                    <input type="radio" name="precio"
                      :value="rango.value"
                      v-model="filtrosLocales.precio"
                      class="absolute inset-0 opacity-0 cursor-pointer" />
                    <div v-if="filtrosLocales.precio === rango.value" class="w-2 h-2 bg-ink rounded-full"></div>
                  </div>
                  <span class="text-xs text-stone group-hover:text-ink transition-colors tracking-wide">{{ rango.label }}</span>
                </label>
              </div>
            </div>

            <div class="mb-8">
              <p class="text-[11px] tracking-[0.2em] uppercase text-ink font-semibold mb-4">Color</p>
              <div class="flex gap-2 flex-wrap">
                <button v-for="color in coloresDisponibles" :key="color.nombre"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.nombre"
                  :class="filtrosLocales.color === color.nombre ? 'ring-2 ring-offset-2 ring-ink' : ''"
                  @click="filtrosLocales.color = filtrosLocales.color === color.nombre ? '' : color.nombre"
                  class="w-7 h-7 rounded-full border border-sand hover:scale-110 transition-transform cursor-pointer"></button>
              </div>
            </div>

            <button @click="aplicarFiltros"
              class="w-full bg-ink text-cream py-3 text-[11px] tracking-[0.2em] uppercase font-medium rounded-full hover:bg-charcoal transition-colors duration-300 mb-2">
              Aplicar
            </button>
            <button @click="limpiarFiltros"
              class="w-full border border-sand py-3 text-[11px] tracking-[0.2em] uppercase font-medium text-stone rounded-full hover:border-ink hover:text-ink transition-colors duration-300">
              Limpiar
            </button>
          </div>
        </aside>

        <!-- Grid productos -->
        <div class="flex-1">

          <!-- Ordenar -->
          <div class="flex justify-end mb-8">
            <select v-model="filtrosLocales.orden" @change="aplicarFiltros"
              class="text-[11px] tracking-[0.15em] uppercase text-stone bg-transparent border border-sand rounded-full px-4 py-2 outline-none cursor-pointer hover:border-ink transition-colors">
              <option value="destacados">Más vendidos</option>
              <option value="precio_asc">Precio: menor a mayor</option>
              <option value="precio_desc">Precio: mayor a menor</option>
              <option value="novedades">Novedades</option>
            </select>
          </div>

          <!-- Sin resultados -->
          <div v-if="productosData.length === 0" class="py-24 text-center">
            <p class="text-3xl font-display text-ink italic mb-4">Sin resultados</p>
            <p class="text-xs text-stone tracking-wide mb-6">Prueba con otros filtros</p>
            <button @click="limpiarFiltros"
              class="text-[11px] tracking-[0.2em] uppercase font-medium text-ink link-underline">
              Limpiar filtros
            </button>
          </div>

          <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 stagger-children">
            <a v-for="producto in productosData" :key="producto.id"
              :href="'/producto/' + producto.slug"
              class="group cursor-pointer animate-fade-in-up">

              <div class="relative aspect-[3/4] bg-cream-dark rounded-2xl overflow-hidden mb-4">
                <img v-if="producto.imagen" :src="producto.imagen" :alt="producto.nombre"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div v-else
                  class="w-full h-full bg-gradient-to-b from-sand to-taupe group-hover:scale-105 transition-transform duration-700">
                </div>

                <div v-if="producto.es_nuevo"
                  class="absolute top-3 right-3 bg-ink text-cream text-[9px] tracking-[0.15em] uppercase font-semibold px-3 py-1 rounded-full">
                  Nuevo
                </div>
                <div v-else-if="producto.tiene_oferta"
                  class="absolute top-3 right-3 bg-accent text-cream text-[9px] tracking-[0.15em] uppercase font-semibold px-3 py-1 rounded-full">
                  Oferta
                </div>

                <!-- Hover buttons -->
                <div class="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button @click.prevent="toggleFavorito(producto.id)"
                    class="w-10 h-10 bg-cream/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cream transition-colors">
                    <span class="text-sm">♡</span>
                  </button>
                  <button class="flex-1 bg-cream/90 backdrop-blur-sm text-ink text-[10px] tracking-[0.15em] uppercase font-medium rounded-full hover:bg-cream transition-colors">
                    Vista rápida
                  </button>
                </div>
              </div>

              <!-- Stars -->
              <div class="flex items-center gap-1 mb-1">
                <div class="flex gap-0.5">
                  <svg v-for="s in 5" :key="s" class="w-2.5 h-2.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <span class="text-[10px] text-stone">({{ producto.reviews || 0 }})</span>
              </div>

              <div class="flex justify-between items-start">
                <div>
                  <p class="text-sm font-semibold text-ink tracking-wide uppercase">{{ producto.nombre }}</p>
                  <div v-if="producto.colores" class="flex gap-1.5 mt-1.5">
                    <div v-for="color in producto.colores" :key="color.nombre"
                      :style="{ backgroundColor: color.hex }"
                      :title="color.nombre"
                      class="w-3 h-3 rounded-full border border-sand/80"></div>
                  </div>
                </div>
                <p class="text-sm text-ink font-medium">{{ producto.precio }}</p>
              </div>
            </a>
          </div>

          <!-- Paginación -->
          <div v-if="productos.last_page > 1" class="flex justify-center gap-2 mt-16 pb-8">
            <button v-for="page in productos.last_page" :key="page"
              @click="irAPagina(page)"
              :class="page === productos.current_page
                ? 'bg-ink text-cream'
                : 'text-stone hover:text-ink hover:bg-cream-dark'"
              class="w-9 h-9 text-[11px] tracking-wide flex items-center justify-center rounded-full transition-colors font-medium">
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { Inertia as router } from '@inertiajs/inertia'
import Header from './Partials/Header.vue'
import Footer from './Partials/Footer.vue'

const props = defineProps({
  productos:  { type: Object, default: () => ({ data: [], total: 0, last_page: 1, current_page: 1 }) },
  categorias: { type: Array,  default: () => [] },
  filtros:    { type: Object, default: () => ({}) },
})

const productosData = computed(() => {
  return props.productos?.data || []
})

const rangosPrecios = [
  { label: 'Menos de 30€',   value: '0-30' },
  { label: '30€ — 60€',      value: '30-60' },
  { label: '60€ — 100€',     value: '60-100' },
  { label: 'Más de 100€',    value: '100-9999' },
]

const coloresDisponibles = [
  { nombre: 'Arena',  hex: '#C4B9A8' },
  { nombre: 'Negro',  hex: '#1A1714' },
  { nombre: 'Rosa',   hex: '#E8C4B8' },
  { nombre: 'Crema',  hex: '#FAF8F5' },
  { nombre: 'Camel',  hex: '#C9A87C' },
]

const filtrosLocales = reactive({
  categoria: props.filtros.categoria ?? [],
  precio:    props.filtros.precio    ?? '',
  color:     props.filtros.color     ?? '',
  orden:     props.filtros.orden     ?? 'destacados',
})

function aplicarFiltros() {
  router.get('/productos', {
    categoria: filtrosLocales.categoria,
    precio:    filtrosLocales.precio,
    color:     filtrosLocales.color,
    orden:     filtrosLocales.orden,
  }, {
    preserveState: true,
    preserveScroll: true,
  })
}

function limpiarFiltros() {
  filtrosLocales.categoria = []
  filtrosLocales.precio    = ''
  filtrosLocales.color     = ''
  filtrosLocales.orden     = 'destacados'
  aplicarFiltros()
}

function irAPagina(page) {
  router.get('/productos', {
    categoria: filtrosLocales.categoria,
    precio:    filtrosLocales.precio,
    color:     filtrosLocales.color,
    orden:     filtrosLocales.orden,
    page:      page,
  }, {
    preserveState: true,
    preserveScroll: true,
  })
}

function toggleFavorito(productoId) {
  router.post('/favorito/toggle', { producto_id: productoId }, {
    preserveScroll: true,
  })
}
</script>