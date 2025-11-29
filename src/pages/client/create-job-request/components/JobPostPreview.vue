<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import Separator from '@/components/ui/separator/Separator.vue';
import type { Suggestion } from '@/types';
import { useCurrentUser } from 'vuefire';


interface ImageItem {
    file: File;
    url: string;
}

const props = defineProps<{
    images: ImageItem[],
    title: string,
    description: string,
    location?: Suggestion,
    budget: number
}>();

const user = useCurrentUser()

</script>

<template>
    <div class="container mx-auto">
        <div class="flex justify-center">

        </div>

        <div class="flex flex-col items-center">
            <Card class="mt-3">
                <CardContent class="px-16">
                    <div class="flex flex-col items-center">
                        <p class="text-lg mb-3">Preview</p>

                        <Carousel class="w-xl">
                            <CarouselContent>
                                <CarouselItem v-if="images.length > 0" v-for="(image, i) in props.images" :key="i">
                                    <div class="p-1 h-96">
                                        <img :src="image.url" alt="preview" class="h-full w-full object-contain">
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
                        <Separator class="my-5" />
                        <div class="w-full">
                            <h3 class="text-lg">{{ title }}</h3>
                            <div class="text-xs text-muted-foreground">Client: <RouterLink to="" class="text-primary hover:underline">{{ user?.email }}</RouterLink></div>
                            <p class="w-lg mt-3 text-muted-foreground text-sm">{{ description }}</p>
                        </div>

                        <div class="w-full mt-5">
                            <p>Location</p>

                            <div class="mt-2 text-sm">
                                <p class="">{{ location?.description }}</p>
                                <p>lat: <span>{{ location?.lat }}</span></p>
                                <p>long: <span>{{ location?.lng }}</span></p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    </div>
</template>