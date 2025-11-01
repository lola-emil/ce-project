<template>
    <nav class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="-1"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a>Item 1</a></li>
                    <li>
                        <a>Parent</a>
                        <ul class="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <RouterLink to="/" class="btn btn-ghost text-xl">Prodigify</RouterLink>

            <ul v-if="!user" class="menu menu-horizontal px-1">
                <li v-for="value in menuList">
                    <details v-if="value.children">
                        <summary>{{ value.label }}</summary>
                        <ul>
                            <li v-for="child in value.children">
                                <RouterLink :to="child.path ?? ''">{{ child.label }}</RouterLink>
                            </li>
                        </ul>
                    </details>
                    <RouterLink :to="value.path ?? ''">{{ value.label }}</RouterLink>
                </li>
            </ul>
        </div>

        <div v-if="!!user" class="navbar-end gap-5">
            <!-- GLOBAL SEARCH -->
            <!-- <input type="text" class="input input-sm w-sm outline-none" placeholder="Search"> -->

            <RouterLink to="/messages" class="btn btn-ghost btn-circle">
                <MessageCircle :size="20" />
            </RouterLink>

            <button class="btn btn-ghost btn-circle">
                <Bell :size="20" />
            </button>

            <button class="btn btn-ghost btn-circle">
                <CircleQuestionMark />
            </button>
            <button class="btn btn-ghost btn-circle" @click="logout()">
                <LogOut :size="20" />

                <!-- <div class="avatar avatar-placeholder">
                    <div class="bg-neutral text-neutral-content w-8 rounded-full">
                        <span class="text-xs">UI</span>
                    </div>
                </div> -->
            </button>
        </div>

        <div v-else class="navbar-end gap-5">
            <RouterLink to="/auth/sign-in" class="btn btn-primary btn-sm">Sign In</RouterLink>
            <RouterLink to="/auth/sign-up" class="btn btn-primary btn-outline btn-sm">Create account</RouterLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
import type { MenuListItem } from '@/types';
import { RouterLink } from 'vue-router';
import { MessageCircle, Bell, CircleQuestionMark, LogOut } from "lucide-vue-next";
import { ref } from 'vue';
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from 'vuefire';
import { useCurrentUser } from 'vuefire';

const auth = useFirebaseAuth();

const menuList = ref<MenuListItem[]>([
    {
        path: "/workers",
        label: "Find Worker"
    },

    {
        path: "/jobs",
        label: "Find Job"
    },

    {
        path: "/about",
        label: "About"
    },
    {
        path: "/faq",
        label: "FAQs"
    }

]);

const user = useCurrentUser();

async function logout() {
    await signOut(auth!);
    location.href = "/auth/sign-in";
}

</script>