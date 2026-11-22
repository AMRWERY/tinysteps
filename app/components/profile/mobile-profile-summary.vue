<template>
  <div class="md:hidden space-y-4">
    <div class="flex items-start justify-between gap-3">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-app-text-primary">Baby Profile</h1>
        <p class="text-sm text-app-text-secondary mt-1">Gentle, simple details for your daily routine</p>
      </div>
      <span class="w-10 h-10 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center shrink-0">
        <Icon name="lucide:heart" class="w-5 h-5" />
      </span>
    </div>

    <!-- Identity -->
    <section class="bg-app-surface border border-app-border rounded-3xl p-4 space-y-4 shadow-xs">
      <div class="flex items-center gap-4">
        <div class="relative shrink-0">
          <img :src="avatarUrl" :alt="form.name" class="w-[88px] h-[88px] rounded-full object-cover border-2 border-app-surface shadow-sm" />
          <button type="button" aria-label="Edit photo"
            class="absolute bottom-0 end-0 w-8 h-8 rounded-full bg-app-primary text-white flex items-center justify-center border-2 border-app-surface">
            <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
          </button>
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h2 class="text-2xl font-bold text-app-text-primary">{{ form.name }}</h2>
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-app-primary-soft text-app-primary text-[11px] font-semibold">
              <span class="w-1.5 h-1.5 rounded-full bg-app-success" /> Primary
            </span>
          </div>
          <p class="flex items-center gap-1.5 text-sm text-app-text-secondary mt-1">
            <Icon name="lucide:cake" class="w-4 h-4" /> {{ ageLabel }}
          </p>
          <p class="text-xs text-app-text-secondary mt-0.5">Born {{ bornLabel }}</p>
        </div>
      </div>
      <p class="flex items-center gap-2 bg-app-surface-subtle rounded-xl px-3 py-2.5 text-xs text-app-text-primary">
        <Icon name="lucide:users" class="w-4 h-4 text-app-text-secondary shrink-0" />
        <span class="flex-1 min-w-0 truncate">Circle: Alex &amp; Jordan (Co-parents)</span>
        <span class="px-2 py-0.5 rounded-md bg-app-surface text-[11px] font-semibold text-app-primary">Synced</span>
      </p>
    </section>

    <!-- Basic info -->
    <section class="bg-app-surface border border-app-border rounded-3xl p-4 space-y-3 shadow-xs">
      <div class="flex items-center justify-between">
        <h2 class="flex items-center gap-2 text-lg font-bold text-app-text-primary">
          <Icon name="lucide:id-card" class="w-5 h-5 text-app-primary" /> Basic Information
        </h2>
        <button type="button" class="flex items-center gap-0.5 text-sm font-semibold text-app-text-primary" @click="emit('edit')">
          Edit <Icon name="lucide:chevron-right" class="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>
      <dl class="space-y-2">
        <div v-for="r in rows" :key="r.label" class="flex items-center justify-between gap-4 bg-app-surface-subtle rounded-xl px-4 py-3">
          <dt class="text-sm text-app-text-secondary">{{ r.label }}</dt>
          <dd class="text-sm font-semibold text-app-text-primary text-end truncate">{{ r.value }}</dd>
        </div>
      </dl>
    </section>

    <!-- Preferences -->
    <section class="bg-app-surface border border-app-border rounded-3xl p-4 space-y-3 shadow-xs">
      <h2 class="flex items-center gap-2 text-lg font-bold text-app-text-primary">
        <Icon name="lucide:sliders-horizontal" class="w-5 h-5" /> Daily Tracker Preferences
      </h2>
      <p class="text-sm text-app-text-secondary leading-relaxed">
        TinySteps configures your logging timers and buttons based on these gentle settings.
      </p>
      <div v-for="p in prefs" :key="p.title" class="flex items-start gap-3 bg-app-surface-subtle rounded-2xl p-3.5">
        <span :class="['w-10 h-10 rounded-xl flex items-center justify-center shrink-0', p.tile]">
          <Icon :name="p.icon" class="w-5 h-5" />
        </span>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <p class="text-sm font-bold text-app-text-primary">{{ p.title }}</p>
            <span class="text-xs text-app-text-secondary whitespace-nowrap">{{ p.value }}</span>
          </div>
          <p class="text-xs text-app-text-secondary mt-0.5 leading-snug">{{ p.text }}</p>
        </div>
      </div>
    </section>

    <button type="button"
      class="w-full flex items-center justify-center gap-2 min-h-[52px] rounded-2xl bg-app-primary-soft text-app-primary text-sm font-bold active:scale-[0.98] transition-transform"
      @click="emit('edit')">
      <Icon name="lucide:file-pen-line" class="w-4 h-4" /> Edit Profile &amp; Preferences
    </button>

    <section class="bg-app-surface border border-app-border rounded-3xl p-4 flex items-center gap-3 shadow-xs">
      <span class="w-10 h-10 rounded-full bg-app-surface-subtle text-app-text-secondary flex items-center justify-center shrink-0">
        <Icon name="lucide:user-plus" class="w-5 h-5" />
      </span>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-bold text-app-text-primary">Caregiver Sync</p>
        <p class="text-xs text-app-text-secondary">Invite partner, nanny, or grandparents</p>
      </div>
      <button type="button" class="px-4 py-2 rounded-xl bg-app-surface-subtle text-sm font-semibold text-app-text-primary">Invite</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ProfileForm } from '~/types/profile'

const props = defineProps<{ form: ProfileForm; avatarUrl: string; ageLabel: string; bornLabel: string; birthTimeLabel: string }>()
const emit = defineEmits<{ (e: 'edit'): void }>()

const rows = computed(() => [
  { label: 'Full or Nickname', value: props.form.name },
  { label: 'Date of Birth', value: props.bornLabel },
  { label: 'Birth Time', value: props.birthTimeLabel || '—' },
  { label: 'Nursery / Sleep Note', value: props.form.notes || '—' },
])

const methodLabel = { breast: 'Breast', bottle: 'Bottle', combined: 'Breast + Bottle' }

const prefs = computed(() => [
  {
    title: 'Feed Volume Unit', icon: 'lucide:droplet', tile: 'bg-app-primary-soft text-app-primary',
    value: props.form.volumeUnit === 'ml' ? 'Milliliters (ml)' : 'Ounces (oz)',
    text: 'Applies to expressed milk and bottle logs',
  },
  {
    title: 'Feeding Method', icon: 'lucide:milk', tile: 'bg-app-accent-soft text-app-accent',
    value: methodLabel[props.form.feedingMethod],
    text: 'Remembers Left vs Right breast balance automatically',
  },
  {
    title: 'Sleep Timer Style', icon: 'lucide:moon', tile: 'bg-app-primary-soft text-app-primary',
    value: props.form.sleepStyle === 'timer' ? 'Live counter' : 'Manual entry',
    text: 'Wake interval reminder gently prompts after ~90 min',
  },
])
</script>
