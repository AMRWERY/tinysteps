<template>
  <!-- Loading skeleton -->
  <div v-if="state === 'loading'"
    class="bg-app-surface border border-app-border rounded-card p-6 space-y-5 animate-pulse shadow-xs">
    <div class="flex justify-between">
      <div class="h-3 w-44 bg-app-surface-subtle rounded" />
      <div class="h-6 w-48 bg-app-surface-subtle rounded-full" />
    </div>
    <div class="h-10 w-56 bg-app-surface-subtle rounded" />
    <div class="h-14 w-full bg-app-surface-subtle rounded-xl" />
    <div class="flex justify-between">
      <div class="h-4 w-52 bg-app-surface-subtle rounded" />
      <div class="h-10 w-56 bg-app-surface-subtle rounded-xl" />
    </div>
  </div>

  <!-- First run / empty -->
  <div v-else-if="state === 'first-run'"
    class="bg-app-surface border border-dashed border-app-border rounded-card p-8 text-center space-y-3">
    <div class="w-12 h-12 mx-auto rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center">
      <Icon name="lucide:sparkles" class="w-6 h-6" />
    </div>
    <h3 class="text-base font-bold text-app-text-primary">{{ baby.name }}'s First Day</h3>
    <p class="text-xs text-app-text-secondary max-w-sm mx-auto">
      Routines will form naturally. Log {{ baby.name }}'s first nap, bottle, or diaper change whenever you're ready.
    </p>
    <button type="button"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-app-primary text-white text-xs font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs"
      @click="emit('startNap')">
      <Icon name="lucide:moon" class="w-4 h-4" />
      <span>Start First Nap Session</span>
    </button>
  </div>

  <!-- Awake / idle -->
  <div v-else-if="state === 'baby-awake'"
    class="bg-app-surface border border-app-border rounded-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
    <div class="flex items-center gap-3">
      <div class="w-11 h-11 rounded-2xl bg-app-accent-soft text-app-accent flex items-center justify-center">
        <Icon name="lucide:sun" class="w-6 h-6" />
      </div>
      <div>
        <div class="flex items-center gap-2 flex-wrap">
          <h3 class="text-base font-bold text-app-text-primary">{{ baby.name }} is awake &amp; content</h3>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-app-surface-subtle text-app-text-secondary">
            Awake 1h 10m
          </span>
        </div>
        <p class="text-xs text-app-text-secondary mt-0.5">Next nap window anticipated around 2:45 PM</p>
      </div>
    </div>
    <button type="button"
      class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-button bg-app-primary text-white text-xs font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs"
      @click="emit('startNap')">
      <Icon name="lucide:moon" class="w-4 h-4" />
      <span>Start Nap</span>
    </button>
  </div>

  <!-- Active crib nap -->
  <div v-else class="bg-app-surface border border-app-border rounded-card p-5 sm:p-6 space-y-5 shadow-xs">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-app-primary">
        <span class="w-2.5 h-2.5 rounded-full bg-app-success" :class="isPaused ? '' : 'animate-pulse'" />
        <span>{{ isPaused ? 'Crib nap paused' : 'Crib nap in progress' }}</span>
      </div>
      <span
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-app-surface-subtle border border-app-border text-[11px] font-medium text-app-text-secondary">
        <Icon name="lucide:audio-lines" class="w-3.5 h-3.5" />
        Sound Machine: White Noise 45dB
      </span>
    </div>

    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs text-app-text-secondary">Nap duration so far</p>
        <p class="mt-1 flex items-baseline gap-2">
          <span class="text-4xl font-bold font-mono tabular-nums text-app-text-primary">{{ timerString }}</span>
          <span class="text-xs text-app-text-secondary">started at {{ startedLabel }}</span>
        </p>
      </div>
      <div class="text-end">
        <p class="text-xs text-app-text-secondary">Location</p>
        <p class="mt-1 text-sm font-semibold text-app-text-primary">Nursery Crib • Swaddle #2</p>
      </div>
    </div>

    <!-- Rhythm waveform -->
    <div class="flex items-center justify-between gap-1 bg-app-surface-subtle rounded-2xl px-4 h-14" aria-hidden="true">
      <span v-for="(h, i) in bars" :key="i" class="wave-bar w-[3px] rounded-full bg-app-primary/50"
        :class="{ 'wave-paused': isPaused }" :style="{ height: `${h}px`, animationDelay: `${(i % 7) * 120}ms` }" />
    </div>

    <div class="flex flex-wrap items-center justify-between gap-3">
      <p class="flex items-center gap-2 text-xs text-app-text-secondary">
        <Icon name="lucide:sun" class="w-4 h-4 text-app-accent" />
        Predicted wake window: 40–55 mins
      </p>
      <div class="flex items-center gap-2">
        <button type="button"
          class="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-button bg-app-surface-subtle border border-app-border text-sm font-semibold text-app-text-primary hover:bg-app-border/40 active:scale-[0.98] transition-all focus-ring"
          @click="emit('togglePause')">
          <Icon :name="isPaused ? 'lucide:play' : 'lucide:pause'" class="w-4 h-4" />
          {{ isPaused ? 'Resume' : 'Pause' }}
        </button>
        <button type="button"
          class="flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-button bg-app-primary text-white text-sm font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs focus-ring"
          @click="emit('wakeAndSave')">
          <Icon name="lucide:sunrise" class="w-4 h-4" />
          Wake Baby &amp; Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppState } from '~/types/home'

defineProps<{ state: AppState; timerString: string; isPaused: boolean }>()
const emit = defineEmits<{ (e: 'togglePause'): void; (e: 'wakeAndSave'): void; (e: 'startNap'): void }>()

const { baby } = useBabyProfile()
const { startedAt } = useSleepSession()
const settings = useAppSettings()
const startedLabel = computed(() => formatClock(msToHHmm(startedAt.value), settings.value.timeFormat))
const bars = [10, 22, 34, 16, 18, 30, 10, 40, 12, 8, 28, 36, 14, 12, 30, 10, 22, 34, 12, 18, 26, 14, 32, 10]
</script>

<style scoped>
@keyframes wave {

  0%,
  100% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(0.55);
  }
}

.wave-bar {
  animation: wave 1.6s ease-in-out infinite;
}

.wave-paused {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .wave-bar {
    animation: none;
  }
}
</style>
