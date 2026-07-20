/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Globe, 
  FileCheck, 
  Truck, 
  Headphones, 
  ChevronRight,
  Target, 
  Compass, 
  FileText, 
  BookOpen, 
  Sprout, 
  Apple, 
  Settings, 
  Package, 
  ShoppingCart, 
  Users, 
  Search, 
  Award, 
  HeartHandshake,
  Cpu,
  Factory
} from 'lucide-react';
import { Language } from '../../types';

interface AboutUsProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

const LOCAL_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    profile: "CORPORATE PROFILE",
    heritage: "Our Heritage & Integrity",
    heritage_desc: "Connecting global suppliers and international buyers through transparent business practices, quality-focused sourcing, and dependable logistics coordination.",
    
    about_subtitle: "ABOUT SEATRUCK NEXUSBRIDGE",
    about_heading: "Global Sourcing. Trusted Partnerships.",
    about_p1: "SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO is a premium, international trading corporation headquartered at Dubai Silicon Oasis, United Arab Emirates. We specialize in high-grade agricultural commodities, premium food products, and industrial raw materials.",
    about_p2: "Leveraging our strategic location in Dubai alongside our South Asia Regional Operations desk (Seatruck Exim Services in Mumbai, India), we facilitate seamless trade flows across major trade corridors. Through verified producers and robust logistics channels, we lock in quality, compliance, and competitive volumes.",
    about_p3: "We believe in transparency, premium trade execution, and long-term partnerships that build secure supply lines for our corporate partners globally.",
    
    principles_title: "OUR BUSINESS PRINCIPLES",
    p1_title: "Reliable Sourcing",
    p1_desc: "Working with verified suppliers to ensure consistent quality and dependable supply.",
    p2_title: "Quality & Compliance",
    p2_desc: "Following international standards and regulatory requirements in every transaction.",
    p3_title: "Transparent Operations",
    p3_desc: "Clear communication, honest practices, and complete documentation.",
    p4_title: "Logistics Coordination",
    p4_desc: "Efficient export logistics and shipment planning through trusted partners.",
    p5_title: "Customer-Centric Approach",
    p5_desc: "Understanding client needs and delivering solutions with professionalism.",
    
    philosophy_subtitle: "OPERATIONAL PHILOSOPHY",
    philosophy_heading: "Securing the Integrity of Global Sourcing",
    philosophy_p1: "Successful international trade depends on transparency, consistency, and reliable execution. Guided by our Dubai Global Headquarters, every transaction is backed by responsible origin-sourcing, rigorous laboratory verification, and efficient multicarrier logistics routing.",
    philosophy_p2: "Our operational approach focuses on building long-term partnerships through ethical business practices, effective communication, and dependable service.",
    
    op_step1_title: "Supplier Sourcing & Procurement",
    op_step1_desc: "Identifying and working with reliable suppliers to source quality products that meet customer requirements.",
    op_step2_title: "Quality Inspection & Compliance",
    op_step2_desc: "Conducting necessary quality checks and ensuring compliance with import-export regulations and standards.",
    op_step3_title: "Export Logistics Coordination",
    op_step3_desc: "Coordinating documentation, shipping, and delivery through dependable logistics partners.",
    
    values_title: "OUR CORE VALUES",
    v1_title: "Integrity",
    v1_desc: "We conduct business with honesty, fairness, and respect.",
    v2_title: "Reliability",
    v2_desc: "We deliver what we promise through consistent execution.",
    v3_title: "Transparency",
    v3_desc: "We believe in open communication and clear processes.",
    v4_title: "Quality Focus",
    v4_desc: "We prioritize quality in every step of our operations.",
    v5_title: "Long-Term Partnerships",
    v5_desc: "We build relationships that grow together over time.",
    
    why_heading: "Why Choose SEATRUCK NEXUSBRIDGE?",
    why_c1_title: "Reliable Supplier Network",
    why_c1_desc: "Access to a diverse network of trusted suppliers.",
    why_c2_title: "Quality-Focused Procurement",
    why_c2_desc: "Quality is ensured through verification and inspections.",
    why_c3_title: "Documentation Support",
    why_c3_desc: "Complete export documentation and trade compliance.",
    why_c4_title: "International Trade Knowledge",
    why_c4_desc: "Understanding global regulations, standards, and market needs.",
    why_c5_title: "Reliable Logistics Coordination",
    why_c5_desc: "Smooth shipment planning with reliable logistics partners.",
    why_c6_title: "Customer-Centric Service",
    why_c6_desc: "Dedicated support and solutions tailored to your business.",
    
    directives_title: "Our Directives",
    directives_desc: "Guiding every operation with transparency, professionalism, and a commitment to building long-term business relationships.",
    mission_vision_section: "OUR DIRECTION & PROCESS",
    mission_title: "Our Mission",
    mission_desc: "To facilitate international trade through dependable sourcing, transparent operations, and efficient logistics coordination.",
    vision_title: "Our Vision",
    vision_desc: "To become a trusted international trading partner recognized for integrity, professionalism, and reliable business relationships.",
    
    trade_process_title: "OUR TRADE PROCESS",
    tp_step1: "Inquiry & Requirement",
    tp_step1_desc: "Understanding customer needs and product requirements.",
    tp_step2: "Supplier Identification",
    tp_step2_desc: "Finding suitable suppliers and evaluating sourcing options.",
    tp_step3: "Quality Verification & Documentation",
    tp_step3_desc: "Preparing documentation and supporting quality verification.",
    tp_step4: "Shipping & Logistics Coordination",
    tp_step4_desc: "Managing shipment planning and logistics coordination.",
    tp_step5: "Delivery & Customer Support",
    tp_step5_desc: "Supporting successful delivery and ongoing customer communication.",
    
    industries_title: "Industries We Serve",
    ind_section_label: "OUR EXPERTISE",
    ind_agri: "Agricultural Commodities",
    ind_agri_desc: "Sourcing a wide range of agricultural products to meet global demand.",
    ind_food: "Food Products",
    ind_food_desc: "Supplying quality food products with safety and consistency.",
    ind_raw: "Industrial Raw Materials",
    ind_raw_desc: "Providing industrial inputs used across diverse manufacturing sectors.",
    ind_mfg: "Manufacturing",
    ind_mfg_desc: "Supporting manufacturers with reliable and quality-focused supplies.",
    ind_wholesale: "Wholesale Distribution",
    ind_wholesale_desc: "Delivering products to wholesalers and bulk buyers efficiently.",
    ind_retail: "Retail Supply Chains",
    ind_retail_desc: "Supplying products that support retail and modern trade requirements.",
    
    bp_section_title: "OUR BUSINESS PRINCIPLES",
    bp1_title: "Global Trade Solutions",
    bp1_desc: "Supporting businesses through dependable sourcing and international supply coordination.",
    bp2_title: "Quality-Focused Operations",
    bp2_desc: "Maintaining quality standards throughout sourcing and logistics.",
    bp3_title: "Transparent Business Practices",
    bp3_desc: "Building trust through honest communication and responsible business conduct.",
    bp4_title: "Reliable Logistics Coordination",
    bp4_desc: "Supporting efficient movement of goods through trusted logistics partners.",
    
    cta_heading: "Let's Build Successful Trade Partnerships",
    cta_desc: "Whether you're sourcing agricultural commodities, food products, or industrial raw materials, SEATRUCK NEXUSBRIDGE is ready to support your business with dependable sourcing, documentation assistance, and logistics coordination.",
    cta_btn: "Contact Us",
    exim_desk_btn: "CONTACT TRADING DESK",
    home: "HOME",
    about_us: "ABOUT US"
  },
  es: {
    profile: "PERFIL CORPORATIVO",
    heritage: "Nuestra Misión y Legado",
    heritage_desc: "Conectando proveedores globales y compradores internacionales a través de prácticas comerciales transparentes, abastecimiento enfocado en la calidad y coordinación logística confiable.",
    
    about_subtitle: "SOBRE SEATRUCK NEXUSBRIDGE",
    about_heading: "Abastecimiento Global. Alianzas Confiables.",
    about_p1: "SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO es una corporación internacional líder en comercio de commodities con sede en Dubai Silicon Oasis, Emiratos Árabes Unidos. Nos especializamos en commodities agrícolas de alta calidad, alimentos y materias primas industriales.",
    about_p2: "A través de nuestra posición de hub estratégico en Dubái y nuestra oficina operativa regional para el sur de Asia (Seatruck Exim Services en Mumbai, India), optimizamos los flujos comerciales. Ayudamos a las empresas a abastecerse con total seguridad, garantizando cumplimiento regulatorio y precios óptimos.",
    about_p3: "Creemos en la transparencia operativa, ejecución comercial premium y alianzas de largo plazo que brinden estabilidad logística a nuestros socios globales.",
    
    principles_title: "NUESTROS PRINCIPIOS",
    p1_title: "Abastecimiento Confiable",
    p1_desc: "Trabajar con proveedores verificados para asegurar calidad y suministro confiable.",
    p2_title: "Calidad y Cumplimiento",
    p2_desc: "Cumpliendo con estándares internacionales y requisitos regulatorios en cada transacción.",
    p3_title: "Operaciones Transparentes",
    p3_desc: "Comunicación clara, prácticas honestas y documentación completa.",
    p4_title: "Coordinación Logística",
    p4_desc: "Logística de exportación eficiente y planificación de envíos con socios confiables.",
    p5_title: "Enfoque en el Cliente",
    p5_desc: "Entendiendo las necesidades del cliente y entregando soluciones con profesionalismo.",
    
    philosophy_subtitle: "FILOSOFÍA OPERATIVA",
    philosophy_heading: "Garantizando la Seguridad en Cadena de Suministro",
    philosophy_p1: "El éxito del comercio internacional depende de la transparencia, la consistencia y la ejecución confiable. Dirigidos por nuestra Sede Global en Dubái, cada transacción está respaldada por abastecimiento responsable de origen, verificaciones de laboratorio rigurosas y coordinación logística multicanal.",
    philosophy_p2: "Nuestro enfoque operativo se centra en construir asociaciones a largo plazo a través de prácticas comerciales éticas, comunicación efectiva y servicio confiable.",
    
    op_step1_title: "Abastecimiento y Adquisición",
    op_step1_desc: "Trabajar con proveedores confiables para identificar productos que cumplan con los requisitos del cliente.",
    op_step2_title: "Inspección de Calidad y Cumplimiento",
    op_step2_desc: "Apoyar la verificación de calidad y el cumplimiento de las normas aplicables de importación y exportación.",
    op_step3_title: "Coordinación Logística de Exportación",
    op_step3_desc: "Coordinar la documentación, la planificación del envío y la entrega a través de socios logísticos confiables.",
    
    values_title: "VALORES CENTRALES",
    v1_title: "Integridad",
    v1_desc: "Conducir los negocios de manera honesta y profesional.",
    v2_title: "Confiabilidad",
    v2_desc: "Ofrecer un servicio consistente y un soporte confiable.",
    v3_title: "Transparencia",
    v3_desc: "Mantener una comunicación abierta durante cada transacción.",
    v4_title: "Enfoque en Calidad",
    v4_desc: "Priorizar la calidad en todo el abastecimiento y la logística.",
    v5_title: "Asociaciones a Largo Plazo",
    v5_desc: "Construir relaciones comerciales duraderas basadas en la confianza.",
    
    why_heading: "¿Por qué elegir SEATRUCK NEXUSBRIDGE?",
    why_c1_title: "Red de Proveedores Confiable",
    why_c1_desc: "Acceso a socios de abastecimiento confiables.",
    why_c2_title: "Adquisiciones de Calidad",
    why_c2_desc: "Énfasis en la calidad y consistencia del producto.",
    why_c3_title: "Soporte de Documentación",
    why_c3_desc: "Asistencia eficiente en documentación de exportación.",
    why_c4_title: "Conocimiento del Comercio",
    why_c4_desc: "Comprensión de los procesos de comercio internacional.",
    why_c5_title: "Coordinación Logística Confiable",
    why_c5_desc: "Planificación y coordinación de envíos sin problemas.",
    why_c6_title: "Servicio Centrado en el Cliente",
    why_c6_desc: "Soporte profesional adaptado a las necesidades del cliente.",
    
    directives_title: "Nuestras Directrices",
    directives_desc: "Guiando cada operación con transparencia, profesionalismo y el compromiso de construir relaciones comerciales a largo plazo.",
    mission_vision_section: "NUESTRA DIRECCIÓN Y PROCESO",
    mission_title: "Nuestra Misión",
    mission_desc: "Facilitar el comercio internacional a través de un abastecimiento confiable, operaciones transparentes y una coordinación logística eficiente.",
    vision_title: "Nuestra Vision",
    vision_desc: "Convertirnos en un socio comercial internacional de confianza, reconocido por su integridad, profesionalismo y relaciones comerciales confiables.",
    
    trade_process_title: "NUESTRO PROCESO COMERCIAL",
    tp_step1: "Consulta y Requisito",
    tp_step1_desc: "Comprensión de las necesidades del cliente y los requisitos del producto.",
    tp_step2: "Identificación de Proveedores",
    tp_step2_desc: "Encontrar proveedores adecuados y evaluar las opciones de abastecimiento.",
    tp_step3: "Verificación de Calidad y Documentación",
    tp_step3_desc: "Preparación de la documentación y apoyo a la verificación de la calidad.",
    tp_step4: "Coordinación de Envío y Logística",
    tp_step4_desc: "Gestión de la planificación del envío y coordinación logística.",
    tp_step5: "Entrega y Soporte al Cliente",
    tp_step5_desc: "Soporte para una entrega exitosa y comunicación continua con el cliente.",
    
    industries_title: "Industrias que Servimos",
    ind_section_label: "NUESTRA EXPERIENCIA",
    ind_agri: "Commodities Agrícolas",
    ind_agri_desc: "Abastecimiento de una amplia gama de productos agrícolas para satisfacer la demanda global.",
    ind_food: "Productos Alimenticios",
    ind_food_desc: "Suministro de productos alimenticios de calidad con seguridad y consistencia.",
    ind_raw: "Materias Primas Industriales",
    ind_raw_desc: "Provisión de insumos industriales utilizados en diversos sectores manufactureros.",
    ind_mfg: "Manufactura",
    ind_mfg_desc: "Soporte a fabricantes con suministros confiables y enfocados en la calidad.",
    ind_wholesale: "Distribución Mayorista",
    ind_wholesale_desc: "Entrega eficiente de productos a mayoristas y compradores a granel.",
    ind_retail: "Cadenas de Suministro",
    ind_retail_desc: "Suministro de productos que respaldan los requisitos del comercio minorista moderno.",
    
    bp_section_title: "NUESTROS PRINCIPIOS DE NEGOCIO",
    bp1_title: "Soluciones de Comercio Global",
    bp1_desc: "Apoyar a las empresas a través de un abastecimiento confiable y coordinación de suministro internacional.",
    bp2_title: "Operaciones de Calidad",
    bp2_desc: "Mantenimiento de estándares de calidad en todo el abastecimiento y la logística.",
    bp3_title: "Prácticas Transparentes",
    bp3_desc: "Construir confianza a través de una comunicación honesta y una conducta comercial responsable.",
    bp4_title: "Logística Confiable",
    bp4_desc: "Apoyar el movimiento eficiente de mercancías a través de socios logísticos de confianza.",
    
    cta_heading: "Construyamos Alianzas Comerciales Exitosas",
    cta_desc: "Ya sea que esté abasteciéndose de productos agrícolas, alimentos o materias primas industriales, SEATRUCK NEXUSBRIDGE está listo para respaldar su negocio con un abastecimiento confiable, asistencia en documentación y coordinación logística.",
    cta_btn: "Contactar",
    exim_desk_btn: "Contacto Oficina Comercial",
    home: "Inicio",
    about_us: "Sobre Nosotros"
  },
  ar: {
    profile: "الملف التعريفي للشركة",
    heritage: "تراثنا ونزاهتنا في العمل",
    heritage_desc: "الربط بين الموردين العالميين والمشترين الدوليين من خلال ممارسات تجارية شفافة، وتوريد يركز على الجودة، وتنسيق لوجستي موثوق.",
    
    about_subtitle: "حول سيتراك نكسس بريدج",
    about_heading: "التوريد العالمي. شراكات موثوقة.",
    about_p1: "سيتراك نكسس بريدج للتجارة العامة (ش.م.ح) هي شركة تجارية عالمية رائدة يقع مقرها الرئيسي في واحة دبي للسيليكون، الإمارات العربية المتحدة. نحن متخصصون في السلع الزراعية والمواد الصناعية عالية الجودة.",
    about_p2: "بالاستفادة من موقعنا الاستراتيجي في دبي وإلى جانب مكتب العمليات الإقليمي لجنوب آسيا (سي ترك إكسم سيرفيسز في مومباي، الهند)، فإننا نسهل تدفقات تجارية سلسة عبر الممرات التجارية الرئيسية.",
    about_p3: "نحن نؤمن بالشفافية والمهنية والعلاقات التجارية طويلة الأجل التي تخلق قيمة لكل من الموردين والمشترين.",
    
    principles_title: "مبادئ العمل الخاصة بنا",
    p1_title: "توريد موثوق",
    p1_desc: "العمل مع موردين معتمدين لضمان جودة متسقة وإمداد موثوق.",
    p2_title: "الجودة والامتثال",
    p2_desc: "اتباع المعايير الدولية والمتطلبات التنظيمية في كل معاملة.",
    p3_title: "عمليات شفافة",
    p3_desc: "اتصال واضح، وممارسات صادقة، ووثائق كاملة.",
    p4_title: "التنسيق اللوجستي",
    p4_desc: "لوجستيات تصدير وتخطيط شحن فعالين من خلال شركاء موثوقين.",
    p5_title: "التركيز على العملاء",
    p5_desc: "فهم احتياجات العملاء وتقديم الحلول بمهنية عالية.",
    
    philosophy_subtitle: "الفلسفة التشغيلية",
    philosophy_heading: "تأمين سلامة المصادر العالمية",
    philosophy_p1: "تعتمد التجارة الدولية الناجحة على الشفافية والاتساق والتنفيذ الموثوق. كل معاملة مدعومة بالتوريد المسؤول، والتحقق من الجودة، والوثائق المناسبة، والتنسيق اللوجستي الفعال.",
    philosophy_p2: "يركز نهجنا التشغيلي على بناء شراكات طويلة الأجل من خلال ممارسات تجارية أخلاقية، واتصال فعال، وخدمة يمكن الاعتماد عليها.",
    
    op_step1_title: "توريد وشراء السلع",
    op_step1_desc: "العمل مع موردين موثوقين لتحديد المنتجات التي تلبي متطلبات العملاء.",
    op_step2_title: "فحص الجودة والامتثال",
    op_step2_desc: "دعم التحقق من الجودة والامتثال لمعايير الاستيراد والتصدير المعمول بها.",
    op_step3_title: "تنسيق لوجستيات التصدير",
    op_step3_desc: "تنسيق الوثائق وتخطيط الشحن والتسليم من خلال شركاء لوجستيين موثوقين.",
    
    values_title: "قيمنا الأساسية",
    v1_title: "النزاهة",
    v1_desc: "إجراء الأعمال بصدق ومهنية.",
    v2_title: "الموثوقية",
    v2_desc: "تقديم خدمة متسقة ودعم يمكن الاعتماد عليه.",
    v3_title: "الشفافية",
    v3_desc: "الحفاظ على اتصال مفتوح طوال كل معاملة.",
    v4_title: "التركيز على الجودة",
    v4_desc: "إعطاء الأولوية للجودة في جميع عمليات التوريد والخدمات اللوجستية.",
    v5_title: "شراكات طويلة الأجل",
    v5_desc: "بناء علاقات عمل دائمة تقوم على الثقة.",
    
    why_heading: "لماذا تختار سيتراك نكسس بريدج؟",
    why_c1_title: "شبكة موردين موثوقة",
    why_c1_desc: "الوصول إلى شركاء توريد موثوقين.",
    why_c2_title: "شراء يركز على الجودة",
    why_c2_desc: "التركيز على جودة المنتج واتساقه.",
    why_c3_title: "دعم التوثيق والوثائق",
    why_c3_desc: "مساعدة فعالة في توثيق الصادرات.",
    why_c4_title: "معرفة بالتجارة الدولية",
    why_c4_desc: "فهم عمليات وأنظمة التجارة الدولية.",
    why_c5_title: "تنسيق لوجستي موثوق",
    why_c5_desc: "تخطيط وتنسيق شحن سلس.",
    why_c6_title: "خدمة تتمحور حول العميل",
    why_c6_desc: "دعم احترافي مخصص لاحتياجات العملاء.",
    
    directives_title: "توجيهاتنا",
    directives_desc: "توجيه كل عملية بشفافية ومهنية والتزام ببناء علاقات تجارية طويلة الأجل.",
    mission_vision_section: "توجيهاتنا وعمليتنا",
    mission_title: "مهمتنا",
    mission_desc: "تسهيل التجارة الدولية من خلال التوريد الموثوق، والعمليات الشفافة، والتنسيق اللوجستي الفعال.",
    vision_title: "رؤيتنا",
    vision_desc: "أن نكون شريكًا تجاريًا دوليًا موثوقًا به ومعترفًا به بالنزاهة والمهنية والعلاقات التجارية الموثوقة.",
    
    trade_process_title: "عمليتنا التجارية",
    tp_step1: "الاستفسار والطلب",
    tp_step1_desc: "فهم احتياجات العملاء ومتطلبات المنتج.",
    tp_step2: "تحديد الموردين",
    tp_step2_desc: "العثور على الموردين المناسبين وتقييم خيارات التوريد.",
    tp_step3: "التحقق من الجودة والتوثيق",
    tp_step3_desc: "إعداد الوثائق والمستندات ودعم عملية التحقق من الجودة.",
    tp_step4: "تنسيق الشحن واللوجستيات",
    tp_step4_desc: "إدارة تخطيط الشحن وتنسيق العمليات اللوجستية.",
    tp_step5: "التسليم والدعم",
    tp_step5_desc: "دعم التسليم الناجح والتواصل المستمر مع العملاء.",
    
    industries_title: "الصناعات التي نخدمها",
    ind_section_label: "خبرتنا",
    ind_agri: "السلع الزراعية",
    ind_agri_desc: "توفير مجموعة واسعة من المنتجات الزراعية لتلبية الطلب العالمي.",
    ind_food: "المنتجات الغذائية",
    ind_food_desc: "توريد منتجات غذائية عالية الجودة بسلامة واتساق تام.",
    ind_raw: "المواد الخام الصناعية",
    ind_raw_desc: "توفير المدخلات الصناعية المستخدمة في مختلف قطاعات التصنيع.",
    ind_mfg: "التصنيع",
    ind_mfg_desc: "دعم المصنعين بإمدادات موثوقة تركز على الجودة.",
    ind_wholesale: "توزيع الجملة",
    ind_wholesale_desc: "إيصال المنتجات إلى تجار الجملة والمشترين بكميات كبيرة بكفاءة.",
    ind_retail: "سلاسل التوريد بالتجزئة",
    ind_retail_desc: "توريد المنتجات التي تدعم متطلبات التجزئة والتجارة الحديثة.",
    
    bp_section_title: "مبادئ العمل الخاصة بنا",
    bp1_title: "حلول التجارة العالمية",
    bp1_desc: "دعم الشركات من خلال التوريد الموثوق وتنسيق الإمدادات الدولية.",
    bp2_title: "عمليات تركز على الجودة",
    bp2_desc: "الحفاظ على معايير الجودة طوال عمليات التوريد والخدمات اللوجستية.",
    bp3_title: "ممارسات تجارية شفافة",
    bp3_desc: "بناء الثقة من خلال التواصل الصادق والسلوك التجاري المسؤول.",
    bp4_title: "تنسيق لوجستي موثوق",
    bp4_desc: "دعم الحركة الفعالة للبضائع من خلال شركاء لوجستيين موثوقين.",
    
    cta_heading: "دعونا نبني شراكات تجارية ناجحة",
    cta_desc: "سواء كنت تبحث عن سلع زراعية، أو منتجات غذائية، أو مواد خام صناعية، فإن سيتراك نكسس بريدج جاهزة لدعم عملك بتوريد موثوق، ومساعدة في الوثائق، وتنسيق لوجستي.",
    cta_btn: "اتصل بنا",
    exim_desk_btn: "اتصل بمكتب التداول التجاري",
    home: "الرئيسية",
    about_us: "من نحن"
  },
  hi: {
    profile: "कॉर्पोरेट प्रोफाइल",
    heritage: "हमारी विरासत और सत्यनिष्ठा",
    heritage_desc: "पारदर्शी व्यावसायिक प्रथाओं, गुणवत्ता-केंद्रित सोर्सिंग और विश्वसनीय रसद समन्वय के माध्यम से वैश्विक आपूर्तिकर्ताओं और अंतर्राष्ट्रीय खरीदारों को जोड़ना।",
    
    about_subtitle: "सीट्रक नेक्ससब्रिज के बारे में",
    about_heading: "वैश्विक सोर्सिंग। विश्वसनीय साझेदारियां।",
    about_p1: "सीट्रक नेक्ससब्रिज जनरल ट्रेडिंग - FZCO एक प्रमुख, अंतर्राष्ट्रीय व्यापारिक निगम है जिसका मुख्यालय दुबई सिलिकॉन ओएसिस, संयुक्त अरब अमीरात में है। हम उच्च श्रेणी के कृषि जिंसों, खाद्य उत्पादों और औद्योगिक कच्चे माल के व्यापार में विशेषज्ञता रखते हैं।",
    about_p2: "दुबई में हमारे रणनीतिक स्थान और दक्षिण एशिया क्षेत्रीय परिचालन डेस्क (मुंबई, भारत में सीट्रक एक्जिम सर्विसेज) के सहयोग से, हम प्रमुख व्यापार गलियारों में निर्बाध व्यापार प्रवाह को सुगम बनाते हैं।",
    about_p3: "हम पारदर्शिता, व्यावसायिकता और दीर्घकालिक व्यावसायिक संबंधों में विश्वास करते हैं जो आपूर्तिकर्ताओं और खरीदारों दोनों के लिए मूल्य पैदा करते हैं।",
    
    principles_title: "हमारे व्यावसायिक सिद्धांत",
    p1_title: "विश्वसनीय सोर्सिंग",
    p1_desc: "लगातार गुणवत्ता और विश्वसनीय आपूर्ति सुनिश्चित करने के लिए सत्यापित आपूर्तिकर्ताओं के साथ काम करना।",
    p2_title: "गुणवत्ता और अनुपालन",
    p2_desc: "प्रत्येक लेनदेन में अंतर्राष्ट्रीय मानकों और नियामक आवश्यकताओं का पालन करना।",
    p3_title: "पारदर्शी संचालन",
    p3_desc: "स्पष्ट संचार, ईमानदार प्रथाएं और संपूर्ण दस्तावेज़ीकरण।",
    p4_title: "रसद समन्वय",
    p4_desc: "विश्वसनीय भागीदारों के माध्यम से कुशल निर्यात रसद और शिपमेंट योजना।",
    p5_title: "ग्राहक-केंद्रित दृष्टिकोण",
    p5_desc: "ग्राहकों की जरूरतों को समझना और व्यावसायिकता के साथ समाधान प्रदान करना।",
    
    philosophy_subtitle: "संचालन दर्शन",
    philosophy_heading: "वैश्विक सोर्सिंग की अखंडता को सुरक्षित करना",
    philosophy_p1: "सफल अंतर्राष्ट्रीय व्यापार पारदर्शिता, निरंतरता और विश्वसनीय निष्पादन पर निर्भर करता है। प्रत्येक लेनदेन जिम्मेदार सोर्सिंग, गुणवत्ता सत्यापन, उचित प्रलेखन और कुशल रसद समन्वय द्वारा समर्थित है।",
    philosophy_p2: "हमारा परिचालन दृष्टिकोण नैतिक व्यावसायिक प्रथाओं, प्रभावी संचार और विश्वसनीय सेवा के माध्यम से दीर्घकालिक साझेदारी बनाने पर केंद्रित है।",
    
    op_step1_title: "आपूर्तिकर्ता सोर्सिंग और खरीद",
    op_step1_desc: "ग्राहकों की आवश्यकताओं को पूरा करने वाले उत्पादों की पहचान करने के लिए विश्वसनीय आपूर्तिकर्ताओं के साथ काम करना।",
    op_step2_title: "गुणवत्ता निरीक्षण और अनुपालन",
    op_step2_desc: "लागू आयात-निर्यात मानकों के साथ गुणवत्ता सत्यापन और अनुपालन का समर्थन करना।",
    op_step3_title: "निर्यात रसद समन्वय",
    op_step3_desc: "विश्वसनीय रसद भागीदारों के माध्यम से दस्तावेज़ीकरण, शिपमेंट योजना और वितरण का समन्वय करना।",
    
    values_title: "हमारे मूल मूल्य",
    v1_title: "सत्यनिष्ठा",
    v1_desc: "ईमानदारी और पेशेवर तरीके से व्यवसाय करना।",
    v2_title: "विश्वसनीयता",
    v2_desc: "निरंतर सेवा और भरोसेमंद सहायता प्रदान करना।",
    v3_title: "पारदर्शिता",
    v3_desc: "प्रत्येक लेनदेन में खुला संचार बनाए रखना।",
    v4_title: "गुणवत्ता फोकस",
    v4_desc: "सोर्सिंग और रसद में गुणवत्ता को प्राथमिकता देना।",
    v5_title: "दीर्घकालिक साझेदारियां",
    v5_desc: "विश्वास के आधार पर स्थायी व्यावसायिक संबंध बनाना।",
    
    why_heading: "सीट्रक नेक्ससब्रिज को क्यों चुनें?",
    why_c1_title: "विश्वसनीय आपूर्तिकर्ता नेटवर्क",
    why_c1_desc: "विश्वसनीय सोर्सिंग भागीदारों तक पहुंच।",
    why_c2_title: "गुणवत्ता-केंद्रित खरीद",
    why_c2_desc: "उत्पाद की गुणवत्ता और निरंतरता पर जोर।",
    why_c3_title: "दस्तावेज़ीकरण सहायता",
    why_c3_desc: "कुशल निर्यात प्रलेखन सहायता।",
    why_c4_title: "अंतर्राष्ट्रीय व्यापार ज्ञान",
    why_c4_desc: "वैश्विक नियमों, मानकों और बाजार की जरूरतों को समझना।",
    why_c5_title: "विश्वसनीय रसद समन्वय",
    why_c5_desc: "विश्वसनीय रसद भागीदारों के साथ सुचारू शिपमेंट योजना।",
    why_c6_title: "ग्राहक-केंद्रित सेवा",
    why_c6_desc: "आपके व्यवसाय के अनुकूल समर्पित सहायता और समाधान।",
    
    mission_vision_section: "हमारा मिशन और विजन",
    mission_title: "हमारा उद्देश्य",
    mission_desc: "भरोसेमंद सोर्सिंग, पारदर्शी संचालन और कुशल रसद समन्वय के माध्यम से अंतर्राष्ट्रीय व्यापार को सुविधाजनक बनाना।",
    vision_title: "हमारा विजन",
    vision_desc: "सत्यनिष्ठा, व्यावसायिकता और विश्वसनीय व्यावसायिक संबंधों के लिए मान्यता प्राप्त एक विश्वसनीय अंतर्राष्ट्रीय व्यापार भागीदार बनना।",
    
    trade_process_title: "हमारी व्यापार प्रक्रिया",
    tp_step1: "पूछताछ और आवश्यकता",
    tp_step1_desc: "हमारे ट्रेड डेस्क पर अपनी उत्पाद आवश्यकता या सोर्सिंग पूछताछ जमा करें।",
    tp_step2: "मूल्यांकन",
    tp_step2_desc: "हम अपने नेटवर्क में सत्यापित उत्पादकों की पहचान, मूल्यांकन और उनके साथ बातचीत करते हैं।",
    tp_step3: "सत्यापन & प्रलेखन",
    tp_step3_desc: "हम स्वतंत्र निरीक्षण की व्यवस्था करते हैं और सभी व्यापार दस्तावेज संकलित करते हैं।",
    tp_step4: "शिपिंग और रसद",
    tp_step4_desc: "बुकिंग, निर्यात सीमा शुल्क निकासी, और समुद्री/हवाई पारगमन का समन्वय।",
    tp_step5: "वितरण और समर्थन",
    tp_step5_desc: "सुरक्षित गंतव्य बंदरगाह वितरण और पूर्ण व्यापार प्राप्ति सहायता।",
    
    industries_title: "उद्योग जिनकी हम सेवा करते हैं",
    ind_agri: "कृषि वस्तुएं",
    ind_food: "खाद्य उत्पाद",
    ind_raw: "औद्योगिक कच्चा माल",
    ind_mfg: "विनिर्माण",
    ind_wholesale: "थोक वितरण",
    ind_retail: "खुदरा आपूर्ति श्रृंखला",
    
    bp_section_title: "व्यावसायिक सिद्धांत",
    bp1_title: "वैश्विक व्यापार समाधान",
    bp1_desc: "अंतर्राष्ट्रीय सोर्सिंग और आपूर्ति समन्वय के साथ व्यवसायों का समर्थन करना।",
    bp2_title: "गुणवत्ता-केंद्रित संचालन",
    bp2_desc: "लगातार गुणवत्ता और जिम्मेदार खरीद पर जोर देना।",
    bp3_title: "पारदर्शी व्यावसायिक प्रथाएं",
    bp3_desc: "स्पष्ट संचार और नैतिक व्यापार सिद्धांत।",
    bp4_title: "विश्वसनीय रसद समन्वय",
    bp4_desc: "विश्वसनीय रसद भागीदारों के माध्यम से माल की कुशल आवाजाही का समर्थन करना।",
    
    cta_heading: "आइए सफल व्यापार साझेदारी बनाएं",
    cta_desc: "चाहे आप कृषि वस्तुओं, खाद्य उत्पादों, या औद्योगिक कच्चे माल की सोर्सिंग कर रहे हों, सीट्रक नेक्ससब्रिज भरोसेमंद सोर्सिंग, प्रलेखन सहायता और रसद समन्वय के साथ आपके व्यवसाय का समर्थन करने के लिए तैयार है।",
    cta_btn: "हमसे संपर्क करें",
    exim_desk_btn: "ट्रेडिंग डेस्क से संपर्क करें",
    home: "होम",
    about_us: "हमारे बारे में"
  },
  zh: {
    profile: "企业形象",
    heritage: "我们的传承与诚信",
    heritage_desc: "通过透明的商业实践、专注于品质的源头采购以及可靠的物流协同，连接全球供应商与国际买家。",
    
    about_subtitle: "关于 SEATRUCK NEXUSBRIDGE",
    about_heading: "全球采购。值得信赖的合作伙伴。",
    about_p1: "SEATRUCK NEXUSBRIDGE GENERAL TRADING - FZCO 是一家总部位于阿拉伯联合酋长国迪拜硅谷自由区（Dubai Silicon Oasis）的领先国际大宗商品贸易商，专注于高品质大宗农产品、食品配料以及工业原材料贸易。",
    about_p2: "依托迪拜的战略性枢纽区位，配合我们设立于印度孟买的南亚区域运营中心（Seatruck Exim Services），我们保障多条核心国际贸易走廊的平稳畅通。",
    about_p3: "我们坚信透明度、专业精神和长期的商业关系能够为供应商和买家双方创造共同价值。",
    
    principles_title: "我们的商业准则",
    p1_title: "可靠源头采购",
    p1_desc: "与经审核的供应商合作，确保一致的质量和可靠 of 供应。",
    p2_title: "品质与贸易合规",
    p2_desc: "在每笔交易中严格遵守国际标准和法律法规要求。",
    p3_title: "透明化合规运营",
    p3_desc: "清晰的沟通、诚信的经营实践和完整合规的贸易单证。",
    p4_title: "国际物流综合协同",
    p4_desc: "通过值得信赖的合作伙伴进行高效的出口物流和出货规划。",
    p5_title: "以客户为中心",
    p5_desc: "深入理解客户需求，以高度专业精神提供定制化贸易解决方案。",
    
    philosophy_subtitle: "经营理念",
    philosophy_heading: "守护全球采购品质与诚信",
    philosophy_p1: "成功的国际贸易依托于透明、一致和可靠的执行。每一笔交易都得到负责任的采购、质量验证、合规单证和高效物流协同的支持。",
    philosophy_p2: "我们的运营方法专注于通过恪守商业道德、高效沟通和可靠服务，建立持久的合作伙伴关系。",
    
    op_step1_title: "供应商源头采购",
    op_step1_desc: "与信誉良好的供应商合作，筛选出符合客户高标准需求的产品。",
    op_step2_title: "质量检验与贸易合规",
    op_step2_desc: "支持质量检验核实，确保完全符合适用的国家进出口检疫及合规标准。",
    op_step3_title: "出口物流综合协同",
    op_step3_desc: "通过值得信赖的船务与物流伙伴，严密协调单证清关、订舱规划以及货物交割。",
    
    values_title: "核心价值",
    v1_title: "诚信正直",
    v1_desc: "以诚实守信、恪守职业道德的精神开展一切业务。",
    v2_title: "稳妥可靠",
    v2_desc: "提供始终如一的品质保障和全方位的可靠支持。",
    v3_title: "阳光透明",
    v3_desc: "在贸易全流程中保持公开、即时的双向沟通。",
    v4_title: "品质至上",
    v4_desc: "将严格的产品质量检测贯穿于源头采购与国际物流的始终。",
    v5_title: "长期伙伴关系",
    v5_desc: "在互信的基础上，与全球客户和供应商构建长期互利关系。",
    
    why_heading: "为什么选择 SEATRUCK NEXUSBRIDGE？",
    why_c1_title: "可靠的供应渠道",
    why_c1_desc: "直达全球优质且经资质审核的源头供应渠道。",
    why_c2_title: "品质驱动的采购",
    why_c2_desc: "严控源头起运前的产品抽样复检与质量把关。",
    why_c3_title: "专业单证清关支持",
    why_c3_desc: "经验丰富的外贸单证团队，提供专业进出口清关协助。",
    why_c4_title: "深厚外贸行业经验",
    why_c4_desc: "深谙全球海关合规条例、行业壁垒及国际贸易流程。",
    why_c5_title: "卓越物流协同体系",
    why_c5_desc: "与主流班轮巨头紧密协作，保障仓位订舱及在途可视化。",
    why_c6_title: "定制化客户服务",
    why_c6_desc: "以客户需求为导向，提供响应及时的端到端一站式外贸支持。",
    
    mission_vision_section: "企业使命与愿景",
    mission_title: "企业使命",
    mission_desc: "通过可靠的源头直采、透明规范的运营管理以及高效物流，推动全球大宗贸易合规畅通。",
    vision_title: "企业愿景",
    vision_desc: "成为享誉全球的国际贸易合作伙伴，以诚信立业、专业高效和稳固可靠的商业合作见信于人。",
    
    trade_process_title: "我们的贸易流程",
    tp_step1: "需求对接",
    tp_step1_desc: "向我们的贸易服务台提交您的产品采购需求或询盘。",
    tp_step2: "供应商筛选",
    tp_step2_desc: "我们在网络中筛选、评估经资质审核 of 源头优质生产商并进行洽谈。",
    tp_step3: "质检与起运单证",
    tp_step3_desc: "安排第三方独立品质检验，并整理全套进出口贸易单证。",
    tp_step4: "物流与订舱报关",
    tp_step4_desc: "协调订舱、出口报关、商检以及海运/空运在途物流。",
    tp_step5: "货物交付与支持",
    tp_step5_desc: "保障货物安全抵达目的港，并提供端到端的贸易履约支持。",
    
    industries_title: "我们服务的行业",
    ind_agri: "大宗农业产品",
    ind_food: "精制食品与配料",
    ind_raw: "工业级基础原材料",
    ind_mfg: "重工业与轻工制造",
    ind_wholesale: "大型批发与多级分销",
    ind_retail: "商超零售供应链",
    
    bp_section_title: "大宗贸易核心信条",
    bp1_title: "全球大宗贸易解决方案",
    bp1_desc: "为全球企业提供高水准的多品类源头直采与国际供应链协同解决方案。",
    bp2_title: "专注于高品质大宗采购",
    bp2_desc: "始终秉持严格的质量筛选，执行对全球客户负责任的采购模式。",
    bp3_title: "公开透明的双向沟通",
    bp3_desc: "推行公开透明、诚信正直的双向沟通和符合商业伦理的国际贸易实践。",
    bp4_title: "严密可靠国际物流保障",
    bp4_desc: "携手全球一流海运及清关服务商，保障大宗货物准时、安全、顺畅交付。",
    
    cta_heading: "共商合作，互利双赢",
    cta_desc: "无论您是在寻找大宗农产品、食品配料还是工业原材料，SEATRUCK NEXUSBRIDGE 都随时准备通过可靠的源头采购、专业进出口单证和卓越物流，全方位支持您的业务。",
    cta_btn: "即刻联系我们",
    exim_desk_btn: "联系贸易服务台",
    home: "首页",
    about_us: "关于我们"
  }
};

