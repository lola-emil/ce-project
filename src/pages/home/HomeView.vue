<template>
    <Navbar />

    <main class="container mx-auto">
        <!-- HERO -->
        <section class="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center gap-5">
            <h1 class="text-5xl font-bold text-center">On-Demand Platform for Skilled Construction Workers</h1>
            <div as-child class="btn btn-primary">
                <RouterLink to="/auth/sign-up">Get Started</RouterLink>
            </div>
        </section>


        <section class="">
            <!-- <h1 class="text-center text-3xl font-semibold">Here's how it works.</h1> -->
            <div class="min-h-[80vh]">

                <div>
                    <h3>Tired of endless phone calls...?</h3>
                    <p>Looking for a carpenter, a msaon, a painter - but no one's available?</p>
                </div>

                <div>
                    <h3>Don't waste your time searching.</h3>
                    <p>BuildCare connects yo uwith skilled workers -- instantly</p>
                </div>

                <div>
                    <h3>Search. Book. Done.</h3>
                    <p>Find workers by skill, location, and schedule -- in just a few taps.</p>                    
                </div>

                <div>
                    <h3>No middlemen. No guessing</h3>
                    <p>See ratings, reviews, and transparent pricing before you hire.</p>
                </div>

                <div>
                    <h3>Confirm your booking, and you're all set.</h3>
                    <p>Pay securely through the app -- we'll handle the rest.</p>
                </div>

                <div>
                    <h3>Your project gets done -- faster, easier, better.</h3>
                    <p>From fixing a wall to  renovation a room, BuildCare makes it effortless.</p>
                </div>
            </div>
        </section>

        <!-- CTA sa pinaka ubos -->
        <section>
            <div class="card bg-base-200">
                <div class="card-body">
                    <div class="flex p-20 flex-col justify-center items-center gap-5">
                        <h1 class="text-3xl font-semibold text-center">
                            <!-- Start Building Your Future with BuildCare Today. -->
                             Stop searching. Start building.
                        </h1>
                        <div class="btn btn-primary">
                            <RouterLink to="/auth/sign-up">Find workers</RouterLink>
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
import Navbar from '@/components/ui/Navbar.vue';
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