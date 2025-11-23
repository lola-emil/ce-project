<template>
    <div class="container mx-auto">
        <h1>This is the user management view.</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const users = ref<{id: string}[]>([])

onMounted(async () => {

    console.log(users.value);
})
</script>