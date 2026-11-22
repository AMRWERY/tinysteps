export interface RoutineEvent {
    id: number
    type: 'feeding' | 'sleep' | 'diaper'
    title: string
    detail: string
    notes?: string
    time: string
}

export interface TimelineItem {
    id: string;
    type: 'sleep' | 'feed' | 'diaper';
    title: string;
    badge?: string;
    time: string;
    relativeTime?: string;
    duration?: string;
    amount?: string;
    subtitle?: string;
    details?: string;
    isActive?: boolean;
}

export type ThemeMode = 'light' | 'dark';

export type AppState = 'active-sleep' | 'baby-awake' | 'first-run' | 'loading';

export type EventType = 'all' | 'feed' | 'sleep' | 'diaper';

export interface TimelineEntry {
    id: string;
    type: 'feed' | 'sleep' | 'diaper';
    title: string;
    badge: string;
    badgeColor?: 'primary' | 'accent' | 'subtle' | 'warning';
    /** Clock time or range, e.g. "11:20 AM" or "8:45 AM – 10:15 AM" */
    clock: string;
    /** Big value shown on the right, e.g. { value: '48m', label: 'Current' } */
    metric?: { value: string; label: string };
    description: string;
    loggedBy?: string;
    isActive?: boolean;
}

export interface DayTotals {
    feed: { value: string; detail: string; note: string };
    rest: { value: string; detail: string; note: string };
    diapers: { value: string; unit: string; detail: string; note: string };
}

export interface Caregiver {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    lastActive: string;
    isOnline: boolean;
}