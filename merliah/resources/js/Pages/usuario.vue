<template>
    <div class="h-screen flex flex-col bg-white">
        <div class="bg-[#FFBB4E] h-1/10 flex items-center justify-center">
            Header
        </div>

        <div class="h-4/5 flex items-center justify-center">
            <div
                class="bg-[#FF9FD4]/65 h-9/10 flex items-center justify-center w-9/10 rounded-[2rem] gap-7"
            >
                <div class="bg-neutral-300 h-4/5 w-5/10 rounded-2xl">
                    Imagen
                </div>
                <div class="flex flex-col w-4/10 gap-3">
                    <div class="bg-[#FFBB4E]/70 w-full h-30 rounded-4xl flex items-center justify-center">
                        <p class="text-5xl">Información usuario</p>
                    </div>
                    <div class="bg-[#FFBB4E]/70 w-full h-30 rounded-4xl flex items-center justify-center">
                        <p class="text-5xl">Pedidos</p>
                    </div>
                    <div class="bg-[#FFBB4E]/70 w-full h-30 rounded-4xl flex items-center justify-center">
                        <p class="text-5xl">Favoritos</p>
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
