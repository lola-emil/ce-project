<template>
    <header class=" w-full">
        <div class="flex h-16 items-center justify-between px-4 lg:px-28 border-b w-full">
            <!-- LOGO -->
            <div>
                <RouterLink to="/" class="font-bold">BuildCare</RouterLink>
            </div>

            <div class="flex gap-10">
                <Nav class="hidden lg:flex" />

                <Button as-child class="px-5 hidden lg:flex" size="sm" variant="secondary">
                    <RouterLink to="signin">Sign In</RouterLink>
                </Button>

            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import Button from './ui/button/Button.vue';
import Nav from './Nav.vue';
import { RouterLink } from 'vue-router';
</script>