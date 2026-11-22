<template>
  <div class="w-full max-w-[1100px] mx-auto p-4 md:p-0 space-y-6">
    <!-- Phone: status strip -->
    <div class="md:hidden flex items-center justify-between gap-3">
      <p class="flex items-center gap-2 text-base text-app-text-secondary min-w-0">
        <span class="w-2.5 h-2.5 rounded-full bg-app-success shrink-0" />
        <span class="truncate">{{ baby.name }} is {{ isActive ? 'sleeping' : 'awake' }} • {{ ageDays }}</span>
      </p>
      <span v-if="!isActive" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-app-surface-subtle text-sm font-medium text-app-text-primary shrink-0">
        <Icon name="lucide:moon" class="w-4 h-4" /> Next Nap ~ {{ nextNapMin }}m
      </span>
    </div>

    <!-- Desktop: header -->
    <header class="hidden md:block">
      <p class="text-xs font-semibold tracking-wider text-app-primary">
        CARE HUB <span class="font-normal text-app-text-secondary">• One tap to log</span>
      </p>
      <h1 class="text-4xl font-bold tracking-tight text-app-text-primary mt-2">Quick-Log Care Hub</h1>
      <p class="text-lg text-app-text-secondary mt-3 max-w-2xl leading-relaxed">
        Friction-free, low-cognitive-load care logging crafted for sleep-deprived caregivers. Single-click access to
        nursery essentials with zero clutter.
      </p>
    </header>

    <!-- Active rhythm + actions -->
    <section class="md:bg-app-surface md:border md:border-app-border md:rounded-card md:p-8 md:shadow-xs space-y-5" aria-labelledby="rhythm-title">
      <div class="flex items-center justify-between gap-3">
        <h2 id="rhythm-title" class="flex flex-wrap items-center gap-x-2 text-base">
          <span class="hidden md:inline-block w-2.5 h-2.5 rounded-full bg-app-success" />
          <span class="hidden md:inline font-semibold text-app-text-primary">{{ baby.name }}'s Active Rhythm</span>
          <span class="md:hidden text-3xl font-bold text-app-text-primary">Quick Log</span>
          <span class="hidden md:inline text-app-text-secondary">• Last log {{ lastLogText }}</span>
        </h2>
        <span class="hidden md:inline px-3 py-1 rounded-lg bg-app-surface-subtle text-xs font-medium text-app-text-secondary">Single-Tap Ready</span>
        <span class="md:hidden text-sm text-app-text-secondary">{{ nowLabel }} • Single-tap</span>
      </div>

      <div class="grid grid-cols-3 gap-2.5 md:gap-5">
        <button v-for="a in actions" :key="a.type" type="button" :aria-keyshortcuts="a.key.toUpperCase()"
          class="group relative text-center md:text-start bg-app-surface md:bg-app-surface-subtle rounded-2xl md:rounded-3xl p-4 md:p-5 border border-app-border md:border-transparent shadow-xs md:shadow-none hover:bg-app-primary-soft/60 hover:border-app-primary/30 active:scale-[0.97] transition-all focus-ring"
          @click="a.run()">
          <span :class="['mx-auto md:mx-0 w-14 h-14 md:w-12 md:h-12 rounded-full flex items-center justify-center', a.tile]">
            <Icon :name="a.icon" class="w-6 h-6" />
          </span>
          <span class="block mt-3 md:mt-6 text-lg md:text-xl font-bold text-app-text-primary">{{ a.label }}</span>
          <span class="block text-sm text-app-text-secondary mt-0.5">
            <span class="hidden md:inline">{{ a.hint }}</span><span class="md:hidden">{{ a.short }}</span>
          </span>
          <Icon name="lucide:arrow-right" class="hidden md:block mt-4 w-5 h-5 text-app-text-secondary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
        </button>
      </div>

      <!-- Phone: last session -->
      <nuxt-link-locale to="/timeline" class="md:hidden flex items-center gap-3 bg-app-surface-subtle rounded-2xl px-4 py-3.5 text-sm text-app-text-secondary">
        <Icon name="lucide:info" class="w-5 h-5 shrink-0" />
        <span class="flex-1 min-w-0 truncate">Last session: {{ lastSessionText }}</span>
        <span class="font-semibold text-app-primary shrink-0 flex items-center gap-1">Details <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 rtl:rotate-180" /></span>
      </nuxt-link-locale>

      <div class="hidden md:flex items-center justify-between gap-4 text-sm text-app-text-secondary pt-1">
        <p class="flex items-center gap-2">
          <Icon name="lucide:clock" class="w-4 h-4" /> Predicted next nap window:
          <strong class="text-app-text-primary font-semibold">{{ napWindow }}</strong>
        </p>
        <p class="flex items-center gap-2">
          Tap key
          <template v-for="(a, i) in actions" :key="a.key">
            <kbd class="px-2 py-0.5 rounded-md bg-app-surface-subtle font-mono text-xs">{{ a.key.toUpperCase() }}</kbd>
            for {{ a.label.toLowerCase() === 'feeding' ? 'feed' : a.label.toLowerCase() }}<span v-if="i < actions.length - 1">,</span>
          </template>
        </p>
      </div>
    </section>

    <!-- Activity + overview -->
    <div class="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] gap-6 items-start">
      <section class="md:bg-app-surface md:border md:border-app-border md:rounded-card md:p-7 md:shadow-xs space-y-4" aria-labelledby="stream-title">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h2 id="stream-title" class="text-2xl md:text-xl font-bold text-app-text-primary">
              <span class="md:hidden">Today's Timeline</span><span class="hidden md:inline">Today's Activity Stream</span>
            </h2>
            <p class="hidden md:block text-sm text-app-text-secondary mt-0.5">
              {{ summary.feeds.value.length }} feeds • {{ summary.sleeps.value.length }} naps • {{ summary.diapers.value.length }} changes
            </p>
          </div>
          <p class="md:hidden text-sm text-app-text-secondary mt-1.5">{{ summary.total.value }} events logged</p>
          <nuxt-link-locale to="/timeline" class="hidden md:flex items-center gap-1 text-sm font-semibold text-app-text-primary hover:text-app-primary">
            View full log <Icon name="lucide:chevron-right" class="w-4 h-4 rtl:rotate-180" />
          </nuxt-link-locale>
        </div>

        <ul v-if="recent.length" class="space-y-3">
          <li v-for="e in recent" :key="e.id"
            class="flex items-center gap-3 md:gap-4 bg-app-surface md:bg-app-surface-subtle border border-app-border md:border-transparent rounded-2xl p-3.5 md:p-4 shadow-xs md:shadow-none">
            <span :class="['w-12 h-12 rounded-full md:rounded-xl flex items-center justify-center shrink-0', routineTypeMeta[e.type].tile]">
              <Icon :name="routineTypeMeta[e.type].icon" class="w-5 h-5" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="flex items-center gap-2 flex-wrap">
                <span class="text-base font-semibold text-app-text-primary">{{ e.title }}</span>
                <span :class="['px-2 py-0.5 rounded-md text-xs font-medium', badgeClass(e.badgeColor)]">{{ e.badge }}</span>
              </p>
              <p class="text-sm text-app-text-secondary truncate">{{ e.description }}</p>
            </div>
            <div class="text-end shrink-0 max-w-[42%]">
              <p class="text-sm font-semibold text-app-text-primary">{{ e.clock.replace('Started ', '') }}</p>
              <p class="hidden md:block text-xs text-app-text-secondary">{{ summary.when(e) }}</p>
            </div>
          </li>
        </ul>
        <p v-else class="text-sm text-app-text-secondary py-6 text-center">Nothing logged yet today — tap an action above to begin.</p>
      </section>

      <!-- Overview (md+) -->
      <aside class="hidden md:block space-y-4">
        <section class="bg-app-surface border border-app-border rounded-card p-6 space-y-4 shadow-xs" aria-labelledby="overview-title">
          <h2 id="overview-title" class="text-xl font-bold text-app-text-primary">Today's Overview</h2>
          <div class="grid grid-cols-3 gap-2.5">
            <div v-for="o in overview" :key="o.label" class="bg-app-surface-subtle rounded-xl p-3 text-center">
              <p class="text-xs text-app-text-secondary">{{ o.label }}</p>
              <p class="text-2xl font-bold text-app-text-primary tabular-nums mt-0.5">{{ o.value }}</p>
              <p class="text-[11px] text-app-text-secondary">{{ o.note }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-app-surface-subtle rounded-2xl p-4">
            <div class="min-w-0 flex-1">
              <p class="text-base font-bold text-app-text-primary">Wake Window Progress</p>
              <p class="text-xs text-app-text-secondary mt-0.5">
                {{ isActive ? 'Sleeping now' : `${awakeMinutes}m since last sleep` }} • Sweet spot at {{ sweetSpot }}m
              </p>
            </div>
            <div class="relative w-14 h-14 shrink-0" role="img" :aria-label="`${progress}% of the wake window`">
              <svg viewBox="0 0 36 36" class="w-14 h-14 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke-width="3.5" style="stroke: rgb(var(--color-border))" />
                <circle cx="18" cy="18" r="15" fill="none" stroke-width="3.5" stroke-linecap="round"
                  :stroke-dasharray="`${(progress / 100) * 94.2} 94.2`" style="stroke: rgb(var(--color-primary)); transition: stroke-dasharray 0.4s ease" />
              </svg>
              <span class="absolute inset-0 flex items-center justify-center text-xs font-bold text-app-text-primary">{{ progress }}%</span>
            </div>
          </div>
        </section>

        <section class="bg-app-primary-soft/60 border border-app-border rounded-card p-5 flex items-start gap-3">
          <Icon name="lucide:sprout" class="w-5 h-5 text-app-primary shrink-0 mt-0.5" />
          <div>
            <p class="text-base font-bold text-app-text-primary">Smooth Morning Pace</p>
            <p class="text-sm text-app-text-secondary leading-relaxed mt-1">
              {{ baby.name }} is naturally hitting her 75–90 min awake windows today. Everything is logged cleanly with zero missed entries.
            </p>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
const { baby } = useBabyProfile()
const settings = useAppSettings()
const summary = useDaySummary()
const sleep = useSleepSession()
const { isActive, now, openStart, openFinish, startOpen, finishOpen } = sleep
const { openLogger, open: loggerOpen } = useRoutineLogger()

// Sleep is a flow: start a session, or review & finish the running one
const logSleep = () => (isActive.value ? openFinish() : openStart())

const actions = computed(() => [
  { type: 'feed', key: 'f', label: 'Feeding', hint: 'Bottle, nursing, solids', short: summary.lastFeed.value ? summary.when(summary.lastFeed.value) : 'Log a feed', icon: 'lucide:milk', tile: 'bg-app-primary-soft text-app-primary', run: () => openLogger('feed') },
  { type: 'sleep', key: 's', label: 'Sleep', hint: 'Nap timer or manual log', short: isActive.value ? 'Sleeping' : 'Start a nap', icon: 'lucide:moon', tile: 'bg-app-accent-soft text-app-accent', run: logSleep },
  { type: 'diaper', key: 'd', label: 'Diaper', hint: 'Wet, dirty, mixed', short: summary.lastDiaper.value ? summary.when(summary.lastDiaper.value) : 'Log a change', icon: 'lucide:droplet', tile: 'bg-app-surface-subtle text-app-text-secondary', run: () => openLogger('diaper') },
])

// F / S / D shortcuts — ignored while typing or when a dialog is open
useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return
  if (loggerOpen.value || startOpen.value || finishOpen.value) return
  const el = e.target as HTMLElement | null
  if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
  actions.value.find(a => a.key === e.key.toLowerCase())?.run()
})

