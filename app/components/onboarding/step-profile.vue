<template>
  <div class="space-y-5">
    <div>
      <span class="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-app-primary-soft text-app-primary text-xs font-semibold">
        <span class="w-1.5 h-1.5 rounded-full bg-app-success" /> First-Run Setup
      </span>
      <h2 class="hidden md:block text-2xl font-bold text-app-text-primary mt-3">Who are we caring for today?</h2>
      <p class="hidden md:block text-sm text-app-text-secondary mt-1.5">
        Add your baby's basic details so awake windows and daily summaries calculate naturally.
      </p>
    </div>

    <!-- Avatar (md+) -->
    <div class="hidden md:flex items-center gap-4 bg-app-surface-subtle rounded-2xl p-2.5">
      <div class="relative">
        <span class="w-[70px] h-[70px] rounded-full bg-app-accent/70 text-white flex items-center justify-center text-3xl font-bold">
          {{ (form.name.trim()[0] || '?').toUpperCase() }}
        </span>
        <button type="button" aria-label="Choose a photo"
          class="absolute -bottom-0.5 -end-0.5 w-7 h-7 rounded-full bg-app-primary text-white flex items-center justify-center border-2 border-app-surface-subtle">
          <Icon name="lucide:camera" class="w-3.5 h-3.5" />
        </button>
      </div>
      <div>
        <p class="text-sm font-bold text-app-text-primary">Nursery Avatar</p>
        <p class="text-xs text-app-text-secondary">Automatic soft initials or tap camera to choose a photo</p>
      </div>
    </div>

    <!-- Name -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <label for="ob-name" class="text-sm font-bold text-app-text-primary">
          Baby's <span class="hidden md:inline">Name or Nickname</span><span class="md:hidden">name or nickname</span>
          <span class="text-danger">*</span>
        </label>
        <span class="text-xs text-app-text-secondary">Required</span>
      </div>
      <div class="relative">
        <input id="ob-name" v-model="form.name" type="text" autocomplete="off" placeholder="e.g. Maya"
          :aria-invalid="!!errors.name" :class="[inputClass, errors.name ? 'ring-2 ring-danger/60' : '']" />
        <template v-if="form.name.trim() && !errors.name">
          <Icon name="lucide:check-circle-2"
            class="hidden md:block absolute top-1/2 -translate-y-1/2 end-4 w-5 h-5 text-app-success pointer-events-none" />
          <Icon name="lucide:smile"
            class="md:hidden absolute top-1/2 -translate-y-1/2 end-4 w-5 h-5 text-app-text-secondary pointer-events-none" />
        </template>
      </div>
      <p v-if="errors.name" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
        <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.name }}
      </p>
      <p v-else class="md:hidden text-xs text-app-text-secondary">This can be changed at any time in baby settings.</p>
    </div>

    <!-- DOB -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <label for="ob-dob" class="text-sm font-bold text-app-text-primary">
          <span class="hidden md:inline">Date of Birth <span class="text-danger">*</span></span>
          <span class="md:hidden">Date of birth</span>
        </label>
        <span class="hidden md:inline text-xs text-app-text-secondary">Age-adjusted rhythms</span>
      </div>
      <input id="ob-dob" v-model="form.dob" type="date" :max="today" :aria-invalid="!!errors.dob"
        :class="[inputClass, errors.dob ? 'ring-2 ring-danger/60' : '']" />
      <p v-if="errors.dob" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
        <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.dob }}
      </p>
      <p v-else class="text-xs text-app-text-secondary">
        <span class="hidden md:inline">Helps calculate expected awake intervals (approx. 75–100 min for 3 months).</span>
        <span class="md:hidden">Used only for age-adjusted awake windows and timeline context.</span>
      </p>
    </div>

    <!-- Optional details -->
    <div class="bg-app-surface-subtle rounded-2xl">
      <button type="button" :aria-expanded="optionalOpen" aria-controls="ob-optional"
        class="w-full flex items-center justify-between gap-2 px-4 py-3.5 text-sm font-medium text-app-text-secondary hover:text-app-text-primary transition-colors focus-ring rounded-2xl"
        @click="optionalOpen = !optionalOpen">
        <span class="flex items-center gap-2">
          <Icon name="lucide:plus-circle" class="w-4 h-4 hidden md:block" />
          <Icon name="lucide:ellipsis" class="w-4 h-4 md:hidden" />
          <span class="hidden md:inline">Birth time &amp; Nursery notes <span class="text-xs">(Optional)</span></span>
          <span class="md:hidden">Optional Details (Time &amp; Notes)</span>
        </span>
        <Icon name="lucide:chevron-down" :class="['w-4 h-4 transition-transform', optionalOpen ? 'rotate-180' : '']" />
      </button>
      <div v-show="optionalOpen" id="ob-optional" class="px-4 pb-4 space-y-3">
        <div class="space-y-1.5">
          <label for="ob-time" class="text-xs font-bold text-app-text-primary">Birth time</label>
          <input id="ob-time" v-model="form.birthTime" type="time" :class="[inputClass, 'bg-app-surface']" />
        </div>
        <div class="space-y-1.5">
          <label for="ob-notes" class="text-xs font-bold text-app-text-primary">Nursery notes</label>
          <textarea id="ob-notes" v-model="form.notes" rows="3" placeholder="Soothing cues, favourite lullaby…"
            :class="[inputClass, 'bg-app-surface resize-none']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfileErrors, ProfileForm } from '~/types/profile'

defineProps<{ form: ProfileForm; errors: ProfileErrors }>()

const today = new Date().toISOString().slice(0, 10)
const optionalOpen = ref(false)

const inputClass =
  'w-full rounded-2xl bg-app-surface-subtle md:bg-app-surface md:border md:border-app-border/60 md:shadow-xs px-4 py-3.5 text-sm text-app-text-primary placeholder:text-app-text-secondary/70 outline-none focus:border-app-primary focus:ring-2 focus:ring-app-primary/20 transition'
</script>
