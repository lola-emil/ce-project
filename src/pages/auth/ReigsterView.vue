<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldError
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRegister } from "./composables/auth"
import { motion } from "motion-v"

const auth = useRegister();

</script>

<template>

    <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="fixed top-5 left-5">
            <Button variant="link" as-child>
                <RouterLink to="/">
                    Go to home
                </RouterLink>
            </Button>
        </div>
        <div class="h-screen flex flex-col justify-center items-center">

            <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, ease: 'easeOut' }">
                <h3 class="text-xl">Create an account</h3>
                <p class="text-muted-foreground">Enter your information below to create your account</p>
                <br>
                <form class="w-xs" @submit.prevent="auth.registerEmailAndPassword()">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" v-model="auth.registrationForm.email" type="email"
                                placeholder="m@example.com" :disabled="auth.isLoading.value" />
                            <FieldError>{{ auth.formError.value?.properties?.email?.errors[0] }}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" v-model="auth.registrationForm.password" type="password"
                                :disabled="auth.isLoading.value" />

                            <FieldError v-if="auth.formError.value?.properties?.password">{{
                                auth.formError.value?.properties?.password.errors[0] }}</FieldError>

                            <FieldDescription v-if="!auth.formError.value?.properties?.password">
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input id="confirm-password" v-model="auth.registrationForm.confirm_password"
                                type="password" :disabled="auth.isLoading.value" />

                            <FieldError v-if="auth.formError.value?.properties?.confirm_password">{{
                                auth.formError.value?.properties?.confirm_password.errors[0] }}</FieldError>

                            <FieldDescription v-if="!auth.formError.value?.properties?.confirm_password">Please confirm
                                your password.</FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button type="submit" :disabled="auth.isLoading.value">Create Account</Button>
                                <FieldDescription class="px-6 text-center">
                                    Already have an account? <RouterLink to="/login"
                                        class="ml-auto inline-block text-sm underline-offset-4 hover:underline">Sign in
                                    </RouterLink>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </motion.div>
        </div>

        <div class="bg-secondary hidden md:block">
        </div>
    </div>
</template>
