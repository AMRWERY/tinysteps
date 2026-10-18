<template>
  <aside class="w-[280px] shrink-0 space-y-4 hidden xl:block">

    <!-- Mini Calendar -->
    <div class="bg-app-surface border border-app-border rounded-card p-4 space-y-3">
      <!-- Month Header -->
      <div class="flex items-center justify-between">
        <span class="font-bold text-sm text-app-text-primary">October 2023</span>
        <div class="flex items-center gap-1">
          <button class="p-1 rounded-lg hover:bg-app-surface-subtle text-app-text-secondary transition-colors">
            <Icon name="lucide:chevron-left" class="w-4 h-4" />
          </button>
          <button class="p-1 rounded-lg hover:bg-app-surface-subtle text-app-text-secondary transition-colors">
            <Icon name="lucide:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Day-of-week labels -->
      <div class="grid grid-cols-7 text-center">
        <span v-for="d in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="d"
          class="text-[10px] font-semibold text-app-text-secondary py-0.5">{{ d }}</span>
      </div>

      <!-- Calendar Grid -->
      <div class="grid grid-cols-7 text-center gap-y-0.5">
        <!-- Sep overflow -->
        <span v-for="d in [25, 26, 27, 28, 29, 30]" :key="`s${d}`"
          class="text-[11px] text-app-text-secondary/40 py-1">{{ d }}</span>
        <!-- Oct 1 -->
        <span class="text-[11px] text-app-text-primary py-1 font-medium">1</span>
        <!-- Oct 2–7 (Sat/Sun = faded) -->
        <span v-for="d in [2, 3, 4, 5, 6]" :key="d" class="text-[11px] text-app-text-primary py-1 font-medium">{{ d
          }}</span>
        <span class="text-[11px] text-app-text-secondary/40 py-1">7</span>
        <!-- Oct 8–14 -->
        <span class="text-[11px] text-app-text-secondary/40 py-1">8</span>
        <span v-for="d in [9, 10, 11, 12, 13]" :key="d" class="text-[11px] text-app-text-primary py-1 font-medium">{{
          d }}</span>
        <span class="text-[11px] text-app-text-secondary/40 py-1">14</span>
        <!-- Oct 15–21 -->
        <span class="text-[11px] text-app-text-secondary/40 py-1">15</span>
        <span v-for="d in [16, 17, 18, 19, 20]" :key="d" class="text-[11px] text-app-text-primary py-1 font-medium">{{
          d }}</span>
        <span class="text-[11px] text-app-text-secondary/40 py-1">21</span>
        <!-- Oct 22 (Sat/faded), 23 (selected), 24 (secondary) -->
        <span class="text-[11px] text-app-text-secondary/40 py-1">22</span>
        <button
          class="text-[11px] py-0 rounded-full font-bold bg-app-primary text-white w-6 h-6 flex items-center justify-center mx-auto">
          23
        </button>
        <button
          class="text-[11px] py-0 rounded-full font-bold bg-app-surface-subtle text-app-text-primary w-6 h-6 flex items-center justify-center mx-auto">
          24
        </button>
        <span v-for="d in [25, 26, 27]" :key="d" class="text-[11px] text-app-text-primary py-1 font-medium">{{ d
          }}</span>
        <span class="text-[11px] text-app-text-secondary/40 py-1">28</span>
        <!-- Oct 29–31 -->
        <span class="text-[11px] text-app-text-secondary/40 py-1">29</span>
        <span v-for="d in [30, 31]" :key="d" class="text-[11px] text-app-text-primary py-1 font-medium">{{ d }}</span>
        <!-- Nov overflow -->
        <span v-for="d in [1, 2, 3, 4]" :key="`n${d}`"
          class="text-[11px] text-app-text-secondary/40 py-1">{{ d }}</span>
      </div>

      <!-- Quick Jump -->
      <div class="pt-1 border-t border-app-border">
        <span class="text-[10px] font-bold text-app-text-secondary uppercase tracking-wider block mb-2">Quick
          Jump</span>
        <div class="flex items-center gap-1.5">
          <button v-for="label in ['Yesterday', '2 days ago', 'This week']" :key="label"
            class="flex-1 py-1 px-1 text-[10px] font-semibold rounded-lg bg-app-surface-subtle text-app-text-secondary hover:bg-app-primary-soft hover:text-app-primary transition-colors text-center">
            {{ label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Reflections on Routine -->
    <div class="bg-app-surface border border-app-border rounded-card p-4 space-y-3">
      <div class="flex items-center gap-2">
        <Icon name="lucide:sprout" class="w-4 h-4 text-app-primary" />
        <span class="font-bold text-sm text-app-text-primary">Reflections on Routine</span>
      </div>
      <p class="text-xs text-app-text-secondary leading-relaxed">
        Looking back at past days can help spot comfortable rhythms, but remember sleep and feeding vary from day to day
        as Maya grows. There is no "perfect" score—you are doing great.
      </p>

      <!-- Feed Interval Indicator -->
      <div class="flex items-center gap-3 p-2.5 rounded-xl bg-app-surface-subtle">
        <div class="relative w-10 h-10 shrink-0">
          <svg viewBox="0 0 36 36" class="w-10 h-10 -rotate-90">
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgb(var(--color-border))" stroke-width="3" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgb(var(--color-primary))" stroke-width="3"
              stroke-dasharray="63 88" stroke-linecap="round" />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <Icon name="lucide:clock" class="w-3.5 h-3.5 text-app-primary" />
          </div>
        </div>
        <div>
          <span class="text-xs font-bold text-app-text-primary block">3–4h Feed Intervals</span>
          <span class="text-[10px] text-app-text-secondary">Healthy steady daytime rhythm</span>
        </div>
      </div>
    </div>

    <!-- Memory Photo -->
    <div class="bg-app-surface border border-app-border rounded-card overflow-hidden">
      <div class="relative">
        <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&auto=format&fit=crop&q=80"
          alt="Maya tummy time" class="w-full h-36 object-cover" />
        <span
          class="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/50 text-white backdrop-blur-sm">
          <Icon name="lucide:camera" class="w-3 h-3" />
          Oct 23 • Tummy time smile
        </span>
      </div>
      <div class="p-3 flex items-center justify-between">
        <p class="text-xs text-app-text-secondary">Maya lifted her head for 45s</p>
        <button class="text-xs font-semibold text-app-primary hover:underline flex items-center gap-1">
          Add memory
          <Icon name="lucide:arrow-right" class="w-3 h-3" />
        </button>
      </div>
    </div>

    <!-- Caregiver PDF Digest -->
    <div class="bg-app-surface border border-app-border rounded-card p-4">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-2.5">
          <div
            class="w-8 h-8 rounded-lg bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0">
            <Icon name="lucide:file-text" class="w-4 h-4" />
          </div>
          <div>
            <span class="font-bold text-xs text-app-text-primary block">Caregiver PDF Digest</span>
            <span class="text-[10px] text-app-text-secondary">Ready for pediatrician review</span>
          </div>
        </div>
        <button
          class="shrink-0 px-3 py-1.5 rounded-button border border-app-border text-xs font-semibold text-app-text-primary bg-app-surface hover:bg-app-surface-subtle transition-colors flex items-center gap-1.5">
          <Icon name="lucide:download" class="w-3.5 h-3.5" />
          Export
        </button>
      </div>
    </div>

  </aside>
</template>

<script setup lang="ts">
import type { Caregiver } from '~/types/home';

defineProps<{
  caregiver: Caregiver;
}>();
</script>