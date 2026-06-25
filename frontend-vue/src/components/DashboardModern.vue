<template>
  <div class="h-screen w-screen civic-cluster-bg text-white font-sans overflow-hidden flex relative select-none">
    
    <!-- EFEITO DE FUNDO: GRID DEGRADÊ -->
    <div class="grid-overlay absolute inset-0 z-0"></div>
    <div class="absolute top-0 inset-x-0 h-[40%] bg-gradient-to-b from-blue-500/10 to-transparent blur-[100px] pointer-events-none z-0"></div>

    <!-- SIDEBAR DE NAVEGAÇÃO -->
    <aside class="w-24 h-full border-r border-white/5 flex flex-col items-center py-6 gap-6 z-20 relative shadow-[4px_0_24px_rgba(0,0,0,0.5)] transition-colors duration-300"
           :class="engineAlert ? 'bg-red-950/90 border-red-500 animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.3)]' : 'bg-[#020510]/90 backdrop-blur-xl'">
      
      <div class="mb-2">
        <h2 class="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">N<span class="text-white">OS</span></h2>
      </div>
      
      <nav class="flex flex-col gap-4 w-full px-3">
        <button class="w-full aspect-square rounded-xl bg-blue-600/30 border border-blue-400/50 flex flex-col items-center justify-center text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">Painel</span>
        </button>
        <button class="w-full aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-slate-400 hover:bg-white/10 transition-all">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">GPS</span>
        </button>
        <button class="w-full aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-slate-400 hover:bg-white/10 transition-all">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">Config</span>
        </button>
      </nav>
      
      <div class="mt-auto flex flex-col items-center gap-2">
        <span class="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] animate-pulse" :class="engineAlert ? 'bg-red-500 text-red-500' : 'bg-emerald-500 text-emerald-500'"></span>
        <span class="text-[9px] font-mono uppercase tracking-widest" :class="engineAlert ? 'text-red-300 font-bold' : 'text-emerald-500'">
          {{ engineAlert ? 'SYS ERR' : 'CAN OK' }}
        </span>
      </div>
    </aside>

    <!-- CONTEÚDO PRINCIPAL (CLUSTER) -->
    <main class="relative flex-1 flex flex-col z-10 w-full overflow-hidden">
      
      <div class="flex-1 w-full max-w-[1300px] mx-auto flex items-center justify-center gap-6 lg:gap-10 px-6 pb-6 mt-4">
        
        <!-- 1. PERIFÉRICO ESQUERDO: TEMPERATURA -->
        <div class="flex flex-col items-center justify-center w-[80px] shrink-0 relative">
          <div class="flex items-center h-[240px]">
             <div class="flex flex-col justify-between h-[210px] text-[12px] font-bold text-right w-8 mr-2 pb-1">
               <span class="text-red-500 drop-shadow-md">120°</span>
               <span class="text-slate-300 drop-shadow-md">80°</span>
               <span class="text-cyan-400 drop-shadow-md">40°</span>
             </div>
             <svg width="24" height="220" viewBox="0 0 24 220" class="drop-shadow-md">
               <defs>
                 <linearGradient id="tempGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                   <stop offset="0%" stop-color="#22d3ee" />
                   <stop offset="60%" stop-color="#3b82f6" />
                   <stop offset="100%" stop-color="#ef4444" />
                 </linearGradient>
               </defs>
               <path d="M 20 210 Q 0 110 20 10" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6" stroke-linecap="round" pathLength="100"/>
               <path d="M 20 210 Q 0 110 20 10" fill="none" stroke="url(#tempGrad)" stroke-width="6" stroke-linecap="round"
                     pathLength="100" stroke-dasharray="100" :stroke-dashoffset="100 - tempPercent" 
                     class="transition-all duration-300 ease-linear" />
             </svg>
          </div>
          
          <!-- Ícones Inferiores: Aumentados para maior destaque -->
          <div class="flex flex-col gap-2 mt-4 items-center">
            <span class="text-base text-slate-400 drop-shadow-lg" :class="{'animate-bounce text-red-500': simTemp > 105}">🌡️</span>
            <!-- Ventoinha Gigante -->
            <svg class="w-10 h-10 transition-colors duration-300 drop-shadow-[0_0_8px_currentColor]" 
                 :class="[fanColorClass, simTemp >= 98 ? 'animate-spin' : '']" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 11c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6.2-2.12c-.28-.05-.58.04-.76.26l-1.35 1.57c-.45-.25-.94-.43-1.46-.53V7.21c0-.28-.15-.55-.4-.68l-1.89-1.02c-.21-.11-.47-.11-.68 0L9.77 6.53c-.25.13-.4.4-.4.68v2.96c-.52.1-.1.01-1.46.53L6.56 9.14c-.18-.22-.48-.31-.76-.26l-2.09.39c-.24.04-.42.22-.49.46-.07.24.01.5.2.66l1.59 1.3c-.02.19-.04.38-.04.57 0 .19.02.38.04.57l-1.59 1.3c-.19.16-.27.42-.2.66.07.24.25.42.49.46l2.09.39c.28.05.58-.04.76-.26l1.35-1.57c.45.25.94.43 1.46.53v2.96c0 .28.15.55.4.68l1.89 1.02c.21.11.47.11.68 0l1.89-1.02c.25-.13.4-.4.4-.68v-2.96c.52-.1 1.01-.28 1.46-.53l1.35 1.57c.18.22.48.31.76.26l2.09-.39c.24-.04.42-.22.49-.46.07-.24-.01-.5-.2-.66l-1.59-1.3c.02-.19.04-.38.04-.57 0-.19-.02-.38-.04-.57l1.59-1.3c.19-.16.27-.42.2-.66-.07-.24-.25-.42-.49-.46l-2.09-.39zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
          </div>
        </div>

        <!-- 2. MOSTRADOR ESQUERDO: RPM -->
        <div class="relative w-[320px] lg:w-[340px] shrink-0 aspect-square flex items-center justify-center">
          
          <!-- Iluminação de Fundo do Gauge (Glow Colorido) -->
          <div class="absolute inset-4 rounded-full blur-[40px] opacity-25 transition-colors duration-500 pointer-events-none z-0" 
               :style="{ backgroundColor: ecoColors.start }"></div>

          <!-- Rotação Exata -144deg centraliza o progresso perfeitamente com os números -->
          <svg viewBox="0 0 200 200" class="absolute inset-0 w-full h-full z-10" style="transform: rotate(-144deg); transform-origin: center;">
            <defs>
              <linearGradient id="rpmArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" :stop-color="ecoColors.start" style="transition: stop-color 0.4s ease" />
                <stop offset="100%" :stop-color="ecoColors.end" style="transition: stop-color 0.4s ease" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#rpmArcGrad)" stroke-width="5" 
                    stroke-dasharray="565.48" :stroke-dashoffset="565.48 - (452.39 * rpmPercent)" 
                    class="transition-all duration-100 ease-linear drop-shadow-md" />
            
            <!-- Linhas Fechando o 360º (20 divisões de 18 graus) -->
            <g v-for="i in 20" :key="`tick-${i}`" :transform="`rotate(${(i-1) * 18}, 100, 100)`">
              <line x1="100" y1="5" x2="100" y2="15" 
                    :stroke="(i-1) > 16 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)'" stroke-width="1.5" />
            </g>
          </svg>

          <!-- Números Posicionados na mesma matemática (18 graus) -->
          <div class="absolute inset-0 w-full h-full pointer-events-none z-20">
            <div v-for="i in 17" :key="`num-${i}`" class="absolute w-full h-full flex justify-center items-start pt-0" 
                 :style="`transform: rotate(${(i-1) * 18 - 144}deg)`">
               <span v-if="(i - 1) % 2 === 0" 
                     class="text-[20px] font-black drop-shadow-md translate-y-[-36px]" 
                     :class="(i-1)/2 >= 7 ? 'text-red-500' : 'text-slate-200'"
                     :style="`transform: rotate(${-((i-1) * 18 - 144)}deg)`">
                  {{ (i - 1) / 2 }}
               </span>
            </div>
          </div>

          <div class="civic-gauge relative z-10 w-[230px] h-[230px] rounded-full flex flex-col items-center justify-center p-6 shadow-2xl transition-colors duration-500 border border-white/5">
            <span class="text-5xl font-bold text-white tracking-tight drop-shadow-lg mt-4">
              {{ Math.floor(simRpm) }}
            </span>
            <span class="text-[11px] text-slate-400 uppercase font-bold mt-1 tracking-widest">RPM</span>
          </div>
        </div>

        <!-- 3. PAINEL CENTRAL: INFORMAÇÕES -->
        <div class="w-[140px] shrink-0 flex flex-col justify-center items-center h-[340px] relative z-20">
          
          <div v-if="engineAlert" class="civic-center-card w-full p-3 text-center rounded-xl flex flex-col gap-2 border border-red-500 bg-red-950/80 animate-pulse z-50">
             <div class="border-b border-red-500/30 pb-2">
               <p class="text-[9px] uppercase text-red-400 tracking-widest font-black mb-1">⚠️ {{ engineAlert.type }}</p>
               <div class="text-sm font-black text-white tracking-tight leading-tight mt-1">{{ engineAlert.title }}</div>
             </div>
             <div class="text-xl font-black text-red-500">{{ engineAlert.value }}</div>
          </div>

          <!-- Card de Status -->
          <div v-else class="civic-center-card w-full text-center rounded-xl flex flex-col border border-white/5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10">
             
             <!-- Autonomia -->
             <div class="py-2 border-b border-blue-400/10 px-1">
               <p class="text-[8px] uppercase text-slate-400 tracking-widest font-bold mb-1">Autonomia Restante</p>
               <div class="text-xl font-black text-white tracking-tight">
                 {{ calculatedAutonomy }} <span class="text-xs text-slate-400 font-normal">km</span>
               </div>
             </div>
             
             <!-- Bateria -->
             <div class="py-2 border-b border-blue-400/10 px-1">
               <p class="text-[8px] uppercase text-slate-400 tracking-widest font-bold mb-0.5">Bateria</p>
               <div class="text-base font-bold text-slate-100">{{ simBattery.toFixed(2) }}V</div>
             </div>
             
             <!-- Consumo -->
             <div class="py-2 border-b border-blue-400/10 px-1">
               <p class="text-[8px] uppercase text-slate-400 tracking-widest font-bold mb-0.5">Consumo</p>
               <div class="text-base font-bold text-slate-100">13.4 <span class="text-[10px] font-normal text-slate-400">km/l</span></div>
             </div>
             
             <!-- Temp Motor (Com Alerta de Cor e Fundo Isolado) -->
             <div class="pt-2 px-1 pb-1 mt-1 transition-all duration-300 rounded-b-lg" 
                  :class="simTemp >= 103 ? 'bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.3)] border border-red-500/30' : ''">
               <p class="text-[8px] uppercase tracking-widest font-bold mb-0.5 transition-colors duration-300" 
                  :class="simTemp >= 103 ? 'text-red-300' : 'text-slate-400'">Temp. Motor</p>
               <div class="text-base transition-colors duration-300" 
                    :class="simTemp >= 103 ? 'text-red-500 font-black drop-shadow-[0_0_5px_currentColor]' : 'text-slate-100 font-bold'">
                 {{ Math.floor(simTemp) }}°C
               </div>
             </div>
          </div>
        </div>

        <!-- 4. MOSTRADOR DIREITO: VELOCIDADE -->
        <div class="relative w-[320px] lg:w-[340px] shrink-0 aspect-square flex items-center justify-center">
          
          <!-- Iluminação de Fundo do Gauge (Glow Colorido) -->
          <div class="absolute inset-4 rounded-full blur-[40px] opacity-25 transition-colors duration-500 pointer-events-none z-0" 
               :style="{ backgroundColor: ecoColors.start }"></div>

          <!-- Rotação -132deg para o alinhamento de 220km/h com 30 divisões -->
          <svg viewBox="0 0 200 200" class="absolute inset-0 w-full h-full z-10" style="transform: rotate(-132deg); transform-origin: center;">
            <defs>
              <linearGradient id="speedArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" :stop-color="ecoColors.start" style="transition: stop-color 0.4s ease" />
                <stop offset="100%" :stop-color="ecoColors.end" style="transition: stop-color 0.4s ease" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#speedArcGrad)" stroke-width="5" 
                    stroke-dasharray="565.48" :stroke-dashoffset="565.48 - (414.68 * speedPercent)" 
                    class="transition-all duration-100 ease-linear drop-shadow-md" />

            <!-- Linhas Fechando o 360º (30 divisões de 12 graus) -->
            <g v-for="i in 30" :key="`spd-tick-${i}`" :transform="`rotate(${(i-1) * 12}, 100, 100)`">
               <line x1="100" y1="5" x2="100" y2="15" 
                     :stroke="(i-1) > 22 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)'" stroke-width="1.5" />
            </g>
          </svg>

          <!-- Números Posicionados na mesma matemática (12 graus) -->
          <div class="absolute inset-0 w-full h-full pointer-events-none z-20">
            <div v-for="i in 23" :key="`spd-num-${i}`" class="absolute w-full h-full flex justify-center items-start pt-0" 
                 :style="`transform: rotate(${(i-1) * 12 - 132}deg)`">
               <span v-if="((i - 1) * 10) % 20 === 0" 
                     class="text-[17px] font-black text-slate-200 drop-shadow-md translate-y-[-34px]" 
                     :style="`transform: rotate(${-((i-1) * 12 - 132)}deg)`">
                  {{ (i - 1) * 10 }}
               </span>
            </div>
          </div>

          <div class="civic-gauge relative z-10 w-[230px] h-[230px] rounded-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-500 shadow-2xl border border-white/5">
            <span class="text-[5rem] leading-none font-black text-white tracking-tighter drop-shadow-lg mt-2">
              {{ Math.floor(simSpeed) }}
            </span>
            <span class="text-[12px] text-slate-400 font-bold uppercase tracking-widest mt-1">km/h</span>
            <span class="text-[11px] font-bold text-slate-200 mt-4 tracking-widest">NW</span>
          </div>
        </div>

        <!-- 5. PERIFÉRICO DIREITO: COMBUSTÍVEL -->
        <div class="flex flex-col items-center justify-center w-[80px] shrink-0 relative">
          <div class="flex items-center h-[240px]">
             <svg width="24" height="220" viewBox="0 0 24 220" class="drop-shadow-md">
               <defs>
                 <linearGradient id="fuelGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                   <stop offset="0%" stop-color="#ef4444" />
                   <stop offset="25%" stop-color="#e2e8f0" />
                   <stop offset="100%" stop-color="#3b82f6" />
                 </linearGradient>
               </defs>
               <path d="M 4 210 Q 24 110 4 10" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="6" stroke-linecap="round" pathLength="100"/>
               <path d="M 4 210 Q 24 110 4 10" fill="none" stroke="url(#fuelGrad)" stroke-width="6" stroke-linecap="round"
                     pathLength="100" stroke-dasharray="100" :stroke-dashoffset="100 - simFuel" 
                     class="transition-all duration-1000 ease-linear" />
             </svg>
             <div class="flex flex-col justify-between h-[210px] text-[12px] font-bold text-left w-8 ml-2 pb-1 text-slate-300">
               <span>F</span>
               <span>3/4</span>
               <span>1/2</span>
               <span>1/4</span>
               <span class="text-red-500">E</span>
             </div>
          </div>
          <span class="text-xs mt-3 opacity-60">⛽</span>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// --- ESTADOS DOS SENSORES ---
