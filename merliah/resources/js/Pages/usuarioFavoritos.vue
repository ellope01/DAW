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
                <div class="flex flex-col">
                    <div class="bg-neutral-300 w-4/5 h-6">
                        <p>Información usuario</p>
                    </div>
                    <div class="bg-neutral-300 w-4/5 h-6">
                        <p>Pedidos</p>
                    </div>
                    <div class="bg-neutral-300 w-4/5 h-6">
                        <p>Favoritos</p>
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
