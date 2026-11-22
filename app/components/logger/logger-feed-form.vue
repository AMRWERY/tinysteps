<template>
  <div>
    <!-- ═══════════════ Desktop / tablet ═══════════════ -->
    <div class="hidden md:block space-y-6">
      <!-- Method -->
      <section class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-app-text-primary">Feeding Method</h3>
          <span class="text-sm text-app-text-secondary">Choose either routine</span>
        </div>
        <div class="flex bg-app-surface-subtle rounded-2xl p-1.5 gap-1.5" role="radiogroup" aria-label="Feeding method">
          <button v-for="m in methods" :key="m.value" type="button" role="radio" :aria-checked="form.method === m.value"
            :class="[
              'flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-base font-semibold transition-all focus-ring',
              form.method === m.value ? 'bg-app-surface text-app-primary shadow-xs' : 'text-app-text-secondary hover:text-app-text-primary',
            ]" @click="form.method = m.value">
            <Icon :name="m.icon" class="w-5 h-5" />
            {{ m.label }}
            <Icon v-if="form.method === m.value" name="lucide:check-circle-2" class="w-4 h-4" />
          </button>
        </div>
      </section>

      <!-- Liquid + amount -->
      <section v-if="form.method === 'bottle'" class="bg-app-surface-subtle rounded-2xl p-5 space-y-4">
        <div class="space-y-2.5">
          <p class="text-sm text-app-text-secondary">Liquid Type</p>
          <div class="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Liquid type">
            <button v-for="l in liquids" :key="l.value" type="button" role="radio" :aria-checked="form.liquid === l.value"
              :class="[
                'flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors focus-ring',
                form.liquid === l.value ? 'bg-app-primary-soft text-app-primary' : 'bg-app-surface text-app-text-secondary hover:text-app-text-primary',
              ]" @click="form.liquid = l.value">
              <span v-if="form.liquid === l.value" class="w-1.5 h-1.5 rounded-full bg-app-primary" />
              {{ l.label }}
            </button>
          </div>
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label for="feed-qty-d" class="text-sm font-semibold text-app-text-primary">
              Amount Offered / Drank <span class="font-normal text-app-text-secondary">(Optional)</span>
            </label>
            <button type="button" class="text-sm text-app-text-secondary hover:text-app-text-primary focus-ring rounded"
              :title="`Switch to ${settings.liquidUnit === 'ml' ? 'ounces' : 'millilitres'}`"
              @click="setUnit(settings.liquidUnit === 'ml' ? 'oz' : 'ml')">
              Metric ({{ settings.liquidUnit }})
            </button>
          </div>
          <div class="flex items-stretch gap-3">
            <div class="relative flex-1">
              <input id="feed-qty-d" v-model.number="form.quantity" type="number" inputmode="decimal" min="0"
                :step="step" :aria-invalid="!!errors.quantity"
                :class="['w-full h-full rounded-2xl bg-app-surface ps-5 pe-14 py-4 text-3xl font-bold text-app-text-primary outline-none border border-transparent focus:border-app-primary transition-colors', errors.quantity ? 'ring-2 ring-danger/60' : '']" />
              <span class="absolute top-1/2 -translate-y-1/2 end-5 text-base text-app-text-secondary pointer-events-none">{{ settings.liquidUnit }}</span>
            </div>
            <div class="flex items-center bg-app-surface rounded-2xl">
              <button type="button" aria-label="Decrease amount"
                class="w-14 h-full min-h-[60px] flex items-center justify-center text-app-text-secondary hover:text-app-text-primary focus-ring rounded-s-2xl"
                @click="add(-step * 2)">
                <Icon name="lucide:minus" class="w-5 h-5" />
              </button>
              <button type="button" aria-label="Increase amount"
                class="w-14 h-full min-h-[60px] flex items-center justify-center text-app-text-secondary hover:text-app-text-primary focus-ring rounded-e-2xl"
                @click="add(step * 2)">
                <Icon name="lucide:plus" class="w-5 h-5" />
              </button>
            </div>
          </div>
          <p v-if="errors.quantity" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
            <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.quantity }}
          </p>
          <div class="flex items-center gap-2 pt-1">
            <span class="text-sm text-app-text-secondary me-1">Quick add:</span>
            <button v-for="q in quickAdds" :key="q.label" type="button"
              class="px-3.5 py-1.5 rounded-lg bg-app-surface text-sm font-medium text-app-text-primary hover:bg-app-primary-soft transition-colors focus-ring"
              @click="add(q.amount)">
              {{ q.label }}
            </button>
            <button type="button" class="ms-auto px-2 text-sm text-app-text-secondary hover:text-app-text-primary focus-ring rounded"
              @click="form.quantity = null">
              Clear
            </button>
          </div>
        </div>
      </section>

      <!-- Nursing minutes -->
      <section v-else class="bg-app-surface-subtle rounded-2xl p-5 space-y-3">
        <div class="grid grid-cols-2 gap-4">
          <div v-for="side in sides" :key="side.key" class="space-y-2">
            <label :for="`feed-${side.key}-d`" class="text-sm font-semibold text-app-text-primary">{{ side.label }} side <span class="font-normal text-app-text-secondary">(minutes)</span></label>
            <input :id="`feed-${side.key}-d`" v-model.number="form[side.key]" type="number" inputmode="numeric" min="0" max="120"
              class="w-full rounded-2xl bg-app-surface px-5 py-4 text-3xl font-bold text-app-text-primary outline-none border border-transparent focus:border-app-primary transition-colors" />
          </div>
        </div>
        <p v-if="errors.duration" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
          <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.duration }}
        </p>
      </section>

      <!-- Time -->
      <section class="space-y-2.5">
        <div class="flex items-center justify-between">
          <p class="flex items-center gap-2 text-sm font-semibold text-app-text-primary">
            <Icon name="lucide:clock" class="w-4 h-4" /> Time of Feeding
          </p>
          <span class="text-sm text-app-text-secondary">Logged in local time</span>
        </div>
        <div :class="['relative flex items-center gap-3 bg-app-surface-subtle rounded-2xl p-3', errors.time ? 'ring-2 ring-danger/60' : '']">
          <span class="w-11 h-11 rounded-full bg-app-surface text-app-text-secondary flex items-center justify-center shrink-0">
            <Icon name="lucide:clock" class="w-5 h-5" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-base font-bold text-app-text-primary">Today, {{ timeLabel }}</p>
            <p class="text-sm text-app-text-secondary">Rough times are totally fine</p>
          </div>
          <button type="button"
            class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-app-surface text-sm font-semibold text-app-primary hover:bg-app-primary-soft transition-colors focus-ring"
            @click="form.time = nowHHmm()">
            <Icon name="lucide:history" class="w-4 h-4" /> Just now
          </button>
          <button type="button" aria-label="Edit time"
            class="w-11 h-11 rounded-xl bg-app-surface text-app-text-secondary hover:text-app-text-primary flex items-center justify-center transition-colors focus-ring"
            @click="openPicker">
            <Icon name="lucide:calendar-clock" class="w-5 h-5" />
          </button>
          <input ref="pickerInput" v-model="form.time" type="time" tabindex="-1" aria-label="Time of feeding"
            class="absolute w-px h-px opacity-0 pointer-events-none" />
        </div>
        <p v-if="errors.time" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
          <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.time }}
        </p>
      </section>

      <!-- Notes -->
      <section class="space-y-2.5">
        <div class="flex items-center justify-between">
          <label for="feed-notes-d" class="flex items-center gap-2 text-sm font-semibold text-app-text-primary">
            <Icon name="lucide:file-pen-line" class="w-4 h-4" /> Soothing Notes
            <span class="font-normal text-app-text-secondary">(Optional)</span>
          </label>
          <span class="text-sm text-app-text-secondary">No metrics needed</span>
        </div>
        <textarea id="feed-notes-d" v-model="form.notes" rows="3"
          placeholder="Burped smoothly, calm suckle, seemed content and settled…"
          class="w-full rounded-2xl bg-app-surface-subtle px-5 py-4 text-base text-app-text-primary placeholder:text-app-text-secondary/70 outline-none border border-transparent focus:border-app-primary focus:bg-app-surface transition-colors resize-none" />
      </section>
    </div>

    <!-- ═══════════════ Phone sheet ═══════════════ -->
    <div class="md:hidden space-y-4">
      <div class="flex bg-app-surface-subtle rounded-2xl p-1.5 gap-1.5" role="radiogroup" aria-label="Feeding method">
        <button v-for="m in methods" :key="m.value" type="button" role="radio" :aria-checked="form.method === m.value"
          :class="[
            'flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold transition-all focus-ring',
            form.method === m.value ? 'bg-app-surface text-app-text-primary shadow-xs' : 'text-app-text-secondary',
          ]" @click="form.method = m.value">
          <Icon :name="m.mobileIcon" class="w-5 h-5" :class="m.value === 'nursing' ? 'text-app-accent' : ''" />
          {{ m.short }}
        </button>
      </div>

      <template v-if="form.method === 'bottle'">
        <section class="bg-app-surface-subtle rounded-3xl p-4 space-y-3">
          <div class="flex items-center justify-between gap-2">
            <label for="feed-qty-m" class="text-base font-semibold text-app-text-primary">Quantity</label>
            <span class="text-xs text-app-text-secondary">Flexible estimate is okay</span>
          </div>
          <div class="relative">
            <Icon name="lucide:droplet" class="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-app-text-secondary pointer-events-none" />
            <input id="feed-qty-m" v-model.number="form.quantity" type="number" inputmode="decimal" min="0" :step="step"
              :aria-invalid="!!errors.quantity"
              :class="['w-full rounded-2xl bg-app-surface ps-12 pe-14 py-3.5 text-3xl font-bold text-app-text-primary outline-none border border-transparent focus:border-app-primary transition-colors', errors.quantity ? 'ring-2 ring-danger/60' : '']" />
            <span class="absolute top-1/2 -translate-y-1/2 end-4 text-lg text-app-text-secondary pointer-events-none">{{ settings.liquidUnit }}</span>
          </div>
          <p v-if="errors.quantity" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
            <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.quantity }}
          </p>
          <div class="flex items-center gap-2 overflow-x-auto">
            <span class="text-sm text-app-text-secondary me-1 shrink-0">Quick add:</span>
            <button v-for="q in quickAdds" :key="q.label" type="button"
              class="px-4 py-2.5 rounded-full bg-app-surface text-sm font-semibold text-app-text-primary whitespace-nowrap active:scale-95 transition-transform focus-ring"
              @click="add(q.amount)">
              {{ q.label }}
            </button>
          </div>
        </section>

        <section class="space-y-2.5">
          <p class="text-base font-semibold text-app-text-primary">Liquid Type</p>
          <div class="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Liquid type">
            <button v-for="l in liquids" :key="l.value" type="button" role="radio" :aria-checked="form.liquid === l.value"
              :class="[
                'flex flex-col items-center gap-1 py-3 rounded-2xl text-sm font-semibold transition-colors focus-ring',
                form.liquid === l.value ? 'bg-app-primary text-white' : 'bg-app-surface-subtle text-app-text-secondary',
              ]" @click="form.liquid = l.value">
              <Icon :name="l.icon" class="w-5 h-5" />
              {{ l.short }}
            </button>
          </div>
        </section>
      </template>

      <section v-else class="bg-app-surface-subtle rounded-3xl p-4 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div v-for="side in sides" :key="side.key" class="space-y-2">
            <label :for="`feed-${side.key}-m`" class="text-sm font-semibold text-app-text-primary">{{ side.label }} <span class="font-normal text-app-text-secondary">(min)</span></label>
            <input :id="`feed-${side.key}-m`" v-model.number="form[side.key]" type="number" inputmode="numeric" min="0" max="120"
              class="w-full rounded-2xl bg-app-surface px-4 py-3.5 text-2xl font-bold text-app-text-primary outline-none border border-transparent focus:border-app-primary transition-colors" />
          </div>
        </div>
        <p v-if="errors.duration" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
          <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.duration }}
        </p>
      </section>

      <section class="bg-app-surface-subtle rounded-3xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <label for="feed-time-m" class="flex items-center gap-2 text-base font-semibold text-app-text-primary">
            <Icon name="lucide:clock" class="w-5 h-5 text-app-primary" /> Time of Feeding
          </label>
          <button type="button" class="px-3 py-1 rounded-full bg-app-primary-soft text-sm font-semibold text-app-primary focus-ring"
            @click="form.time = nowHHmm()">
            Just now
          </button>
        </div>
        <div class="flex items-center gap-2">
          <div class="relative flex-1">
            <input id="feed-time-m" v-model="form.time" type="time" :aria-invalid="!!errors.time"
              :class="['w-full rounded-2xl bg-app-surface px-4 py-3.5 text-base text-app-text-primary outline-none border border-transparent focus:border-app-primary transition-colors', errors.time ? 'ring-2 ring-danger/60' : '']" />
          </div>
          <span class="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-app-surface text-sm text-app-text-secondary">
            <Icon name="lucide:calendar" class="w-4 h-4" /> Today
          </span>
        </div>
        <p v-if="errors.time" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
          <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.time }}
        </p>
      </section>

      <section class="bg-app-surface-subtle rounded-3xl p-4 space-y-3">
        <label for="feed-notes-m" class="flex items-center gap-2 text-base font-semibold text-app-text-primary">
          <Icon name="lucide:file-pen-line" class="w-5 h-5 text-app-text-secondary" /> Comfort Notes
          <span class="text-sm font-normal text-app-text-secondary">(Optional)</span>
        </label>
        <input id="feed-notes-m" v-model="form.notes" type="text" placeholder="e.g. Burped easily, fell asleep peacefully"
          class="w-full rounded-2xl bg-app-surface px-4 py-3.5 text-base text-app-text-primary placeholder:text-app-text-secondary/70 outline-none border border-transparent focus:border-app-primary transition-colors" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FeedForm, LogErrors } from '~/types/logger'

