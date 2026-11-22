<template>
  <div class="w-full max-w-[1240px] mx-auto p-4 md:p-0 space-y-6">
    <v-preview-bar v-model="view" :options="views" label="Component sandbox · View state:" hint="State:" />

    <!-- Header: desktop -->
    <header class="hidden md:flex items-end justify-between gap-6">
      <div class="min-w-0">
        <p class="flex items-center gap-2 text-base text-app-text-secondary">
          <Icon name="lucide:smile" class="w-4 h-4" /> {{ baby.name }} • {{ ageText }} <span aria-hidden="true">•</span> Care Timeline
        </p>
        <h1 class="text-4xl font-bold tracking-tight text-app-text-primary mt-1.5">Today's Routine Timeline</h1>
        <p class="text-base text-app-text-secondary mt-2 max-w-xl">
          Gentle, calm log of sleep, feeds, and routine changes. Low-stress glanceability.
        </p>
      </div>
      <div class="flex items-center bg-app-surface border border-app-border rounded-2xl p-1.5 shrink-0" role="group" aria-label="Choose day">
        <button v-for="d in days" :key="d.value" type="button" :aria-pressed="day === d.value" :class="[
          'px-5 py-2.5 rounded-xl text-sm font-medium transition-colors focus-ring flex items-center gap-2',
          day === d.value ? 'bg-app-surface-subtle text-app-text-primary font-semibold' : 'text-app-text-secondary hover:text-app-text-primary',
        ]" @click="day = d.value">
          <Icon v-if="d.value === 'today'" name="lucide:calendar" class="w-4 h-4" />
          {{ d.label }}
        </button>
      </div>
    </header>

    <!-- Header: phone -->
    <div class="md:hidden space-y-4">
      <section class="bg-app-surface border border-app-border rounded-3xl p-4 flex items-center gap-4 shadow-xs">
        <img :src="baby.avatarUrl" :alt="baby.name" class="w-16 h-16 rounded-full object-cover border border-app-border" />
        <div class="min-w-0 flex-1">
          <p class="text-xl font-bold text-app-text-primary">{{ baby.name }} <span class="text-sm font-normal text-app-text-secondary">• {{ ageText }}</span></p>
          <p class="flex items-center gap-1.5 text-sm text-app-text-secondary">
            <span class="w-2 h-2 rounded-full bg-app-success shrink-0" />
            {{ isActive ? 'Sleeping' : 'Awake & content' }} <span class="truncate">• since {{ sinceLabel }}</span>
          </p>
        </div>
        <button type="button" aria-label="Log a routine"
          class="w-12 h-12 rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center active:scale-95 transition-transform focus-ring"
          @click="navigateTo(localePath('/quick-log'))">
          <Icon name="lucide:plus" class="w-6 h-6" />
        </button>
      </section>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-app-text-primary">{{ dayLabelShort }}</h1>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full bg-app-surface-subtle text-sm text-app-text-secondary">{{ visibleCount }} events</span>
          <button v-for="d in days" :key="d.value" type="button" :aria-label="`Show ${d.label}`" :aria-pressed="day === d.value"
            :class="['w-9 h-9 rounded-full flex items-center justify-center transition-colors', day === d.value ? 'bg-app-primary-soft text-app-primary' : 'text-app-text-secondary']"
            @click="day = d.value">
            <Icon :name="d.value === 'today' ? 'lucide:calendar' : 'lucide:history'" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Filters + summary -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Filter entries">
        <button v-for="f in filters" :key="f.value" type="button" role="tab" :aria-selected="filter === f.value" :class="[
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors focus-ring',
          filter === f.value ? 'bg-app-primary text-white' : 'bg-app-surface border border-app-border text-app-text-secondary hover:text-app-text-primary',
        ]" @click="filter = f.value">
          <Icon v-if="f.icon" :name="f.icon" class="w-4 h-4" />
          {{ f.label }}
          <span :class="['px-1.5 min-w-5 rounded-full text-xs', filter === f.value ? 'bg-white/20' : 'bg-app-surface-subtle']">{{ f.count }}</span>
        </button>
      </div>
      <ul class="hidden lg:flex items-center gap-5 text-sm text-app-text-secondary">
        <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-app-primary" /> {{ formatDuration(summary.sleepMinutes.value) }} logged sleep</li>
        <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-app-accent" /> {{ summary.bottleMl.value }}ml + {{ summary.nursing.value.length }} nursing</li>
        <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-app-warning" /> {{ summary.diapers.value.length }} {{ summary.diapers.value.length === 1 ? 'change' : 'changes' }}</li>
      </ul>
    </div>

    <!-- Skeleton -->
    <div v-if="view === 'skeleton'" class="space-y-4 animate-pulse" aria-busy="true" aria-label="Loading timeline">
      <div class="h-28 rounded-card bg-app-surface-subtle" />
      <div v-for="n in 3" :key="n" class="h-32 rounded-2xl bg-app-surface-subtle" />
    </div>

    <template v-else>
      <!-- Updated pill -->
      <Transition name="fade-up">
        <p v-if="view === 'updated'" class="flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-app-primary-soft text-sm font-semibold text-app-primary" role="status">
          <Icon name="lucide:refresh-cw" class="w-4 h-4" /> Just updated • Synced with your care circle
        </p>
      </Transition>

      <!-- Yesterday / empty -->
      <div v-if="showEmpty"
        class="bg-app-surface border border-dashed border-app-border rounded-card p-10 text-center space-y-3">
        <span class="w-14 h-14 mx-auto rounded-full bg-app-surface-subtle text-app-text-secondary flex items-center justify-center">
          <Icon name="lucide:calendar-x" class="w-7 h-7" />
        </span>
        <h2 class="text-lg font-bold text-app-text-primary">{{ day === 'yesterday' ? "Yesterday's entries live in History" : 'A quiet day so far' }}</h2>
        <p class="text-sm text-app-text-secondary max-w-sm mx-auto">
          {{ day === 'yesterday' ? 'Open the full day log to review everything that was recorded.' : 'Nothing is logged yet. Record a feed, nap or change whenever you are ready.' }}
        </p>
        <nuxt-link-locale :to="day === 'yesterday' ? '/history' : '/quick-log'"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-app-primary text-white text-sm font-semibold hover:bg-app-primary-hover transition-colors focus-ring">
          {{ day === 'yesterday' ? 'View Day Log' : 'Open Quick Log' }}
          <Icon name="lucide:arrow-right" class="w-4 h-4 rtl:rotate-180" />
        </nuxt-link-locale>
      </div>

      <template v-else>
        <timeline-live-card v-if="isActive && (filter === 'all' || filter === 'sleep')" />

        <section class="space-y-3" aria-label="Completed routines">
          <div class="hidden md:flex items-center justify-between text-xs tracking-wider text-app-text-secondary px-1">
            <h2 class="font-semibold">COMPLETED ROUTINES</h2>
            <span>Sorted by recency</span>
          </div>

          <TransitionGroup name="list" tag="div" class="space-y-3">
            <timeline-entry-card v-for="e in completed" :key="e.id" :entry="e" @edit="startEdit(e)"
              @duplicate="duplicate(e)" @delete="askDelete(e)" />
          </TransitionGroup>

          <p v-if="!completed.length" class="text-sm text-app-text-secondary text-center py-8">Nothing here for this filter.</p>
        </section>
      </template>

      <!-- Footer: yesterday -->
      <footer class="hidden md:flex items-center justify-between gap-4 pt-5 border-t border-app-border text-sm">
        <p class="flex items-center gap-2 text-app-text-secondary">
          <Icon name="lucide:history" class="w-4 h-4" />
          <strong class="text-app-text-primary">Yesterday, {{ yesterdayShort }}</strong>
          <span>• 9 total events logged (14h 20m sleep, 720ml feeds)</span>
        </p>
        <nuxt-link-locale to="/history" class="flex items-center gap-1.5 font-semibold text-app-primary hover:underline">
          View Day Log <Icon name="lucide:arrow-right" class="w-4 h-4 rtl:rotate-180" />
        </nuxt-link-locale>
      </footer>
    </template>

    <!-- Delete confirmation -->
    <v-dialog :open="!!deleting" title="Delete this entry?" :subtitle="deleting ? `${deleting.title} • ${deleting.clock}` : ''"
      icon="lucide:trash-2" tile="bg-danger/10 text-danger" @close="deleting = null" @discard="deleting = null"
      @save="confirmDelete">
      <p class="text-base text-app-text-secondary leading-relaxed">
        This removes the entry from today's timeline. You can undo right after.
      </p>
      <template #footer="{ requestClose, save: submit }">
        <div class="flex flex-col-reverse md:flex-row gap-3">
          <button type="button" class="px-6 py-3.5 rounded-2xl text-base font-semibold text-app-text-primary md:bg-app-surface-subtle hover:bg-app-border/40 transition-colors focus-ring" @click="requestClose()">
            Keep entry
          </button>
          <button type="button" class="md:flex-1 flex items-center justify-center gap-2 px-6 py-3.5 min-h-[52px] rounded-2xl bg-danger text-white text-base font-semibold hover:opacity-90 active:scale-[0.98] transition-all focus-ring" @click="submit()">
            <Icon name="lucide:trash-2" class="w-4 h-4" /> Delete Entry
          </button>
        </div>
      </template>
    </v-dialog>

    <!-- Edit -->
    <v-dialog :open="!!editing" title="Edit Entry" :subtitle="editing ? `${editing.title} • ${editing.clock}` : ''"
      icon="lucide:pencil" tile="bg-app-primary-soft text-app-primary" save-label="Save Changes" :dirty="editDirty"
      @close="editing = null" @discard="editing = null" @save="saveEdit">
      <div class="space-y-2.5">
        <label for="edit-notes" class="text-sm font-semibold text-app-text-primary">Notes</label>
        <textarea id="edit-notes" v-model="draft" rows="4"
          class="w-full rounded-2xl bg-app-surface-subtle px-4 py-3.5 text-base text-app-text-primary outline-none border border-transparent focus:border-app-primary focus:bg-app-surface transition-colors resize-none" />
      </div>
    </v-dialog>

    <!-- Undo / info toast -->
    <Teleport to="body">
      <Transition name="fade-up">
        <div v-if="toast.visible" role="status"
          class="fixed z-50 bottom-24 md:bottom-8 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center gap-3 ps-4 pe-2 py-2 rounded-2xl bg-app-text-primary text-app-bg text-sm font-semibold shadow-lg">
          <Icon name="lucide:check-circle-2" class="w-4 h-4" /> {{ toast.text }}
          <button v-if="toast.undo" type="button" class="ms-1 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors focus-ring" @click="undo">
            Undo
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { EventType, TimelineEntry } from '~/types/home'

