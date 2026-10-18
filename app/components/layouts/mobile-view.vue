<template>
  <div class="md:hidden flex flex-col min-h-screen pb-24 bg-app-bg text-app-text-primary">
    <!-- Top Bar -->
    <header
      class="sticky top-0 z-20 bg-app-bg/95 backdrop-blur-sm border-b border-app-border px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-app-primary-soft text-app-primary flex items-center justify-center">
          <Icon name="lucide:map-pin" class="w-4 h-4" />
        </div>
        <span class="font-bold text-base text-app-text-primary">TinySteps</span>
        <span
          class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-app-surface-subtle text-app-text-secondary ml-1">
          <span class="w-1.5 h-1.5 rounded-full bg-app-success"></span>
          Maya
        </span>
      </div>

      <div class="flex items-center gap-2">
        <LazyVLocaleSwitcher />
        <LazyVThemeSwitcher />
        <img src="/img/img-01.png" alt="Maya" class="w-8 h-8 rounded-full object-cover border border-app-border" />
      </div>
    </header>

    <main class="p-4 space-y-4">
      <!-- Active Session banner -->
      <div class="bg-app-primary-soft/40 border border-app-primary/20 rounded-card p-4 space-y-3">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-app-surface text-app-primary flex items-center justify-center shadow-xs">
              <Icon name="lucide:moon" class="w-5 h-5" />
            </div>
            <div>
              <div class="flex items-center gap-1.5 text-[11px] font-bold text-app-primary tracking-wider uppercase">
                <span class="w-2 h-2 rounded-full bg-app-success animate-pulse"></span>
                ACTIVE SESSION • Nursery Crib
              </div>
              <h2 class="text-xl font-bold text-app-text-primary">
                Sleeping for <span class="font-mono">48m 15s</span>
              </h2>
            </div>
          </div>

          <button
            class="flex items-center gap-1.5 px-4 py-2 rounded-full bg-app-surface border border-app-border text-sm font-semibold text-app-text-primary hover:bg-app-surface-subtle active:scale-95 transition-all shadow-xs">
            <Icon name="lucide:check" class="w-4 h-4 text-app-success" />
            Wake
          </button>
        </div>

        <div
          class="flex items-center justify-between text-xs text-app-text-secondary pt-2 border-t border-app-primary/10">
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:waves" class="w-3.5 h-3.5" />
            <span>White Noise (Rain • 42dB)</span>
          </div>
          <span>Started 1:15 PM</span>
        </div>
      </div>

      <!-- Quick Log Section -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-base text-app-text-primary">Quick Log</h3>
          <span class="text-xs text-app-text-secondary">One-tap entry</span>
        </div>

        <div class="grid grid-cols-3 gap-2.5">
          <button
            class="bg-app-surface border border-app-border rounded-2xl p-3 flex flex-col items-center justify-center text-center active:scale-95 transition-transform">
            <div
              class="w-11 h-11 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center mb-1.5">
              <Icon name="lucide:utensils" class="w-5 h-5" />
            </div>
            <span class="font-bold text-xs text-app-text-primary">Feed</span>
            <span class="text-[10px] text-app-text-secondary">2h 15m ago</span>
          </button>

          <button
            class="bg-app-surface border border-app-border rounded-2xl p-3 flex flex-col items-center justify-center text-center active:scale-95 transition-transform">
            <div
              class="w-11 h-11 rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center mb-1.5">
              <Icon name="lucide:moon" class="w-5 h-5" />
            </div>
            <span class="font-bold text-xs text-app-text-primary">Sleep</span>
            <span class="text-[10px] text-app-success font-semibold">Active now</span>
          </button>

          <button
            class="bg-app-surface border border-app-border rounded-2xl p-3 flex flex-col items-center justify-center text-center active:scale-95 transition-transform">
            <div
              class="w-11 h-11 rounded-full bg-app-surface-subtle text-app-warning flex items-center justify-center mb-1.5">
              <Icon name="lucide:droplet" class="w-5 h-5" />
            </div>
            <span class="font-bold text-xs text-app-text-primary">Diaper</span>
            <span class="text-[10px] text-app-text-secondary">40m ago</span>
          </button>
        </div>
      </div>

      <!-- Daily Summary Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-app-surface border border-app-border rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <span class="text-xs text-app-text-secondary">Today's Feeding</span>
            <div class="text-lg font-bold text-app-text-primary mt-0.5">540 <span class="text-xs font-normal">ml</span>
            </div>
            <span class="text-[11px] text-app-success font-medium flex items-center gap-0.5 mt-0.5">
              <Icon name="lucide:trending-up" class="w-3 h-3" /> On track
            </span>
          </div>
          <div class="w-8 h-8 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center">
            <Icon name="lucide:baby" class="w-4 h-4" />
          </div>
        </div>

        <div class="bg-app-surface border border-app-border rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <span class="text-xs text-app-text-secondary">Total Rest</span>
            <div class="text-lg font-bold text-app-text-primary mt-0.5">5h 20m</div>
            <span class="text-[11px] text-app-text-secondary mt-0.5 block">3 sessions</span>
          </div>
          <div class="w-8 h-8 rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center">
            <Icon name="lucide:bed" class="w-4 h-4" />
          </div>
        </div>
      </div>

      <!-- Today's Rhythm List -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-base text-app-text-primary">Today's Rhythm</h3>
            <span
              class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-app-surface-subtle text-app-text-secondary">May
              14</span>
          </div>
          <button class="flex items-center gap-1 text-xs font-semibold text-app-text-primary">
            <span>Filter</span>
            <Icon name="lucide:sliders-horizontal" class="w-3.5 h-3.5" />
          </button>
        </div>

        <div class="space-y-2">
          <!-- Diaper Change -->
          <div class="bg-app-surface border border-app-border rounded-2xl p-3.5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-app-surface-subtle text-app-warning flex items-center justify-center">
                <Icon name="lucide:droplet" class="w-4 h-4" />
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="font-bold text-xs text-app-text-primary">Diaper Change</span>
                  <span
                    class="px-1.5 py-0.5 text-[9px] rounded font-semibold bg-app-surface-subtle text-app-text-secondary">Wet</span>
                </div>
                <p class="text-[11px] text-app-text-secondary mt-0.5">Prompt change after short tummy time</p>
              </div>
            </div>
            <div class="text-right">
              <span class="font-bold text-xs text-app-text-primary block">12:35 PM</span>
              <span class="text-[10px] text-app-text-secondary">40m ago</span>
            </div>
          </div>

          <!-- Expressed Bottle -->
          <div class="bg-app-surface border border-app-border rounded-2xl p-3.5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center">
                <Icon name="lucide:milk" class="w-4 h-4" />
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="font-bold text-xs text-app-text-primary">Expressed Bottle</span>
                  <span class="px-1.5 py-0.5 text-[9px] rounded font-semibold bg-app-accent-soft text-app-accent">120
                    ml</span>
                </div>
                <p class="text-[11px] text-app-text-secondary mt-0.5">Fed calmly by Alex • No reflux</p>
              </div>
            </div>
            <div class="text-right">
              <span class="font-bold text-xs text-app-text-primary block">11:00 AM</span>
              <span class="text-[10px] text-app-text-secondary">15m duration</span>
            </div>
          </div>

          <!-- Morning Nap -->
          <div class="bg-app-surface border border-app-border rounded-2xl p-3.5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-app-primary-soft text-app-primary flex items-center justify-center">
                <Icon name="lucide:moon" class="w-4 h-4" />
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="font-bold text-xs text-app-text-primary">Morning Nap</span>
                  <span class="px-1.5 py-0.5 text-[9px] rounded font-semibold bg-app-primary-soft text-app-primary">1h
                    12m</span>
                </div>
                <p class="text-[11px] text-app-text-secondary mt-0.5">Self-soothed in nursery crib with shusher</p>
              </div>
            </div>
            <div class="text-right">
              <span class="font-bold text-xs text-app-text-primary block">9:15 AM</span>
              <span class="text-[10px] text-app-text-secondary">10:27 AM end</span>
            </div>
          </div>

          <!-- Nursing Session -->
          <div class="bg-app-surface border border-app-border rounded-2xl p-3.5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center">
                <Icon name="lucide:heart-handshake" class="w-4 h-4" />
              </div>
              <div>
                <div class="flex items-center gap-1.5">
                  <span class="font-bold text-xs text-app-text-primary">Nursing Session</span>
                  <span
                    class="px-1.5 py-0.5 text-[9px] rounded font-semibold bg-app-surface-subtle text-app-text-secondary">Left
                    • 18m</span>
                </div>
                <p class="text-[11px] text-app-text-secondary mt-0.5">Good deep latch, woke up energized</p>
              </div>
            </div>
            <div class="text-right">
              <span class="font-bold text-xs text-app-text-primary block">7:40 AM</span>
              <span class="text-[10px] text-app-text-secondary">Wake-up feed</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Safe Nursery UX Spec Note -->
      <div class="bg-app-surface border border-app-border rounded-2xl p-4 flex items-start gap-3">
        <Icon name="lucide:shield-check" class="w-5 h-5 text-app-primary shrink-0 mt-0.5" />
        <div>
          <h4 class="font-bold text-xs text-app-text-primary">Safe Nursery UX Spec</h4>
          <p class="text-xs text-app-text-secondary leading-relaxed mt-1">
            High thumb reach compliance (&gt;44px targets), organic low-strain palette for night feeding, and safe
            bottom padding clearing navigation ergonomics.
          </p>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation Bar (Ergonomic & thumb-friendly) -->
    <nav
      class="fixed bottom-0 inset-x-0 bg-app-surface border-t border-app-border flex items-center justify-around py-2.5 px-4 z-30">
      <button @click="activeTab = 'dashboard'"
        :class="['flex flex-col items-center gap-1 min-w-[56px] min-h-[44px] justify-center transition-colors', activeTab === 'dashboard' ? 'text-app-primary font-bold' : 'text-app-text-secondary font-medium']">
        <Icon name="lucide:layout-grid" class="w-5 h-5" />
        <span class="text-[10px]">Dashboard</span>
      </button>

      <button @click="activeTab = 'history'"
        :class="['flex flex-col items-center gap-1 min-w-[56px] min-h-[44px] justify-center transition-colors', activeTab === 'history' ? 'text-app-primary font-bold' : 'text-app-text-secondary font-medium']">
        <Icon name="lucide:calendar" class="w-5 h-5" />
        <span class="text-[10px]">History</span>
      </button>

      <button @click="activeTab = 'baby'"
        :class="['flex flex-col items-center gap-1 min-w-[56px] min-h-[44px] justify-center transition-colors', activeTab === 'baby' ? 'text-app-primary font-bold' : 'text-app-text-secondary font-medium']">
        <Icon name="lucide:smile" class="w-5 h-5" />
        <span class="text-[10px]">Baby</span>
      </button>

      <button @click="activeTab = 'settings'"
        :class="['flex flex-col items-center gap-1 min-w-[56px] min-h-[44px] justify-center transition-colors', activeTab === 'settings' ? 'text-app-primary font-bold' : 'text-app-text-secondary font-medium']">
        <Icon name="lucide:settings" class="w-5 h-5" />
        <span class="text-[10px]">Settings</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { ThemeMode } from '~/types/home'

defineProps<{
  currentTheme: ThemeMode
}>()

const emit = defineEmits<{
  (e: 'setTheme', mode: ThemeMode): void
}>()

const activeTab = ref<'dashboard' | 'history' | 'baby' | 'settings'>('dashboard')
</script>