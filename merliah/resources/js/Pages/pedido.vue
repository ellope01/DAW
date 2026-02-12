<template>
    <div class="h-screen flex flex-col bg-white">
        <div class="bg-[#FFBB4E] h-1/10 flex items-center justify-center">
            Header
        </div>

        <div class="h-4/5 flex items-center justify-center">
            <div
                class="bg-[#FF9FD4]/65 h-9/10 flex items-center justify-center w-9/10 rounded-[2rem]"
            >
                <div class="w-full h-4/5 flex gap-8">
                    <!--div texto-->
                    <div
                        class="w-1/10 h-full flex flex-col justify-center items-center ml-6"
                    >
                        <p class="text-6xl">P</p>
                        <p class="text-6xl">E</p>
                        <p class="text-6xl">D</p>
                        <p class="text-6xl">I</p>
                        <p class="text-6xl">D</p>
                        <p class="text-6xl">O</p>
                        <p class="text-6xl">S</p>
                    </div>

                    <!--pedidos-->
                    <div class="flex w-4/5 h-4/5 gap-10 flex-wrap">
                        <div class="bg-neutral-300 w-3/10 h-120"></div>
                        <div class="bg-neutral-300 w-3/10 h-120"></div>
                        <div class="bg-neutral-300 w-3/10 h-120"></div>
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
