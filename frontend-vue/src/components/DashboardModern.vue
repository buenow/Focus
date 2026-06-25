<template>
  <div class="h-screen w-screen civic-cluster-bg text-white font-sans overflow-hidden flex relative select-none">
    
    <!-- EFEITO DE ILUMINAÇÃO AMBIENTE -->
    <div class="absolute top-0 inset-x-0 h-[50%] bg-gradient-to-b from-blue-600/30 via-indigo-950/15 to-transparent blur-[120px] pointer-events-none z-0"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[150px] bg-sky-400/15 blur-[80px] rounded-full pointer-events-none z-0" :style="{ backgroundColor: ambientGlow }"></div>

    <!-- SIDEBAR DE NAVEGAÇÃO VIA TOQUE -->
    <aside class="w-24 h-full bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-6 gap-8 z-20 relative shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      <div class="mb-4">
        <h2 class="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">N<span class="text-white">OS</span></h2>
      </div>
      
      <nav class="flex flex-col gap-6 w-full px-3">
        <button class="w-full aspect-square rounded-2xl bg-blue-600/20 border border-blue-500/50 flex flex-col items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <svg class="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">Painel</span>
        </button>
        <button class="w-full aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-slate-400 hover:bg-white/10 transition-all">
          <svg class="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">GPS</span>
        </button>
      </nav>
      
      <div class="mt-auto flex flex-col items-center gap-2">
        <span class="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] animate-pulse" :class="engineAlert ? 'bg-red-500 text-red-500' : 'bg-emerald-500 text-emerald-500'"></span>
        <span class="text-[9px] font-mono uppercase tracking-widest" :class="engineAlert ? 'text-red-500' : 'text-emerald-500'">
          {{ engineAlert ? 'SYS ERR' : 'CAN OK' }}
        </span>
      </div>
    </aside>

    <!-- CONTEÚDO PRINCIPAL (CLUSTER) -->
    <main class="relative flex-1 flex flex-col">
      <!-- Top Info Bar -->
      <div class="w-full flex justify-end px-8 py-4 gap-6 text-xs font-bold text-slate-400">
        <span class="flex items-center gap-2">⏱️ {{ currentTime }}</span>
        <span>EXT 26°C</span>
      </div>

      <div class="flex-1 w-full max-w-[1220px] mx-auto flex items-center justify-between px-2 pb-12">
        
        <!-- 1. PERIFÉRICO ESQUERDO: TEMPERATURA REPROPORCIONADO -->
        <div class="flex items-center h-[280px] w-24 gap-3 ml-2 relative">
          
          <!-- Valores Fixos de Escala (Esquerda) -->
          <div class="flex flex-col justify-between h-[230px] text-[13px] font-bold text-right w-10 text-slate-400">
            <span class="text-red-500 drop-shadow-md">120°</span>
            <span class="drop-shadow-md">80°</span>
            <span class="text-cyan-400 drop-shadow-md">40°</span>
          </div>

          <!-- Barra de Temperatura (Direita) com Indicador Flutuante -->
          <div class="flex flex-col items-center justify-center h-[230px] w-4 relative">
            <div class="w-1.5 h-full bg-slate-800 rounded-full relative border border-white/5 shadow-inner">
              
              <!-- Preenchimento da Barra -->
              <div class="absolute bottom-0 w-full transition-all duration-1000 shadow-[0_0_8px_currentColor]" 
                   :class="simTemp > 102 ? 'bg-red-500 text-red-500' : 'bg-gradient-to-t from-cyan-500 to-cyan-300 text-cyan-400'"
                   :style="{ height: `${Math.max(0, Math.min(100, ((simTemp - 40) / 80) * 100))}%` }">
                
                <!-- VALOR DIGITAL DINÂMICO: Flutua na ponta esquerda do nível da barra -->
                <span class="absolute -top-2.5 right-4 text-[13px] font-black text-emerald-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] whitespace-nowrap transition-all duration-1000">
                  {{ Math.floor(simTemp) }}°
                </span>

              </div>
            </div>
            <span class="text-xs mt-3 text-slate-500" :class="{'animate-bounce text-red-500': simTemp > 105}">🌡️</span>
          </div>
        </div>

        <!-- 2. MOSTRADOR ESQUERDO: RPM (ECO DRIVING ANIMADO) -->
        <div class="relative w-[340px] h-[340px] flex items-center justify-center">
          <svg viewBox="0 0 200 200" class="absolute inset-0 w-full h-full z-10" style="transform: rotate(-225deg); transform-origin: center;">
            <defs>
              <linearGradient id="rpmArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" :stop-color="ecoColors.start" style="transition: stop-color 0.5s ease" />
                <stop offset="100%" :stop-color="ecoColors.end" style="transition: stop-color 0.5s ease" />
              </linearGradient>
            </defs>
            
            <!-- Arco Dinâmico -->
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#rpmArcGrad)" stroke-width="4" 
                    stroke-dasharray="565" :stroke-dashoffset="565 - (439 * rpmPercent) / 100" 
                    class="transition-all duration-100 ease-linear"
                    :style="`filter: drop-shadow(0 0 8px ${ecoColors.glow})`" />
            
            <!-- Linhas de Marcação (Renderizadas DEPOIS do arco para não sumirem) -->
            <g v-for="i in 17" :key="`tick-${i}`" :transform="`rotate(${(i-1) * 17.5}, 100, 100)`">
              <line x1="100" y1="5" x2="100" y2="15" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" />
            </g>
          </svg>

          <!-- Numeração RPM -->
          <div class="absolute inset-0 w-full h-full pointer-events-none z-20">
            <div v-for="i in 17" :key="`num-${i}`" class="absolute w-full h-full flex justify-center items-start pt-0" :style="`transform: rotate(${(i-1) * 17.5 - 135}deg)`">
               <span v-if="(i - 1) % 2 === 0" 
                     class="text-[22px] font-black drop-shadow-md translate-y-[-38px]" 
                     :class="(i-1)/2 >= 7 ? 'text-red-500' : 'text-slate-200'"
                     :style="`transform: rotate(${-((i-1) * 17.5 - 135)}deg)`">
                  {{ (i - 1) / 2 }}
               </span>
            </div>
          </div>

          <!-- Interior do Mostrador -->
          <div class="civic-gauge relative z-0 w-[240px] h-[240px] rounded-full flex flex-col items-center justify-center p-6 shadow-inner transition-colors duration-500" :style="{ borderColor: ecoColors.border }">
            <span class="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Rotação</span>
            <span class="text-4xl font-black text-slate-100 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              {{ Math.floor(simRpm) }}
            </span>
            <span class="text-[10px] text-slate-500 font-bold uppercase mt-1">RPM</span>
          </div>
        </div>

        <!-- 3. PAINEL CENTRAL: VELOCIDADE E CARD EMPILHADO -->
        <!-- Note o w-[240px] e mx-4 para garantir que nunca encoste nos mostradores analógicos -->
        <div class="w-[240px] mx-4 flex flex-col justify-center items-center gap-6 h-[340px] pt-2 relative">
          
          <!-- Velocidade Digital -->
          <div class="flex items-baseline gap-1">
            <span class="text-[5rem] leading-none font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              {{ Math.floor(simSpeed) }}
            </span>
            <div class="flex flex-col items-start pb-2">
               <span class="text-sm text-slate-400 font-bold uppercase">km/h</span>
               <!-- Shift Light -->
               <span v-if="suggestShiftUp" class="text-emerald-400 animate-bounce text-xl mt-1" title="Subir Marcha (Eco)">🔼</span>
            </div>
          </div>

          <!-- ALERTA CRÍTICO -->
          <div v-if="engineAlert" class="civic-center-card w-full p-4 text-center rounded-2xl flex flex-col gap-3 border-2 border-red-500/80 bg-red-950/40 animate-pulse">
             <div class="border-b border-red-500/30 pb-2">
               <p class="text-[10px] uppercase text-red-400 tracking-widest font-black mb-1">⚠️ {{ engineAlert.type }} ⚠️</p>
               <div class="text-lg font-black text-white tracking-tight leading-tight mt-1">{{ engineAlert.title }}</div>
             </div>
             <div class="text-3xl font-black text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">{{ engineAlert.value }}</div>
          </div>

          <!-- CARD DE DADOS EMPILHADOS (Referência da Imagem 1) -->
          <div v-else class="civic-center-card w-48 mx-auto p-4 text-center rounded-2xl flex flex-col border border-white/10 transition-opacity shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
             <!-- Autonomia -->
             <div class="pb-3 border-b border-white/10">
               <p class="text-[10px] uppercase text-slate-400 tracking-widest font-bold mb-1">Autonomia Restante</p>
               <div class="text-3xl font-black text-white tracking-tight">
                 {{ calculatedAutonomy }} <span class="text-base text-slate-400 font-normal">km</span>
               </div>
             </div>
             <!-- Bateria (Formatada 2 casas) -->
             <div class="py-2 border-b border-white/10">
               <p class="text-[10px] uppercase text-slate-400 tracking-widest font-bold mb-0.5">Bateria</p>
               <div class="text-xl font-bold text-slate-100">{{ simBattery.toFixed(2) }}V</div>
             </div>
             <!-- Consumo -->
             <div class="py-2 border-b border-white/10">
               <p class="text-[10px] uppercase text-slate-400 tracking-widest font-bold mb-0.5">Consumo</p>
               <div class="text-xl font-bold text-slate-100">13.4 <span class="text-sm font-normal text-slate-400">km/l</span></div>
             </div>
             <!-- Temp Motor -->
             <div class="pt-2">
               <p class="text-[10px] uppercase text-slate-400 tracking-widest font-bold mb-0.5">Temp. Motor</p>
               <div class="text-xl font-bold text-slate-100">{{ Math.floor(simTemp) }}°C</div>
             </div>
          </div>
        </div>

        <!-- 4. MOSTRADOR DIREITO: VELOCIDADE ANALÓGICA -->
        <div class="relative w-[340px] h-[340px] flex items-center justify-center">
          <svg viewBox="0 0 200 200" class="absolute inset-0 w-full h-full z-10" style="transform: rotate(-225deg); transform-origin: center;">
            <defs>
              <linearGradient id="speedArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" :stop-color="ecoColors.speedStart" style="transition: stop-color 0.5s ease" />
                <stop offset="100%" :stop-color="ecoColors.speedEnd" style="transition: stop-color 0.5s ease" />
              </linearGradient>
            </defs>
            
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#speedArcGrad)" stroke-width="4" 
                    stroke-dasharray="565" :stroke-dashoffset="565 - (439 * speedPercent) / 100" 
                    class="transition-all duration-100 ease-linear"
                    :style="`filter: drop-shadow(0 0 8px ${ecoColors.speedGlow})`" />

            <g v-for="i in 23" :key="`spd-tick-${i}`" :transform="`rotate(${(i-1) * 12.7}, 100, 100)`">
               <line x1="100" y1="5" x2="100" y2="15" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" />
            </g>
          </svg>

          <!-- Numeração Velocidade Analógica -->
          <div class="absolute inset-0 w-full h-full pointer-events-none z-20">
            <div v-for="i in 23" :key="`spd-num-${i}`" class="absolute w-full h-full flex justify-center items-start pt-0" :style="`transform: rotate(${(i-1) * 12.7 - 135}deg)`">
               <span v-if="((i - 1) * 10) % 20 === 0" 
                     class="text-[18px] font-black text-slate-200 drop-shadow-md translate-y-[-36px]" 
                     :style="`transform: rotate(${-((i-1) * 12.7 - 135)}deg)`">
                  {{ (i - 1) * 10 }}
               </span>
            </div>
          </div>

          <!-- Bússola -->
          <div class="civic-gauge relative z-0 w-[240px] h-[240px] rounded-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-500" :style="{ borderColor: ecoColors.border }">
            <span class="text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">Direção</span>
            <div class="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center relative shadow-inner mt-1 mb-2">
              <div class="w-12 h-12 rounded-full border-t-2 border-r-2 transition-transform duration-1000" :style="{ transform: `rotate(${simHeading}deg)`, borderColor: ecoColors.glow }"></div>
              <span class="absolute text-sm font-black text-white">NW</span>
            </div>
            <span class="text-[10px] text-slate-500 tracking-widest font-mono font-bold mt-2">ODO 142.381 KM</span>
          </div>
        </div>

        <!-- 5. PERIFÉRICO DIREITO: COMBUSTÍVEL -->
        <!-- Adicionado ml-auto para empurrar o conjunto todo para a direita -->
        <div class="flex items-center h-[280px] w-24 gap-2 mr-2 ml-auto">
          
          <!-- 1º: Barra (Na Esquerda) -->
          <div class="flex flex-col items-center justify-center h-[230px] w-4">
            <div class="w-1.5 h-full bg-slate-800 rounded-full relative overflow-hidden border border-white/5 shadow-inner">
              <div class="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 via-white to-white shadow-[0_0_8px_white] transition-all duration-500" :style="{ height: `${simFuel}%` }"></div>
            </div>
            <span class="text-xs mt-3 opacity-60">⛽</span>
          </div>

          <!-- 2º: Textos (Na Direita) -->
          <div class="flex flex-col justify-between h-[230px] text-[12px] font-bold text-slate-300 text-left w-8 pb-3 pt-1">
            <span>F</span>
            <span>3/4</span>
            <span>1/2</span>
            <span>1/4</span>
            <span class="text-red-500">E</span>
          </div>

        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// --- ESTADOS DOS SENSORES (SIMULAÇÃO REDE CAN) ---
