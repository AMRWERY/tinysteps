/**
 * Totals and "last …" facts derived from today's shared timeline, so every page that
 * summarises the day (Daily Summary, Quick Log, Timeline) stays consistent with what was logged.
 */
export const useDaySummary = () => {
  const entries = useTimelineEntries()
  const sleep = useSleepSession()

  const byType = (type: 'feed' | 'sleep' | 'diaper') => entries.value.filter(e => e.type === type)

  const feeds = computed(() => byType('feed'))
  const bottles = computed(() => feeds.value.filter(e => /bottle/i.test(e.title)))
  const nursing = computed(() => feeds.value.filter(e => /nurs/i.test(e.title)))
  const bottleMl = computed(() => bottles.value.reduce((sum, e) => sum + parseMl(e.metric?.value), 0))
  const nursingMinutes = computed(() => nursing.value.reduce((sum, e) => sum + parseMinutes(e.metric?.value), 0))

  const sleeps = computed(() => byType('sleep'))
  const activeSleep = computed(() => sleeps.value.find(e => e.isActive))
  const sleepMinutes = computed(() =>
    sleeps.value.reduce((sum, e) => sum + (e.isActive ? sleep.elapsedMinutes.value : parseMinutes(e.metric?.value)), 0),
  )

  const diapers = computed(() => byType('diaper'))
  const mixedCount = computed(() => diapers.value.filter(e => /wet\s*\+\s*dirty|both/i.test(e.badge)).length)
  const wetCount = computed(() => diapers.value.filter(e => /^wet$/i.test(e.badge.trim())).length)
  const dirtyCount = computed(() => diapers.value.filter(e => /^dirty$/i.test(e.badge.trim())).length)

  const lastFeed = computed(() => feeds.value[0])
  const lastDiaper = computed(() => diapers.value[0])
  const lastSleepEnded = computed(() => sleeps.value.find(e => !e.isActive))

  /** "Updated" label for an entry: relative if we know when, otherwise the clock text. */
  const when = (e?: { at?: number; clock: string }) => (e ? (e.at ? formatAgo(e.at, sleep.now.value) : e.clock) : '—')

  return {
    entries, feeds, bottles, nursing, bottleMl, nursingMinutes,
    sleeps, activeSleep, sleepMinutes,
    diapers, mixedCount, wetCount, dirtyCount,
    lastFeed, lastDiaper, lastSleepEnded, when,
    total: computed(() => entries.value.length),
  }
}
