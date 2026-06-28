<template>
  <div class="h-screen w-screen civic-cluster-bg text-white font-sans overflow-hidden flex relative select-none">
    
    <div class="grid-overlay absolute inset-0 z-0"></div>
    <div class="absolute top-0 inset-x-0 h-[40%] bg-gradient-to-b from-blue-500/10 to-transparent blur-[100px] pointer-events-none z-0"></div>

    <aside class="w-24 h-full border-r flex flex-col items-center py-6 gap-6 z-50 relative transition-all duration-500"
           :class="sidebarTheme">
      
      <div class="mb-2">
        <h2 class="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">N<span class="text-white">OS</span></h2>
      </div>
      
      <nav class="flex flex-col gap-4 w-full px-3 relative z-50">
        <!-- BOTÃO PAINEL -->
        <button @click="activeView = 'painel'" 
                class="w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative z-50"
                :class="activeView === 'painel' ? 'bg-blue-600/30 border border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">Painel</span>
        </button>

        <!-- NOVO BOTÃO OBD-II -->
        <button @click="activeView = 'obd'" 
                class="w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative z-50"
                :class="activeView === 'obd' ? 'bg-red-900/40 border border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">OBD-II</span>
        </button>

        <!-- BOTÃO GPS -->
        <button @click="activeView = 'gps'"
                class="w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative z-50"
                :class="activeView === 'gps' ? 'bg-blue-600/30 border border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">GPS</span>
        </button>
        
        <!-- BOTÃO CONFIG -->
        <button @click="activeView = 'config'"
                class="w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative z-50"
                :class="activeView === 'config' ? 'bg-blue-600/30 border border-blue-400/50 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span class="text-[9px] font-bold uppercase tracking-wider">Config</span>
        </button>
      </nav>
      
      <div class="mt-auto flex flex-col items-center gap-2">
        <span class="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" :class="statusDotClass"></span>
        <span class="text-[9px] font-mono uppercase tracking-widest" :class="statusTextClass">
          {{ systemStatusText }}
        </span>
      </div>
    </aside>

    <!-- WRAPPER PRINCIPAL ABSOLUTO PARA ROTEAMENTO -->
    <main class="relative flex-1 z-10 w-full h-full overflow-hidden">
      
      <!-- ============================================== -->
      <!-- TELA 1: PAINEL DE VELOCIDADE (GAUGES) -->
      <!-- ============================================== -->
      <div v-show="activeView === 'painel'" class="absolute inset-0 flex flex-col justify-center transition-opacity duration-300">
        <div class="w-full max-w-[1300px] mx-auto flex items-center justify-center gap-6 lg:gap-12 px-6 pb-6 mt-4">
          
          <div class="flex flex-col items-center justify-center w-[70px] shrink-0 relative">
            <div class="flex items-center h-[240px]">
               <div class="flex flex-col justify-between h-[210px] text-[11px] font-bold text-right w-8 mr-2 pb-1">
                 <span class="text-red-500 drop-shadow-md">120°</span>
                 <span class="text-slate-300 drop-shadow-md">80°</span>
                 <span class="text-cyan-400 drop-shadow-md">40°</span>
               </div>
               <svg width="24" height="220" viewBox="0 0 24 220" class="drop-shadow-md">
                 <defs>
                   <linearGradient id="tempGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                     <stop offset="0%" stop-color="#22d3ee" />
                     <stop offset="60%" stop-color="#3b82f6" />
                     <stop offset="100%" stop-color="#ef4444" />
                   </linearGradient>
                 </defs>
                 <path d="M 20 210 Q 0 110 20 10" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4" stroke-linecap="round" pathLength="100"/>
                 <path d="M 20 210 Q 0 110 20 10" fill="none" stroke="url(#tempGrad)" stroke-width="4" stroke-linecap="round"
                       pathLength="100" stroke-dasharray="100" :stroke-dashoffset="100 - tempPercent" 
                       class="transition-all duration-300 ease-linear" />
               </svg>
            </div>
            <div class="flex flex-col gap-2 mt-4 items-center">
              <svg class="w-5 h-5 drop-shadow-md transition-colors duration-300" :class="simTemp >= 103 ? 'text-red-500 animate-bounce' : 'text-slate-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1v4h-2V5z"/>
              </svg>
              <svg class="w-6 h-6 transition-colors duration-300 drop-shadow-[0_0_8px_currentColor]" 
                   :class="[fanColorClass, simTemp >= 98 ? 'animate-spin' : '']" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 11c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6.2-2.12c-.28-.05-.58.04-.76.26l-1.35 1.57c-.45-.25-.94-.43-1.46-.53V7.21c0-.28-.15-.55-.4-.68l-1.89-1.02c-.21-.11-.47-.11-.68 0L9.77 6.53c-.25.13-.4.4-.4.68v2.96c-.52.1-.1.01-1.46.53L6.56 9.14c-.18-.22-.48-.31-.76-.26l-2.09.39c-.24.04-.42.22-.49.46-.07.24.01.5.2.66l1.59 1.3c-.02.19-.04.38-.04.57 0 .19.02.38.04.57l-1.59 1.3c-.19.16-.27.42-.2.66.07.24.25.42.49.46l2.09.39c.28.05.58-.04.76-.26l1.35-1.57c.45.25.94.43 1.46.53v2.96c0 .28.15.55.4.68l1.89 1.02c.21.11.47.11.68 0l1.89-1.02c.25-.13.4-.4.4-.68v-2.96c.52-.1 1.01-.28 1.46-.53l1.35 1.57c.18.22.48.31.76.26l2.09-.39c.24-.04.42-.22.49-.46.07-.24-.01-.5-.2-.66l-1.59-1.3c.02-.19.04-.38.04-.57 0-.19-.02-.38-.04-.57l1.59-1.3c.19-.16.27-.42.2-.66-.07-.24-.25-.42-.49-.46l-2.09-.39z"/>
              </svg>
            </div>
          </div>

          <div class="relative w-[340px] shrink-0 aspect-square flex items-center justify-center">
            
            <div class="absolute inset-4 rounded-full blur-[50px] opacity-20 transition-colors duration-500 pointer-events-none z-0" 
                 :style="{ backgroundColor: ecoColors.start }"></div>

            <svg viewBox="0 0 200 200" class="absolute inset-0 w-full h-full z-10" style="transform: rotate(135deg);">
              <defs>
                <linearGradient id="rpmArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" :stop-color="ecoColors.start" style="transition: stop-color 0.4s ease" />
                  <stop offset="100%" :stop-color="ecoColors.end" style="transition: stop-color 0.4s ease" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="4" 
                      stroke-dasharray="565.48" stroke-dashoffset="141.37" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="url(#rpmArcGrad)" stroke-width="4" stroke-linecap="round"
                      stroke-dasharray="565.48" :stroke-dashoffset="565.48 - (424.11 * rpmPercent)" 
                      class="transition-all duration-100 ease-linear drop-shadow-[0_0_8px_currentColor]" />
            </svg>

            <div class="absolute inset-0 w-full h-full pointer-events-none z-20">
              <div v-for="i in 17" :key="`rpm-tick-${i}`" class="absolute w-full h-full flex justify-center items-start pt-2" 
                   :style="`transform: rotate(${-135 + (i-1) * 16.875}deg)`">
                 
                 <div class="w-0.5 rounded-full" 
                      :class="(i-1)/2 >= 7 ? 'bg-red-500' : 'bg-white/60'"
                      :style="`height: ${(i-1) % 2 === 0 ? '12px' : '6px'}`"></div>
                 
                 <span v-if="(i - 1) % 2 === 0" 
                       class="absolute text-[22px] font-bold drop-shadow-md top-6" 
                       :class="(i-1)/2 >= 7 ? 'text-red-500' : 'text-slate-100'"
                       :style="`transform: rotate(${135 - (i-1) * 16.875}deg)`">
                    {{ (i - 1) / 2 }}
                 </span>
              </div>
            </div>

            <div class="civic-gauge relative z-10 w-[210px] h-[210px] rounded-full flex flex-col items-center justify-center p-6 shadow-2xl transition-colors duration-500">
              <span class="text-6xl font-black text-white tracking-tighter drop-shadow-lg mt-4">
                {{ Math.floor(simRpm) }}
              </span>
              <span class="text-[12px] text-slate-400 uppercase font-bold mt-1 tracking-widest">RPM</span>
            </div>
          </div>

          <div class="w-[200px] shrink-0 flex flex-col justify-center h-[360px] relative z-20">
            <div class="civic-center-card w-full h-full rounded-2xl flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10 overflow-hidden border border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
                
                <div class="h-16 flex items-center justify-center bg-[#111624] border-b border-white/5 relative">
                   <div v-if="simTemp >= 103" class="absolute inset-0 bg-red-500/20 animate-pulse"></div>
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-10 h-10 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] relative z-10" :class="simTemp >= 103 ? 'text-red-500 animate-pulse' : 'text-red-500/80'">
                      <path d="M12 20a8 8 0 100-16 8 8 0 000 16z" stroke-width="2"/>
                      <path d="M12 8v4" stroke-width="2.5" stroke-linecap="round"/>
                      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none"/>
                      <path d="M5.5 6.5A9.953 9.953 0 002 12c0 2.27.76 4.37 2 6" stroke-width="2" stroke-linecap="round"/>
                      <path d="M18.5 6.5A9.953 9.953 0 0122 12c0 2.27-.76 4.37-2 6" stroke-width="2" stroke-linecap="round"/>
                   </svg>
                </div>

                <div class="text-center py-3 border-b border-white/5">
                   <div class="text-[9px] text-slate-400 font-bold tracking-widest uppercase">Time/Telemetry Core</div>
                   <div class="text-[15px] font-bold text-white mt-1">13:14 <span class="text-slate-400 text-xs mx-1 font-normal">EXT</span> 26°C</div>
                </div>

                <div class="flex flex-col px-4 py-3 gap-4 flex-1 justify-center">
                   
                   <div class="flex items-center gap-3">
                      <svg class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <div class="flex flex-col">
                         <span class="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Autonomia</span>
                         <span class="text-[15px] font-bold text-white leading-none mt-0.5">{{ calculatedAutonomy }}<span class="text-[10px] text-slate-400 font-normal ml-0.5">km</span></span>
                      </div>
                   </div>

                   <div class="flex items-center gap-3">
                     <svg class="w-6 h-6 text-slate-300 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                       <rect x="3" y="8" width="18" height="10" rx="2" ry="2"></rect>
                       <line x1="6" y1="8" x2="6" y2="5"></line>
                       <line x1="18" y1="8" x2="18" y2="5"></line>
                       <line x1="4.5" y1="5" x2="7.5" y2="5"></line>
                       <line x1="16.5" y1="5" x2="19.5" y2="5"></line>
                       <line x1="6.5" y1="13" x2="9.5" y2="13"></line>
                       <line x1="14.5" y1="13" x2="17.5" y2="13"></line>
                       <line x1="16" y1="11.5" x2="16" y2="14.5"></line>
                     </svg>
                     <div class="flex flex-col">
                         <span class="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Bateria</span>
                         <span class="text-[15px] font-bold text-white leading-none mt-0.5">{{ simBattery.toFixed(2) }}<span class="text-[10px] text-slate-400 font-normal ml-0.5">V</span></span>
                     </div>
                   </div>

                   <div class="flex items-center gap-3">
                     <svg class="w-6 h-6 text-slate-300 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                       <path d="M4 22L14 22M5 22V6C5 4.89543 5.89543 4 7 4H11C12.1046 4 13 4.89543 13 6V22M7 8H11V12H7V8ZM13 14H16.5C17.8807 14 19 15.1193 19 16.5V17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5V17M16 10V9C16 7.89543 16.8954 7 18 7H19C20.1046 7 21 7.89543 21 9V12C21 13.1046 20.1046 14 19 14H16"></path>
                       <path d="M18 2C18 2 16 4 16 5.5C16 6.88071 16.8954 8 18 8C19.1046 8 20 6.88071 20 5.5C20 4 18 2 18 2Z" fill="currentColor" stroke="none"></path>
                     </svg>
                     <div class="flex flex-col">
                         <span class="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Consumo</span>
                         <span class="text-[15px] font-bold text-white leading-none mt-0.5">13.4<span class="text-[10px] text-slate-400 font-normal ml-0.5">km/l</span></span>
                     </div>
                   </div>
                </div>

                <div class="border-t transition-colors duration-500 p-4 flex items-center gap-3" 
                     :class="simTemp >= 103 ? 'border-red-500/30 bg-red-950/60 shadow-[inset_0_0_20px_rgba(220,38,38,0.3)]' : 'border-white/5 bg-[#0d1222]'">
                   <svg class="w-6 h-6 drop-shadow-md transition-colors duration-500" :class="simTemp >= 103 ? 'text-red-500 animate-pulse' : 'text-slate-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1v4h-2V5z"/>
                   </svg>
                   <div class="flex flex-col">
                      <span class="text-[9px] uppercase font-bold tracking-widest transition-colors duration-500" :class="simTemp >= 103 ? 'text-red-400' : 'text-slate-400'">Temp. Motor</span>
                      <span class="text-lg font-black leading-none mt-1 transition-colors duration-500 drop-shadow-md" :class="simTemp >= 103 ? 'text-red-500' : 'text-white'">
                        {{ Math.floor(simTemp) }}°C
                      </span>
                   </div>
                </div>
            </div>
          </div>

          <div class="relative w-[340px] shrink-0 aspect-square flex items-center justify-center">
            
            <div class="absolute inset-4 rounded-full blur-[50px] opacity-20 transition-colors duration-500 pointer-events-none z-0" 
                 :style="{ backgroundColor: ecoColors.start }"></div>

            <svg viewBox="0 0 200 200" class="absolute inset-0 w-full h-full z-10" style="transform: rotate(135deg);">
              <defs>
                <linearGradient id="speedArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" :stop-color="ecoColors.start" style="transition: stop-color 0.4s ease" />
                  <stop offset="100%" :stop-color="ecoColors.end" style="transition: stop-color 0.4s ease" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="4" 
                      stroke-dasharray="565.48" stroke-dashoffset="141.37" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="url(#speedArcGrad)" stroke-width="4" stroke-linecap="round"
                      stroke-dasharray="565.48" :stroke-dashoffset="565.48 - (424.11 * speedPercent)" 
                      class="transition-all duration-100 ease-linear drop-shadow-[0_0_8px_currentColor]" />
            </svg>

            <div class="absolute inset-0 w-full h-full pointer-events-none z-20">
              <div v-for="i in 23" :key="`spd-tick-${i}`" class="absolute w-full h-full flex justify-center items-start pt-2" 
                   :style="`transform: rotate(${-135 + (i-1) * 12.2727}deg)`">
                 
                 <div class="w-0.5 rounded-full" 
                      :class="(i-1)*10 >= 200 ? 'bg-red-500' : 'bg-white/60'"
                      :style="`height: ${(i-1) % 2 === 0 ? '12px' : '6px'}`"></div>
                 
                 <span v-if="(i - 1) % 2 === 0" 
                       class="absolute text-[18px] font-bold drop-shadow-md top-6" 
                       :class="(i-1)*10 >= 200 ? 'text-red-500' : 'text-slate-100'"
                       :style="`transform: rotate(${135 - (i-1) * 12.2727}deg)`">
                    {{ (i - 1) * 10 }}
                 </span>
              </div>
            </div>

            <div class="civic-gauge relative z-10 w-[210px] h-[210px] rounded-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-500 shadow-2xl">
              <span class="text-6xl leading-none font-black text-white tracking-tighter drop-shadow-lg mt-4">
                {{ Math.floor(simSpeed) }}
              </span>
              <span class="text-[12px] text-slate-400 font-bold uppercase tracking-widest mt-2">km/h</span>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center w-[70px] shrink-0 relative">
            <div class="flex items-center h-[240px]">
               <svg width="24" height="220" viewBox="0 0 24 220" class="drop-shadow-md">
                 <defs>
                   <linearGradient id="fuelGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                     <stop offset="0%" stop-color="#ef4444" />
                     <stop offset="25%" stop-color="#e2e8f0" />
                     <stop offset="100%" stop-color="#3b82f6" />
                   </linearGradient>
                 </defs>
                 <path d="M 4 210 Q 24 110 4 10" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4" stroke-linecap="round" pathLength="100"/>
                 <path d="M 4 210 Q 24 110 4 10" fill="none" stroke="url(#fuelGrad)" stroke-width="4" stroke-linecap="round"
                       pathLength="100" stroke-dasharray="100" :stroke-dashoffset="100 - simFuel" 
                       class="transition-all duration-1000 ease-linear" />
               </svg>
               <div class="flex flex-col justify-between h-[210px] text-[11px] font-bold text-left w-8 ml-2 pb-1 text-slate-300">
                 <span>F</span>
                 <span>3/4</span>
                 <span>1/2</span>
                 <span>1/4</span>
                 <span class="text-red-500">E</span>
               </div>
            </div>
            <div class="flex items-center justify-center mt-4">
               <svg class="w-5 h-5 text-slate-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 8h-1V6c0-1.1-.9-2-2-2H6C4.9 4 4 4.9 4 6v12h12v-2h2v2h2c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-5 10H6V6h8v12zm4-6h-2V6h2v6z"/>
               </svg>
            </div>
          </div>

        </div>
      </div>

      <!-- ============================================== -->
      <!-- TELA 2: DIAGNÓSTICO OBD-II -->
      <!-- ============================================== -->
      <div v-if="activeView === 'obd'" class="absolute inset-0 z-50 flex items-center justify-center bg-[#020611]/95 backdrop-blur-sm p-3 overflow-y-auto">
        <div class="w-full max-w-5xl bg-[#0a0f1c] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-4 relative overflow-hidden">
          
          <!-- Elemento decorativo -->
          <div class="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>



          <!-- Grid de Sensores com Barras de Estado Dinâmicas -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            
            <!-- Card 1: Carga Motor -->
            <div @click="openInfo('load')" class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2 cursor-pointer hover:bg-white/10 transition-all">
              <div class="flex justify-between items-center mb-1">
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Carga Motor</div>
                <span class="text-[9px] font-bold px-2 py-0.5 rounded-full transition-colors duration-300" 
                      :class="simLoad <= 40 ? 'bg-emerald-500/20 text-emerald-400' : (simLoad <= 80 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400')">
                  {{ simLoad <= 40 ? 'NORMAL' : (simLoad <= 80 ? 'ATENÇÃO' : 'ALTA') }}
                </span>
              </div>
              <div class="text-3xl font-black text-white">{{ Math.floor(simLoad) }}<span class="text-lg text-slate-500 ml-1">%</span></div>
              <div class="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden flex">
                <div class="h-full transition-all duration-300" 
                    :class="simLoad <= 40 ? 'bg-emerald-500' : (simLoad <= 80 ? 'bg-amber-500' : 'bg-red-500')" 
                    :style="{ width: `${Math.max(0, Math.min(simLoad, 100))}%` }"></div>
              </div>
              <div class="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                <span>0%</span><span>40% (OK)</span><span>100%</span>
              </div>
            </div>

            <!-- Card 2: MAF -->
            <div @click="openInfo('maf')" class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2 cursor-pointer hover:bg-white/10 transition-all">
              <div class="flex justify-between items-center mb-1">
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fluxo Ar (MAF)</div>
                <span class="text-[9px] font-bold px-2 py-0.5 rounded-full transition-colors duration-300"
                      :class="(simRpm * 0.005) <= 6 ? 'bg-emerald-500/20 text-emerald-400' : ((simRpm * 0.005) <= 8.5 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400')">
                  {{ (simRpm * 0.005) <= 6 ? 'OK' : 'ALTO' }}
                </span>
              </div>
              <div class="text-3xl font-black text-white">{{ (simRpm * 0.005).toFixed(1) }}<span class="text-lg text-slate-500 ml-1">g/s</span></div>
              <div class="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden flex">
                <div class="h-full transition-colors duration-300" 
                    :class="(simRpm * 0.005) <= 6 ? 'bg-emerald-500' : ((simRpm * 0.005) <= 8.5 ? 'bg-amber-500' : 'bg-red-500')"
                    :style="{ width: `${Math.max(0, Math.min(((simRpm * 0.005) / 10) * 100, 100))}%` }"></div>
              </div>
              <div class="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                <span>2g/s</span><span>6g/s (OK)</span><span>10g/s</span>
              </div>
            </div>

            <!-- Card 3: Borboleta (TPS) -->
            <div @click="openInfo('tps')" class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2 cursor-pointer hover:bg-white/10 transition-all">
              <div class="flex justify-between items-center mb-1">
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Borboleta (TPS)</div>
                <span class="text-[9px] font-bold px-2 py-0.5 rounded-full transition-colors duration-300" 
                      :class="(simLoad * 0.8) <= 15 ? 'bg-emerald-500/20 text-emerald-400' : ((simLoad * 0.8) <= 70 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400')">
                  {{ (simLoad * 0.8) <= 15 ? 'LENTA' : ((simLoad * 0.8) <= 70 ? 'ATIVA' : 'TOTAL') }}
                </span>
              </div>
              <div class="text-3xl font-black text-white">{{ (simLoad * 0.8).toFixed(1) }}<span class="text-lg text-slate-500 ml-1">%</span></div>
              <div class="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden flex">
                <div class="h-full transition-all duration-300" 
                    :class="(simLoad * 0.8) <= 15 ? 'bg-emerald-500' : ((simLoad * 0.8) <= 70 ? 'bg-amber-500' : 'bg-red-500')" 
                    :style="{ width: `${Math.max(0, Math.min(simLoad * 0.8, 100))}%` }"></div>
              </div>
              <div class="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                <span>0%</span><span>15% (Lenta)</span><span>100%</span>
              </div>
            </div>

            <!-- Card 4: Sonda Lambda (Corrigido para evitar travamento) -->
            <div @click="openInfo('lambda')" class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2 cursor-pointer hover:bg-white/10 transition-all">
              <div class="flex justify-between items-center mb-1">
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sonda Lambda</div>
                <span class="text-[9px] font-bold px-2 py-0.5 rounded-full transition-colors duration-300"
                      :class="(simLambda || 0.45) > 0.3 && (simLambda || 0.45) < 0.7 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'">
                  OSCILANDO
                </span>
              </div>
              <div class="text-3xl font-black text-white">{{ (simLambda || 0.45).toFixed(2) }}<span class="text-lg text-slate-500 ml-1">V</span></div>
              <div class="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden flex">
                <div class="h-full transition-all duration-100" 
                    :class="(simLambda || 0.45) > 0.3 && (simLambda || 0.45) < 0.7 ? 'bg-emerald-500' : ((simLambda || 0.45) <= 0.3 ? 'bg-blue-500' : 'bg-red-500')"
                    :style="{ width: `${Math.max(0, Math.min((((simLambda || 0.45) - 0.1) / 0.8) * 100, 100))}%` }"></div>
              </div>
              <div class="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                <span>0.1V</span><span>0.5V (Ideal)</span><span>0.9V</span>
              </div>
            </div>

            <!-- Card 5: Ignição -->
            <div @click="openInfo('timing')" class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2 cursor-pointer hover:bg-white/10 transition-all">
              <div class="flex justify-between items-center mb-1">
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ignição</div>
                <span class="text-[9px] font-bold px-2 py-0.5 rounded-full transition-colors duration-300" 
                      :class="(10 + (simRpm * 0.003)) <= 20 ? 'bg-emerald-500/20 text-emerald-400' : ((10 + (simRpm * 0.003)) <= 35 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400')">
                  {{ (10 + (simRpm * 0.003)) <= 20 ? 'OK' : 'AVANÇADO' }}
                </span>
              </div>
              <div class="text-3xl font-black text-white">{{ (10 + (simRpm * 0.003)).toFixed(1) }}<span class="text-lg text-slate-500 ml-1">°</span></div>
              <div class="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden flex">
                <div class="h-full transition-all duration-300" 
                    :class="(10 + (simRpm * 0.003)) <= 20 ? 'bg-emerald-500' : ((10 + (simRpm * 0.003)) <= 35 ? 'bg-amber-500' : 'bg-red-500')" 
                    :style="{ width: `${Math.max(0, Math.min((((10 + (simRpm * 0.003)) - 5) / 40) * 100, 100))}%` }"></div>
              </div>
              <div class="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                <span>5°</span><span>20° (OK)</span><span>45°</span>
              </div>
            </div>

            <!-- Card 6: Temperatura Admissão -->
            <div @click="openInfo('iat')" class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2 cursor-pointer hover:bg-white/10 transition-all">
              <div class="flex justify-between items-center mb-1">
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Temp. Admissão</div>
                <span class="text-[9px] font-bold px-2 py-0.5 rounded-full transition-colors duration-300"
                      :class="(simIat || 35) <= 50 ? 'bg-emerald-500/20 text-emerald-400' : ((simIat || 35) <= 80 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400')">
                  {{ (simIat || 35) <= 50 ? 'OK' : 'ALTA' }}
                </span>
              </div>
              <div class="text-3xl font-black text-white">{{ Math.floor(simIat || 35) }}<span class="text-lg text-slate-500 ml-1">°C</span></div>
              <div class="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden flex">
                <div class="h-full transition-all duration-300" 
                    :class="(simIat || 35) <= 50 ? 'bg-emerald-500' : ((simIat || 35) <= 80 ? 'bg-amber-500' : 'bg-red-500')"
                    :style="{ width: `${Math.max(0, Math.min((((simIat || 35) - 20) / 100) * 100, 100))}%` }"></div>
              </div>
              <div class="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                <span>20°C</span><span>50°C (OK)</span><span>120°C</span>
              </div>
            </div>
          </div>

          <!-- MÓDULO DE INJEÇÃO DE FALHAS (Excelente para fins didáticos/demonstração) 
          <div class="bg-[#111624] border border-white/5 rounded-2xl p-4 mb-6 relative z-10">
            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Injetor de Falhas (Simulador)</div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button @click="simulationMode = 'normal'" :class="simulationMode === 'normal' ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-300'" class="px-3 py-2 rounded-xl text-xs font-bold transition-all">
                🟢 Motor Saudável
              </button>
              <button @click="simulationMode = 'velas_gastas'" :class="simulationMode === 'velas_gastas' ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-300'" class="px-3 py-2 rounded-xl text-xs font-bold transition-all">
                🟡 Velas Gastas (Preventivo)
              </button>
              <button @click="simulationMode = 'combustivel_ruim'" :class="simulationMode === 'combustivel_ruim' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'" class="px-3 py-2 rounded-xl text-xs font-bold transition-all">
                ⛽ Combustível Suspeito
              </button>
              <button @click="simulationMode = 'falha_cilindro_3'" :class="simulationMode === 'falha_cilindro_3' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-300'" class="px-3 py-2 rounded-xl text-xs font-bold transition-all">
                🔴 Falha de Ignição (Cilindro 3)
              </button>
            </div>
          </div>
