const pad = (n: number) => String(n).padStart(2, '0')

/** Current local time as "hh:mm" (24h), the format of <input type="time">. */
export const nowHHmm = () => {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** "14:30" -> "2:30 PM" or "14:30" depending on the user's time-format setting. */
export const formatClock = (hhmm: string, format: '12h' | '24h' = '12h') => {
  if (!hhmm) return ''
  const [h = 0, m = 0] = hhmm.split(':').map(Number)
  if (format === '24h') return `${pad(h)}:${pad(m)}`
  return `${h % 12 || 12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`
}

/** Minutes from start to end; an earlier end is treated as the next day (overnight sleep). */
export const minutesBetween = (start: string, end: string) => {
  const toMin = (t: string) => {
    const [h = 0, m = 0] = t.split(':').map(Number)
    return h * 60 + m
  }
  const diff = toMin(end) - toMin(start)
  return diff >= 0 ? diff : diff + 24 * 60
}

/** 75 -> "1h 15m", 45 -> "45m" */
export const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h ? (m ? `${h}h ${m}m` : `${h}h`) : `${m}m`
}
