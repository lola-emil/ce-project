<template>
    <div class="grid grid-cols-2 h-screen">
        <div class="bg-base-200">
        </div>

        <div class="flex flex-col justify-center items-center">
            <form @submit.prevent="signIn()" class="w-xs flex flex-col gap-5">
                <div>
                    <p class="text-xl font-semibold">Sign In</p>
                    <small class="text-sm text-base-content/75">Enter your account credentials to continue.</small>
                </div>
                <input type="text" v-model="email" class="w-full input" placeholder="Email">
                <button type="submit" class="btn btn-primary" :disabled="isLoading || email.length == 0">
                    <div v-if="isLoading" class="loading loading-sm" />
                    <span>
                        Continue
                    </span>
                </button>
            </form>


            <br>
            <div class="w-xs">
                <div class="divider">OR</div>
            </div>
            <br>

            <div class="w-xs flex flex-col gap-3">
                <button @click="signInWithGoogle()" class="btn btn-secondary btn-soft w-full"
                    :disabled="isLoading">Continue with Google</button>
                <button @click="signInWithFacebook()" class="btn btn-secondary btn-soft w-full"
                    :disabled="isLoading">Continue with Facebook</button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import * as AuthService from "@/services/auth.service";
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useRoute, useRouter } from 'vue-router';

const auth = useFirebaseAuth();
const route = useRoute();
const router = useRouter();

const email = ref<string>("");
const isLoading = ref<boolean>(false);

onMounted(() => {

});

async function signIn() {
    isLoading.value = true;
    const [result, error] = await AuthService.signIn(auth!, email.value, "letmein123");

    if (error) {
        console.log(error.message);
        isLoading.value = false;
        return;
    }

    if (route.query.redirect)
        location.href = String(route.query.redirect);

    isLoading.value = false;
}

async function signInWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    isLoading.value = true;
    const [result, error] = await AuthService.popSignIn(auth!, googleProvider);

    if (error) {
        console.log(error.message);
        isLoading.value = false;
        return;
    }

    isLoading.value = false;
    redirect();
}

async function signInWithFacebook() {
    const facebookProvider = new FacebookAuthProvider();
    isLoading.value = true;
    const [result, error] = await AuthService.popSignIn(auth!, facebookProvider);

    if (error) {
        console.log(error.message);
        isLoading.value = false;
        return;
    }
    isLoading.value = false;
    redirect();
}

function redirect() {
    if (route.query.redirect)
        location.href = String(route.query.redirect);
    else
        location.reload();
}

</script>