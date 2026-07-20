/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Globe, 
  Ship, 
  FileText, 
  Layers, 
  Users, 
  Settings, 
  Compass, 
  ShieldCheck, 
  Box, 
  ArrowRight
} from 'lucide-react';
import { Language } from '../../types';
import servicesHero from '../../assets/images/digital_global_logistics_1784195749241.jpg';

interface ServicesAndIndustriesProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const LOCAL_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    header_badge: "INTEGRATED GLOBAL SERVICES",
    header_title: "End-to-End General Trading & Logistics Solutions",
    header_desc: "A robust portfolio of corporate trading, procurement, and logistics services designed to ensure flawless contract execution, absolute quality compliance, and streamlined global distribution.",
    services: "SERVICES",
    enquire: "Enquire Now",
    compliance_badge: "OPERATIONAL ASSURANCE",
    compliance_title: "Have Specific Regional Compliance Requirements?",
    compliance_desc: "Our Dubai-based trade desk regularly coordinates pesticide limits matching, bespoke food packaging, custom product marking, and international trade letters of credit.",
    talk_btn: "Talk to our Trading Desk",
    s_import_export_title: "Global Import & Export",
    s_import_export_desc: "Seamless management of international trade flows, handling sea, air, and land custom clearings for cross-border transactions.",
    s_procurement_title: "International Procurement",
    s_procurement_desc: "Direct strategic sourcing from verified global suppliers and growers to secure exact quality specifications and stable volume commitments.",
    s_marine_title: "Marine & Offshore Supplies",
    s_marine_desc: "Provisioning heavy-duty industrial marine equipment, deck supplies, engine spares, and operations provisions for commercial vessels.",
    s_food_title: "Food Commodities",
    s_food_desc: "Trade and distribution of premium grains, agricultural commodities, processed foods, and spices under international safety standards.",
    s_industrial_title: "Industrial Equipment",
    s_industrial_desc: "Sourcing and distribution of heavy manufacturing machinery, precision equipment, tools, and industrial spare parts.",
    s_chemicals_title: "Chemicals",
    s_chemicals_desc: "Secure procurement, storage, and distribution of industrial-grade chemical raw materials, polymers, and specialty agents.",
    s_steel_title: "Steel & Metals",
    s_steel_desc: "Global supply of structural steel, alloy components, non-ferrous metals, raw metal plates, and raw ores.",
    s_building_title: "Building Materials",
    s_building_desc: "Distribution of cement, high-grade tiles, architectural fittings, aggregates, and structural building supplies.",
    s_automotive_title: "Automotive Components",
    s_automotive_desc: "Procuring OEM spare parts, precision engine assemblies, commercial fleet components, and specialized auto electronics.",
    s_supply_chain_title: "Supply Chain Management",
    s_supply_chain_desc: "End-to-end optimization of storage depots, packaging lines, inventory buffers, and multi-modal transit legs.",
    s_logistics_title: "International Logistics",
    s_logistics_desc: "Coordination of dry container shipping, temperature-controlled reefers, custom cargo stuffing, and priority ocean carrier slot bookings.",
    s_doc_title: "Trade Documentation",
    s_doc_desc: "Rigorous preparation of Bills of Lading, Phyto-sanitary certificates, Certificates of Origin, and specialized banking documents."
  },
  es: {
    header_badge: "SERVICIOS GLOBALES INTEGRADOS",
    header_title: "Soluciones de Comercio General y Logística Extremo a Extremo",
    header_desc: "Un portafolio robusto de servicios de comercio, adquisición y logística diseñado para garantizar una ejecución perfecta de contratos, cumplimiento absoluto de calidad y distribución global simplificada.",
    services: "SERVICIOS",
    enquire: "Consultar Servicio",
    compliance_badge: "GARANTÍA OPERATIVA",
    compliance_title: "¿Tiene Requisitos de Cumplimiento Regionales Específicos?",
    compliance_desc: "Nuestra mesa de operaciones en Dubái coordina regularmente el análisis de plaguicidas, empaque de alimentos a medida, marcado de productos y cartas de crédito internacionales.",
    talk_btn: "Hablar con un Especialista",
    s_import_export_title: "Importación y Exportación Global",
    s_import_export_desc: "Gestión perfecta de flujos comerciales internacionales, manejando despachos aduaneros marítimos, aéreos y terrestres.",
    s_procurement_title: "Adquisición Internacional",
    s_procurement_desc: "Adquisición estratégica directa de proveedores y agricultores globales verificados para asegurar especificaciones de calidad exactas.",
    s_marine_title: "Suministros Marinos y de Alta Mar",
    s_marine_desc: "Aprovisionamiento de equipos marinos industriales de alta resistencia, suministros de cubierta y repuestos para buques comerciales.",
    s_food_title: "Productos Alimenticios",
    s_food_desc: "Comercio y distribución de granos premium, productos agrícolas, alimentos procesados y especias bajo estándares internacionales.",
    s_industrial_title: "Equipos Industriales",
    s_industrial_desc: "Abastecimiento y distribución de maquinaria pesada de fabricación, equipos de precisión y repuestos industriales.",
    s_chemicals_title: "Productos Químicos",
    s_chemicals_desc: "Adquisición, almacenamiento y distribución segura de materias primas químicas de grado industrial, polímeros y agentes especializados.",
    s_steel_title: "Acero y Metales",
    s_steel_desc: "Suministro global de acero estructural, componentes de aleación, metales no ferrosos, placas metálicas y minerales crudos.",
    s_building_title: "Materiales de Construcción",
    s_building_desc: "Distribución de cemento, baldosas de alta calidad, accesorios arquitectónicos, agregados y suministros estructurales.",
    s_automotive_title: "Componentes de Automoción",
    s_automotive_desc: "Adquisición de piezas de repuesto OEM, conjuntos de motores de precisión, componentes de flotas comerciales y electrónica especializada.",
    s_supply_chain_title: "Gestión de Cadena de Suministro",
    s_supply_chain_desc: "Optimización de extremo a extremo de depósitos de almacenamiento, líneas de empaque, inventario y tránsitos multimodales.",
    s_logistics_title: "Logística Internacional",
    s_logistics_desc: "Coordinación de envío de contenedores secos, reefers con control de temperatura, estiba de carga y reservas de espacio prioritarias.",
    s_doc_title: "Documentación Comercial",
    s_doc_desc: "Preparación rigurosa de Conocimientos de Embarque (B/L), certificados fitosanitarios, Certificados de Origen y documentos bancarios."
  },
  ar: {
    header_badge: "خدمات عالمية متكاملة",
    header_title: "حلول التجارة العامة واللوجستيات الشاملة من البداية إلى النهاية",
    header_desc: "مجموعة قوية من خدمات التجارة واللوجستيات والمشتريات المصممة لضمان تنفيذ العقود بشكل مثالي، والامتثال المطلق للجودة، والتوزيع العالمي الميسر.",
    services: "الخدمات",
    enquire: "استفسر الآن",
    compliance_badge: "الضمان التشغيلي",
    compliance_title: "هل لديك متطلبات امتثال إقليمية محددة؟",
    compliance_desc: "يقوم مكتبنا التجاري في دبي بتنسيق مطابقة حدود مبيدات الآفات، وتعبئة المواد الغذائية المخصصة، وخطابات الاعتماد المستندية الدولية بانتظام.",
    talk_btn: "تحدث مع مكتبنا التجاري",
    s_import_export_title: "الاستيراد والتصدير العالمي",
    s_import_export_desc: "إدارة سلسة للتدفقات التجارية الدولية وتخليص الشحنات البحرية والجوية والبرية عبر الحدود.",
    s_procurement_title: "المشتريات الدولية",
    s_procurement_desc: "مصادر إستراتيجية مباشرة من الموردين والمزارعين العالميين المعتمدين لضمان المواصفات والكميات الدقيقة.",
    s_marine_title: "المستلزمات البحرية والخدمات البحرية",
    s_marine_desc: "توفير المعدات البحرية الصناعية الثقيلة، ومستلزمات الأسطح، وقطع غيار المحركات للسفن التجارية.",
    s_food_title: "السلع الغذائية",
    s_food_desc: "تجارة وتوزيع الحبوب الفاخرة، والسلع الزراعية، والأغذية المصنعة، والبهارات بموجب معايير السلامة الدولية.",
    s_industrial_title: "المعدات الصناعية",
    s_industrial_desc: "توريد وتوزيع آلات التصنيع الثقيلة، والمعدات الدقيقة، والأدوات، وقطع الغيار الصناعية.",
    s_chemicals_title: "المواد الكيميائية",
    s_chemicals_desc: "شراء وتخزين وتوزيع آمن للمواد الخام الكيميائية ذات الدرجة الصناعية والبوليمرات والعوامل المتخصصة.",
    s_steel_title: "الحديد والصلب والمعادن",
    s_steel_desc: "إمداد عالمي من الفولاذ الهيكلي، ومكونات السبائك، والمعادن غير الحديدية، والألواح المعدنية، والخامات الخام.",
    s_building_title: "مواد البناء",
    s_building_desc: "توزيع الأسمنت، والبلاط عالي الجودة، والتجهيزات المعمارية، والركام، ومستلزمات البناء الإنشائية.",
    s_automotive_title: "مكونات السيارات",
    s_automotive_desc: "توفير قطع الغيار الأصلية OEM، ومجموعات المحركات الدقيقة، ومكونات الأساطيل التجارية، وإلكترونيات السيارات المتخصصة.",
    s_supply_chain_title: "إدارة سلسلة الإمداد",
    s_supply_chain_desc: "تحسين شامل لمستودعات التخزين، وخطوط التعبئة، ومستويات المخزون المؤقتة، ومراحل النقل متعدد الوسائط.",
    s_logistics_title: "اللوجستيات الدولية",
    s_logistics_desc: "تنسيق شحن الحاويات الجافة، والحاويات المبردة التي يتم التحكم في درجة حرارتها، وحجز المساحات ذات الأولوية مع خطوط الشحن.",
    s_doc_title: "وثائق التجارة",
    s_doc_desc: "إعداد دقيق لبوالص الشحن، والشهادات الصحية النباتية، وشهادات المنشأ، والمستندات المصرفية المتخصصة."
  },
  hi: {
    header_badge: "एकीकृत वैश्विक सेवाएं",
    header_title: "शुरू से अंत तक सामान्य व्यापार और रसद समाधान",
    header_desc: "कॉर्पोरेट व्यापार, खरीद और रसद सेवाओं का एक मजबूत पोर्टफोलियो जो अनुबंध के त्रुटिहीन निष्पादन, पूर्ण गुणवत्ता अनुपालन और सुव्यवस्थित वैश्विक वितरण को सुनिश्चित करता है।",
    services: "सेवाएं",
    enquire: "अभी पूछताछ करें",
    compliance_badge: "परिचालन आश्वासन",
    compliance_title: "क्या आपकी विशिष्ट क्षेत्रीय अनुपालन आवश्यकताएं हैं?",
    compliance_desc: "दुबई स्थित हमारा व्यापार डेस्क नियमित रूप से कीटनाशक सीमाओं के मिलान, खाद्य पैकेजिंग, उत्पाद अंकन और अंतर्राष्ट्रीय व्यापार क्रेडिट पत्रों का समन्वय करता है।",
    talk_btn: "हमारे ट्रेडिंग डेस्क से बात करें",
    s_import_export_title: "वैश्विक आयात और निर्यात",
    s_import_export_desc: "अंतरराष्ट्रीय व्यापार प्रवाह का सुचारू प्रबंधन, सीमा पार लेनदेन के लिए समुद्री, हवाई और भूमि सीमा शुल्क निकासी संभालना।",
    s_procurement_title: "अंतर्राष्ट्रीय खरीद",
    s_procurement_desc: "सटीक गुणवत्ता विनिर्देशों और स्थिर मात्रा प्रतिबद्धताओं को सुरक्षित करने के लिए सत्यापित वैश्विक आपूर्तिकर्ताओं और उत्पादकों से प्रत्यक्ष सोर्सिंग।",
    s_marine_title: "समुद्री और अपतटीय आपूर्ति",
    s_marine_desc: "व्यावसायिक जहाजों के लिए भारी शुल्क वाले औद्योगिक समुद्री उपकरण, डेक आपूर्ति, इंजन स्पेयर पार्ट्स और परिचालन प्रावधानों की आपूर्ति।",
    s_food_title: "खाद्य उत्पाद",
    s_food_desc: "अंतरराष्ट्रीय सुरक्षा मानकों के तहत प्रीमियम अनाज, कृषि वस्तुओं, प्रसंस्कृत खाद्य पदार्थों और मसालों का व्यापार और वितरण।",
    s_industrial_title: "औद्योगिक उपकरण",
    s_industrial_desc: "भारी विनिर्माण मशीनरी, सटीक उपकरण, उपकरण और औद्योगिक स्पेयर पार्ट्स का सोर्सिंग और वितरण।",
    s_chemicals_title: "रसायन",
    s_chemicals_desc: "औद्योगिक-ग्रेड रासायनिक कच्चे माल, पॉलिमर और विशेष एजेंटों की सुरक्षित खरीद, भंडारण और वितरण।",
    s_steel_title: "इस्पात और धातु",
    s_steel_desc: "संरचनात्मक स्टील, मिश्र धातु घटकों, अलौह धातुओं, कच्ची धातु प्लेटों और कच्चे अयस्कों की वैश्विक आपूर्ति।",
    s_building_title: "भवन निर्माण सामग्री",
    s_building_desc: "सीमेंट, उच्च श्रेणी के टाइल्स, वास्तुशिल्प फिटिंग, समुच्चय और संरचनात्मक भवन निर्माण आपूर्ति का वितरण।",
    s_automotive_title: "ऑटोमोटिव घटक",
    s_automotive_desc: "ओईएम स्पेयर पार्ट्स, सटीक इंजन असेंबली, वाणिज्यिक बेड़े घटकों और विशेष ऑटो इलेक्ट्रॉनिक्स की खरीद।",
    s_supply_chain_title: "आपूर्ति श्रृंखला प्रबंधन",
    s_supply_chain_desc: "भंडारण डिपो, पैकेजिंग लाइनों, इन्वेंट्री बफर और संकेतकों का शुरू से अंत तक अनुकूलन।",
    s_logistics_title: "अंतर्राष्ट्रीय रसद",
    s_logistics_desc: "सूखे कंटेनर शिपिंग, तापमान-नियंत्रित रीफर्स, कस्टम कार्गो स्टफिंग और प्राथमिकता महासागर वाहक स्लॉट बुकिंग का समन्वय।",
    s_doc_title: "व्यापार प्रलेखन",
    s_doc_desc: "लदान के बिल (B/L), पादप-स्वच्छता प्रमाणपत्र, मूल देश प्रमाणपत्र और विशेष बैंकिंग दस्तावेजों की कठोर तैयारी।"
  },
  zh: {
    header_badge: "全球综合服务与贸易走廊",
    header_title: "端到端一般贸易与大宗供应链解决方案",
    header_desc: "全方位技术性大宗一般贸易、全球采购与国际物流保障服务，致力于确保外贸合同完美履行、严格的质量管理体系和高效分拨交付。",
    services: "服务项目",
    enquire: "立即咨询",
    compliance_badge: "运营合规保障",
    compliance_title: "是否有特定目的国家或地区的准入及合规要求？",
    compliance_desc: "我们在迪拜的专业贸易团队能快速处理各类化验指标测定、食品定制包装、专属唛头印刷以及信用证银行单据单单一致性把关。",
    talk_btn: "咨询贸易Desk团队",
    s_import_export_title: "全球进出口贸易",
    s_import_export_desc: "国际大宗及集装箱商品进出口通关、订舱、陆运海运等全链条一站式一般贸易服务。",
    s_procurement_title: "全球供应链采购",
    s_procurement_desc: "与全球各大产区直采基地和源头工厂深度合作，确保极具竞争力的价格、高标准品质和稳定的供货能力。",
    s_marine_title: "船舶及海上工程物料供应",
    s_marine_desc: "为商用远洋货轮、海洋工程平台及靠港船舶提供工业级专业备件、甲板物料及伙食配给物料供应。",
    s_food_title: "大宗食品及农副产品",
    s_food_desc: "符合国际粮农与食品安全标准的优质谷物、大宗油脂、干果坚果、高档辛香料的进出口及转口贸易。",
    s_industrial_title: "工业机械与重型设备",
    s_industrial_desc: "重型工业制造机床、精密工程仪器、测试设备、成套电气组件及高精度机械零配件的跨境采购分拨。",
    s_chemicals_title: "工业化学品及原料",
    s_chemicals_desc: "工业级高分子材料、通用塑料树脂、各类助剂及特种化工原料的安全采购、物流管理与仓储调拨。",
    s_steel_title: "大宗钢材与金属制品",
    s_steel_desc: "为全球基建提供结构钢材、高强度型材、管材、不锈钢板、非铁金属合金以及基础矿砂原材料供应。",
    s_building_title: "建材与建筑装饰物料",
    s_building_desc: "水泥、高档瓷砖大理石、建筑五金件、保温防水辅料以及大型工程建筑结构件的一体化保供。",
    s_automotive_title: "汽车零配件及商用车组件",
    s_automotive_desc: "原厂OEM配件、高精度发动机传动总成、重型卡车底盘件以及专业汽车电子元件的全球供应。",
    s_supply_chain_title: "现代供应链优化服务",
    s_supply_chain_desc: "协助客户重塑海外仓储节点、拼箱装货效率以及应急库存安全垫，最大程度降低断链和滞港风险。",
    s_logistics_title: "国际综合多式联运",
    s_logistics_desc: "涵盖拼箱整箱（FCL/LCL）冷藏及干散货运输，提供旺季优先舱位保配及多港口联动联运走廊支撑。",
    s_doc_title: "进出口单证与结汇保障",
    s_doc_desc: "专业缮制提单（B/L）、植物检疫证、产地证（CO/Form E）、熏蒸单以及国际信用证单据结汇代理。"
  }
};

