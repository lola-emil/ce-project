<template>
    <div class="container mx-auto">
        <h1>This is the user management view.</h1>
    </div>
</template>

<script setup lang="ts">
import { getAllUsers } from "@/repository/user.repo";
import { onMounted, ref } from "vue";

const users = ref<{id: string}[]>([])

onMounted(async () => {
    users.value = await getAllUsers();

    console.log(users.value);
})
</script>