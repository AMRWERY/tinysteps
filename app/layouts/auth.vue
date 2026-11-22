<template>
  <div class="min-h-screen flex flex-col bg-app-bg text-app-text-primary antialiased transition-colors duration-180">
    <header class="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
      <nuxt-link-locale to="/" class="flex items-center gap-3 focus-ring rounded-xl" aria-label="TinySteps home">
        <span class="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-app-primary-soft text-app-primary flex items-center justify-center">
          <Icon name="lucide:sprout" class="w-6 h-6" />
        </span>
        <span>
          <span class="block text-xl font-bold text-app-text-primary leading-tight">TinySteps</span>
          <span class="hidden md:block text-sm text-app-text-secondary">Little routines. Less mental load.</span>
        </span>
      </nuxt-link-locale>

      <div class="flex items-center gap-3">
        <span class="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-app-surface-subtle border border-app-border text-sm text-app-text-secondary">
          <Icon name="lucide:lock" class="w-4 h-4" /> Local-first &amp; private
        </span>
        <button type="button" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          class="w-11 h-11 rounded-full bg-app-surface border border-app-border flex items-center justify-center text-app-text-primary hover:bg-app-surface-subtle transition-colors focus-ring"
          @click="toggleTheme">
          <ClientOnly>
            <Transition name="icon-rotate" mode="out-in">
              <Icon :key="isDark ? 'sun' : 'moon'" :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="w-5 h-5" />
            </Transition>
            <template #fallback><Icon name="lucide:sun" class="w-5 h-5" /></template>
          </ClientOnly>
        </button>
      </div>
    </header>

    <main class="flex-1 min-w-0">
      <slot />
    </main>

    <footer class="hidden md:flex items-center justify-between px-8 py-6 text-sm text-app-text-secondary">
      <p>© {{ year }} TinySteps. Crafted for calm parenting.</p>
      <p class="flex items-center gap-3">
        <a href="#" class="hover:text-app-text-primary transition-colors">Privacy Notice</a>
        <span aria-hidden="true">·</span>
        <a href="#" class="hover:text-app-text-primary transition-colors">Support</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isDark, toggleTheme } = useAppTheme()
const year = new Date().getFullYear()

useHtmlLocale()
</script>
