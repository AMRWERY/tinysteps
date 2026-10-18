<template>
  <div class="md:hidden flex flex-col min-h-screen pb-24 bg-app-bg text-app-text-primary">

    <!-- ─── Sticky Top Header ──────────────────────────────────── -->
    <header
      class="sticky top-0 z-20 bg-app-bg/95 backdrop-blur-sm border-b border-app-border px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-app-primary-soft text-app-primary flex items-center justify-center">
          <Icon name="lucide:map-pin" class="w-4 h-4" />
        </div>
        <span class="font-bold text-base text-app-text-primary">TinySteps</span>
        <span
          class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-app-surface-subtle text-app-text-secondary ml-1">
          <span class="w-1.5 h-1.5 rounded-full bg-app-success"></span>
          Maya
        </span>
      </div>
      <div class="flex items-center gap-2">
        <LazyVLocaleSwitcher />
        <LazyVThemeSwitcher />
        <img src="/img/img-01.png" alt="Maya" class="w-8 h-8 rounded-full object-cover border border-app-border" />
      </div>
    </header>

    <main class="p-4 space-y-4">

      <!-- ─── State Preview Pills ─────────────────────────────── -->
      <div
        class="flex items-center gap-1 bg-app-surface-subtle p-1 rounded-xl text-[11px] font-semibold overflow-x-auto no-scrollbar">
        <button v-for="pill in previewPills" :key="pill.value" @click="emit('update:state', pill.value as any)" :class="['whitespace-nowrap px-2.5 py-1.5 rounded-lg text-center transition-colors shrink-0',
          state === pill.value
            ? 'bg-app-surface text-app-text-primary shadow-xs'
            : 'text-app-text-secondary']">
          {{ pill.label }}
        </button>
      </div>

      <!-- ─── Date Navigation ─────────────────────────────────── -->
      <div>
        <div class="flex items-start justify-between">
          <div>
            <p class="text-[11px] font-medium text-app-text-secondary">Maya's rhythm and calm daily moments</p>
            <h2 class="text-xl font-bold text-app-text-primary mt-0.5">Yesterday, 23 Oct</h2>
          </div>
          <div class="flex items-center gap-1.5 mt-0.5">
            <button
              class="px-2.5 py-1.5 rounded-lg bg-app-primary text-white text-[11px] font-semibold hover:bg-app-primary-hover transition-colors">
              Jump to Today
            </button>
            <div class="flex items-center gap-1">
              <button
                class="p-1.5 rounded-lg bg-app-surface border border-app-border text-app-text-secondary hover:bg-app-surface-subtle transition-colors">
                <Icon name="lucide:chevron-left" class="w-4 h-4" />
              </button>
              <button
                class="p-1.5 rounded-lg bg-app-surface border border-app-border text-app-text-secondary hover:bg-app-surface-subtle transition-colors">
                <Icon name="lucide:chevron-right" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Day-of-week strip -->
        <div class="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1">
          <button v-for="day in weekDays" :key="day.name" :class="['flex flex-col items-center px-3 py-2 rounded-xl transition-colors shrink-0',
            day.active
              ? 'bg-app-primary text-white'
              : 'bg-app-surface border border-app-border text-app-text-secondary']">
            <span class="text-[9px] font-bold uppercase tracking-wider">{{ day.name }}</span>
            <span :class="['text-sm font-bold mt-0.5', day.active ? 'text-white' : 'text-app-text-primary']">
              {{ day.label }}
            </span>
            <span v-if="day.dot"
              :class="['w-1 h-1 rounded-full mt-1', day.active ? 'bg-white/70' : 'bg-app-primary']"></span>
          </button>
        </div>
      </div>

      <!-- ─── Daily Gentle Summary Card ──────────────────────── -->
      <div class="bg-app-surface border border-app-border rounded-card p-4 space-y-3.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon name="lucide:bar-chart-2" class="w-4 h-4 text-app-primary" />
            <h3 class="font-bold text-sm text-app-text-primary">Daily Gentle Summary</h3>
          </div>
          <span
            class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-app-primary-soft text-app-primary">
            Mon Rhythm
          </span>
        </div>

        <!-- Stats Row -->
        <div class="grid grid-cols-3 gap-2">
          <div class="bg-app-surface-subtle rounded-xl p-2.5 text-center">
            <div class="flex items-center justify-center text-app-accent mb-1">
              <Icon name="lucide:utensils" class="w-3.5 h-3.5" />
            </div>
            <div class="text-xl font-bold text-app-text-primary">3</div>
            <div class="text-[10px] text-app-text-secondary leading-tight mt-0.5">380ml + nurs</div>
          </div>
          <div class="bg-app-surface-subtle rounded-xl p-2.5 text-center">
            <div class="flex items-center justify-center text-app-primary mb-1">
              <Icon name="lucide:moon" class="w-3.5 h-3.5" />
            </div>
            <div class="text-xl font-bold text-app-text-primary">4h 45m</div>
            <div class="text-[10px] text-app-text-secondary leading-tight mt-0.5">2 peaceful naps</div>
          </div>
          <div class="bg-app-surface-subtle rounded-xl p-2.5 text-center">
            <div class="flex items-center justify-center text-app-warning mb-1">
              <Icon name="lucide:droplet" class="w-3.5 h-3.5" />
            </div>
            <div class="text-xl font-bold text-app-text-primary">2</div>
            <div class="text-[10px] text-app-text-secondary leading-tight mt-0.5">1 wet, 1 dirty</div>
          </div>
        </div>

        <!-- Gentle Quote -->
        <div class="flex items-start gap-2 pt-1 border-t border-app-border">
          <Icon name="lucide:sprout" class="w-3.5 h-3.5 text-app-primary shrink-0 mt-0.5" />
          <p class="text-[11px] text-app-text-secondary italic leading-relaxed">
            A calm snapshot of Monday's rhythm. Every day brings its own flow.
          </p>
        </div>
      </div>

      <!-- ─── Filter Pills + Timeline ────────────────────────── -->
      <div class="space-y-3">
        <!-- Filter row -->
        <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <button v-for="f in filters" :key="f.value" @click="activeFilter = f.value" :class="['flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors shrink-0',
            activeFilter === f.value
              ? 'bg-app-text-primary text-app-bg'
              : 'bg-app-surface border border-app-border text-app-text-secondary']">
            <span v-if="f.dot" :class="['w-1.5 h-1.5 rounded-full', f.dotClass]"></span>
            {{ f.label }}
          </button>
        </div>

        <!-- AFTERNOON section -->
        <div class="space-y-2">
          <p class="text-[10px] font-bold tracking-widest text-app-text-secondary uppercase px-1">Afternoon</p>

          <!-- Diaper Change -->
          <div v-if="activeFilter === 'all' || activeFilter === 'diaper'"
            class="bg-app-surface border border-app-border rounded-2xl p-3.5">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-app-surface-subtle text-app-warning flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="lucide:droplet" class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-bold text-xs text-app-text-primary">Diaper Change</span>
                    <span
                      class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-app-surface-subtle text-app-text-secondary">Wet</span>
                    <span
                      class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-app-surface-subtle text-app-text-secondary">Dirty</span>
                  </div>
                  <p class="text-[11px] text-app-text-secondary mt-1 leading-relaxed">
                    Clean and calm, no redness. Changed after late nap.
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-[11px] font-semibold text-app-text-secondary">4:15 PM</span>
                <button class="p-1 rounded-lg hover:bg-app-surface-subtle text-app-text-secondary transition-colors">
                  <Icon name="lucide:more-vertical" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Expressed Milk Bottle -->
          <div v-if="activeFilter === 'all' || activeFilter === 'feed'"
            class="bg-app-surface border border-app-border rounded-2xl p-3.5">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="lucide:milk" class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-bold text-xs text-app-text-primary">Expressed Milk Bottle</span>
                    <span
                      class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-app-surface-subtle text-app-text-secondary">140
                      ml</span>
                  </div>
                  <p class="text-[11px] text-app-text-secondary mt-1 leading-relaxed">
                    Paced bottle feed with Jordan. Burped easily, stayed relaxed.
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-[11px] font-semibold text-app-text-secondary">2:30 PM</span>
                <button class="p-1 rounded-lg hover:bg-app-surface-subtle text-app-text-secondary transition-colors">
                  <Icon name="lucide:more-vertical" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Afternoon Nap -->
          <div v-if="activeFilter === 'all' || activeFilter === 'sleep'"
            class="bg-app-surface border border-app-border rounded-2xl p-3.5">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="lucide:moon" class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-bold text-xs text-app-text-primary">Afternoon Nap</span>
                    <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-app-primary-soft text-app-primary">1h
                      30m</span>
                  </div>
                  <p class="text-[11px] text-app-text-secondary mt-1 leading-relaxed">
                    Nursery crib with sound machine. Woke up calm.
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-[11px] font-semibold text-app-text-secondary">11:45 AM</span>
                <button class="p-1 rounded-lg hover:bg-app-surface-subtle text-app-text-secondary transition-colors">
                  <Icon name="lucide:more-vertical" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- MORNING section -->
        <div class="space-y-2 pt-1">
          <p class="text-[10px] font-bold tracking-widest text-app-text-secondary uppercase px-1">Morning</p>

          <!-- Nursing Session -->
          <div v-if="activeFilter === 'all' || activeFilter === 'feed'"
            class="bg-app-surface border border-app-border rounded-2xl p-3.5">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="lucide:heart" class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-bold text-xs text-app-text-primary">Nursing Session</span>
                    <span
                      class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-app-surface-subtle text-app-text-secondary">L
                      12m · R 8m</span>
                  </div>
                  <p class="text-[11px] text-app-text-secondary mt-1 leading-relaxed">
                    Gentle morning feed before tummy time.
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-[11px] font-semibold text-app-text-secondary">10:30 AM</span>
                <button class="p-1 rounded-lg hover:bg-app-surface-subtle text-app-text-secondary transition-colors">
                  <Icon name="lucide:more-vertical" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Morning Nap -->
          <div v-if="activeFilter === 'all' || activeFilter === 'sleep'"
            class="bg-app-surface border border-app-border rounded-2xl p-3.5">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="lucide:moon" class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-bold text-xs text-app-text-primary">Morning Nap</span>
                    <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-app-primary-soft text-app-primary">1h
                      00m</span>
                  </div>
                  <p class="text-[11px] text-app-text-secondary mt-1 leading-relaxed">
                    Bassinet sleep, self-soothed peacefully.
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-[11px] font-semibold text-app-text-secondary">8:45 AM</span>
                <button class="p-1 rounded-lg hover:bg-app-surface-subtle text-app-text-secondary transition-colors">
                  <Icon name="lucide:more-vertical" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Diaper Change (morning) -->
          <div v-if="activeFilter === 'all' || activeFilter === 'diaper'"
            class="bg-app-surface border border-app-border rounded-2xl p-3.5">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-app-surface-subtle text-app-warning flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="lucide:droplet" class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-bold text-xs text-app-text-primary">Diaper Change</span>
                    <span
                      class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-app-surface-subtle text-app-text-secondary">Wet</span>
                  </div>
                  <p class="text-[11px] text-app-text-secondary mt-1 leading-relaxed">
                    Morning diaper change, smiling.
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-[11px] font-semibold text-app-text-secondary">7:30 AM</span>
                <button class="p-1 rounded-lg hover:bg-app-surface-subtle text-app-text-secondary transition-colors">
                  <Icon name="lucide:more-vertical" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Expressed Bottle (early morning) -->
          <div v-if="activeFilter === 'all' || activeFilter === 'feed'"
            class="bg-app-surface border border-app-border rounded-2xl p-3.5">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="lucide:milk" class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-bold text-xs text-app-text-primary">Expressed Bottle</span>
                    <span
                      class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-app-surface-subtle text-app-text-secondary">120
                      ml</span>
                  </div>
                  <p class="text-[11px] text-app-text-secondary mt-1 leading-relaxed">
                    Early morning bottle feed by Alex.
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-[11px] font-semibold text-app-text-secondary">6:45 AM</span>
                <button class="p-1 rounded-lg hover:bg-app-surface-subtle text-app-text-secondary transition-colors">
                  <Icon name="lucide:more-vertical" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>

    <!-- ─── Bottom Navigation Bar ──────────────────────────────── -->
    <nav
      class="fixed bottom-0 inset-x-0 bg-app-surface/95 backdrop-blur-md border-t border-app-border flex items-center justify-around py-2.5 px-4 z-30">
      <nuxt-link-locale to="/" exact
        class="flex flex-col items-center gap-0.5 min-w-[56px] min-h-[44px] justify-center text-app-text-secondary font-medium"
        active-class="!text-app-primary font-bold">
        <Icon name="lucide:layout-grid" class="w-5 h-5" />
        <span class="text-[10px]">Dashboard</span>
      </nuxt-link-locale>
      <nuxt-link-locale to="/history"
        class="flex flex-col items-center gap-0.5 min-w-[56px] min-h-[44px] justify-center text-app-text-secondary font-medium"
        active-class="!text-app-primary font-bold">
        <Icon name="lucide:calendar" class="w-5 h-5" />
        <span class="text-[10px]">History</span>
      </nuxt-link-locale>
      <nuxt-link-locale to="/baby-profile"
        class="flex flex-col items-center gap-0.5 min-w-[56px] min-h-[44px] justify-center text-app-text-secondary font-medium"
        active-class="!text-app-primary font-bold">
        <Icon name="lucide:baby" class="w-5 h-5" />
        <span class="text-[10px]">Baby</span>
      </nuxt-link-locale>
      <nuxt-link-locale to="/settings"
        class="flex flex-col items-center gap-0.5 min-w-[56px] min-h-[44px] justify-center text-app-text-secondary font-medium"
        active-class="!text-app-primary font-bold">
        <Icon name="lucide:settings" class="w-5 h-5" />
        <span class="text-[10px]">Settings</span>
      </nuxt-link-locale>
    </nav>

  </div>
