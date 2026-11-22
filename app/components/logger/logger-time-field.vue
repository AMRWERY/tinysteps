<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <label :for="id" class="text-sm text-app-text-secondary">{{ label }}</label>
      <button v-if="showNow" type="button"
        class="flex items-center gap-1 text-sm font-semibold text-app-primary hover:underline focus-ring rounded"
        @click="emit('update:modelValue', nowHHmm())">
        <Icon name="lucide:history" class="w-3.5 h-3.5" /> Just now
      </button>
    </div>
    <div class="relative">
      <Icon :name="icon" class="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-app-text-secondary pointer-events-none" />
      <input :id="id" type="time" :value="modelValue" :aria-invalid="!!error"
        :class="['w-full rounded-2xl bg-app-surface-subtle ps-12 pe-4 py-3.5 text-sm text-app-text-primary outline-none [&::-webkit-calendar-picker-indicator]:hidden border border-transparent focus:border-app-primary focus:bg-app-surface transition-colors', error ? 'ring-2 ring-danger/60' : '']"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    </div>
    <p v-if="error" class="flex items-center gap-1.5 text-xs text-danger" role="alert">
      <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ modelValue: string; label: string; error?: string; showNow?: boolean; icon?: string }>(),
  { showNow: true, icon: 'lucide:clock' },
)
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const id = useId()
</script>
