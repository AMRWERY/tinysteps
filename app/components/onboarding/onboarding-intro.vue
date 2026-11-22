<template>
  <div class="md:bg-app-surface-subtle md:p-10 space-y-5 md:space-y-6">
    <!-- Illustration (hidden in the no-illustration fallback) -->
    <div v-if="!hideIllustration"
      class="bg-app-surface rounded-3xl md:rounded-2xl flex items-center justify-center px-6 py-4 md:py-6 h-[210px] md:h-[240px]">
      <img src="/img/logo.png" alt="TinySteps" class="max-h-full w-auto max-w-[260px] object-contain" />
    </div>
    <div v-else class="flex items-center gap-3 md:block">
      <span class="w-14 h-14 rounded-2xl bg-app-primary-soft text-app-primary flex items-center justify-center">
        <Icon name="lucide:sprout" class="w-7 h-7" />
      </span>
    </div>

    <div class="space-y-2">
      <p class="hidden md:flex items-center gap-2 text-xs font-semibold text-app-accent">
        <span class="w-1.5 h-1.5 rounded-full bg-app-accent" /> Gentle Routine Tracking
      </p>
      <h2 class="text-3xl md:text-2xl font-bold tracking-tight text-app-text-primary leading-tight">
        Keep the little moments in one place.
      </h2>
      <p class="text-[15px] md:text-sm text-app-text-secondary leading-relaxed">
        <span class="hidden md:inline">A calm, local-first companion built for tired parents. Record feeding rhythms, sleep windows, and diaper changes in seconds—without streaks, scores, or clinical pressure.</span>
        <span class="md:hidden">TinySteps helps you quietly record feeds, sleep sessions, and diapers with one hand—no mental math or pressure.</span>
      </p>
    </div>

    <!-- Features: list on md+, tiles on phones -->
    <ul class="hidden md:block space-y-2">
      <li v-for="f in features" :key="f.title" class="flex items-center gap-3 bg-app-surface rounded-xl p-2.5">
        <span :class="['w-10 h-10 rounded-lg flex items-center justify-center shrink-0', f.tile]">
          <Icon :name="f.icon" class="w-5 h-5" />
        </span>
        <span>
          <span class="block text-sm font-bold text-app-text-primary">{{ f.title }}</span>
          <span class="block text-xs text-app-text-secondary">{{ f.text }}</span>
        </span>
      </li>
    </ul>
    <ul class="md:hidden grid grid-cols-3 gap-2.5">
      <li v-for="f in features" :key="f.short" class="bg-app-surface-subtle rounded-2xl py-3.5 px-2 text-center">
        <span :class="['mx-auto w-9 h-9 rounded-full flex items-center justify-center', f.mTile]">
          <Icon :name="f.mIcon" class="w-4 h-4" />
        </span>
        <span class="block text-sm font-bold text-app-text-primary mt-2">{{ f.short }}</span>
        <span class="block text-[11px] text-app-text-secondary">{{ f.shortText }}</span>
      </li>
    </ul>

    <p class="hidden md:flex items-start gap-2 pt-4 border-t border-app-border text-xs text-app-text-secondary">
      <Icon name="lucide:lock" class="w-4 h-4 text-app-primary shrink-0" />
      <span><strong class="text-app-text-primary">Private by Architecture</strong> • Stored directly on your device</span>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ hideIllustration?: boolean }>()

const features = [
  { icon: 'lucide:milk', tile: routineTypeMeta.feed.tile, mIcon: 'lucide:droplet', mTile: 'bg-app-primary-soft text-app-primary', title: 'Feeding without math', text: 'Quick ml/oz bottles, nursing timers, solids notes', short: 'Feeds', shortText: 'Breast & bottle' },
  { icon: 'lucide:moon', tile: routineTypeMeta.sleep.tile, mIcon: 'lucide:moon', mTile: 'bg-app-accent-soft text-app-accent', title: 'Gentle awake windows', text: '1-tap nap starts and estimated tired-cue cues', short: 'Sleep', shortText: '1-tap timer' },
  { icon: 'lucide:droplet', tile: routineTypeMeta.diaper.tile, mIcon: 'lucide:hand-helping', mTile: 'bg-transparent text-app-text-secondary', title: 'Zero-friction changes', text: 'Wet, dirty, or both with optional wellness notes', short: 'Diaper', shortText: 'Wet or dirty' },
]
</script>
