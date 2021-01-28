import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import adminRoutes from './admin-router'
import clientRoutes from './client-router'

const routes = [
  ...adminRoutes,
  ...clientRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  },
})

export default router
