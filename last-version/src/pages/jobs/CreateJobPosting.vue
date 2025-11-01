<template>
    <Navbar />
    <div class="grid grid-cols-10 overflow-hidden">
        <!-- <div class="col-span-3 bg-primary sticky top-0">
            <img src="/abstract.jpeg" class="w-full h-full object-cover">
        </div> -->

        <div class="col-span-7">
            <div class="container mx-auto flex justify-center items-center">
                <div class="card w-4xl">
                    <div class="card-body">
                        <div class="my-5">
                            <RouterLink to="/dashboard" class="btn btn-sm btn-secondary">Back to home</RouterLink>
                        </div>
                        <h3 class="text-2xl font-semibold">Create Job Post</h3>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Job Title</legend>
                            <input type="text" class="input w-full" placeholder="" />
                            <p class="label"></p>
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Job Description</legend>
                            <!-- <ckeditor v-if="editor" :model-value="data" :editor="editor" :config="config" /> -->
                            <QuillEditor v-model:content="form.job_description" content-type="html" theme="snow" />
                            <p class="label"></p>
                        </fieldset>

                        <!-- <fieldset class="fieldset">
                            <legend class="fieldset-legend">Job Category</legend>
                            <input type="text" class="input w-full" placeholder="" />
                            <p class="label"></p>
                        </fieldset> -->

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Attach Images</legend>
                            <input type="file" id="choose-images" class="hidden" placeholder="" />

                            <label for="choose-images"
                                class="border border-dashed border-base-content/20 rounded p-5 flex flex-col justify-center items-center hover:bg-base-content/20">
                                <div>
                                    <FileImage />
                                </div>
                                <p>Click to choose photo</p>
                            </label>
                        </fieldset>


                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Rate Amount (Php)</legend>
                            <!-- <input type="text" class="input w-full" placeholder="" /> -->
                            <div class="flex items-center gap-5 w-full">
                                <div class="join">
                                    <div>
                                        <div>
                                            <input v-model="form.rate.from" class="input join-item w-full" placeholder="Initial amount" />
                                        </div>
                                    </div>
                                </div>

                                <div class="join flex-1">
                                    <div>
                                        <div>
                                            <input v-model="form.rate.to"  class="input join-item w-full" placeholder="Max amount" />
                                        </div>
                                    </div>
                                    <select v-model="form.rate.frequency" class="select join-item w-max">
                                        <!-- <option disabled selected>Filter</option> -->
                                        <option value="hourly">/Hour</option>
                                        <option value="daily">/Day</option>
                                        <option value="contract">/Contract</option>
                                    </select>
                                </div>
                            </div>
                            <p class="label"></p>
                        </fieldset>


                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Address/Location</legend>
                            <input v-model="form.address" type="text" class="input w-full" placeholder="Job Location" />

                            <div ref="map-el" class="map w-full h-96"></div>
                            <p class="label"></p>
                        </fieldset>


                        <div>
                            <button @click="submit()" class="btn btn-primary">Post</button>
                        </div>

                        <br>
                        <br>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>

<script setup lang="ts">
import Navbar from '@/components/ui/Navbar.vue';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { onMounted, reactive, ref, useTemplateRef } from 'vue';
import { FileImage } from "lucide-vue-next";
import { QuillEditor } from "@vueup/vue-quill"
import { createJobPost } from '@/services/job-posting.service';

setOptions({
    key: import.meta.env.VITE_GOOGLE_API_KEY,
    // version: "weekly",
    libraries: ["places"]
});

const form = reactive({
    job_title: "",
    job_description: "",
    rate: {
        from: 0,
        to: 0,
        frequency: "hourly"
    },
    address: ""
})

const mapEl = useTemplateRef("map-el");



const loadMap = async () => {
    const { Map } = await importLibrary("maps");
    const { Geocoder } = await importLibrary("geocoding");


    const map = new Map(mapEl.value, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
    });

    // const geocoder = new Geocoder();

}

async function submit() {
    const result = await createJobPost(form);
    console.log(result);
}

onMounted(() => {
    loadMap();
});

</script>