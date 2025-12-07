<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { Button } from '@/components/ui/button';
import { motion } from "motion-v";
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-vue-next';
import { Separator } from '@/components/ui/separator';
import { Zap, ShieldCheck, Eye } from "lucide-vue-next";


const authStore = useAuthStore();

</script>


<template>
    <Navbar />

    <main class="container mx-auto px-5 md:px-0">

        <!-- HERO SECTION -->
        <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
            class="w-full min-h-[60vh] flex justify-center items-center py-52">
            <div class="flex flex-col justify-center items-center w-full lg:w-1/2 gap-5">

                <h3 class=" text-5xl text-center">Where Smart Clients Meet Skilled Workers—Not Surprises.
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



        <div class="grid grid-cols-2">
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
        </div>

        <Separator class="my-20" />

        <!-- <div class="grid grid-cols-3 mb-20">
            <div class="flex flex-col justify-center items-center w-3/4">
                <h3 class="text-2xl font-bold">We Believe Hiring Should Be Simple—and It Starts Here.</h3>
            </div>
            <div class="flex flex-col justify-center items-center w-3/4 col-span-2">
                <div class="leading-loose">
                    <p>
                        Prodigify was founded on a straightforward idea: people deserve an easier, safer way to hire
                        skilled
                        workers. No confusing processes, no guessing, no chasing unreliable contacts.
                    </p>
                    <br>
                    <p>
                        By combining verified
                        worker profiles, fair pricing, and real-time project tracking, we built a platform where
                        transparency and speed aren’t extras—they’re the standard. With Prodigify, getting quality work
                        done
                        becomes clear, predictable, and stress-free.
                    </p>
                </div>
            </div>
        </div> -->

        <!-- <div class="grid grid-cols-3 gap-10">
            <div class="flex flex-col items-center justify-center gap-5">
                <div class="text-5xl">
                    <Eye :size="50"/>
                </div>
                <div>
                    <p class="text-center">Transparent From Start to Finish</p>
                </div>
            </div>
        </div> -->

        <div class="my-20 flex flex-col items-center py-10">
            <Badge variant="outline">
                <Zap/>
                Features</Badge>
            <div class="text-center my-10">
                <h3 class="text-4xl">Powerful Customization Tools</h3>
                <p class="text-muted-foreground">All the tools you need to customize your shadcn/ui components and make
                    them unique.</p>
            </div>
            <div class="grid grid-cols-3 gap-5 w-full">
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
        </div>

        <!-- 
        <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut', delay: .5 }"
            class="h-[50vh] w-full hidden md:flex kanang-kuan rounded-lg flex-col justify-center items-center p-10">

            <Badge variant="outline" class="py-1 px-3">Features</Badge>
            <h3 class=" text-5xl md:text-4xl text-center">
                Your Go-To Source for Skilled Construction Support
            </h3>

            <div class="mx-16 w-1/2 mt-3">
                <p class="text-center text-lg">
                    Easily connect with vetted workers for repairs, renovations, and everything in between.
                </p>
            </div>

            <Button size="lg" variant="outline" class="font-bold" as-child>
                <RouterLink to="/about">Learn More</RouterLink>
            </Button>
        </motion.div> -->

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

        <div class="flex gap-5">
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
