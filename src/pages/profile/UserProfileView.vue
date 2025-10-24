<template>
    <Topbar />

    <main class="container mx-auto">
        <div class="card my-5 bg-base-200">
            <div class="card-body flex-row">
                <div class="flex gap-5">
                    <div class="avatar">
                        <div class="w-36 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
                        </div>
                    </div>

                    <div class="flex flex-col justify-between gap-3">
                        <div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-3xl">Idiot Sandwich</p>
                                </div>
                                <div>
                                    <p class="text-2xl text-base-content/75">$44/hr</p>
                                </div>
                            </div>
                            <p class="text-lg">Full stack web developer</p>
                        </div>
                        <!-- Address -->
                        <div class="flex items-center gap-2 text-lg">
                            <Building2 :size="20"/>
                            <span>
                                Cebu City
                            </span>
                        </div>

                        <!-- Action buttons -->
                        <div class="flex items-center gap-2">
                            <button class="btn btn-primary">Message</button>
                            <button class="btn btn-secondary btn-outline">Resume</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import Topbar from '@/components/Topbar.vue';
import { Building2 } from "lucide-vue-next";
</script>