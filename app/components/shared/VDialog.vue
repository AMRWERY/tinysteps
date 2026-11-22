<template>
  <Teleport to="body">
    <Transition name="dlg">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-6"
      >
        <div
          class="dlg-backdrop absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="requestClose"
        />

        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="descId"
          class="dlg-panel relative w-full md:max-w-[680px] max-h-[92dvh] md:max-h-[90dvh] flex flex-col bg-app-surface border border-app-border shadow-lg rounded-t-3xl md:rounded-card"
          @keydown="onKeydown"
        >
          <!-- Grabber (phones) -->
          <div class="md:hidden flex justify-center pt-3" aria-hidden="true">
            <span class="w-12 h-1.5 rounded-full bg-app-border" />
          </div>

          <!-- Header -->
          <header class="flex items-start gap-4 p-5 md:p-8 pb-2 md:pb-4">
            <span :class="['hidden md:flex w-14 h-14 rounded-2xl items-center justify-center shrink-0', tile]">
              <Icon :name="icon" class="w-6 h-6" />
            </span>
            <span :class="['md:hidden flex w-12 h-12 rounded-2xl items-center justify-center shrink-0', mobileTile || tile]">
              <Icon :name="mobileIcon || icon" class="w-6 h-6" />
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h2 :id="titleId" class="text-xl md:text-2xl font-bold text-app-text-primary leading-tight">
                  {{ title }}
                </h2>
                <span v-if="badge"
                  class="px-2.5 py-0.5 rounded-full bg-app-primary-soft text-app-primary text-xs font-semibold">
                  <span class="hidden md:inline">{{ badge }}</span><span class="md:hidden">{{ badgeShort || badge }}</span>
                </span>
              </div>
              <p :id="descId" class="text-sm md:text-base text-app-text-secondary mt-1">
                <span class="hidden md:inline">{{ subtitle }}</span><span class="md:hidden">{{ subtitleShort || subtitle }}</span>
              </p>
            </div>
            <button type="button" aria-label="Close"
              class="w-10 h-10 rounded-full md:rounded-lg flex items-center justify-center bg-app-surface-subtle md:bg-transparent text-app-text-secondary hover:text-app-text-primary md:hover:bg-app-surface-subtle transition-colors focus-ring shrink-0"
              @click="requestClose">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </header>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto px-5 md:px-8 py-3">
            <slot />
          </div>

          <!-- Footer -->
          <footer class="p-5 md:p-8 pt-3 md:pt-4 space-y-3">
            <slot name="footer" :ask-discard="askDiscard" :request-close="requestClose" :save="() => emit('save')">
            <div class="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-3">
              <button type="button" :disabled="saving"
                class="order-2 md:order-1 px-6 py-3 md:py-3.5 text-sm md:text-base font-medium md:font-semibold text-app-text-secondary md:text-app-text-primary md:bg-app-surface-subtle md:hover:bg-app-border/40 hover:text-app-text-primary transition-colors focus-ring rounded-button md:rounded-2xl"
                @click="requestClose">
                Cancel
              </button>
              <button type="button" :disabled="saving"
                class="order-1 md:order-2 md:flex-1 flex items-center justify-center gap-2 px-6 py-3.5 min-h-[52px] rounded-2xl bg-app-primary text-white text-sm md:text-base font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs disabled:opacity-70 disabled:cursor-wait focus-ring"
                @click="emit('save')">
                <span v-if="saving" class="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                <Icon v-else name="lucide:check" class="w-4 h-4" />
                {{ saving ? 'Saving…' : saveLabel }}
              </button>
            </div>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>

    <!-- Discard confirmation -->
    <Transition name="dlg-fade">
      <div
        v-if="open && confirming"
        class="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-4"
      >
        <div class="absolute inset-0 bg-black/30" @click="confirming = false" />
        <div
          ref="confirmPanel"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="discard-title"
          aria-describedby="discard-desc"
          class="relative w-full max-w-md bg-app-surface border border-app-border rounded-card p-5 shadow-lg space-y-4"
          @keydown="onConfirmKeydown"
        >
          <div class="flex items-start gap-4">
            <span
              class="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center shrink-0"
            >
              <Icon name="lucide:trash-2" class="w-5 h-5" />
            </span>
            <div>
              <h3
                id="discard-title"
                class="text-lg font-bold text-app-text-primary"
              >
                {{ confirmTitle }}
              </h3>
              <p id="discard-desc" class="text-sm text-app-text-secondary mt-1">
                {{ confirmText }}
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button
              ref="keepBtn"
              type="button"
              class="py-3 min-h-[48px] rounded-button bg-app-surface-subtle text-sm font-semibold text-app-text-primary hover:bg-app-border/40 transition-colors focus-ring"
              @click="confirming = false"
            >
              {{ keepLabel }}
            </button>
            <button
              type="button"
              class="py-3 min-h-[48px] rounded-button bg-danger text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all focus-ring"
              @click="discard"
            >
              {{ confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean;
    title: string;
    subtitle: string;
    icon: string;
    tile: string;
    badge?: string;
    /** Phone-sized variants (the sheet is more compact than the desktop dialog). */
    badgeShort?: string;
    subtitleShort?: string;
    mobileIcon?: string;
    mobileTile?: string;
    /** True when the form has unsaved changes — closing then asks for confirmation. */
    dirty?: boolean;
    saving?: boolean;
    saveLabel?: string;
    /** Copy for the discard confirmation. */
    confirmTitle?: string;
    confirmText?: string;
    confirmLabel?: string;
    keepLabel?: string;
  }>(),
  {
    saveLabel: "Save Routine",
    confirmTitle: "Discard this entry?",
    confirmText: "Your entered notes and logs will not be saved.",
    confirmLabel: "Discard Entry",
    keepLabel: "Keep Editing",
  },
);

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save"): void;
  (e: "discard"): void;
}>();

