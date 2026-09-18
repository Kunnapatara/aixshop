import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Tag, 
  BrainCircuit, 
  Compass, 
  CheckCircle2, 
  AlertCircle,
  X,
  ExternalLink
} from 'lucide-react';

interface HeroSectionProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onInspectPreview: () => void;
  onStartAnalysis: (url: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  inputRef, 
  onInspectPreview,
  onStartAnalysis 
}) => {
  const [url, setUrl] = useState('https://shop.aeropulse.com/products/vaporstride-carbon-elite');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState('');

  const sampleUrls = [
    'https://shop.aeropulse.com/products/vaporstride-carbon-elite',
    'https://nike.com/t/air-max-x-road-racing-mens-shoes',
    'https://lumina-skincare.co/products/hydra-barrier-cream-50ml'
  ];

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onStartAnalysis(url.trim());
  };

  const handleSampleClick = (sample: string) => {
    setUrl(sample);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>AI Commerce Visibility & Product Intelligence Infrastructure</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.15]">
          Make Every Product Understandable, Verifiable, and Discoverable.
        </h1>

        {/* Plain Language Supporting Sentence */}
        <p className="mt-6 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          AIXSHOP turns scattered product data into a verified product intelligence layer built for modern search, AI discovery, and commerce.
        </p>

        {/* Primary URL Input Form */}
        <div className="mt-10 max-w-3xl mx-auto">
          <form 
            onSubmit={handleAnalyze}
            className="relative flex flex-col sm:flex-row items-stretch p-2 rounded-2xl bg-white border border-stone-200/80 shadow-sm focus-within:border-orange-500 transition-all gap-2"
          >
            <div className="relative flex-1 flex items-center pl-3">
              <Search className="w-5 h-5 text-stone-400 ml-1 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/products/product-name"
                className="w-full bg-transparent px-3.5 py-3 text-sm sm:text-base text-stone-900 placeholder-stone-400 focus:outline-none font-mono"
              />
              {url && (
                <button
                  type="button"
                  onClick={() => setUrl('')}
                  className="p-1 text-stone-400 hover:text-stone-600 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={!url.trim()}
              className="inline-flex items-center justify-center font-bold px-7 py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-sm sm:text-base shadow-xs active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
            >
              Analyze Product
            </button>
          </form>

          {/* Quick example URL chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-500">
            <span className="text-stone-400">Try sample:</span>
            {sampleUrls.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSampleClick(sample)}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/80 transition-colors font-mono text-[11px] truncate max-w-[220px] sm:max-w-none"
              >
                {sample.replace('https://', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Capability / Trust Indicators */}
        <div className="mt-14 pt-8 border-t border-stone-200/80 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-left">
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Layers className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">Identity</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">Canonical GTIN, MPN, brand & model</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">Specs</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">Category-aware attribute schemas</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Tag className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">Offers</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">Product ≠ Offer: prices by seller</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <BrainCircuit className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">Buyer Intent</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">7 purchasing query archetypes</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">Discovery</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">Readiness across Search & AI</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-stone-900">Evidence</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">Observed, verified & conflict audit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Honest Status Modal (Strictly avoids fabricating fake analysis or crawling) */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700/80 p-6 sm:p-7 shadow-2xl text-left">
            <button 
              type="button"
              onClick={() => setShowStatusModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Analysis Engine Not Connected Yet
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              You submitted: <span className="font-mono text-cyan-300 text-xs break-all bg-slate-950 px-2 py-1 rounded border border-slate-800 block mt-1">{submittedUrl}</span>
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2 mb-6">
              <p className="font-medium text-amber-300 flex items-center gap-1.5">
                <span>Phase 01 Implementation Boundary</span>
              </p>
              <p className="leading-relaxed text-slate-400">
                Per AIXSHOP product guidelines, we do not fabricate crawling, pretend to extract data, or generate synthetic metrics. The live multi-source ingestion adapter and Gemini intelligence pipeline will be connected in subsequent phases.
              </p>
              <p className="leading-relaxed text-slate-400">
                To examine how AIXSHOP structures canonical product facts, evidence provenance (<span className="text-emerald-400 font-mono">OBSERVED</span>, <span className="text-amber-400 font-mono">DERIVED</span>, <span className="text-rose-400 font-mono">CONFLICT</span>), seller offers, and buyer intent diagnostics, inspect the verified example below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowStatusModal(false);
                  onInspectPreview();
                }}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Inspect Example Product Intelligence</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
