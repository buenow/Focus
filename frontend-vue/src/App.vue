<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// Importamos a lógica externa (Desacoplamento de Arquitetura)
import { useVehicle } from './composables/useVehicle'

// Estado local exclusivo de navegação da interface
const currentScreen = ref('cockpit') 

// Estado do relógio local em tempo real
const localTime = ref('')
let clockInterval = null

const updateClock = () => {
  const now = new Date()
  localTime.value = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

onMounted(() => {
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (clockInterval) clearInterval(clockInterval)
})

// Extraímos as variáveis e funções vindas do nosso controlador "useVehicle"
const {
  telemetry,
  isConnected,
  isTripActive,
  tripOrigin,
  tripDest,
  currentTripDistance,
  distanciaEstimada,
  litrosGasolina,
  litrosAlcool,
  precoGasolina,
  precoAlcool,
  tripCost,
  dbLogs,
  volumeTotal,
  propGasolina,
  propAlcool,
  avgConsumption,
  autonomia,
  isCombustivelBaixo,
  autonomiaInsuficiente,
  cargaMotor,
  modoConducao,
  consumoInstantaneo,
  toggleTrip
} = useVehicle()
</script>

<template>
  <div class="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
    
    <aside class="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 z-10 shrink-0">
      <div class="space-y-6">
        <div class="border-b border-slate-800 pb-4">
          <h1 class="text-xl font-black tracking-wider">Nino<span class="text-emerald-500">OS</span></h1>
          <p class="text-[10px] text-slate-400 font-mono tracking-widest">VEHICLE ECOSYSTEM</p>
        </div>

        <nav class="flex flex-col gap-2">
          <button 
            @click="currentScreen = 'cockpit'"
            :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all border uppercase', currentScreen === 'cockpit' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-950 text-slate-400 border-slate-800/60 hover:bg-slate-800 hover:text-slate-200']">
            📊 Cockpit Virtual
          </button>

          <button 
            @click="currentScreen = 'logs'"
            :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all border uppercase', currentScreen === 'logs' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-950 text-slate-400 border-slate-800/60 hover:bg-slate-800 hover:text-slate-200']">
            🗄️ Banco de Dados / Logs
          </button>

          <button 
            @click="currentScreen = 'diagnosticos'"
            :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs font-bold tracking-wider transition-all border uppercase', currentScreen === 'diagnosticos' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-950 text-slate-400 border-slate-800/60 hover:bg-slate-800 hover:text-slate-200']">
            🔌 Diagnósticos CAN
          </button>
        </nav>
      </div>

      <div class="border-t border-slate-800 pt-4 text-center">
        <div :class="['inline-block w-full px-2 py-1 rounded text-[10px] font-mono font-bold border transition-all', isConnected ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30' : 'bg-red-950/80 text-red-400 border-red-500/30 animate-pulse']">
          {{ isConnected ? 'CAN: CONECTADO' : 'CAN: DESCONECTADO' }}
        </div>
      </div>
    </aside>

    <div class="flex-grow flex flex-col h-full overflow-y-auto p-6 justify-between">
      
      <header class="flex justify-between items-center border-b border-slate-800 pb-3 mb-4 shrink-0">
        <div>
          <h2 class="text-lg font-bold font-mono tracking-wide text-slate-300 uppercase">
            {{ currentScreen === 'cockpit' ? 'Painel de Telemetria Ativa' : currentScreen === 'logs' ? 'Repositório de Logs e Homologação' : 'Monitor de barramento CAN Bus' }}
          </h2>
        </div>
        <div class="text-[10px] text-slate-500 font-mono flex items-center gap-4">
          <span>HORA LOCAL: <b class="text-slate-300">{{ localTime }}</b></span>
          <span>|</span>
          <span>FRAMEWORK L. v1.5</span>
        </div>
      </header>

      <main v-if="currentScreen === 'cockpit'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 flex-grow mb-6">
        
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <span class="text-xs font-bold text-slate-400 tracking-wider font-mono uppercase">Rotação</span>
          <div class="my-auto py-2">
            <span class="text-5xl font-black font-mono tracking-tight">{{ telemetry.rpm }}</span>
            <span class="text-xs text-slate-500 ml-1 font-bold font-mono">RPM</span>
          </div>
          <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r from-emerald-500 to-red-500 h-full transition-all duration-100" :style="{ width: `${Math.min((telemetry.rpm / 6500) * 100, 100)}%` }"></div>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <span class="text-xs font-bold text-slate-400 tracking-wider font-mono uppercase">Velocidade</span>
          <div class="my-auto py-2">
            <span class="text-5xl font-black font-mono tracking-tight text-emerald-400">{{ isTripActive ? telemetry.speed : 0 }}</span>
            <span class="text-xs text-slate-500 ml-1 font-bold font-mono">km/h</span>
          </div>
          <div class="text-[10px] text-slate-500 font-mono tracking-widest">PID 010D VIA CAN</div>
        </div>

        <div :class="['border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all duration-500', modoConducao.bg]">
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold text-slate-400 tracking-wider font-mono uppercase">Econômetro</span>
            <span :class="['text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-current/20', modoConducao.cor]">
              {{ modoConducao.nome }}
            </span>
          </div>
          <div class="my-auto py-1 text-center">
            <div class="text-3xl font-black font-mono tracking-tight" :class="modoConducao.cor">
              {{ cargaMotor }}<span class="text-xs text-slate-400 ml-0.5 font-normal">% Esforço</span>
            </div>
            <div class="text-md font-mono font-bold mt-1 text-slate-200">
              {{ telemetry.speed > 0 ? `${consumoInstantaneo.toFixed(1)} km/L` : '--- km/L' }}
            </div>
            <div class="text-[9px] text-slate-400 font-mono uppercase tracking-tight mt-0.5">Consumo Instantâneo</div>
          </div>
          <div class="w-full bg-slate-800 h-2 rounded overflow-hidden">
            <div class="h-full transition-all duration-300" :class="modoConducao.barra" :style="{ width: `${cargaMotor}%` }"></div>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <span class="text-xs font-bold text-slate-400 tracking-wider font-mono uppercase">Sistemas & Energia</span>
          <div class="space-y-3 my-auto font-mono text-xs">
            <div class="flex justify-between border-b border-slate-800 pb-1">
              <span class="text-slate-400">Motor:</span>
              <span :class="['font-bold', telemetry.status_motor === 'Pane Seca' ? 'text-red-500 animate-pulse' : 'text-orange-400']">
                {{ telemetry.status_motor }}
              </span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-1">
              <span class="text-slate-400">Arrefec:</span>
              <span class="font-bold text-slate-200">{{ telemetry.coolant_temp.toFixed(1) }} °C</span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-1">
              <span class="text-slate-400">Bateria:</span>
              <span class="font-bold text-emerald-400">{{ telemetry.battery || '12.6' }}V</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Gerador:</span>
              <span :class="['font-bold', telemetry.rpm > 500 ? 'text-emerald-500' : 'text-red-500']">
                {{ telemetry.rpm > 500 ? 'ATIVO' : 'INATIVO' }}
              </span>
            </div>
          </div>
          <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div class="bg-orange-500 h-full transition-all duration-500" :style="{ width: `${Math.min((telemetry.coolant_temp / 120) * 100, 100)}%` }"></div>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div class="flex justify-between items-start">
            <span class="text-xs font-bold text-slate-400 tracking-wider font-mono uppercase">Ambiente & Clima</span>
            <span class="text-2xl leading-none filter drop-shadow animate-pulse">☁️</span>
          </div>
          <div class="my-auto py-1 font-mono">
            <div class="text-2xl font-black text-slate-200 tracking-tight text-center border-b border-slate-800/60 pb-1.5 mb-1.5">
              {{ localTime.split(':')[0] }}:{{ localTime.split(':')[1] }}<span class="text-xs text-slate-500 font-normal ml-1">{{ localTime.split(':')[2] }}</span>
            </div>
            <div class="space-y-1 text-xs">
              <div class="flex justify-between"><span class="text-slate-400">Temp. Externa:</span><span class="font-bold text-cyan-400">24.0 °C</span></div>
              <div class="flex justify-between"><span class="text-slate-400">Temp. Interna:</span><span class="font-bold text-emerald-400">22.5 °C</span></div>
            </div>
          </div>
          <div class="text-[9px] text-slate-500 font-mono uppercase tracking-tight text-center">Previsão: Ensolarado / Parcialmente Nublado</div>
        </div>

        <div class="xl:col-span-5 lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="space-y-3 lg:border-r lg:border-slate-800 lg:pr-4">
            <h3 class="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider">Configuração de Campo</h3>
            <div>
              <label class="block text-[11px] text-slate-400 font-mono">Origem / Destino / Distância Alvo:</label>
              <div class="flex gap-2 mt-1">
                <input v-model="tripOrigin" type="text" class="w-2/5 bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-200 font-mono">
                <input v-model="tripDest" type="text" class="w-2/5 bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-200 font-mono">
                <input v-model.number="distanciaEstimada" type="number" class="w-1/5 bg-slate-950 border border-slate-800 rounded p-1.5 text-xs font-mono text-center text-slate-200">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div><label class="block text-[11px] text-slate-400 font-mono">Preço G (R$):</label><input v-model.number="precoGasolina" type="number" step="0.01" class="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs font-mono"></div>
              <div><label class="block text-[11px] text-slate-400 font-mono">Preço E (R$):</label><input v-model.number="precoAlcool" type="number" step="0.01" class="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs font-mono"></div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div><label class="block text-[11px] text-slate-400 font-mono">Tanque G (L):</label><input v-model.number="litrosGasolina" type="number" step="0.1" class="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs font-mono text-emerald-400 font-bold"></div>
              <div><label class="block text-[11px] text-slate-400 font-mono">Tanque E (L):</label><input v-model.number="litrosAlcool" type="number" step="0.1" class="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-xs font-mono text-amber-500 font-bold"></div>
            </div>
          </div>

          <div class="flex flex-col justify-between space-y-4 lg:border-r lg:border-slate-800 lg:pr-4">
            <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-2 text-xs font-mono relative">
              <div v-if="isCombustivelBaixo" class="absolute -top-2 right-2 bg-amber-600 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded shadow">⚠️ REABASTECER</div>
              <div class="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Análise Estequiométrica Flex</div>
              <div class="flex justify-between"><span>Litragem Total:</span><span class="font-bold text-slate-200">{{ volumeTotal.toFixed(1) }} L</span></div>
              <div class="flex justify-between"><span>Autonomia:</span><span :class="['font-bold', isCombustivelBaixo ? 'text-amber-500' : 'text-slate-200']">{{ autonomia.toFixed(1) }} Km</span></div>
              <div class="flex justify-between"><span>Consumo Médio:</span><span class="text-cyan-400 font-bold">{{ avgConsumption.toFixed(2) }} Km/L</span></div>
              <div class="w-full bg-slate-800 h-2 rounded mt-2 overflow-hidden flex">
                <div class="bg-emerald-500 h-full" :style="{ width: `${propGasolina * 100}%` }"></div>
                <div class="bg-amber-500 h-full" :style="{ width: `${propAlcool * 100}%` }"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div v-if="autonomiaInsuficiente" class="bg-red-950/60 border border-red-500/30 rounded p-2 text-center text-[11px] text-red-400 font-mono font-bold">🛑 AUTONOMIA INSUFICIENTE</div>
              <button @click="toggleTrip" :disabled="autonomiaInsuficiente && !isTripActive" :class="['w-full py-3 rounded-xl font-mono font-bold tracking-wider text-sm transition-all duration-300', isTripActive ? 'bg-red-600 text-white animate-pulse' : autonomiaInsuficiente ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' : 'bg-emerald-500 text-slate-950 hover:bg-emerald-600']">
                {{ isTripActive ? '⏹ FINALIZAR TRAJETO' : '▶ INICIAR TRAJETO' }}
              </button>
            </div>
          </div>

          <div class="flex flex-col justify-between items-center bg-slate-950/50 rounded-xl p-4 border border-slate-800/60">
            <span class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Gasto Real Computado</span>
            <div class="text-center my-auto">
              <div class="text-4xl font-black font-mono text-emerald-400">R$ {{ tripCost.toFixed(2) }}</div>
              <div class="text-xs font-mono text-slate-500 mt-1">{{ currentTripDistance.toFixed(2) }} km percorridos</div>
            </div>
            <span class="text-[10px] text-slate-600 font-mono text-center">Fórmula Homologada CAN Bus</span>
          </div>
        </div>
      </main>

      <main v-else-if="currentScreen === 'logs'" class="flex-grow bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider">Log de Aprovações e Configurações de Engenharia</h3>
          <span class="text-xs font-mono text-slate-500">Tabela Ativa: `homologacao_reports`</span>
        </div>
        <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
          <table class="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr class="bg-slate-900 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <th class="p-3 border-r border-slate-800">ID</th>
                <th class="p-3 border-r border-slate-800">Data/Hora</th>
                <th class="p-3 border-r border-slate-800">Registrado Por</th>
                <th class="p-3 border-r border-slate-800">Revisado Por</th>
                <th class="p-3 border-r border-slate-800">Status</th>
                <th class="p-3">Descrição da Recomendação</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800 text-slate-300">
              <tr v-for="log in dbLogs" :key="log.id" class="hover:bg-slate-900/40">
                <td class="p-3 border-r border-slate-800 text-slate-500 font-bold">{{ log.id }}</td>
                <td class="p-3 border-r border-slate-800 text-slate-400">{{ log.data }}</td>
                <td class="p-3 border-r border-slate-800 text-cyan-400 font-bold">{{ log.usuario_registro }}</td>
                <td class="p-3 border-r border-slate-800 text-emerald-400 font-bold">{{ log.usuario_revisor }}</td>
                <td class="p-3 border-r border-slate-800">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                    {{ log.status }}
                  </span>
                </td>
                <td class="p-3 text-slate-400">{{ log.descricao }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-[10px] text-slate-500 mt-3 font-mono">💡 Este módulo simula a leitura relacional do SQLite local. Pronto para gerar relatórios automatizados.</p>
      </main>

      <main v-else-if="currentScreen === 'diagnosticos'" class="flex-grow bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6 flex flex-col justify-between">
        <div>
          <h3 class="text-sm font-bold text-cyan-400 font-mono uppercase tracking-wider mb-4">Sniffer de Pacotes / Monitor PID Ativo</h3>
          <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-400 space-y-2">
            <div class="flex gap-4"><span class="text-emerald-500">[RAW CAN]</span><span>ID: 0x7E8</span><span>DATA: 03 41 0C {{ telemetry.rpm.toString(16).toUpperCase() }}</span><span class="text-slate-600">// Engine RPM PID 0C</span></div>
            <div class="flex gap-4"><span class="text-emerald-500">[RAW CAN]</span><span>ID: 0x7E8</span><span>DATA: 02 41 0D {{ telemetry.speed.toString(16).toUpperCase() }}</span><span class="text-slate-600">// Vehicle Speed PID 0D</span></div>
            <div class="flex gap-4"><span class="text-emerald-500">[RAW CAN]</span><span>ID: 0x7E8</span><span>DATA: 02 41 06 {{ Math.round(telemetry.stft + 128).toString(16).toUpperCase() }}</span><span class="text-slate-600">// STFT Bank 1 PID 06</span></div>
          </div>
        </div>
        <span class="text-[10px] text-slate-500 font-mono mt-4">Escuta ativa na porta local via WebSockets em tempo real.</span>
      </main>

      <footer class="text-center text-[10px] text-slate-600 font-mono border-t border-slate-800/60 pt-3 shrink-0">
        NinoOS Ecosystem v1.5 | Painel Escalável Baseado em Componentes Reativos
      </footer>
    </div>

  </div>
</template>