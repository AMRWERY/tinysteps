export type TimeFormat = '12h' | '24h'
export type LiquidUnit = 'ml' | 'oz'
export type WeightUnit = 'kg' | 'lbs'

export interface AppSettings {
  timeFormat: TimeFormat
  liquidUnit: LiquidUnit
  weightUnit: WeightUnit
  keepScreenAwake: boolean
}

const DEFAULTS: AppSettings = {
  timeFormat: '12h',
  liquidUnit: 'ml',
  weightUnit: 'kg',
  keepScreenAwake: true,
}

/**
 * Device-local preferences. `initOnMounted` keeps SSR and the first client render
 * on the defaults so hydration matches, then loads the saved values.
 */
export const useAppSettings = () =>
  useLocalStorage<AppSettings>('tinysteps-settings', { ...DEFAULTS }, {
    mergeDefaults: true,
    initOnMounted: true,
  })
