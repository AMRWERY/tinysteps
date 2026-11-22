<template>
  <div class="px-4 md:px-8 pb-10 md:pb-6 space-y-6 md:space-y-10 max-w-[1400px] mx-auto">
    <auth-state-bar v-model="state" :options="scenarios" />

    <div class="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] gap-10 xl:gap-16 items-center lg:py-10">
      <auth-aside title="Start your family's nursery rhythm."
        subtitle="Free for one family. Set up in a minute, invite your co-parent, and let the little routines look after themselves." />

      <div class="space-y-5 w-full max-w-[560px] mx-auto lg:max-w-none">
        <section class="bg-app-surface rounded-3xl md:rounded-[28px] p-6 md:p-10 shadow-sm md:shadow-md border border-app-border/60" aria-labelledby="signup-title">
          <span class="hidden md:flex w-12 h-12 rounded-xl bg-app-primary-soft text-app-primary items-center justify-center mb-4">
            <Icon name="lucide:user-plus" class="w-6 h-6" />
          </span>
          <p class="md:hidden inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-app-primary-soft text-app-primary text-sm font-medium mb-4">
            <Icon name="lucide:sprout" class="w-4 h-4" /> New Family Setup
          </p>
          <h1 id="signup-title" class="text-3xl md:text-[28px] font-bold tracking-tight text-app-text-primary">Create your family account</h1>
          <p class="text-base text-app-text-secondary mt-2 leading-relaxed">
            Your data stays on your devices. It takes under a minute, and you can invite a co-parent right after.
          </p>

          <p v-if="state === 'notice'" class="flex items-start gap-3 mt-5 rounded-2xl bg-app-accent-soft px-4 py-3 text-sm text-app-text-primary" role="status">
            <Icon name="lucide:wifi-off" class="w-5 h-5 text-app-accent shrink-0 mt-0.5" />
            You appear to be offline. Your account will be created on this device and synced once signal returns.
          </p>

          <form class="mt-6 space-y-5" novalidate @submit.prevent="onSubmit">
            <auth-field v-model="form.name" label="Your name" aside="Shown to your co-parent" icon="lucide:user" autocomplete="name"
              placeholder="Elena Parent" :error="errors.name" :disabled="busy" />

            <auth-field v-model="form.email" label="Email address" aside="Parent or Caregiver" icon="lucide:mail" type="email"
              autocomplete="email" placeholder="elena.parent@example.com" hint="We'll only use this to sign you in and send your family invite."
              :error="errors.email" :disabled="busy" />

            <auth-field v-model="form.password" label="Password" icon="lucide:lock" type="password" autocomplete="new-password"
              placeholder="At least 8 characters" hint="Use a phrase you'll remember at 3 AM — 8 characters or more."
              :error="errors.password" :disabled="busy" />

            <div class="space-y-2">
              <label class="flex items-start gap-3 cursor-pointer select-none">
                <input v-model="form.terms" type="checkbox" class="peer sr-only" :aria-invalid="!!errors.terms" />
                <span :class="['mt-0.5 w-6 h-6 rounded-lg border-2 bg-app-surface flex items-center justify-center shrink-0 transition-colors peer-checked:bg-app-primary peer-checked:border-app-primary peer-focus-visible:ring-2 peer-focus-visible:ring-app-primary/40 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100', errors.terms ? 'border-danger' : 'border-app-border']">
                  <Icon name="lucide:check" class="w-4 h-4 text-white transition-opacity" />
                </span>
                <span class="text-base text-app-text-primary leading-relaxed">
                  I agree to the <a href="#" class="font-semibold text-app-primary underline underline-offset-4" @click.stop>Privacy Notice</a>
                  and understand my baby's records are never sold or profiled.
                </span>
              </label>
              <p v-if="errors.terms" class="flex items-center gap-1.5 text-sm text-danger" role="alert">
                <Icon name="lucide:circle-alert" class="w-4 h-4 shrink-0" /> {{ errors.terms }}
              </p>
            </div>

            <button type="submit" :disabled="busy"
              class="w-full flex items-center justify-center gap-3 px-6 py-4 min-h-[56px] rounded-2xl bg-app-primary text-white text-lg font-semibold hover:bg-app-primary-hover active:scale-[0.99] transition-all shadow-xs disabled:opacity-80 disabled:cursor-wait focus-ring">
              <span v-if="state === 'syncing'" class="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              <Icon v-else-if="state === 'success'" name="lucide:check" class="w-5 h-5" />
              <Icon v-else name="lucide:user-plus" class="hidden md:block w-5 h-5" />
              <span v-if="state === 'syncing'">Creating your nursery…</span>
              <span v-else-if="state === 'success'">Account created</span>
              <span v-else>Create Account</span>
            </button>
          </form>

          <p class="mt-7 text-center text-base text-app-text-secondary">
            Already have an account?
            <nuxt-link-locale to="/sign-in" class="font-semibold text-app-primary underline underline-offset-4 decoration-app-primary/40 hover:decoration-app-primary">Sign in</nuxt-link-locale>
          </p>
        </section>

        <aside class="md:hidden flex items-start gap-4 rounded-3xl bg-app-surface-subtle p-5">
          <span class="w-12 h-12 rounded-xl bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0"><Icon name="lucide:shield-check" class="w-6 h-6" /></span>
          <div>
            <p class="flex items-center gap-2 flex-wrap text-lg font-bold text-app-text-primary">
              Private &amp; Family-First <span class="px-2.5 py-0.5 rounded-full bg-app-surface text-xs font-medium text-app-text-secondary">Local-First</span>
            </p>
            <p class="text-base text-app-text-secondary leading-relaxed mt-1.5">
              Your baby's records are never sold, profiled, or shared. Everything is encrypted on your device.
            </p>
          </div>
        </aside>
      </div>
    </div>

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

