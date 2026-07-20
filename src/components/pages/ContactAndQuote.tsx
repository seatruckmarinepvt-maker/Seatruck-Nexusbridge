/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Mail, 
  PhoneCall, 
  MapPin, 
  Compass, 
  Globe 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../../types';
import contactHero from '../../assets/images/seatruck_container_vessel_1784192631098.jpg';

interface ContactAndQuoteProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const LOCAL_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    hero_badge: "CONTACT US",
    hero_title: "Contact Us",
    breadcrumb_home: "Home",
    intro_title: "Let's Connect",
    intro_desc: "Whether you have product inquiries, sourcing requirements, or partnership proposals, our team at SEATRUCK NEXUSBRIDGE is ready to assist you. Operating from our Global Headquarters in Dubai, we provide premium, professional, and reliable trading solutions across international markets.",
    card_email_title: "Email Support",
    card_email_sub: "General & Trading Enquiries",
    card_phone_title: "Global Helplines",
    card_phone_india: "South Asia Operation Desk",
    card_phone_dubai: "Global Head Office (Dubai)",
    card_hq_title: "Dubai Headquarter",
    desks_badge: "REGISTERED CORPORATE DESKS",
    desks_title: "Corporate Office Locations",
    desks_subtitle: "Supporting global sourcing, premium logistics coordination, and direct trade partnerships from Dubai to the world.",
    desk1_title: "Dubai Headquarter",
    desk1_sub: "Dubai FZCO (Primary)",
    desk2_title: "India Headquarter",
    desk2_sub: "Navi Mumbai Office",
    company_india: "Seatruck Exim Services",
    company_uae: "Seatruck Nexusbridge General Trading - FZCO",
  },
  es: {
    hero_badge: "CONTÁCTENOS",
    hero_title: "Contacto",
    breadcrumb_home: "Inicio",
    intro_title: "Conéctese con Nosotros",
    intro_desc: "Ya sea que tenga consultas sobre productos, requisitos de abastecimiento o propuestas de asociación, nuestro equipo en SEATRUCK NEXUSBRIDGE está listo para ayudarlo. Operando desde nuestra sede global en Dubái, ofrecemos soluciones comerciales confiables y de alta calidad.",
    card_email_title: "Soporte de Correo",
    card_email_sub: "Consultas Comerciales Generales",
    card_phone_title: "Teléfonos de Contacto",
    card_phone_india: "Oficina de Asia del Sur",
    card_phone_dubai: "Sede Global (Dubái)",
    card_hq_title: "Oficina de Dubái (Sede)",
    desks_badge: "OFICINAS CORPORATIVAS REGISTRADAS",
    desks_title: "Ubicaciones de Oficinas",
    desks_subtitle: "Apoyando el abastecimiento internacional, la coordinación logística y las asociaciones comerciales globales.",
    desk1_title: "Sede de Dubái",
    desk1_sub: "Dubái FZCO (Principal)",
    desk2_title: "Sede de India",
    desk2_sub: "Oficina de Navi Mumbai",
    company_india: "Seatruck Exim Services",
    company_uae: "Seatruck Nexusbridge General Trading - FZCO",
  },
  ar: {
    hero_badge: "اتصل بنا",
    hero_title: "اتصل بنا",
    breadcrumb_home: "الرئيسية",
    intro_title: "فلنتواصل معاً",
    intro_desc: "سواء كان لديك استفسارات عن المنتجات، أو متطلبات التوريد، أو مقترحات الشراكة، فإن فريقنا في سيتراك نكسس بريدج جاهز لمساعدتكم من مقرنا العالمي في دبي.",
    card_email_title: "البريد الإلكتروني",
    card_email_sub: "الاستفسارات التجارية العامة",
    card_phone_title: "أرقام الهاتف",
    card_phone_india: "مكتب جنوب آسيا",
    card_phone_dubai: "المقر العالمي (دبي)",
    card_hq_title: "مقر دبي الرئيسي",
    desks_badge: "مكاتب الشركات المسجلة",
    desks_title: "موقع مكاتب الشركة",
    desks_subtitle: "دعم التوريد الدولي، والتنسيق اللوجستي، وشراكات التجارة العالمية من دبي إلى العالم.",
    desk1_title: "مقر دبي الرئيسي",
    desk1_sub: "دبي ش.م.ح (الأساسي)",
    desk2_title: "المقر الرئيسي للهند",
    desk2_sub: "مكتب نافي مومباي",
    company_india: "Seatruck Exim Services",
    company_uae: "Seatruck Nexusbridge General Trading - FZCO",
  },
  hi: {
    hero_badge: "संपर्क करें",
    hero_title: "संपर्क करें",
    breadcrumb_home: "मुख्य पृष्ठ",
    intro_title: "आइए जुड़ें",
    intro_desc: "चाहे आपके पास उत्पाद पूछताछ, सोर्सिंग आवश्यकताएं, या व्यापार साझेदारी के प्रस्ताव हों, सीट्रक नेक्ससब्रिज की हमारी टीम आपकी सेवा के लिए उपलब्ध है।",
    card_email_title: "ईमेल सपोर्ट",
    card_email_sub: "सामान्य व्यावसायिक पूछताछ",
    card_phone_title: "वैश्विक हेल्पलाइन",
    card_phone_india: "दक्षिण एशिया परिचालन डेस्क",
    card_phone_dubai: "वैश्विक मुख्यालय (दुबई)",
    card_hq_title: "दुबई मुख्यालय",
    desks_badge: "पंजीकृत कॉर्पोरेट डेस्क",
    desks_title: "कॉर्पोरेट कार्यालय स्थान",
    desks_subtitle: "दुबई से विश्व स्तर पर आपूर्ति श्रृंखला और अंतर्राष्ट्रीय व्यापार भागीदारी का समर्थन।",
    desk1_title: "दुबई मुख्यालय",
    desk1_sub: "दुबई FZCO (मुख्य)",
    desk2_title: "भारत मुख्यालय",
    desk2_sub: "नवी मुंबई कार्यालय",
    company_india: "Seatruck Exim Services",
    company_uae: "Seatruck Nexusbridge General Trading - FZCO",
  },
  zh: {
    hero_badge: "联系我们",
    hero_title: "联系我们",
    breadcrumb_home: "首页",
    intro_title: "与我们联络",
    intro_desc: "无论您有大宗采购、定制贸易，还是战略合作的建议，SEATRUCK NEXUSBRIDGE 迪拜全球总部团队将全程为您提供高标准、专业化的贸易解决方案。",
    card_email_title: "官方邮箱",
    card_email_sub: "一般业务与贸易咨询",
    card_phone_title: "全球热线",
    card_phone_india: "南亚地区业务办公室",
    card_phone_dubai: "全球总部（迪拜）",
    card_hq_title: "迪拜总部",
    desks_badge: "官方注册公司机构",
    desks_title: "集团全球办事处分布",
    desks_subtitle: "自阿联酋迪拜辐射全球，提供一站式海运、单证、冷链与多式联运走廊支撑。",
    desk1_title: "迪拜总部",
    desk1_sub: "迪拜 FZCO（主要办事处）",
    desk2_title: "印度总部",
    desk2_sub: "新孟买办公室",
    company_india: "Seatruck Exim Services",
    company_uae: "Seatruck Nexusbridge General Trading - FZCO",
  }
};

