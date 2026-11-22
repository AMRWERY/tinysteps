<template>
  <div class="flex flex-col md:flex-row md:items-center gap-2 bg-app-surface-subtle rounded-2xl p-1.5 md:ps-4 text-xs">
    <div
      class="flex items-center justify-between gap-2 shrink-0 font-semibold text-app-text-secondary py-1.5 px-2 md:px-0">
      <span class="flex items-center gap-2">
        <Icon name="lucide:flask-conical" class="w-3.5 h-3.5" /> {{ label }}
      </span>
      <span v-if="hint" class="md:hidden text-[11px]">{{ hint }}</span>
    </div>
    <div class="flex items-center gap-1 overflow-x-auto no-scrollbar md:ms-auto">
      <button v-for="o in options" :key="o.value" type="button" :aria-pressed="modelValue === o.value" :class="[
        'px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors focus-ring',
        modelValue === o.value
          ? 'bg-app-primary text-white md:bg-app-surface md:text-app-text-primary md:shadow-xs'
          : 'text-app-text-secondary hover:text-app-text-primary',
      ]" @click="emit('update:modelValue', o.value)">
        {{ o.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
defineProps<{ modelValue: T; options: { value: T; label: string }[]; label: string; hint?: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: T): void }>()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
