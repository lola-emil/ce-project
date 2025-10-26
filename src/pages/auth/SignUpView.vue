<template>

    <div class="grid grid-cols-1 h-screen">
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

</template>


<script setup lang="ts">
import SetupAccountType from './components/SetupAccountType.vue';
import SetupCredentials from './components/SetupCredentials.vue';
import SetupName from './components/SetupName.vue';
</script>