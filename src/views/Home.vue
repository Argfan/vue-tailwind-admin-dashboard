<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import axios from 'axios';

const pageTitle = ref('Товары')
interface Icategory {
  id: number,
  name: string
}

const category: Ref<Icategory[]> = ref([])
const active_category = reactive({
  id: 0,
  name: ''
})

const getCategory = async()=>{
  // eslint-disable-next-line no-useless-catch
  try {
    const {data} = await axios.get('posts')
    category.value = data 
    if(category.value.length) activeInit(category.value[0])
  
  } catch (error) {throw error }
}
const activeInit = (c:Icategory)=>{
  active_category.id = c.id
  active_category.name = c.name
}

onMounted(()=>{
  getCategory()
  // getPosts()
})

</script>

<template>
  <DefaultLayout>
    <div class="flex h-full">
      <div class="s_sidebar lg:w-[250px] bg-orange-50 p-4">
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
        <h3>{{active_category.name}}</h3>
      </div>
    </div>    
  </DefaultLayout>
</template>
<style>
  .s_sidebar{

  }
  .s_sidebar h3{

  }
  .cat_container{
    background-color: transparent;
  }
  .cat_item{
    cursor: pointer;
    padding: 0.3rem 0;
    margin-bottom: 0.25rem;
    border-bottom: 1px solid rgba(255, 123, 0, 0.5);
    position: relative;
    transition: 0.2s;
    overflow: hidden;
  }
  .cat_item.active{
    background-color: rgb(255, 123, 0);
    color: #fff;
    border-radius: 0.25rem;
    padding-left: 2rem;
  }
  .cat_item .img{
    position: absolute;
    top: .5rem;
    left: -2rem;
    width: 1rem;
    transition: 0.3s;
  }
  .cat_item.active .img, .cat_item:hover .img{
    left: 0.5rem;
  }

  .cat_item:not(.active):hover{
    background-color: rgba(255, 123, 0, 0.2);
    color: rgb(192, 93, 0);
    border-radius: 0.25rem;
    padding-left: 2rem;
  }
</style>
