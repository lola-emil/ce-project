<script setup lang="ts">
import { functions } from '@/firebase';
import { httpsCallable } from "firebase/functions";
import { onMounted } from 'vue';
import { Button } from '@/components/ui/button';



const call = async () => {
    const onSendMail = httpsCallable(functions, "onSendMail");

    const result = await onSendMail();
    console.log(result.data);
}


</script>

<template>
    <h1>Cloud function testing</h1>

    <Button @click="call()">SayHello</Button>
</template>