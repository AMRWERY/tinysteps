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
        :title="isCollapsed ? 'Home' : undefined">
        <Icon name="lucide:layout-grid" class="w-5 h-5 shrink-0" />
        <span v-if="!isCollapsed">Home</span>
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

    <!-- Baby profile card -->
    <div class="pb-3">
      <nuxt-link-locale to="/baby-profile" :title="isCollapsed ? 'Maya (3 mo)' : undefined" :class="[
        'flex items-center gap-3 rounded-xl bg-app-surface-subtle border border-app-border p-2.5 hover:border-app-primary/40 transition-colors focus-ring',
        isCollapsed ? 'justify-center' : '',
      ]">
        <img src="/img/baby-img-01.png" alt="Maya" class="w-9 h-9 rounded-full object-cover shrink-0 border border-app-border" />
        <template v-if="!isCollapsed">
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-app-text-primary leading-tight truncate">Maya (3 mo)</p>
            <p class="text-xs text-app-text-secondary truncate">Active routine</p>
          </div>
          <Icon name="lucide:chevrons-up-down" class="w-4 h-4 text-app-text-secondary shrink-0" />
        </template>
      </nuxt-link-locale>
    </div>

    <!-- Theme (light/dark) + locale toggles -->
    <!-- Only on lg+: below that the sidebar is a closed drawer and the header hosts these controls -->
    <div class="hidden lg:block pb-4">
      <div :class="[
        'rounded-xl bg-app-surface-subtle border border-app-border p-1 gap-1 transition-all duration-200',
        isCollapsed ? 'flex flex-col' : 'flex items-center',
      ]">
        <!-- Theme: segmented control with a sliding indicator -->
        <div :class="['relative grid flex-1 self-stretch', isCollapsed ? 'grid-rows-2' : 'grid-cols-2']">
          <span aria-hidden="true" :class="[
            'absolute rounded-lg bg-app-surface shadow-sm transition-all duration-300 ease-out',
            isMounted ? 'opacity-100' : 'opacity-0',
            isCollapsed
              ? ['inset-x-0 top-0 h-1/2', currentTheme === 'dark' ? 'translate-y-full' : '']
              : ['inset-y-0 start-0 w-1/2', currentTheme === 'dark' ? 'translate-x-full rtl:-translate-x-full' : ''],
          ]" />
          <button v-for="mode in themeModes" :key="mode.value" type="button" :title="mode.label"
            :aria-label="mode.label" :aria-pressed="isThemeActive(mode.value)" :class="[
              'relative z-10 flex items-center justify-center py-2 rounded-lg transition-colors duration-300 focus-ring',
              isThemeActive(mode.value)
                ? 'text-app-primary'
                : 'text-app-text-secondary hover:text-app-text-primary',
            ]" @click="emit('setTheme', mode.value)">
            <Icon :name="mode.icon" :class="[
              'w-4 h-4 transition-transform duration-300',
              isThemeActive(mode.value) ? 'scale-110 rotate-0' : 'scale-90 -rotate-45',
            ]" />
          </button>
        </div>

        <!-- Locale -->
        <button type="button" :title="locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'"
          :aria-label="locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'"
          :class="[
            'flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface transition-colors focus-ring',
            isCollapsed ? 'w-full' : 'px-3',
          ]" @click="handleLocaleClick">
          <Icon name="lucide:languages" class="w-4 h-4 transition-transform duration-300"
            :style="{ transform: `rotate(${localeSpin * 180}deg)` }" />
          <Transition v-if="!isCollapsed" name="swap" mode="out-in">
            <span :key="locale">{{ locale === 'ar' ? 'EN' : 'عربي' }}</span>
          </Transition>
        </button>
      </div>
    </div>

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

const props = defineProps<{
  isCollapsed: boolean
  isMobileOpen?: boolean
  currentTheme?: ThemeMode
}>()

const { locale, toggleLocale } = useAppLocale()

const localeSpin = ref(0)
const handleLocaleClick = () => {
  localeSpin.value++
  toggleLocale()
}

// The server can't know the saved theme, so only highlight the active mode once
// mounted on the client — otherwise the server HTML and first client render differ.
const isMounted = ref(false)
onMounted(() => { isMounted.value = true })
const isThemeActive = (mode: ThemeMode) => isMounted.value && props.currentTheme === mode

const themeModes: { value: ThemeMode; label: string; icon: string }[] = [
  { value: 'light', label: 'Light theme', icon: 'lucide:sun' },
  { value: 'dark', label: 'Dark theme', icon: 'lucide:moon' },
]

// Suppress transitions while the locale (and so text direction) changes,
// otherwise the drawer visibly slides between its LTR/RTL closed positions.
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