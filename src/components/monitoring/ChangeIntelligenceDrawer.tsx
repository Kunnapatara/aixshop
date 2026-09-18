// src/components/monitoring/ChangeIntelligenceDrawer.tsx
import React, { useEffect } from 'react';
import { 
  X, 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  Clock, 
  ArrowRight, 
  ExternalLink, 
  Check, 
  ShieldAlert, 
  FileCheck2, 
  DollarSign, 
  Package, 
  Layers, 
  Sparkles, 
  HelpCircle,
  Building2
} from 'lucide-react';
import { MonitoringEvent, MonitoringPriority, MonitoringEvidenceState } from '../../types/monitoring';

interface ChangeIntelligenceDrawerProps {
  event: MonitoringEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateReport: () => void;
  onNavigateOffers: () => void;
  onNavigateWorkbench: () => void;
  onNavigateDiscoveryBoundary: () => void;
  onToggleReviewed: (eventId: string) => void;
  isReviewed: boolean;
}

export const ChangeIntelligenceDrawer: React.FC<ChangeIntelligenceDrawerProps> = ({
  event,
  isOpen,
  onClose,
  onNavigateReport,
  onNavigateOffers,
  onNavigateWorkbench,
  onNavigateDiscoveryBoundary,
  onToggleReviewed,
  isReviewed
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

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white border-l border-stone-200 text-stone-800 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 bg-stone-50/90 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
                  Change Intelligence Drawer
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                  Representative Observation
                </span>
              </div>
              <h2 id="drawer-title" className="text-lg font-bold text-stone-900 tracking-tight">
                {event.changeTitle}
              </h2>
              <p className="text-xs text-stone-500">
                Product: <span className="text-stone-800 font-semibold">{event.productName}</span> ({event.productSku})
              </p>
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

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
            {/* 1. Before vs After State Comparison Block */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Attribute Diff Comparison
                </span>
                <span className="text-xs font-mono text-[#F97316] font-bold">
                  {event.attribute}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-white border border-stone-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                    Before (Previous State)
                  </span>
                  <div className="text-xs font-mono text-rose-600 line-through break-words bg-rose-50 p-2 rounded-lg border border-rose-200 font-medium">
                    {event.previousValue}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold block">
                    After (Observed State)
                  </span>
                  <div className="text-xs font-mono text-emerald-800 font-bold break-words bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    {event.currentValue}
                  </div>
                </div>
              </div>

              {event.difference && (
                <div className="flex items-center justify-between text-xs font-mono p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-[#F97316]">
                  <span>Calculated Difference:</span>
                  <span className="font-bold">{event.difference}</span>
                </div>
              )}
            </div>

            {/* 2. Metadata Grid (Source, Detected At, Evidence, Validity) */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-400 block">Observation Source</span>
                <span className="text-stone-800 font-medium break-words">{event.source}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-400 block">Detected At</span>
                <span className="text-stone-800 font-mono font-medium">{event.detectedAt}</span>
                <span className="text-[10px] text-stone-400 block">*Representative date</span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-400 block">Evidence State & Conf.</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[#F97316] font-bold">{event.evidenceState}</span>
                  <span className="text-stone-500 font-medium">({event.confidence}%)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-400 block">Validity Expiration</span>
                <span className="text-stone-700 font-mono">
                  {event.validUntil === 'Unknown' ? 'Valid Until: Unknown' : event.validUntil}
                </span>
                <span className="text-[9px] text-stone-400 block">No false expiration assumed</span>
              </div>
            </div>

            {/* 3. Priority & Deterministic Classification */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Deterministic Priority Rationale
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    Classification: {event.classification}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    event.priority === 'Critical'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : event.priority === 'High'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {event.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200">
                {event.reason}
              </p>

              <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
                <span className="font-semibold text-stone-700">Impact Layer:</span>
                <span className="text-[#F97316] font-semibold">{event.impact}</span>
              </div>
            </div>

            {/* 4. Special Section: Isolated Offer Dimensions (Section 18) */}
            {event.offerDimensions && (
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-900">
                      Isolated Commercial Offer Dimensions
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                    Dimension Isolation
                  </span>
                </div>
                <p className="text-[11px] text-stone-600">
                  AIXSHOP detected changes exclusively in: <strong className="text-emerald-800">{event.offerDimensions.isolatedChangedDimension}</strong>. All other offer parameters remained stable.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono pt-1">
                  <div className={`p-2.5 rounded-xl border ${event.offerDimensions.price.changed ? 'bg-emerald-100/60 border-emerald-300 text-emerald-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>
                    <span className="text-[9px] block text-stone-400 uppercase font-sans">Price</span>
                    <span>{event.offerDimensions.price.current}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${event.offerDimensions.availability.changed ? 'bg-amber-100/60 border-amber-300 text-amber-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>
                    <span className="text-[9px] block text-stone-400 uppercase font-sans">Availability</span>
                    <span>{event.offerDimensions.availability.current}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${event.offerDimensions.promotion.changed ? 'bg-blue-100/60 border-blue-300 text-blue-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>
                    <span className="text-[9px] block text-stone-400 uppercase font-sans">Promotion</span>
                    <span>{event.offerDimensions.promotion.current}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-600">
                    <span className="text-[9px] block text-stone-400 uppercase font-sans">Seller</span>
                    <span>{event.offerDimensions.seller.name}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${event.offerDimensions.shipping.changed ? 'bg-amber-100/60 border-amber-300 text-amber-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>
                    <span className="text-[9px] block text-stone-400 uppercase font-sans">Shipping</span>
                    <span>{event.offerDimensions.shipping.current}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${event.offerDimensions.returns.changed ? 'bg-amber-100/60 border-amber-300 text-amber-900 font-bold' : 'bg-white border-stone-200 text-stone-600'}`}>
                    <span className="text-[9px] block text-stone-400 uppercase font-sans">Returns</span>
                    <span>{event.offerDimensions.returns.current}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Special Section: Conflict Details & Strict No-Averaging Notice (Section 29) */}
            {event.conflictDetails && (
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4 text-rose-600" />
                    <span className="text-xs font-bold text-rose-900">
                      Multi-Source Conflict Inspection
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 font-bold">
                    Never Auto-Averaged
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-rose-200">
                    <span className="text-[10px] font-mono text-stone-500 block font-semibold">
                      Source A: {event.conflictDetails.sourceA.name}
                    </span>
                    <span className="text-rose-700 font-mono font-bold mt-0.5 block">
                      "{event.conflictDetails.sourceA.value}"
                    </span>
                    <span className="text-[9px] text-stone-400 font-mono">
                      Observed: {event.conflictDetails.sourceA.observedAt}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-rose-200">
                    <span className="text-[10px] font-mono text-stone-500 block font-semibold">
                      Source B: {event.conflictDetails.sourceB.name}
                    </span>
                    <span className="text-rose-700 font-mono font-bold mt-0.5 block">
                      "{event.conflictDetails.sourceB.value}"
                    </span>
                    <span className="text-[9px] text-stone-400 font-mono">
                      Observed: {event.conflictDetails.sourceB.observedAt}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-rose-800 leading-relaxed bg-rose-100/60 p-3 rounded-xl border border-rose-200 font-medium">
                  {event.conflictDetails.noAveragingNotice}
                </p>
              </div>
            )}

            {/* 6. Special Section: Affected Document Fields */}
            {event.affectedFields && event.affectedFields.length > 0 && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold block">
                  Document Payload Fields Affected
                </span>
                <ul className="space-y-1.5 text-xs">
                  {event.affectedFields.map((field, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
                      <span>{field}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="text-xs text-stone-600">
              <span className="font-semibold text-stone-800">Recommended Next Step: </span>
              <span>{event.recommendedNextStep}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onToggleReviewed(event.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border shadow-3xs ${
                  isReviewed
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <Check className={`w-3.5 h-3.5 ${isReviewed ? 'text-emerald-700' : 'text-stone-400'}`} />
                <span>{isReviewed ? 'Marked as Reviewed (Local)' : 'Mark as Reviewed (Local Preview)'}</span>
              </button>

              <div className="flex items-center gap-2 font-bold">
                {event.targetAction === 'view_offers' && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateOffers();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <span>View Offers (P07)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {event.targetAction === 'review_evidence' && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateReport();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Review Evidence (P04)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {event.targetAction === 'view_product' && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateWorkbench();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Products Workbench (P06)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {event.targetAction === 'view_discovery' && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateDiscoveryBoundary();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Discovery Diagnostic (P08)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}

                {event.targetAction === 'inspect' && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateReport();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    <span>View Extraction Report (P03)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
