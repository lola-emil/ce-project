import { db } from "@/firebase";
import type { ProfileDetails } from "@/types";
import type { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, type Auth, type User, type UserCredential } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";


type AuthResult = [UserCredential | null, FirebaseError | null];

export async function signIn(auth: Auth, email: string, password: string): Promise<AuthResult> {
    try {
        const result = await signInWithEmailAndPassword(auth!, email, password);
        return [result, null];
    } catch (error) {
        const fireError = error as FirebaseError;
        return [null, fireError];
    }
}

export async function popSignIn(auth: Auth, provider: GoogleAuthProvider | FacebookAuthProvider): Promise<AuthResult> {
    try {
        const result = await signInWithPopup(auth, provider);
        return [result, null];
    }
    catch (error) {
        const fireError = error as FirebaseError;
        return [null, fireError];
    }
}


export async function signUpWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<[UserCredential | null, FirebaseError | null]> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        return [userCredential, null];
    } catch (error) {
        const fireError = error as FirebaseError;
        return [null, fireError];
    }
}

export async function setAccountDetails(user: User, profileDetails: Partial<ProfileDetails>): Promise<[boolean, FirebaseError | null]> {
    try {
        await updateProfile(user, {displayName: `${profileDetails.firstname} ${profileDetails.lastname}`})

        await setDoc(doc(db, 'users', user.uid), {
            userType: profileDetails.userType,
            firstname: profileDetails.firstname,
            lastname: profileDetails.lastname,
            email: profileDetails.email,
            bio: profileDetails.bio,

            province: profileDetails.province,
            city: profileDetails.city,
            postal_code: profileDetails.postal_code,
            tax_id: profileDetails.tax_id
        });

        return [true, null];
    } catch (error) {
        const fireError = error as FirebaseError;
        return [false, fireError];
    }
}
