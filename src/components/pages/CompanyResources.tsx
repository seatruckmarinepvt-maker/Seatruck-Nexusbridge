/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  HelpCircle, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Compass, 
  Search,
  CheckCircle
} from 'lucide-react';
import { Language } from '../../types';

const cashewImg = 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=600&q=80';
const broccoliImg = 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80';

interface CompanyResourcesProps {
  lang: Language;
  activeSection: 'news' | 'faqs' | 'careers';
  onNavigate: (page: string) => void;
}

const LOCAL_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    hero_news_badge: "Agribusiness Market Intelligence",
    hero_news_title: "Trade Insights & Market News",
    hero_news_desc: "Professional analytical reports covering crop yields, ocean freight bottlenecks, and regulatory trade compliance updates.",
    breadcrumbs_news: "NEWS & INSIGHTS",
    read_report: "Read Report",

    hero_faqs_badge: "Trade Regulations FAQ",
    hero_faqs_title: "Frequently Asked Questions",
    hero_faqs_desc: "Instant answers regarding payment letters of credit, phytosanitary quarantine codes, reefer telemetry, and export packaging.",
    breadcrumbs_faqs: "FAQS",

    hero_careers_badge: "Global Trade Talents",
    hero_careers_title: "Work with Seatruck",
    hero_careers_desc: "Build your profession in high-yield agribusiness trade, compliance law, and international maritime container operations.",
    breadcrumbs_careers: "CAREERS",
    vacancies_badge: "CURRENT VACANCIES",
    vacancies_title: "Active Sourcing Vacancies",
    vacancies_desc: "We provide standard corporate salaries, international posting options, and health covers.",
    submit_title: "Submit Your Application",
    success_title: "Application File Logged",
    success_desc: "Your professional trade resume has been uploaded to our talent registry. Our HR division will contact you if qualifications match.",
    label_name: "Full Corporate Name",
    label_email: "Professional Email Address",
    label_cover: "Brief Cover Statement",
    label_resume: "Resume Document (Simulated upload)",
    drag_drop: "Drag & drop PDF file here, or click to choose",
    btn_submit: "Transmit Application",
  },
  es: {
    hero_news_badge: "Información del Mercado Agrícola",
    hero_news_title: "Perspectivas del Comercio y Mercado",
    hero_news_desc: "Informes analíticos profesionales que cubren rendimientos de cultivos, cuellos de botella en transporte marítimo y regulaciones de comercio.",
    breadcrumbs_news: "NOTICIAS Y PERSPECTIVAS",
    read_report: "Leer Informe",

    hero_faqs_badge: "Preguntas de Regulación Comercial",
    hero_faqs_title: "Preguntas Frecuentes",
    hero_faqs_desc: "Respuestas instantáneas sobre cartas de crédito, códigos sanitarios, telemetría y embalaje de exportación.",
    breadcrumbs_faqs: "PREGUNTAS",

    hero_careers_badge: "Talento de Comercio Global",
    hero_careers_title: "Trabaje con Seatruck",
    hero_careers_desc: "Desarrolle su carrera en comercio agrícola, leyes de cumplimiento y operaciones de contenedores marítimos.",
    breadcrumbs_careers: "CARRERAS",
    vacancies_badge: "VACANTES ACTUALES",
    vacancies_title: "Vacantes de Sourcing Activas",
    vacancies_desc: "Ofrecemos salarios corporativos estándar, opciones de asignación internacional y seguro médico.",
    submit_title: "Enviar su Solicitud",
    success_title: "Archivo de Solicitud Registrado",
    success_desc: "Su currículum profesional ha sido subido a nuestro registro de talentos. Recursos Humanos le contactará si su perfil coincide.",
    label_name: "Nombre Corporativo Completo",
    label_email: "Correo Electrónico Profesional",
    label_cover: "Carta de Presentación Breve",
    label_resume: "Documento de Currículum (Simulación)",
    drag_drop: "Arrastre y suelte el archivo PDF aquí, o haga clic para seleccionar",
    btn_submit: "Enviar Solicitud",
  },
  ar: {
    hero_news_badge: "معلومات سوق الزراعة",
    hero_news_title: "رؤى التجارة وأخبار السوق",
    hero_news_desc: "تقارير تحليلية مهنية تغطي عوائد المحاصيل، واختناقات الشحن البحري، وتحديثات الامتثال التنظيمي للتجارة.",
    breadcrumbs_news: "الأخبار والرؤى",
    read_report: "قراءة التقرير",

    hero_faqs_badge: "الأسئلة الشائعة حول اللوائح",
    hero_faqs_title: "الأسئلة الشائعة",
    hero_faqs_desc: "إجابات فورية بشأن خطابات الاعتماد للدفع، ورموز الحجر الصحي النباتي، والتعبئة للتصدير.",
    breadcrumbs_faqs: "الأسئلة الشائعة",

    hero_careers_badge: "مواهب التجارة العالمية",
    hero_careers_title: "العمل مع سيتراك",
    hero_careers_desc: "ابنِ حياتك المهنية في تجارة المنتجات الزراعية عالية العائد، وقوانين الامتثال، وعمليات الحاويات البحرية الدولية.",
    breadcrumbs_careers: "الوظائف",
    vacancies_badge: "الشواغر الحالية",
    vacancies_title: "شواغر التوريد النشطة",
    vacancies_desc: "نحن نقدم رواتب مؤسسية قياسية، وخيارات النقل الدولي، والتغطية الصحية.",
    submit_title: "تقديم طلبك",
    success_title: "تم تسجيل ملف الطلب",
    success_desc: "تم تحميل سيرتك الذاتية المهنية إلى سجل المواهب لدينا. سيتصل بك قسم الموارد البشرية إذا تطابقت المؤهلات.",
    label_name: "الاسم المؤسسي الكامل",
    label_email: "البريد الإلكتروني المهني",
    label_cover: "خطاب تغطية موجز",
    label_resume: "مستند السيرة الذاتية (تحميل محاكى)",
    drag_drop: "اسحب وأسقط ملف PDF هنا، أو انقر للاختيار",
    btn_submit: "إرسال الطلب",
  },
  hi: {
    hero_news_badge: "कृषि व्यवसाय बाजार खुफिया जानकारी",
    hero_news_title: "व्यापार अंतर्दृष्टि और बाजार समाचार",
    hero_news_desc: "फसलों की पैदावार, समुद्री माल ढुलाई की बाधाओं और विनियामक व्यापार अनुपालन अपडेट को कवर करने वाली व्यावसायिक विश्लेषणात्मक रिपोर्ट।"
    + " सीट्रैक द्वारा सुनिश्चित की गई आपूर्ति श्रृंखला विश्वसनीयता।",
    breadcrumbs_news: "समाचार और अंतर्दृष्टि",
    read_report: "रिपोर्ट पढ़ें",

    hero_faqs_badge: "व्यापार विनियम अक्सर पूछे जाने वाले प्रश्न",
    hero_faqs_title: "अक्सर पूछे जाने वाले प्रश्न",
    hero_faqs_desc: "भुगतान ऋण पत्र, पादप स्वच्छता संगरोध कोड, रीफर टेलीमेट्री और निर्यात पैकेजिंग के संबंध में त्वरित उत्तर।",
    breadcrumbs_faqs: "अक्सर पूछे जाने वाले प्रश्न",

    hero_careers_badge: "वैश्विक व्यापार प्रतिभाएं",
    hero_careers_title: "सिट्रैक के साथ काम करें",
    hero_careers_desc: "उच्च-उपज कृषि व्यवसाय व्यापार, अनुपालन कानून और अंतर्राष्ट्रीय समुद्री कंटेनर संचालन में अपना करियर बनाएं।",
    breadcrumbs_careers: "करियर",
    vacancies_badge: "वर्तमान रिक्तियां",
    vacancies_title: "सक्रिय सोर्सिंग रिक्तियां",
    vacancies_desc: "हम मानक कॉर्पोरेट वेतन, अंतर्राष्ट्रीय पोस्टिंग विकल्प और स्वास्थ्य बीमा प्रदान करते हैं।",
    submit_title: "अपना आवेदन जमा करें",
    success_title: "आवेदन फ़ाइल दर्ज की गई",
    success_desc: "आपका पेशेवर व्यापार बायोडाटा हमारी प्रतिभा रजिस्ट्री में अपलोड कर दिया गया है। योग्यता मेल खाने पर हमारा मानव संसाधन विभाग आपसे संपर्क करेगा।",
    label_name: "पूर्ण कॉर्पोरेट नाम",
    label_email: "पेशेवर ईमेल पता",
    label_cover: "संक्षिप्त विवरण",
    label_resume: "बायोडाटा दस्तावेज़ (सिम्युलेटेड अपलोड)",
    drag_drop: "पीडीएफ फाइल यहां खींचें और छोड़ें, या चुनने के लिए क्लिक करें",
    btn_submit: "आवेदन प्रेषित करें",
  },
  zh: {
    hero_news_badge: "农业贸易市场情报",
    hero_news_title: "贸易洞察与市场动态",
    hero_news_desc: "涵盖作物产量、海运瓶颈和贸易合规性法规更新的专业分析报告。Seatruck 助力您的全球贸易发展。",
    breadcrumbs_news: "新闻与洞察",
    read_report: "阅读报告",

    hero_faqs_badge: "贸易法规常见问题",
    hero_faqs_title: "常见问题解答",
    hero_faqs_desc: "关于信用证付款、植物检疫、冷藏遥测及出口包装的即时解答。",
    breadcrumbs_faqs: "常见问题",

    hero_careers_badge: "全球贸易英才",
    hero_careers_title: "加入 Seatruck",
    hero_careers_desc: "在高收益农产品贸易、合规法务和国际航运集装箱运营等领域发展您的职业生涯。",
    breadcrumbs_careers: "招贤纳士",
    vacancies_badge: "最新招聘职位",
    vacancies_title: "活跃的全球采购职位",
    vacancies_desc: "我们提供具有竞争力的薪酬福利、全球外派发展机会及全面的健康医疗保障。",
    submit_title: "提交个人简历",
    success_title: "申请提交成功",
    success_desc: "您的简历已成功录入我们的全球人才库。若您的资历契合相关岗位，HR部门将尽快与您取得联系。",
    label_name: "中文/英文全名",
    label_email: "职业电子邮箱",
    label_cover: "个人陈述 / 求职信",
    label_resume: "个人简历文件（模拟上传）",
    drag_drop: "拖拽 PDF 文件至此，或点击选择文件",
    btn_submit: "立即投递简历",
  }
};