type View = 'populated' | 'skeleton' | 'empty' | 'updated'

const { baby } = useBabyProfile()
const { locale } = useI18n()
const localePath = useLocalePath()
const settings = useAppSettings()
const entries = useTimelineEntries()
const sleep = useSleepSession()
const { isActive, startedAt } = sleep
const summary = useDaySummary()

const view = ref<View>('populated')
const views: { value: View; label: string }[] = [
  { value: 'populated', label: 'Populated' },
  { value: 'skeleton', label: 'Skeleton' },
  { value: 'empty', label: 'Empty Day' },
  { value: 'updated', label: 'Just Updated' },
]

const day = ref<'today' | 'yesterday'>('today')
const filter = ref<EventType>('all')

// ── Labels ──────────────────────────────────────────────────────────
const fmtDay = (offset: number, opts: Intl.DateTimeFormatOptions) =>
  new Date(Date.now() - offset * 864e5).toLocaleDateString(locale.value, opts)
const todayShort = computed(() => fmtDay(0, { month: 'short', day: 'numeric' }))
const yesterdayShort = computed(() => fmtDay(1, { month: 'short', day: 'numeric' }))
const days = computed(() => [
  { value: 'today' as const, label: `Today, ${todayShort.value}` },
  { value: 'yesterday' as const, label: `Yesterday, ${yesterdayShort.value}` },
])
const dayLabelShort = computed(() =>
  day.value === 'today'
    ? `Today, ${fmtDay(0, { day: 'numeric', month: 'short' })}`
    : `Yesterday, ${fmtDay(1, { day: 'numeric', month: 'short' })}`,
)
const ageText = computed(() => `${baby.ageLabel.replace('mo', ' months old')}`)
const sinceLabel = computed(() => {
  const t = isActive.value ? startedAt.value : (summary.lastSleepEnded.value?.at ?? Date.now())
  return formatClock(msToHHmm(t), settings.value.timeFormat)
})

