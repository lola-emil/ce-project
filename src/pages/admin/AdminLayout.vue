<script setup lang="ts">
import { RouterView } from 'vue-router';
import LayoutNav from '@/components/LayoutNav.vue';

const routes = [
    {
        path: "/admin/dashboard",
        title: "Overview"
    },

    {
        path: "/admin/user-management",
        title: "User Management"
    },


    {
        path: "/admin/worker-assignment-console",
        title: "Worker Assignment"
    },
];

</script>

<template>
    <LayoutNav :menu-items="routes" />
    <RouterView />
</template>

