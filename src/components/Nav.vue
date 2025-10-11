<template>
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink v-for="nav in navigation" as-child :class="navigationMenuTriggerStyle()">
                    <RouterLink :to="nav.href">
                        {{ nav.title }}
                    </RouterLink>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>


<script setup lang="ts">
import { RouterLink } from "vue-router";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu"


const navigation: {
    title: string;
    href: string;
}[] = [
        {
            title: "Find Workers",
            href: "/find-workers"
        },

        {
            title: "Posted Projects",
            href: "/posted-projects"
        },

        {
            title: "FAQs",
            href: "/faq"
        }
    ];
</script>