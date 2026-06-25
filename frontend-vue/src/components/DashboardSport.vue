<script setup>
import RadialGauge from './RadialGauge.vue'
defineProps(['telemetry', 'cargaMotor'])
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[80vh] w-full gap-16">
    <h2 class="text-slate-500 font-mono text-xs tracking-[0.2em] uppercase">Telemetry Active</h2>
    
    <div class="flex gap-12">
      <RadialGauge :value="telemetry.rpm" :max="6500" label="RPM" colorClass="border-emerald-500" />
      <RadialGauge :value="telemetry.speed" :max="260" label="KM/H" colorClass="border-cyan-500" />
      <RadialGauge :value="cargaMotor" :max="100" label="ESFORÇO" colorClass="border-amber-500" />
    </div>
  </div>
</template>