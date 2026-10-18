<template>
  <div class="bg-app-surface border border-app-border rounded-card p-4 sm:p-5 shadow-sm space-y-4">
    <!-- Session Status Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-full bg-app-surface-subtle text-app-primary flex items-center justify-center">
          <Icon name="lucide:moon" class="w-5 h-5" />
        </div>
        <div>
          <span class="text-[11px] font-bold tracking-wider text-app-text-secondary uppercase">Current Activity</span>
          <h3 class="text-base font-bold text-app-text-primary">Maya is resting</h3>
        </div>
      </div>
      <span
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-app-surface-subtle text-app-primary">
        <span class="w-2 h-2 rounded-full bg-app-success animate-pulse"></span>
        Live Session
      </span>
    </div>

    <!-- Timer and Primary Actions -->
    <div
      class="bg-app-surface-subtle/50 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <p class="text-xs text-app-text-secondary font-medium">Elapsed Nursery Duration</p>
        <p class="text-3xl sm:text-4xl font-bold tracking-tight text-app-text-primary font-mono mt-0.5">
          {{ formatTime(seconds) }}
        </p>
        <p class="text-xs text-app-text-secondary mt-1">Target duration: 1h 15m • Crib in nursery</p>
      </div>

      <div class="flex items-center gap-2.5 shrink-0">
        <button @click="togglePause"
          class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-button border border-app-border bg-app-surface text-app-text-primary font-semibold text-sm hover:bg-app-surface-subtle active:scale-[0.98] transition-all min-h-[44px]">
          <Icon :name="isPaused ? 'lucide:play' : 'lucide:pause'" class="w-4 h-4" />
          <span>{{ isPaused ? 'Resume' : 'Pause' }}</span>
        </button>

        <button
          class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-button bg-app-primary text-white font-semibold text-sm hover:bg-app-primary-hover active:scale-[0.98] transition-all min-h-[44px] shadow-sm">
          <Icon name="lucide:check-circle" class="w-4 h-4" />
          <span>Wake & Save</span>
        </button>
      </div>
    </div>

    <!-- Nursery Sensor Metrics -->
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-app-surface-subtle rounded-xl p-3 text-center">
        <span class="text-[11px] text-app-text-secondary block">Room Temp</span>
        <span class="text-base font-bold text-app-text-primary">69.4°F</span>
      </div>
      <div class="bg-app-surface-subtle rounded-xl p-3 text-center">
        <span class="text-[11px] text-app-text-secondary block">Sound Machine</span>
        <span class="text-sm font-bold text-app-text-primary truncate block">White Noise (52dB)</span>
      </div>
      <div class="bg-app-surface-subtle rounded-xl p-3 text-center">
        <span class="text-[11px] text-app-text-secondary block">Sleep Quality</span>
        <span class="text-sm font-bold text-app-success block">Deep</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isPaused = ref(false)
const seconds = ref(42 * 60 + 21) // 00:42:21 starting point

let timer: number | null = null

onMounted(() => {
  timer = window.setInterval(() => {
    if (!isPaused.value) {
      seconds.value++
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const formatTime = (totalSeconds: number) => {
  const hrs = Math.floor(totalSeconds / 3600)
  const mins = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const togglePause = () => {
  isPaused.value = !isPaused.value
}
</script>