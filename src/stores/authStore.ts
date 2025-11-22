
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { User as UserData } from "@/types/schema";
import { doc, getDoc } from "firebase/firestore";


export const useAuthStore = defineStore("auth", () => {
    const user = ref<User | null>(null);
    const userData = ref<UserData | undefined>();

    const isAuthenticated = () => !!user;

    // Pwede ma set ang user para sa inig mahuman ang registration
    const setUser = (userDetail: User | null) => user.value = userDetail;

    const loginWithEmailPassword = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);

            // Fetch ang user profile
            const userDocRef = doc(db, "users", userCredential.user.uid);
            const userDocSnap = await getDoc(userDocRef);

            userData.value = userDocSnap.data() as UserData | undefined;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
    
    const logOut = async () => {
        await signOut(auth);
        user.value = null;
    }

    return {
        isAuthenticated,
        setUser,
        logOut,
        loginWithEmailPassword,

        user,
    }
});