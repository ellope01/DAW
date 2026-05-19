<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <!-- Header mínimo -->
    <header class="px-6 h-16 flex items-center justify-center border-b border-sand/60">
      <a href="/inicio" class="text-2xl md:text-[28px] font-display font-semibold text-ink tracking-[0.04em] lowercase">
        merliah
      </a>
    </header>

    <!-- Registro split -->
    <main class="flex-1 grid grid-cols-1 md:grid-cols-2">

      <!-- Imagen -->
      <div class="relative hidden md:block overflow-hidden">
        <img src="/images/hero/hero-outfit.png"
          alt="Merliah - Tu estilo, tu mundo"
          class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"></div>

        <!-- Indicador de paso lateral -->
        <div class="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 items-center">
          <div v-for="(step, i) in 3" :key="i"
            :class="i === pasoActual ? 'bg-cream w-[3px] h-10 rounded-full' : 'bg-cream/40 w-[3px] h-5 rounded-full'"
            class="transition-all duration-500"></div>
        </div>

        <!-- Quote -->
        <div class="absolute bottom-12 left-10 right-10">
          <p class="text-lg font-display text-cream italic leading-snug">
            "Tu propio estilo,<br />tu propio mundo."
          </p>
        </div>
      </div>

      <!-- Formulario -->
      <div class="flex flex-col items-center justify-center px-8 md:px-16 py-16 md:py-20">
        <div class="w-full max-w-sm animate-fade-in-up">

          <!-- Step indicator -->
          <div class="flex items-center gap-3 mb-8">
            <span v-for="(step, i) in pasos" :key="i"
              :class="[
                'w-7 h-7 flex items-center justify-center text-[11px] rounded-full transition-all duration-300 font-medium',
                i === pasoActual
                  ? 'bg-ink text-cream'
                  : i < pasoActual
                    ? 'bg-accent text-cream'
                    : 'border border-sand text-taupe-dark'
              ]">
              {{ i < pasoActual ? '✓' : i + 1 }}
            </span>
            <span class="text-[11px] text-stone tracking-wide font-medium ml-1">{{ pasos[pasoActual] }}</span>
          </div>

          <h2 class="text-4xl md:text-5xl font-display text-ink tracking-tight mb-10 leading-tight">
            Crear<br /><em class="italic">cuenta</em>
          </h2>

          <!-- Paso 1: Datos personales -->
          <Transition name="slide-up" mode="out-in">
            <div v-if="pasoActual === 0" key="step0" class="flex flex-col gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Nombre</label>
                <input v-model="form.nombre" type="text" placeholder="Tu nombre"
                  class="border-b border-sand bg-transparent py-3 text-sm text-ink placeholder-taupe outline-none focus:border-ink transition-colors duration-300" />
                <span v-if="form.errors.nombre" class="text-[10px] text-error mt-0.5 tracking-wide">{{ form.errors.nombre }}</span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Email</label>
                <input v-model="form.email" type="email" placeholder="tu@email.com"
                  class="border-b border-sand bg-transparent py-3 text-sm text-ink placeholder-taupe outline-none focus:border-ink transition-colors duration-300" />
                <span v-if="form.errors.email" class="text-[10px] text-error mt-0.5 tracking-wide">{{ form.errors.email }}</span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Teléfono</label>
                <input v-model="form.telefono" type="tel" placeholder="+34 600 000 000"
                  class="border-b border-sand bg-transparent py-3 text-sm text-ink placeholder-taupe outline-none focus:border-ink transition-colors duration-300" />
                <span v-if="form.errors.telefono" class="text-[10px] text-error mt-0.5 tracking-wide">{{ form.errors.telefono }}</span>
              </div>
            </div>
          </Transition>

          <!-- Paso 2: Seguridad -->
          <Transition name="slide-up" mode="out-in">
            <div v-if="pasoActual === 1" key="step1" class="flex flex-col gap-6">
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Fecha de nacimiento</label>
                <input v-model="form.fecha_nacimiento" type="date"
                  class="border-b border-sand bg-transparent py-3 text-sm text-ink outline-none focus:border-ink transition-colors duration-300" />
                <span v-if="form.errors.fecha_nacimiento" class="text-[10px] text-error mt-0.5 tracking-wide">{{ form.errors.fecha_nacimiento }}</span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Contraseña</label>
                <input v-model="form.password" type="password" placeholder="Mín. 8 caracteres"
                  class="border-b border-sand bg-transparent py-3 text-sm text-ink placeholder-taupe outline-none focus:border-ink transition-colors duration-300" />
                <span v-if="form.errors.password" class="text-[10px] text-error mt-0.5 tracking-wide">{{ form.errors.password }}</span>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Repite contraseña</label>
                <input v-model="form.password_confirmation" type="password" placeholder="••••••••"
                  class="border-b border-sand bg-transparent py-3 text-sm text-ink placeholder-taupe outline-none focus:border-ink transition-colors duration-300" />
              </div>
            </div>
          </Transition>

          <!-- Paso 3: Estilo -->
          <Transition name="slide-up" mode="out-in">
            <div v-if="pasoActual === 2" key="step2" class="flex flex-col gap-6">
              <p class="text-xs text-stone tracking-wide leading-relaxed">
                ¿Cuál de estos estilos te define mejor? Esto nos ayudará a personalizar tu experiencia.
              </p>
              <div class="grid grid-cols-3 gap-3">
                <button v-for="estilo in estilos" :key="estilo.nombre"
                  @click="seleccionarEstilo(estilo.nombre)"
                  :class="[
                    'border rounded-2xl aspect-square flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:shadow-md',
                    estiloSeleccionado === estilo.nombre
                      ? 'border-ink bg-cream-dark shadow-sm'
                      : 'border-sand bg-cream-dark/50 hover:border-stone'
                  ]">
                  <span class="text-xl">{{ estilo.emoji }}</span>
                  <p class="text-[11px] tracking-wide text-ink font-medium">{{ estilo.nombre }}</p>
                </button>
              </div>
            </div>
          </Transition>

          <!-- Botones de navegación -->
          <div class="flex gap-3 mt-10">
            <button v-if="pasoActual > 0"
              @click="anteriorPaso"
              class="flex-1 border border-sand py-4 text-[11px] tracking-[0.25em] uppercase font-medium text-stone rounded-full hover:border-ink hover:text-ink transition-colors duration-300">
              Atrás
            </button>
            <button v-if="pasoActual < 2"
              @click="siguientePaso"
              class="flex-1 bg-ink text-cream py-4 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-charcoal transition-colors duration-300">
              Siguiente
            </button>
            <button v-if="pasoActual === 2"
              @click="submitRegistro"
              class="flex-1 bg-ink text-cream py-4 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-charcoal transition-colors duration-300">
              Registrarse
            </button>
          </div>

          <p class="text-center text-xs text-stone mt-6">
            ¿Ya tienes cuenta?
            <a href="/" class="text-ink font-medium link-underline">Inicia sesión</a>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'

