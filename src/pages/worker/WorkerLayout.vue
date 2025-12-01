<script setup lang="ts">
import LayoutNav from '@/components/LayoutNav.vue';
import { RouterView } from 'vue-router';

const routes = [
    {
        path: "/worker/dashboard",
        title: "Overview"
    },

    {
        path: "/worker/my-assignments",
        title: "My Jobs"
    },
];
</script>

<template>
    <LayoutNav :menu-items="routes" />
    <RouterView />
</template>
