<template>
    <div class="grid grid-cols-2 h-screen">
        <div class="bg-base-200">
        </div>

        <div class="flex flex-col justify-center items-center">
            <form class="w-xs flex flex-col gap-5">
                <div>
                    <p class="text-xl font-semibold">Sign In</p>
                    <small class="text-sm text-base-content/75">Enter your account credentials to continue.</small>
                </div>
                <input type="text" class="w-full input" placeholder="Email">
                <input type="text" class="w-full input" placeholder="Password">
                <button type="submit" class="btn btn-primary">Sign In</button>

                <div>
                    <p>Don't have an account yet? 
                        <RouterLink to="/auth/sign-up" class="link link-secondary">Sign Up</RouterLink> </p>
                </div>
            </form>
        </div>
    </div>
</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>