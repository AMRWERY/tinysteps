<template>
  <section class="bg-app-surface border border-app-border rounded-card p-5 sm:p-6 space-y-4 shadow-xs">
    <div class="flex items-center justify-between pb-3 border-b border-app-border">
      <h2 class="flex items-center gap-2 text-lg font-bold text-app-text-primary">
        <Icon name="lucide:sliders-horizontal" class="w-5 h-5" /> Daily Tracking Defaults
      </h2>
      <span class="text-xs text-app-text-secondary hidden sm:inline">Tailored to your routine</span>
    </div>

    <!-- Volume unit -->
    <div class="bg-app-surface-subtle rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <p class="text-sm font-bold text-app-text-primary">Volume Measurement Unit</p>
        <p class="text-xs text-app-text-secondary mt-0.5">Applied across pumped milk, formula, and water logs.</p>
      </div>
      <div class="flex bg-app-surface rounded-xl p-1 gap-1 shrink-0" role="radiogroup" aria-label="Volume unit">
        <button v-for="u in units" :key="u.value" type="button" role="radio" :aria-checked="form.volumeUnit === u.value"
          :disabled="!editing" :class="[
            'px-4 py-2 rounded-lg text-xs font-semibold transition-colors',
            form.volumeUnit === u.value ? 'bg-app-primary text-white' : 'text-app-text-secondary',
            editing && form.volumeUnit !== u.value ? 'hover:text-app-text-primary' : '',
          ]" @click="form.volumeUnit = u.value">
          {{ u.label }}
        </button>
      </div>
    </div>

    <!-- Feeding method -->
    <div class="bg-app-surface-subtle rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <p class="text-sm font-bold text-app-text-primary">Primary Feeding Method</p>
        <p class="text-xs text-app-text-secondary mt-0.5">Configures dashboard 1-tap quick buttons.</p>
      </div>
      <select v-model="form.feedingMethod" :disabled="!editing" aria-label="Primary feeding method"
        class="sm:w-60 rounded-xl bg-app-surface border border-app-border px-3 py-2.5 text-sm text-app-text-primary outline-none focus:border-app-primary disabled:opacity-100">
        <option value="breast">Breast</option>
        <option value="bottle">Bottle</option>
        <option value="combined">Breast + Bottle (Combined)</option>
      </select>
    </div>

    <!-- Diaper detail -->
    <div class="bg-app-surface-subtle rounded-2xl p-4 flex items-center justify-between gap-3">
      <div>
        <p class="text-sm font-bold text-app-text-primary">Diaper Logging Detail</p>
        <p class="text-xs text-app-text-secondary mt-0.5">Choose between quick glance or pediatric detail.</p>
      </div>
      <button type="button" role="switch" :aria-checked="form.diaperDetail" :disabled="!editing"
        class="flex items-center gap-2.5 shrink-0" @click="form.diaperDetail = !form.diaperDetail">
        <span :class="['relative w-12 h-7 rounded-full transition-colors', form.diaperDetail ? 'bg-app-primary' : 'bg-app-border']">
          <span :class="['absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all', form.diaperDetail ? 'start-6' : 'start-1']" />
        </span>
        <span class="text-xs text-app-text-secondary hidden sm:inline">Log color &amp; texture</span>
      </button>
    </div>

    <!-- Sleep style -->
    <div class="bg-app-surface-subtle rounded-2xl p-4 space-y-3">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-bold text-app-text-primary">Sleep Session Tracker Style</p>
          <p class="text-xs text-app-text-secondary mt-0.5">How you prefer to capture day naps &amp; night sleeps.</p>
        </div>
        <Icon name="lucide:moon" class="w-5 h-5 text-app-primary" />
      </div>
      <div class="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Sleep tracker style">
        <button v-for="s in sleepStyles" :key="s.value" type="button" role="radio"
          :aria-checked="form.sleepStyle === s.value" :disabled="!editing" :class="[
            'flex items-start gap-3 text-start bg-app-surface rounded-xl p-3 border transition-colors',
            form.sleepStyle === s.value ? 'border-app-primary' : 'border-transparent',
          ]" @click="form.sleepStyle = s.value">
          <span :class="['mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0', form.sleepStyle === s.value ? 'border-app-primary' : 'border-app-border']">
            <span v-if="form.sleepStyle === s.value" class="w-2 h-2 rounded-full bg-app-primary" />
          </span>
          <span>
            <span class="block text-sm font-bold text-app-text-primary">{{ s.title }}</span>
            <span class="block text-xs text-app-text-secondary mt-0.5">{{ s.text }}</span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProfileForm } from '~/types/profile'

defineProps<{ form: ProfileForm; editing: boolean }>()

const units = [
  { value: 'ml' as const, label: 'Milliliters (ml)' },
  { value: 'oz' as const, label: 'Ounces (oz)' },
]

const sleepStyles = [
  { value: 'timer' as const, title: 'Live Stopwatch Timer', text: '1-tap start as baby falls asleep. Pulsing counter in app header.' },
  { value: 'manual' as const, title: 'Manual Retroactive Entry', text: 'Key in start & end times after baby wakes up. Less screen time.' },
]
</script>
