import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Share2, 
  Sparkles, 
  Tag, 
  ChevronRight, 
  ChevronDown, 
  Store,
  Info,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { sampleShopperProduct } from '../../data/sampleShopperData';
import { sampleRepresentativeProducts } from '../../data/sampleDashboardData';
import { ShopperProductFact, ShopperObservedOffer } from '../../types/shopper';
import { VisitSellerModal } from './VisitSellerModal';
import { AboutEvidenceModal } from './AboutEvidenceModal';
import { EvidenceDetailDrawer } from './EvidenceDetailDrawer';

interface ShopperExperienceProps {
  onNavigateMerchant?: () => void;
}

export const ShopperExperience: React.FC<ShopperExperienceProps> = ({
  onNavigateMerchant
}) => {
  // Navigation & Search states
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentShopperView, setCurrentShopperView] = useState<'product' | 'catalog'>('product');
  
  // Selected product state
  const [productData, setProductData] = useState(sampleShopperProduct);
  const [selectedFact, setSelectedFact] = useState<ShopperProductFact | null>(null);
  const [visitingOffer, setVisitingOffer] = useState<ShopperObservedOffer | null>(null);
  const [isAboutEvidenceOpen, setIsAboutEvidenceOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [expandedIntent, setExpandedIntent] = useState<string | null>('spec');

  const categories = [
    { id: 'All', label: 'All Products', count: 24 },
    { id: 'Road Racing', label: 'Road Racing', count: 8 },
    { id: 'Trail Running', label: 'Trail Running', count: 6 },
    { id: 'Daily Trainers', label: 'Daily Trainers', count: 7 },
    { id: 'Track & Field', label: 'Track & Field', count: 3 },
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleScrollToOffers = () => {
    const el = document.getElementById('where-to-buy-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products in catalog view
  const filteredCatalog = sampleRepresentativeProducts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans pb-16">
      
      {/* 1. QRxMENU Inspired Top Brand & Mode Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Floating Hero Card (Mirroring QRxMENU Header in 2.png) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200/80 tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 animate-pulse"></span>
                  VERIFIED PRODUCT INTELLIGENCE
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                  PUBLIC BUYER DIRECTORY
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                AeroPulse Athletics
              </h1>
              
              <p className="text-xs sm:text-sm text-stone-500 font-normal max-w-2xl flex items-center gap-1.5 flex-wrap">
                <span>📍 Beaverton, OR · Independent Brand Intelligence</span>
                <span>•</span>
                <span>Zero Sponsored Placements</span>
                <span>•</span>
                <span>Multi-Merchant Verified</span>
              </p>
            </div>

            {/* View Toggle & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 self-start md:self-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search verified products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-stone-50 hover:bg-stone-100/70 focus:bg-white border border-stone-200 rounded-2xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-full sm:w-60"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200/80">
                <button
                  type="button"
                  onClick={() => setCurrentShopperView('product')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentShopperView === 'product'
                      ? 'bg-[#F97316] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Featured Product
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentShopperView('catalog')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentShopperView === 'catalog'
                      ? 'bg-[#F97316] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Browse Catalog ({filteredCatalog.length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills Bar (Exact QRxMENU Visual Style in 2.png) */}
        <div className="mt-4 bg-white rounded-2xl p-2 border border-stone-200/80 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (currentShopperView !== 'catalog') {
                    setCurrentShopperView('catalog');
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* 2. MAIN SHOPPER CONTENT */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex-1">
        
        {/* ========================================================================= */}
        {/* VIEW A: MULTI-PRODUCT CATALOG GRID (Exact Dish Cards from QRxMENU in 2.png) */}
        {/* ========================================================================= */}
        {currentShopperView === 'catalog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                {activeCategory === 'All' ? 'Verified Catalog' : activeCategory} ({filteredCatalog.length} Products)
              </h2>
              <span className="text-xs text-stone-500 font-medium">
                Independent GS1 & Merchant Ground Truth
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCatalog.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
                >
                  {/* Card Image with Badge */}
                  <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-orange-500 text-white shadow-xs">
                        ✓ VERIFIED BY BRAND
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                        <span>{prod.brand}</span>
                        <span className="text-emerald-700 font-semibold">{prod.intelligenceCoverage}% Verified</span>
                      </div>
                      <h3 className="font-bold text-stone-900 text-base leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-normal">
                        {prod.category} · High-efficiency marathon racing and distance training footwear with verified attributes.
                      </p>
                    </div>

                    {/* Price & CTA Row (QRxMENU Card Footer) */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs text-stone-400 block font-normal leading-tight">From</span>
                        <span className="text-base font-extrabold text-stone-900">${prod.samplePrice}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentShopperView('product');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xs hover:shadow transition-all cursor-pointer"
                      >
                        <span>View Offers</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW B: REDESIGNED SHOPPER PRODUCT PAGE (Structured per Prompt Hierarchy) */}
        {/* ========================================================================= */}
        {currentShopperView === 'product' && (
          <div className="space-y-8">
            
            {/* Breadcrumb & Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
              <nav className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setCurrentShopperView('catalog')}
                  className="hover:text-orange-600 transition-colors cursor-pointer font-medium"
                >
                  AIXSHOP Directory
                </button>
                <ChevronRight className="w-3 h-3 text-stone-400" />
                <span className="text-stone-500">{productData.identity.category}</span>
                <ChevronRight className="w-3 h-3 text-stone-400" />
                <span className="text-stone-900 font-semibold">{productData.identity.brand} {productData.identity.model}</span>
              </nav>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200/80 hover:border-stone-300 text-stone-700 text-xs font-medium shadow-xs transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>{copyFeedback ? 'Link Copied!' : 'Share Product'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAboutEvidenceOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200/80 hover:border-stone-300 text-stone-700 text-xs font-medium shadow-xs transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                  <span>Evidence Standard</span>
                </button>
              </div>
            </div>

            {/* SECTION 1: HERO PRODUCT CARD (Clean QRxMENU Rounded Panel) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Product Image */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-4/3 sm:aspect-square rounded-2xl bg-stone-50 overflow-hidden border border-stone-100 shadow-inner">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200"
                      alt={productData.identity.model}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Identity</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Information & Price Hero */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                        {productData.identity.brand}
                      </span>
                      <span className="text-stone-300">·</span>
                      <span className="text-xs text-stone-500 font-medium font-mono">
                        GTIN {productData.identity.gtin}
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                      {productData.identity.model}
                    </h1>

                    {/* Buyer Confidence Rating */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center gap-1 text-amber-500">
                        {'★'.repeat(5)}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-stone-800">
                        98% Buyer Confidence Score
                      </span>
                      <span className="text-xs text-stone-400">· 3 Corroborated Sources</span>
                    </div>
                  </div>

                  {/* Price Range & Seller Summary Block */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-stone-500 font-medium block">Live Market Range</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                          ${productData.priceRange.min.toFixed(0)} – ${productData.priceRange.max.toFixed(0)}
                        </span>
                        <span className="text-xs text-stone-500 font-medium">USD</span>
                      </div>
                      <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Available across {productData.priceRange.totalObserved} verified sellers
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleScrollToOffers}
                      className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-6 py-3 rounded-full text-sm shadow-xs hover:shadow transition-all cursor-pointer"
                    >
                      <span>Compare Offers</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Trust Reassurance Strip */}
                  <div className="grid grid-cols-3 gap-3 pt-1 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-stone-100">
                      <span className="font-bold text-stone-900 block">Brand Direct</span>
                      <span className="text-[11px] text-stone-500">Attested Specs</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-stone-100">
                      <span className="font-bold text-stone-900 block">Multi-Retailer</span>
                      <span className="text-[11px] text-stone-500">Live Availability</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-stone-100">
                      <span className="font-bold text-stone-900 block">Zero Ads</span>
                      <span className="text-[11px] text-stone-500">Unbiased Data</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* SECTION 2: WHAT IS THIS PRODUCT? */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <h2 className="text-lg font-bold text-stone-900 tracking-tight">What is this product?</h2>
              </div>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-4xl font-normal">
                {productData.identity.summary} Designed specifically for road marathoners targeting sub-3 hour race paces, it combines an ultralight curved spoon carbon plate with nitrogen-infused PEBA cushioning to maximize mechanical energy return while adhering strictly to World Athletics legal stack height limits.
              </p>
            </div>

            {/* SECTION 3: KEY SPECIFICATIONS (Clean Grid Cards) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <h2 className="text-lg font-bold text-stone-900 tracking-tight">Key specifications</h2>
                </div>
                <span className="text-xs text-stone-500 font-medium">Standardized Lab & Brand Metrics</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 text-center space-y-1">
                  <span className="text-xs text-stone-500 font-medium block">Weight</span>
                  <span className="text-base font-extrabold text-stone-900 block">204g</span>
                  <span className="text-[10px] text-stone-400 block font-mono">Men US 9.0</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 text-center space-y-1">
                  <span className="text-xs text-stone-500 font-medium block">Stack Height</span>
                  <span className="text-base font-extrabold text-stone-900 block">39.5mm</span>
                  <span className="text-[10px] text-stone-400 block font-mono">Heel / 31.5 Fore</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 text-center space-y-1">
                  <span className="text-xs text-stone-500 font-medium block">Heel Drop</span>
                  <span className="text-base font-extrabold text-stone-900 block">8.0mm</span>
                  <span className="text-[10px] text-stone-400 block font-mono">Road Standard</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 text-center space-y-1">
                  <span className="text-xs text-stone-500 font-medium block">Carbon Plate</span>
                  <span className="text-base font-extrabold text-stone-900 block">Full-Length</span>
                  <span className="text-[10px] text-stone-400 block font-mono">Curved Matrix</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 text-center space-y-1">
                  <span className="text-xs text-stone-500 font-medium block">Upper</span>
                  <span className="text-base font-extrabold text-stone-900 block">Mesh Weave</span>
                  <span className="text-[10px] text-amber-600 block font-mono">Conflict noted</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 text-center space-y-1">
                  <span className="text-xs text-stone-500 font-medium block">Sizes</span>
                  <span className="text-base font-extrabold text-stone-900 block">8 – 13 US</span>
                  <span className="text-[10px] text-stone-400 block font-mono">Half Sizes Incl.</span>
                </div>
              </div>
            </div>

            {/* SECTION 4: WHAT BUYERS WANT TO KNOW (Buyer Intent Framework in Clean Language) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <h2 className="text-lg font-bold text-stone-900 tracking-tight">What buyers want to know</h2>
                </div>
                <span className="text-xs text-stone-500 font-medium">7 Core Purchase Questions</span>
              </div>

              <div className="space-y-3">
                {productData.intents.map((intent) => {
                  const isExpanded = expandedIntent === intent.id;
                  const isPositive = intent.status === 'Well Grounded' || intent.status === 'Complete';
                  const isWarning = intent.status === 'Partial' || intent.status === 'Gaps Present';

                  return (
                    <div
                      key={intent.id}
                      className="rounded-2xl border border-stone-200/80 overflow-hidden transition-all bg-stone-50/50 hover:bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedIntent(isExpanded ? null : intent.id)}
                        className="w-full p-4.5 flex items-center justify-between text-left cursor-pointer gap-4"
                      >
                        <div className="flex items-center gap-3">
                          {isPositive ? (
                            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                              ✓
                            </span>
                          ) : (
                            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                              ⚠
                            </span>
                          )}
                          <div>
                            <span className="text-sm font-bold text-stone-900 block">
                              {intent.category}
                            </span>
                            <span className="text-xs text-stone-500 font-normal">
                              {intent.question}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            isPositive
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {intent.confidence}% Ready
                          </span>
                          <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 border-t border-stone-100 bg-white space-y-3 text-xs sm:text-sm text-stone-600">
                          <p className="leading-relaxed font-normal">{intent.answer}</p>
                          <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between gap-4 text-xs font-medium text-stone-500">
                            <span>Evidence Source: {intent.sourceLabel}</span>
                            <button
                              type="button"
                              onClick={() => setIsAboutEvidenceOpen(true)}
                              className="text-orange-600 hover:underline cursor-pointer"
                            >
                              Verification Details
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 5: EVIDENCE TRANSPARENCY (Human Readable Labels) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <h2 className="text-lg font-bold text-stone-900 tracking-tight">Evidence transparency</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAboutEvidenceOpen(true)}
                  className="text-xs text-orange-600 hover:text-orange-700 font-semibold cursor-pointer"
                >
                  How we verify →
                </button>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                AIXSHOP grounds product information in attested evidence. Below are the human-verified factual states for this product:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Verified by Brand */}
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Verified by brand</span>
                  </div>
                  <p className="text-xs text-emerald-950/80 leading-relaxed">
                    Carbon plate geometry, weight, and drop certified directly by AeroPulse manufacturer engineering.
                  </p>
                </div>

                {/* Observed from Retailer */}
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-stone-800 font-bold text-sm">
                    <Info className="w-4 h-4 text-stone-500" />
                    <span>Observed from retailer</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Live pricing, variant inventory, and shipping timeframes gathered from 3 authorized commerce feeds.
                  </p>
                </div>

                {/* Information Unavailable */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    <span>Information unavailable</span>
                  </div>
                  <p className="text-xs text-amber-950/80 leading-relaxed">
                    Specific wet-rock traction coefficient and sub-zero foam resilience have not been published.
                  </p>
                </div>

                {/* Conflicting Information */}
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/70 space-y-2">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Conflicting information</span>
                  </div>
                  <p className="text-xs text-rose-950/80 leading-relaxed">
                    Upper fabric described as Engineered Mesh by brand, but Synthetic Textile by a third-party retailer.
                  </p>
                </div>

              </div>
            </div>

            {/* SECTION 6: WHERE TO BUY (Commercial Comparison & Obvious CTA) */}
            <div id="where-to-buy-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <h2 className="text-lg font-bold text-stone-900 tracking-tight">Where to buy</h2>
                </div>
                <span className="text-xs text-stone-500 font-medium">3 Verified Multi-Channel Retailers</span>
              </div>

              {/* Verified Seller Cards */}
              <div className="space-y-4">
                {productData.offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-5 rounded-2xl border border-stone-200/80 hover:border-orange-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50/40 hover:bg-white"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-stone-900 text-base">
                          {offer.sellerName}
                        </span>
                        {offer.isOfficialSeller && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            OFFICIAL STORE
                          </span>
                        )}
                        <span className="text-xs text-stone-400 font-mono">
                          Verified Stock
                        </span>
                      </div>

                      <p className="text-xs text-stone-500 font-normal">
                        {offer.deliveryTerms || 'Free 2-day domestic express shipping · 30-day return policy'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-stone-900 block leading-tight">
                          ${offer.price.toFixed(2)}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-medium">In Stock</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setVisitingOffer(offer)}
                        className="inline-flex items-center gap-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer"
                      >
                        <span>Buy from Seller</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strict Trust Disclaimer */}
              <div className="p-4 rounded-2xl bg-stone-100/70 border border-stone-200 text-xs text-stone-600 leading-relaxed">
                <strong>Commercial Independence Guarantee:</strong> AIXSHOP does not sell merchandise directly, collect customer payment details, or guarantee third-party inventory. Clicking a purchase link redirects securely to the authorized seller's authenticated storefront.
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Modals & Drawers */}
      <VisitSellerModal
        offer={visitingOffer}
        onClose={() => setVisitingOffer(null)}
      />

      <AboutEvidenceModal
        isOpen={isAboutEvidenceOpen}
        onClose={() => setIsAboutEvidenceOpen(false)}
      />

      <EvidenceDetailDrawer
        fact={selectedFact}
        onClose={() => setSelectedFact(null)}
      />

    </div>
  );
};
