<template>
  <div class="w-full max-w-[1180px] mx-auto p-4 md:p-0 space-y-6">
    <v-preview-bar v-model="view" :options="views" label="Component inspector · DailySummary" hint="Preview" />

    <!-- Header -->
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div class="min-w-0">
        <p class="text-xs font-semibold tracking-wider text-app-text-secondary">
          <span class="hidden md:inline">DAILY SYNTHESIS</span><span class="md:hidden">TODAY'S RHYTHM</span>
          <span class="font-normal normal-case tracking-normal"> • {{ baby.name }} <span class="hidden md:inline">• Week {{ baby.week }}</span><span class="md:hidden">• {{ baby.ageLabel }}</span></span>
        </p>
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-app-text-primary mt-1.5">
          {{ greeting }}, {{ baby.name }}'s family
        </h1>
        <p class="text-base text-app-text-secondary mt-2 max-w-xl leading-relaxed">
          A calm glance at today's rhythm. Recorded calmly without pressure, comparisons, or arbitrary milestones.
        </p>
      </div>
      <p class="flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-full bg-app-surface border border-app-border text-sm text-app-text-secondary shrink-0">
        <Icon name="lucide:sprout" class="w-4 h-4 text-app-primary" /> Descriptive routine log • Not medical guidance
      </p>
    </header>

    <!-- Skeleton -->
    <div v-if="view === 'skeleton'" class="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading summary">
      <div class="grid md:grid-cols-3 gap-5">
        <div v-for="n in 3" :key="n" class="h-48 rounded-card bg-app-surface-subtle" />
      </div>
      <div class="h-24 rounded-card bg-app-surface-subtle" />
      <div class="h-72 rounded-card bg-app-surface-subtle" />
    </div>

    <template v-else>
      <!-- Stat cards -->
      <section aria-label="Today at a glance" class="grid grid-cols-[minmax(0,1fr)] md:grid-cols-3 gap-4 md:gap-5">
        <article v-for="c in cards" :key="c.label" class="bg-app-surface border border-app-border rounded-card p-5 md:p-6 shadow-xs flex md:flex-col gap-4 md:gap-0 md:min-h-[210px]">
          <span :class="['md:hidden w-14 h-14 rounded-full flex items-center justify-center shrink-0', c.tile]">
            <Icon :name="c.icon" class="w-6 h-6" />
          </span>
          <div class="min-w-0 flex-1 flex flex-col">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs md:text-xs font-semibold tracking-wider text-app-text-secondary uppercase">
                  <span class="md:hidden normal-case tracking-normal text-sm font-normal">{{ c.mobileLabel }}</span><span class="hidden md:inline">{{ c.label }}</span>
                </p>
                <p class="text-2xl md:text-3xl font-bold text-app-text-primary mt-1 tabular-nums">{{ c.value }}</p>
              </div>
              <span :class="['hidden md:flex w-12 h-12 rounded-xl items-center justify-center shrink-0', c.tile]">
                <Icon :name="c.icon" class="w-5 h-5" />
              </span>
            </div>
            <div class="md:mt-auto pt-2 md:pt-6 space-y-2">
              <div class="flex items-center justify-between gap-2 text-sm text-app-text-secondary">
                <span class="truncate min-w-0">{{ c.detail }}</span>
                <span v-if="c.chip" class="hidden md:inline px-2.5 py-0.5 rounded-full bg-app-surface-subtle text-xs font-medium text-app-text-primary whitespace-nowrap">{{ c.chip }}</span>
                <span v-if="c.chip" class="md:hidden px-3 py-1 rounded-full bg-app-surface-subtle text-sm text-app-text-primary whitespace-nowrap">{{ c.chipShort }}</span>
              </div>
              <p class="hidden md:flex items-center gap-2 text-sm text-app-text-secondary">
                <Icon :name="c.lastIcon" class="w-4 h-4 shrink-0" />
                <span class="truncate">{{ c.last }}</span>
              </p>
            </div>
          </div>
        </article>
      </section>

      <div class="flex items-center justify-between gap-3 text-sm text-app-text-secondary px-1">
        <p class="flex items-center gap-2 min-w-0"><Icon name="lucide:info" class="w-4 h-4 shrink-0 md:hidden" /><Icon name="lucide:leaf" class="w-4 h-4 shrink-0 hidden md:block" />
          <span class="truncate">Based only on your recorded entries today<span class="hidden md:inline">. Every baby finds their own natural rhythm</span><span class="md:hidden"> · Not medical guidance</span>.</span>
        </p>
        <p class="hidden md:block shrink-0">Refreshed just now</p>
      </div>

      <!-- Action dock -->
      <section class="bg-app-surface border border-app-border rounded-card p-4 md:p-5 shadow-xs md:flex items-center justify-between gap-6" aria-labelledby="dock-title">
        <div class="hidden md:flex items-center gap-4">
          <span class="w-12 h-12 rounded-xl bg-app-primary-soft text-app-primary flex items-center justify-center">
            <Icon name="lucide:circle-check-big" class="w-6 h-6" />
          </span>
          <div>
            <h2 id="dock-title" class="text-base font-bold text-app-text-primary">One-Touch Action Dock</h2>
            <p class="text-sm text-app-text-secondary">Log right away without navigating away</p>
          </div>
        </div>
        <div class="flex items-center justify-between md:justify-end gap-3">
          <p class="md:hidden text-xs font-semibold tracking-wider text-app-text-secondary">QUICK ROUTINE LOG</p>
          <p class="md:hidden text-sm font-semibold text-app-primary">One-tap entry</p>
        </div>
        <div class="grid grid-cols-3 md:flex gap-3 mt-3 md:mt-0">
          <button v-for="a in dock" :key="a.label" type="button"
            class="flex flex-col md:flex-row items-center justify-center gap-2 px-5 py-3.5 md:py-3 rounded-2xl text-base font-semibold text-app-text-primary hover:brightness-95 active:scale-[0.97] transition-all focus-ring"
            :class="a.cls" @click="a.run()">
            <span class="md:hidden w-10 h-10 rounded-full bg-app-surface/70 flex items-center justify-center"><Icon :name="a.mobileIcon" class="w-5 h-5" /></span>
            <Icon :name="a.icon" class="hidden md:block w-5 h-5" /> {{ a.label }}
          </button>
        </div>
      </section>

      <!-- Stream + guidance -->
      <div class="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-6 items-start">
        <section class="bg-app-surface border border-app-border rounded-card p-5 md:p-7 shadow-xs space-y-4" aria-labelledby="stream-title">
          <div class="flex items-center justify-between gap-3">
            <h2 id="stream-title" class="flex items-center gap-3 text-xl md:text-2xl font-bold text-app-text-primary">
              <Icon name="lucide:clock" class="md:hidden w-5 h-5 text-app-primary" />
              <span class="hidden md:inline">Today's Chronological Stream</span><span class="md:hidden">Latest Entries</span>
              <span class="hidden md:inline px-2.5 py-0.5 rounded-full bg-app-surface-subtle text-xs font-medium text-app-text-secondary">{{ summary.total.value }} Total</span>
            </h2>
            <nuxt-link-locale to="/timeline" class="flex items-center gap-1 text-sm font-semibold text-app-text-primary hover:text-app-primary">
              <span class="hidden md:inline">View full log</span><span class="md:hidden">View History</span>
              <Icon name="lucide:chevron-right" class="hidden md:block w-4 h-4 rtl:rotate-180" />
            </nuxt-link-locale>
          </div>

          <div v-if="empty" class="text-center py-10 space-y-2">
            <span class="w-14 h-14 mx-auto rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center"><Icon name="lucide:sprout" class="w-7 h-7" /></span>
            <p class="text-lg font-bold text-app-text-primary">A fresh start</p>
            <p class="text-sm text-app-text-secondary">Your first log will appear here. No rush — rough times are totally fine.</p>
          </div>

          <ul v-else class="space-y-3">
            <!-- Live nap -->
            <li v-if="isActive" class="flex items-center gap-4 rounded-2xl bg-app-primary-soft p-4">
              <span class="w-12 h-12 rounded-full bg-app-primary text-white flex items-center justify-center shrink-0"><Icon name="lucide:moon" class="w-5 h-5" /></span>
              <div class="min-w-0 flex-1">
                <p class="flex items-center gap-2 flex-wrap">
                  <span class="text-base font-semibold text-app-text-primary">Afternoon Crib Nap</span>
                  <span class="px-2.5 py-0.5 rounded-full bg-app-surface text-xs font-medium text-app-primary">In Progress</span>
                </p>
                <p class="text-sm text-app-text-secondary truncate">{{ summary.activeSleep.value?.description }}</p>
              </div>
              <p class="text-2xl font-bold font-mono tabular-nums text-app-primary">{{ shortTimer }}</p>
              <button type="button" aria-label="Finish sleep session"
                class="w-10 h-10 rounded-xl bg-app-surface text-app-text-primary flex items-center justify-center hover:bg-app-primary-soft transition-colors focus-ring" @click="openFinish">
                <Icon name="lucide:square" class="w-4 h-4" />
              </button>
            </li>

            <li v-for="e in stream" :key="e.id" class="flex items-center gap-4 rounded-2xl bg-app-surface-subtle p-4">
              <span :class="['w-12 h-12 rounded-full flex items-center justify-center shrink-0', routineTypeMeta[e.type].tile]">
                <Icon :name="routineTypeMeta[e.type].icon" class="w-5 h-5" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="flex items-center gap-2 flex-wrap">
                  <span class="text-base font-semibold text-app-text-primary">{{ e.title }}</span>
                  <span v-if="e.type === 'diaper'" :class="['px-2 py-0.5 rounded-md text-xs font-medium', badgeClass(e.badgeColor)]">{{ e.badge }}</span>
                </p>
                <p class="text-sm text-app-text-secondary truncate">{{ e.metric ? `${e.metric.value} • ` : '' }}{{ e.description }}</p>
              </div>
              <div class="text-end shrink-0">
                <p class="text-base font-semibold text-app-text-primary">{{ e.metric && e.type === 'sleep' ? e.metric.value : e.clock.replace('Started ', '') }}</p>
                <p class="text-sm text-app-text-secondary">{{ e.type === 'sleep' ? e.clock : summary.when(e) }}</p>
              </div>
            </li>
          </ul>
        </section>

        <aside class="hidden md:block">
          <section class="bg-app-surface border border-app-border rounded-card overflow-hidden shadow-xs">
            <div class="relative h-48 bg-gradient-to-br from-app-primary-soft via-app-surface-subtle to-app-accent-soft flex items-center justify-center">
              <span class="absolute top-3 start-3 px-3 py-1 rounded-full bg-app-surface/90 text-sm font-medium text-app-text-primary">Gentle Guidance</span>
              <Icon name="lucide:bed-double" class="w-16 h-16 text-app-primary/50" />
            </div>
            <div class="p-6 space-y-4">
              <h2 class="text-2xl font-bold text-app-text-primary">Natural Wake Windows</h2>
              <p class="text-base text-app-text-secondary leading-relaxed">
                At {{ baby.week }} weeks, {{ baby.name }}'s comfortable awake periods typically linger between 75 and 110 minutes. Watch for subtle
                yawn stretches and gentle ear touches rather than watching the clock.
              </p>
              <p class="flex items-start gap-3 rounded-2xl bg-app-surface-subtle p-4 text-sm text-app-text-secondary">
                <Icon name="lucide:heart" class="w-5 h-5 text-app-primary shrink-0" /> You are doing wonderfully. Rest whenever you can today.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
