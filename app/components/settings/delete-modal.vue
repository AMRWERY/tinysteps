<template>
  <Teleport to="body">
    <Transition name="fade-modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="emit('cancel')" />
        <div ref="dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-desc"
          class="relative w-full max-w-md bg-app-surface border border-app-border rounded-card p-6 shadow-lg space-y-4">
          <span class="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center">
            <Icon name="lucide:trash-2" class="w-6 h-6" />
          </span>
          <div>
            <h3 id="delete-title" class="text-lg font-bold text-app-text-primary">Purge all local data?</h3>
            <p id="delete-desc" class="text-sm text-app-text-secondary mt-1.5 leading-relaxed">
              This removes {{ babyName }}'s profile and every logged sleep, feed and diaper from this device.
              It can't be undone.
            </p>
          </div>
          <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <button ref="cancelBtn" type="button"
              class="px-4 py-2.5 min-h-[44px] rounded-button border border-app-border text-sm font-semibold text-app-text-primary hover:bg-app-surface-subtle transition-colors focus-ring"
              @click="emit('cancel')">
              Keep my data
            </button>
            <button type="button"
              class="px-4 py-2.5 min-h-[44px] rounded-button bg-danger text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all focus-ring"
              @click="emit('confirm')">
              Yes, purge database
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'cancel'): void; (e: 'confirm'): void }>()

const { baby } = useBabyProfile()
const babyName = baby.name
const cancelBtn = ref<HTMLButtonElement>()

useEventListener('keydown', (e: KeyboardEvent) => {
  if (props.open && e.key === 'Escape') emit('cancel')
})

// Focus the safe action when the dialog opens
watch(() => props.open, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  cancelBtn.value?.focus()
})
</script>

<style scoped>
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.2s ease;
}

.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
</style>
