export type ProfilePreviewState =
  | "saved"
  | "edit"
  | "first-time"
  | "error"
  | "toast";

export type VolumeUnit = "ml" | "oz";

export type FeedingMethod = "breast" | "bottle" | "combined";

export type SleepStyle = "timer" | "manual";

export interface ProfileForm {
  name: string;
  /** ISO date (yyyy-mm-dd) */
  dob: string;
  /** 24h time (hh:mm), optional */
  birthTime: string;
  notes: string;
  volumeUnit: VolumeUnit;
  feedingMethod: FeedingMethod;
  diaperDetail: boolean;
  sleepStyle: SleepStyle;
}

export interface ProfileErrors {
  name: string;
  dob: string;
}