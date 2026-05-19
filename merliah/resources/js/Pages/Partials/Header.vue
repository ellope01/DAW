<template>
  <!-- Announcement bar -->
  <div class="bg-ink text-cream text-[11px] tracking-[0.25em] uppercase text-center py-2.5 font-medium">
    Envío gratis en pedidos superiores a 80€
  </div>

  <!-- Main header -->
  <header
    :class="[
      'sticky top-0 z-50 transition-all duration-500',
      scrolled
        ? 'bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
        : 'bg-cream'
    ]"
  >
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div class="flex items-center justify-between h-16">

        <!-- Left nav -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="/productos"
            :class="activo === 'tienda' ? 'text-ink' : 'text-stone hover:text-ink'"
            class="text-[11px] tracking-[0.2em] uppercase font-medium link-underline transition-colors duration-300">
            Tienda
          </a>
          <a href="/outfits"
            :class="activo === 'outfits' ? 'text-ink' : 'text-stone hover:text-ink'"
            class="text-[11px] tracking-[0.2em] uppercase font-medium link-underline transition-colors duration-300">
            Outfits
          </a>
        </nav>

        <!-- Mobile hamburger -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5">
          <span :class="mobileOpen ? 'rotate-45 translate-y-[5px]' : ''" class="block w-5 h-[1.5px] bg-ink transition-all duration-300"></span>
          <span :class="mobileOpen ? 'opacity-0' : ''" class="block w-5 h-[1.5px] bg-ink transition-all duration-300"></span>
          <span :class="mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''" class="block w-5 h-[1.5px] bg-ink transition-all duration-300"></span>
        </button>

        <!-- Logo -->
        <a href="/inicio" class="absolute left-1/2 -translate-x-1/2">
          <h1 class="text-2xl md:text-[28px] font-display font-semibold text-ink tracking-[0.04em] lowercase">
            merliah
          </h1>
        </a>

        <!-- Right nav -->
        <div class="flex items-center gap-5">
          <!-- Search -->
          <button class="hidden md:flex items-center text-stone hover:text-ink transition-colors duration-300">
            <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          <!-- Account -->
          <a href="/usuario"
            :class="activo === 'cuenta' ? 'text-ink' : 'text-stone hover:text-ink'"
            class="hidden md:flex items-center text-[11px] tracking-[0.2em] uppercase font-medium link-underline transition-colors duration-300">
            Cuenta
          </a>

          <!-- Cart -->
          <a href="/usuarioCarrito"
            class="relative flex items-center text-stone hover:text-ink transition-colors duration-300">
            <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span class="absolute -top-1.5 -right-2 w-4 h-4 bg-ink text-cream text-[9px] font-medium flex items-center justify-center rounded-full">
              0
            </span>
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="md:hidden border-t border-sand bg-cream px-6 py-6">
        <nav class="flex flex-col gap-4">
          <a href="/productos" class="text-sm tracking-[0.15em] uppercase font-medium text-ink">Tienda</a>
          <a href="/outfits" class="text-sm tracking-[0.15em] uppercase font-medium text-ink">Outfits</a>
          <div class="h-px bg-sand my-2"></div>
          <a href="/usuario" class="text-sm tracking-[0.15em] uppercase font-medium text-stone">Mi cuenta</a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  activo: { type: String, default: '' },
})

const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