// ── Derived display ─────────────────────────────────────────────────
const recent = computed(() => summary.entries.value.slice(0, 4))
const lastLogText = computed(() => {
  const e = summary.entries.value[0]
  return e ? `${summary.when(e)} (${e.title})` : 'none yet'
})
const lastSessionText = computed(() => {
  const e = summary.lastFeed.value
  return e ? `${e.metric?.value ?? e.badge} ${e.title.replace(/ Bottle$/, '')} at ${e.clock}` : 'nothing logged yet'
})
const nowLabel = computed(() => formatClock(msToHHmm(now.value), settings.value.timeFormat))
const ageDays = '3m 12d'

const sweetSpot = 80
const awakeMinutes = computed(() => {
  const last = summary.lastSleepEnded.value
  return last?.at ? Math.max(0, Math.floor((now.value - last.at) / 60_000)) : 0
})
const progress = computed(() => Math.min(100, Math.round((awakeMinutes.value / sweetSpot) * 100)))
const nextNapMin = computed(() => Math.max(0, sweetSpot - awakeMinutes.value))
const napWindow = computed(() => {
  const from = now.value + Math.max(0, sweetSpot - awakeMinutes.value) * 60_000
  const f = (ms: number) => formatClock(msToHHmm(ms), settings.value.timeFormat)
  return `${f(from)} – ${f(from + 30 * 60_000)}`
})

const overview = computed(() => [
  { label: 'Total Feeds', value: String(summary.feeds.value.length), note: `${summary.bottleMl.value} ml equiv` },
  { label: 'Day Sleep', value: formatDuration(summary.sleepMinutes.value), note: `${summary.sleeps.value.length} sessions` },
  { label: 'Diapers', value: String(summary.diapers.value.length), note: `${summary.wetCount.value} Wet · ${summary.mixedCount.value} Mixed` },
])

useSeoMeta({
  title: 'Quick Log — TinySteps',
  description: 'One-tap logging for feeds, sleep and diaper changes.',
})
</script>
