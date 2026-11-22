<template>
  <div class="min-h-[360px] flex flex-col items-center justify-center text-center gap-4 p-6" aria-live="polite">
    <template v-if="saving">
      <span class="w-14 h-14 rounded-full border-4 border-app-primary-soft border-t-app-primary animate-spin" />
      <div>
        <h2 class="text-xl font-bold text-app-text-primary">Saving {{ name }}'s nursery…</h2>
        <p class="text-sm text-app-text-secondary mt-1">Everything stays on this device.</p>
      </div>
    </template>
    <template v-else>
      <span class="w-16 h-16 rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center">
        <Icon name="lucide:check" class="w-8 h-8" />
      </span>
      <div>
        <h2 class="text-2xl font-bold text-app-text-primary">{{ name }}'s nursery is ready</h2>
        <p class="text-sm text-app-text-secondary mt-1.5 max-w-sm mx-auto">
          Your first log is one tap away. Take a deep breath—you're doing wonderfully.
        </p>
      </div>
      <nuxt-link-locale to="/"
        class="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-button bg-app-primary text-white text-sm font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs focus-ring">
        Go to Home <Icon name="lucide:arrow-right" class="w-4 h-4 rtl:rotate-180" />
      </nuxt-link-locale>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{ saving: boolean; name: string }>()
</script>
