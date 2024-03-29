import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/movie/:id",
      component: () => import("@/views/MovieDetailView.vue"),
    },
    {
      path: "/user/:id",
      component: () => import("@/views/UserProfileView.vue"),
    },
  ]
})

export default router
