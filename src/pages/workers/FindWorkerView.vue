<template>
    <Navbar />

    <!-- Search field section -->
    <div class="py-14 bg-base-200">
        <div class="container mx-auto">
            <div class="flex gap-2">
                <input type="text" class="input w-xl" placeholder="What profession are you looking for?">
                <input type="text" class="input w-xl" placeholder="Location">
                <button class="btn btn-primary">Search</button>
            </div>
            <div>

            </div>
        </div>
    </div>

    <div class="container mx-auto mt-5">
        <div class="w-full grid grid-cols-4 gap-5">
            <div v-for="value in range(10)" class="card border border-base-content/10">
                <div class="card-body p-3">
                    <div class="h-60 bg-base-300"></div>

                    <div class="flex justify-between">
                        <div>
                            <p>Worker name</p>
                        </div>
                        <!-- Rate -->
                        <div>
                            <p>Php 300/day</p>
                        </div>

                    </div>
                    <div class="flex justify-between">
                        <div class="badge badge-secondary badge-soft">profession</div>
                        <div class="flex gap-2">
                            <span><Building2 :size="18"/></span>
                            <span>Cebu City, PH</span>
                        </div>
                    </div>
                    <button class="btn btn-info btn-soft">View Profile</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue';
import { range } from '@/utils/util';
import { Building2 } from "lucide-vue-next";
</script>
