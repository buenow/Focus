<script setup>
defineProps(['telemetry', 'cargaMotor'])
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[80vh] w-full text-white">
    <div class="flex flex-col items-center">
      <h1 class="text-[12rem] font-black leading-none">{{ telemetry.speed || 0 }}</h1>
      <span class="text-2xl text-slate-500 font-mono tracking-widest uppercase">KM/H</span>
    </div>
    
    <div class="flex gap-16 mt-12 text-center">
      <div>
        <div class="text-3xl font-bold">{{ telemetry.rpm }}</div>
        <div class="text-xs text-slate-600 uppercase tracking-widest">RPM</div>
      </div>
      <div>
        <div class="text-3xl font-bold">{{ cargaMotor }}%</div>
        <div class="text-xs text-slate-600 uppercase tracking-widest">LOAD</div>
      </div>
    </div>
  </div>
</template>