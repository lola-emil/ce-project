<template>
  <RouterView />
</template>


<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useColorMode } from "@vueuse/core";


// Para sa theme switch (dark/light modes)
useColorMode();

</script>