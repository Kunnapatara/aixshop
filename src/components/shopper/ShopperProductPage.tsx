import React, { useState } from 'react';
import { 
  ChevronRight, 
  Share2, 
  Bookmark, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { ShopperHeader } from './ShopperHeader';
import { ShopperHeroVisual } from './ShopperHeroVisual';
import { ShopperProductIdentity } from './ShopperProductIdentity';
import { ProductVsOfferExplainer } from './ProductVsOfferExplainer';
import { ShopperSummaryCards } from './ShopperSummaryCards';
import { PriceContextBanner } from './PriceContextBanner';
import { ObservedOffersMatrix } from './ObservedOffersMatrix';
import { KeyFactsSpecifications } from './KeyFactsSpecifications';
import { ConflictTransparencyCard } from './ConflictTransparencyCard';
import { TrustVerificationSection } from './TrustVerificationSection';
import { BuyerIntentAccordion } from './BuyerIntentAccordion';
import { ShopperTimeline } from './ShopperTimeline';
import { EvidenceDetailDrawer } from './EvidenceDetailDrawer';
import { OfferDetailDrawer } from './OfferDetailDrawer';
import { VisitSellerModal } from './VisitSellerModal';
import { AboutEvidenceModal } from './AboutEvidenceModal';
import { sampleShopperProduct } from '../../data/sampleShopperData';
import { ShopperProductFact, ShopperObservedOffer } from '../../types/shopper';

interface ShopperProductPageProps {
  onNavigateHome: () => void;
  onNavigateMerchant?: () => void;
}

export const ShopperProductPage: React.FC<ShopperProductPageProps> = ({
  onNavigateHome,
  onNavigateMerchant
}) => {
  const [productData, setProductData] = useState(sampleShopperProduct);
  
  // Interactive modal / drawer states
  const [selectedFact, setSelectedFact] = useState<ShopperProductFact | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<ShopperObservedOffer | null>(null);
  const [visitingOffer, setVisitingOffer] = useState<ShopperObservedOffer | null>(null);
  const [isAboutEvidenceOpen, setIsAboutEvidenceOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const conflictFact = productData.facts.find(f => f.state === 'CONFLICT');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navigation Header */}
      <ShopperHeader
        onAboutEvidenceClick={() => setIsAboutEvidenceOpen(true)}
        onSelectProduct={(id) => {
          // If searching for another representative product, we can toggle or reload
          console.log('Selected product in preview:', id);
        }}
        onNavigateMerchant={onNavigateMerchant}
        onNavigateHome={onNavigateHome}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-8">
        {/* Breadcrumb & Quick Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <nav className="flex items-center gap-1.5 flex-wrap font-mono text-[11px]">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              AIXSHOP
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-slate-500">Product Intelligence</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-slate-500">Footwear</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-slate-300 font-semibold">{productData.identity.brand} {productData.identity.model}</span>
          </nav>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
            >
              <Share2 className="w-3 h-3 text-cyan-400" />
              <span>{copyFeedback ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAboutEvidenceOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              <span>Evidence Standard</span>
            </button>
          </div>
        </div>

        {/* Editorial Product Title Headline */}
        <section className="flex flex-col gap-2 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              {productData.identity.brand}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-slate-400">
              {productData.identity.category}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {productData.identity.model}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed font-sans">
                {productData.identity.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start lg:self-auto shrink-0">
              <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                GTIN {productData.identity.gtin}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                Identity Resolved
              </span>
            </div>
          </div>
        </section>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Visuals, Identity, Product ≠ Offer, Timeline (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Hero Visual Gallery */}
            <ShopperHeroVisual 
              brand={productData.identity.brand} 
              model={productData.identity.model} 
            />

            {/* Canonical Product Identity Card */}
            <ShopperProductIdentity 
              identity={productData.identity} 
            />

            {/* Product ≠ Offer Diagram */}
            <ProductVsOfferExplainer />

            {/* Intelligence Timeline */}
            <ShopperTimeline 
              timeline={productData.timeline} 
            />
          </div>

          {/* RIGHT COLUMN: Summary, Offers, Specs, Conflicts, Verification, Buyer Intent (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Price Context Banner */}
            <PriceContextBanner
              minPrice={productData.priceRange.min}
              maxPrice={productData.priceRange.max}
              currency={productData.priceRange.currency}
              totalOffers={productData.priceRange.totalObserved}
            />

            {/* What We Know vs What Needs Caution */}
            <ShopperSummaryCards
              whatWeKnow={productData.whatWeKnow}
              whatNeedsCaution={productData.whatNeedsCaution}
            />

            {/* Observed Offers Matrix & Cards */}
            <ObservedOffersMatrix
              offers={productData.offers}
              onSelectOffer={(offer) => setSelectedOffer(offer)}
              onVisitSeller={(offer) => setVisitingOffer(offer)}
            />

            {/* Conflict Transparency Card (if any) */}
            <ConflictTransparencyCard
              conflictFact={conflictFact}
              onInspect={(fact) => setSelectedFact(fact)}
            />

            {/* Key Facts & Specifications with Evidence States */}
            <KeyFactsSpecifications
              facts={productData.facts}
              onInspectFact={(fact) => setSelectedFact(fact)}
            />

            {/* Trust: What AIXSHOP Can Verify vs Cannot Verify */}
            <TrustVerificationSection
              canVerify={productData.canVerify}
              cannotVerify={productData.cannotVerify}
            />

            {/* Buyer Intent Accordion */}
            <BuyerIntentAccordion
              intents={productData.intents}
            />
          </div>
        </div>

        {/* Bottom Educational Disclaimer Footer */}
        <section className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400 space-y-2">
          <p className="max-w-2xl mx-auto leading-relaxed">
            <strong>AIXSHOP.APP Product Intelligence Layer.</strong> Product information displayed on this page is gathered from structured schemas, manufacturer microdata, and observed merchant feeds. AIXSHOP does not sell merchandise, collect customer payments, or guarantee third-party inventory.
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Canonical ID: aix-prod-849201948172</span>
            <span>·</span>
            <button
              type="button"
              onClick={() => setIsAboutEvidenceOpen(true)}
              className="text-cyan-400 hover:underline"
            >
              Evidence Principles
            </button>
            {onNavigateMerchant && (
              <>
                <span>·</span>
                <button
                  type="button"
                  onClick={onNavigateMerchant}
                  className="text-slate-400 hover:text-white underline"
                >
                  Merchant Workspace
                </button>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Drawers and Modals */}
      <EvidenceDetailDrawer
        fact={selectedFact}
        onClose={() => setSelectedFact(null)}
      />

      <OfferDetailDrawer
        offer={selectedOffer}
        onClose={() => setSelectedOffer(null)}
        onVisitSeller={(offer) => {
          setSelectedOffer(null);
          setVisitingOffer(offer);
        }}
      />

      <VisitSellerModal
        offer={visitingOffer}
        onClose={() => setVisitingOffer(null)}
      />

      <AboutEvidenceModal
        isOpen={isAboutEvidenceOpen}
        onClose={() => setIsAboutEvidenceOpen(false)}
      />
    </div>
  );
};
