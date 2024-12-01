import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/Favor',
      name: 'Favor',
      component: () => import('../views/Favor.vue'),
    },
    {
      path: '/Order',
      name: 'Order',
      component: () => import('../views/Order.vue'),
    },
    {
      path: '/ShoppingCart',
      name: 'ShoppingCart',
      component: () => import('../views/ShoppingCart.vue'),
    },
  ],
})

export default router
