<template>
  <div class="contents">
    <!-- Center Primary Content Column -->
    <div class="flex-1 max-w-[860px] min-w-0 space-y-5">
      <!-- Baby Profile Hero Banner -->
      <baby-profile-hero-banner />

      <!-- Active Sleep Session Component -->
      <active-sleep-session />

      <!-- Instant Logging Hub Component -->
      <quick-log-hub @log="handleQuickLog" />

      <!-- Today's Timeline Component -->
      <timeline-section />
    </div>

    <!-- Right Column: Shell Spec & Guidelines Rail Component -->
    <spec-rail :is-collapsed="false" />
  </div>
</template>

<script setup lang="ts">
const handleQuickLog = (type: string) => {
  console.log('Quick log action triggered:', type)
}
</script>