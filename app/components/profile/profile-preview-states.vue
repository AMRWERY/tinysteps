<template>
  <div
    class="flex flex-col md:flex-row md:items-center gap-2 bg-app-surface-subtle rounded-2xl p-1.5 md:ps-4 text-xs">
    <div class="flex items-center justify-between gap-2 shrink-0 font-bold uppercase tracking-wider text-app-text-secondary py-1.5 px-2 md:px-0">
      <span class="flex items-center gap-2">
        <Icon name="lucide:sliders-horizontal" class="w-3.5 h-3.5" />
        <span class="hidden md:inline">Preview state:</span>
        <span class="md:hidden normal-case tracking-normal">Interactive Screen States</span>
      </span>
      <span class="md:hidden normal-case tracking-normal font-medium">Tap to toggle</span>
    </div>
    <div class="flex items-center gap-1 overflow-x-auto no-scrollbar md:ms-auto">
      <button v-for="s in states" :key="s.value" type="button" :aria-pressed="modelValue === s.value" :class="[
        'px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors focus-ring flex items-center gap-1.5',
        modelValue === s.value
          ? 'bg-app-surface text-app-primary shadow-xs max-md:bg-app-primary max-md:text-white'
          : 'text-app-text-secondary hover:text-app-text-primary',
      ]" @click="emit('update:modelValue', s.value)">
        <Icon v-if="s.icon" :name="s.icon" class="w-3.5 h-3.5" />
        {{ s.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfilePreviewState } from '~/types/profile'

defineProps<{ modelValue: ProfilePreviewState }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: ProfilePreviewState): void }>()

const states: { value: ProfilePreviewState; label: string; icon?: string }[] = [
  { value: 'saved', label: 'Saved Profile' },
  { value: 'edit', label: 'Edit Mode' },
  { value: 'first-time', label: 'First-Time Setup' },
  { value: 'error', label: 'Validation Error' },
  { value: 'toast', label: 'Toast Demo', icon: 'lucide:bell-ring' },
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
