import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/files',
      name: 'files',
      // route level code-splitting
      // this generates a separate chunk (files.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FilesView.vue'),
    },
    {
      path: '/storage',
      name: 'storage',
      // route level code-splitting
      // this generates a separate chunk (storage.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StorageView.vue'),
    },
    {
      path: '/deleted',
      name: 'deleted',
      // route level code-splitting
      // this generates a separate chunk (deleted.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DeletedView.vue'),
    },
  ],
})

export default router
