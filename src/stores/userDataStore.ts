import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";
import { getCurrentUser } from "vuefire";
import { type User as UserData } from "@/models/user.model";


export const useUserDataStore = defineStore("userData", () => {
    const userData = ref<UserData | undefined>();

    const getUserData = async () => {
        if (userData.value)
            return userData.value;

        const currentUser = await getCurrentUser();

        if (!currentUser)
            return null;

        try {
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                userData.value = userDocSnap.data() as UserData;
                return userData.value;
            } else {
                console.warn(`No userData found for uid: ${currentUser.uid}`)
                return null;
            }
        } catch (error) {

        }
    }
    return {
        getUserData
    }
});