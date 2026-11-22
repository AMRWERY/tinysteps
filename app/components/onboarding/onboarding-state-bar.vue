<template>
  <div class="bg-app-surface-subtle md:border-b md:border-app-border px-4 py-2.5 md:px-6 md:py-2 space-y-2 md:space-y-0 md:flex md:items-center md:gap-4">
    <!-- Label row (+ theme button on phones) -->
    <div class="flex items-center justify-between md:justify-start gap-2 shrink-0">
      <span class="flex items-center gap-2 text-sm text-app-text-secondary md:text-app-text-primary md:font-bold">
        <Icon name="lucide:sliders-horizontal" class="w-4 h-4" />
        <span class="hidden md:inline">Setup State Demo:</span>
        <span class="md:hidden">Interactive States</span>
      </span>
      <ClientOnly>
        <button type="button" class="md:hidden flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-app-surface text-sm font-medium text-app-text-primary shadow-xs focus-ring"
          aria-label="Toggle theme" @click="toggleTheme">
          <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-4 h-4" /> Theme
        </button>
        <template #fallback>
          <span class="md:hidden w-[88px] h-8" />
        </template>
      </ClientOnly>
    </div>

    <!-- Pills -->
    <div class="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible py-0.5">
      <button v-for="o in options" :key="o.value" type="button" :aria-pressed="modelValue === o.value" :class="[
        'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus-ring',
        modelValue === o.value
          ? 'bg-app-primary text-white shadow-xs'
          : 'bg-app-surface text-app-text-secondary hover:text-app-text-primary',
      ]" @click="emit('update:modelValue', o.value)">
        <span class="hidden md:inline">{{ o.label }}</span>
        <span class="md:hidden">{{ o.short }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
defineProps<{ modelValue: T; options: { value: T; label: string; short: string }[] }>()
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
