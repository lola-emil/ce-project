import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home/HomeView.vue';
import LoginView from '@/pages/auth/LoginView.vue';
import ReigsterView from '@/pages/auth/ReigsterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView
    },

    {
      path: "/login",
      component: LoginView
    },
    {
      path: "/register",
      component: ReigsterView
    },
  ],
});

export default router