import type { TimelineEntry } from '~/types/home'

type RoutineType = TimelineEntry['type']

/** Icon + tinted container classes per routine type, shared by home and mobile views. */
export const routineTypeMeta: Record<RoutineType, { icon: string; tile: string }> = {
  feed: { icon: 'lucide:milk', tile: 'bg-app-accent-soft text-app-accent' },
  sleep: { icon: 'lucide:moon', tile: 'bg-app-primary-soft text-app-primary' },
  diaper: { icon: 'lucide:droplet', tile: 'bg-app-surface-subtle text-app-text-secondary' },
}

export const badgeClass = (color: TimelineEntry['badgeColor'] = 'subtle') => ({
  primary: 'bg-app-primary-soft text-app-primary',
  accent: 'bg-app-accent-soft text-app-accent',
  warning: 'bg-app-accent-soft text-app-warning',
  subtle: 'bg-app-surface-subtle text-app-text-secondary',
}[color])
