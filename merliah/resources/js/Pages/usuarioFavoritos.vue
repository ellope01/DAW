<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <Header activo="cuenta" />
    <AccountTabs activo="favoritos" />

    <main class="flex-1">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16">

        <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <h2 class="text-4xl md:text-5xl font-display text-ink tracking-tight lowercase">
            mis <em class="italic">favoritos</em>
          </h2>
          <p class="text-xs text-stone tracking-wide">{{ favoritos.length }} prendas guardadas</p>
        </div>

        <!-- Grid -->
        <div v-if="favoritos.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-5 stagger-children">
          <div v-for="producto in favoritos" :key="producto.id" class="group animate-fade-in-up">

            <div class="relative aspect-[3/4] bg-cream-dark rounded-2xl overflow-hidden mb-4">
              <a :href="'/producto/' + producto.slug">
                <img v-if="producto.imagen" :src="producto.imagen" :alt="producto.nombre"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div v-else
                  class="w-full h-full bg-gradient-to-b from-sand to-taupe group-hover:scale-105 transition-transform duration-700">
                </div>
              </a>

              <button @click="quitarFavorito(producto.id)"
                class="absolute top-3 right-3 w-9 h-9 bg-cream/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cream"
                title="Quitar de favoritos">
                <span class="text-sm text-error">♥</span>
              </button>
            </div>

            <div class="flex justify-between items-start mb-3">
              <div>
                <a :href="'/producto/' + producto.slug"
                  class="text-sm font-semibold text-ink tracking-wide uppercase hover:text-stone transition-colors">
                  {{ producto.nombre }}
                </a>
                <div v-if="producto.colores" class="flex gap-1.5 mt-1.5">
                  <div v-for="color in producto.colores" :key="color.nombre"
                    :style="{ backgroundColor: color.hex }"
                    :title="color.nombre"
                    class="w-3 h-3 rounded-full border border-sand/80"></div>
                </div>
              </div>
              <p class="text-sm text-ink font-medium shrink-0 ml-2">{{ producto.precio }}</p>
            </div>

            <button @click="agregarAlCarrito(producto)"
              class="w-full border border-sand py-3 text-[11px] tracking-[0.15em] uppercase font-medium text-stone rounded-full hover:border-ink hover:text-ink transition-colors duration-300">
              Añadir al carrito
            </button>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="py-32 text-center">
          <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-4">Lista vacía</p>
          <p class="text-3xl font-display text-ink italic mb-8">Aún no tienes favoritos</p>
          <a href="/productos"
            class="inline-block bg-ink text-cream text-[11px] tracking-[0.25em] uppercase font-medium px-8 py-4 rounded-full hover:bg-charcoal transition-colors">
            Explorar la tienda →
          </a>
        </div>
      </div>
    </main>

    <!-- Modal talla -->
    <Transition name="fade">
      <div v-if="modalProducto" class="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
        <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="modalProducto = null"></div>
        <div class="relative bg-cream rounded-2xl p-8 w-full max-w-sm animate-scale-in">
          <button @click="modalProducto = null" class="absolute top-4 right-4 text-stone hover:text-ink text-lg">×</button>
          <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-3">Selecciona talla</p>
          <p class="text-lg font-display text-ink mb-6 lowercase">{{ modalProducto.nombre }}</p>
          <div class="flex gap-2 flex-wrap mb-6">
            <button v-for="talla in ['XS','S','M','L','XL']" :key="talla"
              @click="tallaModal = talla"
              :class="tallaModal === talla ? 'bg-ink text-cream border-ink' : 'border-sand text-stone hover:border-ink hover:text-ink'"
              class="px-5 py-2.5 border text-[11px] tracking-[0.15em] uppercase font-medium rounded-full transition-colors cursor-pointer">
              {{ talla }}
            </button>
          </div>
          <button @click="confirmarCarrito"
            :disabled="!tallaModal"
            class="w-full bg-ink text-cream py-4 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-charcoal transition-colors disabled:opacity-40">
            Añadir al carrito
          </button>
        </div>
      </div>
    </Transition>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Inertia as router } from '@inertiajs/inertia'
import Header from './Partials/Header.vue'
import Footer from './Partials/Footer.vue'
import AccountTabs from './Partials/AccountTabs.vue'

defineProps({
  favoritos: { type: Array, default: () => [] },
})

const modalProducto = ref(null)
const tallaModal    = ref(null)

function quitarFavorito(productoId) {
  router.post('/favorito/toggle', { producto_id: productoId }, {
    preserveScroll: true
  })
}

function agregarAlCarrito(producto) {
  modalProducto.value = producto
  tallaModal.value = null
}

function confirmarCarrito() {
  if (!tallaModal.value) return
  router.post('/carrito', {
    producto_id: modalProducto.value.id,
    talla: tallaModal.value,
    color: modalProducto.value.colores?.[0]?.nombre ?? 'Arena',
    cantidad: 1
  }, {
    preserveScroll: true,
    onSuccess: () => {
      modalProducto.value = null
    }
  })
}
</script>

<style scoped></style>