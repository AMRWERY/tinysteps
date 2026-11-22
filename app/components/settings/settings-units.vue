<template>
  <section class="bg-app-surface border border-app-border rounded-card p-5 sm:p-6 space-y-4 shadow-xs">
    <h2 class="flex items-center gap-2 text-lg font-bold text-app-text-primary pb-3 border-b border-app-border">
      <Icon name="lucide:sliders-horizontal" class="w-5 h-5 hidden sm:block" />
      <Icon name="lucide:layout-grid" class="w-5 h-5 sm:hidden" />
      <span class="hidden sm:inline">Routine Units &amp; Display</span>
      <span class="sm:hidden">Daily Preferences</span>
    </h2>

    <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
      <!-- Time format -->
      <div class="bg-app-surface-subtle rounded-2xl p-4 flex flex-col max-sm:space-y-3 sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center justify-between sm:block">
            <p class="text-sm font-bold text-app-text-primary">Time <span class="hidden sm:inline">Format</span><span class="sm:hidden">Display Format</span></p>
            <p class="sm:hidden text-xs text-app-text-secondary">Preview: {{ timePreview }}</p>
          </div>
          <p class="hidden sm:block text-xs text-app-text-secondary mt-0.5">Timestamps across log history</p>
        </div>
        <v-segmented v-model="settings.timeFormat" label="Time format" :options="timeOptions" class="max-sm:w-full" block />
      </div>

      <!-- Liquid units -->
      <div class="bg-app-surface-subtle rounded-2xl p-4 flex flex-col max-sm:space-y-3 sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center justify-between sm:block">
            <p class="text-sm font-bold text-app-text-primary">Liquid <span class="hidden sm:inline">Units</span><span class="sm:hidden">Volume Units</span></p>
            <p class="sm:hidden text-xs text-app-text-secondary">Default: {{ settings.liquidUnit === 'ml' ? 'Milliliters' : 'Fluid Ounces' }}</p>
          </div>
          <p class="hidden sm:block text-xs text-app-text-secondary mt-0.5">Bottle feeds and pumped volume</p>
        </div>
        <v-segmented v-model="settings.liquidUnit" label="Liquid units" :options="liquidOptions" class="max-sm:w-full" block />
      </div>

      <!-- Weight (sm+) -->
      <div class="hidden sm:flex bg-app-surface-subtle rounded-2xl p-4 items-center justify-between gap-3">
        <div>
          <p class="text-sm font-bold text-app-text-primary">Weight Format</p>
          <p class="text-xs text-app-text-secondary mt-0.5">Pediatric growth charts</p>
        </div>
        <v-segmented v-model="settings.weightUnit" label="Weight format" :options="weightOptions" />
      </div>

      <!-- Keep awake -->
      <div class="bg-app-surface-subtle rounded-2xl p-4 flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-bold text-app-text-primary">Keep Screen <span class="sm:hidden">Softly </span>Awake</p>
          <p class="text-xs text-app-text-secondary mt-0.5">
            <span class="hidden sm:inline">Prevent display sleep during live timers</span>
            <span class="sm:hidden">Prevents auto-lock while actively timing {{ babyName }}'s nap or midnight feed.</span>
          </p>
        </div>
        <button type="button" role="switch" :aria-checked="settings.keepScreenAwake" aria-label="Keep screen awake"
          class="relative w-12 h-7 rounded-full shrink-0 transition-colors focus-ring"
          :class="settings.keepScreenAwake ? 'bg-app-primary' : 'bg-app-border'"
          @click="settings.keepScreenAwake = !settings.keepScreenAwake">
          <span :class="['absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all', settings.keepScreenAwake ? 'start-6' : 'start-1']" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const settings = useAppSettings()
const { baby } = useBabyProfile()
const babyName = baby.name

const timeOptions = [
  { value: '12h' as const, label: '12h', icon: undefined },
  { value: '24h' as const, label: '24h', icon: undefined },
]
const liquidOptions = [
  { value: 'ml' as const, label: 'ml' },
  { value: 'oz' as const, label: 'oz' },
]
const weightOptions = [
  { value: 'kg' as const, label: 'kg' },
  { value: 'lbs' as const, label: 'lbs' },
]

const timePreview = computed(() => (settings.value.timeFormat === '12h' ? '2:30 PM' : '14:30'))
</script>
