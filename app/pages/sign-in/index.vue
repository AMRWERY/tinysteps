<template>
  <div class="px-4 md:px-8 pb-10 md:pb-6 space-y-6 md:space-y-10 max-w-[1400px] mx-auto">
    <auth-state-bar v-model="state" :options="scenarios" />

    <div class="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] gap-10 xl:gap-16 items-center lg:py-10">
      <auth-aside title="Welcome back to your nursery rhythm."
        subtitle="Little routines. Less mental load. Seamless care continuity between you, your co-parent, and evening caregivers." />

      <div class="space-y-5 w-full max-w-[560px] mx-auto lg:max-w-none">
        <section class="bg-app-surface rounded-3xl md:rounded-[28px] p-6 md:p-10 shadow-sm md:shadow-md border border-app-border/60" aria-labelledby="signin-title">
          <span class="hidden md:flex w-12 h-12 rounded-xl bg-app-accent-soft text-app-accent items-center justify-center mb-4">
            <Icon name="lucide:key-round" class="w-6 h-6" />
          </span>
          <p class="md:hidden inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-app-primary-soft text-app-primary text-sm font-medium mb-4">
            <Icon name="lucide:clock" class="w-4 h-4" /> Night-Friendly Auth
          </p>
          <h1 id="signin-title" class="text-3xl md:text-[28px] font-bold tracking-tight text-app-text-primary">
            <span class="hidden md:inline">Sign In to TinySteps</span><span class="md:hidden">Welcome back</span>
          </h1>
          <p class="text-base text-app-text-secondary mt-2 leading-relaxed">
            <span class="hidden md:inline">Access {{ baby.name }}'s logs and your shared family care timeline.</span>
            <span class="md:hidden">Sign in to sync feeds, sleep, and diaper logs across your family's devices.</span>
          </p>

          <!-- Gentle notice -->
          <p v-if="state === 'notice'" class="flex items-start gap-3 mt-5 rounded-2xl bg-app-accent-soft px-4 py-3 text-sm text-app-text-primary" role="status">
            <Icon name="lucide:wifi-off" class="w-5 h-5 text-app-accent shrink-0 mt-0.5" />
            You appear to be offline. You can still sign in — we'll sync everything quietly once signal returns.
          </p>

          <form class="mt-6 space-y-5" novalidate @submit.prevent="onSubmit">
            <auth-field v-model="form.email" label="Email address" aside="Parent or Caregiver" icon="lucide:mail" type="email"
              autocomplete="email" placeholder="elena.parent@example.com" hint="The email used for your family nursery invite."
              :error="errors.email" :disabled="busy" />

            <auth-field v-model="form.password" label="Password" icon="lucide:lock" type="password" autocomplete="current-password"
              placeholder="Enter your password" :error="errors.password" :disabled="busy">
              <template #label-right>
                <a href="#" class="text-sm font-semibold text-app-primary underline underline-offset-4 decoration-app-primary/40 hover:decoration-app-primary">Forgot password?</a>
              </template>
            </auth-field>

            <label class="flex items-start gap-3 cursor-pointer select-none">
              <input v-model="form.remember" type="checkbox" class="peer sr-only" />
              <span class="mt-0.5 w-6 h-6 rounded-lg border-2 border-app-border bg-app-surface flex items-center justify-center shrink-0 transition-colors peer-checked:bg-app-primary peer-checked:border-app-primary peer-focus-visible:ring-2 peer-focus-visible:ring-app-primary/40 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                <Icon name="lucide:check" class="w-4 h-4 text-white transition-opacity" />
              </span>
              <span>
                <span class="block text-base font-medium text-app-text-primary">
                  <span class="hidden md:inline">Stay signed in on this device</span><span class="md:hidden">Keep me signed in for 30 days</span>
                </span>
                <span class="block text-sm text-app-text-secondary leading-relaxed mt-0.5">
                  <span class="hidden md:inline">Preserves instant 1-tap logging for midnight feeds without repeated password re-entry.</span>
                  <span class="md:hidden">Avoid repeated logins during nighttime nursery feeds</span>
                </span>
              </span>
            </label>

            <button type="submit" :disabled="busy"
              class="w-full flex items-center justify-center gap-3 px-6 py-4 min-h-[56px] rounded-2xl bg-app-primary text-white text-lg font-semibold hover:bg-app-primary-hover active:scale-[0.99] transition-all shadow-xs disabled:opacity-80 disabled:cursor-wait focus-ring">
              <span v-if="state === 'syncing'" class="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              <Icon v-else-if="state === 'success'" name="lucide:check" class="w-5 h-5" />
              <Icon v-else name="lucide:log-in" class="hidden md:block w-5 h-5" />
              <span v-if="state === 'syncing'">Syncing your nursery…</span>
              <span v-else-if="state === 'success'">Signed in</span>
              <template v-else><span class="hidden md:inline">Sign In to Your Routine</span><span class="md:hidden">Sign In</span></template>
            </button>
          </form>

          <p class="mt-7 text-center text-base text-app-text-secondary">
            <span class="hidden md:inline">New to TinySteps? </span><span class="md:hidden block mb-1">Don't have an account?</span>
            <nuxt-link-locale to="/sign-up" class="font-semibold text-app-primary underline underline-offset-4 decoration-app-primary/40 hover:decoration-app-primary">
              <span class="hidden md:inline">Create a free family account</span><span class="md:hidden no-underline text-lg">Create an account</span>
            </nuxt-link-locale>
          </p>
        </section>

        <!-- Phone: privacy note -->
        <aside class="md:hidden flex items-start gap-4 rounded-3xl bg-app-surface-subtle p-5">
          <span class="w-12 h-12 rounded-xl bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0"><Icon name="lucide:shield-check" class="w-6 h-6" /></span>
          <div>
            <p class="flex items-center gap-2 flex-wrap text-lg font-bold text-app-text-primary">
              Private &amp; Family-First <span class="px-2.5 py-0.5 rounded-full bg-app-surface text-xs font-medium text-app-text-secondary">Local-First</span>
            </p>
            <p class="text-base text-app-text-secondary leading-relaxed mt-1.5">
              Your baby's records are never sold, profiled, or shared. Local encryption ensures your feeding clocks and white-noise routines remain accessible even during nursery Wi-Fi deadzones.
            </p>
          </div>
        </aside>
      </div>
    </div>

    <!-- Perks -->
    <ul class="hidden md:flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-app-text-secondary py-6">
      <li class="flex items-center gap-2"><Icon name="lucide:users" class="w-4 h-4 text-app-primary" /> Unlimited caregiver invites</li>
      <li class="flex items-center gap-2"><Icon name="lucide:clock" class="w-4 h-4 text-app-primary" /> Smart pediatrician-friendly summaries</li>
      <li class="flex items-center gap-2"><Icon name="lucide:smartphone" class="w-4 h-4 text-app-primary" /> Cross-device real-time sync</li>
    </ul>

    <v-toast :visible="toastVisible">{{ toastText }}</v-toast>
  </div>