const titleId = useId();
const descId = useId();
const panel = ref<HTMLElement>();
const confirmPanel = ref<HTMLElement>();
const keepBtn = ref<HTMLButtonElement>();
const confirming = ref(false);
const isMac = ref(false);

let opener: HTMLElement | null = null;

const requestClose = () => {
  if (props.saving) return;
  if (props.dirty) {
    confirming.value = true;
    nextTick(() => keepBtn.value?.focus());
  } else {
    emit("close");
  }
};

/** Open the confirmation directly (e.g. from a custom footer's Discard button). */
const askDiscard = () => {
  if (props.saving) return;
  confirming.value = true;
  nextTick(() => keepBtn.value?.focus());
};

// Confirmed: the parent decides what discarding means (close a draft, end a session…)
const discard = () => {
  confirming.value = false;
  emit("discard");
};

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const trapTab = (e: KeyboardEvent, root?: HTMLElement) => {
  if (e.key !== "Tab" || !root) return;
  const items = Array.from(
    root.querySelectorAll<HTMLElement>(FOCUSABLE),
  ).filter((el) => el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0]!;
  const last = items[items.length - 1]!;
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
};

const onKeydown = (e: KeyboardEvent) => {
  trapTab(e, panel.value);
  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
    e.preventDefault();
    emit("save");
  }
};
const onConfirmKeydown = (e: KeyboardEvent) => trapTab(e, confirmPanel.value);

// Escape: dismiss the discard prompt first, otherwise try to close
useEventListener("keydown", (e: KeyboardEvent) => {
  if (!props.open || e.key !== "Escape") return;
  e.preventDefault();
  if (confirming.value) confirming.value = false;
  else requestClose();
});

watch(
  () => props.open,
  async (isOpen) => {
    if (!import.meta.client) return;
    if (isOpen) {
      opener = document.activeElement as HTMLElement | null;
      document.documentElement.style.overflow = "hidden";
      confirming.value = false;
      await nextTick();
      panel.value
        ?.querySelector<HTMLElement>('input, button[role="radio"], textarea')
        ?.focus();
    } else {
      document.documentElement.style.overflow = "";
      opener?.focus?.();
    }
  },
);

onMounted(() => {
  isMac.value = /Mac|iPhone|iPad/.test(navigator.platform);
});

onBeforeUnmount(() => {
  if (import.meta.client) document.documentElement.style.overflow = "";
});
</script>

<style scoped>
/* Desktop: fade + gentle scale. Phones: slide up as a bottom sheet. */
.dlg-enter-active,
.dlg-leave-active {
  transition: opacity 0.2s ease;
}

.dlg-enter-active .dlg-panel,
.dlg-leave-active .dlg-panel {
  transition:
    transform 0.25s cubic-bezier(0.32, 0.72, 0, 1),
    opacity 0.2s ease;
}

.dlg-enter-from,
.dlg-leave-to {
  opacity: 0;
}

.dlg-enter-from .dlg-panel,
.dlg-leave-to .dlg-panel {
  transform: translateY(40px);
  opacity: 0.6;
}

@media (min-width: 768px) {
  .dlg-enter-from .dlg-panel,
  .dlg-leave-to .dlg-panel {
    transform: scale(0.97);
  }
}

.dlg-fade-enter-active,
.dlg-fade-leave-active {
  transition: opacity 0.15s ease;
}

.dlg-fade-enter-from,
.dlg-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .dlg-enter-active,
  .dlg-leave-active,
  .dlg-enter-active .dlg-panel,
  .dlg-leave-active .dlg-panel,
  .dlg-fade-enter-active,
  .dlg-fade-leave-active {
    transition: none;
  }
}
</style>