import type { RouteRecordRaw } from "vue-router";

export const adminRoutes: RouteRecordRaw[] = [
    {
        path: "dashboard",
        component: () => import("@/pages/admin/admin-dashboard/AdminDashboardView.vue")
    },
    {
        path: "job-management",
        component: () => import("@/pages/admin/job-management/JobManagement.vue")
    },
    {
        path: "payment-commission-management",
        component: () => import("@/pages/admin/payment-comission-management/PaymentComissionManagement.vue")
    },
    {
        path: "skill-management",
        component: () => import("@/pages/admin/skill-management/SkillManagement.vue")
    },
    {
        path: "user-management",
        component: () => import("@/pages/admin/user-management/UserManagementView.vue")
    },
    {
        path: "worker-assignment-console",
        component: () => import("@/pages/admin/worker-assignment-console/WorkerAssignmentConsole.vue")
    }
];
