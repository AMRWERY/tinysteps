<template>
  <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
    <!-- Title Block -->
    <div>
      <div
        class="flex items-center gap-1.5 text-[11px] font-bold text-app-text-secondary uppercase tracking-wider mb-1.5">
        <Icon name="lucide:calendar-check" class="w-3.5 h-3.5 text-app-primary" />
        <span>Maya's Daily Logbook</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-app-text-primary leading-tight">
        History &amp; Daily Records
      </h1>
      <p class="text-xs sm:text-sm text-app-text-secondary mt-1.5 max-w-md">
        Review past routines and rhythms at your own pace. Every day writes its own story.
      </p>
    </div>

    <!-- Controls Block -->
    <div class="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 shrink-0">
      <!-- Date navigator -->
      <div class="flex items-center rounded-button border border-app-border bg-app-surface shadow-xs overflow-hidden">
        <button @click="emit('prevDay')"
          class="p-2 text-app-text-secondary hover:bg-app-surface-subtle transition-colors border-r border-app-border"
          title="Previous Day">
          <Icon name="lucide:chevron-left" class="w-4 h-4" />
        </button>
        <span class="px-3.5 py-2 text-xs font-semibold text-app-text-primary flex items-center gap-2 whitespace-nowrap">
          <Icon name="lucide:calendar" class="w-3.5 h-3.5 text-app-primary" />
          {{ selectedDate }}
        </span>
        <button @click="emit('nextDay')"
          class="p-2 text-app-text-secondary hover:bg-app-surface-subtle transition-colors border-l border-app-border"
          title="Next Day">
          <Icon name="lucide:chevron-right" class="w-4 h-4" />
        </button>
      </div>

      <!-- Jump to Today -->
      <button @click="emit('jumpToToday')"
        class="flex items-center gap-1.5 px-3.5 py-2 rounded-button border border-app-border bg-app-surface text-xs font-semibold text-app-text-primary hover:bg-app-surface-subtle transition-colors shadow-xs">
        <Icon name="lucide:calendar-clock" class="w-3.5 h-3.5 text-app-primary" />
        <span>Jump to Today</span>
      </button>

      <!-- Log Past Event CTA -->
      <button @click="emit('logPastEvent')"
        class="flex items-center gap-1.5 px-4 py-2 rounded-button bg-app-primary text-white text-xs font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs">
        <Icon name="lucide:plus" class="w-4 h-4" />
        <span>Log Past Event</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selectedDate: string;
}>();

const emit = defineEmits<{
  (e: 'logPastEvent'): void;
  (e: 'prevDay'): void;
  (e: 'nextDay'): void;
  (e: 'jumpToToday'): void;
}>();
</script>