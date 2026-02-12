<template>
    <div class="h-screen flex flex-col bg-white">
        <div class="bg-[#FFBB4E] h-1/10 flex items-center justify-center">
            Header
        </div>

        <div class="h-4/5 flex items-center justify-center">
            <div
                class="bg-[#FF9FD4]/65 h-9/10 flex items-center justify-center w-9/10 rounded-[2rem] gap-3"
            >
                <div class="bg-neutral-300 h-4/5 w-4/10 rounded-2xl">
                    Imagen
                </div>
                <div class="h-4/5 w-5/10 rounded-2xl">
                    <h1 class="text-[10rem] text-center">LOGIN</h1>
                    <div class="flex flex-col gap-8 items-center">
                        <input
                            type="text"
                            placeholder="Escribe tu nombre"
                            class="w-5/8 px-6 py-3 bg-[#EFEFEF] rounded-2xl border-2 border-[#EFEFEF] focus:outline-none focus:ring-4 focus:ring-[#FFBB4E]/70 text-center text-xl"
                        />
                        <input
                            type="text"
                            placeholder="Escribe tu contraseña"
                            class="w-5/8 px-6 py-3 bg-[#EFEFEF] rounded-2xl border-2 border-[#EFEFEF] focus:outline-none focus:ring-4 focus:ring-[#FFBB4E]/70 text-center text-xl"
                        />
                        <button class="bg-[#FFBB4E]/70 rounded-2xl h-14 w-100 text-2xl shadow-lg shadow-black/10 ocus:outline-none focus:shadow-lg hover:shadow-[#FF9FD4] ">Iniciar sesion</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-[#FFBB4E] h-1/5 flex items-center justify-center">
            Footer
        </div>
    </div>
</template>

<script setup>
// Aquí puedes agregar tu lógica
</script>

<style scoped></style>
