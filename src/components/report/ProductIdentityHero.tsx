import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Tag, 
  Layers, 
  Barcode,
  Info
} from 'lucide-react';
import { CanonicalProductPreview } from '../../types/landing';

interface ProductIdentityHeroProps {
  product: CanonicalProductPreview;
  submittedUrl: string;
}

export const ProductIdentityHero: React.FC<ProductIdentityHeroProps> = ({
  product,
  submittedUrl
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        {/* Left Column: Brand, Name, Category & Explanation */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-orange-50 text-orange-800 border border-orange-200">
              {product.brand}
            </span>
            <span className="text-xs text-stone-300">/</span>
            <span className="text-xs font-semibold text-stone-600">
              {product.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Canonical Identity: Resolved — Example
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {product.name}
            </h2>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              Canonical product entity resolved across global identifiers and brand specifications.
            </p>
          </div>

          {/* Architectural Law Banner */}
          <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200 text-xs text-stone-800 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-stone-900">Core Separation Law:</strong> AIXSHOP separates the canonical product from seller-specific offers so product facts can remain stable while commercial conditions change.
            </p>
          </div>
        </div>

        {/* Right Column: Key Identifier Matrix (Preview Mode) */}
        <div className="lg:w-80 shrink-0 p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-3 shadow-3xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-stone-200">
            <span className="font-mono text-stone-500 font-bold uppercase text-[10px] tracking-wider">
              Identity Registry
            </span>
            <span className="text-[10px] font-mono font-bold text-[#F97316] bg-orange-100 px-2 py-0.5 rounded-md">Preview Mode</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-stone-500 flex items-center gap-1.5 font-mono">
              <Barcode className="w-3.5 h-3.5 text-stone-400" />
              GTIN (GS1):
            </span>
            <button
              onClick={() => copyToClipboard(product.gtin, 'gtin')}
              className="font-mono text-stone-900 font-bold hover:text-[#F97316] flex items-center gap-1 cursor-pointer transition-colors"
              title="Click to copy"
            >
              <span>{product.gtin}</span>
              {copiedField === 'gtin' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-stone-200/80">
            <span className="text-stone-500 flex items-center gap-1.5 font-mono">
              <Tag className="w-3.5 h-3.5 text-stone-400" />
              MPN:
            </span>
            <button
              onClick={() => copyToClipboard(product.mpn, 'mpn')}
              className="font-mono text-stone-900 font-bold hover:text-[#F97316] flex items-center gap-1 cursor-pointer transition-colors"
              title="Click to copy"
            >
              <span>{product.mpn}</span>
              {copiedField === 'mpn' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-stone-200/80">
            <span className="text-stone-500 flex items-center gap-1.5 font-mono">
              <Layers className="w-3.5 h-3.5 text-stone-400" />
              Canonical ID:
            </span>
            <button
              onClick={() => copyToClipboard(product.canonicalId, 'cid')}
              className="font-mono text-[#F97316] font-bold hover:text-orange-600 flex items-center gap-1 cursor-pointer transition-colors"
              title="Click to copy"
            >
              <span>{product.canonicalId}</span>
              {copiedField === 'cid' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
            </button>
          </div>

          <div className="pt-2 border-t border-stone-200/80">
            <div className="text-[10px] font-mono text-stone-500 mb-1">Source URL Analyzed:</div>
            <div className="truncate text-stone-700 font-mono text-[11px] bg-white px-2.5 py-1.5 rounded-xl border border-stone-200 flex items-center justify-between shadow-3xs">
              <span className="truncate">{submittedUrl}</span>
              <ExternalLink className="w-3 h-3 shrink-0 ml-1 text-stone-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
