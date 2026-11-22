<template>
  <section class="bg-app-surface border border-app-border rounded-card p-5 sm:p-6 space-y-3 shadow-xs">
    <div class="flex items-center justify-between pb-3 border-b border-app-border">
      <h2 class="flex items-center gap-2 text-lg font-bold text-app-text-primary">
        <Icon name="lucide:users" class="w-5 h-5" />
        <span class="hidden sm:inline">Caregivers &amp; Sync</span><span class="sm:hidden">Care Circle</span>
      </h2>
      <span class="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-app-success">
        <span class="w-1.5 h-1.5 rounded-full bg-app-success" /> Peer Encrypted
      </span>
      <span class="sm:hidden px-2.5 py-1 rounded-full bg-app-primary-soft text-app-primary text-[11px] font-semibold">Active Profile</span>
    </div>

    <!-- Alex -->
    <div class="flex items-center gap-3 bg-app-surface-subtle sm:bg-transparent sm:border sm:border-app-border rounded-2xl p-3.5">
      <span class="w-10 h-10 rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center text-sm font-bold shrink-0">AL</span>
      <div class="min-w-0 flex-1">
        <p class="flex items-center gap-2 text-sm font-bold text-app-text-primary">
          Alex Morgan
          <span class="px-2 py-0.5 rounded-md bg-app-primary text-white text-[10px] font-semibold">Primary</span>
        </p>
        <p class="text-xs text-app-text-secondary truncate">This active session • alex@nursery.local</p>
      </div>
      <button type="button" class="hidden sm:inline-flex px-3 py-1.5 rounded-lg border border-app-border text-xs font-semibold text-app-text-primary hover:bg-app-surface-subtle transition-colors">Edit Name</button>
      <button type="button" aria-label="Edit name" class="sm:hidden w-10 h-10 rounded-full bg-app-surface flex items-center justify-center text-app-text-secondary">
        <Icon name="lucide:pencil" class="w-4 h-4" />
      </button>
    </div>

    <!-- Jordan (sm+) -->
    <div class="hidden sm:flex items-center gap-3 border border-app-border rounded-2xl p-3.5">
      <span class="w-10 h-10 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center text-sm font-bold shrink-0">JD</span>
      <div class="min-w-0 flex-1">
        <p class="flex items-center gap-2 text-sm font-bold text-app-text-primary">
          Jordan Diaz
          <span class="px-2 py-0.5 rounded-md bg-app-surface-subtle text-app-text-secondary text-[10px] font-semibold">Full Editor</span>
        </p>
        <p class="text-xs text-app-text-secondary">Last synchronized: 14 mins ago via Bluetooth Beacon</p>
      </div>
      <button type="button" aria-label="Caregiver settings" class="p-2 text-app-text-secondary hover:text-app-text-primary">
        <Icon name="lucide:settings" class="w-4 h-4" />
      </button>
    </div>

    <!-- Baby (phones) -->
    <nuxt-link-locale to="/baby-profile" class="sm:hidden flex items-center gap-3 bg-app-surface-subtle rounded-2xl p-3.5">
      <span class="w-10 h-10 rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0">
        <Icon name="lucide:smile" class="w-5 h-5" />
      </span>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-bold text-app-text-primary">{{ baby.name }}</p>
        <p class="text-xs text-app-text-secondary">{{ baby.ageLabel.replace('mo', 'months old') }} • Tap to open profile</p>
      </div>
      <Icon name="lucide:chevron-right" class="w-4 h-4 text-app-text-secondary rtl:rotate-180" />
    </nuxt-link-locale>

    <button type="button"
      class="hidden sm:flex w-full items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-app-border text-sm text-app-text-secondary hover:text-app-text-primary hover:border-app-primary/50 transition-colors">
      <Icon name="lucide:user-plus" class="w-4 h-4" /> Invite Partner, Doula, or Night Nurse (Local QR Key)
    </button>
  </section>
</template>

<script setup lang="ts">
const { baby } = useBabyProfile()
</script>
