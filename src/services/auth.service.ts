import type { FirebaseError } from "firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, type Auth, type UserCredential } from "firebase/auth";


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