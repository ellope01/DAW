<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <Header activo="tienda" />

    <main class="flex-1">

      <!-- Breadcrumb -->
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-5">
        <p class="text-[11px] text-stone tracking-wide">
          <a href="/productos" class="hover:text-ink transition-colors link-underline">Tienda</a>
          <span class="mx-2 text-taupe">—</span>
          <span class="text-ink font-medium">{{ producto.nombre }}</span>
        </p>
      </div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 pb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          <!-- Galería -->
          <div class="flex gap-3 md:gap-4">
            <!-- Thumbnails -->
            <div class="hidden md:flex flex-col gap-2.5">
              <button v-for="(img, i) in producto.imagenes" :key="i"
                @click="imagenActiva = i"
                :class="imagenActiva === i ? 'ring-2 ring-ink ring-offset-2' : 'hover:opacity-80'"
                class="w-16 h-20 bg-cream-dark rounded-xl overflow-hidden transition-all duration-300">
                <img v-if="img" :src="img" :alt="`${producto.nombre} ${i+1}`" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full bg-gradient-to-b from-sand to-taupe"></div>
              </button>
            </div>

            <!-- Main image -->
            <div class="flex-1 aspect-[3/4] bg-cream-dark rounded-3xl overflow-hidden">
              <img v-if="producto.imagenes[imagenActiva]"
                :src="producto.imagenes[imagenActiva]"
                :alt="producto.nombre"
                class="w-full h-full object-cover" />
              <div v-else
                class="w-full h-full bg-gradient-to-b from-sand via-taupe to-stone-dark flex items-center justify-center">
                <span class="text-stone text-xs tracking-widest uppercase">Imagen del producto</span>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="py-2 md:py-4 flex flex-col">
            <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-2">{{ producto.categoria }}</p>
            <h2 class="text-3xl md:text-4xl font-display text-ink tracking-tight mb-2 lowercase">
              {{ producto.nombre }}
            </h2>

            <!-- Stars -->
            <div class="flex items-center gap-2 mb-6">
              <div class="flex gap-0.5">
                <svg v-for="s in 5" :key="s" class="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span class="text-xs text-stone">(46 reseñas)</span>
            </div>

            <!-- Precio -->
            <div class="flex items-baseline gap-4 mb-8">
              <p v-if="producto.precio_oferta" class="text-2xl font-display font-medium text-ink">{{ producto.precio_oferta }}</p>
              <p :class="producto.precio_oferta ? 'text-base text-stone line-through' : 'text-2xl font-display font-medium text-ink'">
                {{ producto.precio }}
              </p>
            </div>

            <div class="h-px bg-sand/60 mb-8"></div>

            <!-- Colores -->
            <div class="mb-8">
              <p class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium mb-4">
                Color — <span class="text-ink">{{ colorSeleccionado?.nombre ?? 'Selecciona' }}</span>
              </p>
              <div class="flex gap-3">
                <button v-for="color in producto.colores" :key="color.nombre"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.nombre"
                  :class="colorSeleccionado?.nombre === color.nombre ? 'ring-2 ring-offset-2 ring-ink scale-110' : 'hover:scale-110'"
                  @click="colorSeleccionado = color"
                  class="w-9 h-9 rounded-full border border-sand transition-all duration-300 cursor-pointer"></button>
              </div>
            </div>

            <!-- Tallas -->
            <div class="mb-8">
              <div class="flex justify-between items-center mb-4">
                <p class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Talla</p>
                <a href="#" class="text-[11px] text-stone link-underline hover:text-ink transition-colors">
                  Guía de tallas
                </a>
              </div>
              <div class="flex gap-2 flex-wrap">
                <button v-for="t in producto.tallas" :key="t.talla"
                  :disabled="t.stock === 0"
                  @click="tallaSeleccionada = t.talla"
                  :class="[
                    tallaSeleccionada === t.talla
                      ? 'bg-ink text-cream border-ink'
                      : 'border-sand text-stone hover:border-ink hover:text-ink',
                    t.stock === 0 ? 'opacity-30 cursor-not-allowed line-through' : 'cursor-pointer'
                  ]"
                  class="px-5 py-2.5 border text-[11px] tracking-[0.15em] uppercase font-medium rounded-full transition-all duration-300">
                  {{ t.talla }}
                </button>
              </div>
              <p v-if="errorTalla" class="text-[11px] text-error mt-2 font-medium">{{ errorTalla }}</p>
            </div>

            <!-- Descripción -->
            <p class="text-sm text-stone leading-relaxed tracking-wide mb-8">
              {{ producto.descripcion }}
            </p>

            <!-- CTAs -->
            <div class="flex gap-3">
              <button @click="agregarAlCarrito"
                class="flex-1 bg-ink text-cream py-4 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-charcoal transition-colors duration-300">
                Añadir al carrito
              </button>
              <button @click="toggleFavorito"
                :class="esFavorito ? 'border-ink text-ink' : 'border-sand text-stone hover:border-ink hover:text-ink'"
                class="w-14 h-14 border rounded-full flex items-center justify-center transition-all duration-300 text-lg">
                {{ esFavorito ? '♥' : '♡' }}
              </button>
            </div>

            <!-- Acordeón detalles -->
            <div class="mt-10 pt-8 border-t border-sand/60 flex flex-col gap-0">
              <details class="group border-b border-sand/60">
                <summary class="flex justify-between items-center cursor-pointer text-[11px] tracking-[0.2em] uppercase text-ink font-medium py-4">
                  Composición y cuidados
                  <span class="text-base text-stone group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p class="text-xs text-stone leading-relaxed pb-4">
                  {{ producto.composicion }}<br />{{ producto.cuidados }}
                </p>
              </details>
              <details class="group border-b border-sand/60">
                <summary class="flex justify-between items-center cursor-pointer text-[11px] tracking-[0.2em] uppercase text-ink font-medium py-4">
                  Envío y devoluciones
                  <span class="text-base text-stone group-open:rotate-45 transition-transform duration-300">+</span>
                </summary>
                <p class="text-xs text-stone leading-relaxed pb-4">
                  Envío gratis en pedidos +80€. Devoluciones gratuitas en 30 días. Entrega en 2-4 días laborables.
                </p>
              </details>
            </div>
          </div>
        </div>

        <!-- Recomendados -->
        <div class="mt-20 md:mt-28">
          <div class="flex justify-between items-end mb-10">
            <div>
              <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-2">Pensado para ti</p>
              <h3 class="text-2xl md:text-3xl font-display text-ink tracking-tight lowercase">también te puede <em class="italic">gustar</em></h3>
            </div>
            <a href="/productos" class="text-[11px] tracking-[0.2em] uppercase font-medium text-ink link-underline hidden md:inline-block">
              Ver todos →
            </a>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
            <a v-for="rel in relacionados" :key="rel.id"
              :href="'/producto/' + rel.slug"
              class="group cursor-pointer">
              <div class="aspect-[3/4] bg-cream-dark rounded-2xl overflow-hidden mb-3">
                <img v-if="rel.imagen" :src="rel.imagen" :alt="rel.nombre"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div v-else class="w-full h-full bg-gradient-to-b from-sand to-taupe group-hover:scale-105 transition-transform duration-700"></div>
              </div>
              <p class="text-sm font-semibold text-ink tracking-wide uppercase mb-0.5">{{ rel.nombre }}</p>
              <p class="text-sm text-ink font-medium">{{ rel.precio }}</p>
            </a>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Inertia as router } from '@inertiajs/inertia'