</template>

<script setup lang="ts">
import type { AppState, TimelineEntry, ThemeMode } from '~/types/home';

defineProps<{
  state: AppState;
  timerString: string;
  timeline: TimelineEntry[];
  currentTheme: ThemeMode;
}>();

const emit = defineEmits<{
  (e: 'update:state', val: AppState): void;
  (e: 'setTheme', mode: ThemeMode): void;
  (e: 'wakeAndSave'): void;
}>();

const activeFilter = ref<'all' | 'feed' | 'sleep' | 'diaper'>('all');

const previewPills = [
  { label: 'Populated', value: 'active-sleep' },
  { label: 'Empty Day', value: 'baby-awake' },
  { label: 'Zero Filter', value: 'first-run' },
  { label: 'Skeleton', value: 'loading' },
];

const weekDays = [
  { name: 'SAT', label: '21', dot: false, active: false },
  { name: 'SUN', label: '22', dot: false, active: false },
  { name: 'MON', label: '23', dot: true, active: true },
  { name: 'TUE', label: '24', dot: false, active: false },
  { name: 'WED', label: '25', dot: false, active: false },
];

const filters = [
  { label: 'All  7', value: 'all', dot: false, dotClass: '' },
  { label: 'Feeding  3', value: 'feed', dot: true, dotClass: 'bg-app-accent' },
  { label: 'Sleep  2', value: 'sleep', dot: true, dotClass: 'bg-app-primary' },
  { label: 'Diapers  2', value: 'diaper', dot: true, dotClass: 'bg-app-warning' },
];
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>