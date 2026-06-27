<template>
  <div class="p-6 text-slate-200 h-full flex flex-col bg-slate-950">
    
    <div class="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
      <div>
        <h1 class="text-xl font-bold tracking-wide text-white">Central de Diagnóstico ODB-II</h1>
        <p class="text-xs text-slate-400">Monitoramento de saúde e telemetria do veículo em tempo real</p>
      </div>
      <span 
        :class="[
          'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
          activeAlerts.length === 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
        ]"
      >
        {{ activeAlerts.length === 0 ? 'Sistema Saudável' : `${activeAlerts.length} Atenção Requerida` }}
      </span>
    </div>

    <div class="grid grid-cols-12 gap-6 flex-1 overflow-hidden">
      
      <div class="col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col">
        <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Histórico de Ocorrências</h2>
        
        <div class="space-y-3 overflow-y-auto flex-1 pr-2">
          <div 
            v-for="(log, index) in diagnosticLogs" 
            :key="index"
            @click="selectedLog = log"
            :class="[
              'p-3 rounded-xl border transition-all cursor-pointer text-left',
              selectedLog && selectedLog.code === log.code 
                ? 'bg-slate-800 border-cyan-500/50' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            ]"
          >
            <div class="flex justify-between items-start mb-1">
              <span class="text-xs font-bold" :class="log.active ? 'text-red-400' : 'text-slate-400'">
                {{ log.laymanTitle }}
              </span>
              <span class="text-[9px] font-mono bg-slate-950 px-1.5 py-0.5 rounded text-slate-500">{{ log.code }}</span>
            </div>
            <p class="text-[11px] text-slate-400 font-mono">{{ log.technical }}</p>
            <p class="text-[10px] text-slate-500 mt-2">{{ log.timestamp }}</p>
          </div>
        </div>
      </div>

      <div class="col-span-7 bg-slate-900/20 border border-slate-800/50 rounded-2xl p-6 flex flex-col justify-between text-left">
        
        <template v-if="selectedLog">
          <div>
            <div class="mb-4">
              <span class="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Código {{ selectedLog.code }} • {{ selectedLog.technical }}
              </span>
              <h2 class="text-lg font-bold text-white mt-1">{{ selectedLog.laymanTitle }}</h2>
            </div>

            <div class="mb-4">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">O que está acontecendo?</h3>
              <p class="text-sm text-slate-300 leading-relaxed">{{ selectedLog.meaning }}</p>
            </div>

            <div class="mb-4 bg-amber-950/20 border border-amber-500/20 p-3 rounded-xl">
              <h3 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Impacto no Veículo</h3>
              <p class="text-sm text-slate-300 leading-relaxed">{{ selectedLog.impact }}</p>
            </div>

            <div class="mb-4">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Possíveis Motivos</h3>
              <p class="text-sm text-slate-300 leading-relaxed">{{ selectedLog.causes }}</p>
            </div>
          </div>

          <div class="border-t border-slate-800 pt-4 mt-auto">
            <h3 class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">O que você deve fazer?</h3>
            <p class="text-sm text-emerald-300/90 font-medium">{{ selectedLog.solution }}</p>
          </div>
        </template>

        <div v-else class="flex flex-col items-center justify-center h-full text-slate-500">
          <svg class="w-12 h-12 mb-2 text-slate-700" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-sm">Selecione uma ocorrência ao lado para ver o diagnóstico explicativo.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Dados locais
const diagnosticLogs = ref([
  {
    code: "P0171",
    laymanTitle: "Anomalia de Injeção Detectada",
    technical: "LTFT > +15% (Mistura Pobre)",
    meaning: "O motor está recebendo menos combustível ou mais ar do que o necessário para uma queima perfeita.",
    impact: "Perda sutil de potência, aumento do consumo de combustível e, a longo prazo, superaquecimento interno das velas e cilindros.",
    causes: "Combustível adulterado ou de má qualidade; filtro de combustível entupido; entrada falsa de ar no motor.",
    solution: "Abasteça em um posto de confiança. Caso persista, peça para verificar os bicos injetores e possíveis entradas de ar falsas.",
    timestamp: "26/06/2026 11:45",
    active: true
  },
  {
    code: "P0217",
    laymanTitle: "Temperatura Alta do Motor",
    technical: "Coolant Temp > 105°C",
    meaning: "O sistema de arrefecimento não está conseguindo resfriar o motor adequadamente.",
    impact: "Risco iminente de queima da junta do cabeçote e travamento do motor (pane mecânica grave).",
    causes: "Baixo nível de água/aditivo no radiador; falha na ventoinha elétrica; válvula termostática travada.",
    solution: "Estacione o veículo em local seguro imediatamente e desligue o motor. Não abra a tampa do radiador com o motor quente.",
    timestamp: "26/06/2026 11:40",
    active: false
  }
]);

// Filtra os alertas que estão atualmente ativos
const activeAlerts = computed(() => {
  return diagnosticLogs.value.filter(log => log.active);
});

// Define o primeiro log como selecionado por padrão
const selectedLog = ref(diagnosticLogs.value[0]);
</script>