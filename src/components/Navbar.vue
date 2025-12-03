<template>
    <header>
        <div class="border-b">
            <div class="flex w-9/12 mx-auto h-16 items-center justify-between">
                <div class="font-bold">
                    <img src="/logo.png" alt="Logo" class="h-5">
                </div>
                <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink>Services</NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink>About Us</NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink>FAQs</NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>
                <div>
                    <Button size="sm">Sign In</Button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import Button from '@/components/ui/button/Button.vue';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";

</script>