// ── Data ────────────────────────────────────────────────────────────
const showEmpty = computed(() => day.value === 'yesterday' || view.value === 'empty' || entries.value.length === 0)

const count = (t: 'feed' | 'sleep' | 'diaper') => entries.value.filter(e => e.type === t).length
const filters = computed(() => [
  { value: 'all' as EventType, label: 'All', icon: '', count: entries.value.length },
  { value: 'feed' as EventType, label: 'Feeding', icon: 'lucide:milk', count: count('feed') },
  { value: 'sleep' as EventType, label: 'Sleep', icon: 'lucide:moon', count: count('sleep') },
  { value: 'diaper' as EventType, label: 'Diapers', icon: 'lucide:droplet', count: count('diaper') },
])

const matches = (e: TimelineEntry) => filter.value === 'all' || e.type === filter.value
const completed = computed(() => entries.value.filter(e => !e.isActive && matches(e)))
const visibleCount = computed(() => (showEmpty.value ? 0 : entries.value.filter(matches).length))

// ── Actions: edit / duplicate / delete (+ undo) ─────────────────────
const toast = reactive({ visible: false, text: '', undo: false })
let toastTimer: ReturnType<typeof setTimeout> | undefined
const showToast = (text: string, undoable = false) => {
  toast.text = text
  toast.undo = undoable
  toast.visible = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.visible = false }, undoable ? 6000 : 2800)
}
onBeforeUnmount(() => clearTimeout(toastTimer))

