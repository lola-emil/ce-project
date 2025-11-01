import type { RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric, NavigationGuardNext } from "vue-router";
import { getCurrentUser } from "vuefire";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";


export async function accountSetupGuard(to: RouteLocationNormalizedGeneric, _from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext) {

    const currentUser = await getCurrentUser();

    if (currentUser) {
        const docRef =  doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            next("/dashboard");
        } else {
            next();
        }
    } else {
        next("/auth/sign-up");
    }

}