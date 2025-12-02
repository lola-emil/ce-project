<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Images, X } from 'lucide-vue-next';
import { RouterLink, useRouter } from 'vue-router';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AddressSelection from './components/AddressSelection.vue';
import type { Suggestion } from '@/types';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { useCurrentUser } from 'vuefire';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'vue-sonner'
import { treeifyError, z, ZodError } from "zod";

interface ImageItem {
    file: File;
    url: string;
}

const user = useCurrentUser();
const router = useRouter();


// Loading states
const isSavingData = ref(false);
const isUploadingImages = ref(false);


const title = ref("");
const description = ref("");
const budget = ref(0);
const uploadedImages = ref<string[]>([])

const address = ref<Suggestion | undefined>()
const images = ref<ImageItem[]>([]);

type JobFormError = {
    title: string[],
    description: string[],
    budget: string[],
    location: string[],
    images: string[]
};

const formError = ref<ReturnType<typeof treeifyError<JobFormError>> | undefined>();


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
    const projectSchema = z.object({
        title: z
            .string()
            .min(1, "Title is required")
            .max(200, "Title must be less than 200 characters"),

        description: z
            .string()
            .min(1, "Description is required")
            .max(5000, "Description is too long"),

        budget: z
            .number()
            .positive("Budget must be a positive number"),


        clientId: z.string(),
        createdAt: z.any().optional(),
        status: z.enum(["pending"]),

        location: z.any(),

        images: z
            .array(z.url("Image must be a valid URL"))
            .optional(),
    });

    // type ProjectInput = z.infer<typeof projectSchema>;

    try {
        const body: any = {
            title: title.value,
            description: description.value,
            budget: budget.value,
            location: address.value,
            images: [],
            status: "pending",
            clientId: user.value?.uid,
            createdAt: serverTimestamp()
        };

        const validated = projectSchema.parse(body);


        isUploadingImages.value = true;

        await uploadImages();

        isUploadingImages.value = false;

        validated.images = uploadedImages.value;

        isSavingData.value = true;

        const jobRequestRef = await addDoc(collection(db, "job_requests"), validated);

        isSavingData.value = false;

        console.log("Document written with ID:", jobRequestRef.id)
        router.push("/client/my-jobs");
    }
    catch (error) {
        if (error instanceof ZodError) {
            console.error("Validation error", z.treeifyError(error as ZodError<JobFormError>));
            formError.value = z.treeifyError(error as ZodError<JobFormError>);
            return;
        }

        toast('Unexpected error occured');
    } finally {
        isUploadingImages.value = false;
        isSavingData.value = false;
    }
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

                            <FieldError :errors="formError?.properties?.images?.errors" />
                        </Field>


                        <Field>
                            <FieldLabel>Location</FieldLabel>
                            <!-- <Input id="name-1" name="name" default-value="Pedro Duarte" /> -->
                            <AddressSelection v-model="address" />

                            <FieldError :errors="formError?.properties?.location?.errors" />
                        </Field>

                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input v-model="title" :disabled="isSavingData || isUploadingImages" />
                            <FieldError :errors="formError?.properties?.title?.errors" />
                        </Field>

                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <Textarea v-model="description" :disabled="isSavingData || isUploadingImages" />
                            <FieldError :errors="formError?.properties?.description?.errors" />
                        </Field>


                        <Field>
                            <FieldLabel>Budget</FieldLabel>
                            <Input type="number" v-model="budget" :disabled="isSavingData || isUploadingImages" />
                            <FieldError :errors="formError?.properties?.budget?.errors" />
                        </Field>


                        <Button :disabled="isSavingData || isUploadingImages">
                            Submit
                        </Button>
                        <div class="flex gap-3 items-center text-sm">
                            <Spinner v-if="isSavingData || isUploadingImages" />
                            <span v-if="isSavingData">Saving Data</span>
                            <span v-if="isUploadingImages">Uploading images</span>
                        </div>
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