const deleting = ref<TimelineEntry | null>(null)
let lastDeleted: { entry: TimelineEntry; index: number } | null = null

const askDelete = (e: TimelineEntry) => { deleting.value = e }
const confirmDelete = () => {
  const target = deleting.value
  if (!target) return
  const index = entries.value.findIndex(e => e.id === target.id)
  if (index === -1) { deleting.value = null; return }
  lastDeleted = { entry: target, index }
  entries.value = entries.value.filter(e => e.id !== target.id)
  deleting.value = null
  showToast('Entry deleted', true)
}
const undo = () => {
  if (!lastDeleted) return
  const next = [...entries.value]
  next.splice(Math.min(lastDeleted.index, next.length), 0, lastDeleted.entry)
  entries.value = next
  lastDeleted = null
  showToast('Entry restored')
}

const duplicate = (e: TimelineEntry) => {
  const copy: TimelineEntry = {
    ...e, id: `dup-${Date.now()}`, isActive: false, at: Date.now(),
    clock: formatClock(nowHHmm(), settings.value.timeFormat),
  }
  const index = entries.value.findIndex(x => x.id === e.id)
  const next = [...entries.value]
  next.splice(index, 0, copy)
  entries.value = next
  showToast(`${e.title} duplicated`)
}

const editing = ref<TimelineEntry | null>(null)
const draft = ref('')
const editDirty = computed(() => !!editing.value && draft.value !== editing.value.description)
const startEdit = (e: TimelineEntry) => { editing.value = e; draft.value = e.description }
const saveEdit = () => {
  const target = editing.value
  if (!target) return
  entries.value = entries.value.map(e => (e.id === target.id ? { ...e, description: draft.value.trim() || e.description } : e))
  editing.value = null
  showToast('Entry updated')
}

useSeoMeta({
  title: "Today's Timeline — TinySteps",
  description: "A calm, chronological log of today's sleep, feeds and changes.",
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
