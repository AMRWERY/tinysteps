import type { DayTotals } from '~/types/home'

/** Home page data: which preview state is showing, today's timeline and totals. */
export function useRoutineState() {
  const sleep = useSleepSession()
  const timelineEntries = useTimelineEntries()

  const totals: DayTotals = {
    feed: { value: '420 ml', detail: '4 feeds logged', note: '+22m nurse' },
    rest: { value: '4h 18m', detail: '2 naps + active', note: 'Day sleep' },
    diapers: { value: '4', unit: 'changes', detail: '3 wet · 1 dirty', note: 'Hydration indicator' },
  }

  return {
    currentState: sleep.homeState,
    elapsedMinutes: sleep.elapsedMinutes,
    isPaused: sleep.isPaused,
    formattedTimer: sleep.formattedTimer,
    togglePause: sleep.togglePause,
    timelineEntries,
    totals,
  }
}
