import {defineStore} from 'pinia'
import axios from 'axios'
import { ref, onMounted } from 'vue'

export const useBebidasStore = defineStore('bebidas',()=>{

    const categorias = ref([])

    onMounted(async()=>{
        const {data:{drinks}}=await axios('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        console.log(drinks)
        categorias.value=drinks
    })

    return{
        categorias
    }

})