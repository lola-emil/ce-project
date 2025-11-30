<script setup lang="ts">
import { RouterView } from 'vue-router';
import LayoutNav from '@/components/LayoutNav.vue';

const routes = [
    {
        path: "/client/dashboard",
        title: "Overview"
    },

    {
        path: "/client/my-jobs",
        title: "My Jobs"
    },

    {
        path: "/client/payments",
        title: "Payments"
    },
]

</script>

<template>
    <LayoutNav :menu-items="routes"/>
    <RouterView />
</template>
