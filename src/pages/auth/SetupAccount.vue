<script setup lang="ts">
import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Circle, Dot } from 'lucide-vue-next';
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError
} from "@/components/ui/field"
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ref } from 'vue';


const stepIndex = ref(2);
const steps = [
    {
        step: 1,
        title: 'Your details',
        description:
            'Provide your personal details. We will use this information to create your account',
    },
    {
        step: 2,
        title: 'Contact Information',
        description: 'Providing your contact details helps us keep you updated on important account activities and ensure smooth communication.',
    },
    {
        step: 3,
        title: 'Done',
        description:
            'Account setup finished',
    },
]


</script>

<template>
    <div class="h-screen grid grid-cols-1 lg:grid-cols-3">
        <div class="bg-secondary hidden lg:flex flex-col justify-center items-center">
            <h3 class="text-2xl">Set up your account</h3>
            <br>
            <div class="px-10 lg:px-20">
                <Stepper orientation="vertical" class="mx-auto flex w-full max-w-md flex-col justify-start gap-10">
                    <StepperItem v-for="step in steps" :key="step.step" v-slot="{ state }"
                        class="relative flex w-full items-start gap-6" :step="step.step">
                        <StepperSeparator v-if="step.step !== steps[steps.length - 1]?.step"
                            class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" />
                        <StepperTrigger as-child>
                            <Button :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                                size="icon" class="z-10 rounded-full shrink-0"
                                :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']">
                                <Check v-if="state === 'completed'" class="size-5" />
                                <Circle v-if="state === 'active'" />
                                <Dot v-if="state === 'inactive'" />
                            </Button>
                        </StepperTrigger>
                        <div class="flex flex-col gap-1">
                            <StepperTitle :class="[state === 'active' && 'text-primary']"
                                class="text-sm font-semibold transition lg:text-base">
                                {{ step.title }}
                            </StepperTitle>
                            <StepperDescription :class="[state === 'active' && 'text-primary']"
                                class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm">
                                {{ step.description }}
                            </StepperDescription>
                        </div>
                    </StepperItem>
                </Stepper>
            </div>
        </div>
        <div class="col-span-2">
            <div class="container mx-auto px-5 lg:px-20 mt-20">
                <div v-if="stepIndex == 1">
                    <h3 class="text-xl">Your Details</h3>
                    <br>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="firstname">First name</FieldLabel>
                            <Input id="firstname" type="firstname" />
                            <FieldError></FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="middlename">Middle name</FieldLabel>
                            <Input id="middlename" type="middlename" />
                            <FieldError></FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="lastname">Last name</FieldLabel>
                            <Input id="lastname" type="lastname" />
                            <FieldError></FieldError>
                        </Field>
                    </FieldGroup>
                </div>

                <div v-if="stepIndex == 2">
                    <h3 class="text-xl">Contact Information</h3>
                    <br>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" type="email" />
                            <FieldError></FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
                            <Input id="phone_number" type="phone_number" />
                            <FieldError></FieldError>
                        </Field>

                    </FieldGroup>
                    <br>
                    <br>
                    <div class="flex items-center gap-5">
                        <p>Address</p>
                        <Separator />
                    </div>
                    <br>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="email">Address Line 1</FieldLabel>
                            <Input id="email" type="email" />
                            <FieldError></FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="email">Address Line 2</FieldLabel>
                            <Input id="email" type="email" />
                            <FieldError></FieldError>
                        </Field>

                        <div class="grid grid-cols-3 gap-5">
                            <Field>
                                <FieldLabel htmlFor="phone_number">City</FieldLabel>
                                <Input id="phone_number" type="phone_number" />
                                <FieldError></FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="phone_number">Province</FieldLabel>
                                <Input id="phone_number" type="phone_number" />
                                <FieldError></FieldError>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="phone_number">Zip Code</FieldLabel>
                                <Input id="phone_number" type="phone_number" />
                                <FieldError></FieldError>
                            </Field>
                        </div>

                    </FieldGroup>
                </div>
            </div>

            <div>
                
            </div>
        </div>
    </div>
</template>