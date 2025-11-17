<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { Button } from '@/components/ui/button';
import { motion } from "motion-v";
import { Badge } from '@/components/ui/badge';

const hello = () => alert("Hello, World");

</script>

<template>
    <Navbar />

    <main class="container mx-auto px-5 md:px-0">

        <!-- HERO SECTION -->
        <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }" class="w-full min-h-[70vh] md:h-96 flex justify-center items-center">
            <div class="flex flex-col justify-center items-center w-full lg:w-1/2 gap-5">

                <p class="text-center font-bold text-base-content/35">
                    
                </p>

                <Badge variant="outline" class="py-1 px-3">Welcome to Prodigify</Badge>
                <h3 class=" text-5xl md:text-6xl text-center">The unified platform for service business</h3>

                <div>
                    <div class="mx-16">
                        <p class="text-center text-lg text-muted-foreground">Consolidate your projects, clients, and billing operations into
                            one
                            integrated,
                            easy-to-use platform.
                        </p>
                    </div>
                </div>


                <div>
                    <Button size="lg" variant="outline" class="font-bold" @click="hello()">Get Started</Button>
                </div>
            </div>
        </motion.div>

        <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, ease: 'easeOut', delay: .5 }" class="h-96 w-full hidden md:block">
            <video class="h-full w-full" src="http://v.ftcdn.net/16/56/05/32/700_F_1656053263_7GGLQARWq7evHENzkIzYlsgKnnvwd9Du_ST.mp4"></video>
        </motion.div>

    </main>
</template>