</template>

<script setup lang="ts">
import type { AuthState } from '~/composables/useAuthFlow'

definePageMeta({ layout: 'auth' })

const { baby } = useBabyProfile()
const localePath = useLocalePath()
const { state, toastText, toastVisible, showToast, submit } = useAuthFlow()

const scenarios: { value: AuthState; label: string; short?: string; desktopOnly?: boolean }[] = [
  { value: 'default', label: 'Default Rest', short: 'Default' },
  { value: 'syncing', label: 'Syncing' },
  { value: 'notice', label: 'Gentle Notice', desktopOnly: true },
  { value: 'error', label: 'Field Error', short: 'Error' },
  { value: 'success', label: 'Success Toast', short: 'Success' },
]

const form = reactive({ email: '', password: '', remember: true })
const errors = reactive({ email: '', password: '' })
const busy = computed(() => state.value === 'syncing' || state.value === 'success')

const validate = () => {
  errors.email = !form.email.trim()
    ? 'Please enter the email for your family account.'
    : isValidEmail(form.email) ? '' : "That email doesn't look quite right — check for typos."
  errors.password = form.password ? '' : 'Please enter your password.'
  return !errors.email && !errors.password
}

const onSubmit = () => {
  if (busy.value) return
  if (!validate()) { state.value = 'error'; return }
  // Demo only: no server yet, so any well-formed credentials are accepted
  submit('Welcome back — your nursery is in sync', () => navigateTo(localePath('/')))
}

// Scenario pills drive the demo states
watch(state, (s, prev) => {
  if (s === 'error' && !errors.email && !errors.password && prev !== 'error') {
    if (!validate()) return
    errors.email = "That email doesn't look quite right — check for typos."
    errors.password = 'Please enter your password.'
  }
  if (prev === 'error' && s !== 'error') { errors.email = ''; errors.password = '' }
  if (s === 'success' && !toastVisible.value) showToast('Welcome back — your nursery is in sync')
})

useSeoMeta({
  title: 'Sign In — TinySteps',
  description: 'Sign in to your private, local-first TinySteps nursery.',
})
</script>
