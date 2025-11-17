<script setup lang="ts">
import { RouterLink } from 'vue-router'
import StatSection from './components/StatSection.vue'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item'


</script>

<template>
    <div class="container mx-auto px-5 md:px-0">
        <div class="mt-10">
            <h3 class="text-3xl">Good day, Pedro</h3>
            <p class="text-lg text-muted-foreground">Here’s a quick overview of your latest activity.</p>
        </div>

        <div class="mt-10">
            <StatSection />
        </div>

        <div class="mt-10">
            <p class="mb-5">Recent Activities</p>
            <div class="flex flex-col gap-3">
                <Item variant="outline" as-child>
                    <RouterLink to="#">
                        <ItemContent>
                            <ItemTitle>Basic Item</ItemTitle>
                            <ItemDescription>
                                A simple item with title and description.
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <!-- <Button variant="outline" size="sm">
                                Action
                            </Button> -->
                        </ItemActions>
                    </RouterLink>
                </Item>

                <Item variant="outline" as-child>
                    <RouterLink to="#">
                        <ItemContent>
                            <ItemTitle>Basic Item</ItemTitle>
                            <ItemDescription>
                                A simple item with title and description.
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <!-- <Button variant="outline" size="sm">
                                Action
                            </Button> -->
                        </ItemActions>
                    </RouterLink>
                </Item>

                <Item variant="outline" as-child>
                    <RouterLink to="#">
                        <ItemContent>
                            <ItemTitle>Basic Item</ItemTitle>
                            <ItemDescription>
                                A simple item with title and description.
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <!-- <Button variant="outline" size="sm">
                                Action
                            </Button> -->
                        </ItemActions>
                    </RouterLink>
                </Item>
            </div>
        </div>
    </div>
</template>
