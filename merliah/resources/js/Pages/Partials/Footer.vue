<template>
  <footer class="bg-cream border-t border-sand/60">

    <!-- Logo watermark -->
    <div class="overflow-hidden py-12 md:py-16">
      <p class="text-center text-[12vw] md:text-[10vw] font-display font-semibold text-sand/50 lowercase leading-none tracking-tight select-none">
        merliah
      </p>
    </div>

    <!-- Newsletter -->
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10 pb-12">
      <div class="border-t border-sand/60 pt-10">
        <p class="text-xs text-stone tracking-wide mb-1">Únete al mundo Merliah Summers.</p>
        <p class="text-xs text-stone-dark/60 tracking-wide mb-6">
          Tips de estilo, novedades y ofertas exclusivas directamente en tu inbox.
        </p>
        <div class="flex gap-3 max-w-md">
          <input type="email" placeholder="Tu email"
            class="flex-1 bg-cream-dark border border-sand rounded-full px-5 py-3 text-sm text-ink placeholder-taupe-dark outline-none focus:border-stone transition-colors duration-300" />
          <button class="bg-ink text-cream text-[11px] tracking-[0.2em] uppercase font-medium px-7 py-3 rounded-full hover:bg-charcoal transition-colors duration-300">
            Suscribirse
          </button>
        </div>
        <p class="text-[10px] text-taupe-dark mt-3 tracking-wide">
          Al suscribirte, aceptas nuestra Política de Privacidad.
        </p>
      </div>
    </div>

    <!-- Links -->
    <div class="max-w-[1400px] mx-auto px-6 lg:px-10 pb-10">
      <div class="border-t border-sand/60 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <!-- Navigate -->
        <div>
          <p class="text-[11px] tracking-[0.2em] uppercase font-semibold text-ink mb-5">Navegar</p>
          <div class="flex flex-col gap-3">
            <a href="/productos" class="text-xs text-stone hover:text-ink transition-colors link-underline">Tienda</a>
            <a href="/outfits" class="text-xs text-stone hover:text-ink transition-colors link-underline">Outfits</a>
            <a href="/inicio" class="text-xs text-stone hover:text-ink transition-colors link-underline">Sobre nosotros</a>
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline">Impacto</a>
          </div>
        </div>

        <!-- Social -->
        <div>
          <p class="text-[11px] tracking-[0.2em] uppercase font-semibold text-ink mb-5">Social</p>
          <div class="flex flex-col gap-3">
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline flex items-center gap-2">
              <i class="fab fa-instagram text-sm"></i> Instagram
            </a>
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline flex items-center gap-2">
              <i class="fab fa-tiktok text-sm"></i> TikTok
            </a>
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline flex items-center gap-2">
              <i class="fab fa-pinterest text-sm"></i> Pinterest
            </a>
          </div>
        </div>

        <!-- Legal -->
        <div>
          <p class="text-[11px] tracking-[0.2em] uppercase font-semibold text-ink mb-5">Legal</p>
          <div class="flex flex-col gap-3">
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline">Privacidad</a>
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline">Términos</a>
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline">Cookies</a>
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline">FAQ</a>
          </div>
        </div>

        <!-- Support -->
        <div>
          <p class="text-[11px] tracking-[0.2em] uppercase font-semibold text-ink mb-5">Soporte</p>
          <div class="flex flex-col gap-3">
            <p class="text-xs text-stone">L-V 9am - 6pm</p>
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline">Contacto</a>
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline">Envíos y devoluciones</a>
            <a href="#" class="text-xs text-stone hover:text-ink transition-colors link-underline">Guía de tallas</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-sand/60">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p class="text-[10px] text-taupe-dark tracking-wider">© 2025 Merliah. Todos los derechos reservados.</p>
        <p class="text-[10px] text-taupe-dark tracking-wider">Valencia, España 🇪🇸</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
