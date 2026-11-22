<template>
  <article class="bg-app-surface border border-app-border rounded-2xl p-4 md:p-5 flex items-start gap-3.5 md:gap-4 shadow-xs">
    <span :class="['w-11 h-11 md:w-14 md:h-14 rounded-full md:rounded-2xl flex items-center justify-center shrink-0', routineTypeMeta[entry.type].tile]">
      <Icon :name="routineTypeMeta[entry.type].icon" class="w-5 h-5 md:w-6 md:h-6" />
    </span>

    <div class="min-w-0 flex-1 space-y-1.5">
      <div class="flex items-center gap-x-2 gap-y-1 flex-wrap">
        <h3 class="text-base md:text-lg font-bold text-app-text-primary leading-tight">{{ entry.title }}</h3>
        <span class="text-sm text-app-text-secondary">• {{ entry.clock }}</span>
        <span :class="['px-2.5 py-0.5 rounded-full text-xs font-semibold', badgeClass(entry.badgeColor)]">{{ entry.badge }}</span>
      </div>
      <p v-if="entry.metric" class="flex items-center gap-1.5 text-sm text-app-text-secondary">
        <Icon :name="metricIcon" class="w-4 h-4" :class="metricColor" />
        <strong :class="['font-semibold', metricColor]">{{ entry.metric.value }}</strong>
        <span>• {{ entry.metric.label }}</span>
      </p>
      <p class="text-sm text-app-text-secondary italic leading-relaxed">“{{ entry.description }}”</p>
      <p v-if="entry.loggedBy" class="flex items-center gap-1 text-xs text-app-text-secondary">
        <Icon name="lucide:user" class="w-3 h-3" /> Logged by {{ entry.loggedBy }}
      </p>
    </div>

    <div class="flex items-start gap-2 shrink-0">
      <span v-if="ago" class="hidden sm:inline text-sm text-app-text-secondary mt-1.5 whitespace-nowrap">{{ ago }}</span>

      <div ref="root" class="relative">
        <button type="button" aria-haspopup="menu" :aria-expanded="open" :aria-label="`Options for ${entry.title}`"
          class="w-10 h-10 rounded-xl flex items-center justify-center text-app-text-secondary hover:bg-app-surface-subtle transition-colors focus-ring"
          @click="toggle">
          <Icon name="lucide:ellipsis" class="w-5 h-5" />
        </button>

        <Transition name="menu">
          <div v-if="open" role="menu" :aria-label="`${typeLabel} options`"
            class="absolute end-0 top-full mt-1 z-20 w-60 bg-app-surface border border-app-border rounded-2xl shadow-lg p-2"
            @keydown.esc.stop="close(true)">
            <p class="px-3 pt-1.5 pb-1 text-[11px] font-bold tracking-wider text-app-text-secondary">{{ typeLabel.toUpperCase() }} OPTIONS</p>
            <button ref="firstItem" type="button" role="menuitem" class="menu-item" @click="choose('edit')">
              <Icon name="lucide:pencil" class="w-4 h-4" /> Edit Entry
            </button>
            <button type="button" role="menuitem" class="menu-item" @click="choose('duplicate')">
              <Icon name="lucide:copy" class="w-4 h-4" /> Duplicate {{ typeLabel }}
            </button>
            <div class="my-1 h-px bg-app-border" />
            <button type="button" role="menuitem" class="menu-item text-danger hover:!bg-danger/10" @click="choose('delete')">
              <Icon name="lucide:trash-2" class="w-4 h-4" /> Delete Entry
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { TimelineEntry } from '~/types/home'

const props = defineProps<{ entry: TimelineEntry }>()
const emit = defineEmits<{ (e: 'edit'): void; (e: 'duplicate'): void; (e: 'delete'): void }>()

const { now } = useSleepSession()

const typeLabel = computed(() => ({ feed: 'Feed', sleep: 'Sleep', diaper: 'Diaper' }[props.entry.type]))
const ago = computed(() => (props.entry.at ? formatAgo(props.entry.at, now.value) : ''))

const metricIcon = computed(() => ({ feed: 'lucide:cup-soda', sleep: 'lucide:timer', diaper: 'lucide:droplet' }[props.entry.type]))
const metricColor = computed(() => ({ feed: 'text-app-accent', sleep: 'text-app-primary', diaper: 'text-app-text-secondary' }[props.entry.type]))

// Popover menu: closes on outside click / Escape and returns focus to its button
const root = ref<HTMLElement>()
const firstItem = ref<HTMLButtonElement>()
const open = ref(false)

const toggle = async () => {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    firstItem.value?.focus()
  }
}
const close = (refocus = false) => {
  open.value = false
  if (refocus) root.value?.querySelector<HTMLButtonElement>('button[aria-haspopup]')?.focus()
}
onClickOutside(root, () => close())

const choose = (action: 'edit' | 'duplicate' | 'delete') => {
  close()
  emit(action)
}
</script>

<style scoped>
.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  color: rgb(var(--color-text-primary));
  text-align: start;
  transition: background-color 0.15s ease;
}

.menu-item:hover,
.menu-item:focus-visible {
  background: rgb(var(--color-surface-subtle));
  outline: none;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
