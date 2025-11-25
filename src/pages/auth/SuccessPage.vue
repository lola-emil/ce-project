<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Button } from '@/components/ui/button';

</script>

<template>
    <div class="h-screen w-full flex flex-col justify-center items-center">
        <h1 class="text-3xl">Congrats!, You're all set</h1>

        <Button variant="link">
            <RouterLink to="/dashboard">Go to Dashboard</RouterLink>
        </Button>
    </div>
</template>