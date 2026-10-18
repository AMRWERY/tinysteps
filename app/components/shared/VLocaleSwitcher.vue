<template>
  <div>
    <button type="button"
      class="px-2.5 py-1.5 rounded-input border border-border text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-subtle btn-press focus-ring"
      @click="toggleLocale">
      {{ locale === 'ar' ? 'English' : 'العربية' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const { t, locale, setLocale } = useI18n()

const toggleLocale = () => {
  const next = locale.value === 'ar' ? 'en' : 'ar'
  setLocale(next)
}
</script>