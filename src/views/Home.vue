<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import Product from '@/model/Product';
import Dialog from 'primevue/dialog';
import { useCartStore } from '@/stores/CartStore';


interface Icategory {
  id: number,
  name: string
}
// const product = reactive(emptyProduct)
const products:Ref<Product[]> = ref([])
const product = reactive(new Product())
const cart = useCartStore()

const category: Ref<Icategory[]> = ref([])
const active_category = reactive({
  id: 0,
  name: ''
})

const cartModal = ref(false)
const addCart = ()=>{
  console.log(cart.ss);  
}

const cartModalOpen = (p: Product)=>{
  console.log('dasdasd');
  
  Object.assign(product, p)
  // cart.addProduct({...product, count:1})
  cart.addProduct(product)
  cart.addSs('sdsd')
  cartModal.value = true
}

const getCategory = async()=>{
  // eslint-disable-next-line no-useless-catch
  try {
    const {data} = await axios.get('posts')
    category.value = data 
    if(category.value.length) activeInit(category.value[0])  
  } catch (error) {throw error }
}
const activeInit = (c:Icategory)=>{
  Object.assign(active_category, {
    id: c.id,
    name: c.name
  })
  getProduct()
}
const getProduct = async()=>{
  // eslint-disable-next-line no-useless-catch
  try {
    const {data} = await axios.get(`comments?postId=${active_category.id}`)
    products.value = data 
  } catch (error) {throw error }
}
const router = useRouter()

const goOneProduct = (id: string)=>{
  router.push({
    name:'oneProduct',
    params:{ id }
  })
}

onMounted(()=>{
  getCategory()
  // getPosts()
})

</script>

<template>
  <DefaultLayout>
    <div class="flex min-h-full">
      <div class="s_sidebar lg:min-w-[250px] bg-orange-50 p-4">
        <h3 class="text-orange-900 mb-3 ">Категория</h3>
        <ul class="cat_container" >
          <li v-for="c in category" :key="c.id" 
            class="cat_item" 
            :class="{'active': c.id==active_category.id}"
            @click="activeInit(c)"
          >
            <div class="img">
              <img v-if="c.id==active_category.id" src="/images/logo/logo_w_full.svg" alt="">
              <img v-else src="/images/logo/logo_d_full.svg" alt="">
            </div>
            <span>{{ c.name }}</span>
          </li>
        </ul>
      </div>
      <div class="s_content grow p-4">
        <h3 class="mb-6">{{active_category.name}}</h3>
        <div class="p_container grid grid-cols-3 gap-4 mb-12">
          <div class="p_item shadow-lg shadow-orange-300/50 mb-4" v-for="product in products" :key="product.id" @click="goOneProduct(product.id)">
            <div class="p_img">
              <img class="object-cover" :src="product.photos[0].toString()" alt="">
            </div>
            <div class="p-3">
              <div class="p_name pb-2 mb-3">{{product.name}}</div>  
              <div class="flex justify-between items-center">
                <div class="p_star flex">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="green" class="mr-1"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                  <div class="p_svalue">{{product.star}}</div>
                </div>
                <div class="p_button" @click.stop="cartModalOpen(product)">
                  <span class="p_price">{{ product.price }} сом</span>
                  <div class="p_scart flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="mr-3"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                    <span>В корзину</span>
                  </div>
                </div>
              </div>          
            </div>
          </div>
        </div>
      </div>
    </div>    

    <Dialog v-model:visible="cartModal" modal header="ТОВАР ДОБАВЛЕН В КОРЗИНУ" :style="{ width: '35rem' }" 
      class="bg-white text-gray-900">
      <div class="py-1">
        <div class="flex mb-4">
          <img :src="product.photos[0]" alt="" class="rounded h-20 shadow border mr-8 border-zinc-400">
          <div>
            <div class="text-orange-700/80 font-semibold mb-4">{{ product.name }}</div>
            <div class="text-xl font-semibold ">{{ product.price }} сом</div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="p1_button p1_2" @click="cartModal=false">Продолжить покупки</div>
          <div class="p1_button p1_1 text-gray-50" @click="addCart">Перейти в корзину</div>
        </div>
      </div>
    </Dialog>
  </DefaultLayout>
</template>
<style>
  

</style>
