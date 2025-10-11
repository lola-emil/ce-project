<template>
    <AppHeader></AppHeader>
    <!-- <p>This is for the job postings</p> -->

    <main class="px-5 lg:px-28">
        <div class="border-b flex py-14">
            <div class="w-lg">
                <h3 class="text-3xl font-bold">Find Postings</h3>
                <p>Find postings that suites your skills.</p>
                <div class="mt-5 flex items-center gap-5">
                    <form action="" class="w-xs">
                        <Input placeholder="Search" />
                    </form>
                    <span class="text-sm">Or</span>
                    <Button>Join as a worker</Button>
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
    </main>
</template>

<script setup lang="ts">
import AppHeader from '../../components/AppHeader.vue';
import { Input } from '../../components/ui/input';

import Button from '../../components/ui/button/Button.vue';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card/index";
import { Heart } from 'lucide-vue-next';
import { Badge } from '../../components/ui/badge';
</script>