export default function AboutUs({ lang, onNavigate }: AboutUsProps) {
  const t = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS.en;
  const isRtl = lang === 'ar';

  return (
    <div id="about-root" className="bg-brand-warm-white text-slate-800 min-h-screen text-left font-sans select-none" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-brand-forest text-white py-28 md:py-36 relative overflow-hidden select-none">
        
        {/* Network & Grid lines SVG backdrop overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
          <svg className="w-full h-full text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" preserveAspectRatio="none">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
            {/* Custom stylized trade lanes */}
            <circle cx="150" cy="150" r="4" fill="#C8A14A" />
            <circle cx="300" cy="220" r="5" fill="#C8A14A" />
            <circle cx="550" cy="180" r="4" fill="#C8A14A" />
            <circle cx="700" cy="280" r="6" fill="#C8A14A" />
            <circle cx="850" cy="160" r="4" fill="#C8A14A" />
            <circle cx="480" cy="350" r="5" fill="#C8A14A" />
            <path d="M 150 150 Q 225 185 300 220" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M 300 220 Q 425 200 550 180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
            <path d="M 550 180 Q 625 230 700 280" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M 700 280 Q 775 220 850 160" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M 300 220 Q 390 285 480 350" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
            <path d="M 480 350 Q 590 315 700 280" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3,3" />
          </svg>
        </div>

        {/* Faded Cargo Vessel Image on the right */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r lg:from-brand-forest lg:via-brand-forest/85 lg:to-transparent from-brand-forest/95 via-brand-forest/80 to-brand-forest/95 z-10"></div>
          <img 
            src="/assets/images/seatruck_hero_banner.jpg" 
            alt="Cargo vessel" 
            className="w-full h-full object-cover opacity-20 lg:opacity-30 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2 border border-brand-emerald text-brand-emerald bg-brand-emerald/10 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold">
              <span className="w-1.5 h-1.5 bg-brand-emerald rounded-full animate-pulse"></span>
              <span>{t.profile}</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-white max-w-3xl leading-tight"
          >
            {t.heritage}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-200 text-sm sm:text-lg max-w-2xl leading-relaxed font-light"
          >
            {t.heritage_desc}
          </motion.p>
        </div>
      </section>

      {/* ================= BREADCRUMBS ================= */}
      <div className="bg-brand-cream border-b border-brand-gray-light/30 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center gap-2 text-[11px] font-mono font-bold text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-forest transition-colors cursor-pointer uppercase">{t.home}</button>
          <span>/</span>
          <span className="text-slate-800 uppercase">{t.about_us}</span>
        </div>
      </div>

      {/* ================= SECTION 1 — ABOUT SEATRUCK ================= */}
      <section className="py-24 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
            
            {/* Left Column Story */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold font-mono text-brand-emerald uppercase tracking-widest block">
                {t.about_subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight font-display leading-tight mb-4">
                {t.about_heading}
              </h2>
              
              <div className="border-l-4 border-brand-forest pl-6 space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p className="font-normal">
                  {t.about_p1}
                </p>
                <p className="font-normal">
                  {t.about_p2}
                </p>
                <p className="font-normal text-brand-forest font-medium italic">
                  {t.about_p3}
                </p>
              </div>
            </div>

            {/* Right Column Card: Business Principles */}
            <div className="lg:col-span-5 bg-brand-warm-white border border-brand-gray-light shadow-lg rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400 mb-1">
                  {t.principles_title}
                </h3>
                <div className="w-12 h-1 bg-brand-emerald rounded"></div>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: Globe, title: t.p1_title, desc: t.p1_desc },
                  { icon: ShieldCheck, title: t.p2_title, desc: t.p2_desc },
                  { icon: FileCheck, title: t.p3_title, desc: t.p3_desc },
                  { icon: Truck, title: t.p4_title, desc: t.p4_desc },
                  { icon: Headphones, title: t.p5_title, desc: t.p5_desc }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-4 items-start group">
                      <div className="w-10 h-10 rounded-full bg-brand-forest/5 text-brand-emerald flex items-center justify-center shrink-0 group-hover:bg-brand-emerald group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans font-bold text-brand-forest text-sm">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-xs leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 5 — INDUSTRIES WE SERVE ================= */}
      <section className="py-24 bg-brand-forest text-white relative overflow-hidden">
        
        {/* Subtle world map watermark */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" preserveAspectRatio="none">
            <defs>
              <pattern id="world-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#world-dots)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold font-mono text-brand-emerald uppercase tracking-widest block">
              {t.ind_section_label}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {t.industries_title}
            </h2>
            <div className="w-24 h-1 bg-brand-emerald mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Sprout, title: t.ind_agri, desc: t.ind_agri_desc },
              { icon: Apple, title: t.ind_food, desc: t.ind_food_desc },
              { icon: Cpu, title: t.ind_raw, desc: t.ind_raw_desc },
              { icon: Factory, title: t.ind_mfg, desc: t.ind_mfg_desc },
              { icon: Package, title: t.ind_wholesale, desc: t.ind_wholesale_desc },
              { icon: ShoppingCart, title: t.ind_retail, desc: t.ind_retail_desc }
            ].map((industry, idx) => {
              const Icon = industry.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-[18px] p-8 flex flex-col items-center text-center shadow-md hover:bg-white/[0.08] hover:border-brand-emerald/30 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="w-16 h-16 rounded-full border border-white/10 text-brand-emerald flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display tracking-wide uppercase">{industry.title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed max-w-xs mt-2 font-light">
                    {industry.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= SECTION 6 — BUSINESS PRINCIPLES ================= */}
      <section className="py-24 bg-brand-warm-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold font-mono text-brand-emerald uppercase tracking-widest block">
              {t.bp_section_title}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight font-display">
              Our Core Principles
            </h2>
            <div className="w-24 h-1 bg-brand-emerald mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Globe, title: t.bp1_title, desc: t.bp1_desc },
              { icon: Award, title: t.bp2_title, desc: t.bp2_desc },
              { icon: HeartHandshake, title: t.bp3_title, desc: t.bp3_desc },
              { icon: Truck, title: t.bp4_title, desc: t.bp4_desc }
            ].map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <div 
                  key={idx}
                  className="bg-brand-cream border border-brand-gray-light rounded-[18px] p-6 sm:p-8 flex gap-5 items-start shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left group"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-forest text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-sm font-bold text-brand-forest leading-snug font-display uppercase tracking-wide">{principle.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-light">{principle.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= SECTION 3 — WHY CHOOSE SEATRUCK ================= */}
      <section className="py-24 bg-brand-forest text-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              {t.why_heading}
            </h2>
            <div className="w-24 h-1 bg-brand-emerald mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: t.why_c1_title, desc: t.why_c1_desc },
              { icon: Award, title: t.why_c2_title, desc: t.why_c2_desc },
              { icon: FileCheck, title: t.why_c3_title, desc: t.why_c3_desc },
              { icon: BookOpen, title: t.why_c4_title, desc: t.why_c4_desc },
              { icon: Truck, title: t.why_c5_title, desc: t.why_c5_desc },
              { icon: Headphones, title: t.why_c6_title, desc: t.why_c6_desc }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-emerald/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full border border-brand-emerald/30 text-brand-emerald flex items-center justify-center mb-6 bg-brand-emerald/5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{card.title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= SECTION 4 — MISSION, VISION & TRADE PROCESS ================= */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column (35%): Directives */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-8 h-full">
              <div className="space-y-4">
                <span className="text-xs font-bold font-mono text-brand-emerald uppercase tracking-widest block">
                  {t.mission_vision_section}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight font-display">
                  {t.directives_title}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                  {t.directives_desc}
                </p>
                <div className="w-16 h-1 bg-brand-emerald rounded"></div>
              </div>

              {/* Mission & Vision Cards Stack */}
              <div className="space-y-6 flex-1 flex flex-col justify-start">
                {/* Mission Card */}
                <div className="bg-brand-forest/[0.03] border border-brand-forest/10 p-6 rounded-[18px] space-y-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-brand-forest text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Target className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-brand-forest uppercase tracking-wider">{t.mission_title}</h3>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {t.mission_desc}
                    </p>
                  </div>
                  <div className="flex justify-end pt-2">
                    <ChevronRight className="w-4 h-4 text-brand-emerald transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Vision Card */}
                <div className="bg-brand-forest/[0.03] border border-brand-forest/10 p-6 rounded-[18px] space-y-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex-1 flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-brand-forest text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Compass className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-brand-forest uppercase tracking-wider">{t.vision_title}</h3>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {t.vision_desc}
                    </p>
                  </div>
                  <div className="flex justify-end pt-2">
                    <ChevronRight className="w-4 h-4 text-brand-emerald transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (65%): Trade Process Timeline */}
            <div className="lg:col-span-8 bg-brand-warm-white border border-brand-gray-light/40 rounded-[18px] p-8 lg:p-10 shadow-lg flex flex-col justify-start space-y-12">
              <div>
                <span className="text-xs font-bold font-mono text-brand-emerald uppercase tracking-widest block mb-1">
                  {t.trade_process_title}
                </span>
                <div className="w-16 h-1 bg-brand-emerald rounded"></div>
              </div>

              {/* Horizontal process timeline container */}
              <div className="relative pt-6">
                {/* Horizontal dotted gold line (desktop only) */}
                <div className="absolute top-[30px] left-[10%] right-[10%] h-[1px] border-t-2 border-dotted border-brand-emerald/40 hidden md:block z-0"></div>
                
                {/* Vertical dotted gold line (mobile only) */}
                <div className="absolute left-[24px] top-[48px] bottom-[48px] w-[1px] border-l-2 border-dotted border-brand-emerald/40 md:hidden z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
                  {[
                    { icon: Users, num: "01", label: t.tp_step1, desc: t.tp_step1_desc },
                    { icon: Search, num: "02", label: t.tp_step2, desc: t.tp_step2_desc },
                    { icon: FileCheck, num: "03", label: t.tp_step3, desc: t.tp_step3_desc },
                    { icon: Truck, num: "04", label: t.tp_step4, desc: t.tp_step4_desc },
                    { icon: Headphones, num: "05", label: t.tp_step5, desc: t.tp_step5_desc }
                  ].map((step, idx) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={idx} className="flex md:flex-col gap-5 md:gap-4 items-start md:items-center text-left md:text-center relative group">
                        {/* Circle and Icon */}
                        <div className="w-12 h-12 rounded-full bg-brand-forest border border-brand-emerald/30 text-brand-emerald flex items-center justify-center shadow-md relative z-10 shrink-0 hover:border-brand-emerald hover:scale-105 transition-all duration-300">
                          <StepIcon className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] font-bold text-brand-emerald tracking-wider block">{step.num}</span>
                          <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm leading-snug md:h-10 flex md:items-center md:justify-center">
                            {step.label}
                          </h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed max-w-xs md:max-w-[150px] mx-auto font-light">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 5 — INDUSTRIES WE SERVE ================= */}
      <section className="py-24 bg-brand-forest text-white relative overflow-hidden">
        
        {/* Subtle world map watermark */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" preserveAspectRatio="none">
            <defs>
              <pattern id="world-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#world-dots)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold font-mono text-brand-emerald uppercase tracking-widest block">
              {t.ind_section_label}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              {t.industries_title}
            </h2>
            <div className="w-24 h-1 bg-brand-emerald mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Sprout, title: t.ind_agri, desc: t.ind_agri_desc },
              { icon: Apple, title: t.ind_food, desc: t.ind_food_desc },
              { icon: Cpu, title: t.ind_raw, desc: t.ind_raw_desc },
              { icon: Factory, title: t.ind_mfg, desc: t.ind_mfg_desc },
              { icon: Package, title: t.ind_wholesale, desc: t.ind_wholesale_desc },
              { icon: ShoppingCart, title: t.ind_retail, desc: t.ind_retail_desc }
            ].map((industry, idx) => {
              const Icon = industry.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-[18px] p-8 flex flex-col items-center text-center shadow-md hover:bg-white/[0.08] hover:border-brand-emerald/30 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="w-16 h-16 rounded-full border border-white/10 text-brand-emerald flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display tracking-wide uppercase">{industry.title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed max-w-xs mt-2 font-light">
                    {industry.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= SECTION 6 — BUSINESS PRINCIPLES ================= */}
      <section className="py-24 bg-brand-warm-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold font-mono text-brand-emerald uppercase tracking-widest block">
              {t.bp_section_title}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight font-display">
              Our Core Principles
            </h2>
            <div className="w-24 h-1 bg-brand-emerald mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Globe, title: t.bp1_title, desc: t.bp1_desc },
              { icon: Award, title: t.bp2_title, desc: t.bp2_desc },
              { icon: HeartHandshake, title: t.bp3_title, desc: t.bp3_desc },
              { icon: Truck, title: t.bp4_title, desc: t.bp4_desc }
            ].map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <div 
                  key={idx}
                  className="bg-brand-cream border border-brand-gray-light rounded-[18px] p-6 sm:p-8 flex gap-5 items-start shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left group"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-forest text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-sm font-bold text-brand-forest leading-snug font-display uppercase tracking-wide">{principle.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-light">{principle.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-brand-forest text-white py-24 relative overflow-hidden">

        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            {t.cta_heading}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-light">
            {t.cta_desc}
          </p>
          <div className="pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 bg-gold-gradient hover:bg-gold-gradient-hover text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-lg cursor-pointer"
            >
              <span>{t.cta_btn}</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
}
