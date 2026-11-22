<template>
  <aside :class="[
    'hidden md:flex flex-col border-e border-app-border bg-app-surface transition-all duration-200 select-none shrink-0 h-screen z-40',
    // md: off-canvas drawer opened via button; lg+: in-flow sticky sidebar
    'fixed top-0 start-0 lg:sticky',
    isSwitchingLocale ? '!transition-none' : '',
    isMobileOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full lg:translate-x-0 lg:rtl:translate-x-0',
    isCollapsed ? 'w-[260px] p-4 lg:w-[78px] lg:px-2' : 'w-[260px] p-4'
  ]">
    <!-- Brand Header -->
    <div class="flex items-center gap-3 py-3 px-2 mb-6">
      <div class="w-10 h-10 rounded-xl bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0">
         <img src="/img/logo.png" alt="logo" class="w-auto h-7">
      </div>
      <div v-if="!isCollapsed" class="overflow-hidden">
        <h1 class="font-bold text-base tracking-tight text-app-text-primary leading-tight">TinySteps</h1>
        <p class="text-xs text-app-text-secondary truncate">Little routines. Less mental ...</p>
      </div>
    </div>

    <!-- Navigation links -->
    <nav class="flex-1 space-y-1">
      <nuxt-link-locale to="/" :class="[
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium transition-colors',
        'text-app-text-secondary hover:bg-app-surface-subtle hover:text-app-text-primary',
      ]" active-class="bg-app-primary-soft !text-app-primary font-semibold" exact
        :title="isCollapsed ? 'Dashboard' : undefined">
        <Icon name="lucide:layout-grid" class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed">Dashboard</span>
      </nuxt-link-locale>

      <nuxt-link-locale to="/history" :class="[
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium transition-colors',
        'text-app-text-secondary hover:bg-app-surface-subtle hover:text-app-text-primary',
      ]" active-class="bg-app-primary-soft !text-app-primary font-semibold"
        :title="isCollapsed ? 'History' : undefined">
        <Icon name="lucide:history" class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed">History</span>
      </nuxt-link-locale>

      <nuxt-link-locale to="/baby-profile" :class="[
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium transition-colors',
        'text-app-text-secondary hover:bg-app-surface-subtle hover:text-app-text-primary',
      ]" active-class="bg-app-primary-soft !text-app-primary font-semibold"
        :title="isCollapsed ? 'Baby Profile' : undefined">
        <Icon name="lucide:smile" class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed">Baby Profile</span>
      </nuxt-link-locale>

      <nuxt-link-locale to="/settings" :class="[
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium transition-colors',
        'text-app-text-secondary hover:bg-app-surface-subtle hover:text-app-text-primary',
      ]" active-class="bg-app-primary-soft !text-app-primary font-semibold"
        :title="isCollapsed ? 'Settings' : undefined">
        <Icon name="lucide:sliders-horizontal" class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed">Settings</span>
      </nuxt-link-locale>
    </nav>

    <!-- Bottom Logout Action (stays as button — it's an action, not a route) -->
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
  isMobileOpen?: boolean
  currentTheme?: ThemeMode
}>()

// Suppress transitions while the locale (and so text direction) changes,
// otherwise the drawer visibly slides between its LTR/RTL closed positions.
const { locale } = useI18n()
const isSwitchingLocale = ref(false)
let switchTimer: ReturnType<typeof setTimeout> | undefined
watch(locale, () => {
  isSwitchingLocale.value = true
  clearTimeout(switchTimer)
  switchTimer = setTimeout(() => { isSwitchingLocale.value = false }, 300)
}, { flush: 'sync' })
onBeforeUnmount(() => clearTimeout(switchTimer))

const emit = defineEmits<{
  (e: 'update:isCollapsed', value: boolean): void
  (e: 'setTheme', mode: ThemeMode): void
  (e: 'logout'): void
}>()
</script>