import type { AppState, TimelineEntry } from '~/types/home';

export function useRoutineState() {
  const currentState = ref<AppState>('active-sleep');
  const elapsedSeconds = ref(48 * 60 + 19); // 00:48:19
  const isPaused = ref(false);

  // Live timer tick
  setInterval(() => {
    if (currentState.value === 'active-sleep' && !isPaused.value) {
      elapsedSeconds.value++;
    }
  }, 1000);

  const formattedTimer = computed(() => {
    const hrs = Math.floor(elapsedSeconds.value / 3600);
    const mins = Math.floor((elapsedSeconds.value % 3600) / 60);
    const secs = elapsedSeconds.value % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  });

  const timelineEntries = ref<TimelineEntry[]>([
    {
      id: '1',
      type: 'sleep',
      title: 'Nap #3 (In Progress)',
      badge: 'Active',
      badgeColor: 'primary',
      time: '48m Current',
      description: 'Started 1:15 PM • Crib • Calming sound machine running',
      loggedBy: 'Alex',
      isActive: true,
    },
    {
      id: '2',
      type: 'diaper',
      title: 'Diaper Change',
      badge: 'Wet + Dirty',
      badgeColor: 'warning',
      time: '12:40 PM',
      description: 'Normal mustard color, no diaper rash observed',
      loggedBy: 'Alex',
    },
    {
      id: '3',
      type: 'feed',
      title: 'Expressed Milk Bottle',
      badge: '120 ml',
      badgeColor: 'subtle',
      time: '120 ml Bottle',
      timeContext: '11:20 AM',
      description: 'Paced feeding took 18m • Burped twice with ease',
      loggedBy: 'Alex',
    },
    {
      id: '4',
      type: 'sleep',
      title: 'Morning Nap #1',
      badge: 'Bassinet',
      badgeColor: 'subtle',
      time: '1h 30m Rest',
      timeContext: '8:45 AM – 10:15 AM',
      description: 'Woke up smiling without fussing',
    },
    {
      id: '5',
      type: 'feed',
      title: 'Nursing Feed',
      badge: 'Left + Right',
      badgeColor: 'primary',
      time: '22m Nursing',
      timeContext: '7:15 AM',
      description: 'Left (12m), Right (10m) • Calm morning feed',
    },
  ]);

  return {
    currentState,
    elapsedSeconds,
    isPaused,
    formattedTimer,
    timelineEntries,
  };
}