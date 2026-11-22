import type { ThemePreference } from '~/types/composables/useAppTheme'
import type { ThemeMode } from '~/types/home'

let themeTransitionTimer: number | undefined

// Track the last pointer position so the theme reveal can originate from the clicked control.
const lastPointer = { x: 0, y: 0 }
let isPointerTracked = false
const trackPointer = () => {
  if (!import.meta.client || isPointerTracked) return
  isPointerTracked = true
  lastPointer.x = window.innerWidth / 2
  window.addEventListener('pointerdown', (e) => {
    lastPointer.x = e.clientX
    lastPointer.y = e.clientY
  }, { capture: true, passive: true })
}

export const useAppTheme = () => {
  trackPointer()
  const colorMode = useColorMode({
    attribute: 'class',
    modes: {
      light: '',
      dark: 'dark',
    },
    storageKey: 'tinysteps-theme',
  })

  const isDark = computed(() => colorMode.value === 'dark')

  const currentTheme = computed<ThemeMode>(() => {
    return isDark.value ? 'dark' : 'light'
  })

  // Briefly enable colour transitions on every element so the theme fades
  // instead of snapping (see `.theme-transition` in main.css).
  const animateThemeChange = () => {
    if (!import.meta.client) return
    const root = document.documentElement
    root.classList.add('theme-transition')
    window.clearTimeout(themeTransitionTimer)
    themeTransitionTimer = window.setTimeout(() => root.classList.remove('theme-transition'), 400)
  }

  const applyTheme = (pref: ThemePreference | ThemeMode) => {
    colorMode.preference = pref
    colorMode.value = pref
  }

  const setTheme = (pref: ThemePreference | ThemeMode) => {
    if (!import.meta.client || pref === colorMode.value) {
      applyTheme(pref)
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      applyTheme(pref)
      return
    }

    // Fallback for browsers without View Transitions: simple colour fade.
    if (!document.startViewTransition) {
      animateThemeChange()
      applyTheme(pref)
      return
    }

    // Circular reveal expanding from the last click/tap position.
    const { x, y } = lastPointer
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(async () => {
      applyTheme(pref)
      document.documentElement.classList.toggle('dark', pref === 'dark')
      await nextTick()
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    }).catch(() => { /* transition skipped — theme is already applied */ })
  }

  const toggleTheme = () => {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  return {
    theme: colorMode,
    currentTheme,
    isDark,
    setTheme,
    toggleTheme,
  }
}
