import type { RouteRecordRaw } from "vue-router";

export const workerRoutes: RouteRecordRaw[] = [
    {
        path: "dashboard",
        component: () => import("@/pages/worker/worker-dashboard/WorkerDashboardView.vue")
    },
    {
        path: "earnings",
        component: () => import("@/pages/worker/earnings-page/Earnings.vue")
    },
    {
        path: "job-details",
        component: () => import("@/pages/worker/job-details/JobDetails.vue")
    },
    {
        path: "job-execution",
        component: () => import("@/pages/worker/job-execution/JobExecution.vue")
    },
    {
        path: "my-assignments",
        component: () => import("@/pages/worker/my-assignments/MyAssignments.vue")
    },
    {
        path: "profile",
        component: () => import("@/pages/worker/profile/Profile.vue")
    },
    {
        path: "settings",
        component: () => import("@/pages/worker/settings/Settings.vue")
    }
];
