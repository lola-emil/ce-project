<script setup lang="ts">
import { getAllJobs } from "@/repository/job.repo";
import { onMounted, ref } from "vue";

const jobs = ref<{ id: string }[]>([])

onMounted(async () => {
    jobs.value = await getAllJobs();
})
</script>


<template>
    <h1>This is admin's job management page.</h1>
</template>