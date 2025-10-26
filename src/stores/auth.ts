import { defineStore } from "pinia";
import { ref } from "vue";


export const useAuthStore = defineStore("auth", () => {
    const isLoggedIn = ref<boolean>(true);
    const userType = ref<"client" | "worker">("worker");


    return { isLoggedIn, userType } 
});
