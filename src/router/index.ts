import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/guards/auth.guard';
import { accountSetupGuard } from '@/guards/account-setup.guard';
import HomeView from '@/pages/home/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView
    }
  ],
});

router.beforeEach(authGuard);

export default router