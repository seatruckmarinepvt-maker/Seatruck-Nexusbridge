/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, ShieldAlert, Scale, HelpCircle, Compass, Home } from 'lucide-react';
import { Language } from '../../types';

interface LegalAndMiscProps {
  lang: Language;
  activeSection: 'privacy' | 'terms' | '404';
  onNavigate: (page: string) => void;
}

const LOCAL_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    privacy_badge: "Regulatory Compliance",
    privacy_title: "Corporate Privacy Policy",
    privacy_desc: "Last updated: July 14, 2026. Governing client data specifications, banking parameters, and terminal logs.",
    breadcrumbs_privacy: "PRIVACY POLICY",
    p1_title: "1. Trade Specification Encryption",
    p1_desc: "At SEATRUCK NEXUSBRIDGE, we prioritize your corporate sourcing parameters and banking Letters of Credit. All data entered into our contact forms, quotation portals, or telemetry systems is immediately encrypted under AES-256 protocols before being committed to our secure databases.",
    p2_title: "2. Port Vitals & Manifest Data",
    p2_desc: "We collect essential logistics information including shipment numbers, target discharge ports, weights, and packaging requirements solely to formulate trade proposals, pre-file customs manifests, and secure booking spaces on container vessels.",
    p3_title: "3. Zero Third-Party Sharing",
    p3_desc: "Seatruck does not trade, broker, or sell any client specifications to third-party market brokers. Data is shared strictly with port customs bureaus, accredited laboratories (SGS), and primary container carriers to fulfill transport contracts.",
    p4_title: "4. Contact Rights & Auditing",
    p4_desc: "Clients retain full auditing rights and can request the complete erasure of their trade profiles, previous dockets, or transmitted CV forms from our active registries by writing directly to compliance@seatrucknexus.com.",

    terms_badge: "Maritime Terms",
    terms_title: "Terms & Conditions",
    terms_desc: "Last updated: July 14, 2026. Governed by INCOTERMS 2020 rules for global container transport.",
    breadcrumbs_terms: "TERMS & CONDITIONS",
    t1_title: "1. INCOTERMS 2020 Standard Compliance",
    t1_desc: "All sales contracts, proforma invoices, and freight scheduling are formulated in strict accordance with the International Chamber of Commerce INCOTERMS 2020 rules. Unless specified, pricing reflects FOB (Free on Board) load ports Nhava Sheva/Mundra, or CIF (Cost, Insurance, and Freight) destination ports.",
    t2_title: "2. Letter of Credit (L/C) Verification",
    t2_desc: "Irrevocable Letters of Credit (L/C) at Sight must be opened through a first-class global bank and verified by our partner trade bank in Mumbai within 10 business days of contract confirmation. Any delay in L/C opening waives our delivery SLA parameters.",
    t3_title: "3. Phytosanitary Grade Tolerances",
    t3_desc: "Our commodities conform exactly to the quality grade specifications outlined in our contract sheets. Quality limits are certified pre-shipment by SGS. No quality or moisture weight claims are accepted once the container seal is broken at the destination port, unless certified by an independent surveyor at the time of discharge.",
    t4_title: "4. Demurrage and Force Majeure",
    t4_desc: "Seatruck is not responsible for port gate blockages, customs inspection delays, or shipping lane rerouting caused by force majeure events, maritime strikes, or military actions. Demurrage penalties accumulated at destination port due to delayed client manifest clearing are the sole responsibility of the consignee.",

    notfound_title: "Maritime Coordinates Lost",
    notfound_desc: "The trade route coordinates you entered are not logged in our secure port database. Check the URL or return to our central terminal homepage below:",
    btn_return: "Return to Terminal",
  },
  es: {
    privacy_badge: "Cumplimiento legal",
    privacy_title: "Política de Privacidad de Datos",
    privacy_desc: "Última actualización: 14 de julio de 2026. Rige especificaciones de datos de clientes, parámetros bancarios y registros.",
    breadcrumbs_privacy: "POLÍTICA DE PRIVACIDAD",
    p1_title: "1. Cifrado de Especificaciones Comerciales",
    p1_desc: "En SEATRUCK NEXUSBRIDGE, priorizamos sus parámetros corporativos de aprovisionamiento y cartas de crédito. Todos los datos ingresados en formularios o portales se cifran inmediatamente bajo protocolos AES-256 antes de guardarse.",
    p2_title: "2. Datos de Manifiestos y Puertos",
    p2_desc: "Recopilamos información logística esencial, incluidos números de envío, puertos de descarga, pesos y requisitos de empaque, únicamente para formular propuestas comerciales y asegurar reservas de transporte.",
    p3_title: "3. Sin Intercambio con Terceros",
    p3_desc: "Seatruck no comercializa ni vende especificaciones de clientes a corredores de mercado. Se comparten estrictamente con aduanas, laboratorios acreditados (SGS) y transportistas marítimos primarios.",
    p4_title: "4. Derechos de Contacto y Auditoría",
    p4_desc: "Los clientes conservan plenos derechos de auditoría y pueden solicitar la eliminación total de sus perfiles comerciales enviando un correo a compliance@seatrucknexus.com.",

    terms_badge: "Condiciones Marítimas",
    terms_title: "Términos y Condiciones Comerciales",
    terms_desc: "Última actualización: 14 de julio de 2026. Regulado por las reglas INCOTERMS 2020 para transporte de contenedores.",
    breadcrumbs_terms: "TÉRMINOS Y CONDICIONES",
    t1_title: "1. Cumplimiento del Estándar INCOTERMS 2020",
    t1_desc: "Todos los contratos de venta y facturas se formulan de acuerdo estricto con las reglas INCOTERMS 2020 de la Cámara de Comercio Internacional. Salvo especificación contraria, los precios reflejan FOB en puertos de carga Nhava Sheva/Mundra, o CIF en puertos de destino.",
    t2_title: "2. Verificación de Cartas de Crédito (L/C)",
    t2_desc: "Las cartas de crédito irrevocables a la vista deben abrirse mediante un banco global de primer nivel y verificarse por nuestro banco comercial socio en Mumbai dentro de los 10 días hábiles posteriores a la confirmación.",
    t3_title: "3. Tolerancias de Grado Fitosanitario",
    t3_desc: "Nuestros productos cumplen con las especificaciones del contrato. Los límites se certifican antes del embarque por SGS. No se aceptan reclamaciones una vez roto el sello del contenedor en destino.",
    t4_title: "4. Demoras y Fuerza Mayor",
    t4_desc: "Seatruck no se hace responsable de bloqueos portuarios, demoras en aduanas o desvíos causados por fuerza mayor, huelgas o acciones militares. Las multas por estadía acumuladas son responsabilidad del consignatario.",

    notfound_title: "Coordenadas Marítimas Perdidas",
    notfound_desc: "Las coordenadas de la ruta comercial ingresada no están registradas en nuestra base de datos. Verifique la dirección o regrese a la página de inicio del terminal:",
    btn_return: "Regresar al Terminal",
  },
  ar: {
    privacy_badge: "الامتثال التنظيمي",
    privacy_title: "سياسة خصوصية الشركة",
    privacy_desc: "آخر تحديث: ١٤ يوليو ٢٠٢٦. تحكم مواصفات بيانات العملاء، والمعايير المصرفية، وسجلات المحطة.",
    breadcrumbs_privacy: "سياسة الخصوصية",
    p1_title: "١. تشفير مواصفات التجارة",
    p1_desc: "في سيتراك نكسس بريدج، نعطي الأولوية لمعايير التوريد الخاصة بشركتك وخطابات الاعتماد البنكية. يتم تشفير جميع البيانات المدخلة في نماذج الاتصال على الفور بموجب بروتوكولات AES-256 قبل حفظها.",
    p2_title: "٢. البيانات الحيوية للموانئ وبيانات الشحن",
    p2_desc: "نحن نجمع المعلومات اللوجستية الأساسية بما في ذلك أرقام الشحنات، وموانئ التفريغ المستهدفة، والأوزان، ومتطلبات التعبئة فقط لصياغة العروض التجارية وتأمين مساحات الحجز.",
    p3_title: "٣. عدم المشاركة مع أطراف ثالثة",
    p3_desc: "لا تقوم سيتراك بالمتاجرة بمواصفات العميل أو بيعها لسماسرة السوق الخارجيين. يتم مشاركة البيانات بدقة مع مكاتب الجمارك والمختبرات المعتمدة (SGS).",
    p4_title: "٤. حقوق الاتصال والتدقيق",
    p4_desc: "يحتفظ العملاء بحقوق التدقيق الكاملة ويمكنهم طلب المحو الكامل لملفاتهم التجارية عن طريق الكتابة مباشرة إلى compliance@seatrucknexus.com.",

    terms_badge: "الشروط البحرية",
    terms_title: "الشروط والأحكام",
    terms_desc: "آخر تحديث: ١٤ يوليو ٢٠٢٦. تخضع لقواعد INCOTERMS 2020 لنقل الحاويات العالمي.",
    breadcrumbs_terms: "الشروط والأحكام",
    t1_title: "١. الامتثال لمعايير INCOTERMS 2020",
    t1_desc: "تتم صياغة جميع عقود البيع والفواتير الأولية وجداول الشحن وفقاً لقواعد غرفة التجارة الدولية INCOTERMS 2020. يعكس التسعير تسليم FOB موانئ التحميل، أو تسليم CIF موانئ الوجهة.",
    t2_title: "٢. التحقق من خطاب الاعتماد (L/C)",
    t2_desc: "يجب فتح خطابات الاعتماد غير القابلة للإلغاء من خلال بنك عالمي من الدرجة الأولى والتحقق منها من قبل بنك التجارة الشريك لنا في مومباي في غضون ١٠ أيام عمل.",
    t3_title: "٣. التسامح في درجات الصحة النباتية",
    t3_desc: "تتوافق سلعنا تماماً مع مواصفات الجودة الموضحة. يتم اعتماد حدود الجودة قبل الشحن بواسطة SGS. لا يتم قبول مطالبات بعد كسر ختم الحاوية في ميناء الوجهة.",
    t4_title: "٤. غرامات التأخير والقوة القاهرة",
    t4_desc: "سيتراك ليست مسؤولة عن إغلاق بوابات الموانئ أو تأخير التفتيش الجمركي الناتج عن أحداث القوة القاهرة أو الإضرابات. الغرامات المتراكمة تقع على عاتق المرسل إليه بالكامل.",

    notfound_title: "فقدان الإحداثيات البحرية",
    notfound_desc: "إحداثيات الطريق التجاري التي أدخلتها غير مسجلة في قاعدة بياناتنا الآمنة. تحقق من الرابط أو عد إلى الصفحة الرئيسية للمحطة:",
    btn_return: "العودة إلى المحطة",
  },
  hi: {
    privacy_badge: "नियामक अनुपालन",
    privacy_title: "कॉर्पोरेट गोपनीयता नीति",
    privacy_desc: "अंतिम अद्यतन: 14 जुलाई, 2026. ग्राहक डेटा विनिर्देशों, बैंकिंग मापदंडों और टर्मिनल लॉग को नियंत्रित करना।",
    breadcrumbs_privacy: "गोपनीयता नीति",
    p1_title: "1. व्यापार विशिष्टता एन्क्रिप्शन",
    p1_desc: "सीट्रक नेक्ससब्रिज में, हम आपके कॉर्पोरेट सोर्सिंग मापदंडों और बैंकिंग साख पत्रों को प्राथमिकता देते हैं। हमारे फॉर्म या पोर्टल में दर्ज सभी डेटा हमारे सुरक्षित डेटाबेस में सहेजने से पहले तुरंत AES-256 प्रोटोकॉल के तहत एन्क्रिप्ट किए जाते हैं।",
    p2_title: "2. पोर्ट वीटल्स और मेनिफेस्ट डेटा",
    p2_desc: "हम शिपमेंट संख्या, लक्षित बंदरगाह, वजन और पैकेजिंग आवश्यकताओं सहित आवश्यक लॉजिस्टिक्स जानकारी केवल व्यापार प्रस्तावों को तैयार करने और परिवहन बुक करने के लिए एकत्र करते हैं।",
    p3_title: "3. शून्य तृतीय-पक्ष साझाकरण",
    p3_desc: "सीट्रैक तृतीय-पक्ष बाजार दलालों को किसी भी ग्राहक विनिर्देशों का व्यापार या बिक्री नहीं करता है। डेटा केवल सीमा शुल्क ब्यूरो, प्रमाणित प्रयोगशालाओं (SGS) और परिवहन अनुबंधों को पूरा करने वाले जहाजों के साथ साझा किया जाता है।",
    p4_title: "4. संपर्क अधिकार और लेखा परीक्षा",
    p4_desc: "ग्राहकों के पास पूर्ण ऑडिटिंग अधिकार हैं और वे compliance@seatrucknexus.com पर सीधे लिखकर हमारे सक्रिय रजिस्ट्रियों से अपनी सहेजी गई जानकारी को हटाने का अनुरोध कर सकते हैं।",

    terms_badge: "समुद्री शर्तें",
    terms_title: "नियम एवं शर्तें",
    terms_desc: "अंतिम अद्यतन: 14 जुलाई, 2026. वैश्विक कंटेनर परिवहन के लिए इनकोटर्म्स 2020 नियमों द्वारा शासित।",
    breadcrumbs_terms: "नियम एवं शर्तें",
    t1_title: "1. इनकोटर्म्स 2020 मानक अनुपालन",
    t1_desc: "सभी बिक्री अनुबंध, प्रोफार्मा चालान और माल ढुलाई शेड्यूलिंग इंटरनेशनल चैंबर ऑफ कॉमर्स इनकोटर्म्स 2020 नियमों के अनुसार तैयार किए जाते हैं। मूल्य निर्धारण FOB या CIF गंतव्य बंदरगाहों को दर्शाता है।",
    t2_title: "2. साख पत्र (L/C) सत्यापन",
    t2_desc: "अपरिवर्तनीय साख पत्र (L/C) को अनुबंध की पुष्टि के 10 व्यावसायिक दिनों के भीतर मुंबई में हमारे भागीदार व्यापार बैंक द्वारा सत्यापित किया जाना चाहिए।",
    t3_title: "3. पादप स्वच्छता ग्रेड सहनशीलता",
    t3_desc: "हमारे उत्पाद अनुबंध के विनिर्देशों के बिल्कुल अनुरूप हैं। गुणवत्ता सीमाएं एसजीएस (SGS) द्वारा शिपमेंट से पहले प्रमाणित की जाती हैं। गंतव्य बंदरगाह पर कंटेनर सील टूटने के बाद कोई दावा स्वीकार नहीं किया जाता है।",
    t4_title: "4. विलंब शुल्क और अप्रत्याशित घटना",
    t4_desc: "सीट्रैक अप्रत्याशित घटनाओं, हड़तालों या सैन्य कार्रवाइयों के कारण होने वाली बंदरगाह नाकेबंदी या देरी के लिए जिम्मेदार नहीं है। विलंब शुल्क की संचित जिम्मेदारी पूरी तरह से खरीदार की है।",

    notfound_title: "समुद्री निर्देशांक खो गए",
    notfound_desc: "आपके द्वारा दर्ज किए गए व्यापार मार्ग निर्देशांक हमारे सुरक्षित डेटाबेस में दर्ज नहीं हैं। URL की जाँच करें या हमारे होमपेज पर लौटें:",
    btn_return: "टर्मिनल पर लौटें",
  },
  zh: {
    privacy_badge: "全球贸易法律合规",
    privacy_title: "集团隐私政策声明",
    privacy_desc: "最近更新日期：2026年07月14日。规范客户大宗物料规格参数、银行信用证信息及航运物流数据的隔离与保护。",
    breadcrumbs_privacy: "隐私政策",
    p1_title: "1. 大宗商务往来信息高强度加密",
    p1_desc: "在 SEATRUCK NEXUSBRIDGE，我们深知大宗采购参数与银行跟单信用证等商业机密的重要性。您在询价入口及通关系统中输入的所有信息，均会先通过 AES-256 算法安全加密，之后才提交至离线数据隔离中心保存。",
    p2_title: "2. 港口舱单与货运跟踪数据收集",
    p2_desc: "我们收集包括装船提单号、卸货目的港、毛重/净重以及防潮袋包装尺寸在内的基础物流参数，仅用作向起运港通关申报、代办出口报关单证以及向各大班轮船东预留大宗舱位。",
    p3_title: "3. 严格执行零第三方共享协议",
    p3_desc: "Seatruck 严禁向外部大宗商品中介机构、经纪商出售或租用任何商业规格信息。所有单证仅用于向目的港海关申报、SGS 官方实验室检测出具证书、以及由主承运船东完成运输合同。",
    p4_title: "4. 隐私审计权与记录销毁请求",
    p4_desc: "客户保留全面的合规审计权，您可随时写信给 compliance@seatrucknexus.com 要求我们在结算完毕后彻底销毁或从云端服务器擦除您之前的询盘参数及简历记录。",

    terms_badge: "国际海运与结算条款",
    terms_title: "大宗商品贸易条款及细则",
    terms_desc: "最近更新日期：2026年07月14日。严格遵循国际商会《2020年国际贸易术语解释通则》(INCOTERMS 2020) 框架执行。",
    breadcrumbs_terms: "条款与细则",
    t1_title: "1. 国际商会 INCOTERMS 2020 准则合规",
    t1_desc: "本司执行的所有大宗贸易合同、形式发票及船期订舱单，均默认根据 INCOTERMS 2020 执行。除非在书面合同中另有约定，所有报价均为 FOB（ Nhava Sheva / Mundra 港离岸价）或 CIF（包含海运费及保险费到达目的港价格）。",
    t2_title: "2. 不可撤销信用证 (L/C) 审证要求",
    t2_desc: "不可撤销即期信用证（L/C at Sight）必须通过全球一流银行开立，且必须在合同签订后 10 个工作日内寄达我司孟买或迪拜外汇结算行审证。因开证延迟导致的滞港及误船责任由买方承担。",
    t3_title: "3. 植物卫生检疫偏差与质量偏差免责细则",
    t3_desc: "我们承运的每批谷物、香料、坚果规格均完全契合合同大纲。品质规格均已在集装箱装运前通过 SGS 实验室测定。集装箱封皮封条在目的港被买方拆卸破损后，本司不再受理因水分、霉变或分级偏差提出的任何索赔主张。",
    t4_title: "4. 滞港滞箱费 (Demurrage) 与不可抗力因素",
    t4_desc: "Seatruck 对因恶劣气候、港口罢工、红海局势或不可抗力导致的船舶延误、改道及港口停摆免除一切违约责任。因买方未能及时更换提单、预报关导致的额外海运柜港区超期滞留费用，由收货人自行承担。",

    notfound_title: "航海轨迹偏离数据库",
    notfound_desc: "您所查找的航海线路或贸易港口坐标未收录在我们安全的全球供应链信息库中。请检查您的网址，或点击下方按钮返回集团主控中心：",
    btn_return: "返回主控中心",
  }
};

