<template>
  <div class="min-h-screen bg-cream font-sans flex flex-col">

    <Header activo="cuenta" />
    <AccountTabs activo="informacion" />

    <main class="flex-1">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

        <!-- Formulario -->
        <div class="md:col-span-2">
          <h2 class="text-3xl md:text-4xl font-display text-ink tracking-tight mb-10 lowercase">
            información <em class="italic">personal</em>
          </h2>

          <!-- Flash éxito -->
          <div v-if="flashExito"
            class="mb-6 bg-success/10 border border-success/30 px-5 py-3 rounded-xl text-xs text-success tracking-wide flex items-center gap-2">
            <span>✓</span> {{ flashExito }}
          </div>

          <form @submit.prevent="guardar" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Nombre</label>
              <input v-model="form.nombre" type="text"
                class="border-b border-sand bg-transparent py-3 text-sm text-ink outline-none focus:border-ink transition-colors" />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Apellidos</label>
              <input v-model="form.apellidos" type="text"
                class="border-b border-sand bg-transparent py-3 text-sm text-ink outline-none focus:border-ink transition-colors" />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Email</label>
              <input :value="usuario.email" type="email" disabled
                class="border-b border-sand bg-transparent py-3 text-sm text-taupe outline-none cursor-not-allowed" />
              <p class="text-[10px] text-taupe-dark tracking-wide">El email no se puede modificar</p>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Teléfono</label>
              <input v-model="form.telefono" type="tel"
                class="border-b border-sand bg-transparent py-3 text-sm text-ink outline-none focus:border-ink transition-colors" />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Fecha de nacimiento</label>
              <input v-model="form.fecha_nacimiento" type="date"
                class="border-b border-sand bg-transparent py-3 text-sm text-ink outline-none focus:border-ink transition-colors" />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Estilo preferido</label>
              <select v-model="form.estilo_preferido"
                class="border-b border-sand bg-transparent py-3 text-sm text-ink outline-none focus:border-ink transition-colors appearance-none cursor-pointer">
                <option value="">Sin definir</option>
                <option v-for="e in estilos" :key="e" :value="e">{{ e }}</option>
              </select>
            </div>

            <div class="flex flex-col gap-1.5 md:col-span-2">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Dirección</label>
              <input v-model="form.direccion" type="text"
                class="border-b border-sand bg-transparent py-3 text-sm text-ink outline-none focus:border-ink transition-colors" />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Ciudad</label>
              <input v-model="form.ciudad" type="text"
                class="border-b border-sand bg-transparent py-3 text-sm text-ink outline-none focus:border-ink transition-colors" />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Código postal</label>
              <input v-model="form.codigo_postal" type="text"
                class="border-b border-sand bg-transparent py-3 text-sm text-ink outline-none focus:border-ink transition-colors" />
            </div>

            <div class="md:col-span-2 pt-2">
              <button type="submit"
                class="bg-ink text-cream px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-charcoal transition-colors duration-300">
                Guardar cambios
              </button>
            </div>
          </form>

          <!-- Cambiar contraseña -->
          <div class="mt-14 pt-10 border-t border-sand/60">
            <h3 class="text-xl font-display text-ink tracking-tight mb-8 lowercase">Cambiar <em class="italic">contraseña</em></h3>

            <form @submit.prevent="cambiarPassword" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7 max-w-lg">
              <div class="flex flex-col gap-1.5 md:col-span-2">
                <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Contraseña actual</label>
                <input v-model="formPass.password_actual" type="password" placeholder="••••••••"
                  class="border-b border-sand bg-transparent py-3 text-sm text-ink placeholder-taupe outline-none focus:border-ink transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Nueva contraseña</label>
                <input v-model="formPass.password" type="password" placeholder="••••••••"
                  class="border-b border-sand bg-transparent py-3 text-sm text-ink placeholder-taupe outline-none focus:border-ink transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] tracking-[0.2em] uppercase text-stone font-medium">Repite contraseña</label>
                <input v-model="formPass.password_confirmation" type="password" placeholder="••••••••"
                  class="border-b border-sand bg-transparent py-3 text-sm text-ink placeholder-taupe outline-none focus:border-ink transition-colors" />
              </div>

              <div class="md:col-span-2">
                <button type="submit"
                  class="border border-ink text-ink px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-ink hover:text-cream transition-all duration-300">
                  Actualizar contraseña
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="flex flex-col gap-6 md:pt-14">
          <div class="bg-cream-dark rounded-2xl p-8 flex flex-col items-center gap-4">
            <div class="w-24 h-24 bg-taupe rounded-full flex items-center justify-center overflow-hidden">
              <span class="text-2xl text-cream font-display">{{ usuario.nombre?.[0] || 'V' }}</span>
            </div>
            <p class="text-sm font-display text-ink">{{ usuario.nombre }} {{ usuario.apellidos }}</p>
          </div>

          <div class="bg-cream-dark rounded-2xl p-8">
            <p class="text-[11px] tracking-[0.25em] uppercase text-stone font-semibold mb-4">Dirección de envío</p>
            <p v-if="usuario.direccion" class="text-sm text-ink leading-relaxed">
              {{ usuario.direccion }}<br />
              {{ usuario.ciudad }}, {{ usuario.codigo_postal }}<br />
              España
            </p>
            <p v-else class="text-xs text-taupe-dark tracking-wide">Sin dirección guardada</p>
          </div>

          <button @click="logout"
            class="w-full text-center border border-sand py-3 text-[11px] tracking-[0.2em] uppercase font-medium text-stone rounded-full hover:border-error hover:text-error transition-colors duration-300 block">
            Cerrar sesión
          </button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Inertia as router } from '@inertiajs/inertia'
import Header from './Partials/Header.vue'
import Footer from './Partials/Footer.vue'
import AccountTabs from './Partials/AccountTabs.vue'

const props = defineProps({
  usuario: { type: Object, default: () => ({}) },
})

const flashExito = ref('')
const estilos = ['Minimal', 'Clásico', 'Bohemio', 'Urbano', 'Romántico', 'Avant-garde']

const form = reactive({
  nombre:           props.usuario.nombre          ?? '',
  apellidos:        props.usuario.apellidos        ?? '',
  telefono:         props.usuario.telefono         ?? '',
  fecha_nacimiento: props.usuario.fecha_nacimiento ?? '',
  estilo_preferido: props.usuario.estilo_preferido ?? '',
  direccion:        props.usuario.direccion        ?? '',
  ciudad:           props.usuario.ciudad           ?? '',
  codigo_postal:    props.usuario.codigo_postal    ?? '',
})

const formPass = reactive({
  password_actual: '',
  password: '',
  password_confirmation: '',
})

function guardar() {
  router.post('/usuarioInfo', form, {
    preserveScroll: true,
    onSuccess: () => {
      flashExito.value = 'Información actualizada correctamente'
      setTimeout(() => flashExito.value = '', 4000)
    }
  })
}

function cambiarPassword() {
  router.post('/usuarioPassword', formPass, {
    preserveScroll: true,
    onSuccess: () => {
      flashExito.value = 'Contraseña actualizada'
      formPass.password_actual = ''
      formPass.password = ''
      formPass.password_confirmation = ''
      setTimeout(() => flashExito.value = '', 4000)
    }
  })
}

function logout() {
  router.post('/logout')
}
</script>

<style scoped></style>