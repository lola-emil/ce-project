<script setup lang="ts">
import { ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldLabel, Field, FieldGroup, FieldError } from '@/components/ui/field';
import { useAccountSetup, type AddressForm, type ContactInfoForm, type NameForm } from './composables/accountSetup';
import { treeifyError } from 'zod';
import { useRouter } from 'vue-router';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useCurrentUser } from 'vuefire';

const accountSetup = useAccountSetup();
const router = useRouter();

const user = useCurrentUser();


const stepIndex = ref(1)
const steps = [
    {
        step: 1,
        title: 'Your details',
        description: 'Provide your full name',
    },
    {
        step: 2,
        title: 'Contact Info',
        description: 'Provide your contact info.',
    },
    {
        step: 3,
        title: 'Address',
        description: 'Provide your complete permanent address.',
    },
]

const useRegisteredEmail = ref(false);

watch(useRegisteredEmail, checked => {
    if (checked) {
        accountSetup.contactInfoForm.email = user.value?.email ?? "";
    }
})

const nameError = ref<ReturnType<typeof treeifyError<NameForm>> | undefined>()
const contactInfoError = ref<ReturnType<typeof treeifyError<ContactInfoForm>> | undefined>()
const addressError = ref<ReturnType<typeof treeifyError<AddressForm>> | undefined>()

const nextStep = () => {

    switch (stepIndex.value) {
        case 1:
            const nameValidationResult = accountSetup.validateName();

            if (!nameValidationResult.success) {
                const error = nameValidationResult.result as ReturnType<typeof treeifyError<NameForm>>;
                nameError.value = error;
                return;
            }

            break;
        case 2:
            const contactInfoValidation = accountSetup.validateContactInfo();

            if (!contactInfoValidation.success) {
                const error = contactInfoValidation.result as ReturnType<typeof treeifyError<ContactInfoForm>>;
                contactInfoError.value = error;
                return;
            }
            break;
        default:

            break;
    }

    nameError.value = undefined;
    contactInfoError.value = undefined;
    addressError.value = undefined;


    if (stepIndex.value < steps.length) {
        stepIndex.value += 1;
    }
};
const prevStep = () => stepIndex.value > 1 ? stepIndex.value -= 1 : stepIndex.value;

async function onSubmit() {
    const addressValidation = accountSetup.validateAddress();
    if (!addressValidation.success) {
        const error = addressValidation.result as ReturnType<typeof treeifyError<AddressForm>>;
        addressError.value = error;
        return;
    }

    try {
        await accountSetup.setUpAccount();

        // Redirect to success page
        router.replace("/success")
        // const options: Intl.DateTimeFormatOptions = {
        //     weekday: 'long',
        //     year: 'numeric',
        //     month: 'long',
        //     day: '2-digit',
        //     hour: '2-digit',
        //     minute: '2-digit',
        //     hour12: true,
        // };

        // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());

        // toast('Event has been created', {
        //     description: formattedDate,
        // });


    } catch (error) {
        console.error("Error from setup accout: ", error);
    }
}
</script>

<template>

    <div class="w-full h-screen flex flex-col items-center">
        <div class="w-md mt-40">
            <h3 class="text-3xl">Accout Set Up</h3>

        </div>
        <div class="flex flex-col gap-4 mt-4 w-md">
            <section v-if="stepIndex === 1">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                        <Input type="text" id="firstname" v-model="accountSetup.nameForm.firstname"/>
                        <FieldError>{{ nameError?.properties?.firstname?.errors[0] }}</FieldError>
                    </Field>

                    <Field name="fullName">
                        <FieldLabel>Middle Name <span class="text-muted-foreground">(Optional)</span></FieldLabel>
                        <Input type="text" v-model="accountSetup.nameForm.middlename" />
                        <FieldError>{{ nameError?.properties?.middlename?.errors[0] }}</FieldError>
                    </Field>

                    <Field name="fullName">
                        <FieldLabel>Last Name</FieldLabel>
                        <Input type="text" v-model="accountSetup.nameForm.lastname" />
                        <FieldError>{{ nameError?.properties?.lastname?.errors[0] }}</FieldError>
                    </Field>

                    <Field name="fullName">
                        <FieldLabel>Suffix <span class="text-muted-foreground">(Optional)</span></FieldLabel>
                        <Input type="text" placeholder="e.g. Jr., Sr." />

                        <FieldError>{{ nameError?.properties?.suffix?.errors[0] }}</FieldError>
                    </Field>
                </FieldGroup>
            </section>

            <section v-if="stepIndex === 2">
                <FieldGroup>
                    <Field name="fullName">
                        <FieldLabel>Phone Number</FieldLabel>
                        <Input type="text" v-model="accountSetup.contactInfoForm.phoneNumber" />
                        <FieldError>{{ contactInfoError?.properties?.phoneNumber?.errors[0] }}</FieldError>
                    </Field>

                    <Field name="fullName">
                        <FieldLabel>Email</FieldLabel>
                        <Input type="text" v-model="accountSetup.contactInfoForm.email" :disabled="useRegisteredEmail"/>
                        <div class="w-full flex gap-3">
                            <Switch id="airplane-mode" v-model="useRegisteredEmail"/>
                            <Label for="airplane-mode">Use registered email</Label>
                        </div>
                        <FieldError>{{ contactInfoError?.properties?.email?.errors[0] }}</FieldError>
                    </Field>

                </FieldGroup>
            </section>

            <section v-if="stepIndex === 3">
                <FieldGroup>
                    <Field name="fullName">
                        <FieldLabel>Address Line 1</FieldLabel>
                        <Input type="text" v-model="accountSetup.addressForm.addressLine1" />
                        <FieldError>{{ addressError?.properties?.addressLine1?.errors[0] }}</FieldError>
                    </Field>

                    <Field name="fullName">
                        <FieldLabel>Address Line 2 <span class="text-muted-foreground">(optional)</span></FieldLabel>
                        <Input type="text" v-model="accountSetup.addressForm.addressLine2" />
                        <FieldError>{{ addressError?.properties?.addressLine2?.errors[0] }}</FieldError>
                    </Field>

                    <Field name="fullName">
                        <FieldLabel>City/Municipality </FieldLabel>
                        <Input type="text" v-model="accountSetup.addressForm.city" />
                        <FieldError>{{ addressError?.properties?.city?.errors[0] }}</FieldError>
                    </Field>

                    <Field name="fullName">
                        <FieldLabel>Province </FieldLabel>
                        <Input type="text" v-model="accountSetup.addressForm.province" />
                        <FieldError>{{ addressError?.properties?.province?.errors[0] }}</FieldError>
                    </Field>

                    <Field name="fullName">
                        <FieldLabel>Zip Code</FieldLabel>
                        <Input type="text" v-model="accountSetup.addressForm.zipCode" />
                        <FieldError>{{ addressError?.properties?.zipCode?.errors[0] }}</FieldError>
                    </Field>

                </FieldGroup>
            </section>


            <div class="flex items-center justify-between mt-4 w-md">
                <Button variant="outline" size="sm" @click="prevStep()">
                    Back
                </Button>
                <div class="flex items-center gap-3">
                    <Button v-if="stepIndex !== 3" type="button" size="sm" @click="nextStep()">
                        Next
                    </Button>
                    <Button v-if="stepIndex === 3" size="sm" @click="onSubmit()">
                        Submit
                    </Button>
                </div>
            </div>
        </div>

    </div>
</template>
