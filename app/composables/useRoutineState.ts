import type { AppState, DayTotals } from '~/types/home'

export function useRoutineState() {
  const currentState = ref<AppState>('active-sleep')
  const elapsedSeconds = ref(48 * 60 + 19)
  const isPaused = ref(false)

  // Live timer — client only, cleaned up with the component
  let timer: ReturnType<typeof setInterval> | undefined
  onMounted(() => {
    timer = setInterval(() => {
      if (currentState.value === 'active-sleep' && !isPaused.value) elapsedSeconds.value++
    }, 1000)
  })
  onBeforeUnmount(() => clearInterval(timer))

  const pad = (n: number) => String(n).padStart(2, '0')

  const formattedTimer = computed(() => {
    const h = Math.floor(elapsedSeconds.value / 3600)
    const m = Math.floor((elapsedSeconds.value % 3600) / 60)
    return `${pad(h)}:${pad(m)}:${pad(elapsedSeconds.value % 60)}`
  })

  const elapsedMinutes = computed(() => Math.floor(elapsedSeconds.value / 60))

  const wakeAndSave = () => {
    currentState.value = 'baby-awake'
    isPaused.value = false
  }

  const startNap = () => {
    elapsedSeconds.value = 0
    isPaused.value = false
    currentState.value = 'active-sleep'
  }

  const timelineEntries = useTimelineEntries()

  const totals: DayTotals = {
    feed: { value: '420 ml', detail: '4 feeds logged', note: '+22m nurse' },
    rest: { value: '4h 18m', detail: '2 naps + active', note: 'Day sleep' },
    diapers: { value: '4', unit: 'changes', detail: '3 wet · 1 dirty', note: 'Hydration indicator' },
  }

  return {
    currentState, elapsedSeconds, elapsedMinutes, isPaused, formattedTimer,
    wakeAndSave, startNap, timelineEntries, totals,
  }
}
