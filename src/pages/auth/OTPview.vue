<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'

</script>

<template>
    <div class="container mx-auto flex flex-col justify-center items-center">
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
                <Button class="w-full"></Button>
            </CardContent>
        </Card>
    </div>
</template>