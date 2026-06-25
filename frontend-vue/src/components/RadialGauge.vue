<script setup>
defineProps({
  value: Number,
  max: Number,
  label: String,
  colorClass: String
})
</script>

<template>
  <div class="relative w-40 h-40 flex flex-col items-center justify-center">
    <div class="absolute inset-0 rounded-full border-[8px] border-slate-900"></div>
    <div class="absolute inset-0 rounded-full border-[8px]"
         :class="colorClass"
         :style="`clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%); transform: rotate(${(value / max) * 360}deg)`">
    </div>
    <div class="text-center z-10">
      <div class="text-2xl font-black text-white font-mono">{{ value }}</div>
      <div class="text-[9px] text-slate-500 font-mono uppercase tracking-widest">{{ label }}</div>
    </div>
  </div>
</template>