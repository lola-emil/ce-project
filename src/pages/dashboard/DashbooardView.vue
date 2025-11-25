<script setup lang="ts">
import { useUserDataStore } from '@/stores/userDataStore';
import { type UserRole } from '@/models/user.model';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const mapOfDashboardPages: Record<UserRole | "default", any> = {
    admin: defineAsyncComponent(() => import("./components/AdminDashboard.vue")),
    worker: defineAsyncComponent(() => import("./components/WorkerDashboard.vue")),
    client: defineAsyncComponent(() => import("./components/ClientDashboard.vue")),
    default: defineAsyncComponent(() => import("./components/DefaultView.vue"))
}

// const userDataStore = useUserDataStore();
const authStore = useAuthStore();

const role = ref<UserRole | undefined>();

const DashboardContent = computed(() => mapOfDashboardPages[role.value ?? "default"])

onMounted(async () => {
    role.value = authStore.userData?.role;
})
</script>

<template>
    <component :is="DashboardContent"/>
</template>