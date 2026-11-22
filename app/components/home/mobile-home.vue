<template>
  <div class="md:hidden p-4 space-y-4">
    <!-- State tabs -->
    <div class="flex items-center gap-1 bg-app-surface-subtle p-1 rounded-full text-[13px] font-semibold" role="tablist">
      <button v-for="t in tabs" :key="t.value" type="button" role="tab" :aria-selected="state === t.value" :class="[
        'flex-1 py-2 rounded-full whitespace-nowrap transition-colors',
        state === t.value ? 'bg-app-surface text-app-text-primary shadow-xs' : 'text-app-text-secondary',
      ]" @click="emit('update:state', t.value)">
        {{ t.label }}
      </button>
    </div>

    <!-- Greeting -->
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-[11px] font-bold tracking-wider text-app-text-secondary">{{ dateLabelUpper }}</p>
        <h1 class="text-2xl font-bold text-app-text-primary leading-tight mt-1">
          {{ greeting }}, {{ caregiver.name }}
        </h1>
      </div>
      <div class="flex flex-col items-end gap-2 shrink-0">
        <span
          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-app-accent-soft text-app-accent text-[11px] font-bold">
          <Icon name="lucide:clock" class="w-3 h-3" /> Week {{ baby.week }}
        </span>
        <button type="button" class="flex items-center gap-1 text-sm font-semibold text-app-text-primary">
          {{ baby.name }}'s Day <Icon name="lucide:chevron-down" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Quick log tiles -->
    <div class="grid grid-cols-3 gap-3">
      <button v-for="q in quick" :key="q.type" type="button"
        class="relative bg-app-surface border border-app-border rounded-2xl py-4 px-2 text-center shadow-xs active:scale-[0.97] transition-transform"
        @click="emit('log', q.type)">
        <span v-if="q.type === 'sleep' && state === 'active-sleep'"
          class="absolute top-2.5 end-2.5 w-2 h-2 rounded-full bg-app-success" />
        <span :class="['mx-auto w-11 h-11 rounded-full flex items-center justify-center', routineTypeMeta[q.type].tile]">
          <Icon :name="routineTypeMeta[q.type].icon" class="w-5 h-5" />
        </span>
        <p class="mt-2 text-sm font-bold text-app-text-primary">{{ q.label }}</p>
        <p :class="['text-[11px]', q.type === 'sleep' && state === 'active-sleep' ? 'text-app-success font-medium' : 'text-app-text-secondary']">
          {{ q.type === 'sleep' && state === 'active-sleep' ? 'Sleeping' : q.sub }}
        </p>
      </button>
    </div>

    <!-- Active sleep session (phone layout) -->
    <section v-if="state === 'active-sleep'"
      class="bg-app-primary-soft border border-app-primary/15 rounded-3xl p-4 space-y-4">
      <div class="flex items-center justify-between">
        <p class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-app-primary">
          <span class="w-2.5 h-2.5 rounded-full bg-app-success" :class="isPaused ? '' : 'animate-pulse'" />
          Active sleep session
        </p>
        <span class="px-2.5 py-1 rounded-full bg-app-surface text-[11px] font-semibold text-app-text-secondary">Nursery
          Crib</span>
      </div>
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-3xl font-bold font-mono tabular-nums text-app-text-primary">{{ timerString }}</p>
          <p class="text-xs text-app-text-secondary mt-1">Started at {{ startedLabel }} • White noise playing</p>
        </div>
        <button type="button" :aria-label="isPaused ? 'Resume' : 'Pause'"
          class="w-12 h-12 rounded-2xl bg-app-surface text-app-primary flex items-center justify-center shadow-xs shrink-0"
          @click="emit('togglePause')">
          <Icon :name="isPaused ? 'lucide:play' : 'lucide:moon'" class="w-6 h-6" />
        </button>
      </div>
      <div class="flex items-center gap-2">
        <button type="button"
          class="flex-1 flex items-center justify-center gap-2 min-h-[48px] rounded-2xl bg-app-primary text-white text-sm font-semibold active:scale-[0.98] transition-transform"
          @click="emit('wakeAndSave')">
          <Icon name="lucide:check-circle-2" class="w-4 h-4" /> Wake {{ baby.name }} &amp; Save Nap
        </button>
        <button type="button" aria-label="Add note"
          class="w-12 h-12 rounded-2xl bg-app-surface text-app-text-primary flex items-center justify-center shadow-xs">
          <Icon name="lucide:file-pen-line" class="w-4 h-4" />
        </button>
      </div>
    </section>

    <!-- Awake / first-run / loading reuse the shared card -->
    <nap-card v-else :state="state" :timer-string="timerString" :is-paused="isPaused"
      @start-nap="emit('startNap')" />

    <!-- Today's rhythm -->
    <section class="bg-app-surface border border-app-border rounded-3xl p-4 space-y-3 shadow-xs">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-app-text-primary">Today's Rhythm</h2>
        <span class="text-xs text-app-text-secondary">Since 6:00 AM</span>
      </div>
      <div class="grid grid-cols-3 gap-2">
        <div v-for="r in rhythm" :key="r.label" class="bg-app-surface-subtle rounded-2xl p-3">
          <p :class="['flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider', r.color]">
            <Icon :name="r.icon" class="w-3 h-3" /> {{ r.label }}
          </p>
          <p class="text-lg font-bold text-app-text-primary mt-1 leading-tight">{{ r.value }}</p>
          <p class="text-[11px] text-app-text-secondary">{{ r.detail }}</p>
        </div>
      </div>
      <p class="text-xs text-app-text-secondary text-center leading-relaxed">
        Gentle descriptive totals. Every baby follows their own unique rhythm today.
      </p>
    </section>

    <!-- Take a breath -->
    <section class="bg-app-surface-subtle rounded-3xl p-4 flex items-start gap-3">
      <span class="w-10 h-10 rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0">
        <Icon name="lucide:sprout" class="w-5 h-5" />
      </span>
      <div>
        <p class="font-bold text-sm text-app-text-primary">Take a breath, {{ caregiver.name }}</p>
        <p class="text-xs text-app-text-secondary leading-relaxed mt-0.5">
          {{ baby.name }} had a steady 1h 12m morning nap and is right on track for her restful afternoon stretch.
        </p>
      </div>
    </section>

    <!-- Timeline -->
    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-bold text-app-text-primary">Today's Timeline</h2>
          <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-app-surface-subtle text-app-text-secondary">
            {{ entries.length }} events
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button v-for="f in filters" :key="f.value" type="button" :aria-pressed="activeFilter === f.value" :class="[
          'px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors',
          activeFilter === f.value ? 'bg-app-primary text-white' : 'bg-app-surface border border-app-border text-app-text-secondary',
        ]" @click="activeFilter = f.value">
          {{ f.label }}
        </button>
      </div>

      <TransitionGroup name="list" tag="div" class="space-y-2.5">
        <article v-for="e in filtered" :key="e.id"
          class="bg-app-surface border border-app-border rounded-2xl p-3.5 flex items-start gap-3 shadow-xs">
          <span :class="['w-10 h-10 rounded-full flex items-center justify-center shrink-0', routineTypeMeta[e.type].tile]">
            <Icon :name="routineTypeMeta[e.type].icon" class="w-5 h-5" />
          </span>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <h3 class="font-bold text-sm text-app-text-primary">{{ e.title }}</h3>
              <span :class="['px-1.5 py-0.5 rounded-md text-[10px] font-semibold', badgeClass(e.badgeColor)]">{{ e.badge }}</span>
            </div>
            <p class="text-xs text-app-text-secondary mt-0.5 leading-snug">{{ e.description }}</p>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <span class="text-xs font-semibold text-app-text-secondary text-end">{{ e.clock.replace('Started ', '') }}</span>
            <button type="button" class="p-1 -me-1 rounded-lg text-app-text-secondary" aria-label="More options">
              <Icon name="lucide:more-vertical" class="w-4 h-4" />
            </button>
          </div>
        </article>
      </TransitionGroup>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { AppState, DayTotals, EventType, TimelineEntry } from '~/types/home'

