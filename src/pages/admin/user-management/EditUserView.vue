<script setup lang="ts">
import { db } from '@/firebase';
import type { User } from '@/types/schema';
import { collection, doc } from 'firebase/firestore';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocument } from 'vuefire';

const router = useRouter();
const route = useRoute();

console.log(route.params.id);

const userID = String(route.params.id);
const userRef = doc(db, "users", userID);

const {
    data: user
} = useDocument<User>(userRef, {
    maxRefDepth: 0,
    once: false
}
);


watch(user, (val) => {
    console.log('Firestore doc:', val)
})

</script>

<template>
    <div>This is for editing user {{ user?.name?.firstname }}</div>
</template>