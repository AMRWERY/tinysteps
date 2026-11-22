<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between gap-3">
      <label :for="id" class="text-base font-semibold text-app-text-primary">{{ label }}</label>
      <slot name="label-right">
        <span v-if="aside" class="text-sm text-app-text-secondary">{{ aside }}</span>
      </slot>
    </div>

    <div class="relative">
      <Icon :name="icon" class="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-app-text-secondary pointer-events-none" />
      <input :id="id" :type="inputType" :value="modelValue" :autocomplete="autocomplete" :placeholder="placeholder"
        :aria-invalid="!!error" :aria-describedby="describedBy" :disabled="disabled"
        :class="[
          'w-full rounded-2xl bg-app-surface-subtle ps-12 py-4 text-base text-app-text-primary placeholder:text-app-text-secondary/70 outline-none border border-transparent focus:border-app-primary focus:bg-app-surface transition-colors disabled:opacity-60',
          isPassword ? 'pe-14' : 'pe-4',
          error ? 'ring-2 ring-danger/60' : '',
        ]"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
      <button v-if="isPassword" type="button" :aria-label="revealed ? 'Hide password' : 'Show password'" :aria-pressed="revealed"
        class="absolute top-1/2 -translate-y-1/2 end-3 w-10 h-10 rounded-xl flex items-center justify-center text-app-text-secondary hover:text-app-text-primary transition-colors focus-ring"
        @click="revealed = !revealed">
        <Icon :name="revealed ? 'lucide:eye-off' : 'lucide:eye'" class="w-5 h-5" />
      </button>
    </div>

    <p v-if="error" :id="`${id}-error`" class="flex items-center gap-1.5 text-sm text-danger" role="alert">
      <Icon name="lucide:circle-alert" class="w-4 h-4 shrink-0" /> {{ error }}
    </p>
    <p v-else-if="hint" :id="`${id}-hint`" class="text-sm text-app-text-secondary">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  icon: string
  type?: 'text' | 'email' | 'password'
  aside?: string
  hint?: string
  error?: string
  autocomplete?: string
  placeholder?: string
  disabled?: boolean
}>(), { type: 'text' })

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const id = useId()
const revealed = ref(false)
const isPassword = computed(() => props.type === 'password')
const inputType = computed(() => (isPassword.value && revealed.value ? 'text' : props.type))
const describedBy = computed(() => (props.error ? `${id}-error` : props.hint ? `${id}-hint` : undefined))
</script>
