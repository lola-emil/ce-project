<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { Button } from '@/components/ui/button';
import { motion } from "motion-v";

const hello = () => alert("Hello, World");

</script>

<template>
    <Navbar />

    <main class="container mx-auto">

        <!-- HERO SECTION -->
        <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }" class="w-full h-96 flex justify-center items-center">
            <div class="flex flex-col justify-center items-center w-1/2 gap-5">

                <p class="text-center font-bold text-base-content/35">
                    Welcome to Prodigify
                </p>
                <h3 class=" text-6xl text-center">The unified platform for service business</h3>

                <div>
                    <div class="mx-16">
                        <p class="text-center text-lg">Consolidate your projects, clients, and billing operations into
                            one
                            integrated,
                            easy-to-use platform.
                        </p>
                    </div>
                </div>


                <div>
                    <Button size="lg" class="font-bold" @click="hello()">Get Started</Button>
                </div>
            </div>
        </motion.div>

        <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut', delay: .5 }" class="h-96 w-full">
            <video class="h-full w-full" src="http://v.ftcdn.net/16/56/05/32/700_F_1656053263_7GGLQARWq7evHENzkIzYlsgKnnvwd9Du_ST.mp4"></video>
        </motion.div>

    </main>
</template>
