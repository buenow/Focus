<template>
  <div class="h-screen w-screen civic-cluster-bg text-white font-sans overflow-hidden flex relative select-none">
    
    <!-- EFEITO DE ILUMINAÇÃO AMBIENTE -->
    <div class="absolute top-0 inset-x-0 h-[50%] bg-gradient-to-b from-blue-600/30 via-indigo-950/15 to-transparent blur-[120px] pointer-events-none z-0"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[150px] bg-sky-400/15 blur-[80px] rounded-full pointer-events-none z-0"></div>

    <!-- SIDEBAR DE NAVEGAÇÃO VIA TOQUE (Ideal para Focus 2008 sem comandos no volante) -->
    <aside class="w-24 h-full bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-6 gap-8 z-20 relative shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      <div class="mb-4">
        <h2 class="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">N<span class="text-white">OS</span></h2>
      </div>
      
      <nav class="flex flex-col gap-6 w-full px-3">
        <button class="w-full aspect-square rounded-2xl bg-blue-600/20 border border-blue-500/50 flex flex-col items-center justify-center text-blue-400 hover:bg-blue-500/40 transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <svg class="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">Painel</span>
        </button>
        <button class="w-full aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-slate-400 hover:bg-white/10 transition-all">
          <svg class="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">GPS</span>
        </button>
        <button class="w-full aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-slate-400 hover:bg-white/10 transition-all">
          <svg class="w-7 h-7 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">Config</span>
        </button>
      </nav>
      
      <div class="mt-auto flex flex-col items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
        <span class="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">CAN OK</span>
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
        
        <!-- 1. PERIFÉRICO ESQUERDO: TEMPERATURA -->
        <div class="flex flex-col items-center justify-between h-[280px] w-8">
          <span class="text-xs font-bold text-red-500">H</span>
          <div class="flex-1 w-1.5 bg-slate-800 rounded-full my-2 relative overflow-hidden">
            <div class="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500 to-cyan-300 shadow-[0_0_8px_cyan]" :style="{ height: `${simTemp}%` }"></div>
          </div>
          <span class="text-xs font-bold text-cyan-500">C</span>
          <span class="text-xs text-slate-400">🌡️</span>
        </div>

        <!-- 2. MOSTRADOR ESQUERDO: RPM -->
        <div class="relative w-[340px] h-[340px] flex items-center justify-center">
          <!-- Correção de Alinhamento: Rotação de -225deg força o início do arco exatamente no zero inferior esquerdo -->
          <svg viewBox="0 0 200 200" class="absolute inset-0 w-full h-full z-10" style="transform: rotate(-225deg); transform-origin: center;">
            <defs>
              <linearGradient id="rpmArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#10b981" />
                <stop offset="70%" stop-color="#06b6d4" />
                <stop offset="100%" stop-color="#3b82f6" />
              </linearGradient>
            </defs>
            <g v-for="i in 17" :key="i" :transform="`rotate(${(i-1) * 17.5}, 100, 100)`">
              <line x1="100" y1="5" x2="100" y2="15" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
            </g>
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#rpmArcGrad)" stroke-width="4" 
                    stroke-dasharray="565" :stroke-dashoffset="565 - (439 * rpmPercent) / 100" 
                    class="transition-all duration-100 ease-linear drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          </svg>

          <!-- Numeração RPM HTML -->
          <div class="absolute inset-0 w-full h-full pointer-events-none z-20">
            <div v-for="i in 17" :key="i" class="absolute w-full h-full flex justify-center items-start pt-0" 
                 :style="`transform: rotate(${(i-1) * 17.5 - 135}deg)`">
               <span v-if="(i - 1) % 2 === 0" 
                     class="text-xl font-black text-slate-300 drop-shadow-md translate-y-[-35px]" 
                     :style="`transform: rotate(${-((i-1) * 17.5 - 135)}deg)`">
                  {{ (i - 1) / 2 }}
               </span>
            </div>
          </div>

          <!-- Interior do Mostrador (Tamanho do número reduzido para elegância) -->
          <div class="civic-gauge relative z-0 w-[240px] h-[240px] rounded-full flex flex-col items-center justify-center p-6 shadow-inner">
            <span class="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Rotação</span>
            <span class="text-2xl font-black text-slate-100 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              {{ Math.floor(simRpm) }}
            </span>
            <span class="text-[10px] text-slate-500 font-bold uppercase mt-0.5">RPM</span>
          </div>
        </div>

        <!-- 3. PAINEL CENTRAL: VELOCIDADE E AUTONOMIA EM DESTAQUE -->
        <div class="w-[300px] flex flex-col justify-center items-center gap-4 h-[340px] pt-4">
          <!-- Velocidade Digital -->
          <div class="flex items-baseline gap-1">
            <span class="text-[5.5rem] leading-none font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              {{ Math.floor(simSpeed) }}
            </span>
            <span class="text-base text-slate-400 font-bold uppercase">km/h</span>
          </div>

          <!-- CARD CENTRAL DE AUTONOMIA -->
          <div class="civic-center-card w-full p-5 text-center rounded-2xl flex flex-col gap-3">
             <div class="border-b border-white/10 pb-3">
               <p class="text-[10px] uppercase text-cyan-400 tracking-widest font-bold mb-1">Autonomia Restante</p>
               <div class="text-3xl font-black text-white tracking-tight">
                 {{ calculatedAutonomy }} <span class="text-lg text-slate-400 font-normal">km</span>
               </div>
             </div>
             
             <!-- Grid de Dados Auxiliares -->
             <div class="grid grid-cols-2 gap-2 pt-1 text-left">
                <div class="bg-black/20 p-2 rounded-lg border border-white/5">
                  <span class="text-[9px] text-slate-400 block uppercase">Bateria</span>
                  <span class="text-sm font-bold text-emerald-400">{{ simBattery }}V</span>
                </div>
                <div class="bg-black/20 p-2 rounded-lg border border-white/5">
                  <span class="text-[9px] text-slate-400 block uppercase">Consumo</span>
                  <span class="text-sm font-bold text-white">{{ simEcon }} km/l</span>
                </div>
             </div>

             <div class="flex justify-between items-center px-1 text-xs">
                <span class="text-slate-400 uppercase text-[9px]">Temp. Motor</span>
                <span class="font-bold text-slate-200">92 °C</span>
             </div>
          </div>
        </div>

        <!-- 4. MOSTRADOR DIREITO: VELOCIDADE ANALÓGICA -->
        <div class="relative w-[340px] h-[340px] flex items-center justify-center">
          <!-- Correção de Alinhamento: Rotação de -225deg para bater 1:1 com o painel digital -->
          <svg viewBox="0 0 200 200" class="absolute inset-0 w-full h-full z-10" style="transform: rotate(-225deg); transform-origin: center;">
            <defs>
              <linearGradient id="speedArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#1d4ed8" />
                <stop offset="70%" stop-color="#3b82f6" />
                <stop offset="100%" stop-color="#93c5fd" />
              </linearGradient>
            </defs>
            <g v-for="i in 23" :key="i" :transform="`rotate(${(i-1) * 12.7}, 100, 100)`">
               <line x1="100" y1="5" x2="100" y2="15" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
            </g>
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#speedArcGrad)" stroke-width="4" 
                    stroke-dasharray="565" :stroke-dashoffset="565 - (439 * speedPercent) / 100" 
                    class="transition-all duration-100 ease-linear drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          </svg>

          <!-- Numeração Dinâmica HTML -->
          <div class="absolute inset-0 w-full h-full pointer-events-none z-20">
            <div v-for="i in 23" :key="i" class="absolute w-full h-full flex justify-center items-start pt-0" 
                 :style="`transform: rotate(${(i-1) * 12.7 - 135}deg)`">
               <span v-if="((i - 1) * 10) % 20 === 0" 
                     class="text-xl font-black text-slate-300 drop-shadow-md translate-y-[-35px]" 
                     :style="`transform: rotate(${-((i-1) * 12.7 - 135)}deg)`">
                  {{ (i - 1) * 10 }}
               </span>
            </div>
          </div>

          <!-- Conteúdo Interno (Bússola / ODO) -->
          <div class="civic-gauge relative z-0 w-[240px] h-[240px] rounded-full flex flex-col items-center justify-center p-6 text-center">
            <span class="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Direção</span>
            <div class="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center relative shadow-inner">
              <div class="w-12 h-12 rounded-full border-t-2 border-r-2 border-blue-500 transition-transform duration-1000" :style="{ transform: `rotate(${simHeading}deg)` }"></div>
              <span class="absolute text-sm font-bold text-white">NW</span>
            </div>
            <span class="text-[10px] text-slate-500 tracking-widest font-mono mt-4">ODO 142.381 KM</span>
          </div>
        </div>

        <!-- 5. PERIFÉRICO DIREITO: COMBUSTÍVEL COM DESIGN ANTI-SOBREPOSIÇÃO -->
        <div class="flex items-center h-[280px] w-20 gap-2">
          <!-- Coluna das Marcações Numéricas (Alinhadas à esquerda e livres da barra) -->
          <div class="flex flex-col justify-between h-full text-[10px] font-black text-slate-400 text-right w-7 pb-6 pt-0.5">
            <span>F</span>
            <span>3/4</span>
            <span>1/2</span>
            <span>1/4</span>
            <span class="text-red-500">E</span>
          </div>
          
          <!-- Coluna Física da Barra Indicadora -->
          <div class="flex flex-col items-center justify-between h-full w-4">
            <div class="w-2 h-full bg-slate-800 rounded-full relative overflow-hidden border border-white/5 shadow-inner">
              <div class="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 via-white to-white shadow-[0_0_8px_white] transition-all duration-500" :style="{ height: `${simFuel}%` }"></div>
            </div>
            <span class="text-xs mt-1">⛽</span>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// --- ESTADOS DA SIMULAÇÃO AUTÔNOMA ---
