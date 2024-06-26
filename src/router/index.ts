import { createRouter, createWebHistory } from 'vue-router'

import AdminProductsView from '@/views/AdminProductsView.vue'
import Home from '@/views/Home.vue'
import OneProduct from '@/views/OneProduct.vue'
import CartPage from '@/views/CartPage.vue'

import Login from '@/layouts/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/oneProduct/:id',
    name: 'oneProduct',
    component: OneProduct,
    meta: {
      title: 'OneProduct'
    }
  },
  {
    path: '/cartPage',
    name: 'cartPage',
    component: CartPage,
    meta: {
      title: 'CartPage'
    }
  },
  {
    path: '/admin',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/admin/products',
    name: 'products',
    component: AdminProductsView,
    meta: {
      title: 'AdminProducts'
    }
  },

  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  next()
})

export default router
