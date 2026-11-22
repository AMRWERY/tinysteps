<template>
  <div class="w-full max-w-[860px] mx-auto p-4 md:p-0 space-y-6">
    <v-preview-bar v-model="state" :options="states" label="Preview state:" hint="Interactive QA" />

    <!-- Header -->
    <header class="flex items-start justify-between gap-3">
      <div>
        <p class="hidden sm:block text-xs text-app-text-secondary">Settings / Caregiver Preferences</p>
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 sm:mt-1">
          <h1 class="text-3xl font-bold tracking-tight text-app-text-primary">Settings</h1>
          <span class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-app-surface-subtle text-[11px] font-semibold text-app-success">
            <span class="w-1.5 h-1.5 rounded-full bg-app-success" /> All changes saved locally
          </span>
        </div>
        <p class="sm:hidden flex items-center gap-1.5 text-sm text-app-text-secondary mt-1">
          <span class="w-1.5 h-1.5 rounded-full bg-app-success" /> Your preferences • Saved locally
        </p>
      </div>
    </header>

    <!-- Loading skeleton -->
    <div v-if="state === 'skeleton'" class="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading settings">
      <div v-for="n in 4" :key="n" class="bg-app-surface border border-app-border rounded-card p-6 space-y-4">
        <div class="h-5 w-48 bg-app-surface-subtle rounded" />
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="h-20 bg-app-surface-subtle rounded-2xl" />
          <div class="h-20 bg-app-surface-subtle rounded-2xl" />
        </div>
      </div>
    </div>

    <template v-else>
      <!-- Hero (sm+) -->
      <section class="hidden sm:flex items-center gap-4 bg-app-surface-subtle border border-app-border rounded-card p-5">
        <span class="w-12 h-12 rounded-2xl bg-app-surface text-app-primary flex items-center justify-center shrink-0">
          <Icon name="lucide:sprout" class="w-6 h-6" />
        </span>
        <div class="flex-1 min-w-0">
          <h2 class="text-lg font-bold text-app-text-primary">Nursery Rhythm Tailoring</h2>
          <p class="text-sm text-app-text-secondary mt-0.5">
            Calm, local-first controls customized for low sensory strain during twilight feedings and daytime naps.
          </p>
        </div>
        <div class="text-end shrink-0">
          <p class="text-[10px] font-bold tracking-wider text-app-text-secondary">SYNC STATE</p>
          <p class="flex items-center gap-1.5 text-sm font-bold text-app-primary justify-end">
            <span class="w-2 h-2 rounded-full bg-app-success" /> Local-first
          </p>
        </div>
      </section>

      <settings-appearance :current-theme="currentTheme" @set-theme="setTheme" />
      <settings-units />
      <settings-caregivers />
      <settings-privacy @export="onExport" @delete="state = 'delete-modal'" />

      <footer class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-app-border text-xs text-app-text-secondary">
        <p>
          <span class="hidden sm:inline">TinySteps Desktop v1.0.4 • Made with warmth for tired parents</span>
          <span class="sm:hidden">TinySteps v1.0.4 • Serene Nurture Build</span>
        </p>
        <div class="hidden sm:flex items-center gap-2">
          <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-app-border"><Icon name="lucide:check" class="w-3 h-3" /> WCAG AA</span>
          <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-app-border"><Icon name="lucide:shield" class="w-3 h-3" /> Privacy Shield</span>
        </div>
      </footer>
    </template>

    <delete-modal :open="state === 'delete-modal'" @cancel="state = 'standard'" @confirm="onPurge" />

    <v-toast :visible="toastVisible">{{ toastText }}</v-toast>
  </div>
</template>

<script setup lang="ts">
type SettingsState = 'standard' | 'delete-modal' | 'export-toast' | 'skeleton'

const { currentTheme, setTheme } = useAppTheme()

const state = ref<SettingsState>('standard')
const states: { value: SettingsState; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'delete-modal', label: 'Delete Modal' },
  { value: 'export-toast', label: 'Export Toast' },
  { value: 'skeleton', label: 'Skeleton' },
]

const toastVisible = ref(false)
const toastText = ref('')
let toastTimer: ReturnType<typeof setTimeout> | undefined
const showToast = (text: string) => {
  toastText.value = text
  toastVisible.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2800)
}
onBeforeUnmount(() => clearTimeout(toastTimer))

const onExport = () => {
  state.value = 'standard'
  showToast('Log archive prepared on this device')
}

const onPurge = () => {
  state.value = 'standard'
  showToast('Local data cleared')
}

// The "Export Toast" preview pill shows the toast, then returns to standard
watch(state, (s) => {
  if (s === 'export-toast') showToast('Log archive prepared on this device')
})

useSeoMeta({
  title: 'Settings — TinySteps',
  description: 'Settings for the Tiny Steps - Baby Routine Tracker app.',
})
</script>
