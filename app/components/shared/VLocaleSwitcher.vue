<template>
  <div>
    <button type="button"
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-input border border-border text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-subtle btn-press focus-ring transition-colors"
      :title="locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'" @click="toggleLocale">
      <Icon name="lucide:languages" class="w-3.5 h-3.5" />
      <span>{{ locale === 'ar' ? 'English' : 'العربية' }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
const { locale, setLocale } = useI18n()

const toggleLocale = () => {
  const next = locale.value === 'ar' ? 'en' : 'ar'
  setLocale(next)
}
</script>