const simSpeed = ref(0);
const simRpm = ref(800);
const simTemp = ref(84);
const simFuel = ref(58); // Iniciando acima do meio tanque
const simBattery = ref(13.8);
const simEcon = ref(9.4); // Consumo inicial padrão do Focus 2.0
const simHeading = ref(120);
const currentTime = ref('12:00');

let simulationInterval = null;
let isAccelerating = true;

// --- MATEMÁTICA CALIBRADA DOS ARCOS (Mapeando os 280° exatos da escala) ---
const rpmPercent = computed(() => Math.min((simRpm.value / 8000) * 100, 100));
const speedPercent = computed(() => Math.min((simSpeed.value / 220) * 100, 100));

// --- CÁLCULO DE AUTONOMIA BASEADO NO CONSUMO REAL ---
const calculatedAutonomy = computed(() => {
  const litrosRestantes = (simFuel.value / 100) * 55; // Tanque Focus: ~55L
  return Math.floor(litrosRestantes * simEcon.value);
});

onMounted(() => {
  // Relógio atualizado
  const date = new Date();
  currentTime.value = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  // Loop dinâmico da física da simulação
  simulationInterval = setInterval(() => {
    simHeading.value += 0.2;
    
    // Consumo simbólico lento de combustível
    if (simFuel.value > 5) simFuel.value -= 0.003;

    if (isAccelerating) {
      simSpeed.value += 0.7;
      simRpm.value += 44;
      simEcon.value = parseFloat((8.2 + Math.random() * 0.4).toFixed(1));

      // Simulação de Troca de Marcha Manual (Giro cai e velocidade continua subindo)
      if (simRpm.value > 3400) {
        simRpm.value = 1900; 
      }
      if (simSpeed.value > 115) {
        isAccelerating = false;
      }
    } else {
      // Desaceleração voluntária / Freio motor
      simSpeed.value -= 0.4;
      simRpm.value -= 22;
      simEcon.value = parseFloat((13.1 + Math.random() * 0.6).toFixed(1));

      if (simSpeed.value < 38) {
        isAccelerating = true;
      }
    }

    // Travas físicas de segurança do mostrador
    if (simSpeed.value < 0) simSpeed.value = 0;
    if (simRpm.value < 800) simRpm.value = 800;
    simBattery.value = (13.6 + Math.random() * 0.2).toFixed(1);

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
  border: 1px solid rgba(59, 130, 246, 0.25);
  box-shadow: inset 0 10px 25px -5px rgba(59, 130, 246, 0.2);
}

.civic-center-card {
  background: linear-gradient(180deg, rgba(14, 28, 64, 0.6) 0%, rgba(4, 9, 23, 0.85) 60%, rgba(1, 2, 5, 0.98) 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.9);
}
</style>