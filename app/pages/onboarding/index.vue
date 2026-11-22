<template>
  <div class="w-full">
    <!-- Full-width strip directly under the header on md+ (bleeds through the main padding) -->
    <onboarding-state-bar v-model="state" :options="states" class="md:-mx-6 md:-mt-6" />

    <div class="w-full max-w-[1180px] mx-auto p-4 md:px-0 md:py-6 space-y-5">
    <!-- Title strip (md+) / pill row (phones) -->
    <div class="hidden md:flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="w-11 h-11 rounded-xl bg-app-primary-soft text-app-primary flex items-center justify-center">
          <Icon name="lucide:baby" class="w-5 h-5" />
        </span>
        <div>
          <p class="text-xs text-app-text-secondary">
            <span class="font-bold tracking-wider text-app-primary">TINYSTEPS</span> • Nursery Setup
          </p>
          <h1 class="text-xl font-bold text-app-text-primary">Welcome to peace of mind</h1>
        </div>
      </div>
      <div class="flex items-center gap-3 px-4 py-2 rounded-full bg-app-surface border border-app-border text-sm text-app-text-secondary">
        {{ stepLabel }}
        <span class="flex gap-1.5" aria-hidden="true">
          <span :class="['h-1.5 rounded-full transition-all', stepNumber >= 1 ? 'w-8 bg-app-primary' : 'w-4 bg-app-border']" />
          <span :class="['h-1.5 rounded-full transition-all', stepNumber >= 2 ? 'w-8 bg-app-primary' : 'w-4 bg-app-border']" />
        </span>
      </div>
    </div>
    <div class="md:hidden flex items-center justify-between">
      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-app-primary-soft text-app-primary text-xs font-semibold">
        <Icon name="lucide:leaf" class="w-3.5 h-3.5" /> New Family Setup
      </span>
      <span class="text-xs text-app-text-secondary">{{ stepLabel }}</span>
    </div>

    <!-- Card -->
    <div class="bg-app-surface border border-app-border md:border-0 rounded-3xl md:rounded-card overflow-hidden shadow-xs">
      <!-- Saving / success -->
      <saving-success v-if="state === 'saving' || state === 'success'" :saving="state === 'saving'" :name="form.name.trim() || 'Your baby'" />

      <!-- Step 2 -->
      <div v-else-if="state === 'step-2'" class="p-6 md:p-10 max-w-2xl mx-auto space-y-8">
        <step-defaults :form="form" />
        <div class="flex items-center justify-between gap-3 pt-6 border-t border-app-border">
          <button type="button" class="px-4 py-2.5 text-sm font-semibold text-app-text-secondary hover:text-app-text-primary transition-colors" @click="state = 'step-1'">
            Back
          </button>
          <button type="button"
            class="flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-button bg-app-primary text-white text-sm font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs focus-ring"
            @click="finish">
            Finish Setup <Icon name="lucide:check" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Step 1 -->
      <div v-else class="grid md:grid-cols-2">
        <onboarding-intro :hide-illustration="state === 'fallback'" class="p-5 pb-0 md:p-0" />

        <div class="p-5 md:p-10 flex flex-col">
          <step-profile :form="form" :errors="errors" class="flex-1" />

          <div class="mt-8 md:pt-6 md:border-t border-app-border flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
            <nuxt-link-locale to="/"
              class="text-center px-4 py-3 text-sm text-app-text-secondary hover:text-app-text-primary transition-colors">
              <span class="hidden md:inline">I'll do this later — Go to Home</span>
              <span class="md:hidden">Set up later in Settings</span>
            </nuxt-link-locale>
            <button type="button"
              class="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[52px] rounded-button bg-app-primary text-white text-sm font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs focus-ring"
              @click="next">
              <span class="hidden md:inline">Continue to Routine Defaults</span>
              <span class="md:hidden">Save &amp; Continue</span>
              <Icon name="lucide:arrow-right" class="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reassurance -->
    <ul class="hidden md:flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-app-text-secondary pt-2">
      <li class="flex items-center gap-1.5"><Icon name="lucide:shield-check" class="w-3.5 h-3.5" /> Zero cloud tracking by default</li>
      <li class="flex items-center gap-1.5"><Icon name="lucide:battery-low" class="w-3.5 h-3.5" /> Low battery &amp; midnight dark theme optimized</li>
      <li class="flex items-center gap-1.5"><Icon name="lucide:check-circle-2" class="w-3.5 h-3.5" /> Works 100% offline</li>
    </ul>
    <p class="md:hidden flex items-center gap-2 text-xs text-app-text-secondary px-1">
      <Icon name="lucide:lock" class="w-4 h-4 text-app-primary" /> Stored locally on this device. Private &amp; offline-ready.
    </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfileErrors, ProfileForm } from '~/types/profile'

