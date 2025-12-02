<script setup lang="ts">
import { db } from '@/firebase';
import type { User } from '@/types/schema';
import { doc } from 'firebase/firestore';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDocument } from 'vuefire';

const route = useRoute();

const userRef = doc(db, "users", String(route.params.id));
const {
    data: user
} = useDocument<User>(userRef);

watch(user, () => {
    console.log("User fucking data", user.value);
});

</script>

<template>
    <div class="grid grid-cols-4">
        <!-- Profile picture -->
        <div class="col-span-1">
            <img src="" alt="">
        </div>

        <div class="col-span-3">
            <div>
                <div>{{ user?.name?.firstname }} {{ user?.name?.middlename }} {{ user?.name?.lastname }}</div>
                <div>
                    {{ user?.address[0]?.addressLine1 }},
                    {{ user?.address[0]?.addressLine2 }}
                    {{ user?.address[0]?.city }},
                    {{ user?.address[0]?.province }},
                </div>
            </div>

            <div>
                contact info

                <div>
                    {{ user?.contactInfo?.email }}
                    {{ user?.contactInfo?.phone_number }}
                </div>
            </div>
        </div>
    </div>
</template>