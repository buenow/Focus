import asyncio
import random
import time

class FocusSimulator:
    def __init__(self):
        self.rpm = 0
        self.speed = 0
        self.coolant_temp = 25.0  # Começa frio (temperatura ambiente)
        self.stft = 0.0          # Short Term Fuel Trim (%)
        self.ltft = 1.2          # Long Term Fuel Trim (%)
        self.start_time = time.time()

    def update_telemetry(self):
        """Simula o comportamento dinâmico do Focus 2008 rodando"""
        elapsed = time.time() - self.start_time

        # 1. Simulação do motor ligando e estabilizando (5 segundos de delay)
        if elapsed < 5:
            self.rpm = 0
            self.speed = 0
        else:
            # Marcha lenta oscilando de leve (~850 RPM)
            base_rpm = 850 if elapsed < 15 else 2200  # Simula uma aceleração depois de 15s
            self.rpm = int(base_rpm + random.uniform(-20, 20))
            
            # Velocidade acompanha o RPM de forma fictícia
            self.speed = 0 if self.rpm < 1000 else int(60 + random.uniform(-2, 2))

        # 2. Curva de Aquecimento Preditiva (Alvo: Estabilizar perto de 92°C)
        if self.coolant_temp < 92.0:
            heating_rate = (self.rpm / 1000) * 0.1
            self.coolant_temp += heating_rate
        else:
            self.coolant_temp = 92.0 + random.uniform(-0.5, 0.5)

        # 3. Simulação do Fuel Trim (Mistura de Combustível)
        self.stft = float(round(random.uniform(-3.0, 3.0), 2))
        
        if random.random() > 0.95:
            self.ltft += random.choice([-0.1, 0.1])
            self.ltft = float(round(self.ltft, 2))

        return {
            "timestamp": time.time(),
            "rpm": self.rpm,
            "speed": self.speed,
            "coolant_temp": float(round(self.coolant_temp, 2)),
            "stft": self.stft,
            "ltft": self.ltft,
            "status_motor": "Desligado" if self.rpm == 0 else "Ligado"
        }