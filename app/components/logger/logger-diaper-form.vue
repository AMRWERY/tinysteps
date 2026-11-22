<template>
  <div class="space-y-6">
    <!-- Phones: last logged -->
    <div v-if="lastDiaper" class="md:hidden flex items-center gap-3 bg-app-surface-subtle rounded-2xl p-3">
      <img :src="baby.avatarUrl" :alt="baby.name" class="w-14 h-14 rounded-xl object-cover shrink-0" />
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold text-app-text-primary truncate">
          Last logged: {{ lastDiaper.badge }} • {{ lastDiaper.clock }}
        </p>
        <p class="text-sm text-app-text-secondary truncate">{{ baby.name }}'s gentle daily rhythm</p>
      </div>
      <Icon name="lucide:sprout" class="w-5 h-5 text-app-primary shrink-0" />
    </div>

    <!-- Type -->
    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-app-text-primary">
          <span class="hidden md:inline">Select Diaper Type</span><span class="md:hidden">Change Type</span>
        </h3>
        <span class="text-sm text-app-text-secondary">
          <span class="hidden md:inline">Single tap selection</span><span class="md:hidden">Select one</span>
        </span>
      </div>
      <div class="grid grid-cols-3 gap-2.5 md:gap-4" role="radiogroup" aria-label="Diaper type">
        <button v-for="k in kinds" :key="k.value" type="button" role="radio" :aria-checked="form.kind === k.value"
          :class="[
            'relative flex flex-col items-center gap-1 rounded-2xl py-4 md:py-5 px-2 text-center transition-all focus-ring',
            form.kind === k.value
              ? 'bg-app-primary-soft shadow-sm ring-1 ring-app-primary/30'
              : 'bg-app-surface-subtle hover:bg-app-border/30',
          ]" @click="form.kind = k.value">
          <span v-if="form.kind === k.value"
            class="absolute top-2 end-2 w-6 h-6 rounded-full bg-app-primary text-white flex items-center justify-center">
            <Icon name="lucide:check" class="w-3.5 h-3.5" />
          </span>
          <span class="w-11 h-11 rounded-full bg-app-surface flex items-center justify-center text-app-primary mb-1">
            <Icon :name="k.icon" class="w-5 h-5" />
          </span>
          <span class="text-lg md:text-xl font-bold text-app-text-primary leading-tight">{{ k.label }}</span>
          <span class="text-xs md:text-sm text-app-text-secondary">
            <span class="hidden md:inline">{{ k.desktopHint }}</span><span class="md:hidden">{{ k.mobileHint }}</span>
          </span>
        </button>
      </div>
    </section>

    <!-- Time -->
    <section :class="['bg-app-surface-subtle rounded-2xl p-4 space-y-3', errors.time ? 'ring-2 ring-danger/60' : '']">
      <div class="flex items-center justify-between">
        <p class="flex items-center gap-2 text-base font-semibold text-app-text-primary">
          <Icon name="lucide:clock" class="w-5 h-5 text-app-text-secondary" /> Time of Change
        </p>
        <button type="button"
          class="px-3 py-1.5 rounded-lg bg-app-primary-soft text-sm font-semibold text-app-primary hover:bg-app-primary/15 transition-colors focus-ring"
          @click="form.time = nowHHmm()">
          <span class="hidden md:inline">Set to Just now</span><span class="md:hidden">Just now</span>
        </button>
      </div>
      <div class="relative flex items-center gap-2">
        <div class="flex-1 flex items-center justify-between gap-2 rounded-xl bg-app-surface ps-4 pe-2 py-2">
          <span class="text-base md:text-lg text-app-text-primary">Today, {{ timeLabel }}</span>
          <button type="button" aria-label="Edit time"
            class="w-10 h-10 rounded-lg flex items-center justify-center text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle transition-colors focus-ring"
            @click="openPicker">
            <Icon name="lucide:calendar-clock" class="w-5 h-5" />
          </button>
        </div>
        <button v-for="m in [15, 30]" :key="m" type="button"
          class="hidden md:block px-4 py-3.5 rounded-xl bg-app-surface text-sm font-medium text-app-text-primary hover:bg-app-primary-soft transition-colors focus-ring"
          @click="shift(-m)">
          -{{ m }}m
        </button>
        <input ref="pickerInput" v-model="form.time" type="time" tabindex="-1" aria-label="Time of diaper change"
          class="absolute w-px h-px opacity-0 pointer-events-none" />
      </div>
      <p v-if="errors.time" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
        <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.time }}
      </p>
    </section>

    <!-- Care details -->
    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-app-text-primary">
          <span class="hidden md:inline">Common Care Details <span class="font-normal">(Optional)</span></span>
          <span class="md:hidden">Quick Notes</span>
        </h3>
        <span class="md:hidden text-sm text-app-text-secondary">Tap any that apply</span>
      </div>

      <!-- Desktop chips: check / plus -->
      <div class="hidden md:flex flex-wrap gap-2.5">
        <button v-for="c in desktopChips" :key="c.id" type="button" :aria-pressed="has(c.id)"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors focus-ring',
            has(c.id) ? 'bg-app-primary-soft text-app-primary' : 'bg-app-surface-subtle text-app-text-secondary hover:text-app-text-primary',
          ]" @click="toggle(c.id)">
          <Icon :name="has(c.id) ? 'lucide:check' : 'lucide:plus'" class="w-4 h-4" />
          {{ c.label }}
        </button>
      </div>

      <!-- Phone chips -->
      <div class="md:hidden flex flex-wrap gap-2.5">
        <button v-for="c in mobileChips" :key="c.id" type="button" :aria-pressed="has(c.id)"
          :class="[
            'px-4 py-2.5 rounded-full text-base font-medium transition-colors focus-ring',
            has(c.id) ? 'bg-app-primary-soft text-app-primary' : 'bg-app-surface-subtle text-app-text-primary',
          ]" @click="toggle(c.id)">
          {{ c.label }}
        </button>
      </div>
    </section>

    <!-- Notes -->
    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <label for="diaper-notes" class="text-base font-bold text-app-text-primary">
          <span class="hidden md:inline">Comfort &amp; Skin Notes <span class="font-normal text-app-text-secondary">(Optional)</span></span>
          <span class="md:hidden text-sm font-normal text-app-text-secondary">Observation notes (Optional)</span>
        </label>
        <span class="hidden md:inline text-sm text-app-text-secondary">Private routine log</span>
      </div>
      <textarea id="diaper-notes" v-model="form.notes" rows="3"
        placeholder="e.g. Soft skin, applied zinc barrier cream, happy and calm…"
        class="w-full rounded-2xl bg-app-surface-subtle px-4 py-3.5 text-base text-app-text-primary placeholder:text-app-text-secondary/70 outline-none border border-transparent focus:border-app-primary focus:bg-app-surface transition-colors resize-none" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { DiaperForm, LogErrors } from '~/types/logger'

