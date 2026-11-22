<template>
  <v-dialog :open="open" :title="meta.title" :subtitle="meta.subtitle" :icon="meta.icon" :tile="meta.tile"
    badge="Active" :dirty="dirty" :saving="saving" @close="close" @save="save">
    <logger-feed-form v-if="type === 'feed'" :form="feed" :errors="errors" />
    <logger-sleep-form v-else-if="type === 'sleep'" :form="sleep" :errors="errors" />
    <logger-diaper-form v-else :form="diaper" :errors="errors" />
  </v-dialog>

  <v-toast :visible="toastVisible">{{ toastText }}</v-toast>
</template>

<script setup lang="ts">
import type { TimelineEntry } from '~/types/home'
import type { DiaperForm, FeedForm, LogErrors, SleepForm } from '~/types/logger'

const { open, type, closeLogger } = useRoutineLogger()
const settings = useAppSettings()
const { baby, caregiver } = useBabyProfile()
const timelineEntries = useTimelineEntries()

// ── Form state (reset every time the dialog opens) ──────────────────
const freshFeed = (): FeedForm => ({
  method: 'bottle', time: nowHHmm(), quantity: settings.value.liquidUnit === 'ml' ? 120 : 4,
  liquid: 'expressed', leftMin: null, rightMin: null, notes: '',
})
const freshSleep = (): SleepForm => ({ kind: 'nap', start: nowHHmm(), end: '', location: 'crib', notes: '' })
const freshDiaper = (): DiaperForm => ({ kind: 'wet', time: nowHHmm(), observation: 'normal', notes: '' })

const feed = reactive<FeedForm>(freshFeed())
const sleep = reactive<SleepForm>(freshSleep())
const diaper = reactive<DiaperForm>(freshDiaper())
const errors = reactive<LogErrors>({})
const saving = ref(false)

const currentForm = computed(() => (type.value === 'feed' ? feed : type.value === 'sleep' ? sleep : diaper))
let snapshot = ''

watch(open, (isOpen) => {
  if (!isOpen) return
  Object.assign(feed, freshFeed())
  Object.assign(sleep, freshSleep())
  Object.assign(diaper, freshDiaper())
  Object.keys(errors).forEach(k => delete errors[k])
  saving.value = false
  snapshot = JSON.stringify(currentForm.value)
}, { flush: 'sync' })

const dirty = computed(() => open.value && JSON.stringify(currentForm.value) !== snapshot)

const meta = computed(() => ({
  feed: { title: 'Log Feeding Routine', subtitle: 'Record nourishment at your own pace without pressure.', icon: 'lucide:milk', tile: routineTypeMeta.feed.tile },
  sleep: { title: 'Log Sleep Routine', subtitle: `Capture ${baby.name}'s naps and night sleeps, no math needed.`, icon: 'lucide:moon', tile: routineTypeMeta.sleep.tile },
  diaper: { title: 'Log Diaper Change', subtitle: 'A quick, calm record of changes and skin health.', icon: 'lucide:droplet', tile: 'bg-app-accent-soft text-app-accent' },
}[type.value]))

// ── Validation ──────────────────────────────────────────────────────
const validate = () => {
  Object.keys(errors).forEach(k => delete errors[k])

  if (type.value === 'feed') {
    if (!feed.time) errors.time = 'Please choose the time of the feed.'
    if (feed.method === 'bottle' && !(feed.quantity && feed.quantity > 0)) errors.quantity = 'Enter how much was consumed.'
    if (feed.method === 'nursing' && !((feed.leftMin || 0) + (feed.rightMin || 0) > 0)) errors.duration = 'Enter minutes for at least one side.'
  } else if (type.value === 'sleep') {
    if (!sleep.start) errors.start = 'Please choose when sleep started.'
    if (sleep.end && sleep.start && sleep.end === sleep.start) errors.end = 'Wake-up time must differ from the start time.'
  } else if (!diaper.time) {
    errors.time = 'Please choose the time of the change.'
  }
  return Object.keys(errors).length === 0
}

// ── Save → timeline entry ───────────────────────────────────────────
const buildEntry = (): TimelineEntry => {
  const fmt = (t: string) => formatClock(t, settings.value.timeFormat)
  const base = { id: `log-${Date.now()}`, loggedBy: caregiver.name }

  if (type.value === 'feed') {
    if (feed.method === 'nursing') {
      const l = feed.leftMin || 0
      const r = feed.rightMin || 0
      return {
        ...base, type: 'feed', title: 'Nursing Feed', badge: `L ${l}m • R ${r}m`, badgeColor: 'primary',
        clock: fmt(feed.time), metric: { value: `${l + r}m`, label: 'Nursing' },
        description: feed.notes.trim() || 'Logged just now',
      }
    }
    const names = { expressed: 'Expressed Milk', formula: 'Formula', combo: 'Fortified Combo' }
    const qty = `${feed.quantity} ${settings.value.liquidUnit}`
    return {
      ...base, type: 'feed', title: `${names[feed.liquid]} Bottle`, badge: qty, badgeColor: 'subtle',
      clock: fmt(feed.time), metric: { value: qty, label: 'Bottle' },
      description: feed.notes.trim() || 'Logged just now',
    }
  }

  if (type.value === 'sleep') {
    const where = { crib: 'Crib', bassinet: 'Bassinet', arms: 'In arms', stroller: 'Stroller' }[sleep.location]
    const title = sleep.kind === 'nap' ? 'Nap' : 'Night Sleep'
    if (!sleep.end) {
      return {
        ...base, type: 'sleep', title: `${title} (In Progress)`, badge: 'Active', badgeColor: 'primary', isActive: true,
        clock: `Started ${fmt(sleep.start)}`, description: `${where}${sleep.notes.trim() ? ` • ${sleep.notes.trim()}` : ''}`,
      }
    }
    return {
      ...base, type: 'sleep', title, badge: where, badgeColor: 'subtle',
      clock: `${fmt(sleep.start)} – ${fmt(sleep.end)}`,
      metric: { value: formatDuration(minutesBetween(sleep.start, sleep.end)), label: 'Rest' },
      description: sleep.notes.trim() || 'Logged just now',
    }
  }

  const kind = { wet: 'Wet', dirty: 'Dirty', both: 'Wet + Dirty' }[diaper.kind]
  const obs = { normal: 'Normal', 'skin-clear': 'Skin clear', rash: 'Rash noted' }[diaper.observation]
  return {
    ...base, type: 'diaper', title: 'Diaper Change', badge: kind, badgeColor: 'warning',
    clock: fmt(diaper.time), description: diaper.notes.trim() || `${obs} • Logged just now`,
  }
}

const toastVisible = ref(false)
const toastText = ref('')
let toastTimer: ReturnType<typeof setTimeout> | undefined
let saveTimer: ReturnType<typeof setTimeout> | undefined

const showToast = (text: string) => {
  toastText.value = text
  toastVisible.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2800)
}

const save = () => {
  if (saving.value || !validate()) return
  saving.value = true
  // Brief "saving" state — swap for the real persistence call once a backend exists
  saveTimer = setTimeout(() => {
    timelineEntries.value = [buildEntry(), ...timelineEntries.value]
    const label = { feed: 'Feeding', sleep: 'Sleep', diaper: 'Diaper change' }[type.value]
    saving.value = false
    closeLogger()
    showToast(`${label} saved to today's timeline`)
  }, 600)
}

const close = () => closeLogger()

onBeforeUnmount(() => { clearTimeout(toastTimer); clearTimeout(saveTimer) })
</script>
