<template>
  <header
    class="md:hidden sticky top-0 z-20 bg-app-bg/95 backdrop-blur-sm border-b border-app-border px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-2 min-w-0">
      <div
        class="w-8 h-8 rounded-lg bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0">
        <img src="/img/logo.png" alt="logo" class="w-auto h-5">
      </div>
      <span class="font-bold text-base text-app-text-primary">TinySteps</span>
      <span
        class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-app-surface-subtle text-app-text-secondary ms-1">
        <span class="w-1.5 h-1.5 rounded-full bg-app-success" />
        {{ baby.name }}
      </span>
    </div>

    <div class="flex items-center gap-1.5 shrink-0">
      <button type="button" :aria-label="locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'"
        class="p-2 rounded-lg text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle transition-colors focus-ring"
        @click="toggleLocale">
        <Icon name="lucide:languages" class="w-5 h-5" />
      </button>

      <ClientOnly>
        <button type="button" :aria-label="isDark ? 'Switch to Light theme' : 'Switch to Dark theme'"
          class="p-2 rounded-lg text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle transition-colors focus-ring"
          @click="toggleTheme">
          <Transition name="icon-rotate" mode="out-in">
            <Icon :key="isDark ? 'sun' : 'moon'" :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-5 h-5" />
          </Transition>
        </button>
        <template #fallback>
          <div class="w-9 h-9" />
        </template>
      </ClientOnly>

      <img :src="baby.avatarUrl" :alt="baby.name"
        class="w-8 h-8 rounded-full object-cover border border-app-border ms-1" />
    </div>
  </header>
</template>

<script setup lang="ts">
const { baby } = useBabyProfile()
const { isDark, toggleTheme } = useAppTheme()
const { locale, toggleLocale } = useAppLocale()
</script>
