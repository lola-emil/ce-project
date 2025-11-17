<script setup lang="ts">
import LayoutNav from '@/components/LayoutNav.vue';
import { RouterView } from 'vue-router';

const routes = [{
    path: "",
    title: ""
}];
</script>

<template>
    <LayoutNav :menu-items="routes" />
    <RouterView />
</template>
