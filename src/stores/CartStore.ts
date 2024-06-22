import type Product from '@/model/Product'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // const products = useStorage('darkMode', ref<Product[]>([])) 
  const products = ref<Product[]>([])
  const getProducts = () => {
    return products.value
  }
  const addProduct = (product: Product) => {
    const p = products.value.find(a=>a.id==product.id)
    if(p) {
      console.log(p);      
      p.count = product.count
    } 
    else products.value.push(product)
  } 
  const getProductAllPrice = () => {
    return products.value.reduce((a, b)=>a+b.count*b.price, 0)
  } 
  const removeCart = (id: string) => {
    products.value = products.value.filter(el=>el.id!==id)
  } 
  return { products, getProducts,  addProduct, getProductAllPrice, removeCart }
})
