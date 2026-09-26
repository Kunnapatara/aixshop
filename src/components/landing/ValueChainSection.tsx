import React, { useState } from 'react';
import { 
  Database, 
  Eye, 
  ClipboardCheck, 
  AlertTriangle, 
  Wrench, 
  RefreshCw, 
  Sparkles, 
  Radio, 
  Compass, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  ShieldCheck, 
  Info,
  ChevronRight
} from 'lucide-react';

export interface ValueChainStage {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  merchantValue: string;
  exampleProblem: string;
  exampleResolution: string;
  icon: React.ElementType;
  badge: string;
  auditDimension: string;
}

export const VALUE_CHAIN_STAGES: ValueChainStage[] = [
  {
    id: 'catalog',
    stepNumber: '01',
    title: 'Your Product Catalog',
    shortDesc: 'Connect via URL, Shopify, or merchant feed',
    fullDesc: 'Bring your catalog into AIXSHOP whether you have 10 products or 1,000+ SKUs. Connect via store integration or start with a single URL.',
    merchantValue: 'Eliminates complex setup. Works directly with your current catalog data without moving platforms.',
    exampleProblem: 'Raw catalog has scattered items with missing identifiers, incomplete descriptions, and inconsistent pricing across sales channels.',
    exampleResolution: 'AIXSHOP ingests parent products and organizes multi-seller offers into an orderly baseline graph.',
    icon: Database,
    badge: 'Source Ingestion',
    auditDimension: 'Parent Products & Identifiers'
  },
  {
    id: 'understand',
    stepNumber: '02',
    title: 'Understand',
    shortDesc: 'AI normalizes intrinsic product identity',
    fullDesc: 'AIXSHOP parses what AI models and search algorithms see in your data. It applies the fundamental law: Product ≠ Offer.',
    merchantValue: 'Your product specs remain truthful and stable, regardless of volatile retailer discounts or third-party listings.',
    exampleProblem: 'Retailers list different prices ($199 vs $240) and conflicting titles for the exact same physical marathon running shoe.',
    exampleResolution: 'AIXSHOP establishes a canonical product entity with manufacturer specs, separating each retailer offer distinctly.',
    icon: Eye,
    badge: 'Entity Resolution',
    auditDimension: 'Product ≠ Offer Separation'
  },
  {
    id: 'audit',
    stepNumber: '03',
    title: 'Audit',
    shortDesc: 'Continuous diagnostic evaluation',
    fullDesc: 'Automated diagnostic engines check every SKU against modern commerce schemas, GS1 barcode rules, and AI conversational search requirements.',
    merchantValue: 'Identifies why AI models fail to understand or recommend your products before you lose sales.',
    exampleProblem: '32 schema attributes checked: 5 missing fields prevent conversational AI bots from answering basic buyer questions.',
    exampleResolution: 'Diagnostic audit produces an itemized scorecard detailing completeness, evidence states, and readiness gaps.',
    icon: ClipboardCheck,
    badge: 'Diagnostic Scan',
    auditDimension: 'Channel Compliance Rules'
  },
  {
    id: 'find-problems',
    stepNumber: '04',
    title: 'Find Problems',
    shortDesc: 'Pinpoint blockers with evidence',
    fullDesc: 'AIXSHOP flags missing GTINs, vague specifications, conflicting claims, and unsupported buyer intent queries in plain language.',
    merchantValue: 'You never have to guess what is wrong. Every problem is backed by explicit source evidence and severity ratings.',
    exampleProblem: 'Critical Blocker: Missing return policy schema blocks Google Shopping Ads; Conflicting material claim confuses ChatGPT shopping bots.',
    exampleResolution: 'Issues are categorized by severity (Critical, Warning, Info) and routed directly to the Fix Center queue.',
    icon: AlertTriangle,
    badge: 'Issue Detection',
    auditDimension: 'Evidence Provenance'
  },
  {
    id: 'fix',
    stepNumber: '05',
    title: 'Fix',
    shortDesc: 'Guided Fix Center with evidence gating',
    fullDesc: 'The merchant Fix Center walks you through deterministic updates: Issue → Evidence → Explanation → Fix → Validate → Recheck.',
    merchantValue: 'No 100-field spreadsheets. Fast, guided corrections with clear explanation of who owns the change.',
    exampleProblem: 'Manufacturer tech sheet says "Engineered Mesh", but secondary retailer wrote "Synthetic Textile".',
    exampleResolution: 'Merchant clicks "Verify Manufacturer Spec" with one click. AIXSHOP locks in the verified fact with full provenance.',
    icon: Wrench,
    badge: 'Deterministic Resolution',
    auditDimension: 'Merchant Action Integrity'
  },
  {
    id: 'recheck',
    stepNumber: '06',
    title: 'Recheck',
    shortDesc: 'Instant validation & verification',
    fullDesc: 'Once a fix is applied, AIXSHOP immediately re-runs channel validation rules locally to verify that the issue is genuinely resolved.',
    merchantValue: 'Instant feedback ensures your fixes actually satisfy channel requirements before export.',
    exampleProblem: 'Did the barcode fix satisfy GS1 check-digit validation and Google Merchant feed acceptance?',
    exampleResolution: 'Instant rescan confirms check digit passes and moves the issue from "Open" to "Resolved".',
    icon: RefreshCw,
    badge: 'Local Rescan',
    auditDimension: 'Pre-Export Validation'
  },
  {
    id: 'ai-commerce-ready',
    stepNumber: '07',
    title: 'AI Commerce Ready',
    shortDesc: 'Canonical, auditable product graph',
    fullDesc: 'Your catalog becomes fully structured, verified, and backed by auditable evidence records. Zero fabricated facts or hallucinated specs.',
    merchantValue: 'Gives AI agents and conversational shopping bots complete confidence to cite and recommend your products.',
    exampleProblem: 'Untrusted product data gets discarded by algorithmic shopping agents to avoid recommending out-of-stock or inaccurate items.',
    exampleResolution: 'Your catalog achieves 100% verified status with complete buyer intent coverage (specs, fit, warranty, price).',
    icon: Sparkles,
    badge: 'Trusted Catalog State',
    auditDimension: 'Zero Hallucination Guarantee'
  },
  {
    id: 'feed-readiness',
    stepNumber: '08',
    title: 'Feed / Channel Readiness',
    shortDesc: 'Validated Google, OpenAI & Schema feeds',
    fullDesc: 'AIXSHOP generates formatted, compliant feeds tailored for Google Shopping, OpenAI ACP / ChatGPT, Perplexity, and Schema.org JSON-LD.',
    merchantValue: 'Ready-to-use feeds that pass platform ingestion without rejections, feed errors, or merchant suspensions.',
    exampleProblem: 'Custom JSON feeds rejected by platforms due to missing currency formatting or invalid availability enums.',
    exampleResolution: 'AIXSHOP adapter formats feeds strictly according to target partner specs with deterministic checks.',
    icon: Radio,
    badge: 'Feed Adaptation',
    auditDimension: 'OpenAI & Google Feed Specs'
  },
  {
    id: 'discovery',
    stepNumber: '09',
    title: 'Potential AI Product Discovery',
    shortDesc: 'Maximized visibility for AI shoppers',
    fullDesc: 'When prospective buyers ask AI tools for product recommendations, your catalog is structured to be cited, compared, and purchased.',
    merchantValue: 'Captures high-intent buyers using ChatGPT, Google Gemini, and modern AI shopping assistants.',
    exampleProblem: 'Shopper asks: "What lightweight carbon racing shoes under $250 have high heel drop?" Competitors with missing drop specs are omitted.',
    exampleResolution: 'Your verified product satisfies all 4 intent criteria and is presented as a prime recommendation with verified seller links.',
    icon: Compass,
    badge: 'Discovery Optimization',
    auditDimension: 'Delivery ≠ Detection ≠ Visibility'
  }
];

