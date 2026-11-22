<template>
  <div
    role="radiogroup"
    :aria-label="label"
    :class="
      variant === 'segmented'
        ? 'flex bg-app-surface-subtle rounded-2xl p-1 gap-1'
        : 'grid gap-2'
    "
    :style="
      variant === 'chips'
        ? { gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }
        : undefined
    "
  >
    <button
      v-for="o in options"
      :key="o.value"
      type="button"
      role="radio"
      :aria-checked="modelValue === o.value"
      :class="[
        'flex items-center justify-center gap-2 font-semibold transition-colors focus-ring text-center',
        variant === 'segmented'
          ? 'flex-1 py-3 rounded-xl text-sm'
          : 'py-2.5 px-2 rounded-xl text-sm',
        modelValue === o.value
          ? variant === 'segmented'
            ? 'bg-app-surface text-app-text-primary shadow-xs'
            : 'bg-app-primary-soft text-app-primary'
          : 'text-app-text-secondary hover:text-app-text-primary ' +
            (variant === 'chips' ? 'bg-app-surface-subtle' : ''),
      ]"
      @click="emit('update:modelValue', o.value)"
    >
      <Icon v-if="o.icon" :name="o.icon" class="w-4 h-4" />
      {{ o.label }}
    </button>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
withDefaults(
  defineProps<{
    modelValue: T;
    options: { value: T; label: string; icon?: string }[];
    label: string;
    variant?: "segmented" | "chips";
  }>(),
  { variant: "chips" },
);

const emit = defineEmits<{ (e: "update:modelValue", v: T): void }>();
</script>