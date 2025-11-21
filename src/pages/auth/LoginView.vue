
<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';


import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from "@/components/ui/input";
import { motion } from "motion-v";
import { RouterLink } from 'vue-router';
import { reactive, ref } from 'vue';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from "lucide-vue-next"
import { useRouter } from "vue-router";

const router = useRouter();


const form = reactive({
    email: "",
    password: ""
})

const emails = ["admin@gmail.com", "client@gmail.com", "worker@gmail.com"];
const password = "letmein123"

const error = ref<boolean>(false);

function login() {
    
    if (!emails.includes(form.email) && form.password != password) {
        error.value = true;
        return;
    }

    switch (form.email) {
        case "admin@gmail.com":
            router.push("/admin/dashboard");
            break;
        case "client@gmail.com":
            router.push("/client/dashboard");
            break;
        case "worker@gmail.com":
            router.push("/worker/dashboard");
            break;
        default:
            break;
    }
}
</script>

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
                <div>
                    <br>
                    <Alert v-if="error" variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>Invalid credentials</AlertTitle>
                    </Alert>
                </div>
                <form @submit.prevent="login()" class="w-xs">

                    <br>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" v-model="form.email" type="email" placeholder="m@example.com" required />
                        </Field>
                        <Field class="flex-col-reverse">
                            <Input id="password" v-model="form.password" type="password" required />

                            <div class="flex items-center">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                    Forgot your password?
                                </a>
                            </div>
                        </Field>
                        <Field>
                            <Button type="submit" >Login</Button>
                            <Button variant="outline" type="button">
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


