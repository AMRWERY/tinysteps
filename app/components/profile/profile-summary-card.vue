<template>
  <section class="bg-app-surface border border-app-border rounded-card overflow-hidden shadow-xs">
    <div class="h-20 bg-app-surface-subtle" />
    <div class="px-5 pb-5 -mt-12 text-center">
      <div class="relative w-[132px] h-[132px] mx-auto">
        <img v-if="!useInitials" :src="avatarUrl" :alt="name"
          class="w-full h-full rounded-full object-cover border-4 border-app-surface shadow-sm" />
        <div v-else
          class="w-full h-full rounded-full border-4 border-app-surface shadow-sm bg-app-primary-soft text-app-primary flex items-center justify-center text-5xl font-bold">
          {{ initial }}
        </div>
        <button type="button" aria-label="Change photo"
          class="absolute bottom-1 end-1 w-9 h-9 rounded-full bg-app-primary text-white flex items-center justify-center border-2 border-app-surface hover:bg-app-primary-hover transition-colors">
          <Icon name="lucide:camera" class="w-4 h-4" />
        </button>
      </div>

      <button type="button" class="mt-3 text-xs text-app-text-secondary underline underline-offset-2 hover:text-app-text-primary"
        @click="useInitials = !useInitials">
        {{ useInitials ? 'Switch back to photo' : 'Switch to initials fallback demo' }}
      </button>

      <h2 class="mt-4 text-xl font-bold text-app-text-primary">{{ name || 'Little One' }}</h2>
      <p class="text-xs text-app-text-secondary mt-1">{{ subtitle }}</p>

      <div class="mt-5 pt-5 border-t border-app-border grid grid-cols-2 gap-3">
        <div class="bg-app-surface-subtle rounded-2xl py-3 px-2">
          <p class="text-[11px] text-app-text-secondary">Awake Target</p>
          <p class="text-sm font-bold text-app-text-primary mt-0.5">75 – 100 min</p>
        </div>
        <div class="bg-app-surface-subtle rounded-2xl py-3 px-2">
          <p class="text-[11px] text-app-text-secondary">Sleep Stage</p>
          <p class="text-sm font-bold text-app-text-primary mt-0.5">4 Naps / Day</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string; subtitle: string; avatarUrl: string }>()

const useInitials = ref(false)
const initial = computed(() => (props.name.trim()[0] || '?').toUpperCase())
</script>
