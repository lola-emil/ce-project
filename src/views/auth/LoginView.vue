<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 h-screen">

        <div class="hidden lg:flex flex-col bg-muted justify-between px-5 lg:border-r">
            <div class="flex items-center h-16">
                <div>
                    <RouterLink to="/" class="font-bold">BuildCare</RouterLink>
                </div>
            </div>
            <div></div>
        </div>

        <div class="relative flex flex-col justify-center items-center bg-background">
            <div class="absolute top-0 w-full flex items-center justify-between h-16 px-5">
                <RouterLink to="/" class="font-bold lg:hidden">BuildCare</RouterLink>
                <!-- <RouterLink class="hidden lg:flex" to="/">Back to Home</RouterLink> -->
                <!-- <RouterLink class="hidden lg:flex" to="/signup">Sign Up</RouterLink> -->
            </div>
            <form @submit.prevent="onSubmit" class="w-xs">
                <div>
                    <p class="text-xl font-bold text-center lg:text-left">Sign In</p>
                    <p class="text-center lg:text-left text-muted-foreground text-sm">Enter your credentials below to
                        sign in.</p>
                </div>
                <br>
                <div class="grid items-center w-full gap-4">
                    <div class="flex flex-col space-y-3">
                        <Label for="name">Email</Label>
                        <Input id="name" :disabled="isLoading"/>
                    </div>

                    <div class="flex flex-col space-y-3">
                        <Label for="name">Password</Label>
                        <Input type="password" id="name" :disabled="isLoading"/>
                    </div>

                    <Button class="w-full" :disabled="isLoading">Sign In</Button>
                </div>

                <br>
                <div>
                    <small class="text-sm">Don't have an account?
                        <RouterLink to="/signup" class="text-primary" >Sign Up</RouterLink>
                    </small>
                </div>
            </form>

            <br>

            <div class="relative">
                <div class="absolute inset-0 flex items-center">
                    <span class="w-full border-t" />
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>


            <br>


            <!-- <div class="w-xs">
                <Button class="w-full" variant="outline" type="button" :disabled="isLoading">
                    <Spinner v-if="isLoading" class="mr-2 h-4 w-4" />
                    <FontAwesomeIcon :icon="faGoogle" />
                    Google
                </Button>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

import { Spinner } from '../../components/ui/spinner';


const isLoading = ref(false)


async function onSubmit() {
    isLoading.value = true

    setTimeout(() => {
        isLoading.value = false
    }, 3000)
}
</script>