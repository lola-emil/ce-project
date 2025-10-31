<template>
    <Navbar />

    <div class="container mx-auto">
        <div class="mt-10 card">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-3xl font-semibold">Welcome back, {{ user?.displayName }}</p>

                        <small class="text-sm text-base-content/75">Find important messages, tips, and links to helpful
                            resources here.</small>
                    </div>

                    <div>
                        <RouterLink to="/create-job-posting" class="btn btn-primary btn-outline">
                            <Plus />
                            <span>Create Job Post</span>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-5">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold">Latest notifications ({{ notifications.length }})</p>
                    </div>
                    <RouterLink to="" class="link link-primary">See all</RouterLink>
                </div>

                <div class="mt-5 flex flex-col gap-3">
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

        <div class="card">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold">Upcoming shifts</p>
                    </div>
                </div>

                <div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue';
import { useCurrentUser } from 'vuefire';
import { Plus, Bell, ChevronRight } from "lucide-vue-next";

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

</script>