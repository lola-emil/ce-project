<template>
    <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useProfileStore } from './stores/profile';

const profileStore = useProfileStore();

profileStore.init();
</script>

