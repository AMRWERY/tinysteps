<template>
  <div
    class="min-h-screen bg-app-bg text-app-text-primary antialiased selection:bg-primary-soft selection:text-primary transition-colors duration-180"
  >
    <!-- Phone shell: top bar (bottom nav is rendered at the end) -->
    <mobile-header />

    <div class="md:flex min-h-screen">
      <!-- Sidebar (md+; drawer on md, in-flow on lg+) -->
      <Sidebar
        :is-collapsed="isCollapsed"
        :is-mobile-open="isDrawerOpen"
        :current-theme="currentTheme"
        @set-theme="setTheme"
        @update:is-collapsed="isCollapsed = $event"
        @logout="handleLogout"
      />

      <!-- Backdrop for the drawer on medium screens -->
      <Transition name="fade">
        <div
          v-if="isDrawerOpen"
          class="fixed inset-0 z-30 bg-black/40 lg:hidden"
          @click="isDrawerOpen = false"
        />
      </Transition>

      <!-- Main area -->
      <div class="flex-1 min-w-0 flex flex-col min-h-screen">
        <!-- Header bar (md+). Theme & Locale toggles show here on medium screens only -->
        <header
          class="hidden md:flex sticky top-0 z-20 bg-app-bg/95 backdrop-blur-sm border-b border-app-border px-6 py-3.5 items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <!-- Medium screens: open/close the drawer -->
            <button
              type="button"
              class="lg:hidden p-2 -ms-2 rounded-lg text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle transition-colors"
              title="Open Sidebar"
              :aria-expanded="isDrawerOpen"
              @click="isDrawerOpen = !isDrawerOpen"
            >
              <Icon name="lucide:panel-left" class="w-5 h-5" />
            </button>
            <!-- Large screens: collapse/expand the sidebar -->
            <button
              type="button"
              class="hidden lg:inline-flex p-2 -ms-2 rounded-lg text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle transition-colors"
              title="Toggle Sidebar"
              @click="isCollapsed = !isCollapsed"
            >
              <Icon name="lucide:panel-left" class="w-5 h-5" />
            </button>
            <span class="text-sm font-semibold text-app-text-secondary">
              Today, {{ todayLabel }} • Week {{ baby.week }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <!-- Sleep Logging Active status pill -->
            <div
              class="flex items-center gap-2 px-3 py-1 rounded-full bg-app-surface-subtle text-app-primary text-xs font-semibold border border-app-border"
            >
              <span class="w-2 h-2 rounded-full bg-app-success animate-pulse" />
              <span>Sleep logging active</span>
            </div>

            <!-- Medium screens only: the sidebar is a closed drawer here, so the controls and
                 baby avatar live in the header. On lg+ they live in the sidebar instead. -->
            <div class="flex items-center gap-3 lg:hidden">
              <LazyVLocaleSwitcher />
              <LazyVThemeSwitcher />
              <img
                :src="baby.avatarUrl"
                :alt="baby.name"
                class="w-8 h-8 rounded-full object-cover border border-app-border"
              />
            </div>
          </div>
        </header>

        <!-- Page content: pages own their padding on phones -->
        <main class="flex-1 pb-24 md:pb-6 md:p-6 flex gap-6 items-start justify-center">
          <slot :is-collapsed="isCollapsed" />
        </main>
      </div>
    </div>

    <mobile-bottom-nav />
  </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n()
const { currentTheme, setTheme } = useAppTheme()
const { baby } = useBabyProfile()

// Today's date, formatted for the active locale (e.g. "22 Nov")
const today = new Date()
const todayLabel = computed(() =>
  today.toLocaleDateString(locale.value, { day: 'numeric', month: 'short' }),
)

const isCollapsed = ref(false)
const isDrawerOpen = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { isDrawerOpen.value = false })

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
