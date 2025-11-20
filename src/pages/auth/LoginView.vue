<template>
    <div class="grid grid-cols-1 lg:grid-cols-2">

        <div class="h-screen flex flex-col justify-center items-center relative">
            <div class="fixed top-5 left-5">
                <Button variant="link" as-child>
                    <RouterLink to="/">
                        Back to home
                    </RouterLink>
                </Button>
            </div>
            <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, ease: 'easeOut' }">
                <h3 class="text-xl">Login to your account</h3>
                <p class="text-muted-foreground">Enter your email below to login to your account</p>
                <br>
                <form @submit.prevent="auth.loginWithEmailAndPassword()" class="w-xs">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" v-model="auth.loginForm.email" type="email" placeholder="m@example.com"
                                required :disabled="auth.isLoading.value" />
                        </Field>
                        <Field class="flex-col-reverse">
                            <Input id="password" v-model="auth.loginForm.password" type="password" required
                                :disabled="auth.isLoading.value" />

                            <div class="flex items-center">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                    Forgot your password?
                                </a>
                            </div>
                        </Field>
                        <Field>
                            <Button type="submit" :disabled="auth.isLoading.value">Login</Button>
                            <Button @click="auth.loginWithGoogle()" variant="outline" type="button"
                                :disabled="auth.isLoading.value">
                                Login with Google
                            </Button>
                            <FieldDescription class="text-center">
                                <div>
                                    Don&apos;t have an account? <RouterLink to="register"
                                        class="ml-auto inline-block text-sm underline-offset-4 hover:underline">Sign up
                                    </RouterLink>

                                </div>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </motion.div>

        </div>

        <div class="bg-secondary hidden md:block">
        </div>
    </div>
</template>


<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';


import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from "@/components/ui/input";
import { motion } from "motion-v";
import { useLogin } from './composables/auth';
import { RouterLink } from 'vue-router';

const auth = useLogin();

</script>
