<template>
  <section aria-label="Live routine in progress" class="space-y-3">
    <div class="hidden md:flex items-center justify-between text-xs">
      <p class="flex items-center gap-2 font-bold tracking-wider text-app-primary">
        <span class="w-2 h-2 rounded-full bg-app-success" :class="isPaused ? '' : 'animate-pulse'" /> LIVE ROUTINE IN PROGRESS
      </p>
      <p class="text-app-text-secondary">Started at {{ startedLabel }} • Nursery</p>
    </div>

    <div class="bg-app-primary-soft border border-app-primary/15 rounded-3xl md:rounded-card p-4 md:p-6">
      <!-- Desktop -->
      <div class="hidden md:flex items-center gap-5">
        <span class="w-16 h-16 rounded-2xl bg-app-surface text-app-primary flex items-center justify-center shrink-0">
          <Icon name="lucide:moon" class="w-7 h-7" />
        </span>
        <div class="min-w-0 flex-1 space-y-1.5">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="text-xl font-bold text-app-text-primary">{{ isPaused ? 'Sleep paused' : 'Active Sleep' }}</h3>
            <span class="px-2.5 py-0.5 rounded-full bg-app-surface text-xs font-semibold text-app-text-secondary">Live Timer</span>
          </div>
          <p class="text-sm text-app-text-secondary">{{ description }}</p>
          <p class="flex items-center gap-2 text-sm text-app-text-secondary">
            <Icon name="lucide:clock" class="w-4 h-4 text-app-primary" />
            <strong class="text-app-primary font-semibold">Started {{ startedLabel }}</strong>
          </p>
        </div>
        <div class="text-end">
          <p class="text-xs tracking-wider text-app-text-secondary">ELAPSED</p>
          <p class="text-4xl font-bold font-mono tabular-nums text-app-text-primary">{{ formattedTimer }}</p>
        </div>
        <button type="button"
          class="flex items-center gap-2 px-5 py-3 min-h-[48px] rounded-2xl bg-app-primary text-white text-base font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs focus-ring"
          @click="openFinish">
          <Icon name="lucide:circle-stop" class="w-5 h-5" /> End Sleep
        </button>
        <button type="button" :aria-label="isPaused ? 'Resume timer' : 'Pause timer'"
          class="w-12 h-12 rounded-2xl bg-app-surface text-app-text-secondary hover:text-app-text-primary flex items-center justify-center transition-colors focus-ring"
          @click="togglePause">
          <Icon :name="isPaused ? 'lucide:play' : 'lucide:pause'" class="w-5 h-5" />
        </button>
      </div>

      <!-- Phone -->
      <div class="md:hidden flex items-start gap-3">
        <span class="w-12 h-12 rounded-full bg-app-surface text-app-primary flex items-center justify-center shrink-0">
          <Icon name="lucide:moon" class="w-6 h-6" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="flex items-center gap-2 text-base font-semibold text-app-text-primary">
            Sleep in Progress <span class="w-2 h-2 rounded-full bg-app-success" :class="isPaused ? '' : 'animate-pulse'" />
          </p>
          <p class="text-4xl font-bold font-mono tabular-nums text-app-text-primary leading-tight">{{ formattedTimer }}</p>
          <p class="text-sm text-app-text-secondary">Started at {{ startedLabel }} in Crib</p>
        </div>
        <button type="button"
          class="px-5 py-3 rounded-xl bg-app-primary text-white text-base font-semibold active:scale-[0.97] transition-transform focus-ring"
          @click="openFinish">
          End Sleep
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { isPaused, startedAt, formattedTimer, togglePause, openFinish } = useSleepSession()
const entries = useTimelineEntries()
const settings = useAppSettings()

const startedLabel = computed(() => formatClock(msToHHmm(startedAt.value), settings.value.timeFormat))
const description = computed(
  () => entries.value.find(e => e.isActive)?.description || 'White noise running • Darkened room',
)
</script>
