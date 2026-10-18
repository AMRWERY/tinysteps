<template>
  <div class="w-full max-w-[1240px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- 1. Interactive Preview Toolbar -->
    <history-preview-toolbar v-model="previewState" />

    <!-- 2. Page Header: title + date nav + CTA -->
    <history-page-header :selected-date="selectedDate" @log-past-event="handleLogPastEvent" @prev-day="goToPrevDay"
      @next-day="goToNextDay" @jump-to-today="jumpToToday" />

    <!-- 3. Mobile Week Strip -->
    <div class="flex md:hidden items-center gap-2 overflow-x-auto py-1">
      <button v-for="d in weekDays" :key="d.day" :disabled="d.disabled" :class="[
        'flex-1 flex flex-col items-center py-2 px-1 rounded-2xl border text-center transition-all min-w-[58px]',
        d.selected
          ? 'bg-app-primary text-white border-app-primary shadow-xs font-bold'
          : d.disabled
            ? 'opacity-40 border-app-border text-app-text-secondary bg-app-surface'
            : 'border-app-border bg-app-surface text-app-text-primary'
      ]">
        <span class="text-[10px] tracking-wider uppercase font-semibold">{{ d.day }}</span>
        <div class="flex items-center gap-1 mt-0.5">
          <span class="text-base font-bold">{{ d.date }}</span>
          <span v-if="d.isToday" class="w-1.5 h-1.5 rounded-full bg-app-success"></span>
        </div>
      </button>
    </div>

    <!-- 4. Filter Pills Bar -->
    <history-filter-bar v-model="activeFilter" v-model:is-reversed="isReversed" :all-count="allEvents.length"
      :feed-count="feedCount" :sleep-count="sleepCount" :diaper-count="diaperCount" />

    <!-- 5. Two-column main grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

      <!-- Left / Main column (8 cols on desktop) -->
      <div class="lg:col-span-8 space-y-5">
        <!-- Day at a Glance -->
        <history-day-glance-card :summary="summary" />

        <!-- Timeline of Events -->
        <history-timeline-of-events :events="processedEvents" :preview-state="previewState" :is-reversed="isReversed"
          @log-past-event="handleLogPastEvent" />
      </div>

      <!-- Right column (4 cols on desktop) -->
      <div class="lg:col-span-4">
        <history-right-rail @export-digest="handleExportDigest" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { HistoryFilter, HistoryPreviewState, HistoryEventItem, DayGentleSummary } from '~/types/history';

// ── Preview & UI state ───────────────────────────────────────────
const previewState = ref<HistoryPreviewState>('populated');
const selectedDate = ref('Monday, 23 October 2023');
const activeFilter = ref<HistoryFilter>('all');
const isReversed = ref(false);

// Mobile week strip
const weekDays = [
  { day: 'SAT', date: 21, disabled: false, selected: false, isToday: false },
  { day: 'SUN', date: 22, disabled: false, selected: false, isToday: false },
  { day: 'MON', date: 23, disabled: false, selected: true, isToday: false },
  { day: 'TUE', date: 24, disabled: false, selected: false, isToday: true },
  { day: 'WED', date: 25, disabled: true, selected: false, isToday: false },
];

// ── Summary data ─────────────────────────────────────────────────
const summary = ref<DayGentleSummary>({
  dateLabel: 'Monday, 23 October',
  feedCount: 3,
  feedDetail: '380 ml bottle + 1 nursing',
  sleepDuration: '4h 45m',
  sleepDetail: '2 peaceful naps • Avg 1h 15m',
  diaperCount: 2,
  diaperDetail: '1 wet, 1 both (routine)',
  isBalanced: true,
});

