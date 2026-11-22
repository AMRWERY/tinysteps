<template>
  <div class="hidden lg:flex flex-col gap-8">
    <div class="space-y-5">
      <p class="flex items-center gap-3 text-sm">
        <span class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-app-primary-soft text-app-primary font-medium">
          <Icon name="lucide:smile" class="w-4 h-4" /> Nursery Sync • {{ baby.name }} (6 mo)
        </span>
        <span class="flex items-center gap-2 text-app-text-secondary"><span class="w-2 h-2 rounded-full bg-app-success" /> Encrypted local vault</span>
      </p>
      <h2 class="text-5xl font-bold tracking-tight text-app-text-primary leading-[1.1]">{{ title }}</h2>
      <p class="text-lg text-app-text-secondary leading-relaxed max-w-xl">{{ subtitle }}</p>
    </div>

    <ul class="space-y-4">
      <li v-for="f in features" :key="f.title" class="flex items-start gap-4 rounded-2xl bg-app-surface-subtle p-5">
        <span class="w-12 h-12 rounded-xl bg-app-surface text-app-primary flex items-center justify-center shrink-0">
          <Icon :name="f.icon" class="w-5 h-5" />
        </span>
        <div>
          <p class="text-lg font-semibold text-app-text-primary">{{ f.title }}</p>
          <p class="text-base text-app-text-secondary leading-relaxed mt-1">{{ f.text }}</p>
        </div>
      </li>
    </ul>

    <figure class="rounded-2xl bg-app-surface-subtle p-6 space-y-3">
      <div class="flex items-center gap-4">
        <span class="w-14 h-14 rounded-full bg-app-accent-soft text-app-accent flex items-center justify-center text-lg font-bold shrink-0">KM</span>
        <div class="flex-1 min-w-0">
          <p class="text-base font-semibold text-app-text-primary">Kendra M.</p>
          <p class="text-sm text-app-text-secondary">Mother of 4-month-old twins • Portland, OR</p>
        </div>
        <Icon name="lucide:quote" class="w-8 h-8 text-app-text-secondary/40" />
      </div>
      <blockquote class="text-base italic text-app-text-secondary leading-relaxed">
        “At 3:15 AM, having yesterday's last feeding side and exact nap window right there without relying on exhausted memory is a quiet lifesaver.”
      </blockquote>
    </figure>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle: string }>()

const { baby } = useBabyProfile()

const features = [
  { icon: 'lucide:shield-check', title: 'Private to your family circle', text: "Your baby's sleep and feeding intervals are never sold, profiled, or used for behavioral advertising." },
  { icon: 'lucide:wifi-off', title: 'Zero-latency offline logging', text: 'Records stay safe even if the Wi-Fi drops at 3:15 AM. Everything syncs quietly when signal restores.' },
  { icon: 'lucide:folder-lock', title: 'Full ownership with one-click export', text: 'Download complete medical-ready PDF/CSV logs for your pediatrician or erase history with a tap.' },
]
</script>
