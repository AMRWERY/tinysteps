<template>
  <div class="w-full min-w-0">
    <!-- Phones -->
    <mobile-home
      :state="currentState"
      :timer-string="formattedTimer"
      :is-paused="isPaused"
      :entries="timelineEntries"
      :totals="totals"
      :sleep-subtitle="sleepSubtitle"
      @update:state="setHomeState"
      @toggle-pause="togglePause"
      @wake-and-save="openFinish"
      @start-nap="openStart"
      @log="handleQuickLog"
    />

    <!-- Medium and large screens -->
    <div class="hidden md:flex flex-col xl:flex-row gap-6 items-start w-full max-w-[1240px] mx-auto">
      <div class="flex-1 min-w-0 w-full space-y-6">
        <preview-states-toolbar :model-value="currentState" @update:model-value="setHomeState" />

        <home-header :state="currentState" @quick-log="handleQuickLog('feed')" />

        <nap-card
          :state="currentState"
          :timer-string="formattedTimer"
          :is-paused="isPaused"
          @toggle-pause="togglePause"
          @wake-and-save="openFinish"
          @start-nap="openStart"
        />

        <quick-routines :sleep-subtitle="sleepSubtitle" @log="handleQuickLog" />

        <timeline-section :entries="timelineEntries" />
      </div>

      <home-side-rail :totals="totals" />
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  currentState, elapsedMinutes, isPaused, formattedTimer,
  togglePause, timelineEntries, totals,
} = useRoutineState()
const { openStart, openFinish, start } = useSleepSession()

// The preview pills can jump straight to "active sleep" — begin a fresh session in that case
const setHomeState = (next: typeof currentState.value) => {
  if (next === 'active-sleep' && currentState.value !== 'active-sleep') start()
  else currentState.value = next
}

const sleepSubtitle = computed(() =>
  currentState.value === 'active-sleep' ? `Active now (${elapsedMinutes.value} mins)` : 'Last: 1h 20m ago',
)

const { openLogger } = useRoutineLogger()

const handleQuickLog = (type: 'feed' | 'sleep' | 'diaper') => {
  // Sleep is a flow: start a session, or review & finish the running one
  if (type === 'sleep') return currentState.value === 'active-sleep' ? openFinish() : openStart()
  openLogger(type)
}

useSeoMeta({
  title: 'Home — TinySteps',
  description: 'Track your baby\'s daily routine including feeding, sleeping, and diaper changes.',
})
</script>
