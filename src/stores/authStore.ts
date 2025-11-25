
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { User as UserData } from "@/types/schema";
import { doc, getDoc } from "firebase/firestore";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { useRouter } from "vue-router";



export const useAuthStore = defineStore("auth", () => {
    const user = useCurrentUser(); // ref<User | null>
    const firebaseAuth = useFirebaseAuth();
    const userData = ref<UserData | null>(null);
    const router = useRouter();

    const isAuthenticated = () => !!user.value;

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

    const setUserData = (newData: UserData | null) => userData.value = newData;

    const loginWithEmailPassword = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Fetch ang user profile
            const userDocRef = doc(db, "users", userCredential.user.uid);
            const userDocSnap = await getDoc(userDocRef);

            userData.value = userDocSnap.data() as UserData | null;

            console.log("Kanang Kuan", userData.value);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    const logout = async () => {
        await firebaseAuth?.signOut();
        user.value = null;
        router.push("/login");
    }


    watch(
        user,
        async () => {
            await fetchUserData();
        },
        { immediate: true }
    );

    return {
        isAuthenticated,
        loginWithEmailPassword,
        setUserData,
        logout,

        user,
        userData
    };
}, {
    persist: true
});