function getFaqs(lang: Language) {
  const isEs = lang === 'es';
  const isAr = lang === 'ar';
  const isHi = lang === 'hi';
  const isZh = lang === 'zh';

  return [
    {
      q: isEs ? "¿Cuáles son los términos estándar de pago?" 
        : isAr ? "ما هي شروط الدفع القياسية للتصدير؟"
        : isHi ? "आपके मानक निर्यात भुगतान नियम क्या हैं?"
        : isZh ? "你们的标准出口付款条款是什么？"
        : "What are your standard export payment terms?",
      a: isEs ? "Aceptamos principalmente Cartas de Crédito Irrevocables (L/C a la vista) de bancos globales de primer orden o transferencias cablegráficas T/T (30% de depósito inicial, 70% contra copia escaneada de los documentos de embarque)."
        : isAr ? "نحن نقبل بشكل أساسي خطابات الاعتماد غير القابلة للإلغاء (L/C at Sight) المؤكدة من بنوك عالمية من الدرجة الأولى أو التحويلات البرقية T/T (دفعة مقدمة 30%، و70% مقابل نسخ وثائق الشحن)."
        : isHi ? "हम मुख्य रूप से शीर्ष स्तरीय अंतरराष्ट्रीय बैंक द्वारा पुष्टि की गई अपरिवर्तनीय साख पत्र (L/C at Sight), या टेलीग्राफिक ट्रांसफर (T/T) स्वीकार करते हैं (30% अग्रिम जमा और 70% मूल बिल ऑफ लैडिंग की स्कैनिंग के खिलाफ)।"
        : isZh ? "我们主要接受一流国际银行保兑的不可撤销即期信用证（L/C at Sight），或电汇（T/T，30% 预付款 + 70% 见提单复印件付清尾款）。"
        : "Our primary payment terms are Irrevocable Letter of Credit (L/C at Sight) confirmed by a Top-tier international bank, or Telegraphic Transfer (T/T) with a 30% advance deposit and 70% balance against scanning of the original Bill of Lading (B/L) and shipping dockets."
    },
    {
      q: isEs ? "¿Cómo se garantiza el grado de calidad?" 
        : isAr ? "كيف تضمنون جودة ومواصفات التصدير؟"
        : isHi ? "आप निर्यात ग्रेड और विशिष्टताओं की गारंटी कैसे देते हैं?"
        : isZh ? "你们如何确保出口商品的质量规格？"
        : "How do you guarantee export grade and specifications?",
      a: isEs ? "Todos nuestros lotes de commodities se someten a análisis de calidad e inspecciones previas al embarque a cargo de SGS o Intertek antes del llenado del contenedor. Entregamos certificados de peso y pureza oficiales."
        : isAr ? "تخضع جميع السلع الزراعية لتصنيف جزيئي، وفحوصات متبقيات المبيدات الكيميائية، وفحوصات الوزن النهائي المعتمدة من SGS أو Intertek قبل إغلاق الحاوية مباشرة."
        : isHi ? "सभी कृषि उत्पाद एसजीएस (SGS), इंटरटेक या यूरोफिन्स द्वारा प्रमाणित भौतिक ग्रेडिंग, रासायनिक अवशेषों की जांच और अंतिम वजन निरीक्षण से गुजरते हैं। कंटेनर सील होने से ठीक पहले परीक्षण होता है।"
        : isZh ? "所有大宗农产品在集装箱装运封箱前，都必须通过 SGS、Intertek 或 Eurofins 的物理分级、化学残留检测以及最终重量核验，并出具官方检疫检验证书。"
        : "All agricultural commodities undergo physical grading, chemical residue checks, and final weight inspections certified by SGS, Intertek, or Eurofins. Testing occurs at terminal packing centers directly prior to sealing the container."
    },
    {
      q: isEs ? "¿Cuál es la Cantidad Mínima de Pedido (MOQ)?" 
        : isAr ? "ما هو الحد الأدنى لكمية الطلب (MOQ)؟"
        : isHi ? "आपकी न्यूनतम ऑर्डर मात्रा (MOQ) क्या है?"
        : isZh ? "你们的最小起订量 (MOQ) 是多少？"
        : "What is your Minimum Order Quantity (MOQ)?",
      a: isEs ? "Nuestros pedidos mínimos estándar varían según el producto, pero generalmente se fijan en 10 a 15 Toneladas Métricas (FCL de 20 pies) para frutos secos de alto valor, y 20 a 24 Toneladas Métricas para granos a granel."
        : isAr ? "الحد الأدنى للطلب للتصدير لدينا هو حمولة حاوية كاملة (FCL). يتراوح هذا بين 10 إلى 15 طناً مترياً للمكسرات عالية القيمة، و20 إلى 25 طناً مترياً للحبوب السائبة."
        : isHi ? "हमारा मानक निर्यात MOQ एक पूर्ण कंटेनर लोड (FCL) है। यह उच्च मूल्य वाले सूखे मेवों के लिए 10 से 15 मीट्रिक टन और बल्क अनाज के लिए 20 से 25 मीट्रिक टन तक होता है।"
        : isZh ? "我们的标准出口最小起订量为一整柜 (FCL)。高价值坚果（如真空包装的 W240 腰果）起订量通常为 10 至 15 公吨，大宗谷物和去油豆粕起订量通常为 20 至 25 公吨。"
        : "Our standard export MOQ is one Full Container Load (FCL). This ranges from 10 to 15 Metric Tons for high-value dry fruits like W240 Cashews in vacuum packing, and 20 to 25 Metric Tons for bulk grains and de-oiled soybean meal."
    },
    {
      q: isEs ? "¿Ofrecen servicios de empaque personalizado?" 
        : isAr ? "هل تقدمون خدمات التعبئة المخصصة لعلامة العميل؟"
        : isHi ? "क्या आप निजी-लेबल अनुकूलित पैकेजिंग की पेशकश करते हैं?"
        : isZh ? "你们是否提供自有品牌定制包装服务？"
        : "Do you offer private-label customized packaging?",
      a: isEs ? "Sí, admitimos empaque OEM y marca blanca. Ofrecemos latas al vacío, bolsas de polietileno BOPP laminadas, sacos de yute y cajas impresas con las marcas de los clientes."
        : isAr ? "نعم، نحن ندعم التعبئة المخصصة بالكامل (OEM) لإعادة التعبئة بالتجزئة. يشمل ذلك أكياس BOPP المطبوعة متعددة الألوان، وعلب المفرغة من الهواء، والكراتين الخارجية المخصصة."
        : isHi ? "हां, हम खुदरा पैकेजिंग के लिए व्यापक निजी लेबलिंग (OEM) का समर्थन करते हैं। इसमें बहुरंगी मुद्रित बीओपीपी बैग, वैक्यूम टिन और कस्टम-ब्रांडेड बाहरी कार्टन शामिल हैं।"
        : isZh ? "是的，我们为零售再包装提供全面的代工（OEM）和白牌定制服务。包括多色印刷的 BOPP 包装袋、真空金属罐，以及印有您品牌 Logo 的定制外纸箱。"
        : "Yes, we support comprehensive private labeling (OEM) for retail repackaging. This includes multi-color printed BOPP bags, vacuum tins, and custom-branded outer cartons matching your structural and layout designs."
    },
    {
      q: isEs ? "¿Cómo manejan los retrasos en las aduanas?" 
        : isAr ? "كيف تقللون من تأخيرات الجمارك؟"
        : isHi ? "आप सीमा शुल्क में होने वाले विलंभ को कैसे कम करते हैं?"
        : isZh ? "你们如何减少起运港和目的港的海关延误？"
        : "How do you minimize terminal or customs delays?",
      a: isEs ? "Presentamos electrónicamente todos los manifiestos de importación con antelación y enviamos los documentos de despacho (factura consular, origen, fitosanitario, peso) al agente aduanal de destino antes del arribo del buque."
        : isAr ? "نحن نقدم بيانات الشحن إلكترونياً مسبقاً، ونقوم بتسليم وثائق التخليص (الشهادة الصحية النباتية، شهادة المنشأ، وفواتير القنصلية) إلى وكيلك قبل تفريغ السفينة لتقليص مدة التخليص إلى أقل من 48 ساعة."
        : isHi ? "हम शिपिंग मेनिफेस्ट को इलेक्ट्रॉनिक रूप से प्री-फाइल करते हैं और जहाज के डिस्चार्ज होने से पहले आपके ब्रोकर को स्पष्ट दस्तावेज (पादप स्वच्छता प्रमाण पत्र, मूल प्रमाण पत्र, वजन पत्रक और वाणिज्य दूतावास चालान) वितरित करते हैं, जिससे मंजूरी का समय 48 घंटे से कम हो जाता है।"
        : isZh ? "我们提前进行电子化申报并发送预报关舱单，在船舶抵港前将全套清关单证（植物检疫证书、原产地证书、官方重量单及领事发票）寄达您的清关行，将港口放行时间缩短至 48 小时以内。"
        : "We pre-file shipping manifests electronically and deliver clear documentation (Phytosanitary certificate, certificate of origin, weight sheets, and consular invoices) to your broker prior to vessel discharge, reducing terminal gates clearing to under 48 hours."
    }
  ];
}

