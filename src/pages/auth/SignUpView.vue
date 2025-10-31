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
                <!-- <div class="bg-base-200">
        </div> -->

                <div class="flex flex-col justify-center items-center">
                    <SetupAccountType />
                    <!-- <SetupName/> -->
                    <!-- <SetupCredentials/> -->

                    <!-- <br>
            <br>
            <br>
            <br>
            <ul class="steps w-xl">
                <li class="step step-primary">Set Account Type</li>
                <li class="step">Name Setup</li>
                <li class="step">Credentials</li>
            </ul> -->
                </div>

            </div>
        </div>
    </div>

</template>


<script setup lang="ts">
import SetupAccountType from './components/SetupAccountType.vue';
import { RouterLink } from 'vue-router';
import SetupCredentials from './components/SetupCredentials.vue';
import SetupName from './components/SetupName.vue';

import Navbar from '@/components/ui/Navbar.vue';

</script>