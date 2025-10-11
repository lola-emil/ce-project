<template>
    <AppHeader></AppHeader>

    <div class="h-[calc(100vh-4rem)] grid grid-cols-10 w-full px-5 lg:px-28">

        <!-- Profile Details -->
        <div class="flex border-b justify-between items-center col-span-10">
            <div class="p-6 flex gap-10">
                <!-- Avatar -->
                <div class="h-40 w-40 bg-muted rounded-full flex items-center justify-center text-5xl">
                    R
                </div>

                <div class="flex flex-col gap-3 justify-center">
                    <!-- Iyang pangalan -->
                    <p class="text-3xl font-bold">Rens Saladaga</p>

                    <!-- Address -->
                    <div class="flex gap-2 items-center">
                        <MapPin :size="19" />
                        <p>
                            Poblacion Carmen, Cebu, Philippines 6005</p>
                    </div>
                    <!-- Badges -->
                    <div>
                        <ul class="flex gap-3">
                            <li>100% Job Success</li>
                            <li>Top Rated Plus</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Profile additional actions -->
            <div>
                <!-- Hire button -->
                <div class="flex items-center gap-3">
                    <Button>Hire</Button>
                    <Button variant="outline" size="icon">
                        <Heart />
                    </Button>
                </div>
            </div>
        </div>


        <div class="border-r col-span-3 p-3 overflow-y-auto">
            <!-- Ratings -->
            <div class="p-5 border-b flex">
                <div class="flex flex-col items-center flex-1 border-r">
                    <div class="text-xl font-bold">4.8 / 5.0</div>
                    <div>Ratings</div>
                </div>

                <div class="flex flex-col items-center flex-1">
                    <div class="text-xl font-bold">52</div>
                    <div>Total Jobs</div>
                </div>
            </div>


            <div>
                <div class="py-5 border-b">
                    <p class="font-bold">Certifications</p>
                    <div class="text-muted-foreground">None Listed</div>
                </div>

                <div class="py-5 border-b">
                    <p class="font-bold">Education</p>
                    <ul class="flex flex-col gap-2 mt-2">
                        <li>Elpidio de Dios Elementray School</li>
                        <li>Carmen National High School</li>
                        <li>Technical Education and Skills Development Authority ( TESDA )</li>
                    </ul>
                </div>

                <div class="py-5">
                    <p class="font-bold">Verifications</p>
                    <ul>
                        <li>ID: Verified</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Resume -->
        <div class="col-span-7 p-10 overflow-y-auto">
            <h1 class="font-bold text-2xl">Skilled Carpenter | Custom Builds, Repairs & Renovations | 10+ Years of
                Hands-On</h1>
            <br>

            <h2 class="text-xl font-bold mb-3">Experience</h2>
            <p>
                Looking for a reliable, detail-oriented carpenter who delivers quality craftsmanship on time and on
                budget? You've come to the right place.

                I'm a professional carpenter with over a decade of experience in residential and light commercial
                projects. From framing and cabinetry to custom furniture and finish work, I take pride in transforming
                raw materials into beautiful, functional spaces. Whether you're starting from scratch or need expert
                repairs and refinishing, I bring precision, clear communication, and a strong work ethic to every job.
            </p>
            <br>

            <h2 class="text-xl font-bold mb-3">What I Offer:</h2>
            <ul class="list-disc ml-5">
                <li>Custom woodworking & cabinetry</li>
                <li>Interior & exterior framing</li>
                <li>Doors, windows, and trim installation</li>
                <li>Decks, fences, and outdoor structures</li>
                <li>Renovations & repairs</li>
                <li>Blueprint reading & project planning</li>
                <li>High attention to detail & safety standards</li>
            </ul>

            <br>

            <p>
                I work with homeowners, contractors, and designers to bring their vision to life — and I treat every
                project like it’s my own. No shortcuts, no surprises — just honest work and quality results.

                Let’s talk about your project — I’m here to help you build it right.
            </p>
        </div>
    </div>

</template>

<script setup lang="ts">

import { MapPin, Heart } from "lucide-vue-next";

import AppHeader from "../../components/AppHeader.vue";
import Button from "../../components/ui/button/Button.vue";

</script>