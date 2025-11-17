<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ArrowLeft } from "lucide-vue-next";

</script>

<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-5">
            <Button variant="ghost" size="sm">
                <ArrowLeft/>
                Go back
            </Button>
        </div>
        <div class="mt-5">
            <h3 class="text-2xl">Create Job Request</h3>
        </div>

        <div>

        </div>
    </div>
</template>