<template>
  <div class="bg-app-surface-subtle rounded-2xl md:rounded-3xl px-3 py-3 md:px-6 md:py-3 space-y-3 md:space-y-0 md:flex md:items-center md:gap-4 shadow-xs md:shadow-none">
    <div class="flex items-center justify-between gap-3 md:justify-start shrink-0">
      <p class="flex items-center gap-2.5 text-sm font-semibold tracking-wider text-app-text-primary">
        <span class="w-2.5 h-2.5 rounded-full bg-app-primary" />
        <span class="hidden md:inline">SCENARIO SANDBOX <span class="font-normal tracking-normal text-app-text-secondary">• Test edge states &amp; night mode</span></span>
        <span class="md:hidden">DEMO SANDBOX</span>
      </p>
      <ClientOnly>
        <button type="button" class="md:hidden flex items-center gap-2 px-3.5 py-2 rounded-full bg-app-surface text-sm font-medium text-app-text-primary shadow-xs focus-ring" @click="toggleTheme">
          <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-4 h-4" /> {{ isDark ? 'Daylight' : 'Nursery Dark' }}
        </button>
        <template #fallback><span class="md:hidden w-28 h-9" /></template>
      </ClientOnly>
    </div>

    <div class="flex items-center gap-1.5 md:gap-2 overflow-x-auto no-scrollbar md:ms-auto" role="group" aria-label="Scenario">
      <button v-for="o in options" :key="o.value" type="button" :aria-pressed="modelValue === o.value"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-ring flex-1 md:flex-none',
          o.desktopOnly ? 'hidden md:block' : '',
          modelValue === o.value ? 'bg-app-primary text-white shadow-xs' : 'text-app-text-secondary md:bg-app-surface hover:text-app-text-primary',
        ]" @click="emit('update:modelValue', o.value)">
        <span class="hidden md:inline">{{ o.label }}</span><span class="md:hidden">{{ o.short || o.label }}</span>
      </button>

      <span class="hidden md:block w-px h-6 bg-app-border mx-1" aria-hidden="true" />
      <ClientOnly>
        <button type="button" class="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-app-surface text-sm font-medium text-app-text-primary hover:bg-app-primary-soft transition-colors focus-ring whitespace-nowrap" @click="toggleTheme">
          <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-4 h-4" /> {{ isDark ? 'Daylight Mode' : 'Nursery Night Mode' }}
        </button>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
defineProps<{
  modelValue: T
  options: { value: T; label: string; short?: string; desktopOnly?: boolean }[]
}>()
const emit = defineEmits<{ (e: 'update:modelValue', v: T): void }>()

const { isDark, toggleTheme } = useAppTheme()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
