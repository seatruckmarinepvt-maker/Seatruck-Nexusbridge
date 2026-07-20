/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Globe, 
  Briefcase, 
  CheckCircle, 
  ArrowRight, 
  TrendingUp, 
  Compass, 
  Award, 
  Users, 
  Scale, 
  Settings, 
  Layers,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { Language } from '../../types';

import homeBackgroundImg from '../../assets/images/home backgrounf.png';

interface HomeProps {
  lang: Language;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

// Custom Counter component for smooth loading
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (end === 0) return;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, Math.max(stepTime, 25));

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className="p-6 bg-white/60 backdrop-blur-md border border-slate-150/80 rounded-2xl shadow-sm text-center">
      <span className="block font-display font-extrabold text-3xl sm:text-4xl text-brand-forest">
        {count}{suffix}
      </span>
      <span className="block text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-1.5">
        {label}
      </span>
    </div>
  );
}

const LOCALIZED_CONTENT: Record<Language, Record<string, string>> = {
  en: {
    badge: "SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO",
    title1: "Connecting Markets.",
    title2: "Global Trade Excellence.",
    title3: "Dubai to the World.",
    desc: "SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO is a premier, international trading corporation headquartered at Dubai Silicon Oasis, UAE. Operating from the world's most dynamic global gateway, we specialize in high-grade agro commodities, industrial materials, and supply security for elite markets worldwide.",
    btn_quote: "Request a Proposal",
    btn_products: "Browse Products",
    counter_countries: "Global Destinations",
    counter_products: "Trading Sectors",
    counter_partners: "Corporate Partners",
    counter_clients: "Satisfied Buyers",
    h1_title: "Dubai Sourcing Hub",
    h1_desc: "Leveraging Dubai's strategic location to streamline trade corridors across six continents.",
    h2_title: "Global Procurement",
    h2_desc: "Direct integration at farming gates and mills to lock in premium quality and consistent volumes.",
    h3_title: "Secure Supply Chains",
    h3_desc: "Meticulous logistics coordination including packing, custom clearing, and prompt delivery.",
    h4_title: "Certified Excellence",
    h4_desc: "Rigorous laboratory analysis and pre-shipment certifications (SGS, APEDA) for total compliance.",
    sectors_badge: "TRADING & COMMODITIES SATELLITES",
    sectors_title: "Premium Import & Export Portfolios",
    sector_agri_title: "Grains & Agriculture",
    sector_agri_desc: "High-purity premium grains, export-grade wheat, pulses, and organic seeds managed under strict storage guidelines.",
    sector_food_title: "Spices & Nuts",
    sector_food_desc: "Selected cashews, almonds, and aromatic spices (turmeric, cardamom) processed for international distribution.",
    sector_ind_title: "Industrial Raw Materials",
    sector_ind_desc: "Bulk trade supply of premium minerals, specialty chemicals, and custom manufacturing raw ingredients.",
    sector_retail_title: "Private Label Goods",
    sector_retail_desc: "Flexible packaging, sorting, and customized boxing tailored for retail brand networks worldwide.",
    explore_btn: "Explore Sector",
    ops_badge: "ENTERPRISE CAPABILITIES",
    why_title: "Why Elite Firms Trust SEATRUCK NEXUSBRIDGE",
    why_desc: "International trading thrives on predictability, absolute quality compliance, and rigorous logistics transparency. Headquartered in Dubai, our group manages your bulk contracts with corporate precision, financial safety, and ethical responsibility.",
    ethical_title: "Global Ethical Business Standards",
    ethical_desc: "Securing equitable supply contracts directly with localized agricultural producers, processing units, and mining hubs.",
    cta_badge: "BULK COMMERCIAL CONTRACTS",
    cta_title: "Align with SEATRUCK NEXUSBRIDGE FZCO",
    cta_desc: "Coordinate bulk trade volumes, specific port compliance, private label packaging, and letters of credit directly with our commercial specialists in Dubai and Mumbai.",
    cta_btn_connect: "Initiate Consultation",
    cta_btn_services: "Discover Services"
  },
  es: {
    badge: "SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO",
    title1: "Conectando Mercados.",
    title2: "Excelencia de Comercio.",
    title3: "Desde Dubái al Mundo.",
    desc: "SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO es una corporación comercial líder con sede en el Dubai Silicon Oasis, EAU. Operando desde el centro de comercio más dinámico del mundo, nos especializamos en commodities agrícolas premium y logística global.",
    btn_quote: "Solicitar una Propuesta",
    btn_products: "Ver Catálogo",
    counter_countries: "Destinos Globales",
    counter_products: "Sectores de Comercio",
    counter_partners: "Socios Corporativos",
    counter_clients: "Compradores Satisfechos",
    h1_title: "Centro de Dubái",
    h1_desc: "Aprovechamos la ubicación estratégica de Dubái para agilizar los corredores comerciales internacionales.",
    h2_title: "Abastecimiento Directo",
    h2_desc: "Integración directa en campos y molinos para asegurar la máxima calidad y suministro constante.",
    h3_title: "Logística Confiable",
    h3_desc: "Sincronización logística perfecta desde el origen hasta el puerto de destino final.",
    h4_title: "Calidad Certificada",
    h4_desc: "Análisis rigurosos de laboratorio y certificaciones internacionales (SGS) para un cumplimiento total.",
    sectors_badge: "SECTORES DE TRADING",
    sectors_title: "Portafolios Premium de Importación y Exportación",
    sector_agri_title: "Granos y Agricultura",
    sector_agri_desc: "Granos premium, trigo de molienda y legumbres seleccionadas bajo estrictos controles fitosanitarios.",
    sector_food_title: "Especias y Frutos Secos",
    sector_food_desc: "Frutos secos premium y especias seleccionadas (cúrcuma, cardamomo) para distribución masiva.",
    sector_ind_title: "Materiales Industriales",
    sector_ind_desc: "Adquisición a granel de minerales crudos y compuestos químicos para fábricas globales.",
    sector_retail_title: "Marca Privada",
    sector_retail_desc: "Envasado personalizado y empaquetado optimizado para grandes cadenas de retail mundial.",
    explore_btn: "Explorar Sector",
    ops_badge: "CAPACIDADES EMPRESARIALES",
    why_title: "Por qué las Firmas Eligen a SEATRUCK NEXUSBRIDGE",
    why_desc: "El comercio internacional depende de la previsibilidad y la transparencia. Con sede en Dubái, nuestro grupo gestiona sus contratos bulk con máxima precisión corporativa y responsabilidad ética.",
    ethical_title: "Estándares Éticos Mundiales",
    ethical_desc: "Aseguramos contratos justos directamente con cooperativas agrícolas locales y centros de procesamiento.",
    cta_badge: "CONTRATOS BULK GLOBALES",
    cta_title: "Aliarse con SEATRUCK NEXUSBRIDGE FZCO",
    cta_desc: "Coordine volúmenes masivos, requisitos específicos de puerto, marcas privadas y cartas de crédito con nuestros expertos de Dubái y Mumbai.",
    cta_btn_connect: "Comenzar Consulta",
    cta_btn_services: "Ver Servicios"
  },
  ar: {
    badge: "سيتراك نكسس بريدج للتجارة العامة - ش.م.ح",
    title1: "ربط الأسواق.",
    title2: "التميز التجاري العالمي.",
    title3: "من دبي إلى العالم.",
    desc: "سيتراك نكسس بريدج للتجارة العامة (ش.م.ح) هي شركة تجارية عالمية رائدة يقع مقرها الرئيسي في واحة دبي للسيليكون، الإمارات العربية المتحدة. نحن متخصصون في السلع الزراعية والمواد الصناعية عالية الجودة.",
    btn_quote: "طلب اقتراح تجاري",
    btn_products: "تصفح المنتجات",
    counter_countries: "وجهات عالمية",
    counter_products: "قطاعات تجارية",
    counter_partners: "شركاء الشركات",
    counter_clients: "المشترين الراضين",
    h1_title: "مركز دبي التجاري",
    h1_desc: "الاستفادة من موقع دبي الاستراتيجي لتبسيط الممرات التجارية عبر القارات الست.",
    h2_title: "المشتريات المباشرة",
    h2_desc: "التكامل المباشر في المزارع والمطاحن لضمان أعلى درجات الجودة والكميات المستقرة.",
    h3_title: "سلسلة إمداد آمنة",
    h3_desc: "تنسيق لوجستي دقيق يشمل التعبئة والتغليف والتخليص الجمركي والشحن السريع.",
    h4_title: "شهادات جودة عالمية",
    h4_desc: "تحليل مخبري صارم ومطابقة المعايير الدولية (SGS) للامتثال الكامل.",
    sectors_badge: "القطاعات التجارية الرئيسية",
    sectors_title: "محافظ الاستيراد والتصدير المتميزة",
    sector_agri_title: "الحبوب والزراعة",
    sector_agri_desc: "الحبوب الفاخرة، والقمح المخصص للتصدير، والبقوليات المدارة بموجب إرشادات تخزين صارمة.",
    sector_food_title: "البهارات والمكسرات",
    sector_food_desc: "الكاجو واللوز والبهارات العطرية (الكركم، الهيل) الجاهزة للتوزيع الدولي.",
    sector_ind_title: "المواد الخام الصناعية",
    sector_ind_desc: "توريد السلع بالجملة من المعادن الفاخرة، والمواد الكيميائية المتخصصة لخطوط الإنتاج العالمية.",
    sector_retail_title: "التعبئة الخاصة للتجزئة",
    sector_retail_desc: "حلول تغليف مرنة وتعبئة مخصصة لتلبية متطلبات العلامات التجارية وشبكات التوزيع.",
    explore_btn: "استكشاف القطاع",
    ops_badge: "قدرات المؤسسة",
    why_title: "لماذا تثق الشركات الكبرى في سيتراك نكسس بريدج",
    why_desc: "تزدهر التجارة الدولية بالقدرة على التنبؤ والامتثال المطلق للجودة. تدير مجموعتنا عقودكم بدقة متناهية من مقرنا الرئيسي في دبي.",
    ethical_title: "معايير العمل الأخلاقي",
    ethical_desc: "تأمين عقود توريد عادلة مباشرة مع المنتجين الزراعيين المحليين ووحدات التجهيز والمناجم.",
    cta_badge: "عقود تجارية ضخمة",
    cta_title: "شراكة استراتيجية مع سيتراك نكسس بريدج FZCO",
    cta_desc: "تنسيق كميات الصادرات الكبيرة، متطلبات الامتثال للموانئ، والتغليف الخاص، والاعتمادات المستندية مع خبرائنا في دبي ومومباي.",
    cta_btn_connect: "ابدأ التواصل الآن",
    cta_btn_services: "اكتشف خدماتنا"
  },
  hi: {
    badge: "सीट्रक नेक्ससब्रिज जनरल ट्रेडिंग - FZCO",
    title1: "बाज़ारों को जोड़ना।",
    title2: "वैश्विक व्यापार उत्कृष्टता।",
    title3: "दुबई से विश्व स्तर पर।",
    desc: "सीट्रक नेक्ससब्रिज जनरल ट्रेडिंग - FZCO दुबई सिलिकॉन ओएसिस, यूएई में मुख्यालय वाली एक अग्रणी अंतर्राष्ट्रीय व्यापारिक संस्था है। दुबई के वैश्विक प्रवेश द्वार से परिचालन करते हुए, हम प्रीमियम कृषि वस्तुओं और औद्योगिक कच्चे माल की खरीद एवं रसद में विशेषज्ञ हैं।",
    btn_quote: "प्रस्ताव का अनुरोध करें",
    btn_products: "उत्पाद ब्राउज़ करें",
    counter_countries: "वैश्विक गंतव्य",
    counter_products: "व्यापार क्षेत्र",
    counter_partners: "कॉर्पोरेट भागीदार",
    counter_clients: "संतुष्ट खरीदार",
    h1_title: "दुबई सोर्सिंग हब",
    h1_desc: "छह महाद्वीपों में व्यापार गलियारों को सुव्यवस्थित करने के लिए दुबई के रणनीतिक स्थान का लाभ उठाना।",
    h2_title: "वैश्विक खरीद",
    h2_desc: "प्रीमियम गुणवत्ता और निरंतर मात्रा सुनिश्चित करने के लिए खेतों और मिलों से सीधा जुड़ाव।",
    h3_title: "सुरक्षित आपूर्ति श्रृंखला",
    h3_desc: "पैकिंग, सीमा शुल्क निकासी और त्वरित वितरण सहित सूक्ष्म रसद समन्वय।",
    h4_title: "प्रमाणित उत्कृष्टता",
    h4_desc: "पूर्ण अनुपालन के लिए सख्त प्रयोगशाला विश्लेषण और पूर्व-शिपमेंट प्रमाणपत्र (SGS)।",
    sectors_badge: "व्यापार एवं कमोडिटी क्षेत्र",
    sectors_title: "प्रीमियम आयात और निर्यात पोर्टफोलियो",
    sector_agri_title: "अनाज और कृषि",
    sector_agri_desc: "सख्त भंडारण दिशानिर्देशों के तहत प्रबंधित उच्च शुद्धता वाले अनाज, निर्यात-ग्रेड गेहूं और दालें।",
    sector_food_title: "मसाले और नट्स",
    sector_food_desc: "प्रीमियम काजू, बादाम और सुगंधित मसाले (हल्दी, इलायची) जो अंतरराष्ट्रीय वितरण के लिए तैयार हैं।",
    sector_ind_title: "औद्योगिक कच्चा माल",
    sector_ind_desc: "वैश्विक विनिर्माण के लिए कच्चे खनिजों, औद्योगिक रसायनों और कच्चे अवयवों की थोक आपूर्ति।",
    sector_retail_title: "निजी लेबल सामान",
    sector_retail_desc: "दुनिया भर में खुदरा वितरण नेटवर्क के अनुकूल लचीली पैकेजिंग और कस्टम लेबलिंग समाधान।",
    explore_btn: "क्षेत्र का अन्वेषण करें",
    ops_badge: "कॉर्पोरेट क्षमताएं",
    why_title: "प्रमुख फर्में सीट्रक नेक्ससब्रिज पर क्यों भरोसा करती हैं",
    why_desc: "अंतर्राष्ट्रीय व्यापार पूर्वानुमान, गुणवत्ता और पारदर्शिता पर निर्भर करता है। दुबई में मुख्यालय होने के कारण, हमारा समूह कॉर्पोरेट सटीकता और वित्तीय सुरक्षा के साथ थोक अनुबंधों का प्रबंधन करता.है।",
    ethical_title: "वैश्विक नैतिक मानक",
    ethical_desc: "स्थानीय उत्पादकों, मिलों और खनन केंद्रों के साथ सीधे निष्पक्ष और दीर्घकालिक अनुबंध सुरक्षित करना।",
    cta_badge: "थोक व्यावसायिक अनुबंध",
    cta_title: "सीट्रक नेक्ससब्रिज FZCO के साथ जुड़ें",
    cta_desc: "थोक मात्रा, गंतव्य बंदरगाह आवश्यकताओं, निजी ब्रांड लेबलिंग और साख पत्रों (LC) का सीधे दुबई और मुंबई के विशेषज्ञों के साथ समन्वय करें।",
    cta_btn_connect: "परामर्श शुरू करें",
    cta_btn_services: "सेवाएं देखें"
  },
  zh: {
    badge: "SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO",
    title1: "连接全球商路。",
    title2: "卓越国际贸易。",
    title3: "迪拜辐射全球。",
    desc: "SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO 是一家总部位于阿联酋迪拜硅谷（Dubai Silicon Oasis）的顶级国际贸易集团。立足于全球最具活力的自由贸易区与核心港口，我们专注于高档农产品、工业原料及跨境物流多式联运走廊建设。",
    btn_quote: "请求大宗提案",
    btn_products: "浏览商品目录",
    counter_countries: "全球覆盖目的地",
    counter_products: "核心贸易板块",
    counter_partners: "集团战略伙伴",
    counter_clients: "全球满意买家",
    h1_title: "迪拜超级枢纽",
    h1_desc: "依托迪拜无与伦比的区位与海空联运通道，极大压缩全球各供应链路中转周期。",
    h2_title: "源头全球采购",
    h2_desc: "深度整合主产国农业产区、粮食磨坊与矿产坑口，锁定第一手价格与高等级货源。",
    h3_title: "跨境多重保障",
    h3_desc: "严格把控散货拼箱、跨境联运、FDA/EFSA口岸清关及目的港门到门履约细节。",
    h4_title: "高标准官方认证",
    h4_desc: "所有大宗商品均经由 SGS 或第三方国际权威机构分析测试，确保单证无暇、货证相符。",
    sectors_badge: "大宗贸易板块",
    sectors_title: "进口与出口一站式优选组合",
    sector_agri_title: "粮食与主要农作物",
    sector_agri_desc: "高纯度谷物、优质出口面粉、红豆、鹰嘴豆等，仓储符合国际恒温、气调及防潮规范。",
    sector_food_title: "高端坚果与香料",
    sector_food_desc: "出口级手剥腰果、精选大杏仁、姜黄、绿蔻等，采用食品级高密度抽真空防潮包装。",
    sector_ind_title: "工业原料与矿砂",
    sector_ind_desc: "大宗高炉矿产、精细化工原材料、定制冶炼添加剂与基础化工配料，服务大型制造链。",
    sector_retail_title: "品牌商代工定制",
    sector_retail_desc: "提供一站式贴牌定重、条码打印、国际认证标识包装与分拣，适配全球主流零售网络。",
    explore_btn: "了解该板块",
    ops_badge: "跨国交付能力",
    why_title: "为何全球跨国集团首选 SEATRUCK NEXUSBRIDGE",
    why_desc: "大宗进出口的核心壁垒是合规性、流动性与仓配确定性。我们基于迪拜总部强有力的财税、法合体系，为所有大宗跨境买卖提供全流程、低风险的卓越体验。",
    ethical_title: "全球农业与矿业道德标准",
    ethical_desc: "坚持源头直接签约，尊重种植者公平收益，倡导绿色低碳多式联运与可持续履约链条。",
    cta_badge: "大宗商业合同洽谈",
    cta_title: "与 SEATRUCK NEXUSBRIDGE FZCO 开启合作",
    cta_desc: "如需对接大宗长协采购、特定港口检疫申报、自主品牌加工或信用证（L/C）结算，请直接联系我们的迪拜总部或南亚中心专家。",
    cta_btn_connect: "启动大宗询盘",
    cta_btn_services: "了解多式联运"
  }
};

