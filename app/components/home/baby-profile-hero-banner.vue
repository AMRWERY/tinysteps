<template>
  <div>
    <div
      class="bg-app-surface border border-app-border rounded-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
      <div class="flex items-center gap-3.5">
        <div
          class="w-12 h-12 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center shrink-0">
          <Icon name="lucide:smile" class="w-6 h-6" />
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h2 class="text-xl font-bold text-app-text-primary leading-none">Maya</h2>
            <span
              class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-app-surface-subtle text-app-text-secondary">
              12 weeks old
            </span>
            <span
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-app-surface-subtle text-app-success">
              <span class="w-1.5 h-1.5 rounded-full bg-app-success" />
              On Track
            </span>
          </div>
          <p class="text-xs text-app-text-secondary mt-1">
            Tuesday, Oct 24 • Morning Routine Cycle
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <!-- Predicted Window -->
        <div class="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-app-surface-subtle text-left">
          <div class="w-7 h-7 rounded-lg bg-app-surface text-app-accent flex items-center justify-center shrink-0">
            <Icon name="lucide:bell" class="w-4 h-4" />
          </div>
          <div>
            <span class="text-[10px] text-app-text-secondary block font-medium">Predicted Window</span>
            <span class="text-xs font-bold text-app-text-primary">Nap in ~35m (10:15 AM)</span>
          </div>
        </div>

        <!-- Quick Log Action -->
        <button type="button"
          class="flex items-center gap-1.5 px-4 py-2.5 rounded-button bg-app-primary text-white font-semibold text-sm hover:bg-app-primary-hover active:scale-[0.98] transition-all min-h-[44px] shadow-xs">
          <Icon name="lucide:plus" class="w-4 h-4" />
          <span>Quick Log</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>