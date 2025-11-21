import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home/HomeView.vue';
import { clientRoutes } from './client.route';
import { workerRoutes } from './worker.route';
import { adminRoutes } from './admin.route';

// src/router/index.js (or main.js if you prefer)
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import the default styles
import AboutView from '@/pages/home/AboutView.vue';
import ContactView from '@/pages/home/ContactView.vue';
import FAQView from '@/pages/home/FAQView.vue';
// import { getCurrentUser } from 'vuefire';
// import { collection, getDocs, limit, query, where } from 'firebase/firestore';
// import { db } from '@/firebase';

// ... your router setup ...


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
      path: "/login",
      component: () => import("@/pages/auth/LoginView.vue"),
      meta: {
        title: "Log In",
      },
    },
    {
      path: "/register",
      component: () => import("@/pages/auth/ReigsterView.vue"),
      meta: {
        title: "Register",
      },
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
      path: "/admin",
      component: () => import("@/pages/admin/AdminLayout.vue"),
      children: [...adminRoutes],
      meta: {
        requiresAuth: true,
        roles: ["admin"]
      },
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