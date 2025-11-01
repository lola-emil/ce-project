<template>
    <h1>This is the home view</h1>
    <Button @click="mode = 'dark'">Click</Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useColorMode } from "@vueuse/core";

const mode = useColorMode();

</script>