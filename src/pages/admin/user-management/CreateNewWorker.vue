<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import FieldGroup from '@/components/ui/field/FieldGroup.vue';
import { useWorker, type WorkerFormError } from './composables/useWorker';
import { ref, watch } from 'vue';
import z, { ZodError, treeifyError } from 'zod';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'vue-router';

const worker = useWorker();
const router = useRouter();

const formError = ref<ReturnType<typeof treeifyError<WorkerFormError>> | undefined>(undefined);

async function submit() {
    const [_, error] = await worker.create();

    if (error) {
        if (error instanceof ZodError) {
            formError.value = z.treeifyError(error as ZodError<WorkerFormError>)
            console.log("Validation error", formError.value);
            console.log(formError.value?.properties?.name?.properties?.firstname?.errors);
            return;
        }

        if (error instanceof FirebaseError) {
            alert("Unidentified error");
            return;
        }
    }


    router.push("/admin/user-management");
}



</script>

<template>

    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-5">
            <Button size="sm" variant="link" as-child>
                <RouterLink to="user-management">
                    <ArrowLeft /> Go back
                </RouterLink>
            </Button>
        </div>

        <div class="mt-5">
            <h3 class="text-2xl">Add New Worker</h3>
            <p class="text-muted-foreground">Mao ang page para mag add ug bago nga worker</p>
        </div>

        <div class="mt-5 grid grid-cols-3">
            <div class="col-span-2">
                <FieldGroup>
                    <div class="flex flex-col gap-5">
                        <Field :data-invalid="formError?.properties?.name?.properties?.firstname">
                            <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                            <Input id="firstname" v-model="worker.form.name.firstname" type="text" />
                            <FieldError :errors="formError?.properties?.name?.properties?.firstname?.errors" />
                        </Field>

                        <Field :data-invalid="formError?.properties?.name?.properties?.middlename">
                            <FieldLabel htmlFor="middlename">Middle Name</FieldLabel>
                            <Input id="middlename" v-model="worker.form.name.middlename" type="text" />
                            <FieldError :errors="formError?.properties?.name?.properties?.middlename?.errors" />
                        </Field>

                        <Field :data-invalid="formError?.properties?.name?.properties?.lastname">
                            <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                            <Input id="lastname" v-model="worker.form.name.lastname" type="text" />
                            <FieldError :errors="formError?.properties?.name?.properties?.lastname?.errors" />
                        </Field>
                    </div>
                </FieldGroup>
                <br>
                <br>
                <FieldGroup>
                    <FieldLabel>Setup Address</FieldLabel>
                    <div class="grid lg:grid-cols-2 gap-5">
                        <Field class="col-span-2"
                            :data-invalid="formError?.properties?.address?.properties?.addressLine1?.errors">
                            <FieldLabel htmlFor="street">Address Line 1</FieldLabel>
                            <Input id="street" v-model="worker.form.address.addressLine1" />
                            <FieldError :errors="formError?.properties?.address?.properties?.addressLine1?.errors" />
                        </Field>

                        <Field class="col-span-2"
                            :data-invalid="formError?.properties?.address?.properties?.addressLine2?.errors">
                            <FieldLabel htmlFor="barangay">Address Line 2</FieldLabel>
                            <Input id="barangay" v-model="worker.form.address.addressLine2" />
                            <FieldError :errors="formError?.properties?.address?.properties?.addressLine2?.errors" />
                        </Field>

                        <Field class="col-span-2"
                            :data-invalid="formError?.properties?.address?.properties?.city?.errors">
                            <FieldLabel htmlFor="city">City/Municipality</FieldLabel>
                            <Input id="city" v-model="worker.form.address.city" />
                            <FieldError :errors="formError?.properties?.address?.properties?.city?.errors" />
                        </Field>

                        <Field :data-invalid="formError?.properties?.address?.properties?.province?.errors">
                            <FieldLabel htmlFor="province">Province</FieldLabel>
                            <Input id="province" v-model="worker.form.address.province" />
                            <FieldError :errors="formError?.properties?.address?.properties?.province?.errors" />
                        </Field>

                        <Field :data-invalid="formError?.properties?.address?.properties?.zipCode?.errors">
                            <FieldLabel htmlFor="zipcode">Zip Code</FieldLabel>
                            <Input id="zipcode" v-model="worker.form.address.zipCode" />
                            <FieldError :errors="formError?.properties?.address?.properties?.zipCode?.errors" />
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
                <Button @click="submit()">Submit</Button>
                <br>
                <br>
                <br>
            </div>
        </div>
    </div>

</template>