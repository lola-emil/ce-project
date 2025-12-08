<script setup lang="ts">
import { ref } from 'vue';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { auth, functions } from '@/firebase';
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'vue-sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import { httpsCallable } from 'firebase/functions';

const email = ref<string>("");
const otpSent = ref(false);

const onSend = async () => {
    const methods = await fetchSignInMethodsForEmail(auth, email.value);

    if (!methods.includes("password")) {
        // This means user registered with Google, GitHub, Apple, etc.
        toast.error("This account does not use a password. Please sign in with Google.");
        return;
    }

    const sendOtpFn = httpsCallable(functions, "sendOtp");


    await sendPasswordResetEmail(auth, email.value);
    toast.success("Password reset email sent!");
}

</script>

<template>
    <div v-if="!otpSent" class="container mx-auto h-screen flex flex-col justify-center items-center">
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
                <p class="text-muted-foreground">Enter your Email to Reset Your Password Quickly.</p>
            </div>
            <br>
            <div>
                <Input v-model="email" placeholder="Email" />
                <Button class="w-full mt-5" @click="onSend">Send</Button>
            </div>
        </div>
    </div>


    <div v-if="otpSent" class="container mx-auto flex flex-col justify-center items-center">
        <div class="fixed top-5 left-5">
            <Button variant="ghost" as-child>
                <RouterLink to="/login">
                    <ArrowLeft />
                </RouterLink>
            </Button>
        </div>


        <Card class="w-sm">
            <CardHeader>
                <CardTitle>Enter OTP</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <InputOTP :maxlength="6">
                        <InputOTPGroup>
                            <InputOTPSlot :index="0" />
                            <InputOTPSlot :index="1" />
                            <InputOTPSlot :index="2" />
                            <InputOTPSlot :index="3" />
                            <InputOTPSlot :index="4" />
                            <InputOTPSlot :index="5" />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <br>
                <Button class="w-full"></Button>
            </CardContent>
        </Card>
    </div>
</template>