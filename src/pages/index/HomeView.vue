<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { Button } from '@/components/ui/button';
import { motion, type VariantLabels, type VariantType } from "motion-v";
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-vue-next';
import { Separator } from '@/components/ui/separator';
import { Zap } from "lucide-vue-next";


const authStore = useAuthStore();


const initScrollTransition: boolean | VariantType | VariantLabels = {
    opacity: 0,
    y: 100,
};

const whileInView: VariantType | VariantLabels = {
    opacity: 1,
    y: 0
};

</script>


<template>
    <Navbar />

    <main class="container mx-auto px-5 md:px-0">

        <!-- HERO SECTION -->
        <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
            class="w-full min-h-[60vh] flex justify-center items-center py-72">
            <div class="flex flex-col justify-center items-center w-full lg:w-1/2 gap-5">

                <h3 class=" text-5xl text-center font-bold leading-snug">Where Smart Clients Meet Skilled Workers—Not
                    Surprises.
                </h3>

                <p class="text-center text-lg text-muted-foreground">
                    Quality service made simple, not random.
                </p>


                <div>
                    <Button v-if="authStore.user" size="lg" variant="outline" class="font-bold" as-child>
                        <RouterLink to="/dashboard">Go to Dashboard</RouterLink>
                    </Button>

                    <div v-else class="grid grid-cols-2 gap-3">

                        <Button size="lg" variant="outline" class="font-bold" as-child>
                            <RouterLink to="/register">Create an Account</RouterLink>
                        </Button>

                        <Button size="lg" variant="default" class="font-bold" as-child>
                            <RouterLink to="/login">Sign In</RouterLink>
                        </Button>
                    </div>

                </div>
            </div>

            <!-- <img src="/hero-image.png" alt="Hero Image"> -->
        </motion.div>



        <motion.div :initial="initScrollTransition" :while-in-view="whileInView"
            :transition="{ duration: .5, ease: 'easeOut' }" class="grid grid-cols-2">
            <div>
                <img src="/carpenter.jpg" alt="Carpenter" class="rounded-2xl w-full">
            </div>

            <div class="flex items-center justify-center">
                <div class="w-3/4">
                    <Quote />
                    <h3 class="text-2xl font-bold">
                        Isn’t it time hiring workers felt reliable, transparent, and fast?
                    </h3>
                </div>
            </div>
        </motion.div>

        <Separator class="my-20" />

        <motion.div :initial="initScrollTransition" :while-in-view="whileInView"
            :transition="{ duration: .5, ease: 'easeOut', delay: .3 }" class="my-20 flex flex-col items-center py-32">
            <Badge variant="outline">
                <Zap />
                Features
            </Badge>
            <div class="text-center my-10">
                <motion.h3 class="text-4xl">Everything You Need to Get the Job Done Right</motion.h3>
                <p class="text-muted-foreground">Prodigify brings clarity, speed, and trust to the hiring process with
                    features designed for both clients and workers.</p>
            </div>
            <div class="grid lg:grid-cols-3 gap-5 w-full">
                <Card>
                    <CardContent>
                        <h3 class="text-xl">
                            Verified & Vetted Workers
                        </h3>
                        <br>
                        <p class="text-muted-foreground">
                            All workers go through identity checks, skill verification, and performance reviews.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>

                        <h3 class="text-xl">
                            Fast Job Request Workflow
                        </h3>
                        <br>
                        <p class="text-muted-foreground">
                            Submit a request, describe your task, and get matched—no complicated forms or waiting.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <h3 class="text-xl">
                            Transparent Worker Profiles
                        </h3>
                        <br>
                        <p class="text-muted-foreground">
                            View worker ratings, experience, certifications, and past completed jobs before accepting
                            the
                        </p>
                    </CardContent>
                </Card>
            </div>
        </motion.div>

    </main>

    <section class="w-full my-20 py-32 bg-primary flex flex-col justify-center items-center gap-5">
        <h3 class=" text-5xl md:text-4xl text-center">
            Your Go-To Source for Skilled Construction Support
        </h3>

        <div class="mx-16 w-1/2 mt-3">
            <p class="text-center text-lg">
                Easily connect with vetted workers for repairs, renovations, and everything in between.
            </p>


        </div>

        <div class="gap-5 grid grid-cols-2">
            <Button size="lg" variant="outline" class="font-bold" as-child>
                <RouterLink to="/register">Create an Account</RouterLink>
            </Button>

            <Button size="lg" variant="outline" class="font-bold" as-child>
                <RouterLink to="/login">Sign Up</RouterLink>
            </Button>
        </div>
    </section>

    <div class="border-t p-10 w-full flex flex-col justify-center items-center">
        <p>
            &copy; 2025 <span class="font-bold">Prodigify</span>. All rights reserved
        </p>
    </div>
</template>


<style scoped>
.kanang-kuan {
    background-image:
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(https://i.pinimg.com/1200x/f9/72/ec/f972ec4c7c312f1254b842d91057b1bc.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
</style>
