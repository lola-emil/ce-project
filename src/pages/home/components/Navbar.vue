<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

</script>

<template>
    <div class="w-full h-[72px]">
        <div class="container mx-auto flex items-center h-full justify-between">
            <div class="flex items-center gap-5">
                <div class="font-bold">Logo</div>
                <div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/docs/introduction" :class="navigationMenuTriggerStyle()">
                                    Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink href="/docs/introduction" :class="navigationMenuTriggerStyle()">
                                    About
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink href="/docs/introduction" :class="navigationMenuTriggerStyle()">
                                    Contact Us
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            <div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/docs/introduction" :class="navigationMenuTriggerStyle()">
                                Login
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink href="/docs/introduction" :class="navigationMenuTriggerStyle()">
                                Create an Account
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    </div>
</template>