<template>
  <div class="space-y-5">
    <div>
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-app-primary-soft text-app-primary text-xs font-semibold">
        <span class="w-1.5 h-1.5 rounded-full bg-app-success" /> Routine Defaults
      </span>
      <h2 class="text-2xl font-bold text-app-text-primary mt-3">How does your routine feel?</h2>
      <p class="text-sm text-app-text-secondary mt-1.5">
        Pick what fits today. You can change any of these later in Settings.
      </p>
    </div>

    <fieldset class="space-y-2">
      <legend class="text-sm font-bold text-app-text-primary mb-2">Liquid units</legend>
      <v-segmented v-model="settings.liquidUnit" label="Liquid units" block class="w-full"
        :options="[{ value: 'ml', label: 'Milliliters (ml)' }, { value: 'oz', label: 'Fluid ounces (oz)' }]" />
    </fieldset>

    <fieldset class="space-y-2">
      <legend class="text-sm font-bold text-app-text-primary mb-2">Primary feeding method</legend>
      <div class="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Primary feeding method">
        <button v-for="m in methods" :key="m.value" type="button" role="radio" :aria-checked="form.feedingMethod === m.value"
          :class="[
            'rounded-2xl py-3.5 px-2 text-center border-2 transition-colors focus-ring',
            form.feedingMethod === m.value ? 'border-app-primary bg-app-primary-soft/50' : 'border-transparent bg-app-surface-subtle hover:border-app-primary/30',
          ]" @click="form.feedingMethod = m.value">
          <Icon :name="m.icon" class="w-5 h-5 mx-auto text-app-primary" />
          <span class="block text-sm font-bold text-app-text-primary mt-1.5">{{ m.label }}</span>
          <span class="block text-[11px] text-app-text-secondary">{{ m.text }}</span>
        </button>
      </div>
    </fieldset>

    <fieldset class="space-y-2">
      <legend class="text-sm font-bold text-app-text-primary mb-2">Sleep tracking style</legend>
      <div class="grid sm:grid-cols-2 gap-2.5" role="radiogroup" aria-label="Sleep tracking style">
        <button v-for="s in sleepStyles" :key="s.value" type="button" role="radio"
          :aria-checked="form.sleepStyle === s.value" :class="[
            'flex items-start gap-3 text-start rounded-2xl p-3.5 border-2 transition-colors focus-ring',
            form.sleepStyle === s.value ? 'border-app-primary bg-app-primary-soft/50' : 'border-transparent bg-app-surface-subtle hover:border-app-primary/30',
          ]" @click="form.sleepStyle = s.value">
          <span :class="['mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0', form.sleepStyle === s.value ? 'border-app-primary' : 'border-app-border']">
            <span v-if="form.sleepStyle === s.value" class="w-2 h-2 rounded-full bg-app-primary" />
          </span>
          <span>
            <span class="block text-sm font-bold text-app-text-primary">{{ s.title }}</span>
            <span class="block text-xs text-app-text-secondary mt-0.5">{{ s.text }}</span>
          </span>
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import type { ProfileForm } from '~/types/profile'

defineProps<{ form: ProfileForm }>()
// Shared with the Settings page so the choice carries over
const settings = useAppSettings()

const methods = [
  { value: 'breast' as const, label: 'Breast', text: 'Nursing timers', icon: 'lucide:heart' },
  { value: 'bottle' as const, label: 'Bottle', text: 'ml / oz logs', icon: 'lucide:milk' },
  { value: 'combined' as const, label: 'Both', text: 'Combined', icon: 'lucide:blend' },
]

const sleepStyles = [
  { value: 'timer' as const, title: 'Live stopwatch', text: '1-tap start as baby falls asleep.' },
  { value: 'manual' as const, title: 'Manual entry', text: 'Key in times after baby wakes.' },
]
</script>
