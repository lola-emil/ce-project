<script setup lang="ts">
import { getAllUsers } from "@/repository/user.repo";
import { onMounted, ref } from "vue";

const users = ref<{ id: string }[]>([])

onMounted(async () => {
    users.value = await getAllUsers();
})

</script>

<template>
    <div>
        * See all idle/available workers
        * Manually assign workers to jobs (if needed)
        * Match worker based on category + location
    </div>
</template>