import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import AboutView from '../views/about/AboutView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: "/about-us",
      name: "about-us",
      component: AboutView
    },

    {
      path: "/signin",
      name: "signin",
      component: LoginView
    },
    {
      path: "/signup",
      name: "signup",
      component: RegisterView
    },

    {
      path: "/profile",
      name: "profile",
      component: import("../views/profile/ProfileView.vue")
    },


    {
      path: "/find-workers",
      name: "find-workers",
      component: import("../views/workers/FindWorkerView.vue")
    },

    {
      path: "/posted-projects",
      name: "posted-projects",
      component: import("../views/postings/JobPostingsView.vue")
    }

  ],
})

export default router
