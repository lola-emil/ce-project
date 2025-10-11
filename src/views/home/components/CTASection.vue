<template>
    <section class="px-5 lg:px-28">
        <Card class="w-full p-10 ">
            <CardContent class="flex flex-col gap-10 items-center justify-center min-h-60">
                <h3 class="text-center text-4xl font-bold">Start Building Your Future with BuildCare Today.</h3>
                <div class="flex gap-5">
                    <RouterLink as-child to="/signup">
                        <Button size="lg">Create Account</Button>
                    </RouterLink>
                    <Button size="lg" variant="secondary">Learn More</Button>
                </div>
            </CardContent>
        </Card>
    </section>
</template>

<script setup lang="ts">
import Button from '../../../components/ui/button/Button.vue';
import { RouterLink } from 'vue-router';
import Card from '../../../components/ui/card/Card.vue';

</script>