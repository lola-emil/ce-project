import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home/HomeView.vue';
import ReigsterView from '@/pages/auth/ReigsterView.vue';
import LoginView from '@/pages/auth/LoginView.vue';
import AdminDashboardView from '@/pages/admin-dashboard/AdminDashboardView.vue';
import UserManagementView from '@/pages/user-management/UserManagementView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView
    },
    {
      path: "/sign-up",
      component: ReigsterView
    },
    {
      path: "/sign-in",
      component: LoginView
    },
    {
      path: "/admin-dashboard",
      component: AdminDashboardView
    },
    {
      path: "/user-management",
      component: UserManagementView
    }
  ],
});

// router.beforeEach(authGuard);

export default router