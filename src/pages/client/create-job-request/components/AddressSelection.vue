<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import type { Suggestion } from '@/types'



// Props and events for v-model
const props = defineProps<{ modelValue?: Suggestion }>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: Suggestion | null): void
}>()

const open = ref(false)
const query = ref(props.modelValue?.description || '')
const suggestions = ref<Suggestion[]>([])
let autocompleteService: google.maps.places.AutocompleteService

// Initialize Google AutocompleteService
onMounted(async () => {
    setOptions({
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    })
    await importLibrary('places')
    autocompleteService = new google.maps.places.AutocompleteService()
})

// Fetch predictions when user types
watch(query, (q) => {
    if (!q) {
        suggestions.value = []
        return
    }
    autocompleteService.getPlacePredictions({ input: q }, (preds, status) => {
        suggestions.value =
            status === google.maps.places.PlacesServiceStatus.OK && preds
                ? preds.map((p) => ({ description: p.description!, place_id: p.place_id! }))
                : []
    })
})

// Select a suggestion
async function selectSuggestion(item: Suggestion) {
    query.value = item.description
    open.value = false

    // Fetch lat/lng
    const service = new google.maps.places.PlacesService(document.createElement('div'))
    service.getDetails({ placeId: item.place_id }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
            item.lat = place?.geometry.location.lat()
            item.lng = place?.geometry.location.lng()
            emit('update:modelValue', item)
        }
    })
}
</script>

<template>
        <Popover v-model:open="open">
            <PopoverTrigger as-child>
                <Button variant="outline" role="combobox" :aria-expanded="open" class="w-sm justify-between truncate">
                    {{ query || 'Enter address...' }}
                    <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent class="w-xl p-0">
            <Command>
                <CommandInput placeholder="Type address..." v-model="query" @keydown.enter.prevent="open = false" />
                <CommandList>
                    <CommandEmpty>No addresses found.</CommandEmpty>
                    <CommandGroup>
                        <CommandItem v-for="item in suggestions" :key="item.place_id" :value="item.description"
                            @select="() => selectSuggestion(item)">
                            <CheckIcon class="mr-2 h-4 w-4"
                                :class="query === item.description ? 'opacity-100' : 'opacity-0'" />
                            {{ item.description }}
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>