type View = 'populated' | 'empty' | 'skeleton'

const { baby } = useBabyProfile()
const { greeting } = useGreeting()
const summary = useDaySummary()
const { isActive, openStart, openFinish, formattedTimer } = useSleepSession()
const { openLogger } = useRoutineLogger()

const view = ref<View>('populated')
const views: { value: View; label: string }[] = [
  { value: 'populated', label: 'Populated' },
  { value: 'empty', label: 'Empty / New' },
  { value: 'skeleton', label: 'Skeleton' },
]

const empty = computed(() => view.value === 'empty' || summary.total.value === 0)

// 00:42:18 -> "42m 18s" for the compact live row
const shortTimer = computed(() => {
  const [h = '00', m = '00', s = '00'] = formattedTimer.value.split(':')
  return Number(h) ? `${Number(h)}h ${m}m` : `${Number(m)}m ${s}s`
})

const stream = computed(() => summary.entries.value.filter(e => !e.isActive))

const cards = computed(() => {
  const s = summary
  const feedN = s.feeds.value.length
  const bottlePct = feedN ? Math.round((s.bottles.value.length / feedN) * 100) : 0
  const napN = s.sleeps.value.length
  const lastSleep = s.lastSleepEnded.value
  const lastFeed = s.lastFeed.value
  const lastChange = s.lastDiaper.value
  const empty_ = empty.value
  return [
    {
      label: 'FEEDING', mobileLabel: 'Feeding', icon: 'lucide:milk', tile: 'bg-app-accent-soft text-app-accent',
      value: empty_ ? '0 feeds' : `${feedN} ${feedN === 1 ? 'feed' : 'feeds'}`,
      detail: empty_ ? 'Nothing recorded yet' : `${s.bottles.value.length} bottle (${s.bottleMl.value} ml) · ${s.nursing.value.length} nursing`,
      chip: empty_ ? '' : `${bottlePct}% bottle`, chipShort: 'Bottle & Nurse',
      lastIcon: 'lucide:clock', last: lastFeed && !empty_ ? `Last feed: ${s.when(lastFeed)} (${lastFeed.badge})` : 'No feed logged yet',
    },
    {
      label: 'SLEEP RECORDED', mobileLabel: 'Rest & Sleep', icon: 'lucide:moon', tile: 'bg-app-primary-soft text-app-primary',
      value: empty_ ? '0m' : formatDuration(s.sleepMinutes.value),
      detail: empty_ ? 'Nothing recorded yet' : `${napN} ${napN === 1 ? 'nap' : 'naps'} today`,
      chip: empty_ ? '' : (isActive.value ? 'Nap in progress' : 'Rested'), chipShort: 'Crib & Wrap',
      lastIcon: 'lucide:moon-star', last: lastSleep && !empty_ ? `Last ended: ${s.when(lastSleep)} (${lastSleep.badge}${lastSleep.metric ? ` · ${lastSleep.metric.value}` : ''})` : 'No sleep ended yet',
    },
    {
      label: 'DIAPER CHANGES', mobileLabel: 'Changes', icon: 'lucide:droplet', tile: 'bg-app-surface-subtle text-app-text-secondary',
      value: empty_ ? '0 changes' : `${s.diapers.value.length} ${s.diapers.value.length === 1 ? 'change' : 'changes'}`,
      detail: empty_ ? 'Nothing recorded yet' : `${s.wetCount.value} wet · ${s.mixedCount.value} mixed${s.dirtyCount.value ? ` · ${s.dirtyCount.value} dirty` : ''}`,
      chip: empty_ ? '' : 'Skin calm', chipShort: 'Calm tummy',
      lastIcon: 'lucide:history', last: lastChange && !empty_ ? `Last change: ${s.when(lastChange)} (${lastChange.badge})` : 'No change logged yet',
    },
  ]
})

const dock = [
  { label: 'Feed', icon: 'lucide:milk', mobileIcon: 'lucide:plus', cls: 'bg-app-accent-soft', run: () => openLogger('feed') },
  { label: 'Sleep', icon: 'lucide:moon', mobileIcon: 'lucide:moon', cls: 'bg-app-primary-soft', run: () => (isActive.value ? openFinish() : openStart()) },
  { label: 'Diaper', icon: 'lucide:droplet', mobileIcon: 'lucide:droplet', cls: 'bg-app-surface-subtle', run: () => openLogger('diaper') },
]

useSeoMeta({
  title: 'Daily Summary — TinySteps',
  description: "A calm, descriptive glance at today's feeds, sleep and diaper changes.",
})
</script>
