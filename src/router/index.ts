import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home/HomeView.vue';
import LoginView from '@/pages/auth/LoginView.vue';
import ReigsterView from '@/pages/auth/ReigsterView.vue';
import { clientRoutes } from './client.route';
import { workerRoutes } from './worker.route';
import { adminRoutes } from './admin.route';

// src/router/index.js (or main.js if you prefer)
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import the default styles
import AboutView from '@/pages/home/AboutView.vue';
import ContactView from '@/pages/home/ContactView.vue';
import FAQView from '@/pages/home/FAQView.vue';

// ... your router setup ...


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
      path: "/about",
      component: AboutView
    },

    {
      path: "/contact",
      component: ContactView
    },

    {
      path: "/faq",
      component: FAQView
    },

    {
      path: "/client",
      component: () => import("@/pages/client/ClientLayout.vue"),
      children: [...clientRoutes]
    },
    {
      path: "/worker",
      component: () => import("@/pages/worker/WorkerLayout.vue"),
      children: [...workerRoutes],
    },
    {
      path: "/admin",
      component: () => import("@/pages/admin/AdminLayout.vue"),
      children: [...adminRoutes]
    }
  ],
});


router.beforeEach((to, from, next) => {
  NProgress.start(); // Start the progress bar on route change
  next();
});

router.afterEach(() => {
  NProgress.done(); // Complete the progress bar after route resolution
});

export default router