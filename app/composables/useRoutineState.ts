import type { AppState, DayTotals, TimelineEntry } from '~/types/home'

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

  const timelineEntries = ref<TimelineEntry[]>([
    {
      id: '1', type: 'sleep', title: 'Nap #3 (In Progress)', badge: 'Active', badgeColor: 'primary',
      clock: 'Started 1:15 PM', metric: { value: '48m', label: 'Current' },
      description: 'Crib • Calming sound machine running', loggedBy: 'Alex', isActive: true,
    },
    {
      id: '2', type: 'diaper', title: 'Diaper Change', badge: 'Wet + Dirty', badgeColor: 'warning',
      clock: '12:40 PM', description: 'Normal mustard color, no diaper rash observed', loggedBy: 'Alex',
    },
    {
      id: '3', type: 'feed', title: 'Expressed Milk Bottle', badge: '120 ml', badgeColor: 'subtle',
      clock: '11:20 AM', metric: { value: '120 ml', label: 'Bottle' },
      description: 'Paced feeding took 18m • Burped twice with ease', loggedBy: 'Alex',
    },
    {
      id: '4', type: 'sleep', title: 'Morning Nap #1', badge: 'Bassinet', badgeColor: 'subtle',
      clock: '8:45 AM – 10:15 AM', metric: { value: '1h 30m', label: 'Rest' },
      description: 'Woke up smiling without fussing', loggedBy: 'Alex',
    },
    {
      id: '5', type: 'feed', title: 'Nursing Feed', badge: 'Left + Right', badgeColor: 'primary',
      clock: '7:15 AM', metric: { value: '22m', label: 'Nursing' },
      description: 'Left (12m), Right (10m) • Calm morning feed', loggedBy: 'Alex',
    },
  ])

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
