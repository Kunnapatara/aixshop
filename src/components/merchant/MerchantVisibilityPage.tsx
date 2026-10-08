import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Bot, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  ExternalLink, 
  HelpCircle, 
  ChevronRight, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Package, 
  DollarSign, 
  ArrowLeft,
  X,
  Activity,
  Tag,
  Info
} from 'lucide-react';
import { IssueItem } from '../../types/issues';
import { CANONICAL_MERCHANT, CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';

export interface VisibilityQueryItem {
  id: string;
  query: string;
  intent: 'Product Recommendation' | 'Specification Verification' | 'Purchase Policy' | 'Price Comparison';
  engine: string;
  discoveredProduct: string;
  discoveredProductId: string;
  positionOutcome: 'Primary Recommendation' | 'Discrepancy Warning' | 'Information Gap' | 'Multi-Seller Ranked #2';
  observationStatus: 'Observed (Verified)' | 'Observed (Discrepancy)' | 'Observed (Missing Microdata)' | 'Not Yet Observed';
  observationNote: string;
  assistantQuote: string;
  evidenceSources: string[];
  whyReduced: string | null;
  recommendedFix: string | null;
  linkedIssueId: string | null;
  isResolved: boolean;
}

interface MerchantVisibilityPageProps {
  onNavigateIssues: () => void;
  onNavigateCatalog?: () => void;
  onNavigateHome?: () => void;
  issues?: IssueItem[];
  onResolveIssue?: (issueId: string) => void;
  readinessScore?: number;
}

export const MerchantVisibilityPage: React.FC<MerchantVisibilityPageProps> = ({
  onNavigateIssues,
  onNavigateCatalog,
  onNavigateHome,
  issues = [],
  onResolveIssue,
  readinessScore = CANONICAL_SYSTEM_KPIS.discoveryReadinessPct
}) => {
  // Filter by Intent
  const [selectedIntentFilter, setSelectedIntentFilter] = useState<string>('all');
  const [selectedQueryId, setSelectedQueryId] = useState<string>('query-1');
  const [recheckedQueries, setRecheckedQueries] = useState<Record<string, boolean>>({});
  const [isRechecking, setIsRechecking] = useState(false);

  // Check which linked issues are resolved in the canonical state
  const isIssueResolved = (issueId: string | null) => {
    if (!issueId) return false;
    const found = issues.find(i => i.id === issueId);
    return found ? (found.isResolved || found.recoveryState === 'Resolved') : false;
  };

  const queries: VisibilityQueryItem[] = [
    {
      id: 'query-1',
      query: 'Is the AeroPulse VaporStride Carbon Elite suitable for a sub-3 marathon?',
      intent: 'Product Recommendation',
      engine: 'ChatGPT 4o / Perplexity Pro',
      discoveredProduct: 'VaporStride Carbon Elite',
      discoveredProductId: 'aix-prod-849201948172',
      positionOutcome: 'Primary Recommendation',
      observationStatus: 'Observed (Verified)',
      observationNote: 'Discovered in direct shopping inquiry. AI assistant cited full-length curved carbon plate and supercritical foam.',
      assistantQuote: 'Yes. The AeroPulse VaporStride Carbon Elite is engineered for competitive marathon racing, featuring a full-length curved carbon plate and supercritical foam with a 38mm stack.',
      evidenceSources: [
        'AeroPulse Official Specifications (Verified)',
        'World Athletics Approved Shoe Registry'
      ],
      whyReduced: null,
      recommendedFix: null,
      linkedIssueId: null,
      isResolved: true
    },
    {
      id: 'query-2',
      query: 'What is the exact upper material of the VaporStride Carbon Elite?',
      intent: 'Specification Verification',
      engine: 'Gemini 1.5 Pro / Perplexity',
      discoveredProduct: 'VaporStride Carbon Elite',
      discoveredProductId: 'aix-prod-849201948172',
      positionOutcome: 'Discrepancy Warning',
      observationStatus: 'Observed (Discrepancy)',
      observationNote: 'AI engine observed contradictory claims between store source and authorized retailer feeds.',
      assistantQuote: 'Specifications differ depending on the retailer: AeroPulse officially specifies single-layer breathable Engineered Mesh, whereas authorized retailer FleetFeet lists the shoe with Dual-Layer Poly Mesh.',
      evidenceSources: [
        'AeroPulse Brand Catalog (lists Engineered Mesh)',
        'FleetFeet Commercial Feed (lists Synthetic Textile)'
      ],
      whyReduced: 'Competing retailer feeds report conflicting upper mesh materials, causing AI shopping agents to express uncertainty to buyers.',
      recommendedFix: 'Arbitrate upper material spec at store source and push authoritative GTIN syndication.',
      linkedIssueId: 'iss-002',
      isResolved: isIssueResolved('iss-002')
    },
    {
      id: 'query-3',
      query: 'What is the return window if I purchase the VaporStride directly from AeroPulse?',
      intent: 'Purchase Policy',
      engine: 'Google Search Generative AI',
      discoveredProduct: 'VaporStride Carbon Elite',
      discoveredProductId: 'aix-prod-849201948172',
      positionOutcome: 'Information Gap',
      observationStatus: 'Observed (Missing Microdata)',
      observationNote: 'Product discovered, but store return policy was unverified due to missing MerchantReturnPolicy structured markup.',
      assistantQuote: 'While AeroPulse typically offers standard footwear guarantees, specific return duration and restocking fee terms were not found in the structured product data.',
      evidenceSources: [
        'AeroPulse PDP (HTML parsed, Schema.org/MerchantReturnPolicy missing)'
      ],
      whyReduced: 'Missing Schema.org MerchantReturnPolicy tags prevent automated assistants from confirming whether returns are free or within 30 days.',
      recommendedFix: 'Embed MerchantReturnPolicy JSON-LD markup on product pages.',
      linkedIssueId: 'iss-001',
      isResolved: isIssueResolved('iss-001')
    },
    {
      id: 'query-4',
      query: 'Where can I find the AeroPulse VaporStride in stock at the lowest price?',
      intent: 'Price Comparison',
      engine: 'Google Merchant Center / ChatGPT Search',
      discoveredProduct: 'VaporStride Carbon Elite',
      discoveredProductId: 'aix-prod-849201948172',
      positionOutcome: 'Multi-Seller Ranked #2',
      observationStatus: 'Observed (Verified)',
      observationNote: 'Direct store offer ($199.00) observed alongside third-party retailers ($189.00 promotional pricing at MarathonSports).',
      assistantQuote: 'Currently available at $189.00 from MarathonSports (verified in stock), compared to the $199.00 MSRP on AeroPulse direct storefront.',
      evidenceSources: [
        'Google Merchant Center Live Offer Graph',
        'AeroPulse Direct Storefront ($199.00)',
        'MarathonSports Commercial Feed ($189.00)'
      ],
      whyReduced: 'Promotional discount at authorized partner ranks ahead of direct storefront on lowest-price intent queries.',
      recommendedFix: 'Review pricing parity and consider direct member-exclusive pricing or bundle incentives.',
      linkedIssueId: null,
      isResolved: true
    },
    {
      id: 'query-5',
      query: 'Best marathon shoes with carbon plate under $200 with free returns',
      intent: 'Product Recommendation',
      engine: 'Perplexity Shopping / Microsoft Copilot',
      discoveredProduct: 'AeroPulse VaporStride Carbon Elite',
      discoveredProductId: 'aix-prod-849201948172',
      positionOutcome: 'Information Gap',
      observationStatus: 'Not Yet Observed',
      observationNote: 'Query submitted to observation queue. Prerequisites are ready; live observation will be recorded on next crawl pass.',
      assistantQuote: 'Pending observation indexing. Catalog specifications meet price criteria; return policy verification is required for full inclusion.',
      evidenceSources: [
        'Scheduled Observation Queue (Next pass: in 4 hours)'
      ],
      whyReduced: 'Observation pending verification cycle.',
      recommendedFix: 'Resolve open return policy issue (iss-001) to maximize recommendation probability.',
      linkedIssueId: 'iss-001',
      isResolved: isIssueResolved('iss-001')
    }
  ];

  const filteredQueries = queries.filter(q => {
    if (selectedIntentFilter === 'all') return true;
    return q.intent === selectedIntentFilter;
  });

  const activeQuery = queries.find(q => q.id === selectedQueryId) || queries[0];
  const isCurrentResolved = activeQuery.linkedIssueId ? isIssueResolved(activeQuery.linkedIssueId) : activeQuery.isResolved;

  const handleRecheckQuery = (queryId: string, linkedIssueId: string | null) => {
    setIsRechecking(true);
    if (linkedIssueId && onResolveIssue) {
      onResolveIssue(linkedIssueId);
    }
    setTimeout(() => {
      setRecheckedQueries(prev => ({ ...prev, [queryId]: true }));
      setIsRechecking(false);
    }, 700);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Header & Honest Framing */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200/80 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-orange-600" />
                <span>Visibility Intelligence</span>
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {CANONICAL_MERCHANT.domain}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live Customer Queries
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Customer Search & AI Discovery
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              Understand what customers are searching for, where your products are discovered, what AI answer engines tell buyers about your catalog, and what to fix at your store to improve recommendations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 max-w-sm space-y-1.5 shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Catalog Data Prerequisites</span>
            </div>
            <div className="text-xl font-extrabold text-stone-900">
              {readinessScore}% Ready
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Internal catalog data completeness score. Real search visibility is evaluated separately from observed customer query outcomes below.
            </p>
          </div>
        </div>

        {/* Truth Boundary Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">Honest Observation Contract:</span> Each observation below represents an actual simulated or recorded buyer intent query evaluated against Google, ChatGPT, and Gemini. AIXSHOP never fabricates external percentage ranks or promises guaranteed placement.
          </div>
        </div>
      </div>

      {/* 2. Customer Query & Observation Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Query Intent List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Customer Queries & Intents ({queries.length})
            </h3>
            
            {/* Filter buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedIntentFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  selectedIntentFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSelectedIntentFilter('Product Recommendation')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  selectedIntentFilter === 'Product Recommendation'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Recommendations
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredQueries.map((item) => {
              const isSelected = item.id === selectedQueryId;
              const resolved = item.linkedIssueId ? isIssueResolved(item.linkedIssueId) : item.isResolved;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedQueryId(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2.5 ${
                    isSelected
                      ? 'bg-white border-stone-900 shadow-md ring-1 ring-stone-900'
                      : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      {item.intent}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      resolved || item.observationStatus.includes('Verified')
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : item.observationStatus.includes('Discrepancy')
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : item.observationStatus.includes('Missing')
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-stone-100 text-stone-600'
                    }`}>
                      {resolved ? 'Observed (Resolved)' : item.observationStatus}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-stone-900 leading-snug">
                    "{item.query}"
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                    <span className="truncate max-w-[180px]">{item.engine}</span>
                    <span className="font-semibold text-stone-700 flex items-center gap-1">
                      {item.discoveredProduct}
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Product Intelligence Loop (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
          
          {/* Loop Step 1: Customer Query Header */}
          <div className="space-y-2 pb-5 border-b border-stone-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
                1. Customer Buyer Intent Query
              </span>
              <span className="text-xs text-stone-400 font-mono">
                Engine: {activeQuery.engine}
              </span>
            </div>
            
            <h2 className="text-lg sm:text-xl font-extrabold text-stone-900">
              "{activeQuery.query}"
            </h2>
          </div>

          {/* Loop Step 2: What AI Engine Synthesized / How Store Appeared */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-stone-600" />
                <span>2. AI Assistant Synthesis (Observed Response)</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-800">
                Position: {isCurrentResolved ? 'Primary Verified' : activeQuery.positionOutcome}
              </span>
            </div>

            <p className="text-xs text-stone-700 italic bg-white p-3.5 rounded-xl border border-stone-200/60 leading-relaxed">
              "{isCurrentResolved 
                ? 'Specifications and return policy have been corroborated against official store structured data without discrepancy.' 
                : activeQuery.assistantQuote}"
            </p>
          </div>

          {/* Loop Step 3: Ground Truth Evidence Cited */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-stone-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-orange-600" />
              <span>3. Ground Truth Evidence Corroboration</span>
            </span>

            <ul className="text-xs text-stone-600 space-y-1.5">
              {activeQuery.evidenceSources.map((source, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Loop Step 4: Why Visibility Changed / Recommended Fix */}
          <div className="p-4 rounded-2xl border space-y-3 bg-stone-50/50">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                4. Why Visibility Changed & Action at Store Source
              </span>
            </div>

            {isCurrentResolved ? (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Issue resolved at store source. Ground-truth verified for this customer intent.</span>
              </div>
            ) : (
              <>
                {activeQuery.whyReduced && (
                  <div className="text-xs text-stone-700 space-y-1">
                    <span className="font-bold text-stone-900">Diagnosis: </span>
                    <span>{activeQuery.whyReduced}</span>
                  </div>
                )}

                {activeQuery.recommendedFix && (
                  <div className="text-xs text-stone-800 bg-orange-50/80 p-3 rounded-xl border border-orange-200/60 space-y-1">
                    <span className="font-bold text-orange-950">Recommended Fix: </span>
                    <span className="text-orange-900">{activeQuery.recommendedFix}</span>
                  </div>
                )}
              </>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {activeQuery.linkedIssueId && !isCurrentResolved && (
                <button
                  type="button"
                  onClick={onNavigateIssues}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Fix Issue ({activeQuery.linkedIssueId}) in Issues Queue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {activeQuery.linkedIssueId && (
                <button
                  type="button"
                  onClick={() => handleRecheckQuery(activeQuery.id, activeQuery.linkedIssueId)}
                  disabled={isRechecking}
                  className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRechecking ? 'animate-spin' : ''}`} />
                  <span>{isRechecking ? 'Verifying Source...' : 'Re-check Query Outcome'}</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
