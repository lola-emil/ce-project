<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';


import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from "@/components/ui/input";
import { motion } from "motion-v";
import { RouterLink } from 'vue-router';
import { reactive, ref } from 'vue';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from "lucide-vue-next"
import { useLogin } from './composables/auth';
import { Spinner } from '@/components/ui/spinner';

const auth = useLogin();

const error = ref<boolean>(false);

</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-2">

        <div class="h-screen flex flex-col justify-center items-center relative">
            <div class="fixed top-5 left-5">
                <Button variant="link" as-child>
                    <RouterLink to="/">
                        Go to home
                    </RouterLink>
                </Button>
            </div>
            <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, ease: 'easeOut' }">
                <h3 class="text-xl">Login to your account</h3>
                <p class="text-muted-foreground">Enter your email below to login to your account</p>
                <div>
                    <br>
                    <Alert v-if="error" variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>Invalid credentials</AlertTitle>
                    </Alert>
                </div>
                <form @submit.prevent="auth.loginWithEmailAndPassword" class="w-xs">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" v-model="auth.loginForm.email" type="email" placeholder="m@example.com"
                                required :disabled="auth.isLoading.value"/>

                            <FieldError>{{ auth.formError.email }}</FieldError>
                        </Field>
                        <Field class="flex-col-reverse">
                            <div>
                                <Input id="password" v-model="auth.loginForm.password" type="password" required 
                                :disabled="auth.isLoading.value"/>
                                <FieldError class="mt-2">{{ auth.formError.password }}</FieldError>
                            </div>
                            <div class="flex items-center">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <RouterLink to="/forgot-password" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                    Forgot your password?
                                </RouterLink>
                            </div>
                        </Field>
                        <Field>
                            <Button type="submit" :disabled="auth.isLoading.value">
                                <Spinner v-if="auth.isLoading.value"/>
                                Login</Button>
                            <Button variant="outline" type="button" @click="auth.loginWithGoogle()" :disabled="auth.isLoading.value">
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
