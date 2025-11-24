
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { User as UserData } from "@/types/schema";
import { doc, getDoc } from "firebase/firestore";
import { useCurrentUser } from "vuefire";



export const useAuthStore = defineStore("auth", () => {
    const userData = ref<UserData | null>(null);
    const user = useCurrentUser(); // ref<User | null>

    const isAuthenticated = () => !!user.value;

    const logOut = async () => {
        await signOut(auth);
        user.value = null;
    };

    const fetchUserData = async () => {
        if (!user.value) {
            userData.value = null;
            return;
        }

        const userDocRef = doc(db, "users", user.value.uid);
        const userDoc = await getDoc(userDocRef);

        userData.value = userDoc.exists()
            ? (userDoc.data() as UserData)
            : null;
    };

    watch(
        user,
        async () => {
            await fetchUserData();
        },
        { immediate: true }
    );

    return {
        isAuthenticated,
        logOut,
        user,
        userData
    };
});
