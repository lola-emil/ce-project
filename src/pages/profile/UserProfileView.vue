<template>
    <Navbar />

    <main class="container mx-auto h-screen grid grid-cols-4">
        <div class="col-span-1">
            <div class="card border border-base-content/10 mt-5">
                <div class="card-body">
                    <div class="flex justify-center items-center">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                                <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p class="text-center font-bold text-lg">{{ user?.displayName ?? user?.email }}</p>
                        <div v-if="profile?.city" class="flex items-center justify-center gap-1">
                            <MapPin :size="16" />
                            <div>
                                {{ profile?.city }}, PH
                            </div>
                        </div>
                    </div>

                    <div>
                        <!-- {{  profile.userType }} -->
                    </div>

                    <button class="btn btn-primary btn-sm">Message</button>

                    <div v-if="profile?.userType == 'client'" class="grid grid-cols-3">
                        <div class="p-3 flex flex-col items-center">
                            <p class="font-bold">12</p>
                            <small>Job Posted</small>
                        </div>

                        <div class="p-3 flex flex-col items-center">
                            <div>
                                <p class="font-bold">4.8</p>
                            </div>
                            <small>Ratings</small>
                        </div>

                        <div class="p-3 flex flex-col items-center">
                            <p class="font-bold">2</p>
                            <small>Active jobs</small>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="profile?.userType == 'worker'" class="card border border-base-content/10 mt-5">
                <div class="card-body">
                    <div>
                        <p class="font-bold">Skills & Endorsment</p>
                    </div>

                    <div>
                        <ul class="list-disc ml-5 flex flex-col gap-2">
                            <li v-for="value in endorsements">{{ value }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div v-if="profile?.userType == 'client'" class="card bg-base-200 h-96 w-full mt-5">
                <div class="card-body justify-center items-center">
                    <div>
                        <p>Mga ads.</p>
                    </div>
                </div>
            </div>


        </div>

        <div class="col-span-3 px-5">
            <div class="card border border-base-content/10 mt-5">
                <div class="card-body">
                    <div v-if="profile?.userType == 'worker'" class="grid grid-cols-3 mt-5">
                        <div class="stat">
                            <div class="stat-figure">
                                <!-- <div class="radial-progress" style="--value:91;--size:3rem;" role="progressbar">91</div> -->
                                <CheckCircle />
                            </div>
                            <div class="stat-title">Projects Completed</div>
                            <div class="stat-value">12</div>

                        </div>

                        <div class="stat">
                            <div class="stat-figure">
                                <div class="radial-progress" style="--value: calc((4.8/5)*100);--size:3rem;"
                                    role="progressbar">4.8</div>
                            </div>
                            <div class="stat-title">Ratings</div>
                            <div class="stat-value">4.8<span class="text-sm">/5.0</span></div>
                            <div class="stat-desc flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16" fill="currentColor" class="text-success size-4">
                                    <path fill-rule="evenodd"
                                        d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z"
                                        clip-rule="evenodd"></path>
                                </svg> All good</div>
                        </div>

                        <div class="stat">
                            <div class="stat-figure">
                                <FileText />
                            </div>
                            <div class="stat-title">Contracts</div>
                            <div class="stat-value">12</div>
                        </div>
                    </div>

                    <div v-if="profile?.userType == 'client'" class="grid grid-cols-3 mt-5">
                        <div class="stat">
                            <div class="stat-figure">
                                <!-- <div class="radial-progress" style="--value:91;--size:3rem;" role="progressbar">91</div> -->
                                <CheckCircle />
                            </div>
                            <div class="stat-title">Job Posted</div>
                            <div class="stat-value">12</div>

                        </div>

                        <div class="stat">
                            <div class="stat-figure">
                                <div class="radial-progress" style="--value: calc((4.8/5)*100);--size:3rem;"
                                    role="progressbar">4.8</div>
                            </div>
                            <div class="stat-title">Ratings</div>
                            <div class="stat-value">4.8<span class="text-sm">/5.0</span></div>
                            <div class="stat-desc flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16" fill="currentColor" class="text-success size-4">
                                    <path fill-rule="evenodd"
                                        d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z"
                                        clip-rule="evenodd"></path>
                                </svg> All good</div>
                        </div>

                        <div class="stat">
                            <div class="stat-figure">
                                <FileText />
                            </div>
                            <div class="stat-title">Active Jobs</div>
                            <div class="stat-value">2</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- name of each tab group should be unique -->

            <div class="tabs tabs-border mt-5">
                <!-- <input type="radio" name="my_tabs_2" class="tab" aria-label="Showcase" />
                <div class="tab-content  bg-base-100 p-10">Tab content 1</div> -->

                <input type="radio" name="my_tabs_2" class="tab" aria-label="About" :checked="true" />
                <div class="tab-content  bg-base-100">
                    <div class="card">
                        <div class="card-body">
                            <div>
                                <p class="font-bold">Personal Information</p>
                            </div>
                            <div class="flex flex-col gap-5 mt-3">
                                <div class="grid grid-cols-2">
                                    <div>
                                        <p>First Name</p>
                                        <p>{{ profile?.firstname }}</p>
                                    </div>

                                    <div>
                                        <p>Last Name</p>
                                        <p>{{ profile?.lastname }}</p>
                                    </div>
                                </div>

                                <div class="grid grid-cols-2">
                                    <div>
                                        <p>Email Address</p>
                                        <p>{{ user?.email ?? "Not set" }}</p>
                                    </div>

                                    <div>
                                        <p>Phone</p>
                                        <p>{{ profile?.phone ?? "Not set" }}</p>
                                    </div>
                                </div>

                                <div v-if="profile?.userType == 'worker'" class="grid grid-cols-2">
                                    <div>
                                        <p>Bio</p>
                                        <div class="badge badge-info badge-soft badge-outline">
                                            <p class="font-bold">Mason</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <div>
                                <p class="font-bold">Address</p>
                            </div>
                            <div class="flex flex-col gap-5">
                                <div class="grid grid-cols-2">
                                    <div>
                                        <p>Province</p>
                                        <p>Cebu</p>
                                    </div>

                                    <div>
                                        <p>City/Municipality</p>
                                        <p>Carmen</p>
                                    </div>
                                </div>

                                <div class="grid grid-cols-2">
                                    <div>
                                        <p>Postal Code</p>
                                        <p>6005</p>
                                    </div>

                                    <div>
                                        <p>Tax ID</p>
                                        <p>Not set</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <input type="radio" name="my_tabs_2" class="tab" aria-label="Rating & reviews" />
                <div class="tab-content bg-base-100">

                    <div class="card">
                        <div class="card-body">
                            <!-- <div>
                                <p class="font-bold">Ratings & Reviews</p>
                            </div> -->

                            <div class="flex flex-col gap-3 my-3">
                                <div v-for="value in reviews" class="p-3 bg-base-200 rounded-lg">
                                    <div class="flex items-start justify-between">
                                        <div class="flex gap-2">
                                            <div>
                                                <div class="avatar avatar-placeholder">
                                                    <div class="bg-neutral text-neutral-content w-8 rounded-full">
                                                        <span class="text-xs">UI</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p>{{ value.reviewer }}</p>
                                                <small>{{ value.rating }} / 5</small>
                                            </div>
                                        </div>

                                        <div>
                                            {{ value.date }}
                                        </div>
                                    </div>

                                    <div>
                                        {{ value.comment }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue';
import { CheckCircle, MapPin, FileText } from "lucide-vue-next";
import { useCurrentUser } from 'vuefire';
import { useProfileStore } from '@/stores/profile';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { ProfileDetails } from '@/types';
import { getProfileByUID } from '@/services/profile.service';

const user = useCurrentUser();
// const profileStore = useProfileStore();
const route = useRoute();

const profile = ref<ProfileDetails | null>(null);

const reviews = [
    {
        reviewer: "Alice Johnson",
        rating: 5,
        date: "2025-10-15",
        comment: "Absolutely loved it! The product quality is top-notch and shipping was fast."
    },
    {
        reviewer: "Marcus Lee",
        rating: 4,
        date: "2025-10-18",
        comment: "Great experience overall. A bit pricey, but worth it for the quality."
    },
    {
        reviewer: "Sofia Ramirez",
        rating: 3,
        date: "2025-10-20",
        comment: "It’s okay. Met my expectations but didn’t really impress me."
    },
    {
        reviewer: "Daniel Kim",
        rating: 2,
        date: "2025-10-25",
        comment: "The product didn’t match the description. Customer service was responsive, though."
    },
    {
        reviewer: "Emily Carter",
        rating: 5,
        date: "2025-10-30",
        comment: "Fantastic! Exceeded all my expectations — would definitely buy again."
    }
];

const endorsements = [
    "Bricklaying",
    "Stone Masonry",
    "Concrete Work",
    "Restoration & Preservation",
    "Construction Management",
    "Blueprint Reading",
    "Site Safety",
    "Finishing & Detailing",
    "Team Leadership",
    "Project Estimation"
];

const fetchProfile = async () => {
    const id = String(route.params.id);
    const result = await getProfileByUID(id);
    profile.value = result;
}

onMounted(() => {
    fetchProfile();
})

</script>