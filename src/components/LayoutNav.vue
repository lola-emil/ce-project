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
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useLocaleStore } from '@/stores/localeStore';
import { ref, watch } from 'vue';

interface Route {
    path: string;
    title: string;
};

const props = defineProps<{
    menuItems: Route[]
}>();

const authStore = useAuthStore();
const localeStore = useLocaleStore();
const selectedLanguage = ref(localeStore.locale);

watch(selectedLanguage, (newValue) => {
    let localeCode = 'en';
    if (newValue === 'fil') localeCode = 'fil';
    else if (newValue === 'ceb') localeCode = 'ceb';

    localeStore.setLocale(localeCode as any);
});

</script>

<template>
    <header>
        <div class="border-b">
            <div class="flex container mx-auto h-16 items-center justify-between px-5 md:px-0">
                <div :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
                    <div class="font-bold">
                        <img src="/logo.png" alt="Logo" class="h-6">
                    </div>
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

                <div class="hidden md:block md:flex items-center gap-3">
                    <Select v-model="selectedLanguage">
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Change Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="en">
                                    English
                                </SelectItem>
                                <SelectItem value="fil">
                                    Tagalog
                                </SelectItem>
                                <SelectItem value="ceb">
                                    Cebuano
                                </SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline" @click="authStore.logout()">
                        <LogOut /> Log Out
                    </Button>
                </div>

                <div class="md:hidden flex items-center gap-3">
                    <Select>
                        <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Change Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="English">
                                    English
                                </SelectItem>
                                <SelectItem value="Tagalog">
                                    Tagalog
                                </SelectItem>
                                <SelectItem value="Cebuano">
                                    Cebuano
                                </SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="authStore.logout()">
                                <LogOut /> Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </div>
    </header>
</template>
