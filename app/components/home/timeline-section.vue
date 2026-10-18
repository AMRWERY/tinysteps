<template>
  <div class="space-y-3">
    <!-- Header with Filter Pills -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Icon name="lucide:history" class="w-4 h-4 text-app-text-primary" />
        <h3 class="font-bold text-base text-app-text-primary">Today's Timeline</h3>
      </div>

      <div class="flex items-center gap-1 bg-app-surface-subtle p-1 rounded-xl text-xs font-semibold">
        <button v-for="filter in (['all', 'feed', 'sleep', 'diaper'] as EventType[])" :key="filter"
          @click="activeFilter = filter" :class="[
            'px-2.5 py-1 rounded-lg capitalize transition-colors',
            activeFilter === filter ? 'bg-app-surface text-app-text-primary shadow-xs' : 'text-app-text-secondary hover:text-app-text-primary'
          ]">
          {{ filter === 'feed' ? 'Feed' : filter }}
        </button>
      </div>
    </div>

    <!-- Items List -->
    <div class="space-y-2">
      <div v-for="item in filteredEvents" :key="item.id"
        class="bg-app-surface border border-app-border rounded-xl p-3.5 flex items-center justify-between hover:border-app-primary/50 transition-colors">
        <div class="flex items-center gap-3">
          <div :class="[
            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
            item.type === 'sleep' ? 'bg-app-primary-soft text-app-primary' : '',
            item.type === 'feed' ? 'bg-app-accent-soft text-app-accent' : '',
            item.type === 'diaper' ? 'bg-app-surface-subtle text-app-text-primary' : ''
          ]">
            <Icon
              :name="item.type === 'sleep' ? 'lucide:moon' : item.type === 'feed' ? 'lucide:utensils' : 'lucide:droplet'"
              class="w-5 h-5" />
          </div>

          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-sm text-app-text-primary">{{ item.title }}</span>
              <span v-if="item.badge"
                class="px-2 py-0.5 text-[10px] rounded-md font-semibold bg-app-surface-subtle text-app-text-secondary">
                {{ item.badge }}
              </span>
            </div>
            <p class="text-xs text-app-text-secondary mt-0.5">{{ item.subtitle }}</p>
          </div>
        </div>

        <div class="text-right">
          <span class="font-bold text-sm text-app-text-primary block font-mono">{{ item.amount || item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimelineItem, EventType } from '~/types/home'

const activeFilter = ref<EventType>('all')

const events = ref<TimelineItem[]>([
  {
    id: '1',
    type: 'sleep',
    title: 'Morning Nap',
    badge: 'Active Now',
    time: '42m',
    subtitle: 'Started 08:30 AM • Nursery Crib',
    isActive: true
  },
  {
    id: '2',
    type: 'feed',
    title: 'Nursing (Left Side)',
    badge: '18m Duration',
    amount: '120 ml eq.',
    time: '08:05 AM',
    subtitle: '08:05 AM • Calm feeding, no spit up'
  },
  {
    id: '3',
    type: 'diaper',
    title: 'Diaper Change',
    badge: 'Wet',
    amount: 'Checked',
    time: '07:50 AM',
    subtitle: '07:50 AM • Morning fresh start'
  }
])

const filteredEvents = computed(() => {
  if (activeFilter.value === 'all') return events.value
  return events.value.filter(e => e.type === activeFilter.value)
})
</script>