const simSpeed = ref(0);
const simRpm = ref(800);
const simLoad = ref(15);
const simTemp = ref(90);  
const simFuel = ref(58);
const simBattery = ref(13.60);
const simEcon = ref(9.4);

let simulationInterval = null;
let isAccelerating = true;
let isHeating = true;

// --- CÁLCULOS (Ajustados para frações exatas com a nova matemática de arcos) ---
const rpmPercent = computed(() => {
  const clamped = Math.min(Math.max(simRpm.value, 0), 8000);
  return clamped / 8000;
});

const speedPercent = computed(() => {
  const clamped = Math.min(Math.max(simSpeed.value, 0), 220);
  return clamped / 220;
});

const tempPercent = computed(() => Math.max(0, Math.min(100, ((simTemp.value - 40) / 80) * 100)));
const calculatedAutonomy = computed(() => Math.floor(((simFuel.value / 100) * 55) * simEcon.value));

// --- CORES DINÂMICAS: ECO DRIVING ---
const ecoColors = computed(() => {
  if (simRpm.value > 3500 || simLoad.value > 65) {
    return { start: '#ef4444', end: '#991b1b' }; // Vermelho
  } else if (simRpm.value > 2500 || simLoad.value > 35) {
    return { start: '#eab308', end: '#a16207' }; // Amarelo
  }
  return { start: '#3b82f6', end: '#1d4ed8' };   // Azul
});

