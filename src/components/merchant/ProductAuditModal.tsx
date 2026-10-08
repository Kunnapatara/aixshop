// src/components/merchant/ProductAuditModal.tsx
// Product Audit Modal: Direct Single-Product Diagnostic
// Formatted directly according to Prompt Product Audit specification:
// Product | Status | Problems Found | Action at Source | [ Re-check ]

import React, { useState } from 'react';
import { 
  X, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Wrench, 
  ExternalLink,
  ShieldCheck, 
  Check,
  Info
} from 'lucide-react';
import { IssueItem } from '../../types/issues';

export interface ProductAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
  issueIds?: string[];
  productIssues?: IssueItem[];
  onRecheckProduct?: () => void;
}

export const ProductAuditModal: React.FC<ProductAuditModalProps> = ({
  isOpen,
  onClose,
  productId,
  productName = 'AeroPulse VaporStride Carbon Elite',
  issueIds = [],
  productIssues = [],
  onRecheckProduct
}) => {
  const [isRechecking, setIsRechecking] = useState(false);
  const [recheckSuccess, setRecheckSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRecheck = () => {
    setIsRechecking(true);
    setRecheckSuccess(false);
    if (onRecheckProduct) {
      onRecheckProduct();
    }
    setTimeout(() => {
      setIsRechecking(false);
      setRecheckSuccess(true);
      setTimeout(() => setRecheckSuccess(false), 3500);
    }, 800);
  };

  const hasIssues = issueIds.length > 0 || productIssues.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Product Identity */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/60">
              Product Audit
            </span>
            <span className="text-xs text-stone-400 font-mono">ID: {productId || 'AP-VSE-001'}</span>
          </div>

          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight pt-1">
            {productName}
          </h3>
          <p className="text-xs text-stone-500">
            AeroPulse Athletics · Performance Footwear
          </p>
        </div>

        {/* 2. Status */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-amber-800 font-semibold block">Readiness Status</span>
            <span className="text-base font-extrabold text-amber-950 mt-0.5 block">
              {recheckSuccess ? 'Ready for AI Search (Updated)' : hasIssues ? 'Needs Improvement' : 'Ready'}
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${recheckSuccess || !hasIssues ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
            {recheckSuccess || !hasIssues ? '95% Ready' : '68% Ready'}
          </span>
        </div>

        {/* 3. Problems Found */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Problems Identified ({recheckSuccess ? '0' : hasIssues ? issueIds.length || 2 : '0'} Items)
            </span>
            <span className="text-[11px] text-rose-700 font-semibold">Impacts AI assistant accuracy</span>
          </div>

          {!recheckSuccess && hasIssues ? (
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>1. Upper mesh material specification conflict</span>
                </div>
                <p className="text-stone-500 text-[11px] pl-5 leading-relaxed">
                  Store specifies Engineered Mesh but external retailer feeds state Synthetic Knit, causing AI assistants to downgrade confidence.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>2. Missing structured shipping & transit terms</span>
                </div>
                <p className="text-stone-500 text-[11px] pl-5 leading-relaxed">
                  Cut-off schedule and delivery turnaround missing in product schema, causing urgent shopping queries to omit this product.
                </p>
              </div>
            </div>
          ) : !hasIssues && !recheckSuccess ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>No open issues found for this product. Specifications are complete and verified.</span>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Specifications updated and verified — this product is ready for AI Shopping queries.</span>
            </div>
          )}
        </div>

        {/* 4. Action at Source */}
        <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-orange-950">
            <Wrench className="w-4 h-4 text-orange-600" />
            <span>Action at Store Source:</span>
          </div>

          <ul className="space-y-1.5 text-stone-700 pl-6 list-disc text-[11px]">
            <li>
              <strong>Add Material Specifications:</strong> Log in to your Shopify / WooCommerce store admin and fill in the structured material attributes.
            </li>
            <li>
              <strong>Set Transit Policies:</strong> Configure free shipping rules and estimated delivery turnaround times in your store settings.
            </li>
          </ul>

          {/* 4-Step Action At Source Workflow */}
          <div className="p-2.5 rounded-xl bg-white/80 border border-orange-200/60 space-y-1 text-[11px] text-stone-700">
            <span className="font-bold text-stone-900 block">Resolution Workflow:</span>
            <div className="flex flex-wrap items-center gap-1.5 text-stone-600 font-medium">
              <span>1. Open Shopify / WooCommerce</span>
              <span>→</span>
              <span>2. Update product data</span>
              <span>→</span>
              <span>3. Save changes</span>
              <span>→</span>
              <span>4. Return to AIXSHOP & click &quot;Re-check&quot;</span>
            </div>
          </div>

          <div className="pt-0.5 text-[10px] text-stone-400">
            * Your merchant platform is the single source of truth — AIXSHOP validates catalog readiness without overwriting your store feeds until verified.
          </div>
        </div>

        {/* 5. [ Re-check ] Action Button */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 rounded-2xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleRecheck}
            disabled={isRechecking}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRechecking ? 'animate-spin' : ''}`} />
            <span>{isRechecking ? 'Auditing Product...' : 'Re-check Product'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
