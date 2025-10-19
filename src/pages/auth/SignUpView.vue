<template>
    <div class="grid grid-cols-2 h-screen">
        <div class="bg-base-200">
        </div>

        <div class="flex flex-col justify-center items-center">
            <form class="w-xs flex flex-col gap-5">
                <div>
                    <p class="text-xl font-semibold">Sign Up</p>
                    <small class="text-sm text-base-content/75">Enter your email to proceed.</small>
                </div>
                <input type="text" class="w-full input" placeholder="Email">
                <button type="submit" class="btn btn-primary">Sign Up</button>
                <div>
                    <p>Don't have an account yet? 
                        <RouterLink to="/auth/sign-in" class="link link-secondary">Sign In</RouterLink> </p>
                </div>
            </form>

            <br>
            <p class="text-sm text-center">OR</p>
            <br>

            <div class="w-xs">
                <button class="btn btn-secondary btn-soft w-full">Sign In with Google</button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>