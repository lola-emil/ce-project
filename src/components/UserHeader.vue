<template>
    <header class=" w-full">
        <div class="flex h-16 items-center justify-between px-4 border-b w-full">
            <!-- LOGO -->
            <div class="flex-1 flex items-center">
                <RouterLink to="/" class="font-bold">BuildCare</RouterLink>
            </div>


            <div class="flex-1 flex justify-end gap-5">
                <Input placeholder="Find Workers" class="w-sm" size="sm"></Input>
                <div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <RouterLink to="/messaging">
                                                <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                                                    <MessageSquare />
                                                </NavigationMenuLink>
                                            </RouterLink>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Messages</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>


                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                                                <Bell />
                                            </NavigationMenuLink>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Notifications</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <Avatar>
                    <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    </header>
</template>


<script setup lang="ts">
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RouterLink } from 'vue-router';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Bell, MessageSquare } from "lucide-vue-next";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from './ui/tooltip';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu"


const components: { title: string, href: string, description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/components/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/components/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/components/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/components/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/components/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/components/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

</script>