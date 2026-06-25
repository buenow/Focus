from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from backend.simulator import FocusSimulator
import asyncio
import json

app = FastAPI(title="NinoOS - Focus Telemetry Server")
simulator = FocusSimulator()

@app.get("/")
def read_root():
    return {"message": "Servidor do Focus ativo e aguardando WebSockets na porta 8088"}

@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Interface do painel conectada via WebSocket!")
    
    try:
        while True:
            # Pega os dados atualizados do simulador
            data = simulator.update_telemetry()
            
            # Envia em formato JSON via WebSocket para a tela
            await websocket.send_text(json.dumps(data))
            
            # Taxa de atualização rápida (100ms) simulando a rede CAN
            await asyncio.sleep(0.1)
            
    except WebSocketDisconnect:
        print("Interface do painel desconectada.")