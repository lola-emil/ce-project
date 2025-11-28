import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/index/HomeView.vue';
import { clientRoutes } from './client.route';
import { workerRoutes } from './worker.route';
import { adminRoutes } from './admin.route';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import the default styles
import AboutView from '@/pages/index/AboutView.vue';
import ContactView from '@/pages/index/ContactView.vue';
import FAQView from '@/pages/index/FAQView.vue';
import FunctionTest from '@/pages/FunctionTest.vue';
import { getCurrentUser } from 'vuefire';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import DashbooardView from '@/pages/dashboard/DashbooardView.vue';
import { useAuthStore } from '@/stores/authStore';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      meta: {
        title: "Prodigify",
        requiresAuth: false,
      },
    },

    {
      path: "/forgot-password",
      component: import("@/pages/auth/ForgotPasswordView.vue"),
      meta: {
        title: "Forgot Password",
        requiresAuth: false,
      },
    },

    {
      path: "/login",
      component: () => import("@/pages/auth/LoginView.vue"),
      meta: {
        title: "Log In",
      },
    },
    {
      path: "/register",
      component: () => import("@/pages/auth/RegisterView.vue"),
      meta: {
        title: "Register",
      },
    },

    {
      path: "/success",
      component: () => import("@/pages/auth/SuccessPage.vue"),
      meta: {
        title: "Success"
      }
    },

    {
      path: "/setup-account",
      component: () => import("@/pages/auth/SetupAccount.vue"),
      meta: {
        title: "Setup Your Account"
      },
      beforeEnter: async (to, from, next) => {
        const user = await getCurrentUser();

        if (!user) {
          next("/login");
          return;
        }

        const userDetailDocRef = doc(db, "users", user.uid);
        const userDetailSnap = await getDoc(userDetailDocRef);
        if (userDetailSnap.exists()) {
          next("/dashboard");
          return;
        }

        next();
      }
    },

    {
      path: "/about",
      component: AboutView,
      meta: {
        title: "About Us",
      },
    },
    {
      path: "/contact",
      component: ContactView,
      meta: {
        title: "Contact",
      },
    },

    {
      path: "/faqs",
      component: FAQView,
      meta: {
        title: "FAQs",
      },
    },

    {
      path: "/client",
      component: () => import("@/pages/client/ClientLayout.vue"),
      children: [...clientRoutes],
      meta: {
        requiresAuth: true,
        roles: ["client"]
      },
    },
    {
      path: "/worker",
      component: () => import("@/pages/worker/WorkerLayout.vue"),
      children: [...workerRoutes],
      meta: {
        requiresAuth: true,
        roles: ["worker"]
      },
    },

    {
      path: "/function-test",
      component: FunctionTest
    },

    {
      path: "/admin",
      component: () => import("@/pages/admin/AdminLayout.vue"),
      children: [...adminRoutes],
      meta: {
        requiresAuth: true,
        roles: ["admin"]
      },
    },
    {
      path: "/dashboard",
      component: DashbooardView,
      meta: {
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => {
        const auth = useAuthStore();

        switch (auth.userData?.role) {
          case "client":
            next("/client/dashboard")
            break;
          case "admin":
            next("/admin/dashboard")
            break;
          case "worker":
            next("/worker/dashboard")
            break;
          default:
            next();
            break;
        }

      }
    }
  ],
});


router.beforeEach(async (to, _from, next) => {
  // const user = await getCurrentUser();

  // // Auth guard
  // if (to.meta.requiresAuth && user) {
  //   const q = query(
  //     collection(db, "users"),
  //     where("user_uid", "==", user?.uid),
  //     limit(1)
  //   );

  //   const userDoc = await getDocs(q);
  //   const userInfo = userDoc.docs[0]?.data();

  //   if (!(<string[]>to.meta.roles).includes(userInfo?.role)) {
  //     next("/login");
  //   }
  // }


  const { title, description } = to.meta;
  const defaultTitle = "Prodigify";
  const defaultDescription = 'Unsay Inyo?';
  // Set ang page title
  document.title = <string>title ?? defaultTitle;

  const descriptionElement = document.querySelector('head meta[name="description"]')
  descriptionElement?.setAttribute('content', <string>description || defaultDescription)


  NProgress.start(); // Start the progress bar on route change
  next();
});

router.afterEach(() => {
  NProgress.done(); // Complete the progress bar after route resolution
});

export default router