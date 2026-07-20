/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Tag, 
  Globe, 
  Workflow, 
  Compass, 
  CheckCircle, 
  X,
  FileText
} from 'lucide-react';
import { Language, Product } from '../../types';
import { PRODUCTS } from '../../data';
import productsHero from '../../assets/images/seatruck_fruit_hero_banner_1784107067767.jpg';

interface ProductsProps {
  lang: Language;
  selectedProductId?: string;
  initialSearch?: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

// Augment products from data.ts with extra details required by the prompt
function getAugmentedProducts(lang: Language) {
  const defaultLangs: Record<Language, {
    industry_grains: string;
    industry_spices: string;
    industry_dry_fruits: string;
    industry_fresh_produce: string;
    industry_default: string;
    apps_grains: string;
    apps_spices: string;
    apps_dry_fruits: string;
    apps_fresh_produce: string;
    apps_default: string;
    markets: string;
  }> = {
    en: {
      industry_grains: 'Grains Milling & Food Industry',
      industry_spices: 'Spices & Seasoning Industry',
      industry_dry_fruits: 'Dry Fruits & Snack Sector',
      industry_fresh_produce: 'Fresh Produce & Retail',
      industry_default: 'Agribusiness & Food',
      apps_grains: 'Flour Milling, Wholesale Retailing',
      apps_spices: 'Processed Foods, Extraction, Culinary',
      apps_dry_fruits: 'Healthy Snacking, Bakery, Confectionery',
      apps_fresh_produce: 'Supermarket Sourcing, Food Canning',
      apps_default: 'Food Processing, Retail Distribution',
      markets: 'Middle East, EU, Americas'
    },
    es: {
      industry_grains: 'Alimentos e Industrias de Granos',
      industry_spices: 'Especias y Condimentos',
      industry_dry_fruits: 'Frutos Secos y Snacks',
      industry_fresh_produce: 'Productos Frescos y Consumo',
      industry_default: 'Agricultura y Alimentos',
      apps_grains: 'Molienda de Harina, Venta Directa',
      apps_spices: 'Alimentos Procesados, Farmacéutica',
      apps_dry_fruits: 'Snacking, Repostería, Confección',
      apps_fresh_produce: 'Supermercados, Envasado de Fruta',
      apps_default: 'Procesamiento de Alimentos, Retail',
      markets: 'Medio Oriente, Unión Europea, América'
    },
    ar: {
      industry_grains: 'صناعة طحن الحبوب والأغذية',
      industry_spices: 'صناعة البهارات والتوابل',
      industry_dry_fruits: 'قطاع الفواكه الجافة والوجبات الخفيفة',
      industry_fresh_produce: 'المنتجات الطازجة والتجزئة',
      industry_default: 'الصناعات الزراعية والأغذية',
      apps_grains: 'طحن الدقيق، وتجارة التجزئة بالجملة',
      apps_spices: 'الأغذية المصنعة، والاستخلاص، والطهي',
      apps_dry_fruits: 'الوجبات الخفيفة الصحية، والمخبوزات، والحلويات',
      apps_fresh_produce: 'مصادر السوبر ماركت، وتعليب الأغذية',
      apps_default: 'تصنيع الأغذية، وتوزيع التجزئة',
      markets: 'الشرق الأوسط، الاتحاد الأوروبي، الأمريكتان'
    },
    hi: {
      industry_grains: 'अनाज पिसाई और खाद्य उद्योग',
      industry_spices: 'मसाले और सीजनिंग उद्योग',
      industry_dry_fruits: 'ड्राई फ्रूट्स और स्नैक क्षेत्र',
      industry_fresh_produce: 'ताजा उपज और खुदरा',
      industry_default: 'कृषि व्यवसाय और खाद्य',
      apps_grains: 'आटा मिलिंग, थोक खुदरा बिक्री',
      apps_spices: 'प्रसंस्कृत खाद्य पदार्थ, निष्कर्षण, पाक कला',
      apps_dry_fruits: 'स्वस्थ स्नैकिंग, बेकरी, कन्फेक्शनरी',
      apps_fresh_produce: 'सुपरमार्केट सोर्सिंग, खाद्य डिब्बाबंदी',
      apps_default: 'खाद्य प्रसंस्करण, खुदरा वितरण',
      markets: 'मध्य पूर्व, यूरोपीय संघ, अमेरिका'
    },
    zh: {
      industry_grains: '粮食加工与食品工业',
      industry_spices: '调味品及辛香料加工业',
      industry_dry_fruits: '干果坚果及健康休闲零食',
      industry_fresh_produce: '生鲜农产品及商超供给',
      industry_default: '现代农业与食品工贸',
      apps_grains: '面粉加工、大宗批发、零售渠道',
      apps_spices: '预制菜、精油提取、高端烹饪调味',
      apps_dry_fruits: '健康零食、焙烤烘焙、糖果点心',
      apps_fresh_produce: '超市直供、食品罐头、脱水蔬菜',
      apps_default: '食品精深加工、全球供应链分销',
      markets: '中东地区、欧盟国家、南北美洲'
    }
  };

  const currentStrings = defaultLangs[lang] || defaultLangs['en'];

  return PRODUCTS.map(prod => {
    let countryOfOrigin = prod.details[lang]?.origin || prod.details['en']?.origin || 'India';
    let industry = currentStrings.industry_default;
    let applications = currentStrings.apps_default;
    let exportMarkets = currentStrings.markets;
    let categoryKey = 'agricultural';

    if (prod.category === 'grains') {
      industry = currentStrings.industry_grains;
      applications = currentStrings.apps_grains;
      categoryKey = 'agricultural';
    } else if (prod.category === 'spices') {
      industry = currentStrings.industry_spices;
      applications = currentStrings.apps_spices;
      categoryKey = 'agricultural';
    } else if (prod.category === 'dry_fruits') {
      industry = currentStrings.industry_dry_fruits;
      applications = currentStrings.apps_dry_fruits;
      categoryKey = 'agricultural';
    } else if (prod.category === 'fresh_produce') {
      industry = currentStrings.industry_fresh_produce;
      applications = currentStrings.apps_fresh_produce;
      categoryKey = 'agricultural';
    }

    return {
      ...prod,
      categoryKey,
      countryOfOrigin,
      industry,
      applications,
      exportMarkets
    };
  });
}

const LOCAL_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    hero_badge: "EXPORT COMMODITY DIRECTORY",
    hero_title: "Enterprise Grade Commodities",
    hero_desc: "Explore our premium catalogue of agricultural produce, meticulously graded under international phytosanitary parameters and packed for safe maritime transit.",
    breadcrumbs_products: "PRODUCTS",
    items_available: "Items Listed",
    search_placeholder: "Search products, origin, markets...",
    cat_all: "All Categories",
    cat_agricultural: "Agricultural Products",
    cat_chemicals: "Industrial Chemicals",
    cat_minerals: "Industrial Minerals",
    cat_raw_materials: "Raw Materials",
    cat_packaging: "Packaging Materials",
    cat_consumer: "Consumer Products",
    origin: "ORIGIN",
    sector: "SECTOR",
    applications: "APPLICATIONS",
    export_markets: "EXPORT MARKETS",
    view_details: "View Details",
    no_matching: "No matching commodities found in this category.",
    reset_filter: "Reset Sourcing Filter",
    traceability_title: "Direct Agritech origin",
    traceability_desc: "Aggregated under strict farm agreements, minimizing foreign material, insect damage, and moisture rot during oceanic voyages.",
    quality_label: "EXPORT GRADE",
    packing_label: "STANDARD PACKING",
    moq_label: "MINIMUM ORDER (MOQ)",
    loading_label: "SEA REEFER LOADING CAPACITY",
    specs_label: "Certified Analytics Parameters",
    initiate_enquiry: "Initiate Trading Enquiry",
    close: "Close"
  },
  es: {
    hero_badge: "CATÁLOGO DE EXPORTACIÓN",
    hero_title: "Materias Primas Certificadas",
    hero_desc: "Suministramos commodities agrícolas de alta pureza y materiales industriales para distribuidores mayoristas, marcas privadas y procesamiento industrial en todo el mundo.",
    breadcrumbs_products: "PRODUCTOS",
    items_available: "Artículos Disponibles",
    search_placeholder: "Buscar productos, origen o mercados...",
    cat_all: "Todos los Productos",
    cat_agricultural: "Productos Agrícolas",
    cat_chemicals: "Químicos Industriales",
    cat_minerals: "Minerales Industriales",
    cat_raw_materials: "Materias Primas",
    cat_packaging: "Materiales de Empaque",
    cat_consumer: "Productos de Consumo",
    origin: "ORIGEN",
    sector: "SECTOR",
    applications: "APLICACIONES",
    export_markets: "MERCADOS EXPORT",
    view_details: "Ver Especificaciones Detalladas",
    no_matching: "No se encontraron commodities que coincidan con los filtros",
    reset_filter: "Restablecer Filtros",
    traceability_title: "Trazabilidad Total",
    traceability_desc: "Contratos directos de cultivo que aseguran pureza, calibre homogéneo y control estricto de humedad previo al estibaje.",
    quality_label: "CALIDAD",
    packing_label: "EMBALAJE ESTÁNDAR",
    moq_label: "CANTIDAD MÍNIMA",
    loading_label: "CAPACIDAD CONTENEDOR",
    specs_label: "Especificaciones Analíticas",
    initiate_enquiry: "Iniciar Consulta Comercial",
    close: "Cerrar"
  },
  ar: {
    hero_badge: "دليل السلع المخصصة للتصدير",
    hero_title: "سلع ذات جودة تجارية ممتازة",
    hero_desc: "استكشف كتالوجنا المتميز من المنتجات الزراعية والمواد الصناعية، المصنفة بدقة بموجب معايير الصحة النباتية الدولية والمعبأة للنقل البحري الآمن.",
    breadcrumbs_products: "المنتجات",
    items_available: "من العناصر المعروضة",
    search_placeholder: "البحث عن المنتجات، المنشأ، الأسواق...",
    cat_all: "جميع المنتجات",
    cat_agricultural: "المنتجات الزراعية",
    cat_chemicals: "المواد الكيميائية الصناعية",
    cat_minerals: "المعادن الصناعية",
    cat_raw_materials: "المواد الخام",
    cat_packaging: "مواد التعبئة والتغليف",
    cat_consumer: "المنتجات الاستهلاكية",
    origin: "المنشأ",
    sector: "القطاع",
    applications: "التطبيقات",
    export_markets: "أسواق التصدير",
    view_details: "عرض المواصفات بالتفصيل",
    no_matching: "لم يتم العثور على سلع تطابق الفلاتر المحددة",
    reset_filter: "إعادة ضبط الفلاتر",
    traceability_title: "منشأ زراعي مباشر",
    traceability_desc: "يتم تجميعها بموجب اتفاقيات زراعية صارمة لتقليل المواد الغريبة وأضرار الحشرات والرطوبة أثناء الرحلات البحرية.",
    quality_label: "درجة التصدير",
    packing_label: "التعبئة القياسية",
    moq_label: "الحد الأدنى للطلب (MOQ)",
    loading_label: "سعة حمولة الحاويات المبردة",
    specs_label: "المواصفات والتحاليل المعتمدة",
    initiate_enquiry: "بدء استعلام تجاري",
    close: "إغلاق"
  },
  hi: {
    hero_badge: "निर्यात वस्तु निर्देशिका",
    hero_title: "उद्यम ग्रेड वस्तुएं",
    hero_desc: "अंतरराष्ट्रीय फाइटोसैनिटरी मापदंडों के तहत सावधानीपूर्वक वर्गीकृत और सुरक्षित समुद्री पारगमन के लिए पैक किए गए कृषि उत्पादों और औद्योगिक सामग्रियों के हमारे प्रीमियम कैटलॉग का अन्वेषण करें।",
    breadcrumbs_products: "कृषि उत्पाद",
    items_available: "वस्तुएं उपलब्ध",
    search_placeholder: "उत्पाद, मूल स्थान, बाजार खोजें...",
    cat_all: "सभी उत्पाद",
    cat_agricultural: "कृषि उत्पाद",
    cat_chemicals: "औद्योगिक रसायन",
    cat_minerals: "औद्योगिक खनिज",
    cat_raw_materials: "कच्चा माल",
    cat_packaging: "पैकेजिंग सामग्री",
    cat_consumer: "उपभोक्ता सामान",
    origin: "मूल स्थान",
    sector: "उद्योग क्षेत्र",
    applications: "अनुप्रयोग",
    export_markets: "निर्यात बाजार",
    view_details: "विस्तृत विवरण देखें",
    no_matching: "इस श्रेणी में कोई मिलान उत्पाद नहीं मिला।",
    reset_filter: "फ़िल्टर रीसेट करें",
    traceability_title: "प्रत्यक्ष कृषि स्रोत",
    traceability_desc: "सख्त कृषि समझौतों के तहत संकलित, जो विदेशी सामग्री, कीट क्षति और समुद्री पारगमन के दौरान नमी के नुकसान को कम करता है।",
    quality_label: "निर्यात श्रेणी",
    packing_label: "मानक पैकिंग",
    moq_label: "न्यूनतम ऑर्डर (MOQ)",
    loading_label: "समुद्री रीफ़र लोडिंग क्षमता",
    specs_label: "प्रमाणित विश्लेषणात्मक पैरामीटर",
    initiate_enquiry: "व्यापारिक पूछताछ शुरू करें",
    close: "बंद करें"
  },
  zh: {
    hero_badge: "出口商品目录清单",
    hero_title: "企业级高纯大宗原材料",
    hero_desc: "欢迎查阅我们的优质大宗商品目录，所有货物均严格按照国际植物检疫标准进行分级和质检，确保长途海运安全性。",
    breadcrumbs_products: "大宗商品",
    items_available: "件在售单品",
    search_placeholder: "搜索产品、产地或销地市场...",
    cat_all: "全部商品分类",
    cat_agricultural: "农副土特产品",
    cat_chemicals: "工业化工原材料",
    cat_minerals: "工业矿产原材料",
    cat_raw_materials: "大宗生产原料",
    cat_packaging: "环保包装制品",
    cat_consumer: "快消及消费品",
    origin: "生产源地",
    sector: "目标行业",
    applications: "典型应用",
    export_markets: "主要出口市场",
    view_details: "查看质检规格书",
    no_matching: "没有找到符合当前筛选条件的货物商品。",
    reset_filter: "重置筛选条件",
    traceability_title: "产地直发可追溯",
    traceability_desc: "与核心产区种植合作社深度绑定，规范理化指标，防止海运途中受潮及物理杂质污染。",
    quality_label: "商品分级",
    packing_label: "包装形式",
    moq_label: "最小起订量 (MOQ)",
    loading_label: "货柜装载量",
    specs_label: "第三方实验室检测参数",
    initiate_enquiry: "即刻进行采购询盘",
    close: "关闭窗口"
  }
};

