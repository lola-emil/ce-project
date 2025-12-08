<script setup lang="ts">
import { db } from '@/firebase';
import type { Rating, User } from '@/types/schema';
import { doc } from 'firebase/firestore';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocument } from 'vuefire';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const userRef = doc(db, "users", String(route.params.id));
const {
    data: user
} = useDocument<User>(userRef);

function deepMerge(target: any, source: any) {
    for (const key in source) {
        if (
            source[key] &&
            typeof source[key] === "object" &&
            !Array.isArray(source[key])
        ) {
            if (!target[key]) target[key] = {}
            deepMerge(target[key], source[key])
        } else {
            target[key] = source[key]
        }
    }
}

watch(
    () => user.value,
    (val) => {
        if (val) {
            userForm.value = { ...val }; // shallow copy is enough
        }
    },
    { immediate: true }
);

const userForm = ref<User | null>(null);


const ratings = ref<Rating[]>([]);
const averageRating = computed(() => {
    if (!ratings.value.length) return 0;

    const sum = ratings.value.reduce((total, r) => total + r.rate, 0);
    return sum / ratings.value.length;
});

onMounted(async () => {
    ratings.value = user.value?.ratings ?? [];
})

</script>

<template>
    <div class="container mx-auto">
        <Button variant="link" class="mt-10" @click="router.go(-1)">
            <ArrowLeft /> Go back
        </Button>
        <div class="mt-10">
            <div>
                <p class="text-2xl font-bold">{{ user?.name?.firstname }} {{ user?.name?.lastname }}</p>
                <p>{{ user?.role }}</p>
                <br>
                <div class="flex items-center gap-3">
                    <span>Rating:</span>
                    <span v-if="averageRating" class="text-primary">
                        {{ averageRating }}
                    </span>
                    <span v-else class="text-primary">
                        No ratings yet.
                    </span>
                </div>
            </div>
            <Separator class="my-10" />
            <Card>
                <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="grid grid-cols-2 gap-5">
                        <Field>
                            <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                            <Input id="firstname" v-model="userForm!.name!.firstname" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="middlename">Middle Name</FieldLabel>
                            <Input id="middlename" v-model="userForm!.name!.middlename" name="middlename" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                            <Input id="lastname" v-model="userForm!.name!.lastname" />
                            <FieldError />
                        </Field>
                    </div>
                </CardContent>
            </Card>

            <br>

            <Card>
                <CardHeader>
                    <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="grid grid-cols-2 gap-5">
                        <Field>
                            <FieldLabel htmlFor="addressline1">Address Line 1</FieldLabel>
                            <Input id="addressline1" v-model="userForm!.address[0]!.addressLine1" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="addressline2">Address Line 2</FieldLabel>
                            <Input id="addressline2" name="" v-model="userForm!.address[0]!.addressLine2" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="city">City/Municipality</FieldLabel>
                            <Input id="city" v-model="userForm!.address[0]!.city" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="lastname">Province</FieldLabel>
                            <Input id="lastname" v-model="userForm!.address[0]!.province" />
                            <FieldError />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="lastname">Zip Code</FieldLabel>
                            <Input id="lastname" v-model="userForm!.address[0]!.zipCode" />
                            <FieldError />
                        </Field>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
</template>