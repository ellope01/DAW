<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <Header activo="cuenta" />
    <AccountTabs activo="pedidos" />

    <main class="flex-1">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16">

        <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <h2 class="text-4xl md:text-5xl font-display text-ink tracking-tight lowercase">
            mis <em class="italic">pedidos</em>
          </h2>
          <p class="text-xs text-stone tracking-wide">{{ pedidos.length }} pedidos</p>
        </div>

        <!-- Lista pedidos -->
        <div v-if="pedidos.length > 0"
          class="flex flex-col gap-5">

          <div v-for="pedido in pedidos" :key="pedido.id"
            class="bg-cream-dark rounded-2xl p-6 md:p-8">

            <!-- Header pedido -->
            <div class="flex flex-col md:flex-row justify-between items-start mb-6 gap-3">
              <div>
                <p class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium mb-1">{{ pedido.referencia }}</p>
                <p class="text-xs text-taupe-dark">{{ pedido.created_at }}</p>
              </div>
              <div class="flex items-center gap-3">
                <span :class="estadoClase(pedido.estado)"
                  class="text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1 rounded-full">
                  {{ estadoLabel(pedido.estado) }}
                </span>
                <p class="text-sm text-ink font-semibold">{{ pedido.total }}</p>
              </div>
            </div>

            <!-- Productos -->
            <div class="flex gap-3 mb-6 overflow-x-auto no-scrollbar">
              <div v-for="linea in pedido.lineas" :key="linea.nombre"
                class="shrink-0 flex gap-3 items-center bg-cream rounded-xl p-3 pr-5">
                <div class="w-14 h-18 rounded-lg overflow-hidden shrink-0">
                  <img v-if="linea.imagen" :src="linea.imagen" :alt="linea.nombre" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full bg-gradient-to-b from-sand to-taupe"></div>
                </div>
                <div>
                  <p class="text-xs font-semibold text-ink tracking-wide uppercase">{{ linea.nombre }}</p>
                  <p class="text-[10px] text-stone">Talla {{ linea.talla }} · ×{{ linea.cantidad }}</p>
                </div>
              </div>
            </div>

            <!-- Barra de progreso -->
            <div class="flex items-center justify-between mb-4">
              <template v-for="(paso, i) in pasosPedido" :key="paso">
                <div class="flex flex-col items-center gap-1.5">
                  <div :class="i <= pedido.paso_actual
                      ? 'bg-ink text-cream'
                      : 'bg-sand text-taupe'"
                    class="w-7 h-7 flex items-center justify-center text-[10px] font-medium rounded-full transition-all duration-500">
                    <span v-if="i < pedido.paso_actual">✓</span>
                    <span v-else>{{ i + 1 }}</span>
                  </div>
                  <p class="text-[10px] tracking-wide whitespace-nowrap hidden md:block"
                    :class="i <= pedido.paso_actual ? 'text-ink font-medium' : 'text-taupe'">
                    {{ paso }}
                  </p>
                </div>
                <div v-if="i < pasosPedido.length - 1"
                  :class="i < pedido.paso_actual ? 'bg-ink' : 'bg-sand'"
                  class="flex-1 h-px mx-2 mb-5 transition-colors duration-500"></div>
              </template>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-4 border-t border-sand/60">
              <button class="text-[11px] tracking-[0.15em] uppercase font-medium text-ink link-underline">
                Ver detalle →
              </button>
              <button v-if="pedido.estado === 'entregado'"
                class="text-[11px] tracking-[0.15em] uppercase font-medium text-stone link-underline hover:text-ink transition-colors">
                Devolver
              </button>
              <button v-if="pedido.estado === 'pendiente' || pedido.estado === 'confirmado'"
                class="text-[11px] tracking-[0.15em] uppercase font-medium text-error/70 link-underline hover:text-error transition-colors">
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="py-32 text-center">
          <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-4">Sin pedidos</p>
          <p class="text-3xl font-display text-ink italic mb-8">Aún no has comprado nada</p>
          <a href="/productos"
            class="inline-block bg-ink text-cream text-[11px] tracking-[0.25em] uppercase font-medium px-8 py-4 rounded-full hover:bg-charcoal transition-colors">
            Ir a la tienda →
          </a>
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
  pedidos: { type: Array, default: () => [] },
})

const pasosPedido = ['Confirmado', 'Preparando', 'Enviado', 'Entregado']

const estadoLabels = {
  pendiente:  'Pendiente',
  confirmado: 'Confirmado',
  preparando: 'Preparando',
  enviado:    'En camino',
  entregado:  'Entregado',
  cancelado:  'Cancelado',
  devuelto:   'Devuelto',
}

function estadoLabel(estado) {
  return estadoLabels[estado] ?? estado
}

function estadoClase(estado) {
  const map = {
    pendiente:  'bg-sand text-stone',
    confirmado: 'bg-accent/20 text-accent-hover',
    preparando: 'bg-accent/20 text-accent-hover',
    enviado:    'bg-accent/20 text-accent-hover',
    entregado:  'bg-success/15 text-success',
    cancelado:  'bg-error/15 text-error',
    devuelto:   'bg-sand text-stone',
  }
  return map[estado] ?? 'bg-sand text-stone'
}
</script>