const pasoActual = ref(0)
const estiloSeleccionado = ref(null)
const pasos = ['Datos personales', 'Seguridad', 'Tu estilo']

const form = useForm({
  nombre: '',
  email: '',
  telefono: '',
  fecha_nacimiento: '',
  password: '',
  password_confirmation: '',
  estilo_preferido: '',
})

const estilos = [
  { nombre: 'Minimal', emoji: '◻️' },
  { nombre: 'Clásico', emoji: '🎩' },
  { nombre: 'Bohemio', emoji: '🌿' },
  { nombre: 'Urbano', emoji: '🏙️' },
  { nombre: 'Romántico', emoji: '🌸' },
  { nombre: 'Avant-garde', emoji: '✦' },
]

function anteriorPaso() {
  if (pasoActual.value > 0) pasoActual.value--
}

function siguientePaso() {
  if (pasoActual.value < 2) pasoActual.value++
}

function seleccionarEstilo(nombre) {
  estiloSeleccionado.value = nombre
}

function submitRegistro() {
  form.estilo_preferido = estiloSeleccionado.value ?? 'Minimal'
  form.post('/registro', {
    onFinish: () => form.reset('password', 'password_confirmation'),
    onError: (errors) => {
      if (errors.nombre || errors.email || errors.telefono) {
        pasoActual.value = 0
      } else if (errors.fecha_nacimiento || errors.password) {
        pasoActual.value = 1
      }
    }
  })
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>