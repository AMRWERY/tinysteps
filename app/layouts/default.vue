<template>
  <div
    class="min-h-screen bg-app-bg text-app-text-primary antialiased selection:bg-primary-soft selection:text-primary transition-colors duration-180">
    <!-- Desktop Layout Shell (hidden on mobile, matches Screenshot 1) -->
    <div class="hidden md:flex min-h-screen">
      <!-- Sidebar Component (from components/layouts/sidebar.vue) -->
      <Sidebar :is-collapsed="isCollapsed" :is-mobile-open="isDrawerOpen" :current-theme="currentTheme"
        @set-theme="setTheme" @update:is-collapsed="isCollapsed = $event" @logout="handleLogout" />

      <!-- Backdrop for the drawer on medium screens -->
      <Transition name="fade">
        <div v-if="isDrawerOpen" class="fixed inset-0 z-30 bg-black/40 lg:hidden" @click="isDrawerOpen = false" />
      </Transition>

      <!-- Main Desktop Area -->
      <div class="flex-1 min-w-0 flex flex-col min-h-screen">
        <!-- Desktop Header Bar (always includes Theme & Locale toggles) -->
        <header
          class="sticky top-0 z-20 bg-app-bg/95 backdrop-blur-sm border-b border-app-border px-6 py-3.5 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <!-- Medium screens: open/close the drawer -->
            <button type="button"
              class="lg:hidden p-2 -ms-2 rounded-lg text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle transition-colors"
              title="Open Sidebar" :aria-expanded="isDrawerOpen" @click="isDrawerOpen = !isDrawerOpen">
              <Icon name="lucide:panel-left" class="w-5 h-5" />
            </button>
            <!-- Large screens: collapse/expand the sidebar -->
            <button type="button"
              class="hidden lg:inline-flex p-2 -ms-2 rounded-lg text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle transition-colors"
              title="Toggle Sidebar" @click="isCollapsed = !isCollapsed">
              <Icon name="lucide:panel-left" class="w-5 h-5" />
            </button>
            <span class="text-sm font-semibold text-app-text-secondary">
              Today, {{ todayLabel }} • Week {{ babyWeek }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <!-- Sleep Logging Active status pill -->
            <div
              class="flex items-center gap-2 px-3 py-1 rounded-full bg-app-surface-subtle text-app-primary text-xs font-semibold border border-app-border">
              <span class="w-2 h-2 rounded-full bg-app-success animate-pulse" />
              <span>Sleep logging active</span>
            </div>

            <!-- Toggle Locales Button -->
            <LazyVLocaleSwitcher />

            <!-- Toggle Theme Button (Displays Dark if Light selected, and Light if Dark selected) -->
            <LazyVThemeSwitcher />

            <!-- Baby profile avatar -->
            <img src="/img/img-01.png" alt="Maya" class="w-8 h-8 rounded-full object-cover border border-app-border" />
          </div>
        </header>

        <!-- Main Desktop Content Slot -->
        <main class="flex-1 p-6 flex gap-6 items-start justify-center">
          <slot :is-collapsed="isCollapsed" />
        </main>
      </div>
    </div>

    <!-- Mobile View Component (from components/home/mobile-refined-view.vue) -->
    <mobile-refined-view
      :state="mobileState"
      :timer-string="formattedTimer"
      :timeline="[]"
      :current-theme="currentTheme"
      @update:state="mobileState = $event"
      @set-theme="setTheme" />
  </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n()
const { currentTheme, setTheme } = useAppTheme()

// Today's date, formatted for the active locale (e.g. "22 Nov")
const today = new Date()
const todayLabel = computed(() =>
  today.toLocaleDateString(locale.value, { day: 'numeric', month: 'short' }),
)

// TODO: derive from the baby's birth date once the profile data is available
const babyWeek = ref(14)

const isCollapsed = ref(false)
const isDrawerOpen = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { isDrawerOpen.value = false })
const mobileState = ref<'active-sleep' | 'baby-awake' | 'first-run' | 'loading'>('active-sleep')

// Simple elapsed timer for the mobile state preview
const elapsedSeconds = ref(48 * 60 + 19)
onMounted(() => {
  setInterval(() => { if (mobileState.value === 'active-sleep') elapsedSeconds.value++ }, 1000)
})
const formattedTimer = computed(() => {
  const h = Math.floor(elapsedSeconds.value / 3600)
  const m = Math.floor((elapsedSeconds.value % 3600) / 60)
  const s = elapsedSeconds.value % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

const handleLogout = () => {
  console.log('Logging out...')
}

const currentLocale = computed(() => {
  return (locales.value as Array<{ code: string; dir?: string }>).find(l => l.code === locale.value)
})

const dir = computed(() => {
  return currentLocale.value?.dir || (locale.value === 'ar' ? 'rtl' : 'ltr')
})

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
    dir: dir,
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>