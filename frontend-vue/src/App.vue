<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// =========================================================================
// [SISTEMA] CONTROLE DE NAVEGAÇÃO (ESTADO DAS TELAS / VIEWS)
// =========================================================================
const currentScreen = ref('cockpit') // Telas disponíveis: 'cockpit', 'logs', 'diagnosticos', 'config'

// =========================================================================
// [MODEL] ESTADOS REATIVOS DA TELEMETRIA (REDE CAN BUS)
// =========================================================================
const telemetry = ref({
  rpm: 0,
  speed: 0,
  coolant_temp: 25.0,
  stft: 0.0, 
  ltft: 0.0,
  status_motor: 'Desligado'
})

const isConnected = ref(false)
let ws = null

// =========================================================================
// [MODEL] ESTADOS DO MÓDULO TRIP (COMPUTADOR DE BORDO)
// =========================================================================
const isTripActive = ref(false)
const tripOrigin = ref('Americana')
const tripDest = ref('Santa Bárbara')
const currentTripDistance = ref(0.0)
const distanciaEstimada = ref(15.0) 

// Parâmetros de engenharia base do Ford Focus 2008 Flex
const consumoPuroGasolina = ref(11.5) 
const consumoPuroAlcool = ref(7.5)     
const limiteReserva = ref(7.0)         

// Tanque de Combustível Dinâmico
const litrosGasolina = ref(25.0)
const litrosAlcool = ref(15.0)
const precoGasolina = ref(5.50)
const precoAlcool = ref(3.80)

const tripCost = ref(0.0) 
let tripInterval = null

// =========================================================================
// [MODEL / MOCK] DADOS TEMPORÁRIOS DO BANCO DE DADOS (FLUXO DE APROVAÇÃO/RELIATORIOS)
// =========================================================================
const dbLogs = ref([
  { id: 1, data: '2026-06-24 10:15', usuario_registro: 'Admin_Oficina', usuario_revisor: 'Eng_Mecanico', status: 'Homologado', descricao: 'Calibração de Injeção Padrão Focus 2008' },
  { id: 2, data: '2026-06-23 14:30', usuario_registro: 'Técnico_Bancada', usuario_revisor: 'Eng_Mecanico', status: 'Revisado', descricao: 'Ajuste Estequiométrico para Etanol Puro' }
])

// =========================================================================
// [CONTROLLER / COMPUTED] LÓGICA MATEMÁTICA E REGRAS DE NEGÓCIO
// =========================================================================
const volumeTotal = computed(() => {
  const total = (Number(litrosGasolina.value) || 0) + (Number(litrosAlcool.value) || 0)
  return total > 0 ? total : 0
})

const propGasolina = computed(() => volumeTotal.value > 0 ? litrosGasolina.value / volumeTotal.value : 0)
const propAlcool = computed(() => volumeTotal.value > 0 ? litrosAlcool.value / volumeTotal.value : 0)

const fuelPrice = computed(() => {
  if (volumeTotal.value === 0) return 0
  return (propGasolina.value * precoGasolina.value) + (propAlcool.value * precoAlcool.value)
})

const avgConsumption = computed(() => {
  if (volumeTotal.value === 0) return consumoPuroGasolina.value
  return (propGasolina.value * consumoPuroGasolina.value) + (propAlcool.value * consumoPuroAlcool.value)
})

const autonomia = computed(() => volumeTotal.value * avgConsumption.value)
const isCombustivelBaixo = computed(() => volumeTotal.value <= limiteReserva.value)
const autonomiaInsuficiente = computed(() => distanciaEstimada.value > autonomia.value)

// Lógica do Econômetro baseada em RPM e STFT
const cargaMotor = computed(() => {
  if (telemetry.value.rpm === 0 || telemetry.value.status_motor === 'Desligado') return 0
  const fatorRPM = (telemetry.value.rpm / 6500) * 60 
  const fatorCarga = Math.max(0, telemetry.value.stft) * 4 
  return Math.min(Math.round(fatorRPM + fatorCarga), 100)
})

const modoConducao = computed(() => {
  if (telemetry.value.rpm === 0) return { nome: 'DESLIGADO', cor: 'text-slate-500', bg: 'bg-slate-950', barra: 'bg-slate-800' }
  if (cargaMotor.value < 25) return { nome: 'ECO ★★★', cor: 'text-emerald-400', bg: 'bg-emerald-950/30', barra: 'bg-emerald-500' }
  if (cargaMotor.value < 55) return { nome: 'MODERADO', cor: 'text-cyan-400', bg: 'bg-cyan-950/20', barra: 'bg-cyan-500' }
  return { nome: 'PERFORMANCE / SPORT', cor: 'text-red-400', bg: 'bg-red-950/40', barra: 'bg-red-500 animate-pulse' }
})

