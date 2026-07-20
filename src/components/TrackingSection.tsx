/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Shipment } from '../types';
import { INITIAL_TRACKING_DATA, TRANSLATIONS, PORTS, PRODUCTS } from '../data';
import { Search, Loader2, Thermometer, Droplets, Ship, Calendar, ShieldAlert, CheckCircle, Navigation, Info, ArrowRight, Settings, Plus, Play, Anchor } from 'lucide-react';

interface TrackingSectionProps {
  lang: Language;
}

export default function TrackingSection({ lang }: TrackingSectionProps) {
  const [trackingId, setTrackingId] = useState('ST-9283-IND');
  const [searchQuery, setSearchQuery] = useState('ST-9283-IND');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Local shipment database including simulated customized dispatches
  const [shipments, setShipments] = useState<Record<string, Shipment>>(INITIAL_TRACKING_DATA);
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(INITIAL_TRACKING_DATA['ST-9283-IND']);

  // Custom simulator configurations
  const [simCargo, setSimCargo] = useState('cashews');
  const [simOrigin, setSimOrigin] = useState('mundra');
  const [simDest, setSimDest] = useState('jebel_ali');
  const [simContainer, setSimContainer] = useState('Reefer (40ft)');
  const [simVessel, setSimVessel] = useState('Setruck Sovereign');
  const [simSuccess, setSimSuccess] = useState(false);

  const t = TRANSLATIONS[lang];

  const handleSearch = (idToSearch: string) => {
    setLoading(true);
    setErrorMsg('');
    
    setTimeout(() => {
      const normId = idToSearch.trim().toUpperCase();
      if (shipments[normId]) {
        setActiveShipment(shipments[normId]);
        setTrackingId(normId);
      } else {
        setErrorMsg(t.invalid_tracking || 'Shipment ID not found. Try ST-9283-IND or create a custom simulation below!');
        setActiveShipment(null);
      }
      setLoading(false);
    }, 600);
  };

  const handleLaunchSimulator = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const newId = `ST-${Math.floor(1000 + Math.random() * 9000)}-${PORTS[simDest].id.slice(0, 3).toUpperCase()}`;
      const product = PRODUCTS.find(p => p.id === simCargo) || PRODUCTS[0];
      
      const newShipment: Shipment = {
        trackingId: newId,
        commodity: product.name,
        vesselName: simVessel,
        containerId: `SEAU-${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(Math.random() * 9)}`,
        containerType: simContainer,
        status: 'transit',
        originPort: {
          en: `${PORTS[simOrigin].name}, ${PORTS[simOrigin].country.en}`,
          es: `${PORTS[simOrigin].name}, ${PORTS[simOrigin].country.es}`,
          ar: `${PORTS[simOrigin].name}، ${PORTS[simOrigin].country.ar}`,
          hi: `${PORTS[simOrigin].name}, ${PORTS[simOrigin].country.hi}`,
          zh: `${PORTS[simOrigin].name}, ${PORTS[simOrigin].country.zh}`
        },
        destinationPort: {
          en: `${PORTS[simDest].name}, ${PORTS[simDest].country.en}`,
          es: `${PORTS[simDest].name}, ${PORTS[simDest].country.es}`,
          ar: `${PORTS[simDest].name}، ${PORTS[simDest].country.ar}`,
          hi: `${PORTS[simDest].name}, ${PORTS[simDest].country.hi}`,
          zh: `${PORTS[simDest].name}, ${PORTS[simDest].country.zh}`
        },
        departureDate: new Date().toISOString().split('T')[0],
        arrivalDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temperature: simContainer.includes('Reefer') ? '4.8 °C' : 'Ambient Temp',
        humidity: '60%',
        currentLat: 18.2,
        currentLng: 70.4,
        milestones: [
          { status: 'processing', date: new Date().toISOString().split('T')[0], location: `${PORTS[simOrigin].name} Terminal`, description: { en: 'Order custom cleared and containerized successfully.', es: 'Cargamento inspeccionado y contenedor sellado.', ar: 'تم تعبئة الشحنة جمركياً وربط الحاوية المبردة بنجاح.', hi: 'ऑर्डर प्रसंस्कृत और सुरक्षित रूप से सील बंद।', zh: '商品通过植物检疫商检验收，大柜拼装并加封。' }, completed: true },
          { status: 'customs', date: new Date().toISOString().split('T')[0], location: `${PORTS[simOrigin].name} customs`, description: { en: 'FOB Export customs approved.', es: 'Aduanas aprobadas para exportación.', ar: 'الموافقة الجمركية وتخليص الصادرات.', hi: 'कस्टम्स विभाग द्वारा निर्यात को हरी झंडी।', zh: '海关放行通关完毕。' }, completed: true },
          { status: 'loaded', date: new Date().toISOString().split('T')[0], location: `${PORTS[simOrigin].name} Gate`, description: { en: 'Loaded on board the ocean vessel. Reefer monitoring active.', es: 'Contenedor acoplado a bordo. Monitoreo satelital activo.', ar: 'تم شحن الحاوية على متن السفينة الاستيرادية.', hi: 'शिपिंग पोत पर लोडिंग समाप्त। उपग्रह ट्रैकिंग प्रणाली सक्रिय।', zh: '成功搭载入舱，智能遥测供电启动。' }, completed: true },
          { status: 'transit', date: new Date().toISOString().split('T')[0], location: 'Deep Sea Transit', description: { en: 'Vessel transiting standard ocean channels.', es: 'Navegando a velocidad crucero por canales internacionales.', ar: 'السفينة في عمق البحر متجهة للميناء المستهدف.', hi: 'जहाज गहरे महासागर के रास्ते पर अग्रसर।', zh: '集装箱班轮正沿着干线航道平稳航行。' }, completed: true },
          { status: 'discharging', date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], location: `${PORTS[simDest].name} Berth`, description: { en: 'Planned discharge and custom validation.', es: 'Descarga de carga programada.', ar: 'تفريغ وتدقيق جمركي مخطط له.', hi: 'गंतव्य बंदरगाह पर उतरने का नियोजन।', zh: '预计港前吊装卸船交付。' }, completed: false },
          { status: 'delivered', date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], location: 'Consignee Warehousing', description: { en: 'Door delivery complete.', es: 'Entrega final completada con éxito.', ar: 'تم التسليم النهائي للمخازن.', hi: 'गोदाम डिलीवरी संपन्न।', zh: '目的卡车配送上门并交付。' }, completed: false }
        ]
      };

      setShipments(prev => ({ ...prev, [newId]: newShipment }));
      setActiveShipment(newShipment);
      setTrackingId(newId);
      setSearchQuery(newId);
      setSimSuccess(true);
      setLoading(false);
      setTimeout(() => setSimSuccess(false), 5000);
    }, 1000);
  };

  const getMilestoneLabel = (milestoneKey: string) => {
    const labels: Record<string, string> = {
      processing: t.milestone_processing || 'Order Consolidating',
      customs: t.milestone_customs || 'Export Customs Clearance',
      loaded: t.milestone_loaded || 'Ocean Carrier Loading',
      transit: t.milestone_transit || 'In-Transit (Ocean Cargo)',
      discharging: t.milestone_discharging || 'Port of Discharge Handover',
      delivered: t.milestone_delivered || 'Consignee Delivery Complete'
    };
    return labels[milestoneKey] || milestoneKey;
  };

  return (
    <section id="tracking" className="bg-[#f8fafc] text-slate-900 py-24 relative select-none border-b border-slate-200">
      
      {/* Visual background accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-3 border border-brand-blue/20">
            <Navigation className="w-3.5 h-3.5 animate-pulse" />
            <span>COLD CHAIN TELEMETRY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.section_tracking_title || 'Real-Time Cold Chain Tracking'}
          </h2>
          <p className="text-slate-650 text-xs sm:text-sm mt-3 leading-relaxed font-semibold max-w-2xl mx-auto font-sans">
            {t.section_tracking_subtitle || 'Monitor reefer container vitals, marine routing progression, and live moisture levels in real-time.'}
          </p>
        </div>

        {/* Console Dashboard Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONSOLE COLUMN: Tracking Lookup & Vitals (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Search Input Widget */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-lg relative overflow-hidden">
              <h3 className="text-xs uppercase font-mono font-black text-slate-400 tracking-widest mb-3 text-left">
                📦 {t.enter_tracking_num || 'Enter Tracking ID or Bill of Lading'}
              </h3>
              
              <div className="flex gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. ST-9283-IND"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 rounded-xl py-3 pl-11 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none transition-all uppercase"
                  />
                </div>
                <button
                  onClick={() => handleSearch(searchQuery)}
                  disabled={loading}
                  className="px-5 bg-brand-navy hover:bg-brand-blue text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors shrink-0 uppercase tracking-wider"
                >
                  {loading ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <span>{t.track_btn || 'Fetch Live Status'}</span>}
                </button>
              </div>

              {errorMsg && (
                <div className="mt-3.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[11px] font-bold text-left flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Vessel & Telemetry Sensors Vitals Sheet */}
            <AnimatePresence mode="wait">
              {activeShipment && (
                <motion.div
                  key={activeShipment.trackingId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Container Details Sheet */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg text-left">
                    <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                      <div>
                        <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-wider font-bold">SHIPMENT ID</span>
                        <h4 className="text-sm font-black text-slate-900 tracking-tight font-mono">{activeShipment.trackingId}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-wider font-bold">{t.status_label || 'Current Status'}</span>
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md border border-emerald-500/20">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          {activeShipment.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block font-bold">COMMODITY Cargo</span>
                        <span className="text-slate-800 font-bold block">{activeShipment.commodity[lang]}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block font-bold">CONTAINER SPEC</span>
                        <span className="text-slate-800 font-mono font-bold block">{activeShipment.containerId}</span>
                        <span className="text-slate-500 text-[9px] block font-mono">({activeShipment.containerType})</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block font-bold">VESSEL CARRIER</span>
                        <span className="text-brand-blue font-bold block flex items-center gap-1">
                          <Ship className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                          {activeShipment.vesselName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Physical Reefer Vitals telemetry Gauges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Temperature gauge */}
                    <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-6 shadow-lg text-left flex items-center gap-4 relative overflow-hidden group">
                      <div className="w-12 h-12 bg-red-50 text-red-500 border border-red-100 rounded-2xl flex items-center justify-center shrink-0">
                        <Thermometer className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block tracking-wider font-bold uppercase">
                          {t.container_temp || 'Container Temp'}
                        </span>
                        <span className="text-lg font-mono font-black text-slate-900 block">
                          {activeShipment.temperature}
                        </span>
                        <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                          Cold-Chain Secure
                        </span>
                      </div>
                    </div>

                    {/* Relative humidity gauge */}
                    <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-6 shadow-lg text-left flex items-center gap-4 relative overflow-hidden group">
                      <div className="w-12 h-12 bg-blue-50 text-blue-500 border border-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                        <Droplets className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 block tracking-wider font-bold uppercase">
                          {t.container_humidity || 'Relative Humidity'}
                        </span>
                        <span className="text-lg font-mono font-black text-slate-900 block">
                          {activeShipment.humidity}
                        </span>
                        <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-1 mt-0.5 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                          Moisture Sealed
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Waypoints progression timeline */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg text-left">
                    <h3 className="text-xs uppercase font-mono font-black text-slate-400 tracking-widest mb-6 border-b border-slate-100 pb-3">
                      🗺️ {t.milestones_timeline || 'Freight Timeline Milestones'}
                    </h3>

                    <div className="relative pl-6 border-l-2 border-slate-150 space-y-6">
                      {activeShipment.milestones.map((milestone, idx) => {
                        const isDone = milestone.completed;
                        return (
                          <div key={idx} className="relative">
                            {/* Marker dot */}
                            <span className={`absolute -left-9.5 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                              isDone 
                                ? 'bg-brand-navy border-brand-navy text-white' 
                                : 'bg-slate-100 border-slate-300 text-slate-400'
                            }`}>
                              {isDone ? '✓' : idx + 1}
                            </span>

                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <h4 className={`text-xs font-black tracking-tight ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                                  {getMilestoneLabel(milestone.status)}
                                </h4>
                                <span className="text-[9px] font-mono font-bold text-slate-400 flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-slate-300" />
                                  {milestone.date}
                                </span>
                              </div>
                              <span className="text-[9px] font-mono font-black text-brand-blue block">
                                {milestone.location}
                              </span>
                              <p className="text-slate-550 text-[11px] leading-relaxed font-semibold">
                                {milestone.description[lang]}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT CONSOLE COLUMN: Interactive Simulator Formulation (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B192C] text-white border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-left">
              <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border border-brand-gold/20 mb-2 font-mono">
                    <Settings className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
                    <span>CARGO SIMULATION DESK</span>
                  </div>
                  <h3 className="font-display font-black text-lg tracking-tight text-white leading-snug">
                    {t.custom_simulator_title || 'Simulate Custom Shipment'}
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                    Choose an origin hub, cargo product range, destination port, and container configurations to launch a live-simulated container voyage record!
                  </p>
                </div>

                <form onSubmit={handleLaunchSimulator} className="space-y-4 text-xs font-semibold">
                  {/* Select Cargo */}
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono text-[10px] tracking-wider uppercase block">
                      {t.sim_commodity || 'Select Cargo'}
                    </label>
                    <select
                      value={simCargo}
                      onChange={(e) => setSimCargo(e.target.value)}
                      className="w-full bg-[#0F2D52]/60 border border-white/10 rounded-xl py-2.5 px-3 outline-none text-white font-semibold focus:border-brand-gold/50 cursor-pointer"
                    >
                      <option value="cashews" className="bg-[#0B192C]">Cashew Nuts (Dry Fruits)</option>
                      <option value="almonds" className="bg-[#0B192C]">Almonds (Dry Fruits)</option>
                      <option value="rice" className="bg-[#0B192C]">Basmati Rice (Grains)</option>
                      <option value="wheat" className="bg-[#0B192C]">Wheat Kernel (Grains)</option>
                      <option value="broccoli" className="bg-[#0B192C]">Fresh Broccoli (Produce)</option>
                      <option value="corn" className="bg-[#0B192C]">Sweet Corn (Produce)</option>
                    </select>
                  </div>

                  {/* Port Selection Dual row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono text-[10px] tracking-wider uppercase block">
                        {t.sim_origin || 'Origin Port'}
                      </label>
                      <select
                        value={simOrigin}
                        onChange={(e) => setSimOrigin(e.target.value)}
                        className="w-full bg-[#0F2D52]/60 border border-white/10 rounded-xl py-2.5 px-3 outline-none text-white font-semibold focus:border-brand-gold/50 cursor-pointer"
                      >
                        <option value="mundra" className="bg-[#0B192C]">Mundra Port, IN</option>
                        <option value="shanghai" className="bg-[#0B192C]">Shanghai, CN</option>
                        <option value="singapore" className="bg-[#0B192C]">Singapore, SG</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono text-[10px] tracking-wider uppercase block">
                        {t.sim_dest || 'Destination Port'}
                      </label>
                      <select
                        value={simDest}
                        onChange={(e) => setSimDest(e.target.value)}
                        className="w-full bg-[#0F2D52]/60 border border-white/10 rounded-xl py-2.5 px-3 outline-none text-white font-semibold focus:border-brand-gold/50 cursor-pointer"
                      >
                        <option value="jebel_ali" className="bg-[#0B192C]">Jebel Ali, UAE</option>
                        <option value="rotterdam" className="bg-[#0B192C]">Rotterdam, NL</option>
                        <option value="mombasa" className="bg-[#0B192C]">Mombasa, KE</option>
                      </select>
                    </div>
                  </div>

                  {/* Container & Vessel Specifications */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono text-[10px] tracking-wider uppercase block">
                        {t.sim_container || 'Container Type'}
                      </label>
                      <select
                        value={simContainer}
                        onChange={(e) => setSimContainer(e.target.value)}
                        className="w-full bg-[#0F2D52]/60 border border-white/10 rounded-xl py-2.5 px-3 outline-none text-white font-semibold focus:border-brand-gold/50 cursor-pointer"
                      >
                        <option value="Reefer (20ft)" className="bg-[#0B192C]">Reefer (20ft)</option>
                        <option value="Reefer (40ft)" className="bg-[#0B192C]">Reefer (40ft)</option>
                        <option value="Dry FCL (40ft)" className="bg-[#0B192C]">Dry FCL (40ft)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-400 font-mono text-[10px] tracking-wider uppercase block">
                        {t.sim_vessel || 'Vessel Name'}
                      </label>
                      <select
                        value={simVessel}
                        onChange={(e) => setSimVessel(e.target.value)}
                        className="w-full bg-[#0F2D52]/60 border border-white/10 rounded-xl py-2.5 px-3 outline-none text-white font-semibold focus:border-brand-gold/50 cursor-pointer"
                      >
                        <option value="Setruck Wanderer" className="bg-[#0B192C]">Setruck Wanderer</option>
                        <option value="Setruck Sovereign" className="bg-[#0B192C]">Setruck Sovereign</option>
                        <option value="Setruck Titan" className="bg-[#0B192C]">Setruck Titan</option>
                      </select>
                    </div>
                  </div>

                  {/* Trigger Simulator */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 py-3 bg-logo-gradient hover:bg-logo-gradient-hover text-slate-950 hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider text-center shadow-lg hover:-translate-y-0.5"
                  >
                    <Play className="w-4 h-4 shrink-0 animate-pulse text-brand-blue" />
                    <span>{t.sim_btn || 'Launch Tracker Simulator'}</span>
                  </button>
                </form>

                <AnimatePresence>
                  {simSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold text-left flex items-start gap-2.5"
                    >
                      <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      <div>
                        <span className="block font-black text-white">SIMULATOR ACTIVE SUCCESS</span>
                        <span>Container dispatched. Track code <strong className="text-brand-gold font-black font-mono">{trackingId}</strong> generated!</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
