<template>
  <section class="space-y-3">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <h2 class="text-lg font-bold text-app-text-primary">Today's Timeline</h2>
        <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-app-surface-subtle text-app-text-secondary">
          {{ entries.length }} logs
        </span>
      </div>
      <div class="flex items-center gap-1 bg-app-surface-subtle p-1 rounded-xl text-xs font-semibold" role="tablist">
        <button v-for="f in filters" :key="f.value" type="button" role="tab" :aria-selected="activeFilter === f.value"
          :class="[
            'px-3 py-1.5 rounded-lg transition-colors focus-ring',
            activeFilter === f.value ? 'bg-app-surface text-app-text-primary shadow-xs' : 'text-app-text-secondary hover:text-app-text-primary',
          ]" @click="activeFilter = f.value">
          {{ f.label }}
        </button>
      </div>
    </div>

    <TransitionGroup name="list" tag="div" class="space-y-3">
      <article v-for="e in filtered" :key="e.id"
        class="bg-app-surface border border-app-border rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
        <span
          :class="['w-11 h-11 rounded-full flex items-center justify-center shrink-0', routineTypeMeta[e.type].tile]">
          <Icon :name="routineTypeMeta[e.type].icon" class="w-5 h-5" />
        </span>

        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="font-bold text-sm text-app-text-primary">{{ e.title }}</h3>
            <span :class="['px-2 py-0.5 rounded-md text-[10px] font-semibold', badgeClass(e.badgeColor)]">{{ e.badge
              }}</span>
          </div>
          <p class="text-xs text-app-text-secondary mt-0.5">{{ e.clock }} • {{ e.description }}</p>
          <p v-if="e.loggedBy" class="flex items-center gap-1 text-[11px] text-app-text-secondary mt-1">
            <Icon name="lucide:user" class="w-3 h-3" /> Logged by {{ e.loggedBy }}
          </p>
        </div>

        <div v-if="e.metric" class="text-end shrink-0">
          <p class="text-lg font-bold font-mono tabular-nums text-app-text-primary leading-tight">{{ e.metric.value }}
          </p>
          <p class="text-[11px] text-app-text-secondary">{{ e.metric.label }}</p>
        </div>
        <button v-else type="button"
          class="p-1.5 rounded-lg text-app-text-secondary hover:bg-app-surface-subtle transition-colors"
          aria-label="More options">
          <Icon name="lucide:more-horizontal" class="w-4 h-4" />
        </button>
      </article>
    </TransitionGroup>

    <p v-if="!filtered.length" class="text-sm text-app-text-secondary text-center py-8">Nothing logged here yet.</p>
  </section>
</template>

<script setup lang="ts">
import type { EventType, TimelineEntry } from '~/types/home'

const props = defineProps<{ entries: TimelineEntry[] }>()

const activeFilter = ref<EventType>('all')
const filters: { value: EventType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'feed', label: 'Feed' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'diaper', label: 'Diaper' },
]
const filtered = computed(() =>
  activeFilter.value === 'all' ? props.entries : props.entries.filter(e => e.type === activeFilter.value),
)
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
