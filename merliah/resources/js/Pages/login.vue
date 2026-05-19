<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <!-- Header mínimo para auth -->
    <header class="px-6 h-16 flex items-center justify-center border-b border-sand/60">
      <a href="/inicio" class="text-2xl md:text-[28px] font-display font-semibold text-ink tracking-[0.04em] lowercase">
        merliah
      </a>
    </header>

    <!-- Login split layout -->
    <main class="flex-1 grid grid-cols-1 md:grid-cols-2">

      <!-- Imagen lateral -->
      <div class="relative hidden md:block overflow-hidden">
        <img src="/images/hero/hero-main.png"
          alt="Merliah - Sunset Swimwear"
          class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent"></div>
        <!-- Texto decorativo -->
        <div class="absolute bottom-12 left-10 right-10">
          <p class="text-[11px] tracking-[0.3em] uppercase text-cream/80 mb-2">Nueva colección</p>
          <p class="text-3xl font-display text-cream font-medium leading-tight">
            Primavera<br /><em class="italic">Verano 2025</em>
          </p>
        </div>
      </div>

      <!-- Formulario -->
      <div class="flex flex-col items-center justify-center px-8 md:px-16 py-16 md:py-20">
        <div class="w-full max-w-sm animate-fade-in-up">

          <p class="text-[11px] tracking-[0.25em] uppercase text-stone mb-3 font-medium">Bienvenida de nuevo</p>
          <h2 class="text-4xl md:text-5xl font-display text-ink tracking-tight mb-12 leading-tight">
            Iniciar<br /><em class="italic">sesión</em>
          </h2>

          <form @submit.prevent="submitLogin" class="flex flex-col gap-6">
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Email</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="tu@email.com"
                class="border-b border-sand bg-transparent py-3 text-sm text-ink placeholder-taupe outline-none focus:border-ink transition-colors duration-300"
              />
              <p v-if="form.errors?.email" class="text-[11px] text-error">{{ form.errors.email }}</p>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Contraseña</label>
              <input
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                class="border-b border-sand bg-transparent py-3 text-sm text-ink placeholder-taupe outline-none focus:border-ink transition-colors duration-300"
              />
              <p v-if="form.errors?.password" class="text-[11px] text-error">{{ form.errors.password }}</p>
            </div>

            <div class="flex justify-end">
              <a href="#" class="text-[11px] text-stone hover:text-ink transition-colors tracking-wide link-underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              :disabled="form.processing"
              class="w-full bg-ink text-cream py-4 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-charcoal transition-colors duration-300 disabled:opacity-50 mt-2"
            >
              {{ form.processing ? 'Entrando...' : 'Entrar' }}
            </button>

            <div class="flex items-center gap-4 my-1">
              <div class="flex-1 h-px bg-sand"></div>
              <p class="text-[11px] text-taupe-dark tracking-wide">o</p>
              <div class="flex-1 h-px bg-sand"></div>
            </div>

            <a href="/registro"
              class="w-full border border-sand py-4 text-[11px] tracking-[0.25em] uppercase font-medium text-center text-ink rounded-full hover:border-ink transition-colors duration-300 block">
              Crear cuenta
            </a>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useForm } from '@inertiajs/inertia-vue3'

const form = useForm({
  email: '',
  password: '',
})

function submitLogin() {
  form.post('/login', {
    onFinish: () => form.reset('password'),
  })
}
</script>

<style scoped></style>