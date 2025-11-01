import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import type { ProfileDetails } from "@/types";


export async function getProfileByUID(uid: string): Promise<ProfileDetails | null> {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as ProfileDetails
    } else {
        return null
    }
}