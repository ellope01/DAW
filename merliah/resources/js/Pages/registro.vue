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

                <!--Primer div info-->
                <div class="h-4/5 w-5/10">
                    <h1 class="text-[10rem] text-center">REGISTRO</h1>
                    <div class="flex flex-col gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Nombre"
                            class="w-5/8 px-6 py-3 bg-[#EFEFEF] rounded-2xl border-2 border-[#EFEFEF] focus:outline-none focus:ring-4 focus:ring-[#FFBB4E]/70 text-center text-xl"
                        />
                        <input
                            type="text"
                            placeholder="Edad"
                            class="w-5/8 px-6 py-3 bg-[#EFEFEF] rounded-2xl border-2 border-[#EFEFEF] focus:outline-none focus:ring-4 focus:ring-[#FFBB4E]/70 text-center text-xl"
                        />
                        <input
                            type="text"
                            placeholder="Telefono"
                            class="w-5/8 px-6 py-3 bg-[#EFEFEF] rounded-2xl border-2 border-[#EFEFEF] focus:outline-none focus:ring-4 focus:ring-[#FFBB4E]/70 text-center text-xl"
                        />
                        <div class="flex justify-center gap-1 mt-4">
                            <span
                                class="w-2 h-2 rounded-full bg-[#FFBB4E]"
                            ></span>
                            <span
                                class="w-2 h-2 rounded-full bg-[#FFBB4E]/70"
                            ></span>
                            <span
                                class="w-2 h-2 rounded-full bg-[#FFBB4E]/70"
                            ></span>
                        </div>
                        <button
                            class="bg-[#FFBB4E]/70 rounded-2xl h-14 w-100 text-2xl shadow-lg shadow-black/10 ocus:outline-none focus:shadow-lg hover:shadow-[#FF9FD4]"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>

                <!--Segundo div info-->
                <div class="hidden h-4/5 w-5/10">
                    <h1 class="text-[10rem] text-center">REGISTRO</h1>
                    <div class="flex flex-col gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Cumpleaños"
                            class="w-5/8 px-6 py-3 bg-[#EFEFEF] rounded-2xl border-2 border-[#EFEFEF] focus:outline-none focus:ring-4 focus:ring-[#FFBB4E]/70 text-center text-xl"
                        />
                        <input
                            type="text"
                            placeholder="Contraseña"
                            class="w-5/8 px-6 py-3 bg-[#EFEFEF] rounded-2xl border-2 border-[#EFEFEF] focus:outline-none focus:ring-4 focus:ring-[#FFBB4E]/70 text-center text-xl"
                        />
                        <input
                            type="text"
                            placeholder="Repite la contraseña"
                            class="w-5/8 px-6 py-3 bg-[#EFEFEF] rounded-2xl border-2 border-[#EFEFEF] focus:outline-none focus:ring-4 focus:ring-[#FFBB4E]/70 text-center text-xl"
                        />
                        <div class="flex justify-center gap-1 mt-4">
                            <span
                                class="w-2 h-2 rounded-full bg-[#FFBB4E]/70"
                            ></span>
                            <span
                                class="w-2 h-2 rounded-full bg-[#FFBB4E]"
                            ></span>
                            <span
                                class="w-2 h-2 rounded-full bg-[#FFBB4E]/70"
                            ></span>
                        </div>
                        <button
                            class="bg-[#FFBB4E]/70 rounded-2xl h-14 w-100 text-2xl shadow-lg shadow-black/10 ocus:outline-none focus:shadow-lg hover:shadow-[#FF9FD4]"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
                <!--Tercer div diseño-->
                <div class="hidden h-4/5 w-5/10">
                    <h1 class="text-[10rem] text-center">REGISTRO</h1>
                    <div class="flex flex-col gap-2 items-center">
                        <!--Imagen para que eliga el estilo-->
                        <div>
                            <!--div con las imagenes del estilo-->
                        </div>
                        <div class="flex justify-center gap-1 mt-4">
                            <span
                                class="w-2 h-2 rounded-full bg-[#FFBB4E]/70"
                            ></span>
                            <span
                                class="w-2 h-2 rounded-full bg-[#FFBB4E]/70"
                            ></span>
                            <span
                                class="w-2 h-2 rounded-full bg-[#FFBB4E]"
                            ></span>
                        </div>
                        <button
                            class="bg-[#FFBB4E]/70 rounded-2xl h-14 w-100 text-2xl shadow-lg shadow-black/10 ocus:outline-none focus:shadow-lg hover:shadow-[#FF9FD4]"
                        >
                            Registrate
                        </button>
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
