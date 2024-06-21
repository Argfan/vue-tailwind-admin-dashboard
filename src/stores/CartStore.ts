import type Product from '@/model/Product'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const products:Ref<Product[]> = ref([])
  const ss = ref('sdf')
  const getProducts = () => {
    return products.value
  }
  const addProduct = (product: Product) => products.value.push(product)
  const addSs = (s: string) => ss.value = s
  return {ss, products, getProducts,  addProduct, addSs }
})
