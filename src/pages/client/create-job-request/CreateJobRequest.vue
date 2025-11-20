<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-5">
            <Button variant="link" size="sm" as-child>
                <RouterLink to="my-jobs">
                    <ArrowLeft />
                    Go back
                </RouterLink>
            </Button>
        </div>
        <div class="mt-5">
            <h3 class="text-2xl">Create Job Request</h3>
            <p class="text-muted-foreground">Provide Information to Initiate Your Job Request</p>
        </div>

        <div class="mt-5">
            <form @submit.prevent="submit()">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="job-title">Job Title</FieldLabel>
                        <Input id="job-title" type="text" />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea id="description" class="h-40"></Textarea>
                    </Field>
                </FieldGroup>
                <br>
                <br>

                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="job-title">Attach image</FieldLabel>
                        <Input id="job-title" type="file" />
                    </Field>
                </FieldGroup>

                <br>
                <br>
                <FieldGroup>
                    <FieldLabel>Address</FieldLabel>
                    <div class="grid lg:grid-cols-3 gap-5">
                        <Field>
                            <FieldLabel htmlFor="street">Street</FieldLabel>
                            <Input id="street" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="barangay">Barangay</FieldLabel>
                            <Input id="barangay" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="city">City/Municipality</FieldLabel>
                            <Input id="city" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="province">Province</FieldLabel>
                            <Input id="province" />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="zipcode">Zip Code</FieldLabel>
                            <Input id="zipcode" />
                        </Field>
                    </div>
                </FieldGroup>
                <br>
                <br>
                <Button>Submit</Button>
                <br>
                <br>
                <br>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ArrowLeft } from "lucide-vue-next";
import { FieldGroup, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';



function submit() {

}
</script>
