<template>
  <div class="space-y-4">
    <section class="bg-app-surface border border-app-border rounded-card p-5 space-y-3 shadow-xs">
      <div class="flex items-center justify-between">
        <h3 class="flex items-center gap-2 font-bold text-base text-app-text-primary">
          <Icon name="lucide:users" class="w-4 h-4 text-app-primary" /> Caregiver Circle
        </h3>
        <span class="px-2.5 py-0.5 rounded-full bg-app-primary-soft text-app-primary text-[11px] font-semibold">Synced</span>
      </div>
      <p class="text-sm text-app-text-secondary leading-relaxed">
        Shared access allows instantaneous routine updates across both parents without waking baby.
      </p>

      <div v-for="p in people" :key="p.name" class="flex items-center gap-3 bg-app-surface-subtle rounded-2xl p-2.5">
        <span :class="['w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0', p.color]">
          {{ p.name[0] }}
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-app-text-primary leading-tight">{{ p.name }}</p>
          <p class="text-xs text-app-text-secondary">{{ p.role }}</p>
        </div>
        <span v-if="p.badge" class="text-xs text-app-text-secondary">{{ p.badge }}</span>
        <Icon v-else name="lucide:refresh-cw" class="w-4 h-4 text-app-text-secondary" />
      </div>

      <button type="button"
        class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-app-surface-subtle text-sm font-semibold text-app-text-primary hover:bg-app-border/40 transition-colors focus-ring">
        <Icon name="lucide:user-plus" class="w-4 h-4" /> Invite Partner or Nanny
      </button>
    </section>

    <section class="bg-app-surface-subtle rounded-card p-5 flex items-start gap-3">
      <Icon name="lucide:shield-check" class="w-5 h-5 text-app-primary shrink-0 mt-0.5" />
      <div>
        <p class="text-sm font-bold text-app-text-primary">Zero-Ad Privacy Shield</p>
        <p class="text-xs text-app-text-secondary leading-relaxed mt-1">
          {{ babyName }}'s development data is end-to-end protected. TinySteps never sells information to baby formula
          marketers or third parties.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{ babyName: string }>()

const people = [
  { name: 'Alex (You)', role: 'Primary Caregiver', badge: 'Owner', color: 'bg-app-primary text-white' },
  { name: 'Jordan', role: 'Partner • Full Access', badge: '', color: 'bg-app-accent-soft text-app-accent' },
]
</script>
