<template>
    <form @submit.prevent="setAccountType()" class="w-xs flex flex-col gap-5">
        <div>
            <p class="text-xl font-semibold">Which account type you want to create?</p>
        </div>

        <label for="client" class="flex items-center gap-5">
            <input type="radio" v-model="accountType" id="client" value="client" class="radio radio-xs">
            <p>Contractor</p>
        </label>

        <label for="worker" class="flex items-center gap-5">
            <input type="radio" v-model="accountType" id="worker" value="worker" class="radio radio-xs">
            <p>Worker</p>
        </label>
        <button type="submit" class="btn btn-primary" :disabled="!accountType">Next</button>
    </form>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';


const accountType = ref<"client" | "worker" | null>(null);


async function setAccountType() {
    console.log(accountType.value);
    next();
}

async function next() {
    emit("onNext");
}

const emit = defineEmits<{
    onNext: []
}>()

</script>