interface ValueChainSectionProps {
  onAnalyzeClick?: () => void;
  onExplorePricingClick?: () => void;
}

export const ValueChainSection: React.FC<ValueChainSectionProps> = ({
  onAnalyzeClick,
  onExplorePricingClick
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(3); // Start with 'Find Problems' or 'Fix' to show dramatic value!

  const activeStage = VALUE_CHAIN_STAGES[selectedStageIndex];

  return (
    <section id="value-chain" className="py-20 bg-[#FAF8F5] border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-800 bg-orange-50 border border-orange-200/80 px-3.5 py-1 rounded-full mb-3">
            <span>The AIXSHOP Value Chain</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight text-balance">
            From Raw Catalog to AI Commerce Ready
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed text-balance">
            AI commerce requires structured truth. Follow how AIXSHOP transforms scattered product data into verified, feed-ready, and discoverable catalog intelligence.
          </p>
        </div>

        {/* 9-Step Horizontal Progress Bar & Step Chips */}
        <div className="mb-10 overflow-x-auto scrollbar-none pb-2">
          <div className="flex items-center gap-2 min-w-max">
            {VALUE_CHAIN_STAGES.map((stage, idx) => {
              const isSelected = selectedStageIndex === idx;
              const Icon = stage.icon;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 border-stone-200/80'
                  }`}
                >
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {stage.stepNumber}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-400' : 'text-stone-500'}`} />
                  <span className="whitespace-nowrap">{stage.title}</span>
                  {idx < VALUE_CHAIN_STAGES.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-stone-300 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Interactive Deep Dive Card */}
        <div className="rounded-3xl bg-white border border-stone-200/80 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Stage Details & Merchant Value */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                    STAGE {activeStage.stepNumber} OF 09
                  </span>
                  <span className="text-xs font-medium text-stone-500">
                    {activeStage.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {activeStage.title}
                </h3>
                <p className="text-base text-stone-600 mt-2 leading-relaxed">
                  {activeStage.fullDesc}
                </p>
              </div>

              {/* Merchant Value Proposition Box */}
              <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200/70">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-900 uppercase tracking-wide mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Merchant Business Value</span>
                </div>
                <p className="text-sm font-medium text-stone-800 leading-relaxed">
                  {activeStage.merchantValue}
                </p>
              </div>

              {/* Audit Focus Area */}
              <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
                <span className="text-stone-400">Core Invariant:</span>
                <span className="text-stone-800 font-bold bg-stone-100 px-2.5 py-1 rounded-lg">
                  {activeStage.auditDimension}
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Before & After Concrete Simulation */}
            <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Real Catalog Example
                </span>
                <span className="text-[11px] font-mono text-stone-500">
                  VaporStride Carbon Elite
                </span>
              </div>

              {/* What went wrong / Challenge */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>The Problem Before AIXSHOP:</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed bg-white p-3 rounded-xl border border-stone-200">
                  {activeStage.exampleProblem}
                </p>
              </div>

              {/* How AIXSHOP resolves it */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>How AIXSHOP Resolves It:</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-emerald-200/80">
                  {activeStage.exampleResolution}
                </p>
              </div>

              {/* Navigation stepper buttons */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  disabled={selectedStageIndex === 0}
                  onClick={() => setSelectedStageIndex(prev => prev - 1)}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  ← Previous Stage
                </button>

                <button
                  type="button"
                  disabled={selectedStageIndex === VALUE_CHAIN_STAGES.length - 1}
                  onClick={() => setSelectedStageIndex(prev => prev + 1)}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Truth Notice: Delivery ≠ Detection ≠ Visibility */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-stone-400 shrink-0" />
              <span>
                <strong>Truthful Commerce Invariant:</strong> Delivery (feed submitted) ≠ Detection (crawled) ≠ Visibility (ranked). AIXSHOP builds preparation and diagnostic readiness, not artificial promises.
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onAnalyzeClick && (
                <button
                  type="button"
                  onClick={onAnalyzeClick}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer"
                >
                  Test Single SKU Audit →
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
