<template>
  <div class="contents">
    <!-- Center Primary Content Column -->
    <div class="flex-1 max-w-full min-w-0 space-y-5">
      <!-- Baby Profile Hero Banner -->
      <baby-profile-hero-banner />

      <!-- Day at a Glance Summary Card -->
      <desktop-nap-card
        :state="napState"
        :timer-string="formattedTimer"
        :is-paused="isPaused"
        @toggle-pause="isPaused = !isPaused"
        @wake-and-save="handleWakeAndSave"
        @start-nap="napState = 'active-sleep'" />

      <!-- Instant Logging Hub Component -->
      <quick-log-hub @log="handleQuickLog" />

      <!-- Today's Timeline Component -->
      <timeline-section />
    </div>

    <!-- Right Column: Caregiver Rail -->
    <right-caregiver-rail :caregiver="caregiver" />
  </div>
</template>

<script setup lang="ts">
import type { Caregiver, AppState } from '~/types/home'

const napState = ref<AppState>('active-sleep')
const isPaused = ref(false)
const elapsedSeconds = ref(48 * 60 + 19)

onMounted(() => {
  setInterval(() => {
    if (napState.value === 'active-sleep' && !isPaused.value) {
      elapsedSeconds.value++
    }
  }, 1000)
})

const formattedTimer = computed(() => {
  const h = Math.floor(elapsedSeconds.value / 3600)
  const m = Math.floor((elapsedSeconds.value % 3600) / 60)
  const s = elapsedSeconds.value % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

const caregiver: Caregiver = {
  id: '1',
  name: 'Alex',
  role: 'Parent',
  avatarUrl: '/img/img-01.png',
  lastActive: '5m ago',
  isOnline: true,
}

const handleWakeAndSave = () => {
  napState.value = 'baby-awake'
}

const handleQuickLog = (type: string) => {
  console.log('Quick log action triggered:', type)
}

useSeoMeta({
  title: 'Tiny Steps - Baby Routine Tracker',
  description: 'Track your baby\'s daily routine including feeding, sleeping, and diaper changes.',
})
</script>