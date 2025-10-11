<template>

  <AppHeader />

  <main>

    <!-- Hero section ni siya, wala lang gi separate component kay Gamay ra man -->
    <section class="w-full px-5 lg:px-28">
      <div class="flex flex-col gap-5 h-full items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }"
          class="text-4xl lg:text-6xl font-bold tracking-tight text-center">
          Build faster. Fix easier. Hire smarter.
        </h1>
        <transition name="fade">
          <p class="text-xl text-center">Your all-in-one platform for trusted construction workers —
            anytime, anywhere.</p>
        </transition>

        <div class="flex gap-5">
          <RouterLink to="/signin">
            <Button size="lg">Get Started</Button>
          </RouterLink>
          <!-- <Button size="lg" variant="outline">Sign In</Button> -->
        </div>
      </div>
    </section>

    <!-- Mga highlights -->
    <HowItWorks />

    <CTASection />
    
  </main>

  <br>
  <br>

  <Footer />

</template>

<script setup lang="ts">
import AppHeader from "../../components/AppHeader.vue";
import HowItWorks from "./components/HowItWorks.vue";
import CTASection from "./components/CTASection.vue";
import Footer from "./components/Footer.vue";

import Button from '../../components/ui/button/Button.vue';
import { RouterLink } from 'vue-router';

import { motion } from "motion-v";

</script>
