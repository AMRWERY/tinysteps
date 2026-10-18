<template>
  <div>
    <button type="button"
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-app-border text-xs font-medium text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle transition-colors active:scale-[0.98]"
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