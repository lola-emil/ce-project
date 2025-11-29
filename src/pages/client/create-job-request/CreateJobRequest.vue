<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Images, X } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AddressSelection from './components/AddressSelection.vue';
import type { Suggestion } from '@/types';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { useCurrentUser } from 'vuefire';

interface ImageItem {
    file: File;
    url: string;
}

const title = ref("");
const description = ref("");
const budget = ref(0);
const uploadedImages = ref<string[]>([])

const address = ref<Suggestion | undefined>()
const images = ref<ImageItem[]>([]);


const user = useCurrentUser();

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;

    Array.from(target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            images.value.push({
                file,
                url: e.target?.result as string,
            });
        };
        reader.readAsDataURL(file);
    });

    // Reset input to allow re-uploading the same    file
    target.value = '';
};

const removeImage = (index: number) => {
    images.value.splice(index, 1);
};
const uploadImages = async () => {
    if (!images.value.length) return;


    for (const image of images.value) {
        const fileRef = storageRef(storage, `uploads/${Date.now()}_${image.file.name}`);

        // Upload the file
        const uploadTask = uploadBytesResumable(fileRef, image.file);

        await new Promise<void>((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Optional: track progress here
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.error("Upload failed", error);
                    reject(error);
                },
                async () => {
                    // Upload completed successfully
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    uploadedImages.value.push(downloadURL);
                    resolve();
                }
            );
        });
    }


}

async function submit() {
    const body: any = {
        title: title.value,
        description: description.value,
        budget: budget.value,
        location: address.value,
        images: [],
        pending: "Pending",
        clientId: user.value?.uid,
        createdAt: serverTimestamp()
    };
    await uploadImages();
    body.images = uploadedImages.value;

    console.log(body);
    const jobRequestRef = await addDoc(collection(db, "job_requests"), body);
    console.log("Document written with ID:", jobRequestRef.id)
}

</script>

<template>
    <div class="container mx-auto px-5 lg:px-0">
        <div class="mt-5">
            <Button variant="link">
                <RouterLink to="/client/my-jobs">
                    <ArrowLeft />
                </RouterLink>
            </Button>

            <div class="mt-5 w-xl mx-auto">
                <!-- <Card class="">
                    <CardContent> -->

                <h3 class="text-xl">Job Request</h3>

                <div class="mt-5">
                    <form @submit.prevent="submit()" class="flex flex-col gap-5">
                        <Field>
                            <FieldLabel>Photos</FieldLabel>
                            <div v-if="images.length > 0" class="grid grid-cols-4 gap-1">
                                <div v-for="(image, index) in images"
                                    class="aspect-square bg-secondary rounded-lg relative">
                                    <Button size="icon-sm" variant="destructive" @click="removeImage(index)"
                                        class="absolute right-1 top-1">
                                        <X />
                                    </Button>

                                    <img :src="image.url" alt="preview" class="h-full w-full rounded-lg object-cover">
                                </div>
                                <label for="images" class="">
                                    <div
                                        class="aspect-square rounded-lg bg-secondary gap-1 flex flex-col justify-center items-center text-muted-foreground">
                                        <Images :size="20" />
                                        <small>Add photo</small>
                                    </div>
                                </label>
                            </div>

                            <div v-else>
                                <label for="images">
                                    <div
                                        class="w-full h-28 bg-secondary rounded-lg flex flex-col justify-center items-center gap-3 text-muted-foreground">
                                        <Images />
                                        <small>Add or Drop photos</small>
                                    </div>
                                </label>
                            </div>

                            <input id="images" type="file" multiple accept="image/*" class="hidden"
                                @change="onFileChange">

                        </Field>


                        <Field>
                            <FieldLabel>Location</FieldLabel>
                            <!-- <Input id="name-1" name="name" default-value="Pedro Duarte" /> -->
                            <AddressSelection v-model="address" />

                        </Field>

                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input v-model="title" />
                        </Field>

                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <Textarea v-model="description" />
                        </Field>


                        <Field>
                            <FieldLabel>Budget</FieldLabel>
                            <Input type="number" v-model="budget" />
                        </Field>


                        <Button>
                            Submit
                        </Button>
                    </form>
                </div>
                <!-- </CardContent>
                </Card> -->
                <!-- 
                <div class="col-span-3">
                    <JobPostPreview :images="images" :title="title" :description="description" :location="address" :budget="budget"/>
                </div> -->
            </div>


        </div>
    </div>

    <br>
    <br>
    <br>
</template>