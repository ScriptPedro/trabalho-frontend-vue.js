import { createRouter, createWebHistory } from 'vue-router'
import ListCourses from '../views/ListCourses.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: ListCourses,
    }
  ],
})

export default router
