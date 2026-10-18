<template>
  <div
    class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-app-surface border border-app-border rounded-2xl p-2 px-3.5 text-xs">
    <!-- Left label -->
    <div class="flex items-center gap-2 shrink-0">
      <Icon name="lucide:sliders-horizontal" class="w-3.5 h-3.5 text-app-primary" />
      <span class="font-bold text-app-text-primary">Interactive Preview:</span>
      <span class="text-app-text-secondary hidden md:inline">Click to preview states</span>
    </div>

    <!-- State pills -->
    <div class="flex items-center gap-1 overflow-x-auto">
      <button v-for="st in states" :key="st.id" @click="emit('update:modelValue', st.id)" :class="[
        'px-3 py-1.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-colors',
        modelValue === st.id
          ? 'bg-app-primary-soft text-app-primary shadow-xs'
          : 'text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle'
      ]">
        {{ st.label }}
      </button>
    </div>

    <!-- Sync status -->
    <div class="hidden lg:flex items-center gap-1.5 text-app-text-secondary shrink-0">
      <span class="w-2 h-2 rounded-full bg-app-success"></span>
      <span class="text-[11px] font-medium">Calm Sync • Cloud Saved</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HistoryPreviewState } from '~/types/history';

defineProps<{
  modelValue: HistoryPreviewState;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: HistoryPreviewState): void;
}>();

const states = [
  { id: 'populated' as const, label: 'Populated Day (7)' },
  { id: 'empty' as const, label: 'Empty Day' },
  { id: 'filter-empty' as const, label: 'Filter Empty' },
  { id: 'skeleton' as const, label: 'Loading Skeleton' },
] satisfies { id: HistoryPreviewState; label: string }[];
</script>