const localePath = useLocalePath()
const { state, toastText, toastVisible, showToast, submit } = useAuthFlow()

const scenarios: { value: AuthState; label: string; short?: string; desktopOnly?: boolean }[] = [
  { value: 'default', label: 'Default Rest', short: 'Default' },
  { value: 'syncing', label: 'Syncing' },
  { value: 'notice', label: 'Gentle Notice', desktopOnly: true },
  { value: 'error', label: 'Field Error', short: 'Error' },
  { value: 'success', label: 'Success Toast', short: 'Success' },
]

const form = reactive({ name: '', email: '', password: '', terms: false })
const errors = reactive({ name: '', email: '', password: '', terms: '' })
const busy = computed(() => state.value === 'syncing' || state.value === 'success')

const validate = () => {
  errors.name = form.name.trim() ? '' : 'Please tell us your name.'
  errors.email = !form.email.trim()
    ? 'Please enter your email.'
    : isValidEmail(form.email) ? '' : "That email doesn't look quite right — check for typos."
  errors.password = form.password.length >= 8 ? '' : 'Please choose a password with at least 8 characters.'
  errors.terms = form.terms ? '' : 'Please agree to the Privacy Notice to continue.'
  return !errors.name && !errors.email && !errors.password && !errors.terms
}

const clearErrors = () => { errors.name = ''; errors.email = ''; errors.password = ''; errors.terms = '' }

const onSubmit = () => {
  if (busy.value) return
  if (!validate()) { state.value = 'error'; return }
  // Demo only: no server yet. A new account continues to the first-run setup.
  submit('Welcome to TinySteps — let\'s set up your nursery', () => navigateTo(localePath('/onboarding')))
}

watch(state, (s, prev) => {
  if (s === 'error' && prev !== 'error' && validate()) {
    // Demo pill with a valid form: show representative errors
    errors.email = "That email doesn't look quite right — check for typos."
    errors.password = 'Please choose a password with at least 8 characters.'
  }
  if (prev === 'error' && s !== 'error') clearErrors()
  if (s === 'success' && !toastVisible.value) showToast('Welcome to TinySteps — let\'s set up your nursery')
})

useSeoMeta({
  title: 'Create Account — TinySteps',
  description: 'Create a free, private TinySteps family account.',
})
</script>