const props = defineProps<{ form: DiaperForm; errors: LogErrors }>()

const settings = useAppSettings()
const { baby } = useBabyProfile()
const timelineEntries = useTimelineEntries()

const kinds = [
  { value: 'wet' as const, label: 'Wet', icon: 'lucide:droplet', desktopHint: 'Urine only', mobileHint: 'Hydrated' },
  { value: 'dirty' as const, label: 'Dirty', icon: 'lucide:sparkles', desktopHint: 'Bowel movement', mobileHint: 'Normal' },
  { value: 'both' as const, label: 'Mixed', icon: 'lucide:layers', desktopHint: 'Wet & dirty', mobileHint: 'Both' },
]

const desktopChips = [
  { id: 'normal', label: 'Normal' },
  { id: 'heavy', label: 'Heavy wet' },
  { id: 'cream', label: 'Barrier cream applied' },
  { id: 'cloth', label: 'Cloth diaper' },
]
const mobileChips = [
  { id: 'normal', label: 'Normal' },
  { id: 'heavy', label: 'Heavy' },
  { id: 'rash', label: 'Mild Rash Care' },
  { id: 'cream', label: 'Cream applied' },
  { id: 'nap', label: 'Before nap' },
]

const has = (id: string) => props.form.details.includes(id)
const toggle = (id: string) => {
  props.form.details = has(id) ? props.form.details.filter(d => d !== id) : [...props.form.details, id]
}

const lastDiaper = computed(() => timelineEntries.value.find(e => e.type === 'diaper'))

const timeLabel = computed(() => formatClock(props.form.time, settings.value.timeFormat) || '—')

// Step the time back (e.g. "-15m"), never past midnight of the same day
const shift = (minutes: number) => {
  const base = props.form.time ? withTime(Date.now(), props.form.time) : Date.now()
  const startOfDay = withTime(Date.now(), '00:00')
  props.form.time = msToHHmm(Math.max(startOfDay, base + minutes * 60_000))
}

const pickerInput = ref<HTMLInputElement>()
const openPicker = () => {
  const el = pickerInput.value
  if (!el) return
  try { el.showPicker() } catch { el.focus() }
}
</script>
