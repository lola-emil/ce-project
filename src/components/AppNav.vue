<template>
    <header>
        <div class="border-b">
            <div class="container mx-auto">
                <div class="flex h-16 items-center px-4">
                    <TeamSwitcher />
                    <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
                        <RouterLink to="/admin-dashboard"
                            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                            Overview
                        </RouterLink>
                        <RouterLink to="/user-management"
                            class="text-sm text-muted-foreground font-medium transition-colors hover:text-primary">
                            User Management
                        </RouterLink>
                        <RouterLink to="life-group"
                            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                            Proposals
                        </RouterLink>

                        <RouterLink to="/settings"
                            class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                            Settings
                        </RouterLink>
                    </nav>
                    <div class="ml-auto flex items-center space-x-4">

                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from 'vue-router';
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import LineChart from "@/components/ui/chart-line/LineChart.vue";
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field';
</script>