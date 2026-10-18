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

export interface TimelineEntry {
    id: string;
    type: 'feed' | 'sleep' | 'diaper';
    title: string;
    badge: string;
    badgeColor?: 'primary' | 'accent' | 'subtle' | 'warning';
    time: string;
    timeContext?: string;
    description: string;
    loggedBy?: string;
    isActive?: boolean;
}

export interface Caregiver {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    lastActive: string;
    isOnline: boolean;
}