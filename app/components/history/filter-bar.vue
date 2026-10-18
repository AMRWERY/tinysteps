<template>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <!-- Filter pills -->
    <div class="flex items-center gap-1.5 flex-wrap">
      <!-- All -->
      <button @click="emit('update:modelValue', 'all')"
        :class="['px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors',
          modelValue === 'all' ? 'bg-app-primary text-white shadow-xs' : 'bg-app-surface border border-app-border text-app-text-secondary hover:text-app-text-primary']">
        All ({{ allCount }})
      </button>

      <!-- Feeding -->
      <button @click="emit('update:modelValue', 'feed')"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors',
          modelValue === 'feed' ? 'bg-app-primary text-white shadow-xs' : 'bg-app-surface border border-app-border text-app-text-secondary hover:text-app-text-primary']">
        <span :class="['w-2 h-2 rounded-full', modelValue === 'feed' ? 'bg-white' : 'bg-app-accent']"></span>
        Feeding ({{ feedCount }})
      </button>

      <!-- Sleep -->
      <button @click="emit('update:modelValue', 'sleep')"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors',
          modelValue === 'sleep' ? 'bg-app-primary text-white shadow-xs' : 'bg-app-surface border border-app-border text-app-text-secondary hover:text-app-text-primary']">
        <span :class="['w-2 h-2 rounded-full', modelValue === 'sleep' ? 'bg-white' : 'bg-app-primary']"></span>
        Sleep ({{ sleepCount }})
      </button>

      <!-- Diapers -->
      <button @click="emit('update:modelValue', 'diaper')"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors',
          modelValue === 'diaper' ? 'bg-app-primary text-white shadow-xs' : 'bg-app-surface border border-app-border text-app-text-secondary hover:text-app-text-primary']">
        <span :class="['w-2 h-2 rounded-full', modelValue === 'diaper' ? 'bg-white' : 'bg-app-warning']"></span>
        Diapers ({{ diaperCount }})
      </button>
    </div>

    <!-- Reverse order toggle -->
    <button @click="emit('update:isReversed', !isReversed)"
      class="flex items-center gap-1.5 text-xs font-semibold text-app-text-secondary hover:text-app-text-primary transition-colors">
      <Icon name="lucide:arrow-up-down" class="w-3.5 h-3.5" />
      <span>{{ isReversed ? 'Reverse order' : 'Reverse order' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { HistoryFilter } from '~/types/history';

defineProps<{
  modelValue: HistoryFilter;
  allCount: number;
  feedCount: number;
  sleepCount: number;
  diaperCount: number;
  isReversed: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: HistoryFilter): void;
  (e: 'update:isReversed', val: boolean): void;
}>();
</script>