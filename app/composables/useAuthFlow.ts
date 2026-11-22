export type AuthState = 'default' | 'syncing' | 'notice' | 'error' | 'success'

/**
 * UI flow shared by the sign-in and sign-up pages: scenario state, a toast, and a
 * simulated round-trip (there is no backend yet — swap `submit` for the real request).
 */
export const useAuthFlow = () => {
  const state = ref<AuthState>('default')
  const toastText = ref('')
  const toastVisible = ref(false)
  const timers: ReturnType<typeof setTimeout>[] = []

  const later = (fn: () => void, ms: number) => { timers.push(setTimeout(fn, ms)) }

  const showToast = (text: string) => {
    toastText.value = text
    toastVisible.value = true
    later(() => { toastVisible.value = false }, 2800)
  }

  const submit = (successMessage: string, done: () => void) => {
    state.value = 'syncing'
    later(() => {
      state.value = 'success'
      showToast(successMessage)
      later(done, 900)
    }, 1100)
  }

  onBeforeUnmount(() => timers.forEach(clearTimeout))

  return { state, toastText, toastVisible, showToast, submit }
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
