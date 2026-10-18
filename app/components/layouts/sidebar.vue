<template>
  <aside :class="[
    'hidden md:flex flex-col border-r border-app-border bg-app-surface transition-all duration-200 select-none shrink-0 h-screen sticky top-0 z-30',
    isCollapsed ? 'w-[78px] px-2' : 'w-[260px] p-4'
  ]">
    <!-- Brand Header -->
    <div class="flex items-center gap-3 py-3 px-2 mb-6">
      <div
        class="w-10 h-10 rounded-xl bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0">
        <Icon name="lucide:map-pin" class="w-5 h-5" />
      </div>
      <div v-if="!isCollapsed" class="overflow-hidden">
        <h1 class="font-bold text-base tracking-tight text-app-text-primary leading-tight">TinySteps</h1>
        <p class="text-xs text-app-text-secondary truncate">Little routines. Less mental ...</p>
      </div>
    </div>

    <!-- Navigation links -->
    <nav class="flex-1 space-y-1">
      <button
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-semibold bg-app-primary-soft text-app-primary transition-colors"
        :title="isCollapsed ? 'Dashboard' : undefined">
        <Icon name="lucide:layout-grid" class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed">Dashboard</span>
      </button>

      <button
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium text-app-text-secondary hover:bg-app-surface-subtle transition-colors"
        :title="isCollapsed ? 'History' : undefined">
        <Icon name="lucide:history" class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed">History</span>
      </button>

      <button
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium text-app-text-secondary hover:bg-app-surface-subtle transition-colors"
        :title="isCollapsed ? 'Baby Profile' : undefined">
        <Icon name="lucide:smile" class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed">Baby Profile</span>
      </button>

      <button
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium text-app-text-secondary hover:bg-app-surface-subtle transition-colors"
        :title="isCollapsed ? 'Settings' : undefined">
        <Icon name="lucide:sliders-horizontal" class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed">Settings</span>
      </button>
    </nav>

    <!-- Bottom baby profile & Theme Switcher -->
    <div class="pt-4 border-t border-app-border space-y-3">
      <div
        class="flex items-center justify-between p-2 rounded-xl bg-app-surface-subtle cursor-pointer hover:opacity-90">
        <div class="flex items-center gap-2.5 min-w-0">
          <img src="https://images.unsplash.com/photo-1544126592-807ade215a0b?w=80&auto=format&fit=crop&q=80"
            alt="Maya" class="w-8 h-8 rounded-full object-cover shrink-0" />
          <div v-if="!isCollapsed" class="text-left truncate">
            <p class="text-xs font-semibold text-app-text-primary leading-none">Maya (3 mo)</p>
            <span class="text-[10px] text-app-text-secondary">Active routine</span>
          </div>
        </div>
        <Icon v-if="!isCollapsed" name="lucide:chevrons-up-down" class="w-4 h-4 text-app-text-secondary shrink-0" />
      </div>

      <!-- Theme Controls -->
      <div class="flex items-center justify-around bg-app-surface-subtle p-1 rounded-xl">
        <button @click="emit('setTheme', 'light')"
          :class="['p-1.5 rounded-lg transition-colors', currentTheme === 'light' ? 'bg-app-surface shadow-sm text-app-primary' : 'text-app-text-secondary hover:text-app-text-primary']"
          title="Light theme">
          <Icon name="lucide:sun" class="w-4 h-4" />
        </button>
        <button @click="emit('setTheme', 'dark')"
          :class="['p-1.5 rounded-lg transition-colors', currentTheme === 'dark' ? 'bg-app-surface shadow-sm text-app-primary' : 'text-app-text-secondary hover:text-app-text-primary']"
          title="Dark theme">
          <Icon name="lucide:moon" class="w-4 h-4" />
        </button>
        <button @click="emit('setTheme', 'system')"
          :class="['p-1.5 rounded-lg transition-colors', currentTheme === 'system' ? 'bg-app-surface shadow-sm text-app-primary' : 'text-app-text-secondary hover:text-app-text-primary']"
          title="System default">
          <Icon name="lucide:laptop" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { ThemeMode } from '~/types/home'

defineProps<{
  isCollapsed: boolean
  currentTheme: ThemeMode
}>()

const emit = defineEmits<{
  (e: 'update:isCollapsed', value: boolean): void
  (e: 'setTheme', mode: ThemeMode): void
}>()
</script>