const simSpeed = ref(0);
const simRpm = ref(800);
const simLoad = ref(15); 
const simTemp = ref(92);
const simFuel = ref(58);
const simBattery = ref(13.60);
const simEcon = ref(9.4);
const simHeading = ref(120);
const currentTime = ref('12:00');

let simulationInterval = null;
let isAccelerating = true;

// --- CÁLCULOS GEOMÉTRICOS ---
const rpmPercent = computed(() => Math.min((simRpm.value / 8000) * 100, 100));
const speedPercent = computed(() => Math.min((simSpeed.value / 220) * 100, 100));
const calculatedAutonomy = computed(() => Math.floor(((simFuel.value / 100) * 55) * simEcon.value));

// --- 🍃 LÓGICA DO ECO-DRIVING (CORES DINÂMICAS) ---
const ecoColors = computed(() => {
  if (simRpm.value > 3200 || simLoad.value > 65) {
    return {
      start: '#f43f5e', end: '#be123c', glow: 'rgba(244,63,94,0.6)', border: 'rgba(244,63,94,0.2)',
      speedStart: '#f43f5e', speedEnd: '#9f1239', speedGlow: 'rgba(244,63,94,0.5)'
    };
  } else if (simRpm.value > 2300 || simLoad.value > 35) {
    return {
      start: '#facc15', end: '#ca8a04', glow: 'rgba(250,204,21,0.6)', border: 'rgba(250,204,21,0.2)',
      speedStart: '#fbbf24', speedEnd: '#b45309', speedGlow: 'rgba(251,191,36,0.5)'
    };
  }
  return {
    start: '#10b981', end: '#06b6d4', glow: 'rgba(16,185,129,0.5)', border: 'rgba(59,130,246,0.25)',
    speedStart: '#3b82f6', speedEnd: '#1d4ed8', speedGlow: 'rgba(59,130,246,0.5)'
  };
});

