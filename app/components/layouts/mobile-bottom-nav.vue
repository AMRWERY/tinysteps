<template>
  <nav
    class="md:hidden fixed bottom-0 inset-x-0 bg-app-surface/95 backdrop-blur-md border-t border-app-border flex items-center justify-around py-2.5 px-4 z-30">
    <nuxt-link-locale v-for="item in items" :key="item.to" :to="item.to" :exact="item.to === '/'"
      class="flex flex-col items-center gap-0.5 min-w-[56px] min-h-[44px] justify-center text-app-text-secondary font-medium transition-colors"
      active-class="!text-app-primary font-bold">
      <Icon :name="item.icon" class="w-5 h-5" />
      <span class="text-[10px]">{{ item.label }}</span>
    </nuxt-link-locale>
  </nav>
</template>

<script setup lang="ts">
const items = [
  { to: '/', label: 'Home', icon: 'lucide:layout-grid' },
  { to: '/timeline', label: 'Timeline', icon: 'lucide:git-commit-vertical' },
  { to: '/history', label: 'History', icon: 'lucide:calendar' },
  { to: '/baby-profile', label: 'Baby', icon: 'lucide:smile' },
  { to: '/settings', label: 'Settings', icon: 'lucide:settings' },
]
</script>
