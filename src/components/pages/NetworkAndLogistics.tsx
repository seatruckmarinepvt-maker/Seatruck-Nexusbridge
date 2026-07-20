/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { 
  Globe, 
  MapPin, 
  Compass, 
  Anchor, 
  ShieldCheck, 
  Truck, 
  Layers, 
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Language } from '../../types';

interface NetworkAndLogisticsProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const LOCAL_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    hero_badge: "GLOBAL TRADING FOOTPRINT",
    hero_title: "Gateway Networks & Corridors",
    hero_desc: "Connecting agricultural basins and regional trade terminals through optimized sea transit lanes. Every shipment is backed by strict compliance SLAs.",
    breadcrumbs_network: "GLOBAL NETWORK",
    cartography_badge: "CARTOGRAPHY",
    cartography_title: "Active Maritime Gateways",
    cartography_desc: "Interact with our active ports below to inspect storage capacities, optical milling access, and local custom clearing parameters.",
    active_link: "ACTIVE LINK",
    terminal_profile: "TERMINAL GATE PROFILE",
    operational_scope: "OPERATIONAL SCOPE",
    infrastructure: "COMMERCIAL DEPOT INFRASTRUCTURE",
    direct_integration: "DIRECT VESSEL INTEGRATION",
    connectivity_desc: "Immediate slot reservations with premier ocean carriers.",
    countries_served: "Countries Served",
    export_destinations: "Export Destinations",
    import_sources: "Import Sources",
    business_partners: "Business Partners",
    timeline_badge: "TRACEABILITY TIMELINE",
    timeline_title: "Secure Sourcing Pipeline",
    timeline_desc: "How we preserve quality and eliminate delays from primary aggregation to final port discharge.",
    timeline_01_title: "Direct Farm Aggregation",
    timeline_01_desc: "Direct field collection and cash settlement with contracted farming cooperatives.",
    timeline_02_title: "Optical Laser Sizing",
    timeline_02_desc: "Laser-sorting and optical cleaning to remove cracked grains and foreign particles.",
    timeline_03_title: "Custom Sealing & Fumigation",
    timeline_03_desc: "Authorized phosphine treatment and physical container sealing under SGS oversight.",
    timeline_04_title: "Secure Sea Voyage",
    timeline_04_desc: "Continuous microclimate control and priority carrier slot booking to destination gate.",
    stat_transit_title: "Transit Efficiency",
    stat_transit_desc: "99% of shipments cleared at customs gates within contract schedule limitations, avoiding demurrage penalties.",
    stat_purity_title: "Purity Compliance",
    stat_purity_desc: "Phytosanitary laboratory screenings and chemical residue levels verified strictly compliant prior to container loading.",
    stat_cargo_title: "Secured Cargo Cap",
    stat_cargo_desc: "Fully closed loop of refrigerated and dry bulk container shipments, handled by prime international maritime carriers."
  },
  es: {
    hero_badge: "CONEXIONES DE COMERCIO GLOBAL",
    hero_title: "Puertos Activos y Redes de Distribución",
    hero_desc: "Sincronizamos operaciones logísticas marítimas en los puertos de origen y destino más eficientes del mundo para asegurar la integridad física de sus commodities.",
    breadcrumbs_network: "RED GLOBAL",
    cartography_badge: "CARTOGRAFÍA",
    cartography_title: "Terminales Marítimas de Seatruck",
    cartography_desc: "Haga clic en los puntos interactivos de color oro para consultar las especificaciones técnicas y el rol logístico de cada puerto en nuestra red.",
    active_link: "ENLACE ACTIVO",
    terminal_profile: "PERFIL DE TERMINAL",
    operational_scope: "ROL COMERCIAL",
    infrastructure: "INFRAESTRUCTURA DE DEPOSITOS",
    direct_integration: "INTEGRACIÓN NAVIERA DIRECTA",
    connectivity_desc: "Reserva de espacios inmediata con transportistas marítimos de primer nivel.",
    countries_served: "Países Atendidos",
    export_destinations: "Destinos de Exportación",
    import_sources: "Fuentes de Importación",
    business_partners: "Socios Comerciales",
    timeline_badge: "CRONOGRAMA DE TRAZABILIDAD",
    timeline_title: "Línea de Suministro Seguro",
    timeline_desc: "Cómo preservamos la calidad y eliminamos retrasos desde el acopio primario hasta la descarga final.",
    timeline_01_title: "Acopio Directo",
    timeline_01_desc: "Recolección directa en campo y liquidación con cooperativas agrícolas contratadas.",
    timeline_02_title: "Clasificación Láser",
    timeline_02_desc: "Clasificación óptica y limpieza láser para eliminar granos defectuosos y partículas extrañas.",
    timeline_03_title: "Sellado y Fumigación",
    timeline_03_desc: "Tratamiento autorizado de fosfina y sellado físico bajo supervisión de SGS.",
    timeline_04_title: "Tránsito Marítimo Seguro",
    timeline_04_desc: "Monitoreo continuo de microclima y reserva prioritaria de espacios hacia el puerto de destino.",
    stat_transit_title: "Eficiencia de Tránsito",
    stat_transit_desc: "99% de los envíos liberados en aduanas según el cronograma, evitando recargos por demora.",
    stat_purity_title: "Cumplimiento de Pureza",
    stat_purity_desc: "Análisis fitosanitarios de laboratorio y niveles de residuos químicos estrictamente verificados antes de la carga.",
    stat_cargo_title: "Capacidad de Carga Segura",
    stat_cargo_desc: "Cadena cerrada de envíos en contenedores refrigerados y secos, operada por navieras de primer nivel."
  },
  ar: {
    hero_badge: "البصمة العالمية للتصدير والاستيراد",
    hero_title: "شبكات وممرات البوابة الجمركية",
    hero_desc: "ربط الأحواض الزراعية والمحطات التجارية الإقليمية من خلال ممرات العبور البحرية المحسنة. كل شحنة مدعومة باتفاقيات مستوى الخدمة الصارمة.",
    breadcrumbs_network: "الشبكة العالمية",
    cartography_badge: "رسم الخرائط",
    cartography_title: "المنافذ البحرية النشطة",
    cartography_desc: "تفاعل مع موانئنا النشطة أدناه للتحقق من السعات التخزينية وميزات الفرز البصري ومعايير التخليص الجمركي المحلي.",
    active_link: "رابط نشط",
    terminal_profile: "ملف المحطة الجمركية",
    operational_scope: "النطاق التشغيلي والعملي",
    infrastructure: "البنية التحتية للمستودع التجاري",
    direct_integration: "تكامل مباشر مع السفن الناقلة",
    connectivity_desc: "حجز مساحات فورية مع كبرى شركات الشحن البحري العالمية.",
    countries_served: "البلدان المخدومة",
    export_destinations: "وجهات التصدير",
    import_sources: "مصادر الاستيراد",
    business_partners: "شركاء الأعمال",
    timeline_badge: "الجدول الزمني للتتبع",
    timeline_title: "خط إمداد آمن وموثوق",
    timeline_desc: "كيف نحافظ على الجودة ونقضي على التأخيرات من مرحلة التجميع الأولي إلى التفريغ النهائي في الميناء.",
    timeline_01_title: "التجميع الزراعي المباشر",
    timeline_01_desc: "الجمع المباشر من الحقول والتسوية النقدية مع التعاونيات الزراعية المتعاقد معها.",
    timeline_02_title: "الفرز البصري بالليزر",
    timeline_02_desc: "الفرز بالليزر والتنظيف البصري لإزالة الحبوب التالفة والشوائب الغريبة.",
    timeline_03_title: "التغليف الجمركي والتبخير",
    timeline_03_desc: "معالجة معتمدة بالفوسفين وختم الحاويات الفعلي تحت إشراف معتمد من SGS.",
    timeline_04_title: "الرحلة البحرية الآمنة",
    timeline_04_desc: "تحكم مستمر في المناخ الداخلي وحجز أولوية الشحن إلى بوابة الوجهة المستهدفة.",
    stat_transit_title: "كفاءة العبور والترانزيت",
    stat_transit_desc: "٩٩٪ من الشحنات تم تخليصها في البوابات الجمركية ضمن الحدود الزمنية المتعاقد عليها لتجنب غرامات التأخير.",
    stat_purity_title: "مطابقة معايير النقاء",
    stat_purity_desc: "الفحوصات المخبرية للصحة النباتية ومستويات المتبقيات الكيميائية مطابقة تماماً للمواصفات قبل تحميل الحاويات.",
    stat_cargo_title: "سعة الشحن المؤمنة",
    stat_cargo_desc: "دائرة مغلقة بالكامل من شحنات الحاويات المبردة والجافة، يتم تشغيلها بواسطة خطوط الشحن البحري الرائدة."
  },
  hi: {
    hero_badge: "वैश्विक निर्यात पदचिह्न",
    hero_title: "गेटवे नेटवर्क और व्यापार गलियारे",
    hero_desc: "अनुकूलित समुद्री पारगमन मार्गों के माध्यम से कृषि क्षेत्रों और क्षेत्रीय व्यापार टर्मिनलों को जोड़ना। प्रत्येक शिपमेंट सख्त मानकों द्वारा समर्थित है।",
    breadcrumbs_network: "वैश्विक नेटवर्क",
    cartography_badge: "मानचित्रकला",
    cartography_title: "सक्रिय समुद्री प्रवेश द्वार",
    cartography_desc: "भंडारण क्षमता, सॉर्टेक्स मिलिंग पहुंच और स्थानीय सीमा शुल्क निकासी मापदंडों का निरीक्षण करने के लिए नीचे हमारे सक्रिय बंदरगाहों के साथ बातचीत करें।",
    active_link: "सक्रिय लिंक",
    terminal_profile: "टर्मिनल गेट प्रोफाइल",
    operational_scope: "परिचालन दायरा",
    infrastructure: "व्यावसायिक डिपो अवसंरचना",
    direct_integration: "प्रत्यक्ष पोत एकीकरण",
    connectivity_desc: "प्रमुख महासागर वाहकों के साथ तत्काल स्थान आरक्षण।",
    countries_served: "सेवा प्राप्त देश",
    export_destinations: "निर्यात गंतव्य",
    import_sources: "आयात स्रोत",
    business_partners: "व्यावसायिक भागीदार",
    timeline_badge: "ट्रेसिबिलिटी समयरेखा",
    timeline_title: "सुरक्षित सोर्सिंग पाइपलाइन",
    timeline_desc: "हम प्राथमिक संग्रह से लेकर अंतिम बंदरगाह निर्वहन तक गुणवत्ता को कैसे सुरक्षित रखते हैं और देरी को कैसे समाप्त करते हैं।",
    timeline_01_title: "प्रत्यक्ष कृषि एकत्रीकरण",
    timeline_01_desc: "अनुबंधित कृषि सहकारी समितियों के साथ सीधे खेत से संग्रह और नकद भुगतान निपटान।",
    timeline_02_title: "ऑप्टिकल लेजर सॉर्टिंग",
    timeline_02_desc: "टूटे हुए अनाज और विदेशी कणों को हटाने के लिए लेजर-सॉर्टिंग और ऑप्टिकल सफाई।",
    timeline_03_title: "कस्टम सीलिंग और धूमन (Fumigation)",
    timeline_03_desc: "SGS की देखरेख में अधिकृत फॉस्फीन उपचार and भौतिक कंटेनर सीलिंग।",
    timeline_04_title: "सुरक्षित समुद्री यात्रा",
    timeline_04_desc: "गंतव्य गेट तक निरंतर माइक्रॉक्लाइमेट नियंत्रण और प्राथमिकता वाहक स्लॉट बुकिंग।",
    stat_transit_title: "पारगमन दक्षता",
    stat_transit_desc: "99% शिपमेंट अनुबंध अनुसूची सीमाओं के भीतर सीमा शुल्क द्वारों पर मंजूरी पा लेते हैं, जिससे विलंब शुल्क से बचा जा सकता है।",
    stat_purity_title: "शुद्धता अनुपालन",
    stat_purity_desc: "कंटेनर लोड करने से पहले फाइटोसैनिटरी प्रयोगशाला जांच और रासायनिक अवशेषों के स्तरों को पूरी तरह से अनुपालन पाया गया।",
    stat_cargo_title: "सुरक्षित कार्गो क्षमता",
    stat_cargo_desc: "शीतकालीन और सूखे बल्क कंटेनर शिपमेंट का पूरी तरह से बंद लूप, जिसे प्रमुख अंतरराष्ट्रीय समुद्री वाहकों द्वारा संभाला जाता है।"
  },
  zh: {
    hero_badge: "全球出海网络布局",
    hero_title: "国际大宗物流枢纽及海运走廊",
    hero_desc: "通过深度优化的远洋航线与核心港口码头，无缝连接主要农业产区与销地分拨网络，每单货运均严格执行服务水平协议 (SLA)。",
    breadcrumbs_network: "全球出海网络",
    cartography_badge: "全球出海版图",
    cartography_title: "核心战略合作港口",
    cartography_desc: "请点击下方交互式金色地标，了解我们在全球各主要集装箱枢纽港的堆场储备、色选加工作业能力及通关时效参数。",
    active_link: "实时联通",
    terminal_profile: "港区码头配置详情",
    operational_scope: "主营大宗商品种类",
    infrastructure: "现代化堆场及保税配套",
    direct_integration: "直航订舱与优先舱位",
    connectivity_desc: "与全球核心班轮公司直接集成，确保旺季舱位供应。",
    countries_served: "主要出口市场",
    export_destinations: "主力卸货港口",
    import_sources: "核心货源产区",
    business_partners: "国际战略合作伙伴",
    timeline_badge: "供应链全流程可追溯",
    timeline_title: "端到端履约时效管理",
    timeline_desc: "通过标准作业程序降低产地集货、海关检疫至卸货分拨全流程的操作延迟。",
    timeline_01_title: "原产地订单农业集货",
    timeline_01_desc: "与种植合作社深度绑定，规范物理等级，提供稳定的一手货源。",
    timeline_02_title: "光学色选与物理除杂",
    timeline_02_desc: "运用激光及色选级清洗，严格控制异物、碎粒及霉变比例指标。",
    timeline_03_title: "商检取样、铅封与重熏蒸",
    timeline_03_desc: "执行严格的磷化铝熏蒸和SGS物理商检铅封，确保远洋航海安全。",
    timeline_04_title: "全程冷链与温湿度追踪",
    timeline_04_desc: "舱位优先配载，海运航线轨迹及柜内环境远程监控追踪，保障完美品质交付。",
    stat_transit_title: "高效清关通关率",
    stat_transit_desc: "超99%的集装箱在目的港清关时效符合SLA约定，避免滞港费或滞箱费超支。",
    stat_purity_title: "植物检疫零瑕疵",
    stat_purity_desc: "装船前理化检测及农残指标100%符合输入国质检标准，避免退运纠纷。",
    stat_cargo_title: "安全海运承载力",
    stat_cargo_desc: "全自备干箱及冷藏箱航线闭环运营，提供可靠、低耗损的大宗粮食运输保障。"
  }
};

