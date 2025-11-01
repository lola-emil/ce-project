import type { ProfileDetails } from "@/types";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAccountSetupStore = defineStore("account-setup", () => {
    const profileDetails = reactive<ProfileDetails>(
        {
            userType: "client",
            firstname: "",
            lastname: "",
            email: "",
            bio: "",
            city: "",
            postal_code: "",
            phone: "",
            province: "",
            tax_id: ""
        }
    )

    const clearDetails = () => {
        Object.keys(profileDetails).forEach((key) => {
            profileDetails[key as keyof ProfileDetails] = key === 'userType' ? "client" : '';
        });
    }

    

    return { profileDetails, clearDetails }
});