export default function LegalAndMisc({ lang, activeSection, onNavigate }: LegalAndMiscProps) {
  const t = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];

  if (activeSection === 'privacy') {
    return (
      <div id="privacy-root" className="bg-[#f8fafc] text-slate-900 min-h-screen text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* ================= PAGE HEADER ================= */}
        <section className="bg-gradient-to-br from-[#0c132a] via-[#080d1e] to-[#04060f] text-white py-16 relative select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
              <span>{t.privacy_badge}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              {t.privacy_title}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              {t.privacy_desc}
            </p>
          </div>
        </section>

        {/* ================= BREADCRUMBS ================= */}
        <div className="bg-white border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
            <button onClick={() => onNavigate('home')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">HOME</button>
            <span>/</span>
            <span className="text-slate-700 uppercase font-bold">{t.breadcrumbs_privacy}</span>
          </div>
        </div>

        {/* ================= POLICY DETAIL ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            
            <div className="space-y-3 text-slate-900 font-display">
              <h2 className="text-lg font-bold">{t.p1_title}</h2>
              <p className="text-slate-600 font-sans font-medium">
                {t.p1_desc}
              </p>
            </div>

            <div className="space-y-3 text-slate-900 font-display">
              <h2 className="text-lg font-bold">{t.p2_title}</h2>
              <p className="text-slate-600 font-sans font-medium">
                {t.p2_desc}
              </p>
            </div>

            <div className="space-y-3 text-slate-900 font-display">
              <h2 className="text-lg font-bold">{t.p3_title}</h2>
              <p className="text-slate-600 font-sans font-medium">
                {t.p3_desc}
              </p>
            </div>

            <div className="space-y-3 text-slate-900 font-display">
              <h2 className="text-lg font-bold">{t.p4_title}</h2>
              <p className="text-slate-600 font-sans font-medium">
                {t.p4_desc}
              </p>
            </div>

          </div>
        </section>

      </div>
    );
  }

  if (activeSection === 'terms') {
    return (
      <div id="terms-root" className="bg-[#f8fafc] text-slate-900 min-h-screen text-left" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* ================= PAGE HEADER ================= */}
        <section className="bg-gradient-to-br from-[#0c132a] via-[#080d1e] to-[#04060f] text-white py-16 relative select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
              <span>{t.terms_badge}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              {t.terms_title}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
              {t.terms_desc}
            </p>
          </div>
        </section>

        {/* ================= BREADCRUMBS ================= */}
        <div className="bg-white border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
            <button onClick={() => onNavigate('home')} className="hover:text-emerald-600 transition-colors cursor-pointer uppercase">HOME</button>
            <span>/</span>
            <span className="text-slate-700 uppercase font-bold">{t.breadcrumbs_terms}</span>
          </div>
        </div>

        {/* ================= TERMS DETAIL ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            
            <div className="space-y-3 text-slate-900 font-display">
              <h2 className="text-lg font-bold">{t.t1_title}</h2>
              <p className="text-slate-600 font-sans font-medium">
                {t.t1_desc}
              </p>
            </div>

            <div className="space-y-3 text-slate-900 font-display">
              <h2 className="text-lg font-bold">{t.t2_title}</h2>
              <p className="text-slate-600 font-sans font-medium">
                {t.t2_desc}
              </p>
            </div>

            <div className="space-y-3 text-slate-900 font-display">
              <h2 className="text-lg font-bold">{t.t3_title}</h2>
              <p className="text-slate-600 font-sans font-medium">
                {t.t3_desc}
              </p>
            </div>

            <div className="space-y-3 text-slate-900 font-display">
              <h2 className="text-lg font-bold">{t.t4_title}</h2>
              <p className="text-slate-600 font-sans font-medium">
                {t.t4_desc}
              </p>
            </div>

          </div>
        </section>

      </div>
    );
  }

  // Render 404 Page (NotFound)
  return (
    <div id="notfound-root" className="bg-[#0c132a] text-white min-h-[85vh] flex items-center justify-center relative" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03),transparent_60%)]"></div>
      <div className="max-w-md mx-auto px-6 relative z-10 text-center space-y-6 py-20">
        <Compass className="w-16 h-16 text-emerald-400 mx-auto animate-spin" style={{ animationDuration: '20s' }} />
        <h1 className="text-6xl font-extrabold tracking-tight font-display text-white">404</h1>
        <h2 className="text-lg font-bold">{t.notfound_title}</h2>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
          {t.notfound_desc}
        </p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl cursor-pointer inline-flex items-center gap-2 font-mono"
        >
          <Home className="w-4 h-4" />
          <span>{t.btn_return}</span>
        </button>
      </div>
    </div>
  );
}