export default function Products({ lang, selectedProductId, initialSearch = '', onNavigate }: ProductsProps) {
  const t = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeProductDetail, setActiveProductDetail] = useState<any | null>(null);

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  const allCategories = [
    { id: 'all', label: t.cat_all },
    { id: 'agricultural', label: t.cat_agricultural },
    { id: 'chemicals', label: t.cat_chemicals },
    { id: 'minerals', label: t.cat_minerals },
    { id: 'raw_materials', label: t.cat_raw_materials },
    { id: 'packaging', label: t.cat_packaging },
    { id: 'consumer', label: t.cat_consumer }
  ];

  const augmentedProducts = getAugmentedProducts(lang);

  // Filter products based on search and active categories
  const filteredProducts = augmentedProducts.filter(prod => {
    const matchesCategory = activeCategory === 'all' || prod.categoryKey === activeCategory;
    const nameText = (prod.name[lang] || prod.name['en'] || '').toLowerCase();
    const descText = (prod.description[lang] || prod.description['en'] || '').toLowerCase();
    const originText = prod.countryOfOrigin.toLowerCase();
    const industryText = prod.industry.toLowerCase();
    const appsText = prod.applications.toLowerCase();
    const marketsText = prod.exportMarkets.toLowerCase();
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = nameText.includes(query) || 
                          descText.includes(query) || 
                          originText.includes(query) || 
                          industryText.includes(query) || 
                          appsText.includes(query) || 
                          marketsText.includes(query);

    return matchesCategory && matchesSearch;
  });

  // Handle viewing detail
  const handleOpenDetail = (prod: any) => {
    setActiveProductDetail(prod);
  };

  return (
    <div id="products-catalog-root" className="bg-brand-warm-white text-slate-900 min-h-screen text-left font-sans">
      
      {/* ================= HERO HEADER ================= */}
      <section 
        className="relative py-28 overflow-hidden select-none"
        style={{
          backgroundImage: `url(${productsHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark 65% overlay for high text legibility and rich atmosphere */}
        <div className="absolute inset-0 bg-[#071F18]/65 z-0" />
        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            {t.hero_title}
          </h1>
          <p className="text-[#e9f4be] text-xs sm:text-sm max-w-2xl leading-relaxed font-semibold">
            {t.hero_desc}
          </p>
        </div>
      </section>

      {/* ================= BREADCRUMBS ================= */}
      <div className="bg-white border-b border-slate-100 py-3.5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
          <div className="flex items-center gap-2 text-left">
            <button onClick={() => onNavigate('home')} className="hover:text-brand-emerald transition-colors cursor-pointer uppercase font-bold">HOME</button>
            <span>/</span>
            <span className="text-slate-700 uppercase font-bold">{t.breadcrumbs_products}</span>
          </div>
          <span className="text-slate-500 font-mono text-[10px] uppercase">
            {filteredProducts.length} {t.items_available}
          </span>
        </div>
      </div>

      {/* ================= CATALOG SECTION ================= */}
      <section className="py-12 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Catalog grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id}
                  className="bg-brand-cream border border-brand-gray-light rounded-2xl overflow-hidden shadow-xs hover:border-brand-emerald hover:shadow-md transition-all duration-300 flex flex-col md:flex-row text-left"
                >
                  {/* Left Column: Premium Image */}
                  <div className="md:w-5/12 h-64 md:h-auto overflow-hidden relative bg-brand-cream shrink-0 border-b md:border-b-0 md:border-r border-brand-gray-light">
                    <img 
                      src={prod.image} 
                      alt={prod.name[lang] || prod.name['en']} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
                  </div>

                  {/* Right Column: Premium metadata matching prompt */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-3.5">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[8px] font-bold font-mono text-brand-emerald bg-brand-emerald/5 border border-brand-emerald/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {prod.categoryKey.replace('_', ' ')}
                        </span>
                        <span className="text-[8px] font-bold font-mono text-brand-gold bg-brand-gold/5 border border-brand-gold/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {prod.details[lang]?.grade || prod.details['en']?.grade}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-brand-charcoal tracking-tight font-sans">
                        {prod.name[lang] || prod.name['en']}
                      </h3>

                      <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-2">
                        {prod.description[lang] || prod.description['en']}
                      </p>

                      {/* Required parameters block */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-gray-light/40 text-[10px] font-medium text-slate-500 text-left">
                        <div>
                          <span className="block font-bold text-slate-400 text-[8px] uppercase tracking-wider font-mono">{t.origin}</span>
                          <span className="block font-bold text-slate-800 mt-0.5">{prod.countryOfOrigin}</span>
                        </div>
                        <div>
                          <span className="block font-bold text-slate-400 text-[8px] uppercase tracking-wider font-mono">{t.sector}</span>
                          <span className="block font-bold text-slate-800 mt-0.5 line-clamp-1">{prod.industry}</span>
                        </div>
                        <div className="col-span-2 text-left">
                          <span className="block font-bold text-slate-400 text-[8px] uppercase tracking-wider font-mono">{t.applications}</span>
                          <span className="block font-bold text-slate-800 mt-0.5 line-clamp-1">{prod.applications}</span>
                        </div>
                        <div className="col-span-2 text-left">
                          <span className="block font-bold text-slate-400 text-[8px] uppercase tracking-wider font-mono">{t.export_markets}</span>
                          <span className="block font-bold text-slate-800 mt-0.5 line-clamp-1">{prod.exportMarkets}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-brand-gray-light/45">
                      <button 
                        onClick={() => handleOpenDetail(prod)}
                        className="w-full bg-gold-gradient hover:bg-gold-gradient-hover text-white text-[10px] font-bold font-mono uppercase tracking-widest py-3 rounded-xl transition-all duration-300 cursor-pointer text-center font-bold"
                      >
                        {t.view_details}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-brand-cream/20 border border-slate-150 rounded-2xl space-y-4">
              <span className="text-slate-300 font-extrabold text-4xl block font-mono">?</span>
              <p className="text-slate-600 text-xs font-bold uppercase tracking-wider">{t.no_matching}</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
                className="bg-brand-forest text-white text-[10px] font-bold uppercase tracking-wider px-5 py-3 rounded-xl cursor-pointer font-bold"
              >
                {t.reset_filter}
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ================= DETAILS DIALOG OVERLAY ================= */}
      {activeProductDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-brand-cream rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-brand-gray-light text-left relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveProductDetail(null)}
              className="absolute top-4 right-4 p-2 bg-brand-warm-white hover:bg-brand-gray-light rounded-full cursor-pointer text-slate-650 transition-all z-10"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
              
              {/* Product Visual */}
              <div className="md:col-span-5 space-y-4">
                <div className="rounded-xl overflow-hidden border border-brand-gray-light bg-brand-warm-white aspect-square">
                  <img 
                    src={activeProductDetail.image} 
                    alt={activeProductDetail.name[lang]} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-4 bg-brand-cream border border-brand-gray-light rounded-xl space-y-2 text-left">
                  <div className="flex items-center gap-2 text-brand-emerald">
                    <Compass className="w-4 h-4" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{t.traceability_title}</span>
                  </div>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    {t.traceability_desc}
                  </p>
                </div>
              </div>

              {/* Product Specs */}
              <div className="md:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-[8px] font-mono font-bold text-brand-emerald uppercase tracking-widest">{activeProductDetail.categoryKey}</span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-charcoal font-sans">
                    {activeProductDetail.name[lang] || activeProductDetail.name['en']}
                  </h2>
                  <p className="text-slate-550 text-xs leading-relaxed font-medium">
                    {activeProductDetail.description[lang] || activeProductDetail.description['en']}
                  </p>
                </div>

                {/* Analytical Specs Grid */}
                <div className="grid grid-cols-2 gap-3 text-[10px] font-medium text-left">
                  <div className="p-3.5 bg-brand-warm-white border border-brand-gray-light rounded-xl">
                    <span className="block font-bold text-slate-400 text-[8px] uppercase font-mono">{t.origin}</span>
                    <span className="block font-bold text-slate-800 mt-1">{activeProductDetail.countryOfOrigin}</span>
                  </div>
                  <div className="p-3.5 bg-brand-warm-white border border-brand-gray-light rounded-xl">
                    <span className="block font-bold text-slate-400 text-[8px] uppercase font-mono">{t.quality_label}</span>
                    <span className="block font-bold text-brand-emerald mt-1">{activeProductDetail.details[lang]?.grade || activeProductDetail.details['en']?.grade}</span>
                  </div>
                  <div className="p-3.5 bg-brand-warm-white border border-brand-gray-light rounded-xl">
                    <span className="block font-bold text-slate-400 text-[8px] uppercase font-mono">{t.packing_label}</span>
                    <span className="block font-bold text-slate-800 mt-1">{activeProductDetail.details[lang]?.packaging || activeProductDetail.details['en']?.packaging}</span>
                  </div>
                  <div className="p-3.5 bg-brand-warm-white border border-brand-gray-light rounded-xl">
                    <span className="block font-bold text-slate-400 text-[8px] uppercase font-mono">{t.moq_label}</span>
                    <span className="block font-bold text-brand-gold mt-1">{activeProductDetail.details[lang]?.moq || activeProductDetail.details['en']?.moq}</span>
                  </div>
                  <div className="p-3.5 bg-brand-warm-white border border-brand-gray-light rounded-xl col-span-2">
                    <span className="block font-bold text-slate-400 text-[8px] uppercase font-mono">{t.loading_label}</span>
                    <span className="block font-bold text-slate-800 mt-1">{activeProductDetail.details[lang]?.loadingCapacity || activeProductDetail.details['en']?.loadingCapacity}</span>
                  </div>
                </div>

                {/* Lab certification list */}
                <div className="space-y-2.5 pt-4 border-t border-brand-gray-light text-left">
                  <h4 className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-wider">{t.specs_label}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-medium text-slate-700">
                    {(activeProductDetail.specifications[lang] || activeProductDetail.specifications['en'] || []).map((spec: string, sidx: number) => (
                      <div key={sidx} className="flex items-center gap-2 bg-brand-warm-white border border-brand-gray-light p-2.5 rounded-lg">
                        <CheckCircle className="w-4.5 h-4.5 text-brand-emerald shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final contact trigger */}
                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => {
                      setActiveProductDetail(null);
                      onNavigate('contact');
                    }}
                    className="flex-grow bg-gold-gradient hover:bg-gold-gradient-hover text-white text-[10px] font-bold font-mono uppercase tracking-wider py-4 rounded-xl text-center cursor-pointer transition-all duration-300 font-bold"
                  >
                    {t.initiate_enquiry}
                  </button>
                  <button 
                    onClick={() => setActiveProductDetail(null)}
                    className="px-5 bg-brand-warm-white hover:bg-brand-gray-light text-brand-charcoal text-[10px] font-bold font-mono uppercase tracking-wider rounded-xl cursor-pointer transition-all duration-300 font-bold border border-brand-gray-light/50"
                  >
                    {t.close}
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
