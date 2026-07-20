/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from './types';
import { TRANSLATIONS } from './data';
import Navbar from './components/Navbar';

// Page Components
import Home from './components/pages/Home';
import AboutUs from './components/pages/AboutUs';
import Products from './components/pages/Products';
import ServicesAndIndustries from './components/pages/ServicesAndIndustries';
import NetworkAndLogistics from './components/pages/NetworkAndLogistics';
import CompanyResources from './components/pages/CompanyResources';
import ContactAndQuote from './components/pages/ContactAndQuote';
import LegalAndMisc from './components/pages/LegalAndMisc';

import { Ship, ArrowUp, CheckCircle, Globe, Anchor, Linkedin, Twitter, Facebook, Send, Check } from 'lucide-react';
import companyLogo from './assets/images/regenerated_image_1784368104798.png';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 4000);
    }
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Dynamic Browser Title changes and Search Engine Optimization (SEO Schema injection)
  useEffect(() => {
    const pageTitle = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
    document.title = `SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO | ${pageTitle} | Connecting Global Markets`;
    
    // Inject Meta Keywords, Meta Description and Canonical Link dynamically
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', t.hero_subtitle || "SEATRUCK NEXUSBRIDGE delivers high-grade agro commodities and industrial raw materials worldwide from Dubai, UAE.");
 
    let metaKeys = document.querySelector('meta[name="keywords"]');
    if (!metaKeys) {
      metaKeys = document.createElement('meta');
      metaKeys.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeys);
    }
    metaKeys.setAttribute('content', 'Dubai general trading, Dubai Silicon Oasis, agro import export, sea freight, basmati, cashew nuts, almonds, cardamom, turmeric, cold chain logistics, Seatruck Nexusbridge, global trade');
 
    // Dynamic JSON-LD Structured Data Schema implementation
    let ldScript = document.getElementById('json-ld-schema');
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.setAttribute('id', 'json-ld-schema');
      ldScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(ldScript);
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ImportExportBusiness",
      "name": "SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO",
      "description": t.hero_subtitle || "Connecting Global Markets from Dubai",
      "url": window.location.href,
      "email": "info@seatrucknexus.com",
      "telephone": "+971 50 919 9209",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Building A1, Dubai Digital Park, Dubai Silicon Oasis",
        "addressLocality": "Dubai",
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "subOrganization": {
        "@type": "ImportExportBusiness",
        "name": "Seatruck Exim Services (South Asia Regional Operations Office)",
        "telephone": "+91 91676 04059",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Office No. E-712, Tower II, 7th Floor, Plot No. R-11, Seawoods Grand Central, Sector 40, Nerul, Darave",
          "addressLocality": "Thane",
          "addressRegion": "Maharashtra",
          "postalCode": "400706",
          "addressCountry": "IN"
        }
      },
      "knowsAbout": ["Global Sourcing", "Import Export Trading", "Agricultural exports", "Ocean Cold Chain Logistics", "Cashew Nuts Sourcing", "Long Grain Rice Trade", "Spices Commodity Scheduling"],
      "areaServed": ["Global", "Middle East", "Europe", "Africa", "North America", "Southeast Asia"]
    };
 
    ldScript.innerHTML = JSON.stringify(structuredData);
  }, [lang, activeSection, t]);

  // Handle window scrolling to toggle scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hash-based routing system supporting custom query parameters
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '');
      const parts = fullHash.split('?');
      const hash = parts[0];
      
      const validPages = [
        'home', 'about', 'products', 'product-details', 
        'services', 'industries', 'quality', 'network', 
        'logistics', 'news', 'faqs', 'careers', 
        'contact', 'quote', 'privacy', 'terms', '404'
      ];
      
      if (parts[1]) {
        // Parse custom key-value params (e.g. #product-details?id=cashews)
        const queryParams = new URLSearchParams(parts[1]);
        const productId = queryParams.get('id');
        if (productId) {
          setSelectedProductId(productId);
        }
      } else {
        setSelectedProductId(undefined);
      }

      if (validPages.includes(hash)) {
        setActiveSection(hash);
      } else if (!hash) {
        setActiveSection('home');
        window.history.replaceState(null, '', '#home');
      } else {
        setActiveSection('404');
      }
      
      // Instantly scroll to the top of the new page
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initialize active page on mount
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavigate = (sectionId: string, params?: Record<string, string>) => {
    let finalHash = sectionId;
    if (params) {
      const queryParams = new URLSearchParams(params);
      finalHash = `${sectionId}?${queryParams.toString()}`;
    }
    
    window.location.hash = finalHash;
    setActiveSection(sectionId);
    if (params?.id) {
      setSelectedProductId(params.id);
    } else {
      setSelectedProductId(undefined);
    }
    window.scrollTo(0, 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRtl = lang === 'ar';

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-brand-warm-white text-slate-900 font-sans flex flex-col justify-between selection:bg-brand-emerald selection:text-white ${isRtl ? 'text-right' : 'text-left'}`}
    >
      
      {/* Sticky Header Navigation */}
      <Navbar
        currentLang={lang}
        onLanguageChange={(newLocale) => setLang(newLocale)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main View Router */}
      <main className="flex-grow pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection + (selectedProductId || '')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {activeSection === 'home' && (
              <Home lang={lang} onNavigate={handleNavigate} />
            )}
            
            {activeSection === 'about' && (
              <AboutUs lang={lang} onNavigate={handleNavigate} />
            )}
            
            {(activeSection === 'products' || activeSection === 'product-details') && (
              <Products 
                lang={lang} 
                selectedProductId={selectedProductId}
                onNavigate={handleNavigate} 
              />
            )}
            
            {(activeSection === 'services' || activeSection === 'industries' || activeSection === 'quality') && (
              <ServicesAndIndustries 
                lang={lang} 
                onNavigate={handleNavigate} 
              />
            )}
            
            {(activeSection === 'network' || activeSection === 'logistics') && (
              <NetworkAndLogistics 
                lang={lang} 
                onNavigate={handleNavigate} 
              />
            )}
            
            {(activeSection === 'news' || activeSection === 'faqs' || activeSection === 'careers') && (
              <CompanyResources 
                lang={lang} 
                activeSection={activeSection as any} 
                onNavigate={handleNavigate} 
              />
            )}
            
            {(activeSection === 'contact' || activeSection === 'quote') && (
              <ContactAndQuote 
                lang={lang} 
                onNavigate={handleNavigate} 
              />
            )}
            
            {(activeSection === 'privacy' || activeSection === 'terms' || activeSection === '404') && (
              <LegalAndMisc 
                lang={lang} 
                activeSection={activeSection as any} 
                onNavigate={handleNavigate} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Corporate Premium Footer */}
      <footer className="relative bg-brand-forest border-t border-brand-gray-light/30 pt-16 pb-12 text-slate-300 select-none overflow-hidden text-start">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-emerald/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
            {/* Brand details and Offices */}
            <div className="lg:col-span-5 space-y-6 text-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center overflow-hidden shadow-md rounded-xl bg-white/10 p-0.5">
                  <img 
                    src={companyLogo} 
                    alt="SES Logo" 
                    className="w-full h-full object-cover rounded-lg" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-start">
                  <span className="font-display font-black text-sm tracking-tight text-white block uppercase">
                    SEATRUCK NEXUSBRIDGE
                  </span>
                  <span className="text-[10px] tracking-wider text-[#C8A14A] font-bold block uppercase font-mono">
                    General Trading - FZCO
                  </span>
                </div>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed max-w-md font-medium">
                {t.footer_tag}
              </p>

              {/* Office Addresses in Order */}
              <div className="space-y-4 pt-2 border-t border-slate-800/60">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wider text-[#C8A14A]">
                    Dubai Headquarter
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-400 font-semibold">
                    <strong className="text-slate-350">SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO</strong><br />
                    Building A1, Dubai Digital Park<br />
                    Dubai Silicon Oasis<br />
                    Dubai, United Arab Emirates
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wider text-[#C8A14A]">
                    India Headquarter
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-400 font-semibold">
                    <strong className="text-slate-350">Seatruck Exim Services</strong><br />
                    Office No. E-712, Tower II, 7th Floor<br />
                    Plot No. R-11, Seawoods Grand Central<br />
                    Sector 40, Nerul, Darave, Thane, Maharashtra – 400706, India
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Sourcing links */}
            <div className="lg:col-span-3 space-y-4 text-start">
              <h4 className="font-display font-bold text-xs uppercase text-white tracking-widest font-mono">
                {lang === 'es' ? "Navegación Comercial" : lang === 'ar' ? "أدلة التجارة" : lang === 'hi' ? "व्यापार निर्देशिका" : lang === 'zh' ? "贸易目录" : "Trade Directories"}
              </h4>
              <ul className="space-y-2.5 text-xs font-semibold text-start">
                {[
                  { name: lang === 'es' ? "Grados de Commodities" : lang === 'ar' ? "دليل السلع" : lang === 'hi' ? "वस्तु निर्देशिका" : lang === 'zh' ? "商品目录" : "Commodity Directory", hash: 'products' },
                  { name: lang === 'es' ? "Logística y Contenedores" : lang === 'ar' ? "معدات الشحن الجاف والمبرد" : lang === 'hi' ? "रीफर और सूखी सामग्री" : lang === 'zh' ? "冷藏和干货设备" : "Reefer & Dry Equipment", hash: 'logistics' },
                  { name: lang === 'es' ? "Líneas de Molienda" : lang === 'ar' ? "الخدمات والمعالجة" : lang === 'hi' ? "सेवाएं और प्रसंस्करण" : lang === 'zh' ? "服务和加工" : "Services & Processing", hash: 'services' },
                  { name: lang === 'es' ? "Normas de Calidad" : lang === 'ar' ? "معايير الجودة (APEDA)" : lang === 'hi' ? "गुणवत्ता मानक (APEDA)" : lang === 'zh' ? "质量标准 (APEDA)" : "Quality Standards (APEDA)", hash: 'quality' },
                  { name: lang === 'es' ? "Solicitar Cotización" : lang === 'ar' ? "طلب مقترح تجاري" : lang === 'hi' ? "थोक प्रस्ताव का अनुरोध" : lang === 'zh' ? "请求大宗方案" : "Request Bulk Proposal", hash: 'quote' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${link.hash}`}
                      onClick={(e) => { e.preventDefault(); handleNavigate(link.hash); }}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Interactive column */}
            <div className="lg:col-span-4 space-y-4 text-start">
              <h4 className="font-display font-bold text-xs uppercase text-white tracking-widest font-mono">
                {lang === 'es' ? "Boletín Agrícola Semanal" : lang === 'ar' ? "معلومات سوق الزراعة" : lang === 'hi' ? "कृषि-व्यापार बाजार जानकारी" : lang === 'zh' ? "农业贸易市场情报" : "Agri-Trade Market Intel"}
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed font-semibold">
                {lang === 'es'
                  ? "Suscríbase para recibir informes técnicos de cosechas de origen, tarifas de fletes marítimos y regulaciones fitosanitarias mundiales."
                  : lang === 'ar'
                  ? "اشترك لتلقي توقعات إنتاج المزارع المباشرة، ومؤشرات شحن الحاويات المبردة، وتحديثات التخليص الجمركي."
                  : lang === 'hi'
                  ? "सीधे कृषि उत्पादन पूर्वानुमान, वैश्विक रीफर शिपिंग सूचकांक, और सीमा शुल्क निकासी अपडेट प्राप्त करने के लिए सदस्यता लें।"
                  : lang === 'zh'
                  ? "订阅以接收产地农作物产量预测、全球冷链航运指数以及海关清关指南。"
                  : "Subscribe to receive direct farm yield forecasts, global reefer shipping indexes, and FDA/EFSA port clearance updates."
                }
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="trade@yourfirm.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 bg-brand-navy border border-brand-gray-light/20 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-emerald transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 h-8 px-3 bg-brand-emerald hover:bg-brand-gold text-brand-forest rounded-lg flex items-center justify-center transition-all cursor-pointer font-bold"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <AnimatePresence>
                  {newsletterSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400"
                    >
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{lang === 'es' ? "Registro completado con éxito." : lang === 'ar' ? "تم التسجيل بنجاح في نشرة السوق." : lang === 'hi' ? "बाजार बुलेटिन के लिए सफलतापूर्वक पंजीकृत।" : lang === 'zh' ? "成功订阅市场简报。" : "Successfully registered for market bulletins."}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Bottom regulatory bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p className="text-center sm:text-start font-medium">
              {t.footer_text}
            </p>
            <div className="flex gap-4 font-mono uppercase tracking-wider text-[10px] font-bold">
              <a href="#privacy" onClick={(e) => { e.preventDefault(); handleNavigate('privacy'); }} className="hover:text-white transition-colors">Privacy</a>
              <span className="text-slate-800">•</span>
              <a href="#terms" onClick={(e) => { e.preventDefault(); handleNavigate('terms'); }} className="hover:text-white transition-colors">Terms of Carriage</a>
              <span className="text-slate-800">•</span>
              <a href="#faqs" onClick={(e) => { e.preventDefault(); handleNavigate('faqs'); }} className="hover:text-white transition-colors">FAQS</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Back to top scroll button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 bg-brand-emerald hover:bg-brand-gold p-3.5 rounded-full text-brand-forest hover:text-brand-navy shadow-xl cursor-pointer select-none border border-brand-emerald transition-all"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 font-extrabold" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
