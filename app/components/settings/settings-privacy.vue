<template>
  <section class="bg-app-surface border border-app-border rounded-card p-5 sm:p-6 space-y-4 shadow-xs">
    <h2 class="flex items-center gap-2 text-lg font-bold text-app-text-primary pb-3 border-b border-app-border">
      <Icon name="lucide:shield-check" class="w-5 h-5" />
      <span class="hidden sm:inline">Data Ownership &amp; Privacy</span><span class="sm:hidden">Your Data &amp; Privacy</span>
    </h2>

    <!-- Private by architecture -->
    <div class="flex items-start gap-3 rounded-2xl p-4 bg-app-primary-soft/60 sm:bg-app-accent-soft/50 border border-app-border">
      <Icon name="lucide:lock" class="w-5 h-5 text-app-text-secondary shrink-0 mt-0.5 hidden sm:block" />
      <Icon name="lucide:shield-check" class="w-5 h-5 text-app-primary shrink-0 mt-0.5 sm:hidden" />
      <div>
        <p class="hidden sm:block text-base font-bold text-app-text-primary">Private by Architecture</p>
        <p class="text-sm text-app-text-secondary leading-relaxed sm:mt-1">
          <span class="hidden sm:inline">TinySteps stores nursery data directly on your device. We do not sell behavioural data, inject tracking scripts, or build ad profiles from your child's biological rhythms.</span>
          <span class="sm:hidden">Zero third-party trackers or health advertising. Your logs belong entirely to your family and stay stored on this device.</span>
        </p>
      </div>
    </div>

    <!-- Export -->
    <div class="bg-app-surface-subtle rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="min-w-0">
        <p class="text-base font-bold text-app-text-primary">
          <span class="hidden sm:inline">Caregiver &amp; Pediatrician Export</span><span class="sm:hidden">Export Data (JSON / CSV)</span>
        </p>
        <p class="text-xs text-app-text-secondary mt-0.5">
          <span class="hidden sm:inline">Generate formatted medical records including 24h intake, diaper counts, and wake windows.</span>
          <span class="sm:hidden">Download a complete copy of {{ babyName }}'s logs.</span>
        </p>
        <div class="hidden sm:flex gap-2 mt-3">
          <span v-for="f in ['PDF Summary', 'CSV Spreadsheet', 'JSON Raw Archive']" :key="f"
            class="px-2 py-1 rounded-md bg-app-surface border border-app-border font-mono text-[10px] text-app-text-secondary">{{ f }}</span>
        </div>
      </div>
      <button type="button"
        class="flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-button bg-app-primary text-white text-sm font-semibold hover:bg-app-primary-hover active:scale-[0.98] transition-all shadow-xs shrink-0 focus-ring"
        @click="emit('export')">
        <Icon name="lucide:download" class="w-4 h-4" /> Export Log Archive
      </button>
    </div>

    <!-- Delete -->
    <div class="rounded-2xl p-4 border border-danger/25 bg-danger/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p class="text-base font-bold text-danger">
          <span class="hidden sm:inline">Delete Baby Profile &amp; Data</span><span class="sm:hidden">Delete All Stored Routines</span>
        </p>
        <p class="text-xs text-app-text-secondary mt-0.5">
          <span class="hidden sm:inline">Instantly clean the local database cache and remove {{ babyName }}'s profile.</span>
          <span class="sm:hidden">Clears sleep, feeds &amp; diapers from this device.</span>
        </p>
      </div>
      <button type="button"
        class="flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-button border border-danger/40 text-danger text-sm font-semibold hover:bg-danger/10 transition-colors shrink-0 focus-ring"
        @click="emit('delete')">
        <Icon name="lucide:trash-2" class="w-4 h-4" /> Purge Database
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: 'export'): void; (e: 'delete'): void }>()
const { baby } = useBabyProfile()
const babyName = baby.name
</script>
