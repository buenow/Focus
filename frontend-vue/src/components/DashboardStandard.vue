<!-- src/components/DashboardStandard.vue -->
<script setup>
import { ref } from 'vue';

const props = defineProps(['vehicle']);
const activeTab = ref('cockpit'); // cockpit, logs, diagnostics
</script>

<template>
  <div class="flex h-full text-slate-200 font-sans p-6 gap-6">
    <!-- SIDEBAR ESTILIZADA -->
    <aside class="w-72 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 flex flex-col shadow-2xl">
      <div class="mb-10">
        <h1 class="text-2xl font-black italic tracking-tighter text-white">Nino<span class="text-emerald-500">OS</span></h1>
        <p class="text-[10px] text-emerald-500/60 tracking-[0.2em] uppercase font-bold">Performance Core</p>
      </div>

      <nav class="flex flex-col gap-3">
        <button @click="activeTab = 'cockpit'" :class="['p-4 rounded-xl font-bold text-sm transition-all', activeTab === 'cockpit' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'hover:bg-slate-800 text-slate-500']">📊 COCKPIT VIRTUAL</button>
        <button @click="activeTab = 'logs'" :class="['p-4 rounded-xl font-bold text-sm transition-all', activeTab === 'logs' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'hover:bg-slate-800 text-slate-500']">🗄️ LOGS & DADOS</button>
        <button @click="activeTab = 'diagnostics'" :class="['p-4 rounded-xl font-bold text-sm transition-all', activeTab === 'diagnostics' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'hover:bg-slate-800 text-slate-500']">🔌 CAN BUS</button>
      </nav>
    </aside>

    <!-- ÁREA PRINCIPAL -->
    <main class="flex-1 flex flex-col gap-6 overflow-hidden">
      
      <!-- HEADER -->
      <header class="flex justify-between items-center bg-slate-900/30 p-6 rounded-3xl border border-slate-800/50">
        <h2 class="text-xl font-black uppercase italic tracking-widest text-white">TELEMETRIA EM TEMPO REAL</h2>
        <div class="flex gap-2">
            <span class="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-bold border border-emerald-500/20">STATUS: CONECTADO</span>
        </div>
      </header>

      <!-- VIEW COCKPIT -->
      <div v-if="activeTab === 'cockpit'" class="grid grid-cols-4 gap-6 h-full">
        <!-- Indicadores Principais -->
        <div class="col-span-3 grid grid-cols-2 gap-6">
            <!-- RPM & VEL -->
            <div class="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl border border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                <p class="text-slate-500 text-xs font-bold uppercase mb-2">Rotação Motor</p>
                <div class="text-6xl font-black tracking-tighter text-white">{{ vehicle.telemetry.rpm }} <span class="text-2xl text-slate-600 font-normal">RPM</span></div>
            </div>
            <div class="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl border border-slate-800">
                <p class="text-slate-500 text-xs font-bold uppercase mb-2">Velocidade</p>
                <div class="text-6xl font-black tracking-tighter text-white">{{ vehicle.telemetry.speed }} <span class="text-2xl text-slate-600 font-normal">km/h</span></div>
            </div>
            
            <!-- Configuração Campo (Restaurada Funcionalidade) -->
            <div class="col-span-2 bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                <h3 class="text-white font-bold mb-6">CONFIGURAÇÃO DE CAMPO</h3>
                <div class="flex gap-4">
                    <input v-model="vehicle.tripOrigin" class="flex-1 bg-black/50 border border-slate-700 p-4 rounded-xl text-sm" placeholder="Origem">
                    <input v-model="vehicle.tripDest" class="flex-1 bg-black/50 border border-slate-700 p-4 rounded-xl text-sm" placeholder="Destino">
                    <button @click="vehicle.toggleTrip" class="bg-red-600 px-8 rounded-xl font-bold hover:bg-red-500 active:scale-95 transition-all">
                        {{ vehicle.isTripActive ? 'PARAR' : 'INICIAR' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Painel Lateral Direita -->
        <div class="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col gap-6">
            <div>
                <p class="text-slate-500 text-xs uppercase mb-1">Econômetro</p>
                <div class="text-2xl font-bold text-emerald-400">{{ vehicle.cargaMotor }}% Esforço</div>
            </div>
            <div class="h-px bg-slate-800"></div>
            <div>
                 <p class="text-slate-500 text-xs uppercase mb-1">Bateria</p>
                 <div class="text-2xl font-bold text-white">12.6V</div>
            </div>
        </div>
      </div>

      <!-- VIEW LOGS -->
      <div v-else class="bg-slate-900 p-8 rounded-3xl border border-slate-800 h-full overflow-auto">
        <pre class="text-emerald-500 text-xs font-mono">{{ vehicle.dbLogs }}</pre>
      </div>

    </main>
  </div>
</template>