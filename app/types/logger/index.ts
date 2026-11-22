export type LogType = 'feed' | 'sleep' | 'diaper'

export interface FeedForm {
  method: 'bottle' | 'nursing'
  /** hh:mm (24h) */
  time: string
  quantity: number | null
  liquid: 'expressed' | 'formula' | 'combo'
  leftMin: number | null
  rightMin: number | null
  notes: string
}

export interface SleepForm {
  kind: 'nap' | 'night'
  start: string
  /** Optional — empty means the sleep is still ongoing */
  end: string
  location: 'crib' | 'bassinet' | 'arms' | 'stroller'
  notes: string
}

export interface DiaperForm {
  kind: 'wet' | 'dirty' | 'both'
  time: string
  observation: 'normal' | 'skin-clear' | 'rash'
  notes: string
}

export type LogErrors = Record<string, string>