export default function ServicesAndIndustries({ lang, onNavigate }: ServicesAndIndustriesProps) {
  const t = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS.en;
  const isRtl = lang === 'ar';

  const servicesList = [
    {
      id: 'import-export',
      icon: Globe,
      title: t.s_import_export_title,
      desc: t.s_import_export_desc
    },
    {
      id: 'procurement',
      icon: Compass,
      title: t.s_procurement_title,
      desc: t.s_procurement_desc
    },
    {
      id: 'marine',
      icon: Ship,
      title: t.s_marine_title,
      desc: t.s_marine_desc
    },
    {
      id: 'food',
      icon: Box,
      title: t.s_food_title,
      desc: t.s_food_desc
    },
    {
      id: 'industrial',
      icon: Settings,
      title: t.s_industrial_title,
      desc: t.s_industrial_desc
    },
    {
      id: 'chemicals',
      icon: ShieldCheck,
      title: t.s_chemicals_title,
      desc: t.s_chemicals_desc
    },
    {
      id: 'steel',
      icon: Layers,
      title: t.s_steel_title,
      desc: t.s_steel_desc
    },
    {
      id: 'building',
      icon: Box,
      title: t.s_building_title,
      desc: t.s_building_desc
    },
    {
      id: 'automotive',
      icon: Settings,
      title: t.s_automotive_title,
      desc: t.s_automotive_desc
    },
    {
      id: 'supply-chain',
      icon: Users,
      title: t.s_supply_chain_title,
      desc: t.s_supply_chain_desc
    },
    {
      id: 'logistics',
      icon: Ship,
      title: t.s_logistics_title,
      desc: t.s_logistics_desc
    },
    {
      id: 'trade-doc',
      icon: FileText,
      title: t.s_doc_title,
      desc: t.s_doc_desc
    }
  ];

  return (
    <div id="services-root" className="bg-brand-warm-white text-slate-900 min-h-screen text-left font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* ================= PAGE HERO ================= */}
      <section 
        className="relative py-28 overflow-hidden select-none"
        style={{
          backgroundImage: `url(${servicesHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for maximum text legibility and aesthetic contrast */}
        <div className="absolute inset-0 bg-[#071F18]/70 z-0" />
        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-brand-gold/15 border border-brand-gold/25 text-brand-gold font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            <span>{t.header_badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            {t.header_title}
          </h1>
          <p className="text-[#e9f4be] text-xs sm:text-sm max-w-2xl leading-relaxed font-semibold">
            {t.header_desc}
          </p>
        </div>
      </section>

      {/* ================= BREADCRUMBS ================= */}
      <div className="bg-white border-b border-slate-100 py-3.5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-emerald transition-colors cursor-pointer uppercase">HOME</button>
          <span>/</span>
          <span className="text-slate-700 uppercase">{t.services}</span>
        </div>
      </div>

      {/* ================= GRID OF 12 SERVICE CARDS ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id} 
                  className="bg-brand-cream/30 border border-slate-150 rounded-2xl p-7 text-left space-y-4 hover:border-brand-emerald/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-white border border-slate-150 text-brand-emerald inline-block shadow-xs">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <h3 className="text-base font-bold text-brand-forest font-sans">{service.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{service.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-150/40">
                    <button 
                      onClick={() => onNavigate('contact')}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono text-brand-emerald hover:text-brand-forest uppercase tracking-wider group cursor-pointer"
                    >
                      <span>{t.enquire}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Assurance Card below the grid */}
          <div className="mt-16 bg-brand-forest text-white rounded-2xl p-8 sm:p-12 text-left relative overflow-hidden shadow-sm border border-white/10">
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="text-[9px] font-mono font-bold text-brand-gold uppercase tracking-widest block">{t.compliance_badge}</span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-display">
                {t.compliance_title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {t.compliance_desc}
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="bg-brand-emerald hover:bg-brand-emerald/90 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl cursor-pointer transition-all"
                >
                  {t.talk_btn}
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
