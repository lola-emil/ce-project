<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Plus, X } from 'lucide-vue-next';
import { useWorker, type WorkerFormError } from './composables/useWorker';
import { ref, useTemplateRef } from 'vue';
import z, { ZodError, treeifyError } from 'zod';
import { useRouter } from 'vue-router';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { db, storage } from '@/firebase';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';

interface ImageItem {
    file: File;
    url: string;
}

const router = useRouter();

const formError = ref<ReturnType<typeof treeifyError<WorkerFormError>> | undefined>(undefined);
const worker = useWorker();

const input = useTemplateRef('fileInput');
const images = ref<ImageItem[]>([]);

const removeImage = (index: number) => {
    images.value.splice(index, 1);
};

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

    console.log(images.value);
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
                    worker.form.workerDocuments.push(downloadURL);
                    resolve();
                }
            );
        });
    }


}

const triggerFileInput = () => {
    input.value!.click();
};

async function onSubmit() {
    await uploadImages();

    console.log("Uploaded images: ", worker.form.workerDocuments);

    const [_, error] = await worker.create();

    if (error) {
        if (error instanceof ZodError) {
            formError.value = z.treeifyError(error as ZodError<WorkerFormError>)
            console.log("Validation error", formError.value);
            console.log(formError.value?.properties?.name?.properties?.firstname?.errors);
            return;
        }

        if (error instanceof FirebaseError) {
            alert("Unidentified error");
            return;
        }
    }

    router.push("/admin/user-management");
}

</script>

<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-5">
            <Button size="sm" variant="link" as-child>
                <RouterLink to="user-management">
                    <ArrowLeft /> Go back
                </RouterLink>
            </Button>
        </div>

        <div class="mt-5">
            <h3 class="text-2xl font-semibold">Add New Worker</h3>
            <p class="text-muted-foreground">Mao ang page para mag add ug bago nga worker</p>
        </div>
        <br>
        <Separator />
        <br>

        <div>
            <div>
                <h3 class="text-lg font-semibold">Personal Information</h3>
                <p class="text-muted-foreground">All fields are required. (except where noted)</p>
            </div>

            <br>

            <div class="grid grid-cols-2 gap-5">
                <Field :data-invalid="formError?.properties?.name?.properties?.firstname">
                    <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                    <Input id="firstname" v-model="worker.form.name.firstname" type="text" />
                    <FieldError :errors="formError?.properties?.name?.properties?.firstname?.errors" />
                </Field>

                <Field :data-invalid="formError?.properties?.name?.properties?.middlename">
                    <FieldLabel htmlFor="middlename">Middle Name</FieldLabel>
                    <Input id="middlename" name="middlename" v-model="worker.form.name.middlename" type="text" />
                    <FieldError :errors="formError?.properties?.name?.properties?.middlename?.errors" />
                </Field>

                <Field :data-invalid="formError?.properties?.name?.properties?.lastname">
                    <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                    <Input id="lastname" v-model="worker.form.name.lastname" type="text" />
                    <FieldError :errors="formError?.properties?.name?.properties?.lastname?.errors" />
                </Field>
            </div>

            <div class="grid grid-cols-2 gap-5 mt-5">
                <Field :data-invalid="formError?.properties?.name?.properties?.middlename">
                    <FieldLabel htmlFor="middlename">Email</FieldLabel>
                    <Input id="middlename" v-model="worker.form.email" type="text" />
                    <FieldError :errors="formError?.properties?.email?.errors" />
                </Field>

                <Field :data-invalid="formError?.properties?.name?.properties?.lastname">
                    <FieldLabel htmlFor="lastname">Phone Number</FieldLabel>
                    <Input id="lastname" v-model="worker.form.phoneNumber" type="text" />
                    <FieldError :errors="formError?.properties?.name?.properties?.lastname?.errors" />
                </Field>
            </div>
            <br>
            <br>

            <div>
                <h3 class="text-lg font-semibold">Address</h3>
                <p class="text-muted-foreground">All fields are required. (except where noted)</p>
            </div>

            <div class="grid grid-cols-2 gap-5 mt-5">
                <Field :data-invalid="formError?.properties?.address?.properties?.addressLine1?.errors">
                    <FieldLabel htmlFor="street">Address Line 1</FieldLabel>
                    <Input id="street" v-model="worker.form.address.addressLine1" />
                    <FieldError :errors="formError?.properties?.address?.properties?.addressLine1?.errors" />
                </Field>

                <Field :data-invalid="formError?.properties?.address?.properties?.addressLine2?.errors">
                    <FieldLabel htmlFor="barangay">Address Line 2</FieldLabel>
                    <Input id="barangay" v-model="worker.form.address.addressLine2" />
                    <FieldError :errors="formError?.properties?.address?.properties?.addressLine2?.errors" />
                </Field>

                <Field :data-invalid="formError?.properties?.address?.properties?.city?.errors">
                    <FieldLabel htmlFor="city">City/Municipality</FieldLabel>
                    <Input id="city" v-model="worker.form.address.city" />
                    <FieldError :errors="formError?.properties?.address?.properties?.city?.errors" />
                </Field>

                <Field :data-invalid="formError?.properties?.address?.properties?.province?.errors">
                    <FieldLabel htmlFor="province">Province</FieldLabel>
                    <Input id="province" v-model="worker.form.address.province" />
                    <FieldError :errors="formError?.properties?.address?.properties?.province?.errors" />
                </Field>

                <Field :data-invalid="formError?.properties?.address?.properties?.zipCode?.errors">
                    <FieldLabel htmlFor="zipcode">Zip Code</FieldLabel>
                    <Input id="zipcode" v-model="worker.form.address.zipCode" />
                    <FieldError :errors="formError?.properties?.address?.properties?.zipCode?.errors" />
                </Field>
            </div>
            <br>
            <br>

            <div class="flex items-center gap-5">
                <div>
                    <h3 class="text-lg font-semibold">Worker's Documents</h3>
                    <p class="text-muted-foreground"></p>
                </div>
                <Button variant="outline" @click="triggerFileInput">
                    <Plus />
                </Button>

                <input ref="fileInput" @change="onFileChange" type="file" class="hidden"
                    accept=".pdf, .jpg, .jpeg, .png, .docx, .xlsx, .zip" multiple>
            </div>

            <br>

            <div class="">
                <div v-if="images.length > 0" class="grid grid-cols-4 gap-5">
                    <div v-for="(image, index) in images"
                        class="aspect-square bg-secondary rounded-lg relative shadow-xl">
                        <Button size="icon-sm" variant="destructive" @click="removeImage(index)"
                            class="absolute right-1 top-1">
                            <X />
                        </Button>

                        <img :src="image.url" alt="preview" class="h-full w-full rounded-lg object-cover">
                    </div>
                    <label for="images" class="">
                    </label>
                </div>
            </div>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
        </div>
    </div>

    <div class=" border-t bg-primary shadow-xl p-5 h-20 fixed left-0 bottom-0 w-full z-50 flex justify-end">
        <Button variant="secondary" @click="onSubmit">Submit</Button>
    </div>

</template>