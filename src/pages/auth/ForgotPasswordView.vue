<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';

const emailOrPhone = ref<string>();

</script>

<template>
    <div class="container mx-auto h-screen flex flex-col justify-center items-center">
        <div class="fixed top-5 left-5">
            <Button variant="ghost" as-child>
                <RouterLink to="/login">
                    <ArrowLeft />
                </RouterLink>
            </Button>
        </div>

        <div class="w-md">
            <div class="text-center">
                <h3 class="text-primary text-2xl">Forgot Password</h3>
                <p class="text-muted-foreground">Enter your Email or Phone Number to Reset Your Password Quickly.</p>
            </div>
            <br>
            <div>
                <Input v-model="emailOrPhone" placeholder="Email or Password"/>
                <Button class="w-full mt-5">Send</Button>
            </div>
        </div>
    </div>
</template>