<template>
    <div class="grid grid-cols-10">

        <div class="col-span-10">
            <div class="grid grid-cols-1 h-screen relative">
                <div class="absolute top-5 left-5">
                    <!-- <RouterLink to="/" class="link">Back to Home</RouterLink> -->
                    <p class="text-lg font-bold">Prodigify</p>
                </div>

                <div class="flex flex-col justify-center items-center">

                    <!-- SETUP ACCOUNT TYPE -->
                    <div v-if="currentSignUpStep == 1" class="w-xs flex flex-col gap-5">
                        <div>
                            <p class="text-xl font-semibold">Which account type you want to create?</p>
                        </div>

                        <label for="client" class="flex items-center gap-5">
                            <input type="radio" v-model="profileDetails.userType" id="client" value="client"
                                class="radio radio-xs">
                            <p>Contractor</p>
                        </label>

                        <label for="worker" class="flex items-center gap-5">
                            <input type="radio" v-model="profileDetails.userType" id="worker" value="worker"
                                class="radio radio-xs">
                            <p>Worker</p>
                        </label>
                    </div>

                    <div v-if="currentSignUpStep == 2" class="w-xs flex flex-col gap-">
                        <div>
                            <p class="text-xl font-semibold">Setup Job Title</p>
                        </div>

                        <fieldset class="fieldset mt-5">
                            <!-- <legend class="fieldset-legend">Page title</legend> -->
                            <!-- <input type="text" class="input" placeholder="My awesome page" /> -->
                            <select v-model="profileDetails.bio" class="select">
                                <optgroup v-for="cat in jobCategories" :label="cat.category" :key="cat.category">
                                    <option v-for="job in cat.jobs" :key="job">{{ job }}</option>
                                </optgroup>
                            </select>
                            <!-- <p class="label">You can edit page title later on from settings</p> -->
                        </fieldset>
                    </div>

                    <!-- SET ANG IMONG NAME -->
                    <div v-if="currentSignUpStep == 3" class="w-xs flex flex-col gap-5">
                        <div>
                            <p class="text-xl font-semibold">Enter your name</p>
                        </div>
                        <input type="text" v-model="profileDetails.firstname" class="input w-full"
                            placeholder="Firstname">
                        <input type="text" v-model="profileDetails.lastname" class="input w-full"
                            placeholder="Lastname">
                    </div>

                    <!-- SETUP ANG ADDRESS -->
                    <div v-if="currentSignUpStep == 4" class="w-xs flex flex-col gap-5">
                        <div>
                            <p class="text-xl font-semibold">Set Address</p>
                        </div>

                        <input v-model="profileDetails.province" type="text" class="input" placeholder="Province">
                        <input v-model="profileDetails.city" type="text" class="input" placeholder="City">
                        <input v-model="profileDetails.postal_code" type="text" class="input" placeholder="Postal Code">
                    </div>

                    <div class="w-xs mt-5 flex gap-3">
                        <button @click="prevSetupStep()" class="btn flex-1"
                            :disabled="currentSignUpStep == 1">Prev</button>
                        <button class="btn flex-1 btn-primary" @click="nextSetupStep()"
                            :disabled="disableNext()">Next</button>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useAccountSetupStore } from '@/stores/accountSetup';
import { ref } from 'vue';
import { setAccountDetails } from '@/services/auth.service';
import { useCurrentUser } from 'vuefire';

const { profileDetails } = useAccountSetupStore();
const currentSignUpStep = ref<number>(1);
const user = useCurrentUser();

const disableNext = () => {
    if (currentSignUpStep.value == 1)
        return !profileDetails.userType;

    if (currentSignUpStep.value == 2)
        return !profileDetails.bio;

    if (currentSignUpStep.value == 3)
        return !profileDetails.firstname || !profileDetails.lastname;

    if (currentSignUpStep.value == 4)
        return !profileDetails.city || !profileDetails.province || !profileDetails.postal_code;

    return false;
}

const prevSetupStep = () => currentSignUpStep.value -= profileDetails.userType == "client" ? 2 : 1;

async function nextSetupStep() {
    if (currentSignUpStep.value < 3)
        return currentSignUpStep.value += profileDetails.userType == "client" ? 2 : 1;

    const [success, error] = await setAccountDetails(user.value!, profileDetails);

    if (success) {
        location.href = "/dashboard";
    }

    if (error) {
        console.log(error);
        alert("error");
    }
}

const jobCategories = [
    {
        category: "Masonry & Concrete Works",
        jobs: [
            "Mason", "Concrete Worker", "Finishing Mason", "Tile Setter",
            "Plasterer", "Concrete Finisher", "Cement Mixer Operator",
            "Block Layer", "Foundation Worker"
        ]
    },
    {
        category: "Carpentry & Woodworks",
        jobs: [
            "Carpenter", "Rough Carpenter", "Finishing Carpenter", "Formwork Carpenter",
            "Joiner", "Cabinet Maker"
        ]
    },
    {
        category: "Electrical Works",
        jobs: [
            "Electrician", "Residential Wiring Specialist", "Electrical Installer",
            "Lighting Technician", "Maintenance Electrician"
        ]
    },
    {
        category: "Plumbing & Sanitation",
        jobs: [
            "Plumber", "Pipe Fitter", "Drainage Specialist", "Sanitary Worker",
            "Water Pump Installer"
        ]
    },
    {
        category: "Painting & Finishing",
        jobs: [
            "Painter", "House Painter", "Spray Painter", "Wall Finisher",
            "Waterproofing Specialist"
        ]
    },
    {
        category: "Metalworks & Fabrication",
        jobs: [
            "Steelman", "Rebar Worker", "Welder", "Metal Fabricator",
            "Ironworks Specialist", "Fence / Gate Installer"
        ]
    },
    {
        category: "Construction Support & General Labor",
        jobs: [
            "Construction Helper", "Laborer", "Site Cleaner", "Hauling Crew",
            "Scaffolding Installer", "Material Handler"
        ]
    },
    {
        category: "Installation & Fit-Out Works",
        jobs: [
            "Glass Installer", "Aluminum Installer", "Door & Window Installer",
            "Ceiling Installer", "Partition Worker", "Flooring Installer"
        ]
    },
    {
        category: "Equipment & Heavy Tools Operation",
        jobs: [
            "Heavy Equipment Operator", "Backhoe Operator", "Mixer Truck Driver",
            "Crane Operator", "Power Tools Technician"
        ]
    },
    {
        category: "Maintenance & Repairs",
        jobs: [
            "Handyman", "Home Repair Specialist", "Aircon Technician",
            "Appliance Repairman", "Roof Repair Specialist"
        ]
    },
    {
        category: "Exterior & Landscaping",
        jobs: [
            "Landscaper", "Paver", "Fence Builder", "Gardener",
            "Water Feature Installer"
        ]
    },
    {
        category: "Specialized / Skilled Roles",
        jobs: [
            "Foreman", "Site Supervisor", "Estimator", "Quantity Surveyor",
            "Safety Officer", "Multi-Skilled Worker"
        ]
    }
];


</script>