import type { TimelineEntry } from '~/types/home'

/**
 * Today's timeline, shared app-wide so the routine logger can add entries
 * that Home displays. Placeholder seed data until a backend exists.
 */
export const useTimelineEntries = () =>
  useState<TimelineEntry[]>('timeline-entries', () => [
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
