<template>
  <div class="space-y-4">
    <!-- Section header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h3 class="font-bold text-base text-app-text-primary">Timeline of Events</h3>
        <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-app-surface-subtle text-app-text-secondary">
          {{ events.length }} logged
        </span>
      </div>
      <span class="text-xs text-app-text-secondary hidden sm:inline">
        {{ isReversed ? 'Reverse (Latest to Earliest)' : 'Chronological (Earliest to Latest)' }}
      </span>
    </div>

    <!-- A. LOADING SKELETON -->
    <div v-if="previewState === 'skeleton'" class="space-y-3">
      <div v-for="n in 4" :key="n"
        class="bg-app-surface border border-app-border rounded-2xl p-4 animate-pulse space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-app-surface-subtle shrink-0"></div>
            <div class="space-y-1.5">
              <div class="h-3.5 w-32 bg-app-surface-subtle rounded"></div>
              <div class="h-2.5 w-20 bg-app-surface-subtle rounded"></div>
            </div>
          </div>
          <div class="h-3 w-14 bg-app-surface-subtle rounded"></div>
        </div>
        <div class="h-2.5 w-3/4 bg-app-surface-subtle rounded"></div>
        <div class="h-2.5 w-1/2 bg-app-surface-subtle rounded"></div>
      </div>
    </div>

    <!-- B. EMPTY STATE (empty day or filter returns nothing) -->
    <div v-else-if="previewState === 'empty' || previewState === 'filter-empty' || events.length === 0"
      class="bg-app-surface border border-dashed border-app-border rounded-card p-10 text-center space-y-3">
      <div
        class="w-12 h-12 mx-auto rounded-full bg-app-surface-subtle text-app-text-secondary flex items-center justify-center">
        <Icon name="lucide:calendar-x" class="w-6 h-6" />
      </div>
      <h4 class="font-bold text-base text-app-text-primary">
        {{ previewState === 'filter-empty' ? 'No events match this filter' : 'No events logged on this date' }}
      </h4>
      <p class="text-xs text-app-text-secondary max-w-sm mx-auto">
        {{
          previewState === 'filter-empty'
            ? 'Try selecting a different category or view all events for this day.'
            : 'Nothing was recorded for this day. You can backdate routines anytime.'
        }}
      </p>
      <button v-if="previewState === 'empty'" @click="emit('logPastEvent')"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-button bg-app-primary text-white text-xs font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all">
        <Icon name="lucide:plus" class="w-4 h-4" />
        <span>Log Past Event</span>
      </button>
    </div>

    <!-- C. POPULATED TIMELINE -->
    <div v-else class="space-y-3 relative">
      <!-- Subtle vertical connector line (desktop only) -->
      <div class="hidden sm:block absolute left-[27px] top-8 bottom-6 w-px bg-app-border z-0 pointer-events-none">
      </div>

      <div v-for="ev in events" :key="ev.id"
        class="relative bg-app-surface border border-app-border rounded-2xl p-4 sm:pl-14 flex items-start justify-between gap-3 hover:border-app-primary/40 transition-colors z-10">

        <!-- Timeline dot (desktop) -->
        <div :class="[
          'hidden sm:flex absolute left-4 top-4 w-7 h-7 rounded-full items-center justify-center ring-4 ring-app-surface',
          ev.type === 'feed' ? 'bg-app-accent' : '',
          ev.type === 'sleep' ? 'bg-app-primary' : '',
          ev.type === 'diaper' ? 'bg-app-warning' : ''
        ]">
          <Icon :name="ev.type === 'feed' ? 'lucide:milk' : ev.type === 'sleep' ? 'lucide:moon' : 'lucide:droplet'"
            class="w-3 h-3 text-white" />
        </div>

        <!-- Mobile icon (inline) -->
        <div :class="[
          'flex sm:hidden w-9 h-9 rounded-full items-center justify-center shrink-0',
          ev.type === 'feed' ? 'bg-app-accent-soft text-app-accent' : '',
          ev.type === 'sleep' ? 'bg-app-primary-soft text-app-primary' : '',
          ev.type === 'diaper' ? 'bg-app-surface-subtle text-app-warning' : ''
        ]">
          <Icon :name="ev.type === 'feed' ? 'lucide:milk' : ev.type === 'sleep' ? 'lucide:moon' : 'lucide:droplet'"
            class="w-4 h-4" />
        </div>

        <!-- Event body -->
        <div class="flex-1 min-w-0 space-y-1">
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="font-bold text-sm text-app-text-primary">{{ ev.title }}</span>
            <span v-if="ev.primaryTag"
              class="px-2 py-0.5 text-[10px] rounded-md font-semibold bg-app-surface-subtle text-app-text-primary">
              {{ ev.primaryTag }}
            </span>
            <span v-if="ev.secondaryTag"
              class="px-2 py-0.5 text-[10px] rounded-md font-medium bg-app-surface-subtle/60 text-app-text-secondary">
              {{ ev.secondaryTag }}
            </span>
          </div>

          <p class="text-xs text-app-text-secondary leading-relaxed">{{ ev.notes }}</p>

          <div class="flex items-center gap-3 text-[11px] text-app-text-secondary pt-0.5">
            <span class="flex items-center gap-1 font-mono font-medium">
              <Icon name="lucide:clock" class="w-3 h-3" />
              {{ ev.timeFormatted }}
            </span>
            <span v-if="ev.loggedBy" class="flex items-center gap-1">
              <Icon name="lucide:user" class="w-3 h-3 opacity-70" />
              Logged by {{ ev.loggedBy }}
            </span>
          </div>
        </div>

        <!-- 3-dot menu -->
        <button class="p-1 rounded-lg text-app-text-secondary hover:bg-app-surface-subtle transition-colors shrink-0">
          <Icon name="lucide:more-vertical" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HistoryEventItem, HistoryPreviewState } from '~/types/history';

defineProps<{
  events: HistoryEventItem[];
  previewState: HistoryPreviewState;
  isReversed: boolean;
}>();

const emit = defineEmits<{
  (e: 'logPastEvent'): void;
}>();
</script>