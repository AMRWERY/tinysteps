<template>
  <aside class="w-[300px] shrink-0 space-y-4 hidden xl:block">
    <!-- Shell Specifications -->
    <div class="bg-app-surface border border-app-border rounded-card p-4 space-y-3">
      <div class="flex items-center gap-2">
        <Icon icon="lucide:layout" class="w-4 h-4 text-app-primary" />
        <h4 class="font-bold text-sm text-app-text-primary">Shell Specifications</h4>
      </div>
      <p class="text-xs text-app-text-secondary leading-relaxed">
        Implementation details grounded in Serene Nurture guidelines for desktop viewports.
      </p>

      <div class="space-y-1.5 text-xs">
        <div class="flex justify-between p-2 rounded-lg bg-app-surface-subtle">
          <span class="text-app-text-secondary">Desktop Rail Width</span>
          <span class="font-semibold text-app-text-primary">260px (Fixed Left)</span>
        </div>
        <div class="flex justify-between p-2 rounded-lg bg-app-surface-subtle">
          <span class="text-app-text-secondary">Tablet Rail Width</span>
          <span class="font-semibold text-app-text-primary">78px (Collapsed)</span>
        </div>
        <div class="flex justify-between p-2 rounded-lg bg-app-surface-subtle">
          <span class="text-app-text-secondary">Max Container Width</span>
          <span class="font-semibold text-app-text-primary">1240px (max-w-6xl)</span>
        </div>
        <div class="flex justify-between p-2 rounded-lg bg-app-surface-subtle">
          <span class="text-app-text-secondary">Primary Surface Tint</span>
          <span class="font-semibold text-app-text-primary">#F7F6F1 • Calm Off-White</span>
        </div>
      </div>

      <button @click="emit('toggleRail')"
        class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-button border border-app-border text-xs font-semibold text-app-text-primary bg-app-surface hover:bg-app-surface-subtle transition-colors">
        <Icon icon="lucide:arrow-left-right" class="w-3.5 h-3.5" />
        <span>{{ isCollapsed ? 'Expand Desktop Rail' : 'Simulate Tablet Rail Collapse' }}</span>
      </button>
    </div>

    <!-- Interactive State Matrix -->
    <div class="bg-app-surface border border-app-border rounded-card p-4 space-y-3">
      <div class="flex items-center gap-2">
        <Icon icon="lucide:mouse-pointer" class="w-4 h-4 text-app-primary" />
        <h4 class="font-bold text-sm text-app-text-primary">Interactive State Matrix</h4>
      </div>
      <p class="text-xs text-app-text-secondary">Live states enforced across desktop navigation elements:</p>

      <div class="space-y-1.5 text-xs">
        <div
          class="flex items-center justify-between p-2 rounded-lg bg-app-primary-soft text-app-primary font-semibold">
          <div class="flex items-center gap-2">
            <Icon icon="lucide:layout-grid" class="w-4 h-4" />
            <span>Active State</span>
          </div>
          <code class="text-[10px] font-mono opacity-80">bg-primary-soft</code>
        </div>

        <div
          class="flex items-center justify-between p-2 rounded-lg hover:bg-app-surface-subtle text-app-text-secondary transition-colors cursor-pointer">
          <div class="flex items-center gap-2">
            <Icon icon="lucide:history" class="w-4 h-4" />
            <span>Hover Over Me</span>
          </div>
          <code class="text-[10px] font-mono">hover:bg-subtle</code>
        </div>

        <div
          class="flex items-center justify-between p-2 rounded-lg ring-2 ring-app-primary text-app-text-primary font-medium">
          <div class="flex items-center gap-2">
            <Icon icon="lucide:focus" class="w-4 h-4" />
            <span>Focus-Visible Ring</span>
          </div>
          <code class="text-[10px] font-mono">ring-2 ring-primary</code>
        </div>

        <div
          class="flex items-center justify-between p-2 rounded-lg active:scale-[0.98] bg-app-surface-subtle text-app-text-primary cursor-pointer">
          <div class="flex items-center gap-2">
            <Icon icon="lucide:touchpad" class="w-4 h-4" />
            <span>Pressed State</span>
          </div>
          <code class="text-[10px] font-mono">scale-[0.98]</code>
        </div>
      </div>
    </div>

    <!-- Accessibility & Motion Specs -->
    <div class="bg-app-surface border border-app-border rounded-card p-4 space-y-3">
      <h4 class="font-bold text-sm text-app-text-primary">Accessibility & Motion Specs</h4>

      <div class="grid grid-cols-2 gap-2 text-xs">
        <div class="bg-app-surface-subtle p-2 rounded-lg">
          <span class="text-[10px] text-app-text-secondary block">Transitions</span>
          <span class="font-bold text-app-text-primary">180ms ease</span>
        </div>
        <div class="bg-app-surface-subtle p-2 rounded-lg">
          <span class="text-[10px] text-app-text-secondary block">Min Touch Target</span>
          <span class="font-bold text-app-text-primary">44 × 44px</span>
        </div>
        <div class="bg-app-surface-subtle p-2 rounded-lg">
          <span class="text-[10px] text-app-text-secondary block">Contrast Standard</span>
          <span class="font-bold text-app-success">WCAG AA Compliant</span>
        </div>
        <div class="bg-app-surface-subtle p-2 rounded-lg">
          <span class="text-[10px] text-app-text-secondary block">Reduced-Motion</span>
          <span class="font-bold text-app-text-primary">Respected</span>
        </div>
      </div>

      <div class="p-2.5 rounded-lg bg-app-accent-soft/60 flex items-start gap-2 text-xs text-app-text-primary">
        <Icon icon="lucide:shield-check" class="w-4 h-4 text-app-accent shrink-0 mt-0.5" />
        <span class="text-[11px] leading-snug">Zero harsh clinical contrasts. Built for night awakenings.</span>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{
  isCollapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleRail'): void
}>()
</script>