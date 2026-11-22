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
          <!-- Header -->
          <header class="flex items-start gap-4 p-5 md:p-6 pb-2 md:pb-3">
            <span
              :class="[
                'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
                tile,
              ]"
            >
              <Icon :name="icon" class="w-6 h-6" />
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h2
                  :id="titleId"
                  class="text-xl font-bold text-app-text-primary leading-tight"
                >
                  {{ title }}
                </h2>
                <span
                  v-if="badge"
                  class="px-2 py-0.5 rounded-md bg-app-primary-soft text-app-primary text-[10px] font-bold tracking-wider uppercase"
                  >{{ badge }}</span
                >
              </div>
              <p :id="descId" class="text-sm text-app-text-secondary mt-1">
                {{ subtitle }}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              class="p-2 -me-2 -mt-1 rounded-lg text-app-text-secondary hover:text-app-text-primary hover:bg-app-surface-subtle transition-colors focus-ring"
              @click="requestClose"
            >
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </header>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto px-5 md:px-6 py-4">
            <slot />
          </div>

          <!-- Footer -->
          <footer
            class="p-5 md:p-6 pt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          >
            <p
              class="hidden md:flex items-center gap-1.5 text-xs text-app-text-secondary"
            >
              <kbd
                class="px-1.5 py-0.5 rounded bg-app-surface-subtle font-mono text-[10px]"
                >Esc</kbd
              >
              cancel
              <span aria-hidden="true">·</span>
              <kbd
                class="px-1.5 py-0.5 rounded bg-app-surface-subtle font-mono text-[10px]"
                >{{ isMac ? "⌘" : "Ctrl" }}</kbd
              >
              <kbd
                class="px-1.5 py-0.5 rounded bg-app-surface-subtle font-mono text-[10px]"
                >↵</kbd
              >
              save
            </p>
            <div
              class="flex flex-col md:flex-row md:items-center gap-2 md:gap-3"
            >
              <button
                type="button"
                :disabled="saving"
                class="order-1 md:order-2 flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] md:min-h-[44px] rounded-button bg-app-primary text-white text-sm font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs disabled:opacity-70 disabled:cursor-wait focus-ring"
                @click="emit('save')"
              >
                <span
                  v-if="saving"
                  class="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                />
                <Icon v-else name="lucide:check-circle-2" class="w-4 h-4" />
                {{ saving ? "Saving…" : saveLabel }}
              </button>
              <button
                type="button"
                :disabled="saving"
                class="order-2 md:order-1 px-4 py-3 md:py-2.5 text-sm font-medium text-app-text-secondary hover:text-app-text-primary transition-colors focus-ring rounded-button"
                @click="requestClose"
              >
                <span class="hidden md:inline">Discard</span
                ><span class="md:hidden">Cancel &amp; Close</span>
              </button>
            </div>
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
                Discard this entry?
              </h3>
              <p id="discard-desc" class="text-sm text-app-text-secondary mt-1">
                Your entered notes and logs will not be saved.
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
              Keep Editing
            </button>
            <button
              type="button"
              class="py-3 min-h-[48px] rounded-button bg-danger text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all focus-ring"
              @click="discard"
            >
              Discard Entry
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
    /** True when the form has unsaved changes — closing then asks for confirmation. */
    dirty?: boolean;
    saving?: boolean;
    saveLabel?: string;
  }>(),
  { saveLabel: "Save Routine" },
);

const emit = defineEmits<{ (e: "close"): void; (e: "save"): void }>();

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

const discard = () => {
  confirming.value = false;
  emit("close");
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