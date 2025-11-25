<script setup lang="ts">
import { RouterView } from 'vue-router';
import LayoutNav from '@/components/LayoutNav.vue';

const routes = [
    {
        path: "dashboard",
        title: "Overview"
    },

    {
        path: "my-jobs",
        title: "My Jobs"
    },

    {
        path: "payments",
        title: "Payments"
    },
]

</script>

<template>
    <LayoutNav :menu-items="routes"/>
    <RouterView />
</template>
