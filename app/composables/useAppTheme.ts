import type { ThemePreference } from '~/types/composables/useAppTheme'

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

  const setTheme = (pref: ThemePreference) => {
    colorMode.value = pref
  }

  const toggleTheme = () => {
    colorMode.value = isDark.value ? 'light' : 'dark'
  }

  return {
    theme: colorMode,
    isDark,
    setTheme,
    toggleTheme,
  }
}
