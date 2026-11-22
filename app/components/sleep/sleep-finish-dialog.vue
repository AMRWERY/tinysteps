<template>
  <v-dialog :open="finishOpen" title="Finish & Review Sleep Session" :subtitle="`${baby.name} • Rest summary`"
    icon="lucide:alarm-clock-check" tile="bg-app-primary-soft text-app-primary" save-label="Save Sleep Session"
    confirm-title="Discard this sleep session?" confirm-text="The timer will stop and nothing will be saved."
    confirm-label="Discard Session" keep-label="Keep Session" @close="finishOpen = false" @discard="discard"
    @save="save">
    <div class="space-y-5">
      <!-- Total duration -->
      <div :class="['rounded-2xl p-5 flex items-start justify-between gap-4', valid ? 'bg-app-primary-soft' : 'bg-danger/10']"
        aria-live="polite">
        <div>
          <p class="text-xs font-semibold tracking-wider text-app-text-secondary">TOTAL DURATION</p>
          <p class="text-3xl font-bold text-app-text-primary mt-1">{{ valid ? durationLabel : '—' }}</p>
        </div>
        <div class="text-end text-sm">
          <p :class="['flex items-center justify-end gap-1.5 font-semibold', valid ? 'text-app-primary' : 'text-danger']">
            <Icon :name="valid ? 'lucide:check-circle-2' : 'lucide:alert-circle'" class="w-4 h-4" />
            {{ valid ? rangeTitle : 'Check the times' }}
          </p>
          <p class="text-app-text-secondary mt-1">{{ valid ? rangeText : 'Wake must be after start' }}</p>
        </div>
      </div>

      <!-- Times -->
      <div class="grid grid-cols-2 gap-4">
        <logger-time-field v-model="startTime" label="Start Time" icon="lucide:moon" :show-now="false" />
        <logger-time-field v-model="wakeTime" label="Wake Time" icon="lucide:sun" :show-now="false" />
      </div>
      <p v-if="error" class="flex items-center gap-1.5 text-xs text-danger -mt-2" role="alert">
        <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ error }}
      </p>

      <!-- Where -->
      <div class="space-y-2.5">
        <p class="text-sm text-app-text-secondary">Where did {{ baby.name }} sleep?</p>
        <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Sleep location">
          <button v-for="l in locations" :key="l.value" type="button" role="radio" :aria-checked="location === l.value"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors focus-ring',
              location === l.value ? 'bg-app-primary-soft text-app-primary' : 'bg-app-surface-subtle text-app-text-secondary hover:text-app-text-primary',
            ]" @click="location = l.value">
            {{ l.label }}
          </button>
        </div>
      </div>

      <!-- Notes -->
      <div class="space-y-2.5">
        <label for="sleep-review-notes" class="text-sm text-app-text-secondary">Soothing observation notes (optional)</label>
        <textarea id="sleep-review-notes" v-model="notes" rows="3"
          placeholder="e.g. Fell asleep with gentle rocking, woke bright and alert."
          class="w-full rounded-2xl bg-app-surface-subtle px-4 py-3 text-base text-app-text-primary placeholder:text-app-text-secondary/70 outline-none border border-transparent focus:border-app-primary focus:bg-app-surface transition-colors resize-none" />
      </div>
    </div>

    <template #footer="{ askDiscard, save: submit }">
      <div class="flex flex-col-reverse md:flex-row md:items-center gap-3">
        <div class="flex items-center gap-4 md:flex-1">
          <button type="button"
            class="flex-1 md:flex-none px-6 py-3.5 rounded-2xl bg-danger/10 text-danger text-base font-semibold hover:bg-danger/15 transition-colors focus-ring"
            @click="askDiscard()">
            Discard
          </button>
          <span class="hidden md:inline text-sm text-app-text-secondary">Esc to cancel</span>
        </div>
        <button type="button"
          class="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[52px] rounded-2xl bg-app-primary text-white text-base font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs focus-ring"
          @click="submit()">
          Save Sleep Session
          <span class="hidden md:inline text-sm font-normal text-white/80">• {{ isMac ? '⌘' : 'Ctrl' }}+Enter</span>
        </button>
      </div>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type { TimelineEntry } from '~/types/home'
import type { SleepLocation } from '~/composables/useSleepSession'

const emit = defineEmits<{ (e: 'done', message: string): void }>()

const { finishOpen, startedAt, now, stop } = useSleepSession()
const timelineEntries = useTimelineEntries()
const settings = useAppSettings()
const { baby, caregiver } = useBabyProfile()

const startTime = ref('')
const wakeTime = ref('')
const location = ref<SleepLocation>('bassinet')
const notes = ref('')
const error = ref('')
const isMac = ref(false)
onMounted(() => { isMac.value = /Mac|iPhone|iPad/.test(navigator.platform) })

const locations: { value: SleepLocation; label: string }[] = [
  { value: 'bassinet', label: 'Bassinet' },
  { value: 'contact', label: 'Contact Nap' },
  { value: 'stroller', label: 'Stroller' },
  { value: 'cosleep', label: 'Co-sleep' },
]

watch(finishOpen, (isOpen) => {
  if (!isOpen) return
  startTime.value = msToHHmm(startedAt.value)
  wakeTime.value = nowHHmm()
  location.value = 'bassinet'
  notes.value = ''
  error.value = ''
}, { flush: 'sync' })

// Start sits on the day the session began, wake on today (handles overnight sleeps)
const startMs = computed(() => (startTime.value ? withTime(startedAt.value, startTime.value) : NaN))
const wakeMs = computed(() => (wakeTime.value ? withTime(now.value, wakeTime.value) : NaN))
const minutes = computed(() => Math.round((wakeMs.value - startMs.value) / 60_000))
const valid = computed(() => Number.isFinite(minutes.value) && minutes.value > 0)

const durationLabel = computed(() => {
  const h = Math.floor(minutes.value / 60)
  const m = minutes.value % 60
  return h ? (m ? `${h} hr ${m} min` : `${h} hr`) : `${m} min`
})

const rangeTitle = computed(() => (minutes.value < 20 ? 'Quick rest' : minutes.value > 240 ? 'Long rest' : 'Restful Interval'))
const rangeText = computed(() => (minutes.value < 20 ? 'Shorter than usual' : minutes.value > 240 ? 'Longer than usual' : 'Within typical range'))

// Clear the error as soon as the times make sense again
watch(valid, (ok) => { if (ok) error.value = '' })

const removeActive = () => timelineEntries.value.filter(e => !e.isActive)

const save = () => {
  if (!valid.value) {
    error.value = 'Wake time must be after the start time.'
    return
  }
  const fmt = (t: string) => formatClock(t, settings.value.timeFormat)
  const where = locations.find(l => l.value === location.value)!.label
  const startHour = Number(startTime.value.split(':')[0])
  const entry: TimelineEntry = {
    id: `sleep-${Date.now()}`, type: 'sleep', title: startHour >= 19 || startHour < 5 ? 'Night Sleep' : 'Nap',
    badge: where, badgeColor: 'subtle', clock: `${fmt(startTime.value)} – ${fmt(wakeTime.value)}`,
    metric: { value: formatDuration(minutes.value), label: 'Rest' },
    description: notes.value.trim() || 'Logged just now', loggedBy: caregiver.name,
  }
  timelineEntries.value = [entry, ...removeActive()]
  stop()
  finishOpen.value = false
  emit('done', `${baby.name}'s sleep saved to today's timeline`)
}

const discard = () => {
  timelineEntries.value = removeActive()
  stop()
  finishOpen.value = false
  emit('done', 'Sleep session discarded')
}
</script>
