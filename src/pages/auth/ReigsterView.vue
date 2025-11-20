<template>

    <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="fixed top-5 left-5">
            <Button variant="link" as-child>
                <RouterLink to="/">
                    Back to home
                </RouterLink>
            </Button>
        </div>
        <div class="h-screen flex flex-col justify-center items-center">

            <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, ease: 'easeOut' }">
                <h3 class="text-xl">Create an account</h3>
                <p class="text-muted-foreground">Enter your information below to create your account</p>
                <br>
                <form class="w-xs">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" v-model="auth.registrationForm.email" type="email"
                                placeholder="m@example.com" required :disabled="auth.isLoading.value" />
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not share your email
                                with anyone else.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" v-model="auth.registrationForm.password" type="password" required
                                :disabled="auth.isLoading.value" />
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input id="confirm-password" v-model="auth.registrationForm.confirm_password"
                                type="password" required :disabled="auth.isLoading.value" />
                            <FieldDescription>Please confirm your password.</FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button type="submit" :disabled="auth.isLoading.value">Create Account</Button>
                                <Button variant="outline" type="button" :disabled="auth.isLoading.value">
                                    Sign up with Google
                                </Button>
                                <FieldDescription class="px-6 text-center">
                                    Already have an account? <RouterLink to="/login"
                                        class="ml-auto inline-block text-sm underline-offset-4 hover:underline">Sign in
                                    </RouterLink>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>

                    <!-- <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader> -->

                </form>
            </motion.div>
        </div>

        <div class="bg-secondary hidden md:block">
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRegister } from "./composables/auth"
import { motion } from "motion-v"

const auth = useRegister();

async function submit() {
    const [result, error] = await auth.registerEmailAndPassword();

    if (error) {
        console.log(error);
        return;
    }

    console.log(result);
}

</script>