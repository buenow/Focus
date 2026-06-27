<template>
  <div class="flex h-screen w-screen bg-slate-950 text-slate-200 font-sans overflow-hidden select-none">
    
    <!-- BARRA LATERAL DE NAVEGAÇÃO -->
    <aside class="w-24 bg-slate-900/60 border-r border-slate-800/80 flex flex-col items-center py-6 justify-between z-30">
      <div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      </div>

      <div class="flex flex-col gap-4 w-full px-2">
        <!-- BOTÃO 1: PAINEL -->
        <button 
          @click="currentTab = 'painel'"
          :class="[
            'w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 border text-slate-400 hover:bg-white/5',
            currentTab === 'painel' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'border-transparent'
          ]"
        >
          <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">Painel</span>
        </button>

        <!-- BOTÃO 2: GPS -->
        <button 
          @click="currentTab = 'gps'"
          :class="[
            'w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 border text-slate-400 hover:bg-white/5',
            currentTab === 'gps' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'border-transparent'
          ]"
        >
          <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
          </svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">GPS</span>
        </button>

        <!-- BOTÃO 3: OBD-II -->
        <button 
          @click="() => { console.log('Clicou no botão!'); currentTab = 'obd'; }"
          style="pointer-events: auto !important; z-index: 9999 !important; position: relative !important;"
          :class="[
            'w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 border hover:bg-white/5',
            currentTab === 'obd' 
              ? 'bg-red-500/10 border-red-500/50 text-red-400 font-bold' 
              : 'border-transparent text-slate-400'
          ]"
        >
          <svg class="w-6 h-6 mb-1 text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="pointer-events: none;">
            <circle cx="12" cy="12" r="5.5" />
            <path stroke-linecap="round" d="M12 8v4" stroke-width="2.5" />
            <path stroke-linecap="round" d="M12 16.2h.01" stroke-width="3" />
            <path stroke-linecap="round" d="M4.5 6.5A9 9 0 0 0 4.5 17.5" />
            <path stroke-linecap="round" d="M19.5 6.5A9 9 0 0 1 19.5 17.5" />
          </svg>
          <span class="text-[9px] font-bold uppercase tracking-wider" style="pointer-events: none;">OBD-II</span>
        </button>
      </div>

      <button 
        @click="currentTab = 'config'"
        :class="[
          'w-14 aspect-square rounded-xl flex items-center justify-center transition-all duration-200 border text-slate-400 hover:bg-white/5',
          currentTab === 'config' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'border-transparent'
        ]"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.767c-.307.235-.45.645-.366 1.022.008.037.014.075.018.113.017.38c.241.713.241 1.474 0 2.186-.004.038-.01.076-.017.113-.085.377.058.787.365 1.022l1.004.767a1.125 1.125 0 01.26 1.43l-1.297 2.247a1.125 1.125 0 01-1.37.491l-1.216-.456c-.356-.133-.752-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.767c.307-.235.45-.645.366-1.022a4.18 4.18 0 01-.018-.113c-.016-.382-.24-.715-.24-1.43 0-.714.224-1.048.24-1.43.004-.038.01-.076.017-.113.085-.377-.058-.787-.365-1.022l-1.004-.767a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </aside>

    <!-- ÁREA CENTRAL DE CONTEÚDO -->
    <main class="flex-1 h-full relative bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col justify-between p-6 overflow-hidden">
      
      <!-- ABA 1: PAINEL DE VELOCÍMETRO -->
      <div v-if="currentTab === 'painel'" class="flex-1 flex flex-col justify-between h-full">
        
        <div class="h-12 flex items-center justify-center">
          <div 
            v-if="activeAlerts.length > 0"
            @click="currentTab = 'obd'"
            class="animate-pulse cursor-pointer flex items-center gap-3 bg-red-950/40 border border-red-500/40 px-5 py-2 rounded-xl max-w-md backdrop-blur-sm shadow-lg shadow-red-950/20 transition-all hover:border-red-500"
          >
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <div class="flex-1 text-left">
              <p class="text-[10px] font-bold text-red-400 uppercase tracking-widest leading-none">Aviso do Sistema</p>
              <!-- CORREÇÃO DA BUSCA DO ITEM [0] AQUI -->
              <p class="text-[13px] text-slate-200 font-medium mt-0.5">{{ activeAlerts[0].laymanTitle }}</p>
            </div>
            <span class="text-[9px] bg-red-500/20 text-red-300 px-2 py-1 rounded-md font-bold uppercase tracking-wider">Ver Solução</span>
          </div>
        </div>
        <!-- GRID CENTRAL DOS INSTRUMENTOS (RPM, VELOCÍMETRO, CONSUMO) -->
        <div class="grid grid-cols-12 gap-4 items-center justify-center my-auto">
          <div class="col-span-4 flex justify-center opacity-80">
            <div class="text-center">
              <span class="text-4xl font-mono text-slate-400 font-bold">3.2</span>
              <p class="text-[10px] uppercase text-slate-500 tracking-wider">RPM x1000</p>
            </div>
          </div>

          <div class="col-span-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-xl grid grid-cols-2 gap-y-5 gap-x-4">
            <div class="flex items-center gap-3 text-left">
              <svg class="w-6 h-6 text-slate-300 drop-shadow-md" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              <div class="flex flex-col">
                <span class="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Autonomia</span>
                <span class="text-[15px] font-bold text-white leading-none mt-0.5">340<span class="text-[10px] text-slate-400 font-normal ml-0.5">km</span></span>
              </div>
            </div>
          </div>

          <div class="col-span-4 flex justify-center">
            <div class="text-center">
              <span class="text-6xl font-mono font-black text-white tracking-tight">120</span>
              <p class="text-[11px] font-bold uppercase tracking-widest text-cyan-400 mt-1">km/h</p>
            </div>
          </div>
        </div>

        <div class="h-10 border-t border-slate-900 flex items-center justify-between px-4 text-xs text-slate-500">
          <span>Marcha: <strong class="text-slate-300">D</strong></span>
          <span class="font-mono">26/06/2026 13:19</span>
          <span>Modo: <strong class="text-cyan-400">ECO</strong></span>
        </div>
      </div>

      <!-- ABA 2: CENTRAL DE DIAGNÓSTICO OBD-II -->
      <div v-else-if="currentTab === 'obd'" class="w-full h-full">
        <TelaDiagnostico />
      </div>

      <!-- ABA 3 E 4: GPS E CONFIGURAÇÕES -->
      <div v-else class="flex-1 flex items-center justify-center text-slate-500 text-sm">
        <p v-if="currentTab === 'gps'">Módulo de Navegação GPS não configurado.</p>
        <p v-if="currentTab === 'config'">Menu de Configurações do Sistema Geral.</p>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import TelaDiagnostico from './TelaDiagnostico.vue';

const currentTab = ref('painel');
const simBattery = ref(13.60);

const activeAlerts = ref([
 {
   code: "P0171",
   laymanTitle: "Anomalia de Injeção Detectada",
   technical: "LTFT > +15% (Mistura Pobre)"
 }
]);

let mockInterval = null;
onMounted(() => {
 mockInterval = setInterval(() => {
   simBattery.value = 13.52 + Math.random() * 0.15;
 }, 2500);
});

onUnmounted(() => {
 if (mockInterval) clearInterval(mockInterval);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
 transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
 opacity: 0;
}
</style>