function getNews(lang: Language) {
  const isEs = lang === 'es';
  const isAr = lang === 'ar';
  const isHi = lang === 'hi';
  const isZh = lang === 'zh';

  return [
    {
      date: isEs ? '05 de Julio, 2026' : isAr ? '٠٥ يوليو ٢٠٢٦' : isHi ? '०५ जुलाई, २०२६' : isZh ? '2026年07月05日' : 'July 05, 2026',
      title: isEs ? "Informe de Sourcing: Cosecha de Anacardos" : isAr ? "تقرير مصادر كاجو الساحل الغربي للهند" : isHi ? "पश्चिमी तट काजू फसल सोर्सिंग रिपोर्ट" : isZh ? "西海岸腰果作物采收与市场采购报告" : "West Coast Cashew Harvest Sourcing Report",
      desc: isEs ? "Perspectiva analítica sobre rendimientos de anacardos, estimaciones de densidad y proyecciones de precios globales."
        : isAr ? "رؤية تحليلية لإنتاجية الكاجو الخام عبر غوا الساحلية، وتقديرات كثافة الفرز، وتوقعات الأسعار العالمية."
        : isHi ? "तटीय गोवा में कच्चे काजू की पैदावार, छंटाई घनत्व अनुमान और वैश्विक मूल्य अनुमानों पर एक विश्लेषणात्मक दृष्टिकोण।"
        : isZh ? "针对果阿沿海地区生腰果产量的深度分析报告，包含品质分级预估及全球采购价格走势预测。"
        : "An analytical outlook on raw cashew yields across coastal Goa, sorting density estimates, and global price projections.",
      category: isEs ? "Inteligencia de Cultivos" : isAr ? "معلومات المحاصيل" : isHi ? "फसल बुद्धिमत्ता" : isZh ? "作物市场情报" : "Crop Intelligence",
      img: cashewImg
    },
    {
      date: isEs ? '22 de Junio, 2026' : isAr ? '٢٢ يونيو ٢٠٢٦' : isHi ? '२२ जून, २०२६' : isZh ? '2026年06月22日' : 'June 22, 2026',
      title: isEs ? "Nuevas Regulaciones Fitosanitarias de la UE" : isAr ? "تحديثات حدود متبقيات المبيدات في الاتحاد الأوروبي" : isHi ? "यूरोपीय संघ खाद्य सुरक्षा कीटनाशक सीमा अपडेट" : isZh ? "欧盟食品安全农残限量最新合规标准" : "EU Food Safety Pesticide Limit Updates",
      desc: isEs ? "Nuestro análisis sobre tolerancias actualizadas de residuos de plaguicidas para especias y semillas oleaginosas."
        : isAr ? "تحليل مكتبنا التجاري لتحمل متبقيات المبيدات المحدثة للتوابل والبذور الزيتية التي تدخل الموانئ الأوروبية."
        : isHi ? "यूरोपीय बंदरगाहों में प्रवेश करने वाले मसालों और तिलहनों के लिए अद्यतन कीटनाशक अवशेष सहिष्णुता का हमारा व्यापार विश्लेषण।"
        : isZh ? "针对进入欧洲港口的香料和油料作物更新后的农药残留限量，由我司合规部门出具的合规性指引与分析。"
        : "Our trade desk analysis of the updated pesticide residue tolerances for spices and oilseeds entering European ports.",
      category: isEs ? "Cumplimiento" : isAr ? "الامتثال" : isHi ? "अनुपालन" : isZh ? "贸易合规" : "Compliance",
      img: broccoliImg
    },
    {
      date: isEs ? '18 de Mayo, 2026' : isAr ? '١٨ مايو ٢٠٢٦' : isHi ? '१८ मई, २०२६' : isZh ? '2026年05月18日' : 'May 18, 2026',
      title: isEs ? "Estrategia Marítima: Mitigación de Demoras" : isAr ? "تخفيف الازدحام البحري باستخدام الحاويات الذكية" : isHi ? "स्मार्ट रीफर्स के साथ समुद्री भीड़भाड़ को कम करना" : isZh ? "利用智能冷链监控降低海运堵塞期间货损率" : "Mitigating Oceanic Congestion with Smart Reefers",
      desc: isEs ? "Cómo los sensores IoT evitan fallas en cadena de frío durante cuellos de botella en centros de transbordo primarios."
        : isAr ? "كيف تمنع مستشعرات إنترنت الأشياء من سيتراك فشل سلسلة التبريد أثناء اختناقات الشحن في محاور إعادة الشحن الرئيسية."
        : isHi ? "मुख्य पारगमन केंद्रों पर शिपिंग बाधाओं के दौरान सीट्रैक आईओटी सेंसर कोल्ड-चेन विफलताओं को कैसे रोकते हैं।"
        : isZh ? "在主要中转枢纽港口发生海运堵塞时，Seatruck 部署的物联网 (IoT) 遥感技术如何动态保障冷链不中断。"
        : "How Seatruck IoT sensors prevent cold-chain failures during shipping bottlenecks at primary transshipment hubs.",
      category: isEs ? "Logística Marítima" : isAr ? "اللوجستيات البحرية" : isHi ? "समुद्री रसद" : isZh ? "航运物流" : "Maritime Logistics",
      img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"
    }
  ];
}

