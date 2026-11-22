let localeTransitionTimer: number | undefined

/**
 * Shared locale toggle. Adds a short-lived `locale-transition` class on <html>
 * so the page fades while text and direction change (see main.css).
 */
export const useAppLocale = () => {
  const { locale, setLocale } = useI18n()

  const toggleLocale = async () => {
    if (import.meta.client) {
      const root = document.documentElement
      root.classList.add('locale-transition')
      window.clearTimeout(localeTransitionTimer)
      localeTransitionTimer = window.setTimeout(() => root.classList.remove('locale-transition'), 450)
    }
    await setLocale(locale.value === 'ar' ? 'en' : 'ar')
  }

  return { locale, toggleLocale }
}
