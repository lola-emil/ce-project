<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IconLayoutColumns, IconChevronDown } from '@tabler/icons-vue';
import { Plus } from 'lucide-vue-next';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const range = (size: number) => new Array(size);
</script>

<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <h3 class="text-3xl">Jobs Lists</h3>
            <p class="text-lg text-muted-foreground">Your job creations in one place.</p>
        </div>

        <div class="mt-10">
            <div class="mb-5 flex justify-between border-b py-3">
                <div class="flex items-center gap-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline">
                                <IconLayoutColumns />
                                <span class="hidden lg:inline">Filter Jobs</span>
                                <span class="lg:hidden">Columns</span>
                                <IconChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-56">
                            <DropdownMenuCheckboxItem class="capitalize">
                                Kuan
                            </DropdownMenuCheckboxItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Input placeholder="Search" class="min-w-xs" />

                </div>
                <Button>
                    <Plus />
                    Create job request
                </Button>
            </div>
            <div class="grid grid-cols-3     gap-5">
                <RouterLink v-for="value in range(5)" to="job-details">
                    <Card class="gap-2">
                        <CardHeader>
                            <CardTitle class="text-sm">Bathroom Tile Repair</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <p class="text-muted-foreground text-sm">Status: <Badge variant="outline">Awaiting Order</Badge></p>
                                <p class="text-muted-foreground text-sm">Date: <span>Jan 12, 2026</span></p>
                                <p class="text-muted-foreground text-sm">Budget: <span
                                        class="text-primary">₱3,000</span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                </RouterLink>
            </div>
        </div>
    </div>
</template> 