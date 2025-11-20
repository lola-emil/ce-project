<script setup lang="ts">
import LayoutNav from '@/components/LayoutNav.vue';
import { RouterView } from 'vue-router';

const routes = [
    {
        path: "dashboard",
        title: "Overview"
    },

    {
        path: "my-assignments",
        title: "My Jobs"
    },
];
</script>

<template>
    <LayoutNav :menu-items="routes" />
    <RouterView />
</template>
