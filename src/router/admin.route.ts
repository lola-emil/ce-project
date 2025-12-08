import type { RouteRecordRaw } from "vue-router";

export const adminRoutes: RouteRecordRaw[] = [
    {
        path: "dashboard",
        component: () => import("@/pages/admin/admin-dashboard/AdminDashboardView.vue")
    },
    {
        path: "job-management",
        component: () => import("@/pages/admin/workforce-job-management/WorkforceJobManagement.vue")
    },
    {
        path: "user-management",
        component: () => import("@/pages/admin/user-management/UserManagementView.vue")
    },
    {
        path: "edit-user/:id",
        component: () => import("@/pages/admin/user-management/EditUserView.vue")
    },
    {
        path: "client-management",
        component: () => import("@/pages/admin/user-management/UserManagementView.vue")
    },
    {
        path: "worker-assignment-console",
        component: () => import("@/pages/admin/worker-assignment-console/WorkerAssignmentConsole.vue")
    },
    {
        path: "create-new-worker",
        component: () => import("@/pages/admin/user-management/CreateNewWorker2.vue")
    },
    {
        path: "job-details/:id",
        component: () => import("@/pages/admin/job-details/JobDetails.vue")
    }
];
