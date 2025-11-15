<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { cn } from "@/lib/utils";
</script>

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
