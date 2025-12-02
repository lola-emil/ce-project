<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { useDocument } from 'vuefire';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { JobAssignment, JobRequest, User } from '@/types/schema';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'vue-sonner';

const route = useRoute();
const router = useRouter();

const jobId = String(route.params.id);

const jobRef = doc(db, "job_requests", jobId);
const {
    data: job,
} = useDocument<JobRequest>(jobRef);

const jobAssignment = ref<JobAssignment>();
const assignedWorker = ref<User>();

watch(job, async () => {
    const jobAssignmentRef = query(collection(db, "job_assignments"), where("jobId", "==", jobRef.id));
    const jobAssignmentSnap = await getDocs(jobAssignmentRef);

    jobAssignment.value = {
        id: jobAssignmentSnap.docs[0]?.id,
        ...jobAssignmentSnap.docs[0]?.data()
    } as JobAssignment;

    console.log("Hoe lee cow", jobAssignment.value);

    const assignedWorkerRef = await getDoc(doc(db, "users", jobAssignment.value.workerId));

    if (assignedWorkerRef.exists()) {
        assignedWorker.value = assignedWorkerRef.data() as User;
        console.log("Hoe lee sheet", assignedWorkerRef.data());
    }
})

const note = ref("");


async function markAsRework() {
    if (!jobAssignment.value) {
        toast("Job detail did not load properly");
        return;
    };

    const assignmentDoc = doc(db, "job_assignments", jobAssignment.value?.id);
    const assignment = await getDoc(assignmentDoc);

    if (assignment.exists()) {
        const data = assignment.data() as JobAssignment;
        const currentProgress = data.progress;

        // Save ang progress
        currentProgress.push({
            note: note.value,
            date: (new Date()).toLocaleDateString(),
            type: "rework"
        });

        await updateDoc(assignmentDoc, {
            progress: currentProgress,
            status: "rework"
        });


        await updateDoc(jobRef, {
            status: "in-progress"
        })

        toast('Success');

        location.reload();
    }
}

async function approveCompletion() {
    if (!jobAssignment.value) {
        toast("Job detail did not load properly");
        return;
    };

    const assignmentDoc = doc(db, "job_assignments", jobAssignment.value?.id);
    const assignment = await getDoc(assignmentDoc);

    if (assignment.exists()) {
        await updateDoc(assignmentDoc, {
            status: "completed"
        });

        await updateDoc(jobRef, {
            status: "completed"
        });
        // TODO: add ang bayad sa account sa user

        toast('Success');
        location.reload();
    }
}

async function deleteRequest() {
    alert("shit");
    await deleteDoc(jobRef);
    toast("Deleted");

    router.replace("/client/my-jobs")
}

</script>

<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <Button variant="link" as-child>
                <RouterLink to="/client/my-jobs">
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
                <div class="flex items-center gap-3">
                    <h3 class="text-lg">"{{ job?.title }}"</h3>

                    <AlertDialog>
                        <AlertDialogTrigger as-child>
                            <Button v-if="job?.status == 'in-progress' || job?.status == 'pending'" size="sm">Cancel
                                request</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your request.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction @click="deleteRequest">Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <p class="text-muted-foreground mt-5">{{ job?.description }}</p>

                <p>Status: <span class="text-primary">{{ job?.status }}</span></p>
                <div v-if="assignedWorker">
                    Assigned worker:
                    <RouterLink :to="'/profile/' + assignedWorker.uid">
                        <span class="text-primary underline">
                            {{ `${assignedWorker.name?.firstname} ${assignedWorker.name?.lastname}` }}
                        </span>
                    </RouterLink>
                </div>

                <Dialog>
                    <DialogTrigger as-child>
                        <Button v-if="job?.status == 'marked as complete'" size="sm" class="mt-4">View
                            completion</Button>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Completion</DialogTitle>
                            <DialogDescription>

                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-4">
                            <div class="grid gap-3">
                                <img :src="jobAssignment?.progress[jobAssignment?.progress.length - 1]?.imgUrl" alt="">
                            </div>
                            <div class="grid gap-3">
                                <Label for="username-1">Description</Label>
                                <div>
                                    {{ jobAssignment?.progress[jobAssignment?.progress.length - 1]?.note }}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <!-- <DialogClose as-child>
                                <Button variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose> -->

                            <!-- I RENAME NI BWESIT -->

                            <Dialog>
                                <DialogTrigger as-child>
                                    <Button variant="secondary">
                                        Rework
                                    </Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Add rework note</DialogTitle>
                                        <DialogDescription>

                                        </DialogDescription>
                                    </DialogHeader>
                                    <div class="grid gap-4">
                                        <div class="grid gap-3">
                                            <Textarea v-model="note"></Textarea>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose as-child>
                                            <Button variant="outline">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button @click="markAsRework()">
                                            Save changes
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Button @click="approveCompletion">
                                Approve
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
        <div class="mt-5">
            <div class="flex items-center gap-3">
                <h3 class="text-xl">Progress</h3>
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

                        <Dialog>
                            <DialogTrigger as-child>
                                <div class="text-primary underline cursor-pointer">
                                    View Details
                                </div>
                            </DialogTrigger>
                            <DialogContent class="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Details</DialogTitle>
                                    <DialogDescription>

                                    </DialogDescription>
                                </DialogHeader>
                                <div class="grid gap-4">
                                    <div class="grid gap-3">
                                        <img :src="value?.imgUrl" alt="">
                                    </div>
                                    <div class="grid gap-3">
                                        <Label for="username-1">Description</Label>
                                        <div>
                                            {{ value?.note }}
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose as-child>
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    </DialogClose>


                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>

            </div>
        </div>
    </div>

    <br>
    <br>
    <br>
</template>