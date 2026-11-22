<template>
  <section class="bg-app-surface border border-app-border rounded-card p-5 sm:p-6 space-y-4 shadow-xs">
    <div class="flex items-start justify-between gap-3">
      <div>
        <h2 class="flex items-center gap-2 text-lg font-bold text-app-text-primary">
          <Icon name="lucide:palette" class="w-5 h-5" /> Appearance <span class="hidden sm:inline">&amp; Comfort</span>
        </h2>
        <p class="text-sm text-app-text-secondary mt-1">
          <span class="hidden sm:inline">Engineered with warm contrast to reduce blue light during midnight awakenings.</span>
          <span class="sm:hidden">TinySteps adapts to bedtime or daylight without eye strain.</span>
        </p>
      </div>
      <span class="hidden sm:inline px-3 py-1 rounded-full bg-app-surface-subtle text-[11px] font-semibold text-app-text-secondary shrink-0">
        OLED Friendly
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3 sm:gap-4" role="radiogroup" aria-label="Theme">
      <button v-for="t in themes" :key="t.value" type="button" role="radio" :aria-checked="isActive(t.value)"
        :class="[
          'relative text-start rounded-2xl border-2 p-3 sm:p-3.5 transition-colors focus-ring',
          isActive(t.value) ? 'border-app-primary bg-app-primary-soft/40' : 'border-app-border hover:border-app-primary/40',
        ]" @click="emit('setTheme', t.value)">
        <!-- Preview swatch (sm+) -->
        <div :class="['hidden sm:block rounded-xl h-[84px] p-3 space-y-2 border border-app-border/60', t.swatch]">
          <span class="block h-1.5 w-8 rounded-full" :class="t.bar" />
          <span class="block h-1 w-14 rounded-full" :class="t.bar" />
          <span class="block h-1 w-10 rounded-full" :class="t.bar" />
        </div>
        <!-- Icon tile (phones) -->
        <div class="sm:hidden flex flex-col items-center gap-2 py-3">
          <Icon :name="t.icon" class="w-5 h-5 text-app-text-primary" />
        </div>

        <div class="mt-0 sm:mt-3 flex items-center justify-between gap-2">
          <p class="text-sm font-bold text-app-text-primary max-sm:w-full max-sm:text-center">
            <span class="hidden sm:inline">{{ t.title }}</span><span class="sm:hidden">{{ t.short }}</span>
          </p>
          <Icon v-if="isActive(t.value)" name="lucide:check-circle-2" class="hidden sm:block w-5 h-5 text-app-primary" />
        </div>
        <p class="hidden sm:block text-xs text-app-text-secondary mt-1 leading-snug">{{ t.text }}</p>
        <span v-if="isActive(t.value)" class="sm:hidden absolute top-2 end-2 w-2 h-2 rounded-full bg-app-success" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeMode } from '~/types/home'

const props = defineProps<{ currentTheme?: ThemeMode }>()
const emit = defineEmits<{ (e: 'setTheme', mode: ThemeMode): void }>()

// Saved theme is only known on the client — avoid a hydration mismatch.
const isMounted = ref(false)
onMounted(() => { isMounted.value = true })
const isActive = (m: ThemeMode) => isMounted.value && props.currentTheme === m

const themes: { value: ThemeMode; title: string; short: string; icon: string; text: string; swatch: string; bar: string }[] = [
  {
    value: 'light', title: 'Warm Light', short: 'Light', icon: 'lucide:sun',
    text: 'Soft parchment background for gentle daylight clarity.',
    swatch: 'bg-[#F7F6F1]', bar: 'bg-[#69746C]/40',
  },
  {
    value: 'dark', title: 'Deep Sage Dark', short: 'Dark', icon: 'lucide:moon',
    text: 'Charcoal-sage tones for 3 AM low-light feedings.',
    swatch: 'bg-[#141916]', bar: 'bg-[#B0BBB1]/40',
  },
]
</script>
