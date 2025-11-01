import type { NavigationGuardNext, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric } from "vue-router";
import { getCurrentUser } from "vuefire";


export async function authGuard(to: RouteLocationNormalizedGeneric, _: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext) {

    const currentUser = await getCurrentUser();

    if ((to.fullPath == "/auth/sign-in" || to.fullPath == "/" || to.fullPath == "/auth/sign-up") && !!currentUser)
        next("/dashboard");
    else if (to.meta.requiresAuth && !currentUser)
        next({
            path: "/auth/sign-in",
            query: { redirect: to.fullPath }
        });
    else
        next();
}