<template>
    <Navbar />
    <br>
    <main class="container mx-auto grid grid-cols-4 gap-10">

        <div class="col-span-1 flex flex-col gap-5 max-h-[calc(100vh-4rem)] sticky top-0">

            <RouterLink v-if="auth.userType == 'client'" to="/create-job-posting"
                class="btn btn-outline btn-primary w-full mt-10">Create job post</RouterLink>

            <div class="card border border-base-content/10">
                <div class="card-body">
                    <div class="flex justify-center items-center">
                        <div class="avatar avatar-placeholder">
                            <div class="bg-neutral text-neutral-content w-12 rounded-full">
                                <span>SY</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="text-center font-bold">{{ user?.displayName }}</p>
                    </div>

                    <small v-if="auth.userType == 'worker'"
                        class="text-sm text-base-content/75 text-center">Mason</small>

                    <div>
                        <RouterLink to="/profile" class="btn btn-sm btn-primary w-full">View Profile</RouterLink>
                    </div>
                </div>
            </div>
            <!-- <div class="card border border-base-content/10">
                <div class="card-body">
                    <p class="font-bold">Recent activity</p>

                    <div>
                        No activities yet.
                    </div>
                </div>
            </div> -->
            <div class="card bg-base-200 flex-1">
                <div class="card-body flex items-center justify-center">
                    Mga Ads.
                </div>
            </div>
        </div>

        <div class="col-span-3">
            <div class="py-10">
                <p class="text-3xl font-semibold">Welcome, {{ user?.displayName }}</p>
                <small class="text-sm text-base-content/75">Find important messages, tips, and links to helpful
                    resources here.</small>
            </div>

            <!-- Onboarding Guide -->
            <div>
                <div class="flex flex-col gap-5">
                    <!-- <div class="card border border-base-content/10">
                        <div class="card-body">
                            <p class="text-lg font-bold">Setup your business</p>
                            <small class="text-sm text-base-content/75">
                                Take advantage of this Kickstart benefits to get your business up and running.
                            </small>
                        </div>
                    </div> -->

                    <!-- <div class="alert alert-info alert-soft">
                        <p>
                            <span class="font-bold">
                                Complete your profile
                            </span> <br />
                            Step-by-step guidance to help you showcase the person behind your professional skills.
                        </p>
                    </div> -->
                </div>
            </div>

            <div class="card mt-10">
                <div class="card-body p-0">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-bold">Latest notifications ({{ notifications.length }})</p>
                        </div>
                        <RouterLink to="" class="link link-primary">See all</RouterLink>
                    </div>

                    <div class=" flex flex-col gap-3">
                        <div v-for="value in notifications" class="card border border-base-content/10">
                            <div class="card-body">
                                <div class="flex items-center gap-5">
                                    <!-- ICON -->
                                    <div class="p-3 bg-base-300 rounded-lg">
                                        <Bell :size="20" />
                                    </div>

                                    <div class="flex-1">
                                        <p class="font-semibold">{{ value.title }}</p>
                                        <p class="">{{ value.message }}</p>
                                    </div>
                                    <div>
                                        <ChevronRight />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Active orders -->
            <!-- <div class="mt-10">
                <div class="card border border-base-content/10">
                    <div class="card-body">
                        <h3 class="font-semibold">Active Orders <span class="text-base-content/75">- 0</span></h3>
                        <div class="h-[1px] bg-base-content/10"></div>

                        <div>
                            <p>No active orders yet.</p>
                        </div>
                    </div>
                </div>
            </div> -->

            <div class="card mt-10">
                <div class="card-body p-0">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-bold">Posted Jobs</p>
                        </div>
                        <div>
                            <RouterLink to="" class="link link-primary">See all</RouterLink>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <div v-for="value in postings" class="card border border-base-content/10">
                            <div class="card-body">
                                <div class="flex items-end">
                                    <div class="flex-1">
                                        <p class="text-lg">{{ value.title }}</p>
                                        <p class="text-base-content/65">Hourly</p>
                                        <div class="mt-3">
                                            <p class="text-base-content/65">Created 1w ago</p>
                                        </div>
                                    </div>

                                    <div class="flex-1 grid grid-cols-3">
                                        <div></div>
                                        <div class="text-center">
                                            <p class="text-lg font-bold">{{ value.stat.views }}</p>
                                            <p class="">Views</p>
                                        </div>
                                        <div class="text-center">
                                            <p class="text-lg font-bold">{{ value.stat.messaged }}</p>
                                            <p>Messaged</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <br>
            <br>
            <br>
            <div class="flex gap-2">
                <div>
                    <p class="font-bold">{{ auth.userType == "worker" ? "Jobs near you" : "Workers near you" }}</p>
                </div>
                <div class="flex items-center gap-1">
                    <MapPin :size="18" />
                    <span>
                        Cebu City
                    </span>
                </div>
            </div>

            <!-- JOB LIST -->
            <div v-if="auth.userType == 'worker'" class="mt-3">
                <div class=" grid grid-cols-3 gap-5">
                    <div v-for="value in range(3)" class="card border border-base-content/10">
                        <div class="card-body p-3">
                            <div class="h-60 bg-base-300"></div>

                            <div class="flex justify-between">
                                <div>
                                    <p>Job Name</p>
                                </div>
                                <!-- Rate -->
                                <div>
                                    <p>Php 300/day</p>
                                </div>

                            </div>
                            <button class="btn btn-primary btn-soft">View Job</button>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center my-5">
                    <RouterLink to="/jobs" class="link link-primary text-center">View More</RouterLink>
                </div>
            </div>

            <div v-if="auth.userType == 'client'" class="mt-3">
                <div class="mt-3 grid grid-cols-3 gap-5">
                    <div v-for="value in range(3)" class="card border border-base-content/10">
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
                            <div>
                                <div class="badge badge-secondary badge-soft">profession</div>
                            </div>
                            <button class="btn btn-primary btn-soft">View Profile</button>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center my-5">
                    <RouterLink to="/workers" class="link link-primary text-center">View More</RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { range } from '@/utils/util';
import { MapPin, Bell, ChevronRight } from "lucide-vue-next";
import Navbar from '@/components/ui/Navbar.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useCurrentUser } from 'vuefire';

const auth = useAuthStore();
const user = useCurrentUser();



const notifications = [
    {
        title: "Packing Associate shift has been finished!",
        message: "You can check all the details of the shift"
    },

    {
        title: "Packing Associate shift has been finished!",
        message: "You can check all the details of the shift"
    },
];

const postings = [
    {
        title: "Mag taug sa bawol sa CR",
        date_created: "2025-10-31",
        stat: {
            views: 2,
            messaged: 0
        }
    },

    {
        title: "Poso Negro",
        date_created: "2025-10-31",
        stat: {
            views: 2,
            messaged: 0
        }
    },
];


onMounted(() => {

});

</script>
