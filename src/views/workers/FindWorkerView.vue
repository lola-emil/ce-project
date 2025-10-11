<template>
    <AppHeader></AppHeader>

    <main class="px-5 lg:px-28">
        <div class="border-b flex py-14">
            <div class="w-lg">
                <h3 class="text-3xl font-bold">Find & Hire</h3>
                <p>Discover skilled individuals to managing projects all in one place</p>
                <div class="mt-5 flex items-center gap-5">
                    <form action="" class="w-xs">
                        <Input placeholder="Search" />
                    </form>
                    <span class="text-sm">Or</span>
                    <Button>Post a Job</Button>
                </div>

                <div class="mt-2 flex gap-2">
                    <Badge variant="outline">Carpenteros</Badge>
                    <Badge variant="outline">Plumber</Badge>
                    <Badge variant="outline">Welder</Badge>
                    <Badge variant="outline">Tiling</Badge>
                </div>
            </div>

            <div class="">

            </div>
        </div>

        <br>

        <p class="text-lg font-bold">Best Performers</p>
        <div class="grid grid-cols-4 gap-5 mt-3">
            <Card v-for="value in workers">
                <CardHeader>
                    <div class="flex items-center gap-5">
                        <div
                            class="h-20 w-20 bg-muted rounded-full flex items-center justify-center text-2xl font-bold">
                            {{ value.name[0] }}</div>
                        <div>
                            <CardTitle class="text-lg">{{ value.name }}</CardTitle>
                            <p class="text-muted-foreground font-bold text-sm">{{ value.skill }}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter class="flex justify-between">
                    <div class="font-bold">Php {{ value.rate }} / Day</div>
                    <div class="flex gap-2">
                        <Button>Hire</Button>
                        <Button variant="outline" size="icon">
                            <Heart />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    </main>
</template>

<script setup lang="ts">
import AppHeader from '../../components/AppHeader.vue';
import Button from '../../components/ui/button/Button.vue';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card/index";
import { Heart } from 'lucide-vue-next';
import { Badge } from '../../components/ui/badge';


const range = (size: number) => new Array(size);


const workers = [
    {
        profile_img: "",
        name: "Carlos Dela Cruz",
        skill: "Carpentry",
        rate: 550, // PHP per hour
        ratings: 4.5
    },
    {
        name: "Joel Ramirez",
        skill: "Masonry",
        rate: 500,
        ratings: 4.2
    },
    {
        name: "Rico Santos",
        skill: "Electrical Installation",
        rate: 600,
        ratings: 4.8
    },
    {
        name: "Nestor Lim",
        skill: "Plumbing",
        rate: 580,
        ratings: 4.6
    },
    {
        name: "Arnold Bautista",
        skill: "Roofing",
        rate: 520,
        ratings: 4.3
    },
    {
        name: "Manuel Torres",
        skill: "Painting",
        rate: 480,
        ratings: 4.4
    },
    {
        name: "Edgar Navarro",
        skill: "Welding",
        rate: 600,
        ratings: 4.7
    },
    {
        name: "Bobby Aquino",
        skill: "Tiling",
        rate: 530,
        ratings: 4.5
    }
];

</script>