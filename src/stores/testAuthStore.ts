import { db } from "@/firebase";
import type { User as UserData } from "@/types/schema";
import { doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCurrentUser } from "vuefire";


export const useAuthStore = defineStore("testAuth", () => {
    const user = useCurrentUser();    
    const userData = ref<UserData | null | undefined>();

    const getUserData = async () => {
        if (!user.value) {
            userData.value = null;
            return;
        }

        const userDocRef = doc(db, "users", user.value.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            userData.value = userDoc.data() as UserData;
        } else {
            console.warn("Walay user data ang user");
            userData.value = null;
        }

        return userData.value;
    }


    return {
        getUserData,
        user,
        userData
    }
})