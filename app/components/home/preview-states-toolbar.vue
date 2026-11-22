<template>
  <div class="flex flex-col sm:flex-row sm:items-center gap-2 bg-app-surface-subtle rounded-2xl p-1.5 ps-3.5 text-xs">
    <div class="flex items-center gap-2 shrink-0 font-bold text-app-text-primary py-1.5">
      <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-app-primary" />
      <span>Interactive Preview States:</span>
    </div>
    <div class="flex items-center gap-1 overflow-x-auto">
      <button v-for="s in states" :key="s.value" type="button" :aria-pressed="modelValue === s.value" :class="[
        'px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors focus-ring',
        modelValue === s.value
          ? 'bg-app-surface text-app-primary shadow-xs'
          : 'text-app-text-secondary hover:text-app-text-primary',
      ]" @click="emit('update:modelValue', s.value)">
        {{ s.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppState } from '~/types/home'

defineProps<{ modelValue: AppState }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: AppState): void }>()

const states: { value: AppState; label: string }[] = [
  { value: 'active-sleep', label: 'Active Sleep' },
  { value: 'baby-awake', label: 'Awake (Idle)' },
  { value: 'first-run', label: 'First-Run (Empty)' },
  { value: 'loading', label: 'Loading' },
]
</script>
