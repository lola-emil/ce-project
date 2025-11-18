<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from "@/components/ui/input"
import { motion } from "motion-v"
import { useLogin } from './composables/auth';

const auth = useLogin();

</script>

<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }" class="flex flex-col justify-center items-center">
            <Card class="w-[365px]">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="auth.loginWithEmailAndPassword()">
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" v-model="auth.loginForm.email" type="email" placeholder="m@example.com" required
                                    :disabled="auth.isLoading.value" />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <a href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" v-model="auth.loginForm.password" type="password" required :disabled="auth.isLoading.value" />
                            </Field>
                            <Field>
                                <Button type="submit" :disabled="auth.isLoading.value">Login</Button>
                                <Button @click="auth.loginWithGoogle()" variant="outline" type="button"
                                    :disabled="auth.isLoading.value">
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="#">Sign up</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    </div>
</template>
