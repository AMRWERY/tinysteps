import type { LogType } from '~/types/logger'

/** App-wide open/close state for the routine logger dialog (mounted once in the layout). */
export const useRoutineLogger = () => {
  const open = useState('routine-logger-open', () => false)
  const type = useState<LogType>('routine-logger-type', () => 'feed')

  const openLogger = (t: LogType = 'feed') => {
    type.value = t
    open.value = true
  }
  const closeLogger = () => { open.value = false }

  return { open, type, openLogger, closeLogger }
}