const props = defineProps<{
  state: AppState
  timerString: string
  isPaused: boolean
  entries: TimelineEntry[]
  totals: DayTotals
  sleepSubtitle: string
}>()

const emit = defineEmits<{
  (e: 'update:state', v: AppState): void
  (e: 'togglePause'): void
  (e: 'wakeAndSave'): void
  (e: 'startNap'): void
  (e: 'log', type: 'feed' | 'sleep' | 'diaper'): void
}>()

const { baby, caregiver } = useBabyProfile()
const { startedAt } = useSleepSession()
const settings = useAppSettings()
const startedLabel = computed(() => formatClock(msToHHmm(startedAt.value), settings.value.timeFormat))
const { greeting, dateLabelUpper } = useGreeting()

const tabs: { value: AppState; label: string }[] = [
  { value: 'active-sleep', label: 'Active Nap' },
  { value: 'baby-awake', label: 'Baby Awake' },
  { value: 'first-run', label: 'First Day' },
]

const quick = [
  { type: 'feed' as const, label: 'Feed', sub: '2h 10m ago' },
  { type: 'sleep' as const, label: 'Sleep', sub: 'Last: 1h 20m ago' },
  { type: 'diaper' as const, label: 'Diaper', sub: '45m ago' },
]

const rhythm = computed(() => [
  { label: 'Feed', icon: 'lucide:milk', color: 'text-app-accent', value: props.totals.feed.value, detail: props.totals.feed.detail },
  { label: 'Sleep', icon: 'lucide:moon', color: 'text-app-primary', value: props.totals.rest.value, detail: props.totals.rest.detail },
  { label: 'Diapers', icon: 'lucide:droplet', color: 'text-app-text-secondary', value: `${props.totals.diapers.value} logged`, detail: props.totals.diapers.detail },
])

const activeFilter = ref<EventType>('all')
const filters: { value: EventType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'feed', label: 'Feed' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'diaper', label: 'Diapers' },
]
const filtered = computed(() =>
  activeFilter.value === 'all' ? props.entries : props.entries.filter(e => e.type === activeFilter.value),
)
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

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
