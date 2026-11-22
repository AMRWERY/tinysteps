import type { AppState } from '~/types/home'

export type SleepLocation = 'bassinet' | 'contact' | 'stroller' | 'cosleep'

// One shared 1s ticker, started by the first mounted consumer and stopped with the last.
let ticker: ReturnType<typeof setInterval> | undefined
let consumers = 0

/**
 * Shared sleep-session state (timestamps, not a counter, so the timer stays correct
 * when you navigate away or the tab sleeps). The start / finish dialogs are mounted
 * once in the layout and opened through `openStart()` / `openFinish()`.
 */
export const useSleepSession = () => {
  /** Which Home state is showing; 'active-sleep' means a session is running. */
  const homeState = useState<AppState>('home-state', () => 'active-sleep')

  const now = useState('sleep-now', () => Date.now())
  // Seeded as already running for 48m19s so Home has something to show
  const startedAt = useState('sleep-started-at', () => Date.now() - (48 * 60 + 19) * 1000)
  const pausedAt = useState<number | null>('sleep-paused-at', () => null)
  const pausedMs = useState('sleep-paused-ms', () => 0)

  const startOpen = useState('sleep-start-open', () => false)
  const finishOpen = useState('sleep-finish-open', () => false)

  onMounted(() => {
    consumers++
    if (consumers === 1) {
      now.value = Date.now()
      ticker = setInterval(() => { now.value = Date.now() }, 1000)
    }
  })
  onBeforeUnmount(() => {
    consumers--
    if (consumers <= 0) {
      consumers = 0
      clearInterval(ticker)
    }
  })

  const isActive = computed(() => homeState.value === 'active-sleep')
  const isPaused = computed(() => pausedAt.value !== null)

  const elapsedSeconds = computed(() => {
    const end = pausedAt.value ?? now.value
    return Math.max(0, Math.floor((end - startedAt.value - pausedMs.value) / 1000))
  })
  const elapsedMinutes = computed(() => Math.floor(elapsedSeconds.value / 60))

  const formattedTimer = computed(() => {
    const pad = (n: number) => String(n).padStart(2, '0')
    const s = elapsedSeconds.value
    return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
  })

  const togglePause = () => {
    const t = Date.now()
    now.value = t
    if (pausedAt.value === null) {
      pausedAt.value = t
    } else {
      pausedMs.value += t - pausedAt.value
      pausedAt.value = null
    }
  }

  /** Begin a session at `startMs` (defaults to now). */
  const start = (startMs = Date.now()) => {
    now.value = Date.now()
    startedAt.value = startMs
    pausedAt.value = null
    pausedMs.value = 0
    homeState.value = 'active-sleep'
  }

  /** End the session (saved or discarded). */
  const stop = () => {
    pausedAt.value = null
    pausedMs.value = 0
    homeState.value = 'baby-awake'
  }

  return {
    homeState, isActive, isPaused, startedAt, now, elapsedSeconds, elapsedMinutes, formattedTimer,
    togglePause, start, stop,
    startOpen, finishOpen,
    openStart: () => { startOpen.value = true },
    openFinish: () => {
      now.value = Date.now()
      finishOpen.value = true
    },
  }
}
