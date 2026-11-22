<template>
  <LazyVDialog :open="open" :title="meta.title" :subtitle="meta.subtitle" :subtitle-short="meta.subtitleShort"
    :icon="meta.icon" :tile="meta.tile" :mobile-icon="meta.mobileIcon" :mobile-tile="meta.mobileTile"
    :hide-mobile-icon="meta.hideMobileIcon" :badge="meta.badge" :badge-short="meta.badgeShort" :save-label="meta.saveLabel"
    :dirty="dirty" :saving="saving" @close="close" @discard="close" @save="save">
    <logger-feed-form v-if="type === 'feed'" :form="feed" :errors="errors" />
   
    <logger-sleep-form v-else-if="type === 'sleep'" :form="sleep" :errors="errors" />
   
    <logger-diaper-form v-else :form="diaper" :errors="errors" />

    <!-- Diaper uses a compact footer: shortcuts on the left, Discard + Save on the right -->
    <template v-if="type === 'diaper'" #footer="{ requestClose, save: submit }">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
        <p class="hidden md:flex items-center gap-2 text-xs text-app-text-secondary">
          <kbd class="px-2 py-1 rounded-md bg-app-surface-subtle font-mono">Esc discard</kbd>
          <kbd class="px-2 py-1 rounded-md bg-app-surface-subtle font-mono">⌘+Enter save</kbd>
        </p>
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
          <button type="button" :disabled="saving"
            class="order-2 md:order-1 px-5 py-3 text-base text-app-text-secondary hover:text-app-text-primary transition-colors focus-ring rounded-xl"
            @click="requestClose()">
            <span class="hidden md:inline">Discard</span><span class="md:hidden">Cancel</span>
          </button>
          <button type="button" :disabled="saving"
            class="order-1 md:order-2 flex items-center justify-center gap-2 px-7 py-3.5 min-h-[52px] rounded-2xl bg-app-primary text-white text-base font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs disabled:opacity-70 disabled:cursor-wait focus-ring"
            @click="submit()">
            <span v-if="saving" class="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            <Icon v-else name="lucide:check" class="w-4 h-4" />
            <span class="hidden md:inline">Save Diaper Entry</span><span class="md:hidden">Save Diaper Change</span>
          </button>
        </div>
      </div>
    </template>
  </LazyVDialog>

  <LazyVToast :visible="toastVisible">{{ toastText }}</LazyVToast>
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
const freshDiaper = (): DiaperForm => ({ kind: 'wet', time: nowHHmm(), details: ['normal'], notes: '' })

const feed = reactive<FeedForm>(freshFeed())
const sleep = reactive<SleepForm>(freshSleep())
const diaper = reactive<DiaperForm>(freshDiaper())
const errors = reactive<LogErrors>({})
const saving = ref(false)

// The amount is optional: empty (null or '') means "not recorded"
const hasQuantity = computed(() => feed.quantity !== null && (feed.quantity as unknown) !== '')

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
  feed: {
    title: 'Log Feeding', saveLabel: 'Save Feeding', hintNoun: 'feeding',
    badge: `${baby.name} · ${baby.week}w`, badgeShort: baby.name, hideMobileIcon: false,
    subtitle: 'Record feeding rhythms at your own pace without pressure. Every drop counts.',
    subtitleShort: 'Record nourishment with one hand',
    icon: 'lucide:smile', tile: 'bg-app-accent-soft text-app-accent',
    mobileIcon: 'lucide:milk', mobileTile: 'bg-app-primary-soft text-app-primary',
  },
  sleep: {
    title: 'Log Sleep', saveLabel: 'Save Sleep', hintNoun: 'sleep',
    badge: `${baby.name} · ${baby.week}w`, badgeShort: baby.name, hideMobileIcon: false,
    subtitle: `Capture ${baby.name}'s naps and night sleeps, no math needed.`,
    subtitleShort: 'Record naps and night sleeps',
    icon: 'lucide:moon', tile: routineTypeMeta.sleep.tile, mobileIcon: undefined, mobileTile: undefined,
  },
  diaper: {
    title: 'Log Diaper Change', saveLabel: 'Save Diaper Entry', hintNoun: 'diaper change',
    badge: 'Quick Log', badgeShort: 'Routine Care', hideMobileIcon: true,
    subtitle: 'Record daily routines with one click. Simple, private, and calm.',
    subtitleShort: `Quick, quiet logging so you can get back to ${baby.name}.`,
    icon: 'lucide:baby', tile: 'bg-app-primary-soft text-app-primary', mobileIcon: undefined, mobileTile: undefined,
  },
}[type.value]))

// ── Validation ──────────────────────────────────────────────────────
const validate = () => {
  Object.keys(errors).forEach(k => delete errors[k])

  if (type.value === 'feed') {
    if (!feed.time) errors.time = 'Please choose the time of the feed.'
    if (feed.method === 'bottle' && hasQuantity.value) {
      const max = settings.value.liquidUnit === 'ml' ? 500 : 17
      const q = Number(feed.quantity)
      if (!(q > 0 && q <= max)) errors.quantity = `Enter an amount between 1 and ${max} ${settings.value.liquidUnit}, or leave it blank.`
    }
    if (feed.method === 'nursing' && !((feed.leftMin || 0) + (feed.rightMin || 0) > 0)) errors.duration = 'Enter minutes for at least one side.'
  } else if (type.value === 'sleep') {
    if (!sleep.start) errors.start = 'Please choose when sleep started.'
    if (sleep.end && sleep.start && sleep.end === sleep.start) errors.end = 'Wake-up time must differ from the start time.'
  } else if (!diaper.time) {
    errors.time = 'Please choose the time of the change.'
  } else if (withTime(Date.now(), diaper.time) > Date.now() + 60_000) {
    errors.time = "Time can't be in the future."
  }
  return Object.keys(errors).length === 0
}

// ── Save → timeline entry ───────────────────────────────────────────
const buildEntry = (): TimelineEntry => {
  const fmt = (t: string) => formatClock(t, settings.value.timeFormat)
  const loggedAt = withTime(Date.now(), type.value === 'feed' ? feed.time : type.value === 'sleep' ? (sleep.end || sleep.start) : diaper.time)
  const base = { id: `log-${Date.now()}`, loggedBy: caregiver.name, at: loggedAt }

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
    const qty = hasQuantity.value ? `${feed.quantity} ${settings.value.liquidUnit}` : ''
    return {
      ...base, type: 'feed', title: `${names[feed.liquid]} Bottle`, badge: qty || 'Bottle', badgeColor: 'subtle',
      clock: fmt(feed.time), metric: qty ? { value: qty, label: 'Bottle' } : undefined,
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
  const parts = [...diaper.details.map(d => diaperDetailLabels[d] ?? d), diaper.notes.trim()].filter(Boolean)
  return {
    ...base, type: 'diaper', title: 'Diaper Change', badge: kind, badgeColor: 'warning',
    clock: fmt(diaper.time), description: parts.join(' • ') || 'Logged just now',
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
