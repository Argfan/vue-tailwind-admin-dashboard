<script setup lang="ts">
//@ts-ignore
import { onMounted, reactive, ref } from 'vue'

import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';

import ProductOne from '@/assets/images/product/product-01.png'
import ProductTwo from '@/assets/images/product/product-02.png'
import ProductThree from '@/assets/images/product/product-03.png'
import ProductFour from '@/assets/images/product/product-04.png'
import axios from 'axios';
import Product from '@/model/Product';

const editModal = ref(false)
const deleteModal = ref(false)

const addModal = ref(false)
const products = ref([])
const category = ref([])
const photo = ref('')



const product = reactive(new Product())
// id: new Date().getTime().toString(),
//     photos: [] as String[]
const addModalOpen = ()=>{
  Object.assign(product, new Product())
  addModal.value = true
}
const editModalOpen = (data: Product)=>{
  Object.assign(product, data)
  editModal.value = true
}
const photoAdd = ()=>{
  if(photo.value!==''){
    product.photos.push(photo.value)
    photo.value=''
  }
}

const getProducts = async()=>{
  // eslint-disable-next-line no-useless-catch
  try {
    const {data} = await axios.get('comments?_embed=post')
    products.value = data 
  } catch (error) {throw error }
}
const getCategory = async()=>{
  // eslint-disable-next-line no-useless-catch
  try {
    const {data} = await axios.get('posts')
    category.value = data 
  } catch (error) {throw error }
}
const createProduct = async()=>{
  // eslint-disable-next-line no-useless-catch
  try {
    await axios.post('comments', {...product, id: new Date().getTime().toString()} )
    getProducts()
    addModal.value = false
  } catch (error) {throw error }
}
const updateProduct = async()=>{
  // eslint-disable-next-line no-useless-catch
  try {
    await axios.put(`comments/${product.id}`, product)
    getProducts()
    editModal.value = false
  } catch (error) {throw error }
}
const deleteProduct = async(id: string)=>{
  // eslint-disable-next-line no-useless-catch
  try {
    await axios.delete(`comments/${id}`)
    getProducts()
  } catch (error) {throw error }
}

const submit = ()=>{
  if(product.name!=='' && product.price!==0 && product.photos.length>0 && product.postId) {
    createProduct()
  }  
}
const update = ()=>{
  if(product.name!=='' && product.price!==0 && product.photos.length>0 && product.postId) {
    updateProduct()
  }  
}

  
onMounted(()=>{
  getProducts()
  getCategory()
  // getPosts()
})

// const products = ref([
//   {
//     id: 1,
//     name: 'Apple Watch Series 7',
//     category: 'Electronics',
//     price: 269,
//     sold: 22,
//     profit: 45,
//     imageSrc: ProductOne
//   },
//   {
//     id: 2,
//     name: 'Macbook Pro M1',
//     category: 'Electronics',
//     price: 546,
//     sold: 34,
//     profit: 125,
//     imageSrc: ProductTwo
//   },
//   {
//     id: 3,
//     name: 'Dell Inspiron 15',
//     category: 'Electronics',
//     price: 443,
//     sold: 64,
//     profit: 247,
//     imageSrc: ProductThree
//   },
//   {
//     id: 4,
//     name: 'HP Probook 450',
//     category: 'Electronics',
//     price: 499,
//     sold: 72,
//     profit: 103,
//     imageSrc: ProductFour
//   }
// ])

