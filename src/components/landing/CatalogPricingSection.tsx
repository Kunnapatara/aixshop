import React, { useState } from 'react';
import { 
  Check, 
  Minus, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  HelpCircle, 
  Info, 
  Zap, 
  Sliders,
  Package,
  Layers,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { canonicalPlans } from '../../data/sampleBillingData';
import { BillingPlan } from '../../types/billing';

interface CatalogPricingSectionProps {
  onSelectTier?: (plan: BillingPlan) => void;
  onNavigateConsole?: () => void;
}

export const CatalogPricingSection: React.FC<CatalogPricingSectionProps> = ({
  onSelectTier,
  onNavigateConsole
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [catalogSkuCount, setCatalogSkuCount] = useState<number>(120);

  // Helper to determine recommended tier from SKU count
  const getRecommendedTier = (count: number) => {
    if (count <= 10) return 'free_10';
    if (count <= 50) return 'paid_50';
    if (count <= 150) return 'paid_150';
    if (count <= 500) return 'paid_500';
    if (count <= 1000) return 'paid_1000';
    return 'paid_1000_plus';
  };

  const activeRecommendedId = getRecommendedTier(catalogSkuCount);

  return (
    <section id="pricing" className="py-20 bg-white border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-800 bg-orange-50 border border-orange-200/80 px-3.5 py-1 rounded-full mb-3">
            <span>Deterministic Catalog Limits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight text-balance">
            Fair Pricing Anchored to Catalog Size
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed text-balance">
            Choose the plan that matches your parent product count. Start free with up to 10 products, then scale transparently as your catalog expands.
          </p>
        </div>

        {/* Catalog Limit Calculator & Cycle Toggle Box */}
        <div className="max-w-4xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left 7 cols: Interactive Catalog Size Selector */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="catalog-size-slider" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  How many products do you have?
                </label>
                <span className="text-xs font-mono font-bold text-orange-600 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                  {catalogSkuCount > 1000 ? '1,000+ Products' : `${catalogSkuCount} Products`}
                </span>
              </div>

              {/* Range Slider */}
              <input
                id="catalog-size-slider"
                type="range"
                min="1"
                max="1200"
                step="5"
                value={catalogSkuCount}
                onChange={(e) => setCatalogSkuCount(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />

              {/* Quick preset chips */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="text-stone-400 self-center">Presets:</span>
                {[10, 50, 150, 500, 1000, 1200].map((sku) => (
                  <button
                    key={sku}
                    type="button"
                    onClick={() => setCatalogSkuCount(sku)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                      catalogSkuCount === sku
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {sku === 1200 ? '1,000+' : `${sku} SKUs`}
                  </button>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Recommended Plan & Cycle Toggle */}
            <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Recommended Plan
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Optimal Match
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-stone-900">
                  {canonicalPlans.find(p => p.id === activeRecommendedId)?.name || 'Custom'}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  (Up to {canonicalPlans.find(p => p.id === activeRecommendedId)?.productCapacity} SKUs)
                </span>
              </div>

              {/* Monthly vs Annual Toggle */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-600">Billing cadence:</span>
                <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200/80">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      billingCycle === 'monthly'
                        ? 'bg-white text-stone-900 shadow-2xs font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                      billingCycle === 'annual'
                        ? 'bg-white text-stone-900 shadow-2xs font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>Annual</span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1 py-0.2 rounded">
                      -20%
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 6 Plan Cards Grid (Free 10, Paid 50, 150, 500, 1,000, 1,000+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {canonicalPlans.map((plan) => {
            const isRecommended = plan.id === activeRecommendedId;
            const displayPrice = billingCycle === 'annual' ? plan.priceAnnualMonthly : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                  isRecommended
                    ? 'bg-white border-2 border-orange-500 shadow-lg shadow-orange-500/10 ring-4 ring-orange-500/10'
                    : plan.highlight
                      ? 'bg-white border-2 border-stone-400/80 shadow-md'
                      : 'bg-white border border-stone-200/80 shadow-2xs hover:border-stone-300'
                }`}
              >
                {/* Top Badge */}
                {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-orange-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                    Matches Your Catalog
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                      {plan.name}
                    </h3>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      {plan.badge}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="my-4">
                    {displayPrice !== null ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-stone-900 font-sans tracking-tight">
                          {displayPrice === 0 ? 'Free' : `$${displayPrice}`}
                        </span>
                        {displayPrice !== 0 && (
                          <span className="text-xs text-stone-500 font-medium">/ month</span>
                        )}
                        {billingCycle === 'annual' && displayPrice !== 0 && (
                          <span className="text-[11px] text-stone-400 font-mono ml-1">
                            (billed annually)
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-bold text-stone-900">Custom Scale</span>
                        <span className="text-xs text-stone-500 font-medium">tailored volume</span>
                      </div>
                    )}

                    {/* Transparent Pricing Configuration Badge */}
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-stone-500 font-mono">
                      <span>{plan.pricingNote || 'Pricing Configuration Preview'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed min-h-[38px]">
                    {plan.description}
                  </p>

                  {/* Product Capacity Limit Banner */}
                  <div className="mt-5 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-stone-600">
                      <Package className="w-4 h-4 text-orange-600" />
                      <span className="font-medium">Product Limit:</span>
                    </div>
                    <span className="font-mono font-bold text-stone-900">
                      {typeof plan.productCapacity === 'number' 
                        ? `${plan.productCapacity} Products` 
                        : `${plan.productCapacity} Products`}
                    </span>
                  </div>

                  {/* Key Feature Bullets */}
                  <div className="mt-5 space-y-2.5 text-xs text-stone-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Product & Evidence Intelligence</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Offer & Price Conflict Reconciliation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Buyer Intent & Diagnostic Scoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{plan.features.monitoring}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{plan.features.sourceConnections}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {plan.features.apiInfrastructure ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Minus className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                      <span className={plan.features.apiInfrastructure ? 'text-stone-800' : 'text-stone-400'}>
                        Headless API & Webhooks
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="mt-7 pt-5 border-t border-stone-200/80">
                  {plan.id === 'free_10' ? (
                    <button
                      type="button"
                      onClick={() => onSelectTier ? onSelectTier(plan) : onNavigateConsole?.()}
                      className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Start Free (10 Products)
                    </button>
                  ) : plan.id === 'paid_1000_plus' ? (
                    <button
                      type="button"
                      onClick={() => onSelectTier ? onSelectTier(plan) : onNavigateConsole?.()}
                      className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Contact Enterprise Sales
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectTier ? onSelectTier(plan) : onNavigateConsole?.()}
                      className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isRecommended
                          ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-200'
                      }`}
                    >
                      Select {plan.name} Tier
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Pillars of Commercial Trust */}
        <div className="mt-16 p-8 rounded-3xl bg-[#FAF8F5] border border-stone-200/80">
          <h4 className="text-base font-bold text-stone-900 mb-6 text-center">
            Our Immutable Commercial Principles
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">Product ≠ Offer</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Variants (sizes, colors) and multiple observed seller market offers do <strong>not</strong> consume separate product seats. You only pay for parent products.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">No Silent Upgrades</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                If your catalog reaches capacity, existing items continue full intelligence coverage. We never silently auto-upgrade your plan without explicit authorization.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">No AI-Token Fees</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                We never meter prompts, completions, or LLM chat queries. You pay a predictable, flat fee based strictly on the number of products you monitor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-orange-600">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">Deterministic Auditing</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every capacity audit, verification event, and receipt is logged in full detail. You always have 100% visibility into your active catalog quota.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
