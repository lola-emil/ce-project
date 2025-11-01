import { db, auth } from "@/firebase"
import type { ProfileDetails } from "@/types"
import { doc, getDoc } from "firebase/firestore"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useProfileStore = defineStore('profile', () => {
    const profile = ref<ProfileDetails | null>(null)

    const setProfile = (data: ProfileDetails) => {
        profile.value = data
    }

    const clearProfile = () => {
        profile.value = null
    }

    const fetchUserProfile = async (uid: string) => {
        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            profile.value = docSnap.data() as ProfileDetails
        } else {
            profile.value = null
        }
    }

    const init = () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                await fetchUserProfile(user.uid)
            } else {
                clearProfile()
            }
        });
    }

    return {
        profile,
        setProfile,
        clearProfile,
        fetchUserProfile,
        init,
    }
})