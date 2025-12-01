<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { useCollection, useDocument } from 'vuefire';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import type { JobAssignment, JobRequest, User } from '@/types/schema';
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
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';


const route = useRoute();


// Get job data
const jobId = String(route.params.id);
const jobRef = doc(db, "job_requests", jobId);
const {
    data: job,
} = useDocument<JobRequest>(jobRef);

const jobAssignment = ref<JobAssignment>();
const assignedWorker = ref<User>();

const assignWorkerPopOverOpen = ref(false);
const workerSelectionValue = ref('')

function selectWorker(selectedValue: string) {
    workerSelectionValue.value = selectedValue === workerSelectionValue.value ? '' : selectedValue
    assignWorkerPopOverOpen.value = false
}

const userRef = query(collection(db, "users"), where("role", "==", "worker"));
const users = useCollection<User>(userRef);


const selectedWorker = computed(() =>
    users.value.find(user => user.id === workerSelectionValue.value),
)

async function assignJobToUser() {
    const body = {
        jobId,
        workerId: selectedWorker.value?.uid,

        assignedAt: serverTimestamp(),
        status: "requested",

        progress: [],
    };

    await addDoc(collection(db, "job_assignments"), body);

    location.reload();
}


watch(users.data, () => {
    console.log(users.data.value);
})


// Para kuha sa assigned worker
watch(job, async () => {
    try {
        console.log('Job ID:', job.value?.id);  // Ensure job.value?.id is correct

        const assignedWorkerRef = query(
            collection(db, "job_assignments"),
            where("jobId", "==", job.value?.id)
        );

        const jobAssignmentDoc = await getDocs(assignedWorkerRef);

        if (jobAssignmentDoc.docs[0]) {
            jobAssignment.value = jobAssignmentDoc.docs[0].data() as JobAssignment | undefined;

            const worker = await getDoc(doc(db, "users", jobAssignment.value!.workerId));

            if (worker.exists())
                assignedWorker.value = worker.data() as User;
        }
    } catch (error) {
        // Catch and log the error
        console.error('Error fetching assigned workers:', (<any>error).message);
        if ((<any>error).code) {
            console.error('Firestore error code:', (<any>error).code);
        }
    }
});


</script>

<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <Button variant="link" as-child>
                <RouterLink to="/admin/worker-assignment-console">
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

                <div class="mt-5">
                    <p>Status: <span class="text-primary">{{ job?.status }}</span></p>
                    <div v-if="assignedWorker">
                        Assigned worker:
                        <RouterLink :to="'/profile/' + assignedWorker.uid">
                            <span class="text-primary underline">
                                {{ `${assignedWorker.name?.firstname} ${assignedWorker.name?.lastname}` }}
                            </span>
                        </RouterLink>
                    </div>
                    <Dialog v-else>
                        <form>
                            <DialogTrigger as-child>
                                <Button size="sm" class="mt-3">Assign worker</Button>
                            </DialogTrigger>
                            <DialogContent class="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Assign to worker</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're
                                        done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div class="grid gap-4">
                                    <div class="grid gap-3">
                                        <Popover v-model:open="assignWorkerPopOverOpen">
                                            <PopoverTrigger as-child>
                                                <Button variant="outline" role="combobox"
                                                    :aria-expanded="assignWorkerPopOverOpen"
                                                    class="w-sm justify-between">
                                                    {{ selectedWorker ? `${selectedWorker?.name?.firstname}
                                                    ${selectedWorker?.name?.lastname}` : "Select worker..." }}
                                                    <ChevronsUpDownIcon class="opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent class="w-sm p-0">
                                                <Command>
                                                    <CommandInput class="h-9" placeholder="Search framework..." />
                                                    <CommandList>
                                                        <CommandEmpty>No worker found.</CommandEmpty>
                                                        <CommandGroup>
                                                            <CommandItem v-for="worker in users" :key="worker.email"
                                                                :value="worker.id" @select="(ev) => {
                                                                    selectWorker(ev.detail.value as string)
                                                                }">
                                                                {{ `${worker.name?.firstname}
                                                                ${worker.name?.lastname}` }}
                                                                <CheckIcon :class="cn(
                                                                    'ml-auto',
                                                                    workerSelectionValue === worker.id ? 'opacity-100' : 'opacity-0',
                                                                )" />
                                                            </CommandItem>
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose as-child>
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit" @click="assignJobToUser()">
                                        Save
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
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

                        <div class="text-primary underline cursor-pointer">
                            View Details
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    </div>
</template>