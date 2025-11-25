import type { RouteRecordRaw } from "vue-router"

export const clientRoutes: RouteRecordRaw[] = [
    {
        path: "dashboard",
        component: () => import("@/pages/client/client-dashboard/ClientDashboardView.vue")
    },
    {
        path: "create-job-request",
        component: () => import("@/pages/client/create-job-request/CreateJobRequest.vue")
    },
    {
        path: "job-details/:id",
        component: () => import("@/pages/client/job-details/JobDetails.vue")
    },
    {
        path: "my-jobs",
        component: () => import("@/pages/client/my-jobs/MyJobs.vue")
    },
    {
        path: "payments",
        component: () => import("@/pages/client/payments/Payments.vue")
    },
    {
        path: "profile-settings",
        component: () => import("@/pages/client/profile-settings/ProfileSettings.vue")
    }
];