function getJobs(lang: Language) {
  const isEs = lang === 'es';
  const isAr = lang === 'ar';
  const isHi = lang === 'hi';
  const isZh = lang === 'zh';

  return [
    {
      title: isEs ? "Comerciante Agrícola Global Senior" 
        : isAr ? "أخصائي تداول زراعي عالمي أول" 
        : isHi ? "वरिष्ठ वैश्विक कृषि व्यापारी" 
        : isZh ? "资深全球大宗农产品交易员" 
        : "Senior Global Agricultural Trader",
      dept: isEs ? "Mesa de Comercio, Mumbai" 
        : isAr ? "مكتب التجارة، مومباي" 
        : isHi ? "ट्रेड डेस्क, मुंबई" 
        : isZh ? "大宗商品交易部（孟买总部）" 
        : "Trade Desk, Mumbai",
      type: isEs ? "Tiempo Completo" 
        : isAr ? "دوام كامل" 
        : isHi ? "पूर्णकालिक कॉर्पोरेट" 
        : isZh ? "全职（集团总部编制）" 
        : "Full-Time Corporate",
      desc: isEs ? "Responsable de gestionar contratos de granos a granel, soja y negociación de cartas de crédito con compradores internacionales."
        : isAr ? "مسؤول عن إدارة الحبوب السائبة وعقود الصويا ومفاوضات خطابات الاعتماد السيادية مع المشترين الدوليين."
        : isHi ? "अंतर्राष्ट्रीय खरीदारों के साथ थोक अनाज, सोयाबीन अनुबंध और संप्रभु एल/सी वार्ता के प्रबंधन के लिए जिम्मेदार।"
        : isZh ? "负责大宗谷物、大豆国际采购合同的管理工作，以及与海外买方进行即期/远期银行信用证条款谈判。"
        : "Responsible for managing bulk grains, soybean contracts, and sovereign L/C negotiation with international buyers."
    },
    {
      title: isEs ? "Líder de Operaciones Logísticas Portuarias" 
        : isAr ? "مسؤول عمليات اللوجستيات في الموانئ" 
        : isHi ? "पोर्ट लॉजिस्टिक्स ऑपरेशंस लीड" 
        : isZh ? "港口装运与物流运营主管" 
        : "Port Logistics Operations Lead",
      dept: isEs ? "Centro Logístico, Mundra" 
        : isAr ? "مركز اللوجستيات، موندرا" 
        : isHi ? "लॉजिस्टिक्स हब, मुंद्रा" 
        : isZh ? "港口运营中心（蒙德拉港）" 
        : "Logistics Hub, Mundra",
      type: isEs ? "En el Sitio" 
        : isAr ? "في الموقع" 
        : isHi ? "ऑन-साइट ऑपरेशंस" 
        : isZh ? "驻港（蒙德拉港现场实地编制）" 
        : "On-Site Operations",
      desc: isEs ? "Supervisión del embalaje de contenedores previo al embarque, despliegue de sensores de registro térmico y coordinación en aduanas."
        : isAr ? "الإشراف على تعبئة الحاويات قبل الشحن، ونشر أجهزة استشعار تسجيل درجات الحرارة، والتنسيق مع الجمارك."
        : isHi ? "पूर्व-शिपमेंट कंटेनर पैकिंग, तापमान लॉगर सेंसर तैनाती और टर्मिनल गेट समन्वय की देखरेख करना।"
        : isZh ? "负责装船前集装箱打打包、安装冷链温度及遥控遥测感应，并协调口岸海运出口通关放行。"
        : "Overseeing pre-shipment container packing, temperature logger sensor deployments, and terminal gate coordination."
    },
    {
      title: isEs ? "Químico de Aseguramiento de Calidad" 
        : isAr ? "كيميائي لضمان الجودة" 
        : isHi ? "गुणवत्ता आश्वासन रसायनज्ञ" 
        : isZh ? "植物检疫与大宗质量检测化学分析员" 
        : "Quality Assurance Chemist",
      dept: isEs ? "Laboratorio Fitosanitario, Gujarat" 
        : isAr ? "مختبر الصحة النباتية، غوجارات" 
        : isHi ? "फाइटोसैनिटरी प्रयोगशाला, गुजरात" 
        : isZh ? "植物卫生检疫实验室（古吉拉特邦）" 
        : "Phytosanitary Laboratory, Gujarat",
      type: isEs ? "Rol Técnico en Laboratorio" 
        : isAr ? "دور تقني في المختبر" 
        : isHi ? "तकनीकी लैब भूमिका" 
        : isZh ? "技术类（实验室编制）" 
        : "Technical Lab Role",
      desc: isEs ? "Pruebas de productos agrícolas frente a las directivas de límites de plaguicidas europeos y preparación de actas de clasificación."
        : isAr ? "اختبار السلع الزراعية مقابل توجيهات حدود المبيدات الأوروبية وإعداد تقارير تصنيف معتمدة."
        : isHi ? "यूरोपीय कीटनाशक सीमा निर्देशों के खिलाफ कच्चे उत्पादों का परीक्षण करना और प्रमाणित ग्रेडिंग डॉकेट तैयार करना।"
        : isZh ? "负责对照欧盟农药残留限量的最新指令测试农产原料样品，并编制经官方实验室认证的品质检验证书。"
        : "Testing raw commodities against European pesticide limit directives and preparing certified grading dockets."
    }
  ];
}

