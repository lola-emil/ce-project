<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRegister } from "./composables/auth"

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

<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <Card class="w-96">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="submit">
                    <FieldGroup>
                        <!-- <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input id="name" type="text" placeholder="John Doe" required />
                        </Field> -->
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" v-model="auth.registrationForm.email" type="email" placeholder="m@example.com" required :disabled="auth.isLoading.value"/>
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not share your email
                                with anyone else.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" v-model="auth.registrationForm.password" type="password" required :disabled="auth.isLoading.value"/>
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input id="confirm-password" v-model="auth.registrationForm.confirm_password" type="password" required :disabled="auth.isLoading.value"/>
                            <FieldDescription>Please confirm your password.</FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button type="submit" :disabled="auth.isLoading.value">Create Account</Button>
                                <Button variant="outline" type="button" :disabled="auth.isLoading.value">
                                    Sign up with Google
                                </Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <a href="#">Sign in</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
