<script setup lang="ts">
import { cn } from '@/utils/util';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from './ui/button';
import { LogOut } from 'lucide-vue-next';
import { Menu } from 'lucide-vue-next';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Route {
    path: string;
    title: string;
};

const props = defineProps<{
    menuItems: Route[]
}>();

</script>


<template>
    <header>
        <div class="border-b">
            <div class="flex container mx-auto h-16 items-center justify-between px-5 md:px-0">
                <div :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
                    <div class="font-bold">Prodigify</div>
                    <NavigationMenu class="hidden md:block">
                        <NavigationMenuList>
                            <NavigationMenuItem v-for="value in props.menuItems" as-child>
                                <RouterLink :to="value.path">
                                    <NavigationMenuLink>{{ value.title }}</NavigationMenuLink>
                                </RouterLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div class="hidden md:block">
                    <Button size="sm" variant="outline">
                        <LogOut /> Sign Out
                    </Button>
                </div>

                <div class="md:hidden">

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="ghost">
                                <Menu />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator /> -->
                            <DropdownMenuItem v-for="value in props.menuItems" as-child>
                                <RouterLink :to="value.path">{{ value.title }}</RouterLink>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem as-child>
                                <RouterLink to=""><LogOut/> Sign Out</RouterLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </div>
    </header>
</template>