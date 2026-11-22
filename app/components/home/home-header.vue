<template>
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div class="min-w-0">
      <div class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-app-text-secondary">
        <span>Caregiver Log</span>
        <span class="w-1 h-1 rounded-full bg-app-border" />
        <span class="normal-case font-medium tracking-normal">{{ dateLabel }} • Week {{ baby.week }}</span>
      </div>
      <h1 class="text-3xl font-bold tracking-tight text-app-text-primary mt-1.5">
        {{ greeting }}, <span class="text-app-primary">{{ caregiver.name }}</span>
      </h1>
      <p class="text-sm text-app-text-secondary mt-1.5">{{ subtitle }}</p>
    </div>

    <div class="flex items-center gap-3 shrink-0">
      <!-- Baby selector -->
      <button type="button"
        class="flex items-center gap-3 ps-2 pe-3 py-2 rounded-2xl bg-app-surface border border-app-border shadow-xs hover:border-app-primary/40 transition-colors focus-ring">
        <img :src="baby.avatarUrl" :alt="baby.name" class="w-9 h-9 rounded-full object-cover border border-app-border" />
        <span class="text-start">
          <span class="block text-sm font-bold text-app-text-primary leading-tight">{{ baby.name }}</span>
          <span class="block text-xs text-app-text-secondary">{{ baby.ageLabel }} • {{ baby.weightLabel }}</span>
        </span>
        <Icon name="lucide:chevron-down" class="w-4 h-4 text-app-text-secondary ms-1" />
      </button>

      <button type="button"
        class="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-button bg-app-primary text-white font-semibold text-sm hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs focus-ring"
        @click="emit('quickLog')">
        <Icon name="lucide:plus-circle" class="w-4 h-4" />
        <span>Quick Log</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppState } from '~/types/home'

const props = defineProps<{ state: AppState }>()
const emit = defineEmits<{ (e: 'quickLog'): void }>()

const { baby, caregiver } = useBabyProfile()
const { greeting, dateLabel } = useGreeting()

const subtitle = computed(() => ({
  'active-sleep': `${baby.name} is resting serenely. Routine rhythms look gentle and calm today.`,
  'baby-awake': `${baby.name} is awake and content. Her next nap window is coming up.`,
  'first-run': `Welcome! Log ${baby.name}'s first routine whenever you're ready.`,
  'loading': 'Gathering the latest routines…',
}[props.state]))
</script>
