import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home/HomeView.vue';
import LoginView from '@/pages/auth/LoginView.vue';
import ReigsterView from '@/pages/auth/ReigsterView.vue';
import { clientRoutes } from './client.route';
import { workerRoutes } from './worker.route';
import { adminRoutes } from './admin.route';

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

    {
      path: "/client",
      children: [...clientRoutes]
    },
    {
      path: "/worker",
      children: [...workerRoutes],
    },
    {
      path: "/admin",
      children: [...adminRoutes]
    }
  ],
});

export default router