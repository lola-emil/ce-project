<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { Button } from '@/components/ui/button';
import { motion } from "motion-v";
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

</script>


<template>
    <Navbar />

    <main class="container mx-auto px-5 md:px-0">

        <!-- HERO SECTION -->
        <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
            class="w-full min-h-[60vh] md:h-96 flex justify-center items-center">
            <div class="flex flex-col justify-center items-center w-full lg:w-1/2 gap-5">

                <p class="text-center font-bold text-base-content/35">

                </p>

                <Badge variant="outline" class="py-1 px-3">Welcome to Prodigify</Badge>
                <h3 class=" text-5xl md:text-6xl text-center">On-Demand Platform for Skilled Construction Workers</h3>

                <div>
                    <div class="mx-16">
                        <p class="text-center text-lg text-muted-foreground">Find trusted, vetted workers for your next
                            project.
                        </p>
                    </div>
                </div>


                <div>
                    <Button v-if="authStore.user" size="lg" variant="outline" class="font-bold" as-child>
                        <RouterLink to="/dashboard">Go to Dashboard</RouterLink>
                    </Button>
                    <Button v-else size="lg" variant="default" class="font-bold" as-child>
                        <RouterLink to="/register">Create an Account</RouterLink>
                    </Button>
                    
                </div>
            </div>
        </motion.div>



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
        </motion.div>


        <br>
        <br>
        <br>
        <br>

    </main>


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
