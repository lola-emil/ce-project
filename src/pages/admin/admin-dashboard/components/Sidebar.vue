<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LayoutDashboard } from 'lucide-vue-next'

type Playlist = (typeof playlists)[number]
const playlists = [
    'Recently Added',
    'Recently Played',
    'Top Songs',
    'Top Albums',
    'Top Artists',
    'Logic Discography',
    'Bedtime Beats',
    'Feeling Happy',
    'I miss Y2K Pop',
    'Runtober',
    'Mellow Days',
    'Eminem Essentials',
]


interface SidebarProps {
    playlists: Playlist[]
}

defineProps<SidebarProps>()
</script>


<template>
    <div :class="cn('pb-12', $attrs.class ?? '')">
        <div class="space-y-4 py-4">
            <div class="px-3 py-2">
                <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Menu
                </h2>
                <div class="space-y-1">

                    <Button variant="ghost" class="w-full justify-start">
                        <LayoutDashboard :strokeWidth="1"/>
                        Dashboard
                    </Button>

                    <Button variant="ghost" class="w-full justify-start">
                        User Management
                    </Button>

                    <Button variant="ghost" class="w-full justify-start">
                        Job Management
                    </Button>

                    <Button variant="ghost" class="w-full justify-start">
                        Worker Assignment
                    </Button>

                    <Button variant="ghost" class="w-full justify-start">
                        Categories
                    </Button>

                    <Button variant="ghost" class="w-full justify-start">
                        Payments
                    </Button>

                    <Button variant="ghost" class="w-full justify-start">
                        Settings
                    </Button>

                </div>
            </div>
        </div>
    </div>
</template>