interface PinDetail {
  name: string;
  type: string;
  role: string;
  specs: string;
}

export function getPinDetails(lang: Language): Record<string, PinDetail> {
  const isAr = lang === 'ar';
  const isHi = lang === 'hi';
  const isZh = lang === 'zh';
  const isEs = lang === 'es';

  return {
    mumbai: {
      name: 'Nhava Sheva (JNPT), Mumbai',
      type: isEs ? 'Centro de Exportación Primario' 
            : isAr ? 'محطة التصدير الرئيسية' 
            : isHi ? 'प्राथमिक निर्यात टर्मिनल हब' 
            : isZh ? '主要大宗商品出口港口' 
            : 'Primary Export Terminal Hub',
      role: isEs ? 'Abastecimiento de arroz, especias y oleaginosas' 
            : isAr ? 'ميناء التصدير الرئيسي للحبوب والبهارات والزيوت النباتية.' 
            : isHi ? 'अनाज, पिसे हुए मसालों और तिलहनों के लिए प्राथमिक आउटबाउंड बंदरगाह।' 
            : isZh ? '大米、香料、油料作物和农副土特产的主力装运出海港口。' 
            : 'Primary outbound port for grains, milled spices, and oilseeds.',
      specs: isEs ? 'Proximidad a molienda láser, laboratorio SGS, precintado de aduanas.' 
            : isAr ? 'بالقرب من مصانع الطحن بالليزر ومحطات فحص SGS المعتمدة وساحات ختم الجمارك.' 
            : isHi ? 'ऑप्टिकल मिलिंग प्लांट, प्रमाणित SGS निरीक्षण स्टेशन और सुरक्षित FCL सीलिंग यार्ड के समीप।' 
            : isZh ? '紧邻高精度光学色选加工厂，设有SGS官方指定检测点及出口重载货柜监管区。' 
            : 'Adjacent to optical milling plants, certified SGS inspection stations, and secure FCL sealing yards.'
    },
    mundra: {
      name: 'Mundra Port, Gujarat',
      type: isEs ? 'Corredor de Commodities Secos' 
            : isAr ? 'ممر السلع الجافة السائبة' 
            : isHi ? 'सूखा बल्क कमोडिटी कॉरिडोर' 
            : isZh ? '散货谷物出口大通道' 
            : 'Dry Bulk Commodity Gate',
      role: isEs ? 'Consolidación de trigo, cereales y legumbres' 
            : isAr ? 'فرز وتعبئة وتوحيد الحاويات للحبوب الزراعية.' 
            : isHi ? 'कृषि अनाज के लिए थोक छंटाई, पैकिंग और कंटेनर समेकन।' 
            : isZh ? '小麦、大豆、油菜籽等大宗散货谷物的物理筛分、包装与配载装箱。' 
            : 'Bulk sorting, packing, and container consolidation for agricultural grains.',
      specs: isEs ? 'Silaje de alta velocidad, molienda Sortex, análisis fitosanitario de campo.' 
            : isAr ? 'مجهة بأنظمة فرز بوهلر Sortex الأوتوماتيكية، وصوامع حبوب ضخمة، ومكتب جمارك مخصص.' 
            : isHi ? 'स्वचालित Buhler sortex सिस्टम, बल्क ग्रेन एलीवेटर और ऑन-डॉक सीमा शुल्क डेस्क से सुसज्जित।' 
            : isZh ? '配备布勒自动色选机、大容积散粮筒仓和驻港商检通关绿色通道。' 
            : 'Equipped with automatic Buhler sortex systems, bulk grain elevators, and on-dock customs desk.'
    },
    jebel_ali: {
      name: 'Jebel Ali, Dubai',
      type: isEs ? 'Depósito de Distribución del Golfo' 
            : isAr ? 'مركز إعادة الشحن والترانزيت للخليج والشرق الأوسط' 
            : isHi ? 'जीसीसी ट्रांसशिपमेंट हब' 
            : isZh ? '中东及北非转口分拨中心' 
            : 'GCC Transshipment Hub',
      role: isEs ? 'Distribución regional en Medio Oriente y Norte de África' 
            : isAr ? 'مركز إعادة التصدير والتجميع الرئيسي لأسواق الخليج والشرق الأوسط.' 
            : isHi ? 'खाड़ी और मध्य पूर्व के बाजारों के लिए मुख्य पुन: निर्यात और समेकन केंद्र।' 
            : isZh ? '辐射海湾合作委员会、中东及北非地区各主力消费市场的核心分拨中转港。' 
            : 'Main re-exportation and consolidation hub for the Gulf & Middle East markets.',
      specs: isEs ? 'Almacenamiento climatizado, pre-despacho aduanero express, soporte local.' 
            : isAr ? 'تخزين مبرد، تخليص جمركي مسبق سريع، وشبكة شاحنات إقليمية متكاملة.' 
            : isHi ? 'तापमान-नियंत्रित भंडारण, एक्सप्रेस सीमा शुल्क पूर्व-निकासी, और निर्बाध क्षेत्रीय ट्रक ग्रिड।' 
            : isZh ? '配备大型恒温恒湿冷库、提供预清关急速通关通道，拥有覆盖多国的大陆公路运输网络。' 
            : 'Temperature-controlled storage, express customs pre-clearance, and seamless regional truck grid.'
    },
    rotterdam: {
      name: 'Port of Rotterdam',
      type: isEs ? 'Puerta de Descarga Europea' 
            : isAr ? 'بوابة التفريغ في غرب أوروبا' 
            : isHi ? 'पश्चिमी यूरोपीय डिस्चार्ज पोर्ट' 
            : isZh ? '西欧食品级原材料卸货港' 
            : 'Western European Discharge Port',
      role: isEs ? 'Ingreso y distribución en la Unión Europea' 
            : isAr ? 'البوابة الرئيسية للسلع الغذائية الموجهة لتجار الجملة في الاتحاد الأوروبي.' 
            : isHi ? 'यूरोपीय थोक विक्रेताओं के लिए नियत खाद्य ग्रेड वस्तुओं का प्राथमिक प्रवेश द्वार।' 
            : isZh ? '输往欧洲各国大型商超、食品加工企业之高标准原材料的卸货与集散枢纽。' 
            : 'Primary inbound gate for food grade commodities destined for European wholesalers.',
      specs: isEs ? 'Certificación fitosanitaria de la UE, control térmico de reefers, logística de última milla.' 
            : isAr ? 'محطة فحص متوافقة تماماً مع معايير الاتحاد الأوروبي، ومراقبة حرارة الحاويات المبردة، وتوصيل نهائي متميز.' 
            : isHi ? 'पूर्ण यूरोपीय संघ-अनुपालन निरीक्षण स्टेशन, रीफर टेलीमेट्री चेकिंग, और मल्टी-मोडल अंतर्देशीय कनेक्शन।' 
            : isZh ? '港区常驻欧盟官方植检检疫站，具备先进的冷藏集装箱遥测监控技术和多式联运能力。' 
            : 'Full EU-compliance inspection station, reefer telemetry checking, and multi-modal inland connections.'
    },
    singapore: {
      name: 'Port of Singapore',
      type: isEs ? 'Canal de Tránsito de Asia-Pacífico' 
            : isAr ? 'بوابة الترانزيت لآسيا والمحيط الهادئ' 
            : isHi ? 'एशिया-प्रशांत ट्रांजिट गेटवे' 
            : isZh ? '亚太航线中转中心枢纽' 
            : 'Asia-Pacific Transit Gateway',
      role: isEs ? 'Logística y distribución en el Sudeste Asiático' 
            : isAr ? 'رابط بحري استراتيجي يربط المصادر الزراعية مع شبكات الشراء في الشرق الأقصى.' 
            : isHi ? 'कृषि-उत्पत्ति को सुदूर पूर्व खरीद नेटवर्क से जोड़ने वाला रणनीतिक समुद्री लिंक।' 
            : isZh ? '无缝连接各大粮食原料供应产地国与亚太区大型终端买家采购网络的战略枢纽。' 
            : 'Strategic maritime link connecting agro-origins with Far East buying networks.',
      specs: isEs ? 'Sincronización de manifiesto electrónico, conexión ultra-rápida de contenedores.' 
            : isAr ? 'أرصفة إعادة شحن عالية الكفاءة، وشبكات مراقبة تلقائية للحاويات المبردة، وأمن سلسلة التبريد.' 
            : isHi ? 'उच्च दक्षता वाले ट्रांसशिपमेंट डॉक, स्वचालित रीफर निगरानी ग्रिड और कोल्ड-चेन सुरक्षा।' 
            : isZh ? '配备超高效率集装箱直装直卸码头、全自动冷藏箱遥感监控电网，确保冷链全程不掉线。' 
            : 'High-efficiency transshipment docks, automated reefer monitoring grids, and cold-chain security.'
    }
  };
}

