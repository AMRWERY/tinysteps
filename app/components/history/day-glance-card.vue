<template>
  <div class="bg-app-surface border border-app-border rounded-card p-4 sm:p-5 space-y-4 shadow-xs">
    <!-- Card Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-app-primary-soft text-app-primary flex items-center justify-center">
          <Icon name="lucide:bar-chart-2" class="w-4 h-4" />
        </div>
        <div>
          <h3 class="font-bold text-base text-app-text-primary leading-tight">Day at a Glance</h3>
          <span class="text-[11px] text-app-text-secondary">Summary for Maya • Week 14</span>
        </div>
      </div>
      <span
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-app-primary-soft text-app-primary">
        <Icon name="lucide:check-circle-2" class="w-3.5 h-3.5" />
        Balanced Day
      </span>
    </div>

    <!-- 3 Stat Boxes -->
    <div class="grid grid-cols-3 gap-2.5 sm:gap-4">
      <!-- Feedings -->
      <div class="bg-app-surface-subtle rounded-2xl p-3 sm:p-4 space-y-1 border border-app-border/40">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-semibold text-app-text-secondary">Feedings</span>
          <Icon name="lucide:utensils" class="w-3.5 h-3.5 text-app-accent" />
        </div>
        <div class="text-lg sm:text-2xl font-bold text-app-text-primary tabular-nums leading-tight">
          {{ summary.feedCount }}
          <span class="text-xs font-normal text-app-text-secondary">sessions</span>
        </div>
        <p class="text-[10px] sm:text-[11px] text-app-text-secondary leading-snug">{{ summary.feedDetail }}</p>
      </div>

      <!-- Daytime Sleep -->
      <div class="bg-app-surface-subtle rounded-2xl p-3 sm:p-4 space-y-1 border border-app-border/40">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-semibold text-app-text-secondary">Daytime Sleep</span>
          <Icon name="lucide:moon" class="w-3.5 h-3.5 text-app-primary" />
        </div>
        <div class="text-lg sm:text-2xl font-bold text-app-text-primary tabular-nums leading-tight">
          {{ summary.sleepDuration }}
        </div>
        <p class="text-[10px] sm:text-[11px] text-app-text-secondary leading-snug">{{ summary.sleepDetail }}</p>
      </div>

      <!-- Diaper Changes -->
      <div class="bg-app-surface-subtle rounded-2xl p-3 sm:p-4 space-y-1 border border-app-border/40">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-semibold text-app-text-secondary">Diaper Changes</span>
          <Icon name="lucide:droplet" class="w-3.5 h-3.5 text-app-warning" />
        </div>
        <div class="text-lg sm:text-2xl font-bold text-app-text-primary tabular-nums leading-tight">
          {{ summary.diaperCount }}
          <span class="text-xs font-normal text-app-text-secondary">changes</span>
        </div>
        <p class="text-[10px] sm:text-[11px] text-app-text-secondary leading-snug">{{ summary.diaperDetail }}</p>
      </div>
    </div>

    <!-- Gentle reassurance footnote -->
    <div class="flex items-start gap-2 pt-0.5 border-t border-app-border/50">
      <Icon name="lucide:sprout" class="w-3.5 h-3.5 text-app-primary shrink-0 mt-0.5" />
      <p class="text-[11px] text-app-text-secondary leading-relaxed">
        A calm snapshot of Maya's day. Routine rhythms ebb and flow naturally—rest easy knowing her needs were met with
        care.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DayGentleSummary } from '~/types/history';

defineProps<{
  summary: DayGentleSummary;
}>();
</script>