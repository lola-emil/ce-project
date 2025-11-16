<script setup lang="ts">
import { cn } from '@/utils/util';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from './ui/button';
import { LogOut } from 'lucide-vue-next';

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
            <div class="flex container mx-auto h-16 items-center justify-between">
                <div :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
                    <div class="font-bold">Prodigify</div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem v-for="value in props.menuItems" as-child>
                                <RouterLink :to="value.path">
                                    <NavigationMenuLink>{{ value.title }}</NavigationMenuLink>
                                </RouterLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div>
                    <Button size="sm" variant="outline"><LogOut/> Sign Out</Button>
                </div>
            </div>
        </div>
    </header>
</template>