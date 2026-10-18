export interface RoutineEvent {
    id: number
    type: 'feeding' | 'sleep' | 'diaper'
    title: string
    detail: string
    notes?: string
    time: string
}

export type EventType = 'all' | 'feed' | 'sleep' | 'diaper';

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