export type HistoryFilter = 'all' | 'feed' | 'sleep' | 'diaper';

export type HistoryPreviewState = 'populated' | 'empty' | 'filter-empty' | 'skeleton';

export interface HistoryEventItem {
    id: string;
    type: 'feed' | 'sleep' | 'diaper';
    title: string;
    primaryTag?: string;
    secondaryTag?: string;
    notes: string;
    timeFormatted: string;
    period: 'morning' | 'afternoon';
    loggedBy?: string;
    timestamp: number; // for chronological sorting
}

export interface DayGentleSummary {
    dateLabel: string;
    feedCount: number;
    feedDetail: string;
    sleepDuration: string;
    sleepDetail: string;
    diaperCount: number;
    diaperDetail: string;
    isBalanced?: boolean;
}