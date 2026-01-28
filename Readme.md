      <div v-if="citas.length === 0" class="text-center text-gray-500">
        No hay citas aún
      </div>

      <div
        v-for="citaItem in citas"
        :key="citaItem.id"
        class="bg-white shadow-md rounded-lg p-5 mb-5"
      >
        <p><span class="font-bold">Mascota:</span> {{ citaItem.nombreMascota }}</p>
        <p><span class="font-bold">Propietario:</span> {{ citaItem.nombrePropietario }}</p>
        <p><span class="font-bold">Email:</span> {{ citaItem.email }}</p>
        <p><span class="font-bold">Fecha:</span> {{ citaItem.cita }}</p>
        <p><span class="font-bold">Síntomas:</span> {{ citaItem.sintomas }}</p>

        <button
          class="mt-3 bg-indigo-600 text-white px-3 py-1 rounded"
          @click="Object.assign(cita, citaItem)"
        >
          Editar
        </button>
</div>



