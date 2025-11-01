<template>
    <div class="grid grid-cols-10">
        <div class="col-span-3 bg-primary h-screen shadow-primary-content shadow">
            <img src="/abstract.jpeg" alt="" class="w-full h-full object-cover">
        </div>
        <div class="col-span-7">
            <div class="grid grid-cols-1 h-screen relative">
                <div class="absolute top-5 left-5">
                    <RouterLink to="/" class="link">Back to Home</RouterLink>
                </div>

                <div class="flex flex-col justify-center items-center">

                    <div class="w-xs flex flex-col ">
                        <div>
                            <p class="text-xl font-semibold">Create an account</p>
                            <small class="text-sm text-base-content/75">Enter your email and preferred password to
                                continue.</small>
                        </div>

                        <form @submit.prevent="signUp()" class="mt-5">

                            <fieldset class="fieldset">
                                <legend class="fieldset-legend">Email</legend>
                                <input @input="validateEmail" v-model="credentials.email" type="text" class="input"
                                    :class="{
                                        'input-error': !!errors.email
                                    }" :disabled="isLoading" />
                                <p class="label text-error">{{ errors.email }}</p>
                            </fieldset>

                            <fieldset class="fieldset">
                                <legend class="fieldset-legend">Password</legend>
                                <input @blur="validatePassword" v-model="credentials.password" type="password"
                                    class="input" :class="{
                                        'input-error': !!errors.password
                                    }" :disabled="isLoading" />
                                <p class="label text-error">{{ errors.password }}</p>
                            </fieldset>

                            <fieldset class="fieldset">
                                <legend class="fieldset-legend">Confirm Password</legend>
                                <input @input="confirmPassword" v-model="credentials.confirmPassword" type="password"
                                    class="input" :class="{
                                        'input-error': !!errors.confirmPassword
                                    }" :disabled="isLoading" />
                                <p class="label text-error">{{ errors.confirmPassword }}</p>
                            </fieldset>

                            <div class="w-xs mt-3">
                                <button type="submit" class="btn btn-primary w-full" :disabled="disableSubmit()">
                                    <div class="loading loading-xs" v-if="isLoading"></div>
                                    SignUp
                                </button>
                            </div>
                        </form>


                        <div class="w-xs mt-5">
                            <p class="">
                                Don't have an account?
                                <RouterLink to="/auth/sign-in" class="link link-primary">Sign In</RouterLink>
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>

</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { reactive, ref } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import * as AuthService from "@/services/auth.service";

const auth = useFirebaseAuth();

const errors = reactive({
    email: "",
    password: "",
    confirmPassword: ""
});

const isLoading = ref<boolean>(false);

const credentials = reactive({
    email: "",
    password: "",
    confirmPassword: ""
});


const validateEmail = () => {
    errors.email = "";

    if (credentials.email == "")
        return errors.email = "Email is required.";


}

const validatePassword = () => {
    errors.password = "";
    if (credentials.password == "")
        return errors.password = "Password is required";

}

const confirmPassword = () => {
    errors.confirmPassword = "";
    if (credentials.password !== credentials.confirmPassword)
        return errors.confirmPassword = "Password doesn't match";
}

const disableSubmit = () => {
    if (!!errors.email || !!errors.password || !!errors.confirmPassword)
        return true;

    if (!credentials.email || !credentials.password || !credentials.confirmPassword)
        return true;

    if (isLoading.value)
        return true;

    return false;
}

const signUp = async () => {
    isLoading.value = true;

    const [success, error] = await AuthService.signUpWithEmailAndPassword(auth!, credentials.email, credentials.password);

    if (success) {
        location.href = "/setup-account";
    }

    if (error) {
        isLoading.value = false;
        console.log(error.code == "/auth/email-already-in-use");

        switch (error.code) {
            case 'auth/email-already-in-use':
                errors.email = 'This email is already registered.'
                break
            case 'auth/invalid-email':
                errors.email = 'The email address is not valid.'
                break
            case 'auth/weak-password':
                errors.password = 'Password should be at least 6 characters.'
                break
            default:
                alert('Signup failed: ' + error.message);
        }

        errors.email
    }
}


</script>