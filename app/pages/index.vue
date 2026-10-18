<template>
  <div class="min-h-screen bg-background text-text-primary transition-colors duration-180 pb-24 md:pb-12">
    <!-- Top App Bar -->
    <header class="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
      <div class="max-w-app-container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-input bg-primary-soft text-primary flex items-center justify-center font-bold text-lg">
            🌱
          </div>
          <div>
            <h1 class="text-base sm:text-lg font-bold tracking-tight text-text-primary leading-tight">
              {{ t('app.name') }}
            </h1>
            <p class="text-xs text-text-secondary hidden sm:block">
              {{ t('app.tagline') }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Language Toggle -->
          <LazyVLocaleSwitcher />

          <!-- Theme Switcher -->
          <LazyVThemeSwitcher />
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="max-w-app-container mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
      <!-- Baby Profile Hero Banner -->
      <section class="card-surface p-5 sm:p-6 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 rounded-full bg-accent-soft flex items-center justify-center text-2xl border border-border/60">
              👶
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-bold text-text-primary">
                  {{ babyName }}
                </h2>
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-soft text-primary">
                  {{ babyAge }}
                </span>
              </div>
              <p class="text-sm text-text-secondary mt-0.5">
                {{ t('timeline.littleNote') }}
              </p>
            </div>
          </div>

          <!-- Active Sleep Quick Status -->
          <div v-if="activeSleepSession"
            class="flex items-center gap-3 px-4 py-3 rounded-input bg-accent-soft border border-border/80">
            <div class="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <div>
              <div class="text-xs font-semibold text-text-primary">
                {{ t('routines.activeSleep') }}
              </div>
              <div class="text-sm font-bold text-text-primary tabular-nums">
                {{ activeSleepDuration }}
              </div>
            </div>
            <button type="button"
              class="ms-2 px-3 py-1.5 rounded-input bg-surface border border-border text-xs font-medium text-text-primary hover:bg-surface-subtle btn-press focus-ring"
              @click="stopSleep">
              {{ t('routines.stopSleep') }}
            </button>
          </div>
        </div>
      </section>

      <!-- Quick Logging Grid (design.md Section 5: Feeding, Sleep, Diaper) -->
      <section class="mb-8" aria-labelledby="quick-log-heading">
        <div class="flex items-center justify-between mb-3">
          <h2 id="quick-log-heading" class="text-base sm:text-lg font-bold text-text-primary">
            {{ t('routines.quickLog') }}
          </h2>
          <span class="text-xs text-text-secondary">{{ t('timeline.today') }}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <!-- Feeding Card -->
          <div class="card-surface p-4 sm:p-5 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-input bg-primary-soft text-primary flex items-center justify-center">
                <Icon name="lucide:baby" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-semibold text-text-primary text-sm sm:text-base">
                  {{ t('routines.feeding') }}
                </h3>
                <p class="text-xs text-text-secondary">
                  {{ t('routines.breastfeeding') }} / {{ t('routines.bottle') }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-2 border-t border-border/60">
              <button type="button"
                class="flex-1 py-2 px-3 rounded-input bg-primary text-surface font-medium text-xs hover:bg-primary-hover btn-press focus-ring text-center"
                @click="logQuickEvent('feeding', 'bottle')">
                + 120 {{ t('routines.ml') }}
              </button>
              <button type="button"
                class="flex-1 py-2 px-3 rounded-input bg-surface-subtle border border-border text-text-primary font-medium text-xs hover:bg-surface btn-press focus-ring text-center"
                @click="logQuickEvent('feeding', 'breast')">
                + 15 {{ t('routines.minutes') }}
              </button>
            </div>
          </div>

          <!-- Sleep Card -->
          <div class="card-surface p-4 sm:p-5 flex flex-col justify-between hover:border-accent/50 transition-colors">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-input bg-accent-soft text-accent flex items-center justify-center">
                <Icon name="lucide:moon" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-semibold text-text-primary text-sm sm:text-base">
                  {{ t('routines.sleep') }}
                </h3>
                <p class="text-xs text-text-secondary">
                  {{ activeSleepSession ? t('routines.activeSleep') : t('routines.startSleep') }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-2 border-t border-border/60">
              <button v-if="!activeSleepSession" type="button"
                class="flex-1 py-2 px-3 rounded-input bg-primary text-surface font-medium text-xs hover:bg-primary-hover btn-press focus-ring text-center"
                @click="startSleep">
                {{ t('routines.startSleep') }}
              </button>
              <button v-else type="button"
                class="flex-1 py-2 px-3 rounded-input bg-accent text-surface font-medium text-xs hover:opacity-90 btn-press focus-ring text-center"
                @click="stopSleep">
                {{ t('routines.stopSleep') }}
              </button>
              <button type="button"
                class="py-2 px-3 rounded-input bg-surface-subtle border border-border text-text-primary font-medium text-xs hover:bg-surface btn-press focus-ring"
                @click="logQuickEvent('sleep', 'manual')">
                {{ t('routines.manualEntry') }}
              </button>
            </div>
          </div>

          <!-- Diaper Card -->
          <div class="card-surface p-4 sm:p-5 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-input bg-surface-subtle text-primary flex items-center justify-center">
                <Icon name="lucide:sparkles" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-semibold text-text-primary text-sm sm:text-base">
                  {{ t('routines.diaper') }}
                </h3>
                <p class="text-xs text-text-secondary">
                  {{ t('routines.wet') }} / {{ t('routines.dirty') }} / {{ t('routines.mixed') }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-1.5 pt-2 border-t border-border/60">
              <button type="button"
                class="py-2 px-2 rounded-input bg-surface-subtle border border-border text-text-primary font-medium text-xs hover:bg-primary-soft hover:text-primary btn-press focus-ring text-center"
                @click="logQuickEvent('diaper', 'wet')">
                {{ t('routines.wet') }}
              </button>
              <button type="button"
                class="py-2 px-2 rounded-input bg-surface-subtle border border-border text-text-primary font-medium text-xs hover:bg-accent-soft hover:text-accent btn-press focus-ring text-center"
                @click="logQuickEvent('diaper', 'dirty')">
                {{ t('routines.dirty') }}
              </button>
              <button type="button"
                class="py-2 px-2 rounded-input bg-surface-subtle border border-border text-text-primary font-medium text-xs hover:bg-surface btn-press focus-ring text-center"
                @click="logQuickEvent('diaper', 'mixed')">
                {{ t('routines.mixed') }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Today's Timeline Section -->
      <section aria-labelledby="timeline-heading">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <h2 id="timeline-heading" class="text-base sm:text-lg font-bold text-text-primary">
              {{ t('nav.timeline') }}
            </h2>
            <span
              class="px-2 py-0.5 rounded-full text-xs font-semibold bg-surface-subtle border border-border tabular-nums text-text-secondary">
              {{ events.length }}
            </span>
          </div>
          <span class="text-xs text-text-secondary tabular-nums">
            {{ formattedTodayDate }}
          </span>
        </div>

        <!-- Timeline List -->
        <div v-if="events.length > 0" class="space-y-2.5">
          <article v-for="event in events" :key="event.id"
            class="card-surface p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:border-border/80 transition-colors">
            <div class="flex items-center gap-3">
              <!-- Event Type Icon -->
              <div :class="[
                'w-9 h-9 rounded-input flex items-center justify-center shrink-0',
                event.type === 'feeding' ? 'bg-primary-soft text-primary' : '',
                event.type === 'sleep' ? 'bg-accent-soft text-accent' : '',
                event.type === 'diaper' ? 'bg-surface-subtle text-text-primary' : ''
              ]">
                <Icon :name="event.type === 'feeding'
                  ? 'lucide:baby'
                  : event.type === 'sleep'
                    ? 'lucide:moon'
                    : 'lucide:sparkles'
                  " class="w-4 h-4" />
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold text-sm text-text-primary">
                    {{ event.title }}
                  </h3>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-surface-subtle text-text-secondary">
                    {{ event.detail }}
                  </span>
                </div>
                <p v-if="event.notes" class="text-xs text-text-secondary mt-0.5">
                  {{ event.notes }}
                </p>
              </div>
            </div>

            <!-- Time & Actions -->
            <div class="flex items-center gap-3">
              <span class="text-xs text-text-secondary font-medium tabular-nums">
                {{ event.time }}
              </span>
              <button type="button"
                class="p-1.5 rounded-lg text-text-secondary hover:text-danger hover:bg-danger/10 btn-press focus-ring transition-colors"
                :title="t('timeline.delete')" @click="removeEvent(event.id)">
                <Icon name="lucide:trash-2" class="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="card-surface p-8 text-center">
          <div
            class="w-12 h-12 mx-auto rounded-full bg-surface-subtle flex items-center justify-center text-text-secondary mb-3">
            <Icon name="lucide:calendar-clock" class="w-6 h-6" />
          </div>
          <h3 class="font-semibold text-text-primary text-base">
            {{ t('timeline.noEvents') }}
          </h3>
          <p class="text-sm text-text-secondary mt-1">
            {{ t('timeline.addFirst') }}
          </p>
        </div>
      </section>
    </main>

    <!-- Bottom Navigation Bar (Mobile First - design.md Section 2 & 6) -->
    <nav class="md:hidden fixed bottom-0 inset-x-0 bg-surface/95 backdrop-blur-md border-t border-border z-50 px-4 py-2"
      aria-label="Mobile navigation">
      <div class="flex items-center justify-around max-w-md mx-auto">
        <button type="button" class="flex flex-col items-center gap-1 p-2 text-primary font-medium focus-ring">
          <Icon name="lucide:layout-dashboard" class="w-5 h-5" />
          <span class="text-[11px]">{{ t('nav.dashboard') }}</span>
        </button>

        <button type="button"
          class="flex flex-col items-center gap-1 p-2 text-text-secondary hover:text-text-primary focus-ring">
          <Icon name="lucide:clock" class="w-5 h-5" />
          <span class="text-[11px]">{{ t('nav.timeline') }}</span>
        </button>

        <button type="button"
          class="flex flex-col items-center gap-1 p-2 text-text-secondary hover:text-text-primary focus-ring">
          <Icon name="lucide:history" class="w-5 h-5" />
          <span class="text-[11px]">{{ t('nav.history') }}</span>
        </button>

        <button type="button"
          class="flex flex-col items-center gap-1 p-2 text-text-secondary hover:text-text-primary focus-ring">
          <Icon name="lucide:user" class="w-5 h-5" />
          <span class="text-[11px]">{{ t('nav.profile') }}</span>
        </button>

        <button type="button"
          class="flex flex-col items-center gap-1 p-2 text-text-secondary hover:text-text-primary focus-ring">
          <Icon name="lucide:settings" class="w-5 h-5" />
          <span class="text-[11px]">{{ t('nav.settings') }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import type { RoutineEvent } from '~/types/home'

const { t, locale, setLocale } = useI18n()

// Baby profile sample data
const babyName = ref('Leo')
const babyAge = ref('3 months')

// Active sleep session state
const activeSleepSession = ref(false)
const activeSleepDuration = ref('00:42:15')

const startSleep = () => {
  activeSleepSession.value = true
}

const stopSleep = () => {
  if (activeSleepSession.value) {
    events.value.unshift({
      id: Date.now(),
      type: 'sleep',
      title: t('routines.sleep'),
      detail: activeSleepDuration.value,
      notes: t('routines.stopSleep'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    })
    activeSleepSession.value = false
  }
}

// Sample initial events matching design.md guidelines
const events = ref<RoutineEvent[]>([
  {
    id: 1,
    type: 'feeding',
    title: t('routines.feeding'),
    detail: '120 ml',
    notes: 'Bottle fed, calm and happy',
    time: '11:30 AM',
  },
  {
    id: 2,
    type: 'diaper',
    title: t('routines.diaper'),
    detail: t('routines.wet'),
    time: '10:15 AM',
  },
  {
    id: 3,
    type: 'sleep',
    title: t('routines.sleep'),
    detail: '1h 15m',
    notes: 'Morning crib nap',
    time: '08:45 AM',
  },
])

const formattedTodayDate = computed(() => {
  return new Date().toLocaleDateString(locale.value === 'ar' ? 'ar-EG' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
})

const logQuickEvent = (type: 'feeding' | 'sleep' | 'diaper', detailType: string) => {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  if (type === 'feeding') {
    events.value.unshift({
      id: Date.now(),
      type: 'feeding',
      title: t('routines.feeding'),
      detail: detailType === 'bottle' ? '120 ml' : '15 min',
      time: now,
    })
  } else if (type === 'diaper') {
    events.value.unshift({
      id: Date.now(),
      type: 'diaper',
      title: t('routines.diaper'),
      detail: detailType === 'wet' ? t('routines.wet') : detailType === 'dirty' ? t('routines.dirty') : t('routines.mixed'),
      time: now,
    })
  } else if (type === 'sleep') {
    events.value.unshift({
      id: Date.now(),
      type: 'sleep',
      title: t('routines.sleep'),
      detail: '45 min',
      time: now,
    })
  }
}

const removeEvent = (id: number) => {
  events.value = events.value.filter(e => e.id !== id)
}
</script>