<template>
  <!-- 1. LOADING SKELETON STATE -->
  <div v-if="state === 'loading'"
    class="bg-app-surface border border-app-border rounded-card p-6 space-y-4 animate-pulse">
    <div class="flex justify-between items-center">
      <div class="h-4 w-40 bg-app-surface-subtle rounded"></div>
      <div class="h-5 w-24 bg-app-surface-subtle rounded-full"></div>
    </div>
    <div class="h-3 w-48 bg-app-surface-subtle rounded"></div>
    <div class="grid grid-cols-3 gap-3 pt-1">
      <div v-for="i in 3" :key="i" class="h-24 bg-app-surface-subtle rounded-xl"></div>
    </div>
    <div class="h-3 w-full bg-app-surface-subtle rounded"></div>
  </div>

  <!-- 2. FIRST RUN / EMPTY STATE -->
  <div v-else-if="state === 'first-run'"
    class="bg-app-surface border border-dashed border-app-border rounded-card p-8 text-center space-y-3">
    <div class="w-12 h-12 mx-auto rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center">
      <Icon name="lucide:sparkles" class="w-6 h-6" />
    </div>
    <h3 class="text-base font-bold text-app-text-primary">Maya's First Day</h3>
    <p class="text-xs text-app-text-secondary max-w-sm mx-auto">
      Routines will form naturally. Log Maya's first nap, bottle, or diaper change whenever you're ready.
    </p>
    <button @click="emit('startNap')"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-app-primary text-white text-xs font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-sm">
      <Icon name="lucide:moon" class="w-4 h-4" />
      <span>Start First Nap Session</span>
    </button>
  </div>

  <!-- 3. BABY AWAKE (IDLE) STATE -->
  <div v-else-if="state === 'baby-awake'"
    class="bg-app-surface border border-app-border rounded-card p-5 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-11 h-11 rounded-2xl bg-app-accent-soft text-app-accent flex items-center justify-center">
        <Icon name="lucide:sun" class="w-6 h-6" />
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-base font-bold text-app-text-primary">Maya is awake &amp; content</h3>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-app-surface-subtle text-app-text-secondary">
            Awake 1h 10m
          </span>
        </div>
        <p class="text-xs text-app-text-secondary mt-0.5">Next nap window anticipated around 2:45 PM</p>
      </div>
    </div>
    <button @click="emit('startNap')"
      class="flex items-center gap-2 px-4 py-2 rounded-button bg-app-primary text-white text-xs font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs">
      <Icon name="lucide:moon" class="w-4 h-4" />
      <span>Start Nap</span>
    </button>
  </div>

  <!-- 4. DAY AT A GLANCE — ACTIVE / POPULATED STATE -->
  <div v-else class="bg-app-surface border border-app-border rounded-card p-5 space-y-4 shadow-xs">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-2">
        <Icon name="lucide:bar-chart-2" class="w-4 h-4 text-app-primary" />
        <div>
          <h3 class="font-bold text-base text-app-text-primary">Day at a Glance</h3>
          <p class="text-[11px] text-app-text-secondary mt-0.5">Summary for Maya • Week 14</p>
        </div>
      </div>
      <span
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-app-primary-soft text-app-primary">
        <Icon name="lucide:check-circle-2" class="w-3.5 h-3.5" />
        Balanced Day
      </span>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-3 gap-3">
      <!-- Feedings -->
      <div class="bg-app-surface-subtle rounded-xl p-3.5 space-y-1.5">
        <div class="flex items-center gap-1.5 text-app-accent">
          <Icon name="lucide:utensils" class="w-3.5 h-3.5" />
          <span class="text-[10px] font-bold uppercase tracking-wider">Feedings</span>
        </div>
        <div class="text-2xl font-bold text-app-text-primary font-mono leading-none">3</div>
        <div class="text-[10px] text-app-text-secondary leading-snug">
          <span class="font-semibold text-app-text-primary">sessions</span><br />
          380 ml bottle + 1 nursing
        </div>
      </div>

      <!-- Daytime Sleep -->
      <div class="bg-app-surface-subtle rounded-xl p-3.5 space-y-1.5">
        <div class="flex items-center gap-1.5 text-app-primary">
          <Icon name="lucide:moon" class="w-3.5 h-3.5" />
          <span class="text-[10px] font-bold uppercase tracking-wider">Daytime Sleep</span>
        </div>
        <div class="text-2xl font-bold text-app-text-primary font-mono leading-none">2h 30m</div>
        <div class="text-[10px] text-app-text-secondary leading-snug">
          2 naps • <span class="font-semibold text-app-text-primary">Avg 1h 15m</span>
        </div>
      </div>

      <!-- Diaper Changes -->
      <div class="bg-app-surface-subtle rounded-xl p-3.5 space-y-1.5">
        <div class="flex items-center gap-1.5 text-app-warning">
          <Icon name="lucide:droplet" class="w-3.5 h-3.5" />
          <span class="text-[10px] font-bold uppercase tracking-wider">Diaper Changes</span>
        </div>
        <div class="text-2xl font-bold text-app-text-primary font-mono leading-none">2</div>
        <div class="text-[10px] text-app-text-secondary leading-snug">
          <span class="font-semibold text-app-text-primary">changes</span><br />
          1 wet, 1 both (routine)
        </div>
      </div>
    </div>

    <!-- Gentle Reflection Quote -->
    <div class="flex items-start gap-2 pt-1 border-t border-app-border">
      <Icon name="lucide:sprout" class="w-3.5 h-3.5 text-app-primary shrink-0 mt-0.5" />
      <p class="text-[11px] text-app-text-secondary leading-relaxed italic">
        A calm snapshot of Maya's day. Routine rhythms ebb and flow naturally—rest easy knowing her needs were met with
        care.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppState } from '~/types/home';

defineProps<{
  state: AppState;
  timerString: string;
  isPaused: boolean;
}>();

const emit = defineEmits<{
  (e: 'togglePause'): void;
  (e: 'wakeAndSave'): void;
  (e: 'startNap'): void;
}>();
</script>