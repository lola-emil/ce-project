<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { useDocument } from 'vuefire';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import type { JobAssignment, JobRequest } from '@/types/schema';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'vue-sonner';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getDownloadURL, ref as storageRef, uploadBytesResumable, } from "firebase/storage";

const auth = useAuthStore();

const route = useRoute();

const jobId = String(route.params.id);
const jobRef = doc(db, "job_requests", jobId);
const {
    data: job,
} = useDocument<JobRequest>(jobRef);

const jobAssignment = ref<JobAssignment>();

watch(job, () => {
    console.log(job.value);
});

async function acceptJobRequest() {
    if (!jobAssignment.value) {
        toast("Job detail did not load properly");
        return;
    };

    const assignmentDoc = doc(db, "job_assignments", jobAssignment.value.id);

    await updateDoc(assignmentDoc, {
        status: "accepted"
    });

    toast('Yeah');
    location.reload();
}


interface ImageItem {
    file: File;
    url: string;
}


const progressImage = ref<File>();
const note = ref("");

async function addProgress() {
    if (!jobAssignment.value) {
        toast("Job detail did not load properly");
        return;
    };

    const assignmentDoc = doc(db, "job_assignments", jobAssignment.value.id);
    const assignment = await getDoc(assignmentDoc);

    if (assignment.exists()) {
        const data = assignment.data() as JobAssignment;
        const currentProgress = data.progress;

        // TODO: complete this shit. Kuwang ani kay i append siya sa firestore


        // Upload ang image
        let uploadImage: string | undefined;

        if (progressImage.value) {
            const fileRef = storageRef(storage, `uploads/${Date.now()}_${progressImage.value?.name}`)
            const uploadTask = uploadBytesResumable(fileRef, progressImage.value);
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
                        uploadImage = downloadURL
                        resolve();
                    }
                );
            });
        }

        // Save ang progress
        currentProgress.push({
            imgUrl: uploadImage,
            note: note.value,
            date: (new Date()).toLocaleDateString()
        });

        // append ang progress sa firestore
        await updateDoc(assignmentDoc, {
            progress: currentProgress
        });

        toast('Success');
        location.reload();
    }
}

const onSelectImage = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;

    console.log(target.files);

    const file = target.files[0];

    progressImage.value = file;

    console.log(progressImage.value);
}

onMounted(async () => {
    const jobAssignmentRef = query(collection(db, "job_assignments"), where("jobId", "==", jobRef.id), where("workerId", "==", auth.user?.uid));
    const jobAssignmentSnap = await getDocs(jobAssignmentRef);

    jobAssignment.value = {
        id: jobAssignmentSnap.docs[0]?.id,
        ...jobAssignmentSnap.docs[0]?.data()
    } as JobAssignment;


    console.log("Hoe lee cow", jobAssignment.value);
})

</script>

<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <Button variant="link" as-child>
                <RouterLink to="/worker/my-assignments">
                    <ArrowLeft /> Go back
                </RouterLink>
            </Button>
        </div>
        <div class="grid grid-cols-2 gap-5 mt-36">

            <div class="flex items-center">
                <Carousel class="w-md mx-auto">
                    <CarouselContent>
                        <CarouselItem v-if="job?.images" v-for="(image, i) in job?.images" :key="i">
                            <div class="p-1 h-96">
                                <img :src="image" alt="preview" class="h-full w-full object-contain">
                            </div>
                        </CarouselItem>

                        <CarouselItem v-else>
                            <div class="p-1 h-96 bg-secondary">

                            </div>
                        </CarouselItem>

                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <div>
                <h3 class="text-lg">"{{ job?.title }}"</h3>
                <p class="text-muted-foreground mt-5">{{ job?.description }}</p>

                <p>Status: <span class="text-primary">{{ jobAssignment?.status }}</span></p>
                <div v-if="jobAssignment?.status == 'requested'">
                    <Button @click="acceptJobRequest()">Accept Job Request</Button>
                </div>
                <div class="mt-5 grid grid-cols-2 gap-5">
                    <Card>
                        <CardContent>
                            <p class="mb-1 text-muted-foreground">
                                Location
                            </p>

                            <div class="text-lg font-bold">
                                {{ job?.location.description }}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <p class="mb-1 text-muted-foreground">
                                Date
                            </p>

                            <div class="text-lg font-bold">
                                {{ new Intl.DateTimeFormat('en-US', {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                }).format(job?.createdAt.toDate()) }}
                            </div>
                        </CardContent>
                    </Card>


                    <Card>
                        <CardContent>
                            <p class="mb-1 text-muted-foreground">
                                Budget
                            </p>

                            <div class="text-lg font-bold">
                                Php {{ job?.budget.toFixed(2) }}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
        <Separator class="mt-5" />
        <div class="mt-5">
            <div class="flex items-center gap-3">
                <h3 class="text-xl">Progress</h3>
                <Dialog v-if="jobAssignment?.status != 'requested'">
                    <DialogTrigger as-child>
                        <Button>Add Progress</Button>

                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Progress</DialogTitle>
                            <DialogDescription>

                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-4">
                            <div class="grid gap-3">
                                <Label for="name-1">Select Image</Label>
                                <Input type="file" @change="onSelectImage" />
                            </div>
                            <div class="grid gap-3">
                                <Label for="username-1">Note</Label>
                                <Textarea v-model="note"></Textarea>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button @click="addProgress()">
                                Save changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <br>
            <div class="flex flex-col gap-3">
                <Card v-for="value in jobAssignment?.progress">
                    <CardContent>
                        <p>
                            {{ value.note }}
                        </p>
                        <p>
                            {{ value.date }}
                        </p>

                        <div class="text-primary underline cursor-pointer">
                            View Details
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    </div>

    <br>
    <br>
    <br>
</template>