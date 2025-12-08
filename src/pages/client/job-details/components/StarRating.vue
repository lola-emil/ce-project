<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Star } from 'lucide-vue-next'

interface Props {
  max?: number
  modelValue?: number
  size?: number
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  max: 5,
  modelValue: 0,
  size: 40,
  disabled: false,
})

const emit = defineEmits(['update:modelValue'])

const hoverValue = ref<number | null>(null)

const currentValue = computed(() => hoverValue.value ?? props.modelValue)

const setValue = (val: number) => {
  if (props.disabled) return
  emit('update:modelValue', val)
}

const onMouseEnter = (val: number) => {
  if (props.disabled) return
  hoverValue.value = val
}

const onMouseLeave = () => {
  hoverValue.value = null
}
</script>

<template>
  <TooltipProvider>
    <div class="flex items-center gap-1">
      <template v-for="n in props.max" :key="n">
        <Tooltip>
          <TooltipTrigger>
            <button
              type="button"
              class="focus:outline-none"
              :disabled="props.disabled"
              @mouseenter="onMouseEnter(n)"
              @mouseleave="onMouseLeave"
              @click="setValue(n)"
            >
              <Star
                :size="props.size"
                class="transition-colors"
                :class="cn(
                  currentValue >= n
                    ? 'fill-yellow-400 text-yellow-500'
                    : 'text-muted-foreground',
                  props.disabled && 'opacity-50 cursor-not-allowed'
                )"
              />
            </button>
          </TooltipTrigger>
          <TooltipContent class="text-xs">
            {{ n }} / {{ props.max }}
          </TooltipContent>
        </Tooltip>
      </template>
    </div>
  </TooltipProvider>
</template>
