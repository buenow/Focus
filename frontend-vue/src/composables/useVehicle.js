// src/composables/useVehicle.js
import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useVehicle() {
  
  // ==========================================
  // ESTADOS REATIVOS DA TELEMETRIA (REDE CAN)
  // ==========================================
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

  // ==========================================
  // ESTADOS DO MÓDULO TRIP (COMPUTADOR DE BORDO)
  // ==========================================
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

  // Dados Simulados do Banco de Dados
  const dbLogs = ref([
    { id: 1, data: '2026-06-24 10:15', usuario_registro: 'Admin_Oficina', usuario_revisor: 'Eng_Mecanico', status: 'Homologado', descricao: 'Calibração de Injeção Padrão Focus 2008' },
    { id: 2, data: '2026-06-23 14:30', usuario_registro: 'Técnico_Bancada', usuario_revisor: 'Eng_Mecanico', status: 'Revisado', descricao: 'Ajuste Estequiométrico para Etanol Puro' }
  ])

  // ==========================================
  // LÓGICA MATEMÁTICA ESTEQUIOMÉTRICA (FLEX)
  // ==========================================
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

  // ==========================================
  // PROCESSAMENTO DO TRAJETO E CONSUMO REAL
  // ==========================================
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

  // ==========================================
  // CONEXÃO WEBSOCKET
  // ==========================================
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

  // Exportamos tudo que a View precisa enxergar
  return {
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
  }
}