-->
          <!-- GRID DE DIAGNÓSTICO AVANÇADO (OTIMIZADO PARA 10 POLEGADAS) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-1 relative z-10">
            
            <!-- Card 1: Análise de Ignição -->
            <div class="bg-[#111624] border border-white/5 rounded-2xl p-3 flex flex-col justify-between">
              <div>
                <div class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Análise de Ignição (Velas)</div>
                <div class="text-base font-black mt-1" :class="sparkPlugHealth >= 85 ? 'text-emerald-400' : (sparkPlugHealth >= 50 ? 'text-amber-400' : 'text-red-500')">
                  {{ diagnosticReport.plugStatus }}
                </div>
              </div>
              <div class="mt-2">
                <div class="flex justify-between text-[9px] text-slate-500 mb-1">
                  <span>Vida Útil</span>
                  <span>{{ sparkPlugHealth }}%</span>
                </div>
                <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div class="h-full transition-all duration-500" :class="sparkPlugHealth >= 85 ? 'bg-emerald-500' : (sparkPlugHealth >= 50 ? 'bg-amber-500' : 'bg-red-500')" :style="{ width: `${sparkPlugHealth}%` }"></div>
                </div>
              </div>
            </div>

            <!-- Card 2: Misfire Monitor -->
            <div @click="openInfo('misfire')" 
                class="border rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all duration-300"
                :class="diagnosticReport.suspectCylinder ? 'bg-red-950/40 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse' : 'bg-[#111624] border-white/5 hover:bg-white/5'">
              
              <div>
                <div class="flex justify-between items-center mb-2">
                  <div class="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Misfire Monitor</div>
                  <span v-if="diagnosticReport.suspectCylinder" class="text-[8px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold animate-bounce">
                    FALHA CRÍTICA
                  </span>
                </div>

                <div class="grid grid-cols-4 gap-1.5 text-center">
                  <div v-for="(misfires, index) in cylinderMisfires" :key="index" class="p-1 rounded-lg border transition-all"
                      :class="diagnosticReport.suspectCylinder === (index + 1) ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-900/40 border-white/5 text-slate-600'">
                    <div class="text-[9px] font-bold" :class="diagnosticReport.suspectCylinder === (index + 1) ? 'text-red-300' : 'text-slate-400'">CIL {{ index + 1 }}</div>
                    <div class="text-sm font-black">{{ misfires > 0 ? 'FAIL' : 'OK' }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 3: Qualidade de Combustível -->
            <div @click="openInfo('fuel')" 
                class="border rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all duration-300"
                :class="diagnosticReport.fuelStatus.includes('Suspeito') ? 'bg-amber-950/30 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-[#111624] border-white/5 hover:bg-white/5'">
              
              <div>
                <div class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Qualidade de Combustível</div>
                <div class="text-base font-black mt-1 leading-tight" 
                    :class="diagnosticReport.fuelStatus.includes('Suspeito') ? 'text-amber-400 animate-pulse' : 'text-emerald-400'">
                  {{ diagnosticReport.fuelStatus }}
                </div>
              </div>
              <div class="mt-2 text-[8px] leading-tight p-1.5 rounded-md border font-mono transition-colors"
                  :class="diagnosticReport.fuelStatus.includes('Suspeito') ? 'bg-amber-900/40 border-amber-500/50 text-amber-200' : 'bg-slate-900/50 border-white/5 text-slate-500'">
                Cruzamento Automático: Carga x Avanço
              </div>
            </div>

          </div>


<!-- Cabeçalho / Título (Compacto) -->
      <div class="mb-2 flex justify-between items-center z-10">
        <div>
          <h1 class="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Diagnóstico Dinâmico
          </h1>
          <p class="text-[10px] text-slate-500 font-mono">OBD-II DATA STREAM • TEMPO REAL</p>
        </div>
      </div>

<!-- CÓDIGOS DE FALHA (DTC) - COMPACTADO (p-3 mt-2) -->
      <div class="bg-[#111624] border border-white/5 rounded-2xl p-1 mt-2 relative z-10 flex-1 overflow-y-auto min-h-[90px]">
        <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Diagnostic Trouble Codes (DTC)</h3>
        
        <div v-if="diagnosticReport.suspectCylinder" class="bg-red-500/10 border border-red-500/30 rounded-xl p-2.5 flex flex-col gap-1.5">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <div class="text-xs font-bold text-red-400">Falha grave de ignição detectada na ECU.</div>
          </div>
          <div class="mt-1 text-[11px] font-mono bg-black/50 p-2 rounded-lg text-slate-300">
            <span class="text-red-400 font-bold">P030{{ diagnosticReport.suspectCylinder }}</span> - Cylinder {{ diagnosticReport.suspectCylinder }} Misfire Detected
          </div>
        </div>

        <div v-else class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-3 h-full">
          <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <div class="text-xs font-bold text-emerald-400">Nenhum código de falha detectado no módulo do motor.</div>
        </div>
      </div>

        </div>
      </div>
      <!-- MODAL DE INFORMAÇÃO EDUCACIONAL (LAYMAN) -->
<!-- MODAL DE INFORMAÇÃO EDUCACIONAL (CORRIGIDO PARA LER 'desc' OU 'description') -->
      <transition enter-active-class="transition duration-300 ease-out" 
                  enter-from-class="opacity-0 scale-95" 
                  enter-to-class="opacity-100 scale-100" 
                  leave-active-class="transition duration-200 ease-in" 
                  leave-from-class="opacity-100 scale-100" 
                  leave-to-class="opacity-0 scale-95">
        <div v-if="selectedSensorInfo" class="absolute inset-0 z-[100] flex items-center justify-center p-4">
          <!-- Overlay escuro -->
          <div class="absolute inset-0 bg-[#020611]/80 backdrop-blur-md" @click="closeInfo"></div>
          
          <!-- Caixa do Modal -->
          <div class="bg-[#0a0f1c] border border-white/10 shadow-2xl rounded-3xl w-full max-w-md relative z-10 overflow-hidden">
            <!-- Decorativo -->
            <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>
            
            <div class="p-5 flex flex-col gap-4">
              <div class="flex justify-between items-start">
                <h3 class="text-lg font-black text-white pr-4">{{ selectedSensorInfo.title }}</h3>
                <button @click="closeInfo" class="text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div class="flex flex-col gap-3">
                <!-- O que é / Descrição -->
                <div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                  <span class="text-[9px] text-blue-400 font-bold uppercase tracking-widest block mb-1">Diagnóstico Técnico</span>
                  <!-- Aceita tanto .desc (dicionário antigo) quanto .description (alertas novos) -->
                  <p class="text-slate-200 text-sm leading-relaxed">{{ selectedSensorInfo.desc || selectedSensorInfo.description }}</p>
                </div>

                <!-- Só exibe os campos abaixo se existirem no objeto (para os botões comuns de sensor) -->
                <div v-if="selectedSensorInfo.normal" class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                  <span class="text-[9px] text-emerald-400 font-bold uppercase tracking-widest block mb-1">Parâmetro Normal</span>
                  <p class="text-emerald-50 text-xs font-bold">{{ selectedSensorInfo.normal }}</p>
                </div>

                <div v-if="selectedSensorInfo.warning" class="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <span class="text-[9px] text-red-400 font-bold uppercase tracking-widest block mb-1">Se der problema...</span>
                  <p class="text-red-100 text-xs leading-relaxed">{{ selectedSensorInfo.warning }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Variável para guardar a referência do nosso "timer"
let lambdaTimer = null;

// onMounted roda assim que a tela carrega
onMounted(() => {
  // Cria um loop que roda a cada 600 milissegundos
  lambdaTimer = setInterval(() => {
    
    // A sonda de banda estreita costuma oscilar entre 0.1v (pobre) e 0.9v (rica).
    // O Math.random() gera a aleatoriedade da simulação.
    simLambda.value = 0.1 + Math.random() * 0.8;
    
  }, 600); 
});

// onUnmounted roda quando você sai dessa tela
onUnmounted(() => {
  // É importante limpar o timer para não pesar a memória do navegador
  if (lambdaTimer) clearInterval(lambdaTimer);
});
// --- ESTADO DE ROTEAMENTO (NOVO) ---
const activeView = ref('painel'); 

// Controle do Modal de Informações
const selectedSensorInfo = ref(null);

const sensorDictionary = {
  load: {
    title: 'Carga do Motor (Engine Load)',
    normal: '15% a 30% (marcha lenta) | Até 100% acelerando',
    desc: 'Imagine que o motor está carregando uma mochila. Mede o quanto de esforço físico o motor está fazendo no momento.',
    warning: 'Carga alta constante com o carro parado indica problemas mecânicos, como componentes travados ou falha de leitura.'
  },
  maf: {
    title: 'Fluxo de Massa de Ar (MAF)',
    normal: '2 a 7 g/s (marcha lenta) | Sobe ao acelerar',
    desc: 'O "nariz" do carro. Mede exatamente quantos gramas de ar estão entrando para o computador calcular a gota exata de combustível.',
    warning: 'Se sujar ou falhar, o motor erra a "receita" da mistura. O carro começa a engasgar, perde força ou consome muito combustível.'
  },
  tps: {
    title: 'Abertura da Borboleta (TPS)',
    normal: '0% a 10% (pedal solto) | 90% a 100% (pé no fundo)',
    desc: 'É a "torneira de ar", ligada diretamente ao seu pedal do acelerador. Mostra o quanto você está exigindo do carro.',
    warning: 'Se o sensor falhar, o carro pode não responder ao acelerador ou, pior, acelerar sozinho.'
  },
  lambda: {
    title: 'Sonda Lambda (Sensor O2)',
    normal: 'Oscilando rapidamente entre 0.1V e 0.9V',
    desc: 'Fica no escapamento "provando" a fumaça. Avisa o motor se ele está gastando muito combustível ou se a mistura está pobre.',
    warning: 'Se o valor travar e parar de oscilar, o sensor pifou. O carro entra em modo de emergência e o consumo de combustível dispara.'
  },
  timing: {
    title: 'Avanço de Ignição',
    normal: '5° a 15° (marcha lenta) | > 30° (alta velocidade)',
    desc: 'É o "timing" exato (em graus) em que a vela solta a faísca para causar a explosão dentro do motor.',
    warning: 'Se a faísca ocorrer na hora errada, o motor faz barulho metálico ("batida de pino"), perde força e pode sofrer danos internos graves.'
  },
  iat: {
    title: 'Temp. do Ar de Admissão (IAT)',
    normal: 'Pouco acima da temperatura ambiente (20°C a 60°C)',
    desc: 'Mede se o ar que está entrando está quente ou frio. Ar frio gera explosões mais fortes (mais potência).',
    warning: 'Leituras absurdas (ex: 120°C num dia frio) fazem o motor cortar o combustível, deixando o carro muito fraco.'
  }
};

const openInfo = (sensorKey) => {
  selectedSensorInfo.value = sensorDictionary[sensorKey];
};

const closeInfo = () => {
  selectedSensorInfo.value = null;
};

// --- ESTADOS DOS SENSORES ---
const simSpeed = ref(0);
const simRpm = ref(850); 
const simLoad = ref(15);
const simTemp = ref(90);  
const simFuel = ref(58);
const simBattery = ref(13.60);
const simEcon = ref(9.4);
const simLambda = ref(0.45);
const simIat = ref(35);

// Controle do Modal de Detalhes
const isModalOpen = ref(false);
const modalTitle = ref('');
const modalContent = ref('');



let simulationInterval = null;
let isAccelerating = true;
let isHeating = true;
let engineStarted = false; 

// Ponto de Ignição Dinâmico (Agora reativo para podermos simular o atraso)
const simTiming = ref(12); 

// ESTADOS DE DIAGNÓSTICO (Cruzamento de Parâmetros)
const sparkPlugHealth = ref(100);    // 0% a 100%
const fuelQualityScore = ref(100);  // 0% a 100%
const cylinderMisfires = ref([0, 0, 0, 0]); // Contador de falhas [C1, C2, C3, C4]

// INTERFACE: Modos de Teste (Para você injetar falhas na simulação)
const simulationMode = ref('normal'); // 'normal', 'velas_gastas', 'combustivel_ruim', 'falha_cilindro_3'

// COMPUTED: Cruzamento de Parâmetros para Diagnóstico em Tempo Real
const diagnosticReport = computed(() => {
  let plugStatus = 'Excelente';
  let fuelStatus = 'Excelente';
  let suspectCylinder = null;

  // 1. Cruzamento para Qualidade de Combustível
  // Se o ponto de ignição calculado estiver abaixo do esperado para o RPM atual (ex: < 15° em 2500 RPM com carga alta)
  const timingEsperado = 10 + (simRpm.value * 0.003);
  if (simLoad.value > 30 && simTiming.value < (timingEsperado - 5)) {
    fuelStatus = 'Suspeito (Baixa Octanagem / Solvente)';
  } else if (fuelQualityScore.value < 60) {
    fuelStatus = 'Adulterado / Alerta de Detonação';
  }

  // 2. Cruzamento para Desgaste Preventivo de Velas
  if (sparkPlugHealth.value < 85 && sparkPlugHealth.value >= 50) {
    plugStatus = 'Atenção: Desgaste Preventivo Detectado';
  } else if (sparkPlugHealth.value < 50) {
    plugStatus = 'Crítico: Falha de Ignição Ativa';
  }

  // 3. Identificar qual cilindro está falhando
  const maxMisfires = Math.max(...cylinderMisfires.value);
  if (maxMisfires > 5) {
    const idx = cylinderMisfires.value.indexOf(maxMisfires);
    suspectCylinder = idx + 1; // Cilindro 1, 2, 3 ou 4
  }

  return { plugStatus, fuelStatus, suspectCylinder };
});

let obdStreamTimer = null;
const tripTimer = ref(0); // Tempo de viagem rodando

onMounted(() => {
  // Isso simula o adaptador ELM327 / OBD-II mandando dados via Bluetooth a cada 500ms
  obdStreamTimer = setInterval(() => {
    tripTimer.value++;

    // --- CENÁRIO 1: Tudo Normal (0 a 10 segundos) ---
    if (tripTimer.value < 20) {
      simLoad.value = 20 + Math.random() * 5;
      simLambda.value = 0.3 + Math.random() * 0.5; // Oscilando normal
      simTiming.value = 15; // Ponto normal
      fuelQualityScore.value = 100;
      cylinderMisfires.value = [0, 0, 0, 0];
    }
    
    // --- CENÁRIO 2: Combustível Ruim detectado na aceleração (10 a 20 segundos) ---
    else if (tripTimer.value >= 20 && tripTimer.value < 40) {
      simLoad.value = 65; // Você pisou fundo
      simTiming.value = 5; // A ECU derrubou o ponto para evitar detonação! (Combustível ruim)
      simLambda.value = 0.4;
      fuelQualityScore.value = 45; // Reflete a leitura para forçar o status
    }
    
    // --- CENÁRIO 3: Motor volta ao normal, você tirou o pé (20 a 25 segundos) ---
    else if (tripTimer.value >= 40 && tripTimer.value < 50) {
      simLoad.value = 15;
      simTiming.value = 12;
      fuelQualityScore.value = 100; // Limpa o alerta
    }

    // --- CENÁRIO 4: Falha na Vela do Cilindro 3 na subida (25 a 35 segundos) ---
    else if (tripTimer.value >= 50 && tripTimer.value < 70) {
      simLoad.value = 80; // Muito esforço
      simLambda.value = 0.05; // Sonda travou em pobre! Oxigênio não queimou.
      cylinderMisfires.value[2] = 8; // O sensor CKP acusou falha grave no cilindro 3 (índice 2)
    }

    // --- RESET da simulação para recomeçar o ciclo ---
    else {
      tripTimer.value = 0;
    }

  }, 500); // Frequência de atualização do OBD-II virtual
});

onUnmounted(() => {
  if (obdStreamTimer) clearInterval(obdStreamTimer);
});

onUnmounted(() => {
  if (engineTimer) clearInterval(engineTimer);
});


// --- CÁLCULOS EXATOS DE PROGRESSO ---
const rpmPercent = computed(() => {
  const clamped = Math.min(Math.max(simRpm.value, 0), 8000);
  return clamped / 8000;
});

const speedPercent = computed(() => {
  const clamped = Math.min(Math.max(simSpeed.value, 0), 220);
  return clamped / 220;
});

const tempPercent = computed(() => Math.max(0, Math.min(100, ((simTemp.value - 40) / 80) * 100)));
const calculatedAutonomy = computed(() => Math.floor(((simFuel.value / 100) * 55) * simEcon.value));

// --- CORES DINÂMICAS: ECO DRIVING ---
const ecoColors = computed(() => {
  if (simRpm.value > 6500 || simLoad.value > 75) {
    return { start: '#ef4444', end: '#b91c1c' }; 
  } else if (simRpm.value > 4500 || simLoad.value > 45) {
    return { start: '#eab308', end: '#a16207' }; 
  }
  return { start: '#3b82f6', end: '#1d4ed8' };   
});

// --- LÓGICA DE CORES: VENTOINHA E SIDEBAR ---
const fanColorClass = computed(() => {
  if (simTemp.value >= 103) return 'text-red-500 opacity-100';
  if (simTemp.value >= 100) return 'text-yellow-400 opacity-100';
  if (simTemp.value >= 98) return 'text-emerald-500 opacity-100';
  return 'text-slate-500 opacity-30';
});

const sidebarTheme = computed(() => {
  if (simTemp.value >= 103) {
    return 'bg-red-950/80 border-red-500/50 shadow-[4px_0_30px_rgba(220,38,38,0.3)] animate-pulse';
  }
  if (simTemp.value >= 100) {
    return 'bg-yellow-950/80 border-yellow-500/50 shadow-[4px_0_30px_rgba(234,179,8,0.2)]';
  }
  return 'bg-[#020510]/90 border-white/5 shadow-[4px_0_24px_rgba(0,0,0,0.5)] backdrop-blur-xl';
});

const statusDotClass = computed(() => {
  if (simTemp.value >= 103) return 'bg-red-500 text-red-500 animate-pulse';
  if (simTemp.value >= 100) return 'bg-yellow-400 text-yellow-400';
  return 'bg-emerald-500 text-emerald-500 animate-pulse';
});

const statusTextClass = computed(() => {
  if (simTemp.value >= 103) return 'text-red-300 font-bold';
  if (simTemp.value >= 100) return 'text-yellow-300 font-bold';
  return 'text-emerald-500';
});

const systemStatusText = computed(() => {
  if (simTemp.value >= 103) return 'SYS ERR';
  if (simTemp.value >= 100) return 'WARN';
  return 'CAN OK';
});

// --- CICLO DA SIMULAÇÃO ---
onMounted(() => {
  
  setTimeout(() => {
    let startupInterval = setInterval(() => {
      if (simRpm.value < 800) {
        simRpm.value += 120;
      } else {
        simRpm.value = 800;
        engineStarted = true;
        clearInterval(startupInterval);
      }
    }, 50);
  }, 1000);

  simulationInterval = setInterval(() => {
    if (!engineStarted) return;

    // Temperatura
    if (isHeating) {
      simTemp.value += 0.15;
      if (simTemp.value >= 106) isHeating = false;
    } else {
      simTemp.value -= 0.15;
      if (simTemp.value <= 90) isHeating = true;
    }

    // Comportamento do Motor
    if (isAccelerating) {
      simSpeed.value += 1.2;
      simRpm.value += 65;
      simLoad.value = Math.min(simLoad.value + 3, 85);
      
      if (simRpm.value > 4500) {
        simRpm.value = 2200; 
        simLoad.value = 30;
      }
      if (simSpeed.value > 140) isAccelerating = false;
    } else {
      simSpeed.value -= 0.8;
      simRpm.value -= 35;
      simLoad.value = Math.max(simLoad.value - 2, 10);
      if (simSpeed.value < 45) isAccelerating = true;
    }

    if (simSpeed.value < 0) simSpeed.value = 0;
    if (simRpm.value < 800 && engineStarted) simRpm.value = 800;
    simBattery.value = 13.60 + (Math.random() * 0.1 - 0.05);

  }, 100);
});

onUnmounted(() => {
  if (simulationInterval) clearInterval(simulationInterval);
});
</script>

<style scoped>
.civic-cluster-bg {
  background-color: #020611;
}

.grid-overlay {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
  background-position: center top;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%);
  pointer-events: none;
}

.civic-gauge {
  background: radial-gradient(circle at center, rgba(14, 30, 64, 0.8) 0%, rgba(4, 9, 23, 1) 100%);
}
</style>