const props = defineProps<{ form: FeedForm; errors: LogErrors }>()
const settings = useAppSettings()

const methods = [
  { value: 'bottle' as const, label: 'Bottle Feeding', short: 'Bottle', icon: 'lucide:milk', mobileIcon: 'lucide:milk' },
  { value: 'nursing' as const, label: 'Breastfeeding (Nursing)', short: 'Nursing', icon: 'lucide:droplet', mobileIcon: 'lucide:heart-handshake' },
]
const liquids = [
  { value: 'expressed' as const, label: 'Expressed Milk', short: 'Expressed', icon: 'lucide:milk' },
  { value: 'formula' as const, label: 'Formula', short: 'Formula', icon: 'lucide:flask-conical' },
  { value: 'combo' as const, label: 'Fortified / Mix', short: 'Both / Mix', icon: 'lucide:blend' },
]
const sides = [
  { key: 'leftMin' as const, label: 'Left' },
  { key: 'rightMin' as const, label: 'Right' },
]

const step = computed(() => (settings.value.liquidUnit === 'ml' ? 5 : 0.25))

const round = (n: number, unit: 'ml' | 'oz') => (unit === 'ml' ? Math.round(n) : Math.round(n * 10) / 10)

const setUnit = (u: 'ml' | 'oz') => {
  const prev = settings.value.liquidUnit
  if (prev === u) return
  if (props.form.quantity) {
    props.form.quantity = round(prev === 'ml' ? props.form.quantity / 29.5735 : props.form.quantity * 29.5735, u)
  }
  settings.value.liquidUnit = u
}

const add = (amount: number) => {
  const next = round((Number(props.form.quantity) || 0) + amount, settings.value.liquidUnit)
  props.form.quantity = Math.max(0, next)
}

const quickAdds = computed(() => {
  const ml = settings.value.liquidUnit === 'ml'
  return [
    { label: ml ? '+15 ml' : '+0.5 oz', amount: ml ? 15 : 0.5 },
    { label: ml ? '+30 ml' : '+1 oz', amount: ml ? 30 : 1 },
    { label: ml ? '+60 ml' : '+2 oz', amount: ml ? 60 : 2 },
  ]
})

const timeLabel = computed(() => formatClock(props.form.time, settings.value.timeFormat) || '—')

const pickerInput = ref<HTMLInputElement>()
const openPicker = () => {
  const el = pickerInput.value
  if (!el) return
  try { el.showPicker() } catch { el.focus() }
}
</script>
