<template>
  <section class="space-y-3">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-bold text-app-text-primary">Quick Routines</h2>
      <span class="text-xs text-app-text-secondary">Tap to record single-handed</span>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button v-for="r in routines" :key="r.type" type="button"
        class="bg-app-surface border border-app-border rounded-2xl p-4 text-start shadow-xs hover:border-app-primary/50 hover:shadow-sm active:scale-[0.98] transition-all focus-ring"
        @click="emit('log', r.type)">
        <div class="flex items-center justify-between mb-4">
          <span :class="['w-11 h-11 rounded-xl flex items-center justify-center', routineTypeMeta[r.type].tile]">
            <Icon :name="routineTypeMeta[r.type].icon" class="w-5 h-5" />
          </span>
          <span class="text-xs font-semibold text-app-text-secondary">+ Log</span>
        </div>
        <h3 class="text-base font-bold text-app-text-primary">{{ r.label }}</h3>
        <p class="text-xs text-app-text-secondary mt-0.5">{{ r.subtitle }}</p>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ sleepSubtitle: string }>()
const emit = defineEmits<{ (e: 'log', type: 'feed' | 'sleep' | 'diaper'): void }>()

const routines = computed(() => [
  { type: 'feed' as const, label: 'Feed', subtitle: 'Last: 2h 15m ago (Left 14m)' },
  { type: 'sleep' as const, label: 'Sleep', subtitle: props.sleepSubtitle },
  { type: 'diaper' as const, label: 'Diaper', subtitle: 'Last: 1h 40m ago (Wet)' },
])
</script>