import Header from './Partials/Header.vue'
import Footer from './Partials/Footer.vue'

const props = defineProps({
  producto:    { type: Object, default: () => ({
    nombre: 'Vestido Lino Verano',
    categoria: 'Vestidos',
    precio: '89,99€',
    precio_oferta: null,
    descripcion: 'Vestido de lino premium de corte fluido, perfecto para los días cálidos de verano. Confeccionado con lino italiano de la más alta calidad, ofrece una caída natural y elegante.',
    composicion: '100% Lino italiano. Forro: 100% Algodón orgánico.',
    cuidados: 'Lavar a mano o programa delicado a 30°C. No usar secadora.',
    colores: [
      { nombre: 'Arena', hex: '#C4B9A8' },
      { nombre: 'Crema', hex: '#FAF8F5' },
      { nombre: 'Negro', hex: '#1A1714' },
    ],
    tallas: [
      { talla: 'XS', stock: 3 },
      { talla: 'S', stock: 5 },
      { talla: 'M', stock: 2 },
      { talla: 'L', stock: 0 },
      { talla: 'XL', stock: 4 },
    ],
    imagenes: [
      '/images/hero/hero-main.png',
      '/images/hero/hero-outfit.png',
      '/images/hero/hero-collection.png',
    ],
  }) },
  relacionados: { type: Array, default: () => [
    { id: 1, nombre: 'Blazer Oversize', precio: '129,99€', imagen: '/images/hero/hero-outfit.png' },
    { id: 2, nombre: 'Pantalón Wide', precio: '69,99€', imagen: '/images/hero/hero-collection.png' },
    { id: 3, nombre: 'Falda Midi', precio: '59,99€', imagen: '/images/hero/hero-main.png' },
    { id: 4, nombre: 'Jersey Cashmere', precio: '149,99€', imagen: '/images/hero/hero-outfit.png' },
  ] },
})

const imagenActiva   = ref(0)
const tallaSeleccionada = ref(null)
const colorSeleccionado = ref(props.producto.colores?.[0] ?? null)
const errorTalla     = ref('')
const esFavorito     = ref(false)

function agregarAlCarrito() {
  if (!tallaSeleccionada.value) {
    errorTalla.value = 'Selecciona una talla'
    return
  }
  errorTalla.value = ''
  router.post('/carrito', {
    producto_id: props.producto.id,
    talla:       tallaSeleccionada.value,
    color:       colorSeleccionado.value?.nombre,
    cantidad:    1,
  })
}

function toggleFavorito() {
  router.post('/favorito/toggle', { producto_id: props.producto.id }, {
    preserveScroll: true,
    onSuccess: () => {
      esFavorito.value = !esFavorito.value
    },
  })
}
</script>