export default function NetworkAndLogistics({ lang, onNavigate }: NetworkAndLogisticsProps) {
  const t = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];
  const [selectedPin, setSelectedPin] = useState<string>('mumbai');

  // Core operational hubs
  const PIN_DETAILS = getPinDetails(lang);

  const currentPin = PIN_DETAILS[selectedPin] || PIN_DETAILS.mumbai;

  return (
    <div id="network-root" className="bg-brand-warm-white text-slate-900 min-h-screen text-left font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* ================= HERO HEADER ================= */}
      <section className="bg-gradient-to-br from-[#0c1612] via-brand-forest to-[#080d0b] text-white py-28 relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-85 h-85 bg-brand-emerald/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-brand-gold/15 border border-brand-gold/25 text-brand-gold font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            <span>{t.hero_badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            {t.hero_title}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
            {t.hero_desc}
          </p>
        </div>
      </section>

      {/* ================= BREADCRUMBS ================= */}
      <div className="bg-white border-b border-slate-100 py-3.5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-emerald transition-colors cursor-pointer uppercase font-bold">HOME</button>
          <span>/</span>
          <span className="text-slate-700 uppercase font-bold">{t.breadcrumbs_network}</span>
        </div>
      </div>

      {/* ================= STYLIZED INTERACTIVE SVG WORLD MAP ================= */}
      <section className="py-24 bg-white border-b border-slate-150">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Interactive SVG World Map Container */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-left">
                <span className="text-[10px] font-bold font-mono text-brand-emerald uppercase tracking-widest block mb-2">{t.cartography_badge}</span>
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  {t.cartography_title}
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed mt-2 max-w-xl font-medium">
                  {t.cartography_desc}
                </p>
              </div>

              {/* High Contrast Minimalist Map Board */}
              <div className="relative rounded-2xl border border-slate-150 bg-gradient-to-br from-brand-forest to-[#0d2119] p-8 aspect-[16/9] flex items-center justify-center overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-noise opacity-5"></div>
                
                {/* Clean Simplified Stylized World Map Grid Lines */}
                <svg className="w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 50">
                  <path d="M5,10 L95,10 M5,20 L95,20 M5,30 L95,30 M5,40 L95,40 M10,5 L10,45 M30,5 L30,45 M50,5 L50,45 M70,5 L70,45 M90,5 L90,45" stroke="#ffffff" strokeWidth="0.1" strokeDasharray="1,1" fill="none" />
                </svg>

                {/* Styled Shipping Corridors */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 50">
                  {/* Corridors */}
                  <path d="M 46 25 Q 40 18 28 16" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeDasharray="1,1" className="animate-pulse" />
                  <path d="M 46 25 Q 49 28 54 30" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeDasharray="1,1" />
                  <path d="M 54 30 Q 64 36 68 40" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeDasharray="1,1" />
                  <path d="M 54 30 Q 51 22 56 16" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeDasharray="1,1" />
                </svg>

                {/* World map stylized continents (Simplified aesthetic geometries) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Americas */}
                  <div className="absolute top-[15%] left-[5%] w-[12%] h-[20%] bg-white/5 rounded-full blur-md"></div>
                  <div className="absolute top-[35%] left-[12%] w-[10%] h-[25%] bg-white/5 rounded-full blur-md"></div>
                  {/* Europe */}
                  <div className="absolute top-[10%] left-[22%] w-[12%] h-[15%] bg-white/5 rounded-full blur-md"></div>
                  {/* Africa */}
                  <div className="absolute top-[28%] left-[26%] w-[10%] h-[25%] bg-white/5 rounded-full blur-md"></div>
                  {/* Asia / India */}
                  <div className="absolute top-[15%] left-[40%] w-[18%] h-[20%] bg-white/5 rounded-full blur-md"></div>
                  <div className="absolute top-[28%] left-[42%] w-[10%] h-[12%] bg-white/5 rounded-full blur-md"></div>
                  {/* Southeast Asia */}
                  <div className="absolute top-[35%] left-[55%] w-[12%] h-[15%] bg-white/5 rounded-full blur-md"></div>
                </div>

                {/* Interactive Points Grid */}
                <div className="absolute inset-0 w-full h-full">
                  
                  {/* 1. Mumbai NHAVA SHEVA (JNPT) */}
                  <button 
                    onClick={() => setSelectedPin('mumbai')}
                    className="absolute top-[52%] left-[46%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  >
                    <span className={`absolute -inset-2.5 rounded-full bg-brand-gold/30 scale-150 animate-ping duration-1000 ${selectedPin === 'mumbai' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                    <MapPin className={`w-5 h-5 transition-transform duration-350 ${selectedPin === 'mumbai' ? 'text-brand-gold scale-110' : 'text-slate-350 hover:text-brand-gold'}`} />
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900/95 border border-slate-700 text-[8px] font-mono font-bold text-white px-2 py-0.5 rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">JNPT (Mumbai)</span>
                  </button>

                  {/* 2. Mundra Port */}
                  <button 
                    onClick={() => setSelectedPin('mundra')}
                    className="absolute top-[48%] left-[44%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  >
                    <span className={`absolute -inset-2.5 rounded-full bg-brand-gold/30 scale-150 animate-ping duration-1000 ${selectedPin === 'mundra' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                    <MapPin className={`w-5 h-5 transition-transform duration-350 ${selectedPin === 'mundra' ? 'text-brand-gold scale-110' : 'text-slate-350 hover:text-brand-gold'}`} />
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900/95 border border-slate-700 text-[8px] font-mono font-bold text-white px-2 py-0.5 rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">Mundra Port</span>
                  </button>

                  {/* 3. Jebel Ali */}
                  <button 
                    onClick={() => setSelectedPin('jebel_ali')}
                    className="absolute top-[49%] left-[38%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  >
                    <span className={`absolute -inset-2.5 rounded-full bg-brand-gold/30 scale-150 animate-ping duration-1000 ${selectedPin === 'jebel_ali' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                    <MapPin className={`w-5 h-5 transition-transform duration-350 ${selectedPin === 'jebel_ali' ? 'text-brand-gold scale-110' : 'text-slate-350 hover:text-brand-gold'}`} />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-900/95 border border-slate-700 text-[8px] font-mono font-bold text-white px-2 py-0.5 rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">Jebel Ali (Dubai)</span>
                  </button>

                  {/* 4. Rotterdam */}
                  <button 
                    onClick={() => setSelectedPin('rotterdam')}
                    className="absolute top-[32%] left-[28%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  >
                    <span className={`absolute -inset-2.5 rounded-full bg-brand-gold/30 scale-150 animate-ping duration-1000 ${selectedPin === 'rotterdam' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                    <MapPin className={`w-5 h-5 transition-transform duration-350 ${selectedPin === 'rotterdam' ? 'text-brand-gold scale-110' : 'text-slate-350 hover:text-brand-gold'}`} />
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900/95 border border-slate-700 text-[8px] font-mono font-bold text-white px-2 py-0.5 rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">Rotterdam Port</span>
                  </button>

                  {/* 5. Singapore */}
                  <button 
                    onClick={() => setSelectedPin('singapore')}
                    className="absolute top-[68%] left-[58%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  >
                    <span className={`absolute -inset-2.5 rounded-full bg-brand-gold/30 scale-150 animate-ping duration-1000 ${selectedPin === 'singapore' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                    <MapPin className={`w-5 h-5 transition-transform duration-350 ${selectedPin === 'singapore' ? 'text-brand-gold scale-110' : 'text-slate-350 hover:text-brand-gold'}`} />
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900/95 border border-slate-700 text-[8px] font-mono font-bold text-white px-2 py-0.5 rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">Singapore Hub</span>
                  </button>

                </div>
              </div>
            </div>

            {/* Selected Port Profile Sidebar */}
            <div className="lg:col-span-5 bg-brand-cream border border-slate-150 rounded-2xl p-7 text-left space-y-5 relative">
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse"></span>
                <span className="text-[8px] font-mono text-brand-emerald font-extrabold uppercase">{t.active_link}</span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">{t.terminal_profile}</span>
                <h3 className="text-lg font-bold text-brand-forest font-sans">{currentPin.name}</h3>
                <span className="inline-block text-[8px] font-mono font-bold uppercase tracking-wider bg-brand-forest text-white px-2.5 py-0.5 rounded">
                  {currentPin.type}
                </span>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200/60 text-xs font-medium">
                <div>
                  <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase">{t.operational_scope}</span>
                  <p className="text-slate-800 font-sans font-bold mt-1 leading-normal">{currentPin.role}</p>
                </div>
                <div>
                  <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase">{t.infrastructure}</span>
                  <p className="text-slate-650 font-sans mt-1 leading-relaxed">{currentPin.specs}</p>
                </div>
              </div>

              <div className="h-28 rounded-xl bg-brand-forest/5 border border-brand-forest/10 flex items-center justify-center p-4">
                <div className="text-center space-y-1.5">
                  <Anchor className="w-5 h-5 text-brand-emerald mx-auto" />
                  <p className="text-[9px] font-mono font-bold text-brand-forest uppercase tracking-widest">{t.direct_integration}</p>
                  <p className="text-[9px] text-slate-500">{t.connectivity_desc}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= NETWORKS AND DIRECTIVES ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* 1. Countries Served */}
            <div className="p-6 bg-brand-cream/35 border border-slate-150 rounded-2xl text-left space-y-4">
              <div className="w-8 h-8 rounded-lg bg-brand-forest/5 flex items-center justify-center text-brand-emerald">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-forest">{t.countries_served}</h3>
              <ul className="space-y-2 text-xs font-bold text-slate-650 font-sans">
                <li>• United Arab Emirates</li>
                <li>• Netherlands (Rotterdam)</li>
                <li>• Kingdom of Saudi Arabia</li>
                <li>• United States of America</li>
                <li>• Singapore Terminal Grid</li>
                <li>• East African Hubs (Kenya)</li>
              </ul>
            </div>

            {/* 2. Export Destinations */}
            <div className="p-6 bg-brand-cream/35 border border-slate-150 rounded-2xl text-left space-y-4">
              <div className="w-8 h-8 rounded-lg bg-brand-forest/5 flex items-center justify-center text-brand-emerald">
                <Anchor className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-forest">{t.export_destinations}</h3>
              <ul className="space-y-2 text-xs font-bold text-slate-650 font-sans">
                <li>• Jebel Ali Port, Dubai</li>
                <li>• Port of Rotterdam, NL</li>
                <li>• Port of Singapore</li>
                <li>• Port of Mombasa, Kenya</li>
                <li>• Jeddah Islamic Port, KSA</li>
                <li>• Port of Houston, USA</li>
              </ul>
            </div>

            {/* 3. Import Sources */}
            <div className="p-6 bg-brand-cream/35 border border-slate-150 rounded-2xl text-left space-y-4">
              <div className="w-8 h-8 rounded-lg bg-brand-forest/5 flex items-center justify-center text-brand-emerald">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-forest">{t.import_sources}</h3>
              <ul className="space-y-2 text-xs font-bold text-slate-650 font-sans">
                <li>• Gujarat Crop Basin, India</li>
                <li>• Madhya Pradesh Grains, India</li>
                <li>• Haryana Basmati Fields, India</li>
                <li>• Andhra Chilli Basin, India</li>
                <li>• Tamil Nadu Moringa Farm Hub</li>
                <li>• Southeast Asian Spices Desk</li>
              </ul>
            </div>

            {/* 4. Business Partners */}
            <div className="p-6 bg-brand-cream/35 border border-slate-150 rounded-2xl text-left space-y-4">
              <div className="w-8 h-8 rounded-lg bg-brand-forest/5 flex items-center justify-center text-brand-emerald">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-brand-forest">{t.business_partners}</h3>
              <ul className="space-y-2 text-xs font-bold text-slate-650 font-sans">
                <li>• International Wholesalers</li>
                <li>• Grain Milling Enterprises</li>
                <li>• Food Retail Distribution Chains</li>
                <li>• Sovereign Food Ministries</li>
                <li>• Accredited Laboratory Desks</li>
                <li>• Elite Shipping Carrier Lines</li>
              </ul>
            </div>

          </div>

          {/* ================= SUPPLY CHAIN TIMELINE AND KEY NODES ================= */}
          <div className="border-t border-slate-150 pt-16 text-left">
            <div className="text-left max-w-xl mb-12">
              <span className="text-[10px] font-bold font-mono text-brand-emerald uppercase tracking-widest block mb-1">{t.timeline_badge}</span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">{t.timeline_title}</h2>
              <p className="text-slate-500 text-xs leading-relaxed mt-2 font-medium">{t.timeline_desc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
              {[
                { step: "01", title: t.timeline_01_title, desc: t.timeline_01_desc },
                { step: "02", title: t.timeline_02_title, desc: t.timeline_02_desc },
                { step: "03", title: t.timeline_03_title, desc: t.timeline_03_desc },
                { step: "04", title: t.timeline_04_title, desc: t.timeline_04_desc }
              ].map((timeline, idx) => (
                <div key={idx} className="relative p-6 bg-brand-cream/20 border border-slate-150 rounded-2xl text-left space-y-2">
                  <span className="font-display text-2xl font-black text-brand-emerald">{timeline.step}</span>
                  <h3 className="text-xs font-bold text-brand-forest uppercase font-mono tracking-wider">{timeline.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{timeline.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PREMIUM STATISTICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-slate-150/60 text-left">
            <div className="bg-brand-cream border border-slate-150 rounded-2xl p-6 text-left flex gap-4 items-start">
              <div className="p-2.5 rounded-xl bg-white border border-slate-150 text-brand-emerald shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-brand-forest">{t.stat_transit_title}</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed mt-1">{t.stat_transit_desc}</p>
              </div>
            </div>

            <div className="bg-brand-cream border border-slate-150 rounded-2xl p-6 text-left flex gap-4 items-start">
              <div className="p-2.5 rounded-xl bg-white border border-slate-150 text-brand-emerald shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-brand-forest">{t.stat_purity_title}</h4>
                <p className="text-slate-550 text-[11px] leading-relaxed mt-1">{t.stat_purity_desc}</p>
              </div>
            </div>

            <div className="bg-brand-cream border border-slate-150 rounded-2xl p-6 text-left flex gap-4 items-start">
              <div className="p-2.5 rounded-xl bg-white border border-slate-150 text-brand-emerald shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-brand-forest">{t.stat_cargo_title}</h4>
                <p className="text-slate-550 text-[11px] leading-relaxed mt-1">{t.stat_cargo_desc}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