const consumoInstantaneo = computed(() => {
  if (telemetry.value.rpm === 0 || telemetry.value.speed === 0) return 0
  const base = avgConsumption.value 
  const fatorEsforco = 1 - (cargaMotor.value / 150) 
  return Math.max(3.0, base * fatorEsforco) 
})

// =========================================================================
// [CONTROLLER / ACTIONS] PROCESSAMENTO DE EVENTOS E CONEXÕES
// =========================================================================
const toggleTrip = () => {
  if (!isTripActive.value && autonomiaInsuficiente.value) {
    alert(`BLOQUEIO DE SEGURANÇA!\n\nA autonomia atual (${autonomia.value.toFixed(1)} km) é insuficiente para a rota planejada de ${distanciaEstimada.value} km.`)
    return
  }

  if (!isTripActive.value) {
    isTripActive.value = true
    currentTripDistance.value = 0.0
    tripCost.value = 0.0

    tripInterval = setInterval(() => {
      if (telemetry.value.speed > 0) {
        const distanciaFracao = (telemetry.value.speed / 3600) * 0.1 
        currentTripDistance.value += distanciaFracao

        if (consumoInstantaneo.value > 0 && volumeTotal.value > 0) {
          const litrosConsumidosNesseInstante = distanciaFracao / consumoInstantaneo.value
          tripCost.value += litrosConsumidosNesseInstante * fuelPrice.value

          litrosGasolina.value = Math.max(0, litrosGasolina.value - (litrosConsumidosNesseInstante * propGasolina.value))
          litrosAlcool.value = Math.max(0, litrosAlcool.value - (litrosConsumidosNesseInstante * propAlcool.value))
        }
        
        if (volumeTotal.value <= 0) {
          clearInterval(tripInterval)
          isTripActive.value = false
          telemetry.value.speed = 0
          telemetry.value.rpm = 0
          telemetry.value.status_motor = 'Pane Seca'
          alert("⚠️ PANE SECA! O combustível esgotou. O trajeto foi abortado.")
        }
      }
    }, 100)

  } else {
    isTripActive.value = false
    clearInterval(tripInterval)
    alert(`Trajeto Concluído!\n\nDistância Real: ${currentTripDistance.value.toFixed(2)} km\nCusto Total: R$ ${tripCost.value.toFixed(2)}`)
  }
}

const connectWebSocket = () => {
  ws = new WebSocket('ws://localhost:8088/ws/telemetry')
  ws.onopen = () => isConnected.value = true
  ws.onmessage = (event) => { telemetry.value = JSON.parse(event.data) }
  ws.onclose = () => { isConnected.value = false; setTimeout(connectWebSocket, 3000) }
}

onMounted(() => connectWebSocket())
onUnmounted(() => {
  if (ws) ws.close()
  if (tripInterval) clearInterval(tripInterval)
})
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
        <div class="text-[10px] text-slate-500 font-mono">FRAMEWORK L. v1.5</div>
      </header>

      <main v-if="currentScreen === 'cockpit'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow mb-6">
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
            <span class="text-5xl font-black font-mono tracking-tight text-emerald-400">{{ telemetry.speed }}</span>
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
              {{ cargaMotor }}<span class="text-xs text-slate-400 ml-0.5 font-normal">% Carga</span>
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
          <span class="text-xs font-bold text-slate-400 tracking-wider font-mono uppercase">Sistemas & Temperatura</span>
          <div class="space-y-2 my-auto font-mono text-xs">
            <div class="flex justify-between border-b border-slate-800 pb-1">
              <span class="text-slate-400">Motor status:</span>
              <span :class="['font-bold', telemetry.status_motor === 'Pane Seca' ? 'text-red-500 animate-pulse' : 'text-orange-400']">
                {{ telemetry.status_motor }}
              </span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-1">
              <span class="text-slate-400">Arrefecimento:</span>
              <span class="font-bold text-slate-200">{{ telemetry.coolant_temp.toFixed(1) }} °C</span>
            </div>
            <div class="flex justify-between text-[11px] text-slate-500">
              <span>STFT: {{ telemetry.stft.toFixed(1) }}%</span>
              <span>LTFT: {{ telemetry.ltft.toFixed(1) }}%</span>
            </div>
          </div>
          <div class="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div class="bg-orange-500 h-full transition-all duration-500" :style="{ width: `${Math.min((telemetry.coolant_temp / 120) * 100, 100)}%` }"></div>
          </div>
        </div>

        <div class="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        <p class="text-[10px] text-slate-500 mt-3 font-mono">💡 Este módulo simula a leitura relacional do SQLite local. Pronto para gerar relatórios automatizados de conformidade veicular.</p>
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