export default function CompanyResources({ lang, activeSection, onNavigate }: CompanyResourcesProps) {
  const t = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cvSubmitted, setCvSubmitted] = useState(false);

  const FAQS = getFaqs(lang);
  const NEWS = getNews(lang);
  const JOBS = getJobs(lang);

  const handleCvSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCvSubmitted(true);
    setTimeout(() => setCvSubmitted(false), 5000);
  };

  if (activeSection === 'news') {
    return (
      <div id="news-page-root" className="bg-[#f8fafc] text-slate-900 min-h-screen text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* ================= PAGE HEADER ================= */}
        <section className="bg-gradient-to-br from-[#0c132a] via-[#080d1e] to-[#04060f] text-white py-20 relative select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
              <span>{t.hero_news_badge}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              {t.hero_news_title}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              {t.hero_news_desc}
            </p>
          </div>
        </section>

        {/* ================= BREADCRUMBS ================= */}
        <div className="bg-white border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
            <button onClick={() => onNavigate('home')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">HOME</button>
            <span>/</span>
            <span className="text-slate-700 uppercase">{t.breadcrumbs_news}</span>
          </div>
        </div>

        {/* ================= NEWS GRID ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {NEWS.map((n, idx) => (
                <div key={idx} className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-emerald-500/35 transition-colors text-left flex flex-col justify-between">
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <span className="absolute top-3 left-3 bg-slate-900/90 text-emerald-400 text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border border-slate-700">
                        {n.category}
                      </span>
                    </div>
                    <div className="p-6 space-y-2">
                      <span className="text-[10px] text-slate-400 font-mono block">{n.date}</span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">{n.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed font-medium">{n.desc}</p>
                    </div>
                  </div>
                  <div className="p-6 border-t border-slate-150 flex items-center justify-between text-[11px] font-mono text-emerald-600 font-bold uppercase">
                    <span>{t.read_report}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    );
  }

  if (activeSection === 'faqs') {
    return (
      <div id="faqs-page-root" className="bg-[#f8fafc] text-slate-900 min-h-screen text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* ================= PAGE HEADER ================= */}
        <section className="bg-gradient-to-br from-[#0c132a] via-[#080d1e] to-[#04060f] text-white py-20 relative select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
              <span>{t.hero_faqs_badge}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              {t.hero_faqs_title}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              {t.hero_faqs_desc}
            </p>
          </div>
        </section>

        {/* ================= BREADCRUMBS ================= */}
        <div className="bg-white border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
            <button onClick={() => onNavigate('home')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">HOME</button>
            <span>/</span>
            <span className="text-slate-700 uppercase">{t.breadcrumbs_faqs}</span>
          </div>
        </div>

        {/* ================= FAQS ACCORDION ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-slate-50 transition-all">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5.5 text-left flex justify-between items-center bg-slate-50 font-bold text-xs sm:text-sm text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4.5 h-4.5 text-emerald-600" /> : <ChevronDown className="w-4.5 h-4.5 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-5.5 bg-white border-t border-slate-200 text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    );
  }

  // Render Careers Page
  return (
    <div id="careers-page-root" className="bg-[#f8fafc] text-slate-900 min-h-screen text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* ================= PAGE HEADER ================= */}
      <section className="bg-gradient-to-br from-[#0c132a] via-[#080d1e] to-[#04060f] text-white py-20 relative select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
            <span>{t.hero_careers_badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            {t.hero_careers_title}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
            {t.hero_careers_desc}
          </p>
        </div>
      </section>

      {/* ================= BREADCRUMBS ================= */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">HOME</button>
          <span>/</span>
          <span className="text-slate-700 uppercase">{t.breadcrumbs_careers}</span>
        </div>
      </div>

      {/* ================= JOBS SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Open jobs list */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[10px] font-bold font-mono text-emerald-600 uppercase tracking-widest block">{t.vacancies_badge}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">{t.vacancies_title}</h2>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">{t.vacancies_desc}</p>
              
              <div className="space-y-6 pt-4 border-t border-slate-100">
                {JOBS.map((job, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                        <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{job.dept}</span>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase">{job.type}</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Upload Form */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">{t.submit_title}</h3>
              
              {cvSubmitted ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-900">{t.success_title}</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed font-medium">{t.success_desc}</p>
                </div>
              ) : (
                <form onSubmit={handleCvSubmit} className="space-y-4 text-left text-xs font-semibold text-slate-700">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500">{t.label_name}</label>
                    <input required type="text" className="w-full px-4 py-3 bg-white border border-slate-250 rounded-xl font-normal text-xs text-slate-800" placeholder="e.g. Rahul Sharma" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500">{t.label_email}</label>
                    <input required type="email" className="w-full px-4 py-3 bg-white border border-slate-250 rounded-xl font-normal text-xs text-slate-800" placeholder="r.sharma@gmail.com" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500">{t.label_cover}</label>
                    <textarea required rows={3} className="w-full px-4 py-3 bg-white border border-slate-250 rounded-xl font-normal text-xs text-slate-800 focus:outline-none" placeholder="Detail your previous trade or customs operations experience..."></textarea>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-500">{t.label_resume}</label>
                    <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                      <span className="block text-[11px] text-slate-500">{t.drag_drop}</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl text-center cursor-pointer block"
                  >
                    {t.btn_submit}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
