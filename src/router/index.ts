import SignInView from '@/pages/auth/SignInView.vue'
import SignUpView from '@/pages/auth/SignUpView.vue';
import HomeView from '@/pages/home/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/pages/home/AboutView.vue';
import FAQView from '@/pages/home/FAQView.vue';
import { useAuthStore } from '@/stores/auth';
import { authGuard } from '@/guards/auth.guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView
    },

    {
      path: "/about",
      component: AboutView
    },

    {
      path: "/faq",
      component: FAQView
    },

    // AUTH
    {
      path: "/auth/sign-in",
      component: SignInView
    },
    {
      path: "/auth/sign-up",
      component: SignUpView
    },

    // BOOKING
    {
      path: "/booking",
      component: () => import("@/pages/booking/BookingView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/booking/details/:id",
      component: () => import("@/pages/booking/BookingDetailsView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/booking/my",
      component: () => import("@/pages/booking/MyBookingView.vue"),
      meta: { requiresAuth: true },
    },

    // PROFILE
    {
      path: "/profile",
      component: () => import("@/pages/profile/UserProfileView.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "settings",
          component: () => import("@/pages/profile/ProfileSettingsView.vue") // Optional default child
        },
        {
          path: "review",
          component: () => import("@/pages/profile/UserProfileView.vue")
        }
      ],
    },

    // FIND-WORKER
    {
      path: "/workers",
      component: () => import("@/pages/workers/FindWorkerView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/jobs",
      component: () => import("@/pages/jobs/FindJobView.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/dashboard",
      component: () => import("@/pages/dashboard/DashboardView.vue"),
      meta: { requiresAuth: true },
    },

    // MESSAGING
    {
      path: "/messages",
      component: () => import("@/pages/messages/MessagesView.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(authGuard);

export default router