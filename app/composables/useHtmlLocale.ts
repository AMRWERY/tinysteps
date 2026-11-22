/** Keeps <html lang> and <html dir> in sync with the active locale (shared by every layout). */
export const useHtmlLocale = () => {
  const { locale, locales } = useI18n()

  const dir = computed(() => {
    const current = (locales.value as Array<{ code: string; dir?: string }>).find(l => l.code === locale.value)
    return current?.dir || (locale.value === 'ar' ? 'rtl' : 'ltr')
  })

  useHead({
    htmlAttrs: {
      lang: computed(() => locale.value),
      dir,
    },
  })
}