const ambientGlow = computed(() => {
  if (simRpm.value > 3200) return 'rgba(244,63,94,0.1)';
  if (simRpm.value > 2300) return 'rgba(250,204,21,0.1)';
  return 'rgba(56,189,248,0.15)';
});

const suggestShiftUp = computed(() => simRpm.value > 2400 && simLoad.value < 40 && simSpeed.value > 10);

// --- 🛠️ LÓGICA DE SAÚDE DO MOTOR (ALERTAS PREDITIVOS) ---
const engineAlert = computed(() => {
  if (simTemp.value >= 105) {
    return { type: 'CRÍTICO', title: 'SUPER-AQUECIMENTO', value: `${Math.floor(simTemp.value)}°C` };
  }
  if (simBattery.value < 12.8 || simBattery.value > 15.0) {
    return { type: 'ELÉTRICA', title: 'FALHA NO ALTERNADOR', value: `${simBattery.value.toFixed(2)}V` };
  }
  return null;
});

// --- CICLO DA SIMULAÇÃO ---
onMounted(() => {
  const date = new Date();
  currentTime.value = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  simulationInterval = setInterval(() => {
    simHeading.value += 0.2;
    if (simFuel.value > 5) simFuel.value -= 0.003;

    if (isAccelerating) {
      simSpeed.value += 0.7;
      simRpm.value += 44;
      simLoad.value = Math.min(simLoad.value + 2, 85); 
      
      if (Math.random() > 0.998) simTemp.value = 106; // Trigger térmico raro

      if (simRpm.value > 3500) {
        simRpm.value = 1900; 
        simLoad.value = 30; 
      }
      if (simSpeed.value > 125) isAccelerating = false;
    } else {
      simSpeed.value -= 0.4;
      simRpm.value -= 22;
      simLoad.value = Math.max(simLoad.value - 1.5, 10); 
      simTemp.value = 92; 

      if (simSpeed.value < 38) isAccelerating = true;
    }

    if (simSpeed.value < 0) simSpeed.value = 0;
    if (simRpm.value < 800) simRpm.value = 800;
    simBattery.value = 13.60 + (Math.random() * 0.1 - 0.05); // Tensão estável com leve oscilação

  }, 100);
});

onUnmounted(() => {
  if (simulationInterval) clearInterval(simulationInterval);
});
</script>

<style scoped>
.civic-cluster-bg {
  background-color: #02040a;
  background-image: linear-gradient(180deg, #050d22 0%, #010307 70%, #000000 100%);
}

.civic-gauge {
  background: linear-gradient(180deg, rgba(12, 24, 56, 0.5) 0%, rgba(3, 7, 18, 0.85) 60%, rgba(0, 0, 0, 0.95) 100%);
  border: 1px solid;
  box-shadow: inset 0 10px 25px -5px rgba(59, 130, 246, 0.1);
}

.civic-center-card {
  background: linear-gradient(180deg, rgba(14, 28, 64, 0.8) 0%, rgba(4, 9, 23, 0.95) 100%);
}
</style>