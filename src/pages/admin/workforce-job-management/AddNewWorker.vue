<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import FieldGroup from '@/components/ui/field/FieldGroup.vue';
import { useWorker } from './composables/useWorker';
import z, { ZodError } from 'zod';
import { FirebaseError } from 'firebase/app';
import type { User } from '@/models/user';
import { ref } from 'vue';
import type { $ZodErrorTree } from 'zod/v4/core';

const worker = useWorker();

const errors = ref<$ZodErrorTree<User>>();

async function submit() {
    const [data, error] = await worker.create();

    if (error instanceof ZodError) {
        errors.value = z.treeifyError((error as ZodError<User>))
        console.log("Validation error: ", errors.value);
        return;
    }

    if (error instanceof FirebaseError) {
        console.log("Firebase error: ", error);
        return;
    }

    console.log(data!);
}


</script>

<template>

    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-5">
            <Button size="sm" variant="link" as-child>
                <RouterLink to="job-management">
                    <ArrowLeft /> Go back
                </RouterLink>
            </Button>
        </div>

        <div class="mt-5">
            <h3 class="text-2xl">Add New Worker</h3>
            <p class="text-muted-foreground">Mao ang page para mag add ug bago nga worker</p>
        </div>

        <div class="mt-5">
            <form @submit.prevent="submit()">
                <FieldGroup>
                    <div class="grid lg:grid-cols-3 gap-5">
                        <Field>
                            <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                            <Input id="firstname" v-model="worker.form.firstname" type="text" />
                            <FieldError>{{ errors?.properties?.firstname?.errors[0] }}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="middlename">Middle Name</FieldLabel>
                            <Input id="middlename" v-model="worker.form.middlename" type="text" />
                            <FieldError>{{ errors?.properties?.middlename?.errors[0] }}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                            <Input id="lastname" v-model="worker.form.lastname" type="text" />
                            <FieldError>{{ errors?.properties?.lastname?.errors[0] }}</FieldError>
                        </Field>
                    </div>
                </FieldGroup>
                <br>
                <br>
                <FieldGroup>
                    <FieldLabel>Setup Address</FieldLabel>
                    <div class="grid lg:grid-cols-3 gap-5">
                        <Field>
                            <FieldLabel htmlFor="street">Street</FieldLabel>
                            <Input id="street" v-model="worker.form.address.street" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="barangay">Barangay</FieldLabel>
                            <Input id="barangay" v-model="worker.form.address.barangay" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="city">City/Municipality</FieldLabel>
                            <Input id="city" v-model="worker.form.address.city" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="province">Province</FieldLabel>
                            <Input id="province" v-model="worker.form.address.province" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="zipcode">Zip Code</FieldLabel>
                            <Input id="zipcode" v-model="worker.form.address.zipcode" />
                        </Field>
                    </div>
                </FieldGroup>
                <br>
                <br>
                <FieldGroup>
                    <FieldLabel>Setup Credentials</FieldLabel>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" v-model="worker.form.email" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" v-model="worker.form.password" />
                    </Field>
                </FieldGroup>
                <br>
                <Button>Submit</Button>
                <br>
                <br>
                <br>
            </form>
        </div>
    </div>

</template>