<template>
    <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useColorMode } from '@vueuse/core';

useColorMode();

</script>

