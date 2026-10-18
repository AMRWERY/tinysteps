<template>
  <aside class="space-y-4">

    <!-- ── October 2023 Calendar ──────────────────────────────── -->
    <div class="bg-app-surface border border-app-border rounded-card p-4 space-y-3 shadow-xs">
      <div class="flex items-center justify-between">
        <h4 class="font-bold text-sm text-app-text-primary">October 2023</h4>
        <div class="flex items-center gap-0.5">
          <button class="p-1 rounded-md text-app-text-secondary hover:bg-app-surface-subtle transition-colors">
            <Icon name="lucide:chevron-left" class="w-4 h-4" />
          </button>
          <button class="p-1 rounded-md text-app-text-secondary hover:bg-app-surface-subtle transition-colors">
            <Icon name="lucide:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Day-of-week labels -->
      <div class="grid grid-cols-7 text-center text-[11px] font-semibold text-app-text-secondary">
        <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
      </div>

      <!-- Calendar days -->
      <div class="grid grid-cols-7 gap-y-0.5 text-center text-xs">
        <!-- Sep overflow -->
        <span v-for="d in [25, 26, 27, 28, 29, 30]" :key="`s${d}`" class="py-1.5 text-app-text-secondary/40">{{ d }}</span>
        <span class="py-1.5 text-app-text-primary font-medium">1</span>

        <span v-for="d in [2, 3, 4, 5, 6]" :key="d" class="py-1.5 text-app-text-primary font-medium">{{ d }}</span>
        <span class="py-1.5 text-app-text-secondary/40">7</span>
        <span class="py-1.5 text-app-text-secondary/40">8</span>

        <span v-for="d in [9, 10, 11, 12, 13]" :key="d" class="py-1.5 text-app-text-primary font-medium">{{ d }}</span>
        <span class="py-1.5 text-app-text-secondary/40">14</span>
        <span class="py-1.5 text-app-text-secondary/40">15</span>

        <span v-for="d in [16, 17, 18, 19, 20]" :key="d" class="py-1.5 text-app-text-primary font-medium">{{ d }}</span>
        <span class="py-1.5 text-app-text-secondary/40">21</span>
        <span class="py-1.5 text-app-text-secondary/40">22</span>

        <!-- 23 = selected, 24 = today outline -->
        <button
          class="py-1.5 w-7 h-7 mx-auto flex items-center justify-center rounded-full bg-app-primary text-white text-xs font-bold shadow-xs">
          23
        </button>
        <button
          class="py-1.5 w-7 h-7 mx-auto flex items-center justify-center rounded-full border border-app-primary text-app-primary text-xs font-bold">
          24
        </button>
        <span v-for="d in [25, 26, 27, 28, 29]" :key="d" class="py-1.5 text-app-text-primary font-medium">{{ d }}</span>

        <span v-for="d in [30, 31]" :key="d" class="py-1.5 text-app-text-primary font-medium">{{ d }}</span>
        <!-- Nov overflow -->
        <span v-for="d in [1, 2, 3, 4, 5]" :key="`n${d}`" class="py-1.5 text-app-text-secondary/40">{{ d }}</span>
      </div>

      <!-- Quick Jump -->
      <div class="pt-2 border-t border-app-border">
        <div class="flex items-center justify-between text-xs">
          <span class="text-app-text-secondary font-semibold">Quick Jump:</span>
          <button
            class="font-semibold text-app-text-secondary hover:text-app-primary transition-colors">Yesterday</button>
          <button class="font-semibold text-app-text-secondary hover:text-app-primary transition-colors">2 days
            ago</button>
          <button class="font-semibold text-app-text-secondary hover:text-app-primary transition-colors">This
            week</button>
        </div>
      </div>
    </div>

    <!-- ── Reflections on Routine ─────────────────────────────── -->
    <div class="bg-app-surface border border-app-border rounded-card p-4 space-y-3 shadow-xs">
      <div class="flex items-center gap-2">
        <Icon name="lucide:sprout" class="w-4 h-4 text-app-primary" />
        <h4 class="font-bold text-sm text-app-text-primary">Reflections on Routine</h4>
      </div>
      <p class="text-xs text-app-text-secondary leading-relaxed">
        Looking back at past days can help spot comfortable rhythms, but remember sleep and feeding vary from day to day
        as Maya grows. There is no "perfect" score—you are doing great.
      </p>

      <!-- Feed Interval indicator -->
      <div class="flex items-center gap-3 p-2.5 rounded-xl bg-app-surface-subtle">
        <!-- Circular progress SVG -->
        <div class="relative w-9 h-9 shrink-0">
          <svg viewBox="0 0 36 36" class="w-9 h-9 -rotate-90">
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgb(var(--color-border))" stroke-width="3.5" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgb(var(--color-primary))" stroke-width="3.5"
              stroke-dasharray="60 88" stroke-linecap="round" />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <Icon name="lucide:clock" class="w-3 h-3 text-app-primary" />
          </div>
        </div>
        <div>
          <span class="text-xs font-bold text-app-text-primary block">3–4h Feed Intervals</span>
          <span class="text-[10px] text-app-text-secondary">Healthy steady daytime spacing</span>
        </div>
      </div>
    </div>

    <!-- ── Daily Memory / Photo Milestone ─────────────────────── -->
    <div class="bg-app-surface border border-app-border rounded-card overflow-hidden shadow-xs">
      <div class="relative h-40">
        <img src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&auto=format&fit=crop&q=80"
          alt="Maya tummy time Oct 23" class="w-full h-full object-cover" />
        <span
          class="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm">
          <Icon name="lucide:camera" class="w-3 h-3" />
          Oct 23 • Tummy time smile
        </span>
      </div>
      <div class="p-3 flex items-center justify-between">
        <span class="text-xs text-app-text-secondary">Maya lifted her head for 45s</span>
        <button class="text-xs font-semibold text-app-primary hover:underline flex items-center gap-1">
          Add memory
          <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- ── Caregiver PDF Digest ────────────────────────────────── -->
    <div class="bg-app-surface border border-app-border rounded-card p-4 flex items-center justify-between shadow-xs">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-app-primary-soft text-app-primary flex items-center justify-center shrink-0">
          <Icon name="lucide:file-text" class="w-4 h-4" />
        </div>
        <div>
          <h5 class="text-xs font-bold text-app-text-primary">Caregiver PDF Digest</h5>
          <p class="text-[10px] text-app-text-secondary">Ready for pediatrician review</p>
        </div>
      </div>
      <button @click="emit('exportDigest')"
        class="px-3 py-1.5 rounded-button border border-app-border text-xs font-semibold text-app-text-primary hover:bg-app-surface-subtle transition-colors shadow-xs flex items-center gap-1.5">
        <Icon name="lucide:download" class="w-3.5 h-3.5" />
        Export
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'exportDigest'): void;
}>();
</script>