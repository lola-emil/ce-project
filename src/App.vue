<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
useColorMode()
</script>


<template>
    <Toaster position="top-center"/>
    <RouterView />
</template>
