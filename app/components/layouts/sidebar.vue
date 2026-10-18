<template>
  <aside :class="[
    'hidden md:flex flex-col border-r border-app-border bg-app-surface transition-all duration-200 select-none shrink-0 h-screen sticky top-0 z-30',
    isCollapsed ? 'w-[78px] px-2' : 'w-[260px] p-4'
  ]">
    <!-- Brand Header -->
    <div class="flex items-center gap-3 py-3 px-2 mb-6">
      <div class="w-10 h-10 rounded-xl bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0">
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

    <!-- Bottom Logout Action -->
    <div class="pt-4 border-t border-app-border">
      <button type="button"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium text-app-text-secondary hover:text-danger hover:bg-danger/10 transition-colors btn-press focus-ring"
        :title="isCollapsed ? 'Logout' : undefined" @click="emit('logout')">
        <Icon name="lucide:log-out" class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { ThemeMode } from '~/types/home'

defineProps<{
  isCollapsed: boolean
  currentTheme?: ThemeMode
}>()

const emit = defineEmits<{
  (e: 'update:isCollapsed', value: boolean): void
  (e: 'setTheme', mode: ThemeMode): void
  (e: 'logout'): void
}>()
</script>