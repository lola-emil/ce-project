<template>
    <Topbar />
    <br>
    <main class="container mx-auto grid grid-cols-4 gap-10">

        <div class="col-span-1 flex flex-col gap-5 max-h-[calc(100vh-4rem)] sticky top-0">
            <div class="card mt-10 border border-base-content/10">
                <div class="card-body">
                    <div class="flex justify-center items-center">
                        <div class="avatar avatar-placeholder">
                            <div class="bg-neutral text-neutral-content w-12 rounded-full">
                                <span>SY</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p class="text-center font-bold">Pedro D.</p>
                    </div>
                    <small class="text-sm text-base-content/75 text-center">Senior Software Engr.</small>

                    <div>
                        <button class="btn btn-sm btn-primary w-full">View Profile</button>
                    </div>
                </div>
            </div>
            <div class="card border border-base-content/10">
                <div class="card-body">
                    <p class="font-bold">Recent activity</p>

                    <div>
                        No activities yet.
                    </div>
                </div>
            </div>
            <div class="card bg-base-200 flex-1">
                <div class="card-body flex items-center justify-center">
                    Mga Ads.
                </div>
            </div>
        </div>

        <div class="col-span-3">
            <div class="py-10">
                <p class="text-3xl font-semibold">Welcome, Pedro D.</p>
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

                    <div class="alert alert-info alert-soft">
                        <p class="">
                            <span class="font-bold">
                                Complete your profile
                            </span> <br/>
                            Step-by-step guidance to help you showcase the person behind your professional skills.
                        </p>
                    </div>
                </div>
            </div>
            <br>

            <!-- Active orders -->
            <div class="mt-5">
                <div class="card border border-base-content/10">
                    <div class="card-body">
                        <h3 class="font-semibold">Active Orders <span class="text-base-content/75">- 0</span></h3>
                        <div class="h-[1px] bg-base-content/10"></div>

                        <div>
                            <p>No active orders yet.</p>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <p>Jobs near you</p>

            <div class="mt-3 grid grid-cols-3 gap-5">
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
                        <button class="btn btn-info btn-soft">View Job</button>
                    </div>
                </div>
            </div>

            <div class="flex justify-center my-5">
                <RouterLink to="/jobs" class="link link-primary text-center">View More</RouterLink>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">
import Topbar from '../../components/Topbar.vue';
import { RouterLink } from 'vue-router';
import { range } from '@/utils/util';

</script>
