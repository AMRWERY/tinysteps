<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="visible" role="status"
        class="fixed z-50 bottom-24 md:bottom-8 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-app-text-primary text-app-bg text-sm font-semibold shadow-lg">
        <Icon name="lucide:check-circle-2" class="w-4 h-4" /> <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean }>()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}

[dir='rtl'] .toast-enter-from,
[dir='rtl'] .toast-leave-to {
  transform: translate(50%, 12px);
}
</style>
