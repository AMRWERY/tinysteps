<template>
  <sleep-start-dialog @done="showToast" />
  <sleep-finish-dialog @done="showToast" />
  <LazyVToast :visible="toastVisible">{{ toastText }}</LazyVToast>
</template>

<script setup lang="ts">
const toastVisible = ref(false)
const toastText = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

const showToast = (text: string) => {
  toastText.value = text
  toastVisible.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { toastVisible.value = false }, 2800)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>
