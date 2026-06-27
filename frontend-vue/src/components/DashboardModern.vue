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
      <div v-if="activeView === 'obd'" class="absolute inset-0 z-50 flex items-center justify-center bg-[#020611]/95 backdrop-blur-sm p-8 overflow-y-auto">
        <div class="w-full max-w-5xl bg-[#0a0f1c] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-8 relative overflow-hidden">
          
          <!-- Elemento decorativo -->
          <div class="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <!-- Cabeçalho OBD -->
          <div class="flex items-center justify-between border-b border-white/5 pb-6 relative z-10">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-black text-white tracking-tight">Telemetria de Motor e OBD-II</h2>
                <p class="text-slate-400 text-sm mt-1">Leitura em tempo real dos sensores eletrônicos.</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-emerald-400 font-mono text-xs uppercase font-bold tracking-widest">Interface CAN Ativa</span>
            </div>
          </div>

          <!-- Grid de Sensores -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            
            <!-- Card 1: Engine Load -->
            <div class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Carga do Motor (Engine Load)</div>
              <div class="flex items-end justify-between">
                <span class="text-3xl font-black text-white">{{ Math.floor(simLoad) }}<span class="text-lg text-slate-500 ml-1">%</span></span>
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div class="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div class="bg-blue-500 h-full rounded-full transition-all duration-300" :style="{ width: `${simLoad}%` }"></div>
              </div>
            </div>

            <!-- Card 2: MAF -->
            <div class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fluxo de Ar (MAF)</div>
              <div class="flex items-end justify-between">
                <span class="text-3xl font-black text-white">{{ (simRpm * 0.005).toFixed(1) }}<span class="text-lg text-slate-500 ml-1">g/s</span></span>
                <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>

            <!-- Card 3: Posição Borboleta -->
            <div class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Abertura Borboleta (TPS)</div>
              <div class="flex items-end justify-between">
                <span class="text-3xl font-black text-white">{{ (simLoad * 0.8).toFixed(1) }}<span class="text-lg text-slate-500 ml-1">%</span></span>
                <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              </div>
            </div>

            <!-- Card 4: Tensão Sonda Lambda -->
            <div class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sonda Lambda (O2)</div>
              <div class="flex items-end justify-between">
                <span class="text-3xl font-black text-white">{{ (0.1 + Math.random() * 0.8).toFixed(2) }}<span class="text-lg text-slate-500 ml-1">V</span></span>
                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
            </div>

            <!-- Card 5: Avanço de Ignição -->
            <div class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Avanço de Ignição</div>
              <div class="flex items-end justify-between">
                <span class="text-3xl font-black text-white">{{ (10 + (simRpm * 0.003)).toFixed(1) }}<span class="text-lg text-slate-500 ml-1">°</span></span>
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
              </div>
            </div>

            <!-- Card 6: Temp Ar Admissão (IAT) -->
            <div class="bg-[#111624] border border-white/5 rounded-2xl p-5 flex flex-col gap-2">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Temp. Ar Admissão (IAT)</div>
              <div class="flex items-end justify-between">
                <span class="text-3xl font-black text-white">35<span class="text-lg text-slate-500 ml-1">°C</span></span>
                <svg class="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
              </div>
            </div>
          </div>

          <!-- Códigos de Falha (DTC) -->
          <div class="bg-[#111624] border border-white/5 rounded-2xl p-6 relative z-10">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Diagnostic Trouble Codes (DTC)</h3>
            
            <div v-if="simTemp < 103" class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-4">
              <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <div class="text-sm font-bold text-emerald-400">Nenhum código de falha detectado no módulo do motor.</div>
            </div>
            
            <div v-else class="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex flex-col gap-2">
              <div class="flex items-center gap-4">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <div class="text-sm font-bold text-red-400">Falha detectada. Verifique o sistema de arrefecimento.</div>
              </div>
              <div class="mt-2 text-xs font-mono bg-black/50 p-3 rounded-lg text-slate-300">
                <span class="text-red-400 font-bold">P0118</span> - Engine Coolant Temperature Sensor 1 Circuit High
              </div>
            </div>

          </div>

        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// --- ESTADO DE ROTEAMENTO (NOVO) ---
const activeView = ref('painel'); 

// --- ESTADOS DOS SENSORES ---
const simSpeed = ref(0);
const simRpm = ref(0); 
const simLoad = ref(15);
const simTemp = ref(90);  
const simFuel = ref(58);
const simBattery = ref(13.60);
const simEcon = ref(9.4);

let simulationInterval = null;
let isAccelerating = true;
let isHeating = true;
let engineStarted = false; 

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