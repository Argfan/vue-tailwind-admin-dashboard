<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { onMounted, reactive, ref, onBeforeMount } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import InputNumber from 'primevue/inputnumber';
import Product from '@/model/Product';
import { useCartStore } from '@/stores/CartStore';

const route = useRoute();
const router = useRouter();
const count = ref(1)
const cart = useCartStore()

const product = ref(new Product())
const image = ref('')

const getProduct = async(id:string)=>{
  // eslint-disable-next-line no-useless-catch
  try {
    const {data} = await axios.get(`comments/${id}`)
    product.value = data 
    
    image.value = product.value.photos[0]
  } catch (error) {throw error }
}
const goHome = ()=>{
  router.push({name: 'home'})
}

onBeforeMount(()=>{
  if(route.params.id) {      
    getProduct(route.params.id as string)  
  }
  else goHome()
})

onMounted(()=>{})

</script>

<template>
  <DefaultLayout>
    <div class="p-4 min-h-full">
      <div class="home flex items-center mb-4" @click="goHome">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
        <span>Главная</span>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <div>
          <img :src="image" alt="" class="rounded-lg shadow-xl shadow-orange-700/25 mb-4">
          <div class="flex flex-wrap">
            <div class="t_img h-18" v-for="img, i in product.photos" :key="i">
              <img :src="img" alt="" 
                class="t_img_item h-full mr-3 mb-3 rounded shadow-lg" 
                @click="image=img"
                :class="{'active': image==img}"
              >
            </div>
          </div>
        </div>
        <div>
          <div class="text-xl text-orange-700 font-semibold mb-3">{{ product.name }}</div>
          <div class="p_star flex mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="green" class="mr-1"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
            <div class="p_svalue">{{product.star}}</div>
          </div>
          <div class="flex justify-between items-center mb-4">
            <div class="text-2xl text-graydark font-semibold">
              {{ product.price *  count}} сом
            </div>
            <InputNumber v-model="count" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :min="1" :max="99" :step="1"  inputClass="w-[3rem] text-center">
              <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
              </template>
              <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
              </template>
            </InputNumber>
          </div>
          <div class="p1_button p1_1 mb-4 font-semibold">Добавить в корзину</div>
          <div class="p1_button p1_2 mb-8">Купить сейчас</div>
          <div class="text-slate-700">Информация:</div>
          <div>{{ product.info }}</div>
        </div>
      </div>

    </div>    
  </DefaultLayout>
</template>
<style>




</style>
