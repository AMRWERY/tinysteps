<template>
  <v-dialog :open="startOpen" title="Start Sleep Session" subtitle="Quiet routine in progress"
    icon="lucide:moon" tile="bg-app-primary-soft text-app-primary" save-label="Start Sleep Timer"
    @close="startOpen = false" @save="begin">
    <div class="space-y-4">
      <p class="bg-app-surface-subtle rounded-2xl p-4 text-[15px] leading-relaxed text-app-text-secondary">
        Recording {{ baby.name }}'s rest as it happens. Tap when her eyes close—you can always adjust times later.
      </p>

      <div :class="['bg-app-surface-subtle rounded-2xl p-4 flex items-center gap-3', error ? 'ring-2 ring-danger/60' : '']">
        <Icon name="lucide:clock" class="w-6 h-6 text-app-primary shrink-0" />
        <div class="min-w-0 flex-1">
          <p class="text-sm text-app-text-secondary">{{ editing ? 'Started at' : 'Starting Now' }}</p>
          <p v-if="!editing" class="text-xl font-bold text-app-text-primary">Today, {{ timeLabel }}</p>
          <input v-else id="sleep-start-time" v-model="time" type="time" aria-label="Sleep start time"
            class="mt-0.5 w-full max-w-[200px] rounded-xl bg-app-surface px-3 py-2 text-lg font-bold text-app-text-primary outline-none border border-transparent focus:border-app-primary" />
        </div>
        <button type="button"
          class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-app-surface text-sm font-semibold text-app-text-primary shadow-xs hover:bg-app-primary-soft transition-colors focus-ring"
          @click="toggleEdit">
          <Icon :name="editing ? 'lucide:check' : 'lucide:pencil'" class="w-4 h-4" />
          {{ editing ? 'Done' : 'Edit' }}
        </button>
      </div>
      <p v-if="error" class="flex items-center gap-1.5 text-xs text-danger -mt-2" role="alert">
        <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ error }}
      </p>
    </div>

    <template #footer>
      <div class="space-y-2">
        <button type="button"
          class="w-full flex items-center justify-center gap-2.5 px-6 py-4 min-h-[56px] rounded-2xl bg-app-primary text-white text-base font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs focus-ring"
          @click="begin">
          <Icon name="lucide:play" class="w-4 h-4" /> Start Sleep Timer
        </button>
        <button type="button"
          class="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-app-primary hover:underline focus-ring rounded-xl"
          @click="logCompleted">
          <Icon name="lucide:history" class="w-5 h-5" /> Log Completed Sleep Instead
        </button>
      </div>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import type { TimelineEntry } from '~/types/home'

const emit = defineEmits<{ (e: 'done', message: string): void }>()

const { startOpen, start } = useSleepSession()
const { openLogger } = useRoutineLogger()
const timelineEntries = useTimelineEntries()
const settings = useAppSettings()
const { baby, caregiver } = useBabyProfile()

const time = ref(nowHHmm())
const editing = ref(false)
const error = ref('')

const timeLabel = computed(() => formatClock(time.value, settings.value.timeFormat))

watch(startOpen, (isOpen) => {
  if (!isOpen) return
  time.value = nowHHmm()
  editing.value = false
  error.value = ''
}, { flush: 'sync' })

const toggleEdit = () => { editing.value = !editing.value }

const begin = () => {
  // Untouched = "right now"; an edited time can only be earlier than now
  const startMs = editing.value || time.value !== nowHHmm() ? withTime(Date.now(), time.value) : Date.now()
  if (!time.value) { error.value = 'Please choose when sleep started.'; return }
  if (startMs > Date.now() + 60_000) { error.value = "Start time can't be in the future."; return }

  start(startMs)

  const entry: TimelineEntry = {
    id: `sleep-${Date.now()}`, type: 'sleep', title: 'Nap (In Progress)', badge: 'Active', badgeColor: 'primary',
    isActive: true, at: startMs, clock: `Started ${formatClock(msToHHmm(startMs), settings.value.timeFormat)}`,
    description: 'Quiet routine in progress', loggedBy: caregiver.name,
  }
  timelineEntries.value = [entry, ...timelineEntries.value.filter(e => !e.isActive)]

  startOpen.value = false
  emit('done', `Sleep timer started for ${baby.name}`)
}

const logCompleted = () => {
  startOpen.value = false
  openLogger('sleep')
}
</script>
