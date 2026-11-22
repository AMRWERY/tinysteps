<template>
  <div class="space-y-5">
    <div class="space-y-2">
      <p class="text-sm text-app-text-secondary">What did you find?</p>
      <LazyVChoice v-model="form.kind" variant="segmented" label="Diaper type" :options="kinds" />
    </div>

    <logger-time-field v-model="form.time" label="Time of Change" :error="errors.time" />

    <div class="space-y-2">
      <p class="text-sm text-app-text-secondary">Skin &amp; observations</p>
      <LazyVChoice v-model="form.observation" label="Observation" :options="observations" />
    </div>

    <logger-notes-field v-model="form.notes" label="Add wellness notes (optional)"
      placeholder="Mustard yellow, normal consistency, barrier balm applied…" />
  </div>
</template>

<script setup lang="ts">
import type { DiaperForm, LogErrors } from '~/types/logger'

defineProps<{ form: DiaperForm; errors: LogErrors }>()

const kinds = [
  { value: 'wet' as const, label: 'Wet', icon: 'lucide:droplet' },
  { value: 'dirty' as const, label: 'Dirty', icon: 'lucide:circle-dot' },
  { value: 'both' as const, label: 'Both', icon: 'lucide:droplets' },
]
const observations = [
  { value: 'normal' as const, label: 'Normal' },
  { value: 'skin-clear' as const, label: 'Skin clear' },
  { value: 'rash' as const, label: 'Rash noted' },
]
</script>
