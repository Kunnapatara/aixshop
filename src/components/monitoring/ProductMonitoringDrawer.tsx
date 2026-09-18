// src/components/monitoring/ProductMonitoringDrawer.tsx
import React, { useEffect } from 'react';
import { 
  X, 
  Package, 
  AlertOctagon, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  HelpCircle, 
  Clock, 
  ArrowRight, 
  ExternalLink, 
  FileCheck2, 
  DollarSign, 
  Sparkles, 
  Layers, 
  Eye
} from 'lucide-react';
import { 
  MonitoredProductSummary, 
  MonitoringEvent, 
  MonitoringPriority, 
  MonitoringState 
} from '../../types/monitoring';

interface ProductMonitoringDrawerProps {
  product: MonitoredProductSummary | null;
  productEvents: MonitoringEvent[];
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: MonitoringEvent) => void;
  onNavigateReport: () => void;
  onNavigateWorkbench: () => void;
  onNavigateOffers: () => void;
  onNavigateDiscoveryBoundary: () => void;
}

export const ProductMonitoringDrawer: React.FC<ProductMonitoringDrawerProps> = ({
  product,
  productEvents,
  isOpen,
  onClose,
  onSelectEvent,
  onNavigateReport,
  onNavigateWorkbench,
  onNavigateOffers,
  onNavigateDiscoveryBoundary
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="product-drawer-title">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white border-l border-stone-200 text-stone-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-stone-50/90 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
                  Product Monitoring Intelligence
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                  Representative Preview
                </span>
              </div>
              <h2 id="product-drawer-title" className="text-lg font-bold text-stone-900 tracking-tight">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                <span>SKU: {product.sku}</span>
                <span>·</span>
                <span>GTIN: {product.gtin}</span>
                <span>·</span>
                <span className="text-stone-700 font-semibold">{product.brand}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
              title="Close drawer (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
            {/* 1. Identity & Monitoring Health Status */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Product Identity & Status
                </span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  product.priority === 'Critical'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : product.priority === 'High'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  Priority: {product.priority} ({product.priorityScore}/100)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[10px] font-mono uppercase text-stone-400 block mb-0.5 font-bold">Canonical ID</span>
                  <span className="font-mono text-[#F97316] font-bold text-[11px] truncate block">
                    {product.canonicalId}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[10px] font-mono uppercase text-stone-400 block mb-0.5 font-bold">Current Monitoring State</span>
                  <span className="capitalize font-mono font-bold text-stone-900 text-[11px]">
                    {product.monitoringState.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200">
                <strong className="text-stone-900 font-semibold">Rationale: </strong>
                {product.priorityRationale}
              </p>
            </div>

            {/* 2. Breakdown Dimensions (Offers, Evidence, Discovery) */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <FileCheck2 className="w-4 h-4 text-blue-600 mx-auto" />
                <span className="text-lg font-bold font-mono text-blue-700 block">{product.evidenceChanges}</span>
                <span className="text-[10px] text-stone-500 font-medium">Evidence Changes</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <DollarSign className="w-4 h-4 text-emerald-600 mx-auto" />
                <span className="text-lg font-bold font-mono text-emerald-700 block">{product.offerChanges}</span>
                <span className="text-[10px] text-stone-500 font-medium">Offer Changes</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <Sparkles className="w-4 h-4 text-purple-600 mx-auto" />
                <span className="text-lg font-bold font-mono text-purple-700 block">{product.discoveryChanges}</span>
                <span className="text-[10px] text-stone-500 font-medium">Discovery Signals</span>
              </div>
            </div>

            {/* 3. Recent Changes Timeline Specific to This Product */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Events for this Product ({productEvents.length})
                </span>
                <span className="text-[10px] font-mono text-stone-400">Representative Timeline</span>
              </div>

              {productEvents.length === 0 ? (
                <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center text-xs text-stone-500">
                  No active change events detected for this product. Specifications and offers remain in stable status.
                </div>
              ) : (
                <div className="space-y-2">
                  {productEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => onSelectEvent(evt)}
                      className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-orange-300 transition-all cursor-pointer space-y-1.5 shadow-3xs"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-900">{evt.changeTitle}</span>
                        <span className="text-[10px] font-mono text-stone-400">{evt.detectedAt}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className="text-stone-400 line-through">{evt.previousValue}</span>
                        <ArrowRight className="w-3 h-3 text-[#F97316]" />
                        <span className="text-emerald-700 font-bold">{evt.currentValue}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-100">
                        <span>Category: {evt.category.replace('_', ' ')}</span>
                        <span className="text-[#F97316] font-bold inline-flex items-center gap-0.5">
                          Inspect Diff <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Quick Links to Existing System Pages */}
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block font-bold">
              Deep Diagnostic Workspaces
            </span>

            <div className="grid grid-cols-2 gap-2 font-medium">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateReport();
                }}
                className="p-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs flex items-center justify-between cursor-pointer transition-colors shadow-3xs"
              >
                <span>Product Intelligence (P03)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateReport();
                }}
                className="p-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs flex items-center justify-between cursor-pointer transition-colors shadow-3xs"
              >
                <span>Review Evidence (P04)</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateWorkbench();
                }}
                className="p-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs flex items-center justify-between cursor-pointer transition-colors shadow-3xs"
              >
                <span>Products Workbench (P06)</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateOffers();
                }}
                className="p-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs flex items-center justify-between cursor-pointer transition-colors shadow-3xs"
              >
                <span>Offers & Pricing (P07)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
