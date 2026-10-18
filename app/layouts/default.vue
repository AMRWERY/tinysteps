<template>
  <div class="min-h-screen bg-background text-text-primary antialiased selection:bg-primary-soft selection:text-primary">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n()

const currentLocale = computed(() => {
  return (locales.value as Array<{ code: string; dir?: string }>).find(l => l.code === locale.value)
})

const dir = computed(() => {
  return currentLocale.value?.dir || (locale.value === 'ar' ? 'rtl' : 'ltr')
})

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
    dir: dir,
  },
})
</script>