import { createRouter, createWebHistory } from 'vue-router'
import CreateCourse from '../views/CreateCourse.vue'
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
    ,
    {
      path: '/create',
      name: 'create',
      component: CreateCourse,
    },
  ],
})

export default router
