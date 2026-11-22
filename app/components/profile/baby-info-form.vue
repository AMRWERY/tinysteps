<template>
  <section class="bg-app-surface border border-app-border rounded-card p-5 sm:p-6 space-y-5 shadow-xs">
    <div class="flex items-center justify-between pb-3 border-b border-app-border">
      <h2 class="flex items-center gap-2 text-lg font-bold text-app-text-primary">
        <Icon name="lucide:smile" class="w-5 h-5" /> Baby Information
      </h2>
      <span class="text-xs text-app-text-secondary hidden sm:inline">Official milestones reference</span>
    </div>

    <!-- Name -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <label for="baby-name" class="text-sm font-bold text-app-text-primary">
          Baby Name or Nickname <span class="text-danger">*</span>
        </label>
        <span class="text-xs text-app-text-secondary hidden sm:inline">Used on greeting &amp; timers</span>
      </div>
      <input id="baby-name" v-model="form.name" type="text" :disabled="!editing" placeholder="e.g. Maya"
        :aria-invalid="!!errors.name" :class="[inputClass, errors.name ? 'ring-2 ring-danger/60' : '']" />
      <p v-if="errors.name" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
        <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.name }}
      </p>
    </div>

    <!-- DOB + time -->
    <div class="grid sm:grid-cols-2 gap-5">
      <div class="space-y-2">
        <label for="baby-dob" class="text-sm font-bold text-app-text-primary">
          Date of Birth <span class="text-danger">*</span>
        </label>
        <input id="baby-dob" v-model="form.dob" type="date" :max="today" :disabled="!editing"
          :aria-invalid="!!errors.dob" :class="[inputClass, errors.dob ? 'ring-2 ring-danger/60' : '']" />
        <p v-if="errors.dob" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
          <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.dob }}
        </p>
        <p v-else class="text-xs text-app-text-secondary">Used for age-adjusted awake windows &amp; leap milestones.</p>
      </div>
      <div class="space-y-2">
        <label for="baby-time" class="text-sm font-bold text-app-text-primary">
          Birth Time <span class="font-normal text-app-text-secondary">(Optional)</span>
        </label>
        <input id="baby-time" v-model="form.birthTime" type="time" :disabled="!editing" :class="inputClass" />
        <p class="text-xs text-app-text-secondary">Accurate hour for first 24h milestone logging.</p>
      </div>
    </div>

    <!-- Notes -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <label for="baby-notes" class="text-sm font-bold text-app-text-primary">Soothing Cues &amp; Nursery Notes</label>
        <span class="text-xs text-app-text-secondary hidden sm:inline">Visible to shared caregivers</span>
      </div>
      <textarea id="baby-notes" v-model="form.notes" rows="3" :disabled="!editing"
        placeholder="Favourite lullaby, white noise setting, what helps…" :class="[inputClass, 'resize-none']" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProfileErrors, ProfileForm } from '~/types/profile'

defineProps<{ form: ProfileForm; errors: ProfileErrors; editing: boolean }>()

const today = new Date().toISOString().slice(0, 10)

const inputClass =
  'w-full rounded-2xl bg-app-surface-subtle border border-transparent px-4 py-3 text-sm text-app-text-primary placeholder:text-app-text-secondary/70 outline-none focus:border-app-primary focus:bg-app-surface transition-colors disabled:cursor-default disabled:opacity-100'
</script>