// ── All events data ───────────────────────────────────────────────
const allEvents = ref<HistoryEventItem[]>([
  {
    id: 'e1', type: 'feed',
    title: 'Morning Bottle Feed', primaryTag: '180 ml', secondaryTag: 'Formula',
    notes: 'Took the entire bottle smoothly. Calm burping session after with warm cuddle.',
    timeFormatted: '6:45 AM', period: 'morning', loggedBy: 'Alex', timestamp: 1698036300000,
  },
  {
    id: 'e2', type: 'diaper',
    title: 'Diaper Change', primaryTag: 'Wet', secondaryTag: 'Skin clear',
    notes: 'Quick morning change. Applied soothing calendula barrier balm.',
    timeFormatted: '7:15 AM', period: 'morning', loggedBy: 'Alex', timestamp: 1698038100000,
  },
  {
    id: 'e3', type: 'sleep',
    title: 'Morning Nap', primaryTag: '1h 15m', secondaryTag: 'Crib • Sound machine',
    notes: 'Fell asleep within 10 minutes of lullaby. Woke up smiling and babbling.',
    timeFormatted: '8:30 AM – 9:45 AM', period: 'morning', loggedBy: 'Jordan', timestamp: 1698042600000,
  },
  {
    id: 'e4', type: 'feed',
    title: 'Nursing Session', primaryTag: '18 min total', secondaryTag: 'Left: 10m • Right: 8m',
    notes: 'Good latch on both sides. Very peaceful, relaxed post-nap feed.',
    timeFormatted: '10:15 AM', period: 'morning', loggedBy: 'Jordan', timestamp: 1698048900000,
  },
  {
    id: 'e5', type: 'diaper',
    title: 'Diaper Change', primaryTag: 'Wet + Dirty', secondaryTag: 'Mustard yellow / normal',
    notes: 'Complete change before afternoon nap. Fresh organic onesie put on.',
    timeFormatted: '1:10 PM', period: 'afternoon', loggedBy: 'Alex', timestamp: 1698059400000,
  },
  {
    id: 'e6', type: 'sleep',
    title: 'Afternoon Nap', primaryTag: '1h 15m', secondaryTag: 'Bassinet',
    notes: 'Deep peaceful rest during rain. Soft wake up on her own.',
    timeFormatted: '1:30 PM – 2:45 PM', period: 'afternoon', loggedBy: 'Alex', timestamp: 1698060600000,
  },
  {
    id: 'e7', type: 'feed',
    title: 'Afternoon Bottle Feed', primaryTag: '200 ml', secondaryTag: 'Expressed breastmilk',
    notes: 'Grandma fed Maya while rocking by the window. Followed by 15 mins of happy tummy time.',
    timeFormatted: '4:15 PM', period: 'afternoon', loggedBy: 'Alex', timestamp: 1698070500000,
  },
]);

// ── Computed counts ───────────────────────────────────────────────
const feedCount = computed(() => allEvents.value.filter(e => e.type === 'feed').length);
const sleepCount = computed(() => allEvents.value.filter(e => e.type === 'sleep').length);
const diaperCount = computed(() => allEvents.value.filter(e => e.type === 'diaper').length);

// ── Filtered + sorted events ──────────────────────────────────────
const processedEvents = computed(() => {
  if (previewState.value === 'empty' || previewState.value === 'filter-empty') return [];

  let list = allEvents.value;
  if (activeFilter.value !== 'all') {
    list = list.filter(e => e.type === activeFilter.value);
  }
  const sorted = [...list].sort((a, b) => a.timestamp - b.timestamp);
  return isReversed.value ? sorted.reverse() : sorted;
});

// ── Date navigation ───────────────────────────────────────────────
function goToPrevDay() { selectedDate.value = 'Sunday, 22 October 2023'; }
function goToNextDay() { selectedDate.value = 'Tuesday, 24 October 2023'; }
function jumpToToday() { selectedDate.value = 'Monday, 23 October 2023'; }

// ── Actions ───────────────────────────────────────────────────────
function handleLogPastEvent() { console.log('[History] Log Past Event triggered'); }
function handleExportDigest() { console.log('[History] Export PDF Digest triggered'); }

useSeoMeta({
  title: 'History',
  description: 'History of your baby\'s daily routine including feeding, sleeping, and diaper changes.',
})
</script>