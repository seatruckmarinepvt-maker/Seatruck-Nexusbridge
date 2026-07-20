/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { Globe, Menu, X, ChevronRight } from 'lucide-react';
import companyLogo from '../assets/images/regenerated_image_1784368012539.png';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string, params?: Record<string, string>) => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' }
];

export default function Navbar({ currentLang, onLanguageChange, activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightHeader = scrolled || activeSection === 'home';

  const menuItems = [
    { id: 'home', label: currentLang === 'es' ? 'Inicio' : currentLang === 'ar' ? 'الرئيسية' : currentLang === 'hi' ? 'मुख्य पृष्ठ' : currentLang === 'zh' ? '首页' : 'Home' },
    { id: 'about', label: currentLang === 'es' ? 'Nosotros' : currentLang === 'ar' ? 'من نحن' : currentLang === 'hi' ? 'हमारे बारे में' : currentLang === 'zh' ? '关于我们' : 'About Us' },
    { id: 'services', label: currentLang === 'es' ? 'Servicios' : currentLang === 'ar' ? 'خدماتنا' : currentLang === 'hi' ? 'सेवाएं' : currentLang === 'zh' ? '服务范围' : 'Services' },
    { id: 'products', label: currentLang === 'es' ? 'Productos' : currentLang === 'ar' ? 'المنتجات' : currentLang === 'hi' ? 'कृषि उत्पाद' : currentLang === 'zh' ? '农业产品' : 'Products' },
    { id: 'contact', label: currentLang === 'es' ? 'Contacto' : currentLang === 'ar' ? 'اتصل بنا' : currentLang === 'hi' ? 'संपर्क करें' : currentLang === 'zh' ? '联系我们' : 'Contact Us' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header 
      id="main-header"
      dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 select-none ${
        scrolled 
          ? 'py-3.5 bg-brand-warm-white/95 backdrop-blur-md border-b border-brand-emerald/30 shadow-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Brand with Forest & Emerald Theme */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => handleLinkClick('home')}
            id="nav-logo"
          >
            <div className="w-12 h-12 flex items-center justify-center shadow-sm group-hover:scale-[1.03] transition-transform duration-300 overflow-hidden rounded-xl bg-white">
              <img 
                src={companyLogo} 
                alt="SES Logo" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left">
              <span className={`font-display font-black text-sm tracking-tight leading-none block transition-colors ${
                isLightHeader ? 'text-brand-forest' : 'text-white'
              }`}>
                SEATRUCK
              </span>
              <span className={`text-[8px] tracking-[0.25em] font-extrabold uppercase leading-none block mt-1.5 transition-colors ${
                isLightHeader ? 'text-brand-emerald' : 'text-brand-gold'
              }`}>
                NEXUSBRIDGE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center border rounded-full p-1 backdrop-blur-md transition-all duration-300 ${
            scrolled 
              ? 'bg-slate-50 border-slate-200/60 shadow-inner' 
              : (activeSection === 'home' 
                  ? 'bg-brand-cream/70 border-brand-gray-light/40 shadow-xs' 
                  : 'bg-white/10 border-white/10')
          }`}>
            {menuItems.map((item) => {
              const isActive = activeSection === item.id || (item.id === 'products' && activeSection === 'product-details');
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-4.5 py-2.5 rounded-full text-[10px] font-bold tracking-wider transition-all uppercase duration-300 cursor-pointer relative ${
                    isActive 
                      ? (isLightHeader ? 'text-white font-extrabold' : 'text-slate-900 font-extrabold')
                      : (isLightHeader 
                          ? 'text-slate-600 hover:text-brand-forest font-semibold' 
                          : 'text-slate-200 hover:text-white font-semibold')
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span 
                      layoutId="activeTabUnderline" 
                      className={`absolute inset-0 shadow-sm rounded-full ${
                        isLightHeader 
                          ? 'bg-brand-forest' 
                          : 'bg-white'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Language Selector + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className={`px-3.5 py-2 border rounded-xl flex items-center gap-2 cursor-pointer transition-all text-xs font-bold shadow-sm ${
                  isLightHeader 
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' 
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/15'
                }`}
              >
                <Globe className="w-4 h-4 text-brand-emerald" />
                <span>{LANGUAGES.find(l => l.code === currentLang)?.flag}</span>
                <span>{LANGUAGES.find(l => l.code === currentLang)?.label}</span>
              </button>

              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-36 bg-white border border-slate-100 rounded-xl shadow-xl p-1 z-50 text-left"
                  >
                    {LANGUAGES.map((locale) => (
                      <button
                        key={locale.code}
                        onClick={() => {
                          onLanguageChange(locale.code);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                          currentLang === locale.code 
                            ? 'bg-brand-cream text-brand-forest' 
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-sm">{locale.flag}</span>
                        <span>{locale.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => handleLinkClick('contact')}
              className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-md bg-gold-gradient hover:bg-brand-gold text-white hover:scale-[1.02]"
            >
              {currentLang === 'es' ? 'Contacto' : currentLang === 'ar' ? 'اتصل بنا' : currentLang === 'hi' ? 'संपर्क करें' : currentLang === 'zh' ? '联系我们' : 'Get In Touch'}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                const currentIndex = LANGUAGES.findIndex(l => l.code === currentLang);
                const nextIndex = (currentIndex + 1) % LANGUAGES.length;
                onLanguageChange(LANGUAGES[nextIndex].code);
              }}
              className={`p-2 border rounded-xl cursor-pointer text-xs flex items-center gap-1.5 ${
                isLightHeader 
                  ? 'bg-white border-slate-200 text-slate-700' 
                  : 'bg-white/10 border-white/15 text-white'
              }`}
            >
              <span>{LANGUAGES.find(l => l.code === currentLang)?.flag}</span>
              <span className="font-bold uppercase text-[10px]">{currentLang}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 border rounded-xl cursor-pointer ${
                isLightHeader 
                  ? 'bg-white border-slate-200 text-slate-700' 
                  : 'bg-white/10 border-white/15 text-white'
              }`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-1.5 shadow-xl overflow-hidden text-left"
          >
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer block ${
                    isActive 
                      ? 'bg-brand-cream text-brand-forest border-l-4 border-brand-emerald' 
                      : 'text-slate-650 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
