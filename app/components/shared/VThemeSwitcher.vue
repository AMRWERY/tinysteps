<template>
  <ClientOnly>
    <div>
      <button type="button"
        class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-input border border-border text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-subtle btn-press focus-ring"
        :aria-label="isDark ? 'Switch to Light theme' : 'Switch to Dark theme'" @click="toggleTheme">
        <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-3.5 h-3.5" />
        <span>{{ isDark ? 'Light' : 'Dark' }}</span>
      </button>
    </div>

    <template #fallback>
      <div class="h-[31px] w-[75px] rounded-input border border-border bg-surface-subtle/50" />
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { isDark, toggleTheme } = useAppTheme()
</script>