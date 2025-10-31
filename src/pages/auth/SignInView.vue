<template>

    <div class="grid grid-cols-10">
        <div class="col-span-3 bg-primary h-screen shadow-primary-content shadow">
            <img src="/abstract.jpeg" alt="" class="w-full h-full object-cover">
        </div>
        <div class="col-span-7">
            <div class="grid grid-cols-1 h-screen relative">
                <!-- <div class="bg-base-200">
                </div> -->

                <div class="absolute top-5 left-5">
                    <RouterLink to="/" class="link">Back to Home</RouterLink>
                </div>

                <div class="flex flex-col justify-center items-center">
                    <form @submit.prevent="signIn()" class="w-xs flex flex-col gap-5">
                        <div>
                            <p class="text-xl font-semibold">Sign In</p>
                            <small class="text-sm text-base-content/75">Enter your credentials to continue.</small>
                        </div>
                        <input type="text" v-model="email" class="w-full input" placeholder="Email">
                        <input type="password" v-model="password" class="w-full input" placeholder="Password">
                        <button type="submit" class="btn btn-primary" :disabled="isLoading || email.length == 0">
                            <div v-if="isLoading" class="loading loading-xs" />
                            <span>
                                Sign In
                            </span>
                        </button>
                    </form>

                    <div class="w-xs mt-5">
                        <p class="">
                            Don't have an account?
                            <RouterLink to="/auth/sign-up" class="link link-primary">Sign Up</RouterLink>
                        </p>
                    </div>

                    <div class="w-xs my-5">
                        <div class="divider text-sm">OR</div>
                    </div>

                    <div class="w-xs flex flex-col gap-3">

                        <!-- Google -->
                        <button @click="signInWithGoogle()" class="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <g>
                                    <path d="m0 0H512V512H0" fill="#fff"></path>
                                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341">
                                    </path>
                                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55">
                                    </path>
                                </g>
                            </svg>
                            Login with Google
                        </button>

                        <!-- Facebook -->
                        <button @click="signInWithFacebook()" class="btn bg-[#1A77F2] text-white border-[#005fd8]">
                            <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32">
                                <path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z">
                                </path>
                            </svg>
                            Login with Facebook
                        </button>
                    </div>
                </div>
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
const password = ref<string>("");

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

    isLoading.value = false;
    redirect();
}

async function signInWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    const [result, error] = await AuthService.popSignIn(auth!, googleProvider);

    if (error) {
        console.log(error.message);
        return;
    }

    redirect();
}

async function signInWithFacebook() {
    const facebookProvider = new FacebookAuthProvider();
    const [result, error] = await AuthService.popSignIn(auth!, facebookProvider);

    if (error) {
        return;
    }
    redirect();
}

function redirect() {
    // location.href = String(route.query.redirect);
    if (route.query.redirect)
        router.push(String(route.query.redirect));
    else
        router.push("/dashboard");
}

</script>