</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark
     dark:bg-boxdark"
  >
    <div class="flex justify-between py-6 px-4 md:px-6 xl:px-7.5 ">
      <h4 class="text-xl font-bold text-black dark:text-white">Цветы</h4>
      <Button aria-label="Submit" icon="pi pi-plus" raised class="text-white" 
        @click="addModalOpen"/>
    </div>    
    <div class="px-7.5">
      <DataTable :value="products" tableStyle="min-width: 50rem" tableClass="mb-8" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column field="id" header="#"><template #body="{index}">{{ index+1 }}</template></Column>
        <Column field="name" header="Название"></Column>
        <Column field="post.name" header="Категория"></Column>
        <Column header="Фтото">
          <template #body="{data}">
            <div class="flex flex-wrap">
              <img v-for="photo, i in data.photos" :key="i" :src="photo" alt="" class="w-10 mr-2 mb-2">
            </div>
          </template>
        </Column>
        
        <Column field="price" header="Цена"></Column>
        <Column field="star" header="Рейтинг"></Column>
        <Column header="Инфо" style="width: 2rem;">
          <template #body="{data}">
            <span class="d_info">{{ data.info }}</span>
          </template>
        </Column>
        <Column header="" style="width: 8rem;">
          <template #body="{data}">
            <Button  icon="pi pi-pencil" severity="success" raised class="text-white mr-2" @click="editModalOpen(data)"/>
            <Button  icon="pi pi-trash"  severity="danger" raised class="btn-red text-white" 
              @click="deleteProduct(data.id)"/>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  
  <Dialog v-model:visible="addModal" modal header="Добавить" :style="{ width: '45rem' }" 
    class="bg-white text-gray-900">
    <div class="py-3">
      <form @submit.prevent="submit">
        <div class="flex items-center gap-3 mb-3">
          <label for="" class="font-semibold w-[6rem]">Название*</label>
          <InputText  v-model="product.name" class="flex-auto" autocomplete="off"/>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="" class="font-semibold w-[6rem]">Категория*</label>
          <Dropdown v-model="product.postId" :options="category" optionLabel="name" optionValue="id" 
            placeholder="Выберите категорию" class="flex-auto" />
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="" class="font-semibold w-[6rem]">Цена*</label>
          <InputNumber v-model="product.price" class="flex-auto" inputId="integeronly" />
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="" class="font-semibold w-[6rem]">Рейтинг*</label>
          <InputNumber v-model="product.star" class="flex-auto" inputId="integeronly" :max-fraction-digits="2"/>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="" class="font-semibold w-[6rem]">Фото*</label>
          <InputText  v-model="photo" class="flex-auto" autocomplete="off" />
          <Button aria-label="Submit" icon="pi pi-plus" raised class="text-white" @click="photoAdd"/>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="email" class="font-semibold w-[6rem]"></label>
          <div class="flex flex-wrap">
            <img v-for="photo, i in product.photos" :key="i" :src="photo" alt="" class="w-10 mr-2">
          </div>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="email" class="font-semibold w-[6rem]">Инфо</label>
          <Textarea v-model="product.info" rows="4" class="flex-auto"/>
        </div>

        <div class="flex justify-end gap-2">
          <Button type="button" label="Отмена" severity="secondary" @click="addModal = false"></Button>
          <Button type="submit" label="Сохранить" class="text-white"></Button>
        </div>
      </form>
    </div>
  </Dialog>
  <Dialog v-model:visible="editModal" modal header="Добавить" :style="{ width: '45rem' }" 
    class="bg-white text-gray-900">
    <div class="py-3">
      <form @submit.prevent="update">
        <div class="flex items-center gap-3 mb-3">
          <label for="" class="font-semibold w-[6rem]">Название*</label>
          <InputText  v-model="product.name" class="flex-auto" autocomplete="off"/>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="" class="font-semibold w-[6rem]">Категория*</label>
          <Dropdown v-model="product.postId" :options="category" optionLabel="name" optionValue="id" 
            placeholder="Выберите категорию" class="flex-auto" />
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="" class="font-semibold w-[6rem]">Цена*</label>
          <InputNumber v-model="product.price" class="flex-auto" inputId="integeronly" />
        </div>     
        <div class="flex items-center gap-3 mb-3">
          <label for="" class="font-semibold w-[6rem]">Рейтинг*</label>
          <InputNumber v-model="product.star" class="flex-auto" inputId="integeronly"  :max-fraction-digits="2"/>
        </div>  
        <div class="flex items-center gap-3 mb-3">
          <label for="email" class="font-semibold w-[6rem]">Инфо</label>
          <Textarea v-model="product.info" rows="4" class="flex-auto"/>
        </div>

        <div class="flex justify-end gap-2">
          <Button type="button" label="Отмена" severity="secondary" @click="editModal = false"></Button>
          <Button type="submit" label="Сохранить" class="text-white"></Button>
        </div>
      </form>
    </div>
  </Dialog>
</template>


<style>

.btn-red{
  background-color: rgb(239 68 68 / var(--tw-bg-opacity));
}

.btn-red:hover{
  background-color: rgb(220 38 38 / var(--tw-bg-opacity))
}

ul{
  background-color: #fff;
}
.d_info{
  display: block;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>