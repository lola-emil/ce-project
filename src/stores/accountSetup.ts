import { defineStore } from "pinia";
import { ref } from "vue";

export const accountSetupStore = defineStore("account-setup", () => {
    const accountType = ref<"client" | "worker" | null>(null);

    const firstname = ref<string | null>(null);
    const lastname = ref<string | null>(null);

    // credentials
    const email = ref<string | null>(null);
    const password = ref<string | null>(null);

    return { accountType, firstname, lastname, email, password }
});