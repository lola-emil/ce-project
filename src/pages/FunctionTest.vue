<script setup lang="ts">
import { functions } from '@/firebase';
import { httpsCallable } from "firebase/functions";
import { onMounted } from 'vue';


const callFunction = async () => {
    const addMessage = httpsCallable(functions, "addMessage");

    const result = await addMessage({
    name: "John",
    text: "Hello from Vue!"
  });

    console.log(result);
}

onMounted(() => {
    callFunction();
})

</script>

<template>
    <h1>Cloud function testing</h1>
</template>