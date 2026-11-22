/** Time-of-day greeting and date labels, locale-aware. */
export const useGreeting = () => {
  const { locale } = useI18n()
  const now = new Date()

  const greeting = computed(() => {
    const h = now.getHours()
    return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  })

  /** e.g. "Tuesday, October 24" */
  const dateLabel = computed(() =>
    now.toLocaleDateString(locale.value, { weekday: 'long', month: 'long', day: 'numeric' }),
  )

  /** e.g. "TUESDAY, 24 OCTOBER" */
  const dateLabelUpper = computed(() =>
    now.toLocaleDateString(locale.value, { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase(),
  )

  return { greeting, dateLabel, dateLabelUpper }
}
