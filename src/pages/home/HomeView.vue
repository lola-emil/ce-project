<template>
    <Navbar />


    <main class="container mx-auto">

        <!-- HERO -->
        <section class="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center gap-5">
            <h1 class="text-5xl font-bold text-center">Build faster. Fix easier. Hire smarter.</h1>
            <div as-child class="btn btn-primary">
                <RouterLink to="/auth/sign-up">Get Started</RouterLink>
            </div>
        </section>


        <section class="">
            <h1 class="text-center text-3xl font-semibold">Here's how it works.</h1>
            <div class="min-h-[80vh]">
            </div>
        </section>

        <!-- CTA sa pinaka ubos -->
        <section>
            <div class="card bg-base-200">
                <div class="card-body">
                    <div class="flex p-20 flex-col justify-center items-center gap-5">
                        <h1 class="text-3xl font-semibold text-center">
                            Start Building Your Future with BuildCare Today.
                        </h1>
                        <div class="btn btn-primary">
                            <RouterLink to="/auth/sign-up">Create account</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <br>
    <footer class="p-10 bg-base-300">
        <div class="flex flex-col gap-5 items-center">
            <h3 class="text-center font-semibold">BuildCare</h3>

            <ul class="menu menu-horizontal px-1">
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

    </footer>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import type { MenuListItem } from '@/types';
import { RouterLink } from 'vue-router';
const menuList: MenuListItem[] = [
    {
        path: "/find-worker",
        label: "Find Worker"
    },

    {
        path: "/find-job",
        label: "Find Job"
    },

    {
        path: "/About",
        label: "About"
    },

    {
        path: "/faq",
        label: "FAQs"
    },
];
</script>