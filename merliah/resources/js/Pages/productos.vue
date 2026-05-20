¡<template>
  <div class="min-h-screen bg-[#F5F0EB] font-serif flex flex-col">

    <Header activo="tienda" />

    <main class="pt-16 flex-1">

      <!-- Título página -->
      <div class="max-w-7xl mx-auto px-8 py-12 flex items-end justify-between border-b border-[#D6CAB8]">
        <div>
          <p class="text-xs tracking-[0.3em] uppercase text-[#6B5E4E] mb-2">
            Catálogo completo
          </p>

          <h1 class="text-6xl font-light text-[#1A1208] tracking-tight">
            Tienda
          </h1>
        </div>

        <p class="text-xs text-[#6B5E4E] tracking-wide">
          {{ productos.total }} productos
        </p>
      </div>

      <div class="max-w-7xl mx-auto px-8 py-8 flex gap-12">

        <!-- Sidebar filtros -->
        <aside class="w-52 shrink-0">
          <div class="sticky top-24">

            <!-- Categorías -->
            <div class="mb-8">
              <p class="text-xs tracking-[0.3em] uppercase text-[#1A1208] mb-4">
                Categoría
              </p>

              <div class="flex flex-col gap-2">
                <label
                  v-for="cat in categorias"
                  :key="cat.id"
                  class="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    :value="cat.slug"
                    v-model="filtrosLocales.categoria"
                    class="appearance-none w-3 h-3 border border-[#D6CAB8] checked:bg-[#1A1208] checked:border-[#1A1208] transition-colors"
                  />

                  <span class="text-xs text-[#6B5E4E] group-hover:text-[#1A1208] transition-colors tracking-wide">
                    {{ cat.nombre }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Precio -->
            <div class="mb-8">
              <p class="text-xs tracking-[0.3em] uppercase text-[#1A1208] mb-4">
                Precio
              </p>

              <div class="flex flex-col gap-2">
                <label
                  v-for="rango in rangosPrecios"
                  :key="rango.label"
                  class="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="precio"
                    :value="rango.value"
                    v-model="filtrosLocales.precio"
                    class="appearance-none w-3 h-3 border border-[#D6CAB8] checked:bg-[#1A1208] rounded-full transition-colors"
                  />

                  <span class="text-xs text-[#6B5E4E] group-hover:text-[#1A1208] transition-colors tracking-wide">
                    {{ rango.label }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Colores -->
            <div class="mb-8">
              <p class="text-xs tracking-[0.3em] uppercase text-[#1A1208] mb-4">
                Color
              </p>

              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="color in coloresDisponibles"
                  :key="color.nombre"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.nombre"
                  :class="filtrosLocales.color === color.nombre
                    ? 'ring-2 ring-offset-1 ring-[#1A1208]'
                    : ''"
                  @click="filtrosLocales.color =
                    filtrosLocales.color === color.nombre
                      ? ''
                      : color.nombre"
                  class="w-6 h-6 rounded-full border border-[#D6CAB8] hover:scale-110 transition-transform"
                />
              </div>
            </div>

            <!-- Botones -->
            <button
              @click="aplicarFiltros"
              class="w-full bg-[#1A1208] text-[#F5F0EB] py-3 text-xs tracking-[0.3em] uppercase hover:bg-[#6B5E4E] transition-colors duration-300 mb-2"
            >
              Aplicar
            </button>

            <button
              @click="limpiarFiltros"
              class="w-full border border-[#D6CAB8] py-3 text-xs tracking-[0.3em] uppercase text-[#6B5E4E] hover:border-[#1A1208] hover:text-[#1A1208] transition-colors duration-300"
            >
              Limpiar
            </button>

          </div>
        </aside>

        <!-- Grid productos -->
        <div class="flex-1">

          <!-- Ordenar -->
          <div class="flex justify-end mb-8">
            <select
              v-model="filtrosLocales.orden"
              @change="aplicarFiltros"
              class="text-xs tracking-[0.2em] uppercase text-[#6B5E4E] bg-transparent border-b border-[#D6CAB8] pb-1 outline-none cursor-pointer"
            >
              <option value="destacados">Más vendidos</option>
              <option value="precio_asc">Precio: menor a mayor</option>
              <option value="precio_desc">Precio: mayor a menor</option>
              <option value="novedades">Novedades</option>
            </select>
          </div>

          <!-- Sin resultados -->
          <div v-if="productos.data.length === 0" class="py-24 text-center">

            <p class="text-3xl font-light text-[#1A1208] italic mb-4">
              Sin resultados
            </p>

            <p class="text-xs text-[#6B5E4E] tracking-wide mb-6">
              Prueba con otros filtros
            </p>

            <button
              @click="limpiarFiltros"
              class="text-xs tracking-[0.3em] uppercase border-b border-[#1A1208] pb-0.5 text-[#1A1208]"
            >
              Limpiar filtros
            </button>

          </div>

          <!-- Productos -->
          <div v-else class="grid grid-cols-3 gap-x-6 gap-y-12">

            <Link
              v-for="producto in productos.data"
              :key="producto.id"
              :href="'/producto/' + producto.slug"
              class="group cursor-pointer"
            >

              <div class="relative aspect-[3/4] bg-[#E8DDD0] mb-4 overflow-hidden">

                <img
                  v-if="producto.imagen"
                  :src="producto.imagen"
                  :alt="producto.nombre"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div
                  v-else
                  class="w-full h-full bg-gradient-to-b from-[#D6CAB8] to-[#C4B8A0] group-hover:scale-105 transition-transform duration-700"
                />

                <!-- Badges -->
                <div
                  v-if="producto.es_nuevo"
                  class="absolute top-4 left-4 bg-[#1A1208] text-[#F5F0EB] text-[10px] tracking-[0.2em] uppercase px-2 py-1"
                >
                  Nuevo
                </div>

                <div
                  v-else-if="producto.tiene_oferta"
                  class="absolute top-4 left-4 bg-[#C4A882] text-[#F5F0EB] text-[10px] tracking-[0.2em] uppercase px-2 py-1"
                >
                  Oferta
                </div>

                <!-- Favorito -->
                <button
                  @click.prevent="toggleFavorito(producto.id)"
                  class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 bg-[#F5F0EB]/80 flex items-center justify-center hover:bg-[#F5F0EB]"
                >
                  <span class="text-xs">♡</span>
                </button>

              </div>

              <div class="flex justify-between items-start">

                <div>
                  <p class="text-sm text-[#1A1208] tracking-wide">
                    {{ producto.nombre }}
                  </p>

                  <div class="flex gap-1.5 mt-1.5">
                    <div
                      v-for="color in producto.colores"
                      :key="color.nombre"
                      :style="{ backgroundColor: color.hex }"
                      :title="color.nombre"
                      class="w-3 h-3 rounded-full border border-[#D6CAB8]"
                    />
                  </div>
                </div>

                <p class="text-sm text-[#1A1208]">
                  {{ producto.precio }}
                </p>

              </div>

            </Link>

          </div>

          <!-- Paginación -->
          <div
            v-if="productos.last_page > 1"
            class="flex justify-center gap-2 mt-16 pb-8"
          >

            <Link
              v-for="page in productos.last_page"
              :key="page"
              :href="productos.links[page]?.url ?? '#'"
              :class="page === productos.current_page
                ? 'bg-[#1A1208] text-[#F5F0EB]'
                : 'text-[#6B5E4E] hover:text-[#1A1208]'"
              class="w-8 h-8 text-xs tracking-wide flex items-center justify-center transition-colors"
            >
              {{ page }}
            </Link>

          </div>

        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-[#D6CAB8] px-8 py-8">
      <div class="max-w-7xl mx-auto flex justify-between items-center">

        <p class="text-xs text-[#6B5E4E] tracking-wide">
          © 2025 Velour
        </p>

        <p class="text-xs text-[#6B5E4E] tracking-wide">
          Envío gratis desde 80€
        </p>

      </div>
    </footer>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import { Inertia as router } from '@inertiajs/inertia'
import Header from './Partials/Header.vue'

const props = defineProps({
  productos:  { type: Object, required: true },
  categorias: { type: Array, default: () => [] },
  filtros:    { type: Object, default: () => ({}) },
})

const rangosPrecios = [
  { label: 'Menos de 30€', value: '0-30' },
  { label: '30€ — 60€', value: '30-60' },
  { label: '60€ — 100€', value: '60-100' },
  { label: 'Más de 100€', value: '100-9999' },
]

const coloresDisponibles = [
  { nombre: 'Arena', hex: '#C4B8A0' },
  { nombre: 'Ebano', hex: '#1A1208' },
  { nombre: 'Rosa', hex: '#E8C4B8' },
  { nombre: 'Crema', hex: '#F5F0EB' },
  { nombre: 'Gris', hex: '#9E9E9E' },
]

const filtrosLocales = reactive({
  categoria: props.filtros.categoria ?? '',
  precio: props.filtros.precio ?? '',
  color: props.filtros.color ?? '',
  orden: props.filtros.orden ?? 'destacados',
})

function aplicarFiltros() {
  const [precio_min, precio_max] = filtrosLocales.precio
    ? filtrosLocales.precio.split('-')
    : [null, null]

  router.get(
    '/productos',
    {
      categoria: filtrosLocales.categoria || undefined,
      color: filtrosLocales.color || undefined,
      precio_min: precio_min || undefined,
      precio_max: precio_max || undefined,
      orden: filtrosLocales.orden || undefined,
    },
    { preserveScroll: true }
  )
}

function limpiarFiltros() {
  filtrosLocales.categoria = ''
  filtrosLocales.precio = ''
  filtrosLocales.color = ''
  filtrosLocales.orden = 'destacados'

  router.get('/productos')
}

function toggleFavorito(productoId) {
  router.post(
    '/favorito/toggle',
    { producto_id: productoId },
    { preserveScroll: true }
  )
}
</script>

<style scoped>
</style>