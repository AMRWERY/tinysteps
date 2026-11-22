<template>
  <div class="w-full max-w-[1240px] mx-auto p-4 md:p-0 space-y-6">
    <profile-preview-states :model-value="state" @update:model-value="setState" />

    <!-- Phones: saved summary view -->
    <mobile-profile-summary v-if="state === 'saved' || state === 'toast'" :form="saved" :avatar-url="baby.avatarUrl"
      :age-label="ageLabel" :born-label="bornLabel" :birth-time-label="birthTimeLabel" @edit="setState('edit')" />

    <!-- Form layout: always on md+, on phones only while editing -->
    <div :class="[(state === 'saved' || state === 'toast') ? 'hidden md:block' : '', 'space-y-6']">
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-app-text-secondary">
            <Icon name="lucide:baby" class="w-3.5 h-3.5 text-app-primary" /> Nursery Configuration
          </p>
          <h1 class="text-3xl font-bold tracking-tight text-app-text-primary mt-1.5">Baby Profile &amp; Preferences</h1>
          <p class="text-sm text-app-text-secondary mt-1.5 max-w-xl">
            Personalize {{ displayName }}'s name, birth date, and daily tracking habits. TinySteps keeps your family's
            routines private, calm, and effortlessly synchronized.
          </p>
        </div>
        <span
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-app-surface border border-app-border text-sm font-medium text-app-text-primary shadow-xs shrink-0">
          <span class="w-2 h-2 rounded-full bg-app-success" /> {{ displayName }} • {{ weeks }} Weeks (Active)
        </span>
      </header>

      <div class="grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-6 items-start">
        <div class="space-y-4">
          <profile-summary-card :name="form.name" :subtitle="summarySubtitle" :avatar-url="baby.avatarUrl" />
          <caregiver-circle-card :baby-name="displayName" />
        </div>

        <div class="space-y-6">
          <baby-info-form :form="form" :errors="errors" :editing="isEditing" />
          <tracking-defaults-form :form="form" :editing="isEditing" />

          <!-- Action bar -->
          <div
            class="bg-app-surface border border-app-border rounded-card p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <p class="flex items-center gap-2 text-xs text-app-text-secondary">
              <Icon name="lucide:history" class="w-4 h-4" /> Last synchronized today at {{ syncedAt }}
            </p>
            <div class="flex items-center gap-3">
              <template v-if="isEditing">
                <button type="button" class="px-4 py-2.5 text-sm font-semibold text-app-text-secondary hover:text-app-text-primary transition-colors"
                  @click="cancel">
                  Cancel
                </button>
                <button type="button"
                  class="flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-button bg-app-primary text-white text-sm font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs focus-ring"
                  @click="save">
                  <Icon name="lucide:check" class="w-4 h-4" /> Save Changes
                </button>
              </template>
              <button v-else type="button"
                class="flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-button bg-app-primary text-white text-sm font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs focus-ring"
                @click="setState('edit')">
                <Icon name="lucide:pencil" class="w-4 h-4" /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="toastVisible" role="status"
          class="fixed z-50 bottom-24 md:bottom-8 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-app-text-primary text-app-bg text-sm font-semibold shadow-lg">
          <Icon name="lucide:check-circle-2" class="w-4 h-4" /> Profile saved &amp; synced with your circle
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { ProfileErrors, ProfileForm, ProfilePreviewState } from '~/types/profile'

const { baby } = useBabyProfile()
const { locale } = useI18n()

const weeksAgoIso = (weeks: number) => new Date(Date.now() - weeks * 7 * 864e5).toISOString().slice(0, 10)

const defaultProfile = (): ProfileForm => ({
  name: baby.name,
  dob: weeksAgoIso(baby.week),
  birthTime: '08:42',
  notes: 'Loves bouncing on yoga ball. White noise setting: gentle brook. Favorite lullaby: Twinkle Twinkle Little Star.',
  volumeUnit: 'ml',
  feedingMethod: 'combined',
  diaperDetail: true,
  sleepStyle: 'timer',
})

const emptyProfile = (): ProfileForm => ({
  name: '', dob: '', birthTime: '', notes: '',
  volumeUnit: 'ml', feedingMethod: 'combined', diaperDetail: false, sleepStyle: 'timer',
})

const state = ref<ProfilePreviewState>('saved')
const saved = reactive<ProfileForm>(defaultProfile())
const form = reactive<ProfileForm>({ ...saved })
const errors = reactive<ProfileErrors>({ name: '', dob: '' })

const isEditing = computed(() => ['edit', 'first-time', 'error'].includes(state.value))
const displayName = computed(() => (isEditing.value ? form.name : saved.name).trim() || 'Your baby')

// ── Derived display values ──────────────────────────────────────────
const formatDate = (iso: string) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString(locale.value, { day: 'numeric', month: 'long', year: 'numeric' }) : ''

const weeksFor = (iso: string) =>
  iso ? Math.max(0, Math.floor((Date.now() - new Date(`${iso}T00:00:00`).getTime()) / (7 * 864e5))) : 0

const weeks = computed(() => weeksFor(isEditing.value ? form.dob : saved.dob))
const bornLabel = computed(() => formatDate(saved.dob))
const ageLabel = computed(() => {
  const w = weeksFor(saved.dob)
  return w >= 8 ? `${Math.round(w / 4.345)} months old` : `${w} weeks old`
})
const birthTimeLabel = computed(() => {
  if (!saved.birthTime) return ''
  const [h = 0, m = 0] = saved.birthTime.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
})
const summarySubtitle = computed(() =>
  form.dob ? `Born ${formatDate(form.dob)} • ${weeksFor(form.dob)} weeks old` : 'Add birth details',
)
const syncedAt = ref('09:14 AM')

// ── State / actions ─────────────────────────────────────────────────
const clearErrors = () => { errors.name = ''; errors.dob = '' }

const validate = () => {
  clearErrors()
  if (!form.name.trim()) errors.name = 'Please enter a name or nickname.'
  if (!form.dob) errors.dob = 'Please choose a date of birth.'
  else if (new Date(form.dob) > new Date()) errors.dob = 'Date of birth cannot be in the future.'
  return !errors.name && !errors.dob
}

const toastVisible = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | undefined
const showToast = () => {
  toastVisible.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastVisible.value = false }, 2800)
}
onBeforeUnmount(() => clearTimeout(toastTimer))

const setState = (next: ProfilePreviewState) => {
  state.value = next
  clearErrors()
  if (next === 'first-time') Object.assign(form, emptyProfile())
  else Object.assign(form, saved)

  if (next === 'error') {
    form.name = ''
    validate()
  }
  if (next === 'toast') showToast()
}

const cancel = () => setState('saved')

const save = () => {
  if (!validate()) {
    state.value = 'error'
    return
  }
  Object.assign(saved, form)
  state.value = 'saved'
  showToast()
}

useSeoMeta({
  title: 'Baby Profile — TinySteps',
  description: 'Baby profile for the Tiny Steps - Baby Routine Tracker app.',
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}

[dir='rtl'] .toast-enter-from,
[dir='rtl'] .toast-leave-to {
  transform: translate(50%, 12px);
}
</style>
