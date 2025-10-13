<template>

  <AppHeader />

  <main>

    <!-- Hero section ni siya, wala lang gi separate component kay Gamay ra man -->
    <section class="w-full px-5 lg:px-28">
      <div class="flex flex-col gap-5 h-full items-center justify-center min-h-[calc(100vh-4rem)]">
        <motion.h1 :variants="heroText" class="text-4xl lg:text-6xl font-bold tracking-tight text-center">

          <motion.span v-for="(word, i) in words" :key="i" :variants="{
            hidden: {},
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: 'easeOut' },
            },
          }" class="word">
            {{ word }}
          </motion.span>

        </motion.h1>
        <transition name="fade">
          <p class="text-xl text-center">Your all-in-one platform for trusted construction workers —
            anytime, anywhere.</p>
        </transition>

        <div class="flex gap-5">
          <RouterLink to="/signin">
            <Button size="lg">Get Started</Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Mga highlights -->
    <section class="w-full min-h-96">
      <h2 class="text-center text-3xl font-bold tracking-tight">How it works?</h2>
    </section>

    <section class="px-5 lg:px-28">
      <Card class="w-full p-10 ">
        <CardContent class="flex flex-col gap-10 items-center justify-center min-h-60">
          <h3 class="text-center text-4xl font-bold">Start Building Your Future with BuildCare Today.</h3>
          <div class="flex gap-5">
            <RouterLink as-child to="/signup">
              <Button size="lg">Create Account</Button>
            </RouterLink>
            <Button size="lg" variant="secondary">Learn More</Button>
          </div>
        </CardContent>
      </Card>
    </section>

  </main>

  <br>
  <br>

  <footer class="flex flex-col justify-center items-center p-5 gap-5 border-t">
    <div>
      <h3 class="font-bold">BuildCare</h3>
    </div>
    <div>
      <Nav/>
    </div>
    <div>
    </div>
  </footer>

</template>

<script setup lang="ts">
import AppHeader from "../../components/AppHeader.vue";
import Nav from "../../components/Nav.vue";
import Button from '../../components/ui/button/Button.vue';
import {Card, CardContent} from "../../components/ui/card";


import { RouterLink } from 'vue-router';
import { motion } from "motion-v";
const words = ['Build Faster, ', 'Fix Easier, ', 'Hire Smarter'];

const heroText = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // ⏱ delay between each word
    },
  },
};

const wordAnim = {
  hidden: { opacity: 0, y: 30 },

}

</script>
