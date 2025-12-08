<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from 'vuefire';
import { getAuth, updatePassword } from 'firebase/auth';
import { reactive, ref } from 'vue';
import z, { treeifyError, ZodError } from 'zod';
import { validate } from 'vee-validate';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';


const passwordSchema = z.object({
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(64, "Password must be at most 64 characters"),
    confirmPassword: z.string()
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"], // error will be attached to confirmPassword field
        message: "Passwords do not match"
    });

const router = useRouter();

const user = useCurrentUser();
const errors = ref<ReturnType<typeof treeifyError<{
    password: string;
    confirmPassword: string;
}>> | undefined>()

const form = reactive<{
    password: string,
    confirmPassword: string
}>({
    password: "",
    confirmPassword: ""
});


const onSave = async () => {
    try {
        const validated = z.parse(passwordSchema, form);

        await updatePassword(user.value!, validated.password);

        const userRef = doc(db, "users", user.value!.uid);
        await updateDoc(userRef, {
            passwordIsTemp: false
        });

        toast.success("Password changed");

        router.push("/dashboard");
    } catch (error) {
        if (error instanceof ZodError) {
            // Validation errors
            console.error("Validation error:", z.treeifyError(error));
            errors.value = z.treeifyError(error);

        } else if ((error as any).code) {
            // Firebase Auth errors
            console.error("Firebase Auth error:", (error as any).code, (error as any).message);
            toast.error((error as any).message);
        } else {
            // Other errors (e.g., Firestore)
            console.error("Unexpected error:", error);
            toast.error("Unexpected error");
        }
    }
}

</script>

<template>
    <div class="container mx-auto h-screen flex justify-center items-center">
        <div class="w-sm">
            <p class="font-bold">Change your password</p>
            <br>
            <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" v-model="form.password" type="password" />
                <FieldError :errors="errors?.properties?.password?.errors"/>
            </Field>
            <br>
            <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input id="confirmPassword" type="password" v-model="form.confirmPassword"/>
                <FieldError :errors="errors?.properties?.confirmPassword?.errors"/>
            </Field>
            <br>
            <Button class="w-full" @click="onSave">Save changes</Button>
        </div>
    </div>
</template>