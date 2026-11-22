<template>
  <div>
    <button type="button"
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-app-border text-xs font-medium text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle transition-colors active:scale-[0.98]"
      :title="locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'" @click="handleClick">
      <Icon name="lucide:languages" class="w-3.5 h-3.5 transition-transform duration-300"
        :style="{ transform: `rotate(${spin * 180}deg)` }" />
      <Transition name="swap" mode="out-in">
        <span :key="locale">{{ locale === 'ar' ? 'English' : 'العربية' }}</span>
      </Transition>
    </button>
  </div>
</template>

<script lang="ts" setup>
const { locale, toggleLocale } = useAppLocale()

const spin = ref(0)
const handleClick = () => {
  spin.value++
  toggleLocale()
}
</script>
