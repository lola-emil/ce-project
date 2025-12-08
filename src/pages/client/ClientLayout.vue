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
        title: "Jobs Requests"
    },
]

</script>

<template>
    <LayoutNav :menu-items="routes"/>
    <RouterView />
</template>
