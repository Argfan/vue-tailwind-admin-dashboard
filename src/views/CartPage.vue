<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { onMounted, reactive, ref, onBeforeMount } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Product from '@/model/Product';
import { useCartStore } from '@/stores/CartStore';
import Dropdown from 'primevue/dropdown';

const route = useRoute();
const router = useRouter();
const count = ref(1)
const cart = useCartStore()


const dostavka = [
  {name: 'Курьер по городу'},
  {name: 'Прийду лично!'}  
]

const user = reactive({
  name: '',
  tel: '',
  addres: '',
  dostavka: '',  
})

const goHome = ()=>{
  router.push({name: 'home'})
}

const removeCart = (id:string)=>{
  cart.removeCart(id)
  if(cart.getProducts().length==0)  router.go(-1)
}
const goOneProduct = (id: string)=>{
  router.push({
    name:'oneProduct',
    params:{ id }
  })
}



onMounted(()=>{

})

</script>

<template>
  <DefaultLayout>
    <div class="p-4 min-h-full">
      <div class="home flex items-center mb-4" @click="goHome">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
        <span>Главная</span>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="cart_container col-span-2">
          <div class="text-2xl uppercase text-neutral-700 font-semibold mb-4">КОРЗИНА</div>
          <!-- class="cart_item mb-4 p-3 shadow rounded-lg border-2 border-orange-700/30 flex items-center" -->
          <div class="cart_item mb-4 py-3 border-orange-700/30 flex items-center border-b-2 border-dashed" 
            v-for="product in cart.getProducts()" :key="product.id"
          >
            <img :src="product.photos[0]" class="h-18 rounded border border-neutral-500 mr-4 cursor-pointer" alt=""  @click="goOneProduct(product.id)">
            <div class="grow cursor-pointer hover:text-orange-700" @click="goOneProduct(product.id)">{{ product.name }}</div>
            <InputNumber v-model="product.count" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :min="1" :max="99" :step="1"  inputClass="w-[3rem] text-center">
              <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
              </template>
              <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
              </template>
            </InputNumber>
            <div class="mx-3 font-semibold min-w-[6rem] text-neutral-700 text-right ">{{ product.price * product.count }} сом</div>
            <div class="p_delete opacity-50  hover:opacity-100 cursor-pointer" @click="removeCart(product.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </div>
          </div>
          <div class="text-right font-semibold text-neutral-700">ИТОГО: {{ cart.getProductAllPrice() }} сом</div>
        </div>
        <div class="order_container  border-l-2 border-dashed border-orange-700/30  px-3">
          <div class="text-2xl uppercase text-neutral-700 font-semibold mb-4">Оформление</div>
          <div class="cart_item mb-4 ">
            <div class="mb-4">
              <label for="" class="block mb-2">Имя*</label>
              <InputText  v-model="user.name" class="w-full" autocomplete="off"/>
            </div>
            <div class="mb-4">
              <label for="" class="block mb-2">Телефон*</label>
              <InputText  v-model="user.tel" class="w-full" autocomplete="off"/>
            </div>
            <div class="mb-4">
              <label for="" class="block mb-2">Адрес получателя (не обязательно)</label>
              <InputText  v-model="user.addres" class="w-full" autocomplete="off"/>
            </div>
            <div class="mb-8">
              <label for="" class="block mb-2">Доставка</label>
              <Dropdown v-model="user.dostavka" :options="dostavka" optionLabel="name" placeholder="Выберите варианты" class="w-full" />
            </div>
            <div class="text-center text-xl font-semibold text-neutral-700 mb-6">ИТОГО: {{ cart.getProductAllPrice() }} сом</div>
            <div class="p1_button p1_1 font-semibold">ЗАКАЗАТЬ</div>
          </div>
        </div>
      </div>

    </div>    
  </DefaultLayout>
</template>
<style>


.p_delete{
  padding: 0.5rem;
}
.p_delete svg{
  width: 1rem;
  fill: red;
}

</style>