export default function Home({ lang, onNavigate }: HomeProps) {
  const t = LOCALIZED_CONTENT[lang] || LOCALIZED_CONTENT.en;
  const isRtl = lang === 'ar';

  return (
    <div id="home-root" className="bg-brand-warm-white text-slate-900 overflow-hidden font-sans">
      
      {/* ================= HERO SECTION (LARGE SPLIT HERO) ================= */}
      <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 text-brand-forest overflow-hidden bg-brand-warm-white">
        {/* Background Image filling the entire section with golden sand overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={homeBackgroundImg} 
            alt="Seatruck Sourcing and Logistics Background" 
            className="w-full h-full object-cover opacity-55 mix-blend-multiply"
            style={{ paddingBottom: '0px' }}
            referrerPolicy="no-referrer"
          />
          {/* Dubai premium golden sand overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-warm-white/80 via-brand-warm-white/20 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-warm-white/90 pointer-events-none"></div>
        </div>

        <div 
          className="max-w-7xl mx-auto px-6 sm:px-8 w-full z-10 relative flex justify-center text-center"
          style={{
            paddingLeft: '31px',
            paddingRight: '33px',
            paddingTop: '0px',
            paddingBottom: '120px',
            width: '100%',
            maxWidth: '1280px'
          }}
        >
          <div className="max-w-3xl mx-auto text-center space-y-6 flex flex-col items-center">

            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-display text-brand-forest"
            >
              {t.title1} <br />
              <span className="text-brand-emerald" style={{ color: '#C8A14A' }}>
                {t.title2}
              </span> <br />
              <span className="text-brand-gold" style={{ color: '#D4AF37' }}>{t.title3}</span>
            </h1>

            <p className="text-brand-forest/80 text-sm sm:text-base leading-relaxed max-w-2xl font-semibold">
              {t.desc}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-gold-gradient hover:bg-brand-gold text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl cursor-pointer shadow-md transition-all border border-brand-emerald hover:scale-[1.02] shadow-brand-emerald/20"
              >
                {t.btn_quote}
              </button>
              <button 
                onClick={() => onNavigate('products')}
                className="bg-white/10 hover:bg-white/20 text-brand-forest font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl cursor-pointer transition-all hover:scale-[1.02] border border-brand-gray-light/40 backdrop-blur-sm"
              >
                {t.btn_products}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPANY HIGHLIGHTS ================= */}
      <section className="py-20 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Globe,
                title: t.h1_title,
                desc: t.h1_desc
              },
              {
                icon: Compass,
                title: t.h2_title,
                desc: t.h2_desc
              },
              {
                icon: Layers,
                title: t.h3_title,
                desc: t.h3_desc
              },
              {
                icon: ShieldCheck,
                title: t.h4_title,
                desc: t.h4_desc
              }
            ].map((highlight, idx) => {
              const Icon = highlight.icon;
              return (
                <div key={idx} className="p-6 bg-brand-cream/40 border border-slate-150 rounded-2xl text-start space-y-3 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-brand-forest/5 flex items-center justify-center text-brand-forest">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold text-brand-forest font-mono uppercase tracking-wider">{highlight.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{highlight.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Animated Counters Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-16 mt-16 border-t border-slate-100">
            <AnimatedCounter value="60+" label={t.counter_countries} />
            <AnimatedCounter value="40+" label={t.counter_products} />
            <AnimatedCounter value="200+" label={t.counter_partners} />
            <AnimatedCounter value="500+" label={t.counter_clients} />
          </div>

        </div>
      </section>

      {/* ================= INDUSTRY SOLUTIONS ================= */}
      <section className="py-24 bg-brand-cream/30 border-b border-slate-150">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold font-mono text-brand-emerald uppercase tracking-widest block mb-2">
              {t.sectors_badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              {t.sectors_title}
            </h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: t.sector_agri_title,
                desc: t.sector_agri_desc,
                image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80"
              },
              {
                title: t.sector_food_title,
                desc: t.sector_food_desc,
                image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80"
              },
              {
                title: t.sector_ind_title,
                desc: t.sector_ind_desc,
                image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=500&q=80"
              },
              {
                title: t.sector_retail_title,
                desc: t.sector_retail_desc,
                image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80"
              }
            ].map((sol, idx) => (
              <div 
                key={idx} 
                className="group bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-xs hover:border-brand-emerald/40 hover:shadow-md transition-all duration-300 text-start flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={sol.image} 
                      alt={sol.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-base font-bold text-brand-forest">{sol.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{sol.desc}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button 
                    onClick={() => onNavigate('products')}
                    className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-brand-emerald hover:text-brand-forest uppercase tracking-wider group/btn cursor-pointer"
                  >
                    <span>{t.explore_btn}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 text-start space-y-5">
              <span className="text-[10px] font-bold font-mono text-brand-emerald uppercase tracking-widest block">
                {t.ops_badge}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                {t.why_title}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                {t.why_desc}
              </p>
              
              <div className="p-5.5 bg-brand-cream border border-slate-150 rounded-2xl">
                <div className="flex items-start gap-3.5 text-start">
                  <HeartHandshake className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-forest uppercase font-mono tracking-wider">
                      {t.ethical_title}
                    </h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed mt-1">
                      {t.ethical_desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Features Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Globe,
                  title: lang === 'es' ? "Red Internacional" : lang === 'ar' ? "شبكة دولية" : lang === 'hi' ? "अंतरराष्ट्रीय नेटवर्क" : lang === 'zh' ? "国际网络" : "International Network",
                  desc: lang === 'es' ? "Acceso directo a cadenas de suministro certificadas en múltiples continentes." : lang === 'ar' ? "اتصالات قوية بخطوط الشحن الكبرى والموانئ ومراكز التصدير والاستيراد." : lang === 'hi' ? "प्रमुख शिपिंग लाइनों, कोल्ड-स्टोरेज पोर्ट्स और व्यापार हब से मजबूत संपर्क।" : lang === 'zh' ? "与主要航运公司、冷链港口和进出口枢纽的稳固连接。" : "Robust connections to major shipping lines, cold-storage ports, and trade hubs."
                },
                {
                  icon: Scale,
                  title: lang === 'es' ? "Precios Competitivos" : lang === 'ar' ? "أسعار تنافسية" : lang === 'hi' ? "प्रतिस्पर्धी मूल्य निर्धारण" : lang === 'zh' ? "竞争性定价" : "Competitive Pricing",
                  desc: lang === 'es' ? "Estructuras comerciales optimizadas que reducen costos de intermediación." : lang === 'ar' ? "مؤشرات تسعير شفافة مرتبطة مباشرة بالمعايير العالمية للسلع." : lang === 'hi' ? "वैश्विक वस्तु बेंचमार्क से जुड़े पारदर्शी मूल्य सूचकांक।" : lang === 'zh' ? "直接对应全球商品基准的透明定价指数。" : "Transparent pricing indexes directly mapped to global commodity benchmarks."
                },
                {
                  icon: ShieldCheck,
                  title: lang === 'es' ? "Garantía de Calidad" : lang === 'ar' ? "ضمان الجودة" : lang === 'hi' ? "गुणवत्ता आश्वासन" : lang === 'zh' ? "质量保证" : "Quality Assurance",
                  desc: lang === 'es' ? "Inspecciones de laboratorio previas al embarque realizadas por terceros acreditados." : lang === 'ar' ? "فحوصات صحية نباتية متعددة المستويات ومطابقة متبقيات المبيدات." : lang === 'hi' ? "बहु-स्तरीय पादप स्वच्छता निरीक्षण और कीटनाशक अवशेष मिलान।" : lang === 'zh' ? "多级植物检疫检验和农药残留匹配。" : "Multi-tiered phytosanitary inspections and pesticide residuary matching."
                },
                {
                  icon: Compass,
                  title: lang === 'es' ? "Logística Confiable" : lang === 'ar' ? "خدمات لوجستية موثوقة" : lang === 'hi' ? "विश्वसनीय रसद" : lang === 'zh' ? "可靠物流" : "Reliable Logistics",
                  desc: lang === 'es' ? "Embalajes seguros de grado alimenticio y tiempos de tránsito eficientes." : lang === 'ar' ? "تخصيص ناقلات مهنية، وحجز مساحات السفن، والامتثال الجمركي." : lang === 'hi' ? "पेशेवर वाहक आवंटन, पोत स्थान आरक्षण, और कस्टम अनुपालन।" : lang === 'zh' ? "专业的承运商分配、舱位预订和海关合规。" : "Professional carrier allocation, vessel space reservation, and custom compliance."
                },
                {
                  icon: Users,
                  title: lang === 'es' ? "Soporte Dedicado" : lang === 'ar' ? "دعم مخصص" : lang === 'hi' ? "समर्पित समर्थन" : lang === 'zh' ? "专属支持" : "Dedicated Support",
                  desc: lang === 'es' ? "Un ejecutivo comercial bilingüe asignado a su cuenta para actualizaciones constantes." : lang === 'ar' ? "مسؤول مكتب تجاري مخصص يقدم تحديثات مستمرة لخط سير العمليات." : lang === 'hi' ? "लगातार परिचालन समयसीमा अपडेट प्रदान करने वाला आपका अपना नामित ट्रेडिंग डेस्क अधिकारी।" : lang === 'zh' ? "您专属的交易专员，提供持续的运营进度更新。" : "Your own designated trading desk officer providing constant operational timeline updates."
                },
                {
                  icon: Settings,
                  title: lang === 'es' ? "Empaque a Medida" : lang === 'ar' ? "تعبئة مرنة" : lang === 'hi' ? "लचीली पैकेजिंग" : lang === 'zh' ? "灵活包装" : "Flexible Packing",
                  desc: lang === 'es' ? "Opciones de marcado personalizado y pesos adaptados a sus requerimientos." : lang === 'ar' ? "تكوينات تعبئة وتغليف مخصصة في أكياس PP، أو الخيش، أو المحكم الإغلاق لتناسب احتياجات السوق." : lang === 'hi' ? "बाजार की जरूरतों के अनुकूल पीपी, जूट, या वैक्यूम-सील्ड पैकेजिंग कॉन्फ़िगरेशन।" : lang === 'zh' ? "量身定制的聚丙烯（PP）、麻袋或真空密封包装配置，以适应市场需求。" : "Tailored PP, jute, or vacuum-sealed packaging configurations to suit market needs."
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-5.5 bg-brand-cream/30 border border-slate-150 rounded-2xl text-start space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-forest/5 flex items-center justify-center text-brand-emerald">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-24 bg-gradient-to-tr from-brand-navy to-brand-forest text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            <span>{t.cta_badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            {t.cta_title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {t.cta_desc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-brand-emerald hover:bg-brand-emerald/90 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl transition-all cursor-pointer hover:scale-[1.02]"
            >
              {t.cta_btn_connect}
            </button>
            <button 
              onClick={() => onNavigate('services')}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl transition-all cursor-pointer"
            >
              {t.cta_btn_services}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
