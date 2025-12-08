<script setup lang="ts">
import { db } from '@/firebase';
import type { Rating, User } from '@/types/schema';
import { doc, updateDoc } from 'firebase/firestore';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCurrentUser, useDocument } from 'vuefire';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, SquarePen } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import z, { treeifyError, ZodError } from 'zod';

const route = useRoute();
const router = useRouter();

const userRef = doc(db, "users", String(route.params.id));
const {
    data: user
} = useDocument<User>(userRef);

watch(
    () => user.value,
    (val) => {
        if (val) {
            userForm.value = { ...val }; // shallow copy is enough
        }
    }
);

const userForm = ref<User | null>(null);
const currentUser = useCurrentUser();


const ratings = ref<Rating[]>([]);
const averageRating = computed(() => {
    if (!ratings.value.length) return 0;

    const sum = ratings.value.reduce((total, r) => total + r.rate, 0);
    return sum / ratings.value.length;
});

onMounted(async () => {
    ratings.value = user.value?.ratings ?? [];
});

const allowedEdit = computed(() => {
    return user.value?.uid == String(route.params.id)
});

const editingPersonalDetail = ref(false);
const editingAddress = ref(false);

const savePersonalDetail = async () => {
    await updateDoc(userRef, {
        name: userForm.value?.name
    });

    toast.success("Successfully updated profile.", {
        onAutoClose: () => {
            location.reload();
        },
        duration: 1000
    });
}

const saveAddress = async () => {
    const currentAddress = user.value?.address;
    currentAddress?.unshift({
        addressLine1: userForm.value?.address[0]?.addressLine1 ?? "",
        addressLine2: userForm.value?.address[0]?.addressLine2,
        city: String(userForm.value?.address[0]?.city),
        province: String(userForm.value?.address[0]?.province),
        zipCode: String(userForm.value?.address[0]?.zipCode),
    });
    currentAddress?.pop();

    console.log({ currentAddress, address: userForm.value?.address });
    await updateDoc(userRef, {
        address: currentAddress
    });

    toast.success("Successfully updated address.", {
        onAutoClose: () => {
            location.reload();
        },
        duration: 1000
    });
}


const passwordSchema = z.object({
    currentPassword: z.string().nonoptional(),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(64, "Password must be at most 64 characters"),
    confirmPassword: z.string()
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"], // error will be attached to confirmPassword field
        message: "Passwords do not match"
    });

const form = reactive<{
    currentPassword: string,
    password: string,
    confirmPassword: string
}>({
    currentPassword: "",
    password: "",
    confirmPassword: ""
});

const errors = ref<ReturnType<typeof treeifyError<{
    currentPassword: string;
    password: string;
    confirmPassword: string;
}>> | undefined>()

const onSavePassword = async () => {

    // Clear old errors
    errors.value = undefined;

    // 1. Zod validation (no try/catch needed)
    const result = passwordSchema.safeParse(form);

    if (!result.success) {
        errors.value = z.treeifyError(result.error);
        return; // stop here, do NOT call firebase
    }

    const validated = result.data;


    try {
        // 2. Reauth with current password
        const user = currentUser.value!;

        const credential = EmailAuthProvider.credential(
            user.email!,
            validated.currentPassword
        );

        await reauthenticateWithCredential(user, credential);

        // 3. Update password
        await updatePassword(user, validated.password);

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { passwordIsTemp: false });

        toast.success("Password changed!");
        router.push("/dashboard");
    } catch (error) {
        if (error instanceof ZodError) {
            // Validation errors
            console.error("Validation error:", z.treeifyError(error));
            errors.value = z.treeifyError(error);

        } else if ((error as any).code === "auth/wrong-password") {
            toast.error("Entered the wrong password");
            // errors.value!.properties?.confirmPassword?.errors.push('Current password is incorrect');
            return;
        } else {
            // Other errors (e.g., Firestore)
            console.error("Unexpected error:", error);
            toast.error("Unexpected error");
        }
    }
}

const canUpdatePassword = computed(() => {
    const providerIds = currentUser.value?.providerData.map(p => p.providerId);
    return providerIds?.includes("password");
})
</script>

