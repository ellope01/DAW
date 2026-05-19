<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <Header activo="carrito" />

    <main class="flex-1">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16">

        <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <h2 class="text-4xl md:text-5xl font-display text-ink tracking-tight lowercase">
            mi <em class="italic">carrito</em>
          </h2>
          <a href="/productos"
            class="text-[11px] tracking-[0.2em] uppercase font-medium text-stone link-underline hover:text-ink transition-colors">
            ← Seguir comprando
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

          <!-- Items -->
          <div class="md:col-span-2 flex flex-col divide-y divide-sand/60 border-t border-sand/60">

            <div v-if="carritoItems.length === 0" class="py-24 text-center">
              <p class="text-3xl font-display text-ink italic mb-6">Tu carrito está vacío</p>
              <a href="/productos"
                class="inline-block bg-ink text-cream text-[11px] tracking-[0.25em] uppercase font-medium px-8 py-4 rounded-full hover:bg-charcoal transition-colors">
                Explorar la tienda →
              </a>
            </div>

            <div v-for="item in carritoItems" :key="item.id" class="py-6 md:py-8 flex gap-4 md:gap-6 items-start">

              <a :href="'/producto/' + item.slug" class="w-20 h-28 md:w-24 md:h-32 bg-cream-dark rounded-xl shrink-0 overflow-hidden block">
                <img v-if="item.imagen" :src="item.imagen" :alt="item.nombre"
                  class="w-full h-full object-cover" />
                <div v-else class="w-full h-full bg-gradient-to-b from-sand to-taupe"></div>
              </a>

              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start mb-1">
                  <a :href="'/producto/' + item.slug"
                    class="text-sm font-semibold text-ink tracking-wide uppercase hover:text-stone transition-colors">
                    {{ item.nombre }}
                  </a>
                  <p class="text-sm text-ink font-medium shrink-0 ml-4">
                    {{ (item.precio_num * item.cantidad).toFixed(2).replace('.', ',') }}€
                  </p>
                </div>
                <p class="text-xs text-stone tracking-wide mb-1">
                  {{ item.color ? item.color + ' · ' : '' }}Talla {{ item.talla }}
                </p>
                <p class="text-xs text-taupe-dark tracking-wide mb-5">{{ item.precio }} / ud.</p>

                <div class="flex items-center gap-4">
                  <!-- Cantidad -->
                  <div class="flex items-center border border-sand rounded-full overflow-hidden">
                    <button @click="actualizarCantidad(item, item.cantidad - 1)"
                      :disabled="item.cantidad <= 1"
                      class="w-9 h-9 flex items-center justify-center text-stone hover:text-ink text-sm transition-colors disabled:opacity-30">
                      −
                    </button>
                    <span class="w-8 h-9 flex items-center justify-center text-xs text-ink font-medium border-x border-sand">
                      {{ item.cantidad }}
                    </span>
                    <button @click="actualizarCantidad(item, item.cantidad + 1)"
                      :disabled="item.cantidad >= 10"
                      class="w-9 h-9 flex items-center justify-center text-stone hover:text-ink text-sm transition-colors disabled:opacity-30">
                      +
                    </button>
                  </div>

                  <button @click="eliminarItem(item.id)"
                    class="text-[11px] text-stone tracking-wide hover:text-error transition-colors link-underline">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Resumen -->
          <div v-if="carritoItems.length > 0">
            <div class="bg-cream-dark rounded-2xl p-7 md:p-8 sticky top-28">
              <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-semibold mb-8">Resumen</p>

              <!-- Barra envío gratis -->
              <div class="mb-6">
                <div class="flex justify-between text-[10px] text-stone tracking-wide mb-2">
                  <span>{{ envioGratisRestante > 0 ? `Te faltan ${envioGratisRestante}€` : '¡Envío gratis!' }}</span>
                  <span>80€</span>
                </div>
                <div class="w-full h-1.5 bg-sand rounded-full overflow-hidden">
                  <div class="h-full bg-ink rounded-full transition-all duration-500" :style="{ width: Math.min(100, (subtotalNum / 80) * 100) + '%' }"></div>
                </div>
              </div>

              <div class="flex flex-col gap-3 mb-6">
                <div class="flex justify-between">
                  <p class="text-xs text-stone tracking-wide">Subtotal</p>
                  <p class="text-xs text-ink font-medium">{{ resumen.subtotal }}</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-xs text-stone tracking-wide">Envío</p>
                  <p class="text-xs text-ink font-medium">{{ resumen.envio }}</p>
                </div>
              </div>

              <div class="h-px bg-sand mb-6"></div>

              <div class="flex justify-between mb-8">
                <p class="text-sm text-ink font-semibold tracking-wide">Total</p>
                <p class="text-sm text-ink font-semibold">{{ resumen.total }}</p>
              </div>

              <!-- Código descuento -->
              <div class="mb-6">
                <div class="flex gap-2">
                  <input v-model="codigoDescuento" type="text" placeholder="Código descuento"
                    class="flex-1 bg-cream border border-sand rounded-full px-4 py-2.5 text-xs text-ink placeholder-taupe outline-none focus:border-stone transition-colors" />
                  <button class="text-[11px] tracking-[0.15em] uppercase font-medium text-stone hover:text-ink transition-colors shrink-0 px-3">
                    Aplicar
                  </button>
                </div>
              </div>

              <button @click="finalizarCompra"
                class="w-full bg-ink text-cream py-4 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-charcoal transition-colors duration-300 mb-3">
                Finalizar compra
              </button>

              <p class="text-[10px] text-taupe-dark text-center tracking-wide leading-relaxed">
                Pago seguro. Devoluciones gratuitas en 30 días.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Inertia as router } from '@inertiajs/inertia'
import Header from './Partials/Header.vue'
import Footer from './Partials/Footer.vue'

const props = defineProps({
  carritoItems: { type: Array, default: () => [] }
})

const codigoDescuento = ref('')

const subtotalNum = computed(() => {
  return props.carritoItems.reduce((acc, item) => acc + (item.precio_num * item.cantidad), 0)
})

const envioGratisRestante = computed(() => Math.max(0, 80 - subtotalNum.value).toFixed(2))

const resumen = computed(() => {
  const sub = subtotalNum.value
  const env = sub >= 80 ? 0 : (sub > 0 ? 4.99 : 0)
  const tot = sub + env
  return {
    subtotal: sub.toFixed(2).replace('.', ',') + '€',
    envio: env === 0 ? 'Gratis' : env.toFixed(2).replace('.', ',') + '€',
    total: tot.toFixed(2).replace('.', ',') + '€'
  }
})

function actualizarCantidad(item, nuevaCantidad) {
  if (nuevaCantidad < 1 || nuevaCantidad > 10) return
  router.put(`/carrito/${item.id}`, { cantidad: nuevaCantidad }, {
    preserveScroll: true
  })
}

function eliminarItem(itemId) {
  router.delete(`/carrito/${itemId}`, {
    preserveScroll: true
  })
}

function finalizarCompra() {
  router.post('/pedido')
}
</script>

<style scoped></style>