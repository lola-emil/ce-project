<script setup lang="ts">
import { RouterLink } from 'vue-router';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'

</script>

<template>
    <div class="w-full h-[72px]">
        <div class="container mx-auto flex items-center h-full justify-between px-5 md:px-0">
            <div class="flex items-center gap-5">
                <div class="font-bold">Prodigify</div>
                <div class="hidden md:block">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem as-child>
                                <RouterLink to="/">
                                    <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                                        Home
                                    </NavigationMenuLink>
                                </RouterLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem as-child>
                                <RouterLink to="/about">
                                    <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                                        About
                                    </NavigationMenuLink>
                                </RouterLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem as-child>
                                <RouterLink to="/contact">
                                    <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                                        Contact Us
                                    </NavigationMenuLink>
                                </RouterLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem as-child>
                                <RouterLink to="/faqs">
                                    <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                                        FAQs
                                    </NavigationMenuLink>
                                </RouterLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            <div class="hidden md:block">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem as-child>
                            <RouterLink to="/login">
                                <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                                    Login
                                </NavigationMenuLink>
                            </RouterLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem as-child>
                            <RouterLink to="/register">
                                <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                                    Create an Account
                                </NavigationMenuLink>
                            </RouterLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    </div>
</template>