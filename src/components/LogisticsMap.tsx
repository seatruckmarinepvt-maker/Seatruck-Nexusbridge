/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { PORTS, ROUTES, TRANSLATIONS } from '../data';
import { Ship, Globe, Clock, Anchor, Compass, Navigation, Layers, ShieldCheck, Info } from 'lucide-react';

interface LogisticsMapProps {
  lang: Language;
}

export default function LogisticsMap({ lang }: LogisticsMapProps) {
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const [selectedPort, setSelectedPort] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  // Map coordinates on a premium 1000x500 marine grid canvas
  // We transform the 100x100 data from data.ts to look balanced on a widescreen aspect ratio
  const getPortPosition = (portId: string) => {
    const rawPort = PORTS[portId];
    if (!rawPort) return { x: 500, y: 250 };
    // Map x (0-100) to 80-920, map y (0-100) to 60-440 for wide proportion
    const x = 100 + (rawPort.coords.x / 100) * 800;
    const y = 50 + (rawPort.coords.y / 100) * 400;
    return { x, y };
  };

  const getRoutePath = (originId: string, destId: string) => {
    const start = getPortPosition(originId);
    const end = getPortPosition(destId);
    
    // Draw a premium smooth cubic bezier arc for shipping lanes
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const dr = Math.sqrt(dx * dx + dy * dy);
    
    // Control point for curve arching upwards
    const cx1 = start.x + dx * 0.4;
    const cy1 = start.y + dy * 0.1 - (dr * 0.18);
    const cx2 = start.x + dx * 0.6;
    const cy2 = start.y + dy * 0.9 - (dr * 0.18);
    
    return `M ${start.x} ${start.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end.x} ${end.y}`;
  };

  return (
    <section id="logistics" className="bg-[#0B192C] text-white py-24 relative select-none overflow-hidden border-b border-white/5">
      
      {/* Decorative Grid Mesh & Atmospheric Glow */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-marine-light/10 rounded-full blur-[140px] pointer-events-none animate-slow-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 border border-brand-gold/20">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '20s' }} />
            <span>{lang === 'es' ? 'RED GLOBAL CARGO' : lang === 'ar' ? 'شبكة الشحن العالمية' : lang === 'hi' ? 'वैश्विक शिपिंग नेटवर्क' : lang === 'zh' ? '全球多式联运管线' : 'GLOBAL SHIPPING INFRASTRUCTURE'}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.section_logistics_title || 'Interactive Global Shipping Routes'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed font-semibold max-w-2xl mx-auto">
            {t.section_logistics_subtitle || 'Hover on routing paths to analyze active voyages carrying agricultural cargo from primary supply centers.'}
          </p>
        </div>

        {/* Outer Canvas Container */}
        <div className="bg-[#0F2D52]/40 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative">
          
          {/* Top Panel Specs Overlay */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-wider uppercase">Vessels Transiting Sea Routes Live</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] uppercase font-mono">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand-gold" /> Primary Hubs</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand-blue" /> Satellite Connections</span>
            </div>
          </div>

          {/* Map Vector Stage */}
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-[#081225]/80 border border-white/5">
            
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 1000 500" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Radial Glows */}
                <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#081225" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F4B400" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>

              {/* Background Ocean Glow */}
              <rect width="1000" height="500" fill="url(#oceanGlow)" />

              {/* Grid Lines Overlay representing Nautical Navigation System */}
              <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.5">
                {Array.from({ length: 21 }).map((_, i) => (
                  <line key={`x-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" />
                ))}
                {Array.from({ length: 11 }).map((_, i) => (
                  <line key={`y-${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} />
                ))}
              </g>

              {/* Stylized Dotted Concentric Navigational Rings */}
              <circle cx="500" cy="250" r="180" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1" strokeDasharray="4 6" fill="none" />
              <circle cx="500" cy="250" r="320" stroke="#ffffff" strokeOpacity="0.02" strokeWidth="1" strokeDasharray="6 8" fill="none" />

              {/* Abstract World Land Outline Silhouettes - Clean Technical Polygons */}
              <g fill="#ffffff" fillOpacity="0.015" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.5">
                {/* Americas outline */}
                <path d="M 50 100 L 120 120 L 150 180 L 120 220 L 100 280 L 130 350 L 160 440 L 140 460 L 110 440 L 90 350 L 50 300 L 30 200 L 20 120 Z" />
                {/* Europe & Africa */}
                <path d="M 220 80 L 320 90 L 340 120 L 300 160 L 280 200 L 320 220 L 330 280 L 380 340 L 410 440 L 360 450 L 310 400 L 280 320 L 240 260 L 210 200 L 200 130 Z" />
                {/* Asia & Australia */}
                <path d="M 400 100 L 520 80 L 680 90 L 800 120 L 850 180 L 780 240 L 800 320 L 850 350 L 820 440 L 740 450 L 710 400 L 680 340 L 650 260 L 520 280 L 440 220 Z" />
              </g>

              {/* Curved Shipping Lanes */}
              {ROUTES.map((route) => {
                const isHovered = hoveredRoute === route.id;
                const pathStr = getRoutePath(route.origin, route.destination);
                
                return (
                  <g key={route.id}>
                    {/* Interaction Bridge Line */}
                    <path
                      d={pathStr}
                      stroke="transparent"
                      strokeWidth="15"
                      fill="none"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredRoute(route.id)}
                      onMouseLeave={() => setHoveredRoute(null)}
                    />

                    {/* Static Background Lane */}
                    <path
                      d={pathStr}
                      stroke={isHovered ? "#F4B400" : "#2563EB"}
                      strokeWidth={isHovered ? "2" : "1"}
                      strokeOpacity={isHovered ? "0.9" : "0.3"}
                      fill="none"
                      className="transition-all duration-300"
                    />

                    {/* Animated Dash Flow for transiting cargo along paths */}
                    <path
                      d={pathStr}
                      stroke={isHovered ? "#F4B400" : "#2563EB"}
                      strokeWidth="1.5"
                      strokeDasharray="8 20"
                      strokeDashoffset="100"
                      fill="none"
                      className="animate-[dash_12s_linear_infinite]"
                      opacity={isHovered ? "1" : "0.75"}
                    />
                  </g>
                );
              })}

              {/* Pulsing Connected Ports Nodes */}
              {Object.keys(PORTS).map((portId) => {
                const port = PORTS[portId];
                const pos = getPortPosition(portId);
                const isSelected = selectedPort === portId;

                return (
                  <g 
                    key={portId}
                    className="cursor-pointer group/node"
                    onClick={() => setSelectedPort(isSelected ? null : portId)}
                    onMouseEnter={() => {
                      // Auto-highlight route connected to this port
                      const connectedRoute = ROUTES.find(r => r.origin === portId || r.destination === portId);
                      if (connectedRoute) setHoveredRoute(connectedRoute.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredRoute(null);
                    }}
                  >
                    {/* Outer concentric diagnostic glow pulse */}
                    <circle 
                      cx={pos.x} 
                      cy={pos.y} 
                      r={isSelected ? "14" : "8"} 
                      className="fill-brand-gold/10 stroke-brand-gold/30 animate-ping group-hover/node:scale-110 transition-all"
                      style={{ animationDuration: '3s' }}
                    />

                    {/* Inner port dot */}
                    <circle 
                      cx={pos.x} 
                      cy={pos.y} 
                      r={isSelected ? "6" : "4.5"} 
                      className="fill-brand-gold stroke-white group-hover/node:fill-white transition-all shadow-md"
                      strokeWidth="1.5"
                    />

                    {/* Text Label Backdrop Shield */}
                    <rect
                      x={pos.x - 35}
                      y={pos.y - 25}
                      width="70"
                      height="14"
                      rx="4"
                      fill="#0B192C"
                      fillOpacity="0.8"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                      className="opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none"
                    />

                    {/* Port Text Label */}
                    <text
                      x={pos.x}
                      y={pos.y - 15}
                      textAnchor="middle"
                      className="text-[9px] font-mono font-black fill-slate-300 pointer-events-none drop-shadow-md tracking-wider uppercase select-none"
                    >
                      {port.name.split(',')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Float HUD card showing the hovered/active route specs */}
            <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-[#0B192C]/95 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md z-20">
              <AnimatePresence mode="wait">
                {hoveredRoute ? (
                  (() => {
                    const route = ROUTES.find(r => r.id === hoveredRoute);
                    if (!route) return null;
                    const originPort = PORTS[route.origin];
                    const destPort = PORTS[route.destination];

                    return (
                      <motion.div
                        key={route.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-[9px] font-mono font-bold text-brand-gold uppercase tracking-wider flex items-center gap-1">
                            <Ship className="w-3 h-3 text-brand-gold" />
                            {route.vesselName}
                          </span>
                          <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-md border border-emerald-500/25">
                            {t.active_now || 'Active Voyage'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 justify-between">
                          <div className="text-left">
                            <span className="text-[8px] uppercase text-slate-400 font-mono tracking-wider block">Origin</span>
                            <span className="text-[11px] font-bold text-white block">{originPort?.name.split(',')[0]}</span>
                          </div>
                          <span className="text-slate-500 font-mono">→</span>
                          <div className="text-right">
                            <span className="text-[8px] uppercase text-slate-400 font-mono tracking-wider block">Destination</span>
                            <span className="text-[11px] font-bold text-white block">{destPort?.name.split(',')[0]}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-slate-400">
                          <div>
                            <span className="block text-slate-500 text-[8px] uppercase">Cargo Capacity</span>
                            <span className="text-white font-bold truncate block">{route.cargo[lang]}</span>
                          </div>
                          <div>
                            <span className="block text-slate-500 text-[8px] uppercase">Transit Est.</span>
                            <span className="text-brand-gold font-black block">{route.transitDays} Days</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()
                ) : (
                  <div className="space-y-1.5 text-slate-400 text-[11px] font-semibold flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{lang === 'es' ? 'Apunte a una ruta de navegación para ver sus detalles.' : lang === 'ar' ? 'ضع مؤشر الماوس على أي مسار لتحليل الرحلة.' : lang === 'hi' ? 'मार्ग विवरण देखने के लिए किसी शिपिंग लाइन पर माउस घुमाएं।' : lang === 'zh' ? '悬停或点击蓝色航线以查看班轮运载明细' : 'Hover over any shipping lane to analyze the vessel voyage specs.'}</span>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Interactive Route Cards Grid below the map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {ROUTES.slice(0, 3).map((route) => {
              const origin = PORTS[route.origin];
              const dest = PORTS[route.destination];
              const isActive = hoveredRoute === route.id;

              return (
                <div
                  key={route.id}
                  onMouseEnter={() => setHoveredRoute(route.id)}
                  onMouseLeave={() => setHoveredRoute(null)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#0F2D52] border-brand-gold shadow-md' 
                      : 'bg-[#0B192C]/40 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider block">
                      {route.vesselName}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      FOB / CIF
                    </span>
                  </div>

                  <h4 className="font-display text-xs font-black text-white tracking-wide uppercase">
                    {origin?.name.split(',')[0]} to {dest?.name.split(',')[0]}
                  </h4>

                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 font-semibold">
                    {route.cargo[lang]}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono pt-2.5 border-t border-white/5">
                    <span className="text-slate-500">Transit Duration</span>
                    <span className="text-white font-black">{route.transitDays} Days</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Tailwind animation styles added inline for cross-compilation support */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </section>
  );
}
