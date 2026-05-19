<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <Header activo="" />

    <main class="flex-1">

      <!-- Hero Section -->
      <section class="relative h-[85vh] md:h-[92vh] overflow-hidden">
        <img src="/images/hero/hero-main.png"
          alt="Merliah - Sunset & Surf Collection"
          class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent"></div>

        <div class="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-20 px-6 lg:px-10">
          <div class="max-w-[1400px] mx-auto w-full">
            <p class="text-[11px] tracking-[0.3em] uppercase text-cream/80 font-medium mb-3 animate-fade-in-up">
              Primavera — Verano 2025
            </p>
            <h2 class="text-5xl md:text-7xl lg:text-8xl font-display text-cream leading-[0.9] tracking-tight mb-6 animate-fade-in-up" style="animation-delay: 0.1s">
              Nueva<br /><em class="italic">colección</em>
            </h2>
            <a href="/productos"
              class="inline-block bg-cream text-ink text-[11px] tracking-[0.25em] uppercase font-medium px-10 py-4 rounded-full hover:bg-sand transition-colors duration-300 animate-fade-in-up"
              style="animation-delay: 0.2s">
              Comprar ahora
            </a>
          </div>
        </div>
      </section>

      <!-- Marquee -->
      <div class="bg-ink text-cream py-3.5 overflow-hidden whitespace-nowrap">
        <div class="inline-flex gap-12 animate-marquee text-[11px] tracking-[0.25em] uppercase font-medium">
          <span>Envío gratis desde 80€</span>
          <span class="text-taupe">·</span>
          <span>Devoluciones gratuitas</span>
          <span class="text-taupe">·</span>
          <span>Materiales sostenibles</span>
          <span class="text-taupe">·</span>
          <span>Hecho con intención</span>
          <span class="text-taupe">·</span>
          <span>Envío gratis desde 80€</span>
          <span class="text-taupe">·</span>
          <span>Devoluciones gratuitas</span>
          <span class="text-taupe">·</span>
          <span>Materiales sostenibles</span>
          <span class="text-taupe">·</span>
          <span>Hecho con intención</span>
          <span class="text-taupe">·</span>
        </div>
      </div>

      <!-- Best Sellers Carousel -->
      <section class="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div class="flex justify-between items-end mb-10">
          <div>
            <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-2">Lo más vendido</p>
            <h3 class="text-3xl md:text-4xl font-display text-ink tracking-tight">best sellers</h3>
          </div>
          <a href="/productos"
            class="text-[11px] tracking-[0.2em] uppercase font-medium text-ink link-underline hidden md:inline-block">
            Ver todos →
          </a>
        </div>

        <!-- Horizontal scroll cards -->
        <div class="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 lg:-mx-10 lg:px-10 snap-x snap-mandatory">
          <div v-for="p in bestSellers" :key="p.id" class="snap-start shrink-0 w-[260px] md:w-[300px] group cursor-pointer">
            <div class="relative aspect-[3/4] bg-cream-dark rounded-2xl overflow-hidden mb-4">
              <img v-if="p.imagen" :src="p.imagen" :alt="p.nombre"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div v-else class="w-full h-full bg-gradient-to-b from-sand to-taupe group-hover:scale-105 transition-transform duration-700"></div>

              <!-- Badge -->
              <div v-if="p.badge"
                class="absolute top-4 right-4 bg-ink text-cream text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1 rounded-full">
                {{ p.badge }}
              </div>

              <!-- Quick add -->
              <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <button class="w-full bg-cream/90 backdrop-blur-sm text-ink text-[11px] tracking-[0.15em] uppercase font-medium py-3 rounded-full hover:bg-cream transition-colors">
                  Vista rápida
                </button>
              </div>
            </div>

            <!-- Stars -->
            <div class="flex items-center gap-1.5 mb-1.5">
              <div class="flex gap-0.5">
                <svg v-for="s in 5" :key="s" class="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span class="text-[10px] text-stone">({{ p.reviews }})</span>
            </div>

            <p class="text-sm font-semibold text-ink tracking-wide uppercase mb-0.5">{{ p.nombre }}</p>
            <p class="text-xs text-stone">{{ p.subtitulo }}</p>
            <p class="text-sm text-ink font-medium mt-1.5">{{ p.precio }}</p>
          </div>
        </div>

        <a href="/productos"
          class="md:hidden text-[11px] tracking-[0.2em] uppercase font-medium text-ink link-underline mt-6 inline-block">
          Ver todos →
        </a>
      </section>

      <!-- Split editorial section -->
      <section class="max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 md:pb-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left card -->
          <div class="relative rounded-3xl overflow-hidden aspect-[4/5] group cursor-pointer">
            <img src="/images/hero/hero-collection.png"
              alt="Colección de moda Merliah"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"></div>
            <div class="absolute bottom-8 left-8 right-8">
              <p class="text-[11px] tracking-[0.25em] uppercase text-cream/70 font-medium mb-2">Curada para ti</p>
              <h3 class="text-2xl md:text-3xl font-display text-cream leading-tight mb-4">
                una de cada cosa,<br /><em class="italic">realmente buena</em>
              </h3>
              <a href="/productos"
                class="inline-block border border-cream/50 text-cream text-[11px] tracking-[0.2em] uppercase font-medium px-7 py-3 rounded-full hover:bg-cream hover:text-ink transition-all duration-300">
                Comprar →
              </a>
            </div>
          </div>

          <!-- Right card -->
          <div class="relative rounded-3xl overflow-hidden aspect-[4/5] group cursor-pointer">
            <img src="/images/hero/hero-outfit.png"
              alt="Outfits personalizados Merliah"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"></div>
            <div class="absolute bottom-8 left-8 right-8">
              <p class="text-[11px] tracking-[0.25em] uppercase text-cream/70 font-medium mb-2">Exclusivo</p>
              <h3 class="text-2xl md:text-3xl font-display text-cream leading-tight mb-4">
                outfits creados<br /><em class="italic">para ti</em>
              </h3>
              <a href="/outfits"
                class="inline-block border border-cream/50 text-cream text-[11px] tracking-[0.2em] uppercase font-medium px-7 py-3 rounded-full hover:bg-cream hover:text-ink transition-all duration-300">
                Descubrir →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Philosophy strip -->
      <section class="bg-ink text-cream py-20 md:py-28 px-6 lg:px-10">
        <div class="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          <h3 class="text-4xl md:text-5xl font-display font-medium leading-tight tracking-tight max-w-md text-center md:text-left">
            Vestir con<br /><em class="italic">intención.</em>
          </h3>
          <p class="text-sm text-taupe max-w-sm leading-relaxed tracking-wide text-center md:text-left">
            Prendas diseñadas para durar. Materiales naturales seleccionados con cuidado, cortes atemporales que trascienden la temporada. Recomendaciones personalizadas para tu estilo único.
          </p>
          <a href="/productos"
            class="text-[11px] tracking-[0.25em] uppercase font-medium border border-cream/30 px-8 py-4 rounded-full hover:bg-cream hover:text-ink transition-all duration-300 shrink-0">
            Nuestra filosofía
          </a>
        </div>
      </section>

      <!-- Categories grid -->
      <section class="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-24">
        <div class="text-center mb-12">
          <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-medium mb-2">Explora por categoría</p>
          <h3 class="text-3xl md:text-4xl font-display text-ink tracking-tight">compra por categoría</h3>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a v-for="cat in categorias" :key="cat.nombre" href="/productos"
            class="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-b" :style="{ background: cat.gradient }"></div>
            <div class="absolute inset-0 bg-ink/10 group-hover:bg-ink/20 transition-colors duration-300"></div>
            <div class="absolute bottom-5 left-5">
              <p class="text-sm font-semibold text-cream tracking-wide uppercase">{{ cat.nombre }}</p>
            </div>
          </a>
        </div>
      </section>

    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './Partials/Header.vue'
import Footer from './Partials/Footer.vue'

defineProps({
  bestSellers: { type: Array, default: () => [] },
  categorias: { type: Array, default: () => [] },
})
</script>

<style scoped></style>