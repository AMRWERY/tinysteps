<template>
  <div class="space-y-5">
    <div class="space-y-2">
      <p class="text-sm text-app-text-secondary">Feeding Method</p>
      <v-choice v-model="form.method" variant="segmented" label="Feeding method" :options="methods" />
    </div>

    <logger-time-field v-model="form.time" label="Time of Feed" :error="errors.time" />

    <!-- Bottle -->
    <template v-if="form.method === 'bottle'">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <label for="feed-qty" class="text-sm text-app-text-secondary">Quantity Consumed</label>
          <span class="text-sm" role="radiogroup" aria-label="Unit">
            <template v-for="(u, i) in ['ml', 'oz'] as const" :key="u">
              <span v-if="i === 1" class="text-app-text-secondary mx-1" aria-hidden="true">/</span>
              <button type="button" role="radio" :aria-checked="settings.liquidUnit === u"
                :class="['focus-ring rounded', settings.liquidUnit === u ? 'font-bold text-app-primary' : 'text-app-text-secondary']"
                @click="setUnit(u)">{{ u }}</button>
            </template>
          </span>
        </div>
        <div class="relative">
          <input id="feed-qty" v-model.number="form.quantity" type="number" inputmode="decimal" min="0"
            :step="settings.liquidUnit === 'ml' ? 5 : 0.5" :aria-invalid="!!errors.quantity"
            :class="['w-full rounded-2xl bg-app-surface-subtle px-4 pe-14 py-3.5 text-lg font-bold text-app-text-primary outline-none border border-transparent focus:border-app-primary focus:bg-app-surface transition-colors', errors.quantity ? 'ring-2 ring-danger/60' : '']" />
          <span class="absolute top-1/2 -translate-y-1/2 end-4 text-sm text-app-text-secondary pointer-events-none">{{ settings.liquidUnit }}</span>
        </div>
        <p v-if="errors.quantity" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
          <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.quantity }}
        </p>
        <div class="flex flex-wrap gap-2">
          <button v-for="q in quickAdds" :key="q.label" type="button"
            class="px-3 py-1.5 rounded-full bg-app-surface-subtle text-xs font-semibold text-app-text-secondary hover:text-app-text-primary hover:bg-app-border/40 transition-colors focus-ring"
            @click="q.apply()">
            {{ q.label }}
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-sm text-app-text-secondary">Liquid Type</p>
        <v-choice v-model="form.liquid" label="Liquid type" :options="liquids" />
      </div>
    </template>

    <!-- Nursing -->
    <template v-else>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="side in sides" :key="side.key" class="space-y-2">
          <label :for="`feed-${side.key}`" class="text-sm text-app-text-secondary">{{ side.label }} (minutes)</label>
          <input :id="`feed-${side.key}`" v-model.number="form[side.key]" type="number" inputmode="numeric" min="0" max="120"
            class="w-full rounded-2xl bg-app-surface-subtle px-4 py-3.5 text-lg font-bold text-app-text-primary outline-none border border-transparent focus:border-app-primary focus:bg-app-surface transition-colors" />
        </div>
      </div>
      <p v-if="errors.duration" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
        <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.duration }}
      </p>
    </template>

    <logger-notes-field v-model="form.notes" label="Add soothing notes & latch observations (optional)"
      placeholder="Burped easily on shoulder, calm suckle, seemed content…" />
  </div>
</template>

<script setup lang="ts">
import type { FeedForm, LogErrors } from '~/types/logger'

const props = defineProps<{ form: FeedForm; errors: LogErrors }>()
const settings = useAppSettings()

const methods = [
  { value: 'bottle' as const, label: 'Bottle Feed', icon: 'lucide:milk' },
  { value: 'nursing' as const, label: 'Nursing (Chest)', icon: 'lucide:heart' },
]
const liquids = [
  { value: 'expressed' as const, label: 'Expressed Milk' },
  { value: 'formula' as const, label: 'Formula' },
  { value: 'combo' as const, label: 'Fortified Combo' },
]
const sides = [
  { key: 'leftMin' as const, label: 'Left' },
  { key: 'rightMin' as const, label: 'Right' },
]

const round = (n: number, unit: 'ml' | 'oz') => (unit === 'ml' ? Math.round(n) : Math.round(n * 10) / 10)

const setUnit = (u: 'ml' | 'oz') => {
  const prev = settings.value.liquidUnit
  if (prev === u) return
  if (props.form.quantity) {
    props.form.quantity = round(prev === 'ml' ? props.form.quantity / 29.5735 : props.form.quantity * 29.5735, u)
  }
  settings.value.liquidUnit = u
}

const add = (amount: number) => { props.form.quantity = round((props.form.quantity || 0) + amount, settings.value.liquidUnit) }

const quickAdds = computed(() => {
  const ml = settings.value.liquidUnit === 'ml'
  const full = ml ? 120 : 4
  return [
    { label: ml ? '+15 ml' : '+0.5 oz', apply: () => add(ml ? 15 : 0.5) },
    { label: ml ? '+30 ml' : '+1 oz', apply: () => add(ml ? 30 : 1) },
    { label: ml ? '+60 ml' : '+2 oz', apply: () => add(ml ? 60 : 2) },
    { label: `Full bottle (${full})`, apply: () => { props.form.quantity = full } },
  ]
})
</script>