// --- VENTOINHA E ALERTAS ---
const fanColorClass = computed(() => {
  if (simTemp.value >= 103) return 'text-red-500 opacity-100';
  if (simTemp.value >= 100) return 'text-yellow-400 opacity-100';
  if (simTemp.value >= 98) return 'text-emerald-500 opacity-100';
  return 'text-slate-500 opacity-30';
});

const engineAlert = computed(() => {
  if (simTemp.value >= 105) {
    return { type: 'CRÍTICO', title: 'AQUECIMENTO', value: `${Math.floor(simTemp.value)}°C` };
  }
  return null;
});

// --- CICLO DA SIMULAÇÃO ---
onMounted(() => {
  simulationInterval = setInterval(() => {
    // 1. Temperatura
    if (isHeating) {
      simTemp.value += 0.15;
      if (simTemp.value >= 106) isHeating = false;
    } else {
      simTemp.value -= 0.15;
      if (simTemp.value <= 90) isHeating = true;
    }

    // 2. Comportamento do Motor
    if (isAccelerating) {
      simSpeed.value += 0.7;
      simRpm.value += 44;
      simLoad.value = Math.min(simLoad.value + 3, 85);
      
      if (simRpm.value > 3500) {
        simRpm.value = 1900; 
        simLoad.value = 30;
      }
      if (simSpeed.value > 125) isAccelerating = false;
    } else {
      simSpeed.value -= 0.4;
      simRpm.value -= 22;
      simLoad.value = Math.max(simLoad.value - 2, 10);
      if (simSpeed.value < 38) isAccelerating = true;
    }

    if (simSpeed.value < 0) simSpeed.value = 0;
    if (simRpm.value < 800) simRpm.value = 800;
    simBattery.value = 13.60 + (Math.random() * 0.1 - 0.05);

  }, 100);
});

onUnmounted(() => {
  if (simulationInterval) clearInterval(simulationInterval);
});
</script>

<style scoped>
.civic-cluster-bg {
  background-color: #040914; 
}

.grid-overlay {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center top;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%);
  pointer-events: none;
}

.civic-gauge {
  background: radial-gradient(circle at center, rgba(14, 30, 64, 0.95) 0%, rgba(4, 9, 23, 1) 100%);
}

.civic-center-card {
  background: rgba(4, 9, 23, 0.7);
  backdrop-filter: blur(8px);
}
</style>