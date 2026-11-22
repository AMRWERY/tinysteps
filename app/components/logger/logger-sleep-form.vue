<template>
  <div class="space-y-5">
    <div class="space-y-2">
      <p class="text-sm text-app-text-secondary">Sleep Type</p>
      <v-choice v-model="form.kind" variant="segmented" label="Sleep type" :options="kinds" />
    </div>

    <div class="grid sm:grid-cols-2 gap-4">
      <logger-time-field v-model="form.start" label="Fell asleep" :error="errors.start" />
      <logger-time-field v-model="form.end" label="Woke up (optional)" :error="errors.end" />
    </div>
    <p class="text-xs text-app-text-secondary -mt-2">
      Leave “Woke up” empty to log a sleep that is still in progress.
    </p>

    <div class="space-y-2">
      <p class="text-sm text-app-text-secondary">Where did {{ baby.name }} sleep?</p>
      <v-choice v-model="form.location" label="Sleep location" :options="locations" />
    </div>

    <logger-notes-field v-model="form.notes" label="Add sleep notes (optional)"
      placeholder="Fell asleep within 10 minutes, woke up smiling…" />
  </div>
</template>

<script setup lang="ts">
import type { LogErrors, SleepForm } from '~/types/logger'

defineProps<{ form: SleepForm; errors: LogErrors }>()
const { baby } = useBabyProfile()

const kinds = [
  { value: 'nap' as const, label: 'Nap', icon: 'lucide:sun' },
  { value: 'night' as const, label: 'Night Sleep', icon: 'lucide:moon' },
]
const locations = [
  { value: 'crib' as const, label: 'Crib' },
  { value: 'bassinet' as const, label: 'Bassinet' },
  { value: 'arms' as const, label: 'In arms' },
  { value: 'stroller' as const, label: 'Stroller' },
]
</script>