<template>
    <div class="container mx-auto">
        <Button variant="link" class="mt-10" @click="router.push('/')">
            <ArrowLeft /> Go back
        </Button>
        <div class="mt-10">
            <div>
                <p class="text-2xl font-bold">{{ user?.name?.firstname }} {{ user?.name?.lastname }}</p>
                <p>{{ user?.role }}</p>
                <br>
                <div v-if="user?.role == 'worker'" class="flex items-center gap-3">
                    <span>Rating:</span>
                    <span v-if="averageRating" class="text-primary">
                        {{ averageRating }}
                    </span>
                    <span v-else class="text-primary">
                        No ratings yet.
                    </span>
                </div>
            </div>
            <Separator class="my-10" />
            <Card>
                <CardHeader>
                    <div class="flex justify-between">
                        <CardTitle>Personal Details</CardTitle>
                        <Button v-if="!editingPersonalDetail && allowedEdit" size="sm" variant="link"
                            @click="() => editingPersonalDetail = true">
                            <SquarePen />
                            Edit
                        </Button>
                        <Button v-if="editingPersonalDetail" size="sm" @click="savePersonalDetail">Save</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="grid grid-cols-2 gap-5">
                        <Field>
                            <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                            <Input id="firstname" v-model="userForm!.name!.firstname"
                                :disabled="!editingPersonalDetail" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="middlename">Middle Name</FieldLabel>
                            <Input id="middlename" v-model="userForm!.name!.middlename" name="middlename"
                                :disabled="!editingPersonalDetail" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                            <Input id="lastname" v-model="userForm!.name!.lastname"
                                :disabled="!editingPersonalDetail" />
                            <FieldError />
                        </Field>
                    </div>
                </CardContent>
            </Card>

            <br>

            <Card>
                <CardHeader>
                    <div class="flex justify-between">
                        <CardTitle>Address</CardTitle>
                        <Button v-if="!editingAddress && allowedEdit" size="sm" variant="link"
                            @click="() => editingAddress = true">
                            <SquarePen />
                            Edit
                        </Button>
                        <Button size="sm" v-if="editingAddress" @click="saveAddress">Save</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="grid grid-cols-2 gap-5">
                        <Field>
                            <FieldLabel htmlFor="addressline1">Address Line 1</FieldLabel>
                            <Input id="addressline1" v-model="userForm!.address[0]!.addressLine1"
                                :disabled="!editingAddress" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="addressline2">Address Line 2</FieldLabel>
                            <Input id="addressline2" name="" v-model="userForm!.address[0]!.addressLine2"
                                :disabled="!editingAddress" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="city">City/Municipality</FieldLabel>
                            <Input id="city" v-model="userForm!.address[0]!.city" :disabled="!editingAddress" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="lastname">Province</FieldLabel>
                            <Input id="lastname" v-model="userForm!.address[0]!.province" :disabled="!editingAddress" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="lastname">Zip Code</FieldLabel>
                            <Input id="lastname" v-model="userForm!.address[0]!.zipCode" :disabled="!editingAddress" />
                            <FieldError />
                        </Field>
                    </div>
                </CardContent>
            </Card>

            <br>

            <Card v-if="allowedEdit && canUpdatePassword">
                <CardHeader>
                    <div class="flex justify-between">
                        <CardTitle>Update password</CardTitle>
                        <Button size="sm" @click="onSavePassword">Update</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Field>
                        <FieldLabel htmlFor="password">Current Password</FieldLabel>
                        <Input id="password" v-model="form.currentPassword" type="password" />
                        <FieldError :errors="errors?.properties?.currentPassword?.errors" />
                    </Field>
                    <br>
                    <Field>
                        <FieldLabel htmlFor="password">New Password</FieldLabel>
                        <Input id="password" v-model="form.password" type="password" />
                        <FieldError :errors="errors?.properties?.password?.errors" />
                    </Field>
                    <br>
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <Input id="confirmPassword" type="password" v-model="form.confirmPassword" />
                        <FieldError :errors="errors?.properties?.confirmPassword?.errors" />
                    </Field>

                </CardContent>
            </Card>
        </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
</template>