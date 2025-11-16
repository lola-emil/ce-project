<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-vue-next';

</script>

<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <Button variant="ghost" as-child>
                <RouterLink to="my-jobs">
                    <ChevronLeft/> Go back
                </RouterLink>
            </Button>
        </div>
        <div class="grid grid-cols-2 gap-5 mt-36">
            <div>
                <h3 class="text-xl">"Bathroom Tile Repair"</h3>
                <p class="text-muted-foreground mt-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus
                    blanditiis voluptates aut atque unde fugit a veritatis, molestiae non omnis, rerum natus quae
                    explicabo adipisci quos sed laudantium consequuntur ad.</p>

                <div class="mt-5 grid grid-cols-2 gap-5">
                    <Card>
                        <CardContent>
                            <p class="mb-1 text-muted-foreground">
                                Team Size
                            </p>

                            <div class="text-lg font-bold">
                                5
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <p class="mb-1 text-muted-foreground">
                                Location
                            </p>

                            <div class="text-lg font-bold">
                                Poblacion, Carmen
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <p class="mb-1 text-muted-foreground">
                                Date
                            </p>

                            <div class="text-lg font-bold">
                                Jan 21, 2026        
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div class="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                <div class="break-inside-avoid rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <img class="" src="https://i.pinimg.com/736x/2a/31/d4/2a31d4370011d6946d0928e6f3d9514e.jpg" alt="">
                </div>

                <div class="break-inside-avoid rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <img src="https://i.pinimg.com/1200x/f8/92/c3/f892c3f4139bb4b532831b4d0a8a663e.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>