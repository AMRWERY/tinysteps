<template>
  <div class="space-y-2.5">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1.5 font-bold text-base text-app-text-primary">
        <Icon icon="lucide:zap" class="w-4 h-4 text-app-text-primary" />
        <span>Instant Logging Hub</span>
      </div>
      <span class="text-xs text-app-text-secondary">Single-tap records</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <!-- Feeding -->
      <button @click="$emit('log', 'feed')"
        class="bg-app-surface border border-app-border rounded-2xl p-4 text-left hover:border-app-primary transition-all group active:scale-[0.98]">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl bg-app-accent-soft text-app-accent flex items-center justify-center">
            <Icon icon="lucide:utensils" class="w-5 h-5" />
          </div>
          <Icon icon="lucide:chevron-right"
            class="w-4 h-4 text-app-text-secondary group-hover:translate-x-0.5 transition-transform" />
        </div>
        <h4 class="font-bold text-app-text-primary text-sm">Feeding</h4>
        <p class="text-xs text-app-text-secondary mt-1">Last: 2h 10m ago (Left side, 18m)</p>
      </button>

      <!-- Diaper -->
      <button @click="$emit('log', 'diaper')"
        class="bg-app-surface border border-app-border rounded-2xl p-4 text-left hover:border-app-primary transition-all group active:scale-[0.98]">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl bg-app-primary-soft text-app-primary flex items-center justify-center">
            <Icon icon="lucide:droplet" class="w-5 h-5" />
          </div>
          <Icon icon="lucide:chevron-right"
            class="w-4 h-4 text-app-text-secondary group-hover:translate-x-0.5 transition-transform" />
        </div>
        <h4 class="font-bold text-app-text-primary text-sm">Diaper</h4>
        <p class="text-xs text-app-text-secondary mt-1">Last: 1h 45m ago (Wet)</p>
      </button>

      <!-- Tummy Time -->
      <button @click="$emit('log', 'tummy')"
        class="bg-app-surface border border-app-border rounded-2xl p-4 text-left hover:border-app-primary transition-all group active:scale-[0.98]">
        <div class="flex items-center justify-between mb-2">
          <div
            class="w-10 h-10 rounded-xl bg-app-surface-subtle text-app-text-primary flex items-center justify-center">
            <Icon icon="lucide:activity" class="w-5 h-5" />
          </div>
          <Icon icon="lucide:chevron-right"
            class="w-4 h-4 text-app-text-secondary group-hover:translate-x-0.5 transition-transform" />
        </div>
        <h4 class="font-bold text-app-text-primary text-sm">Tummy Time</h4>
        <p class="text-xs text-app-text-secondary mt-1">Today: 18m / 30m goal</p>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'log', type: string): void
}>()
</script>