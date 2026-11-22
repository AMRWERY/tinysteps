<template>
  <div>
    <button type="button" :aria-expanded="open" :aria-controls="id"
      class="w-full flex items-center justify-between gap-2 text-start text-sm text-app-text-secondary hover:text-app-text-primary transition-colors focus-ring rounded py-1"
      @click="open = !open">
      <span class="flex items-center gap-2"><Icon name="lucide:file-pen-line" class="w-4 h-4" /> {{ label }}</span>
      <Icon name="lucide:chevron-down" :class="['w-4 h-4 transition-transform', open ? 'rotate-180' : '']" />
    </button>
    <textarea v-show="open" :id="id" :value="modelValue" rows="3" :placeholder="placeholder"
      class="mt-2 w-full rounded-2xl bg-app-surface-subtle px-4 py-3 text-sm text-app-text-primary placeholder:text-app-text-secondary/70 outline-none border border-transparent focus:border-app-primary focus:bg-app-surface transition-colors resize-none"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string; label: string; placeholder: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const id = useId()
// Start expanded when there is already text (e.g. re-opened draft)
const open = ref(!!props.modelValue)
</script>