export default function ContactAndQuote({ lang, onNavigate }: ContactAndQuoteProps) {
  const t = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];
  const isRtl = lang === 'ar';

  return (
    <div 
      id="about-root" 
      className="bg-brand-warm-white text-brand-charcoal min-h-screen text-left font-sans pb-16" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      
      {/* ================= HERO BANNER ================= */}
      <section 
        className="relative w-full h-[380px] md:h-[420px] overflow-hidden flex items-center justify-center select-none"
        style={{
          backgroundImage: `url(${contactHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Dark 55% overlay */}
        <div className="absolute inset-0 bg-brand-navy/55 z-0" />

        {/* Centered Hero Content */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-6 mt-16">
          
          {/* Large Heading */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-white"
          >
            {t.hero_title}
          </motion.h1>

          {/* Breadcrumbs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-300"
          >
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-brand-emerald transition-colors cursor-pointer uppercase font-bold"
            >
              {t.breadcrumb_home}
            </button>
            <span className="text-brand-emerald font-extrabold font-mono">&gt;</span>
            <span className="text-white uppercase font-bold">{t.hero_title}</span>
          </motion.div>

        </div>
      </section>

      {/* ================= INTRODUCTION SECTION ================= */}
      <section className="py-20 bg-brand-warm-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6">
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight font-display">
            {t.intro_title}
          </h2>

          {/* Gold Underline */}
          <div className="w-16 h-1 bg-brand-emerald mx-auto rounded-full" />

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            {t.intro_desc}
          </p>

        </div>
      </section>

      {/* ================= CONTACT INFORMATION CARDS ================= */}
      <section className="pb-20 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Email */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-brand-cream border border-brand-gray-light/60 rounded-[18px] p-8 shadow-md shadow-brand-emerald/5 flex flex-col items-center text-center space-y-6 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Circular Green Icon */}
              <div className="w-16 h-16 rounded-full bg-brand-forest/5 text-brand-emerald flex items-center justify-center shadow-sm shadow-brand-emerald/10 group-hover:bg-brand-emerald group-hover:text-white transition-all duration-300">
                <Mail className="w-7 h-7 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-brand-forest tracking-tight font-display">
                  {t.card_email_title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  {t.card_email_sub}
                </p>
              </div>

              <a 
                href="mailto:info@seatruckexim.com" 
                className="text-base font-bold text-brand-forest hover:text-brand-emerald transition-colors break-all font-sans"
              >
                info@seatruckexim.com
              </a>
            </motion.div>

            {/* Card 2: Phone Numbers */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-brand-cream border border-brand-gray-light/60 rounded-[18px] p-8 shadow-md shadow-brand-emerald/5 flex flex-col items-center text-center space-y-6 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Circular Green Icon */}
              <div className="w-16 h-16 rounded-full bg-brand-forest/5 text-brand-emerald flex items-center justify-center shadow-sm shadow-brand-emerald/10 group-hover:bg-brand-emerald group-hover:text-white transition-all duration-300">
                <PhoneCall className="w-7 h-7 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-brand-forest tracking-tight font-display">
                  {t.card_phone_title}
                </h3>
              </div>

              <div className="space-y-4 font-semibold text-xs text-slate-700 w-full">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-0.5 flex items-center justify-center gap-1.5">
                    <span className="text-sm">🇦🇪</span> {t.card_phone_dubai}
                  </span>
                  <a href="tel:+971509199209" className="text-sm font-bold text-brand-forest hover:text-brand-emerald transition-colors font-sans">
                    +971 50 919 9209
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-0.5 flex items-center justify-center gap-1.5">
                    <span className="text-sm">🇮🇳</span> {t.card_phone_india}
                  </span>
                  <a href="tel:+919167604059" className="text-sm font-bold text-brand-forest hover:text-brand-emerald transition-colors font-sans">
                    +91 91676 04059
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Corporate Headquarters Address (Dubai) */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-brand-cream border border-brand-gray-light/60 rounded-[18px] p-8 shadow-md shadow-brand-emerald/5 flex flex-col items-center text-center space-y-6 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Circular Green Icon */}
              <div className="w-16 h-16 rounded-full bg-brand-forest/5 text-brand-emerald flex items-center justify-center shadow-sm shadow-brand-emerald/10 group-hover:bg-brand-emerald group-hover:text-white transition-all duration-300">
                <MapPin className="w-7 h-7 stroke-[1.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-brand-forest tracking-tight font-display">
                  {t.card_hq_title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-semibold font-sans">
                Building A1<br />
                Dubai Digital Park<br />
                Dubai Silicon Oasis<br />
                Dubai, United Arab Emirates
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE MAP ================= */}
      <section className="pb-24 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-[18px] overflow-hidden border border-brand-gray-light/60 shadow-md shadow-brand-emerald/5 h-[450px]"
          >
            <iframe
              src="https://maps.google.com/maps?q=Building%20A1,%20Dubai%20Digital%20Park,%20Dubai%20Silicon%20Oasis,%20Dubai,%20United%20Arab%20Emirates&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dubai Global Headquarters Corporate Location Map"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= REGISTERED CORPORATE DESKS ================= */}
      <section className="py-20 bg-brand-warm-white border-t border-brand-gray-light/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          
          {/* Centered Heading */}
          <div className="text-center space-y-4">
            <span className="text-[10px] font-bold font-mono text-brand-emerald uppercase tracking-widest block">
              {t.desks_badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-forest tracking-tight font-display">
              {t.desks_title}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-medium">
              {t.desks_subtitle}
            </p>
          </div>

          {/* Dual Desktop Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card 1: UAE HQ */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-brand-cream border border-brand-gray-light/60 rounded-[18px] p-8 shadow-md shadow-brand-emerald/5 flex flex-col justify-between h-full space-y-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-6">
                
                {/* Header Flag + Title */}
                <div className="flex items-center gap-4 pb-4 border-b border-brand-gray-light/40">
                  <div className="w-11 h-8 rounded overflow-hidden shadow-sm border border-brand-gray-light/40 flex-shrink-0 bg-slate-100">
                    <img src="https://flagcdn.com/ae.svg" alt="UAE Flag" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-brand-forest tracking-tight font-display">
                      {t.desk1_title}
                    </h3>
                    <p className="text-xs text-brand-emerald font-mono font-bold uppercase tracking-wider">
                      {t.desk1_sub}
                    </p>
                  </div>
                </div>

                {/* Company and Address */}
                <div className="space-y-3 font-sans">
                  <h4 className="text-sm font-bold text-slate-800">{t.company_uae}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    Building A1<br />
                    Dubai Digital Park<br />
                    Dubai Silicon Oasis<br />
                    Dubai, United Arab Emirates
                  </p>
                </div>

              </div>

              {/* Footer Phone and Email */}
              <div className="pt-4 border-t border-brand-gray-light/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] font-bold text-slate-700">
                <a href="tel:+971509199209" className="flex items-center gap-1.5 hover:text-brand-emerald transition-colors">
                  <span>📞</span> +971 50 919 9209
                </a>
                <a href="mailto:info@seatruckexim.com" className="flex items-center gap-1.5 hover:text-brand-emerald transition-colors">
                  <span>✉</span> info@seatruckexim.com
                </a>
              </div>
            </motion.div>

            {/* Card 2: India HQ */}
            <motion.div 
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-brand-cream border border-brand-gray-light/60 rounded-[18px] p-8 shadow-md shadow-brand-emerald/5 flex flex-col justify-between h-full space-y-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-6">
                
                {/* Header Flag + Title */}
                <div className="flex items-center gap-4 pb-4 border-b border-brand-gray-light/40">
                  <div className="w-11 h-8 rounded overflow-hidden shadow-sm border border-brand-gray-light/40 flex-shrink-0 bg-slate-100">
                    <img src="https://flagcdn.com/in.svg" alt="India Flag" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-brand-forest tracking-tight font-display">
                      {t.desk2_title}
                    </h3>
                    <p className="text-xs text-brand-emerald font-mono font-bold uppercase tracking-wider">
                      {t.desk2_sub}
                    </p>
                  </div>
                </div>

                {/* Company and Address */}
                <div className="space-y-3 font-sans">
                  <h4 className="text-sm font-bold text-slate-800">{t.company_india}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    Office No. E-712, Tower – II,<br />
                    Floor No. 7th, Plot No. R‑11,<br />
                    Seawoods Grand Central, Sector‑40,<br />
                    Nerul, Darave, Thane,<br />
                    Maharashtra, India – 400706.
                  </p>
                </div>

              </div>

              {/* Footer Phone and Email */}
              <div className="pt-4 border-t border-brand-gray-light/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] font-bold text-slate-700">
                <a href="tel:+919167604059" className="flex items-center gap-1.5 hover:text-brand-emerald transition-colors">
                  <span>📞</span> +91 91676 04059
                </a>
                <a href="mailto:info@seatruckexim.com" className="flex items-center gap-1.5 hover:text-brand-emerald transition-colors">
                  <span>✉</span> info@seatruckexim.com
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}