type OnboardingState = 'step-1' | 'step-2' | 'error' | 'saving' | 'success' | 'fallback'

const { baby } = useBabyProfile()

const state = ref<OnboardingState>('step-1')
const states: { value: OnboardingState; label: string; short: string }[] = [
  { value: 'step-1', label: 'Step 1: Welcome & Profile', short: 'Step 1: Setup' },
  { value: 'step-2', label: 'Step 2: Routine Defaults', short: 'Step 2: Quick-Pick' },
  { value: 'error', label: 'Validation Error Demo', short: 'Validation State' },
  { value: 'saving', label: 'Saving & Success View', short: 'Saving & Success' },
  { value: 'fallback', label: 'No-Illustration Fallback', short: 'No Illustration' },
]

const weeksAgoIso = (weeks: number) => new Date(Date.now() - weeks * 7 * 864e5).toISOString().slice(0, 10)

const form = reactive<ProfileForm>({
  name: baby.name,
  dob: weeksAgoIso(baby.week),
  birthTime: '',
  notes: '',
  volumeUnit: 'ml',
  feedingMethod: 'combined',
  diaperDetail: false,
  sleepStyle: 'timer',
})
const errors = reactive<ProfileErrors>({ name: '', dob: '' })

const stepNumber = computed(() => (state.value === 'step-2' || state.value === 'saving' || state.value === 'success' ? 2 : 1))
const stepLabel = computed(() => `Step ${stepNumber.value} of 2`)

const validate = () => {
  errors.name = form.name.trim() ? '' : 'Please enter a name or nickname.'
  if (!form.dob) errors.dob = 'Please choose a date of birth.'
  else if (new Date(form.dob) > new Date()) errors.dob = 'Date of birth cannot be in the future.'
  else errors.dob = ''
  return !errors.name && !errors.dob
}

// Real validation shows inline errors on step 1; the "error" pill is only a demo
const next = () => {
  if (validate()) state.value = 'step-2'
}

let savingTimer: ReturnType<typeof setTimeout> | undefined
const startSaving = () => {
  state.value = 'saving'
  clearTimeout(savingTimer)
  savingTimer = setTimeout(() => { state.value = 'success' }, 1400)
}
const finish = () => startSaving()
onBeforeUnmount(() => clearTimeout(savingTimer))

// Bring the new step into view when moving between steps / views
const scrollToTop = () => {
  if (!import.meta.client) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

// Preview pills drive the demo states
watch(state, (s, prev) => {
  if (s !== 'error' && s !== prev) nextTick(scrollToTop)

  if (s === 'error') {
    form.name = ''
    validate()
  } else if (prev === 'error') {
    form.name ||= baby.name
    errors.name = ''
    errors.dob = ''
  }
  if (s === 'saving' && prev !== 'saving') startSaving()
})

// Typing clears the matching error
watch(() => form.name, () => { if (errors.name && form.name.trim()) errors.name = '' })
watch(() => form.dob, () => { if (errors.dob) validate() })

useSeoMeta({
  title: 'Welcome — TinySteps',
  description: 'Set up your nursery in a minute. Private, local-first and works offline.',
})
</script>
