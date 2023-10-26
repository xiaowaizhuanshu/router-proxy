import { createRouter, createWebHistory } from 'vue-router'
//createWebHashHistory
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/index/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path:"/:path(.*)",
    redirect: '/404'
  }
]
const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router
