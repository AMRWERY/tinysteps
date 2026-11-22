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
      @update:state="currentState = $event"
      @toggle-pause="isPaused = !isPaused"
      @wake-and-save="wakeAndSave"
      @start-nap="startNap"
      @log="handleQuickLog"
    />

    <!-- Medium and large screens -->
    <div class="hidden md:flex flex-col xl:flex-row gap-6 items-start w-full max-w-[1240px] mx-auto">
      <div class="flex-1 min-w-0 w-full space-y-6">
        <preview-states-toolbar v-model="currentState" />

        <home-header :state="currentState" @quick-log="handleQuickLog('feed')" />

        <nap-card
          :state="currentState"
          :timer-string="formattedTimer"
          :is-paused="isPaused"
          @toggle-pause="isPaused = !isPaused"
          @wake-and-save="wakeAndSave"
          @start-nap="startNap"
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
  wakeAndSave, startNap, timelineEntries, totals,
} = useRoutineState()

const sleepSubtitle = computed(() =>
  currentState.value === 'active-sleep' ? `Active now (${elapsedMinutes.value} mins)` : 'Last: 1h 20m ago',
)

const handleQuickLog = (type: string) => {
  // TODO: open the log sheet / persist the event
  console.log('Quick log action triggered:', type)
}

useSeoMeta({
  title: 'Home — TinySteps',
  description: 'Track your baby\'s daily routine including feeding, sleeping, and diaper changes.',
})
</script>
