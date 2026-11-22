<template>
  <div class="inline-flex bg-app-surface rounded-xl p-1 gap-1 border border-app-border/60" role="radiogroup"
    :aria-label="label">
    <button v-for="o in options" :key="o.value" type="button" role="radio" :aria-checked="modelValue === o.value"
      :class="[
        'flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-colors focus-ring',
        block ? 'flex-1 px-3 py-2.5' : 'px-3 py-1.5',
        modelValue === o.value ? 'bg-app-primary text-white shadow-xs' : 'text-app-text-secondary hover:text-app-text-primary',
      ]" @click="emit('update:modelValue', o.value)">
      <Icon v-if="o.icon" :name="o.icon" class="w-3.5 h-3.5" />
      {{ o.label }}
    </button>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
defineProps<{
  modelValue: T
  options: { value: T; label: string; icon?: string }[]
  label: string
  block?: boolean
}>()
const emit = defineEmits<{ (e: 'update:modelValue', v: T): void }>()
</script>
