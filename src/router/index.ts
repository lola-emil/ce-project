import SignInView from '@/pages/auth/SignInView.vue'
import SignUpView from '@/pages/auth/SignUpView.vue';
import BookingDetailsView from '@/pages/booking/BookingDetailsView.vue';
import BookingView from '@/pages/booking/BookingView.vue';
import MyBookingView from '@/pages/booking/MyBookingView.vue';
import PageNotFound from '@/pages/error/PageNotFound.vue';
import FindWorkerView from '@/pages/workers/FindWorkerView.vue';
import HomeView from '@/pages/home/HomeView.vue'
import ProfileSettingsView from '@/pages/profile/ProfileSettingsView.vue';
import ReviewView from '@/pages/profile/ReviewView.vue';
import UserProfileView from '@/pages/profile/UserProfileView.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView
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
      component: () => import("@/pages/booking/BookingView.vue")
    },
    {
      path: "/booking/details/:id",
      component: () => import("@/pages/booking/BookingDetailsView.vue")
    },
    {
      path: "/booking/my",
      component: () => import("@/pages/booking/MyBookingView.vue")
    },

    // PROFILE

    {
      path: "/profile",
      component: () => import("@/pages/profile/UserProfileView.vue"),
      children: [
        {
          path: "settings",
          component: () => import("@/pages/profile/ProfileSettingsView.vue") // Optional default child
        },
        {
          path: "review",
          component: () => import("@/pages/profile/UserProfileView.vue")
        },
        {
          path: "review",
          component: () => import("@/pages/profile/ReviewView.vue")
        }
      ]
    },


    // FIND-WORKER
    {
      path: "/workers",
      component: () => import("@/pages/workers/FindWorkerView.vue")
    },
    {
      path: "/jobs",
      component: () => import("@/pages/jobs/FindJobView.vue")
    },

    {
      path: "/dashboard",
      component: () => import("@/pages/dashboard/DashboardView.vue")
      // children: [
      //   {
      //     path: "worker",
      //     component: () => import("@/pages/dashboard/WorkerView.vue")
      //   },
      //   {
      //     path: "client",
      //     component: () => import("@/pages/dashboard/ClientView.vue")
      //   },
      // ]
    },

    // DASHBOARD
    // {
    //   path: "/dashboard/worker",
    //   component: () => import("@/pages/dashboard/WorkerView.vue")
    // },

    // {
    //   path: "/dashboard/client",
    //   component: () => import("@/pages/dashboard/ClientView.vue")
    // },

    // MESSAGING
    {
      path: "/messages",
      component: () => import("@/pages/messages/MessagesView.vue")
    }

  ],
});

export default router