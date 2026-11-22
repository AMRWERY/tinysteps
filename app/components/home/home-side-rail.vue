<template>
  <aside class="w-full xl:w-[340px] shrink-0 grid sm:grid-cols-2 xl:grid-cols-1 gap-4 items-start">
    <!-- Today's Totals -->
    <section class="bg-app-surface border border-app-border rounded-card p-5 space-y-3 shadow-xs">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold text-app-text-primary">Today's Totals</h3>
        <span class="text-xs text-app-text-secondary">Descriptive</span>
      </div>

      <div v-for="row in rows" :key="row.label" class="flex items-center gap-3 bg-app-surface-subtle rounded-2xl p-3">
        <span class="w-10 h-10 rounded-xl bg-app-surface flex items-center justify-center shrink-0" :class="row.color">
          <Icon :name="row.icon" class="w-5 h-5" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-bold text-app-text-primary">{{ row.label }}</p>
          <p class="text-xs text-app-text-secondary">{{ row.detail }}</p>
        </div>
        <div class="text-end">
          <p class="text-lg font-bold font-mono tabular-nums text-app-text-primary leading-tight">
            {{ row.value }}<span v-if="row.unit" class="text-sm"> {{ row.unit }}</span>
          </p>
          <p class="text-[11px] text-app-text-secondary">{{ row.note }}</p>
        </div>
      </div>

      <p class="flex items-start gap-2 text-xs text-app-text-secondary leading-relaxed">
        <Icon name="lucide:sprout" class="w-3.5 h-3.5 text-app-primary shrink-0 mt-0.5" />
        Descriptive totals for peace of mind. Every baby creates their own rhythm; there are no rigid targets or scores
        here.
      </p>
    </section>

    <!-- Gentle note -->
    <section class="bg-app-primary-soft/60 border border-app-border rounded-card p-5 space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[11px] font-bold uppercase tracking-wider text-app-text-secondary">Gentle note for
          today</span>
        <Icon name="lucide:heart" class="w-4 h-4 text-app-text-secondary" />
      </div>
      <h3 class="text-lg font-bold text-app-text-primary">{{ baby.name }}'s {{ baby.week }}-Week Leap</h3>
      <p class="text-sm text-app-text-secondary leading-relaxed">
        Babies often cluster-feed or experience slightly shorter catnaps during week {{ baby.week }} as vision and
        social smiles blossom. Take deep breaths—you are doing wonderfully.
      </p>
      <a href="#" class="inline-flex items-center gap-1 text-sm font-semibold text-app-primary hover:underline">
        Read pediatric soothing notes
        <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 rtl:rotate-180" />
      </a>
    </section>

    <!-- Profile fallback -->
    <section class="bg-app-surface border border-app-border rounded-card p-5 space-y-3 shadow-xs">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-app-text-primary">Profile Fallback State</h3>
        <span class="text-xs text-app-text-secondary">Spec demo</span>
      </div>
      <div class="flex items-center gap-3 bg-app-surface-subtle rounded-2xl p-3">
        <span
          class="w-10 h-10 rounded-full bg-app-surface border border-app-border flex items-center justify-center text-app-text-secondary">
          <Icon name="lucide:smile" class="w-5 h-5" />
        </span>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-app-text-primary">Little One</p>
          <p class="text-xs text-app-text-secondary">Add birth details</p>
        </div>
        <button type="button"
          class="px-3 py-1.5 rounded-lg bg-app-surface text-xs font-semibold text-app-text-primary border border-app-border hover:bg-app-surface-subtle transition-colors">
          Edit
        </button>
      </div>
      <p class="text-xs text-app-text-secondary">
        Displays automatically when caregiver has not yet set up detailed child profile markers.
      </p>
    </section>

    <!-- Care circle -->
    <section class="bg-app-surface border border-app-border rounded-card p-5 space-y-3 shadow-xs">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-app-text-primary">Active Care Circle</h3>
        <Icon name="lucide:users" class="w-4 h-4 text-app-text-secondary" />
      </div>
      <div class="flex items-center gap-3">
        <img :src="baby.avatarUrl" alt="Jordan" class="w-9 h-9 rounded-full object-cover border border-app-border" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-app-text-primary">Jordan (Partner)</p>
          <p class="text-xs text-app-text-secondary">Last logged: 7:15 AM</p>
        </div>
        <span class="w-2 h-2 rounded-full bg-app-success" />
      </div>
      <button type="button"
        class="w-full py-2 rounded-xl bg-app-surface-subtle text-xs font-semibold text-app-text-secondary hover:text-app-text-primary transition-colors">
        + Invite caregiver or nanny
      </button>
    </section>
  </aside>
</template>

<script setup lang="ts">
import type { DayTotals } from '~/types/home'

const props = defineProps<{ totals: DayTotals }>()
const { baby } = useBabyProfile()

const rows = computed(() => [
  { label: 'Milk & Feeds', icon: 'lucide:milk', color: 'text-app-primary', value: props.totals.feed.value, unit: '', detail: props.totals.feed.detail, note: props.totals.feed.note },
  { label: 'Total Rest', icon: 'lucide:moon', color: 'text-app-primary', value: props.totals.rest.value, unit: '', detail: props.totals.rest.detail, note: props.totals.rest.note },
  { label: 'Diapers', icon: 'lucide:droplet', color: 'text-app-accent', value: props.totals.diapers.value, unit: props.totals.diapers.unit, detail: props.totals.diapers.detail, note: props.totals.diapers.note },
])
</script>
