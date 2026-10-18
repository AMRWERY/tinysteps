import type { ThemePreference } from '~/types/composables/useAppTheme'
import type { ThemeMode } from '~/types/home'

export const useAppTheme = () => {
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

  const setTheme = (pref: ThemePreference | ThemeMode) => {
    colorMode.preference = pref
    colorMode.value = pref
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
