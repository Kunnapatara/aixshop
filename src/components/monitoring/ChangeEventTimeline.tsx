// src/components/monitoring/ChangeEventTimeline.tsx
import React from 'react';
import { 
  ArrowRight, 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  Clock, 
  FileCheck2, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  DollarSign, 
  Sparkles, 
  Package, 
  ShieldAlert, 
  Eye, 
  Check
} from 'lucide-react';
import { MonitoringEvent, MonitoringPriority, MonitoringEvidenceState } from '../../types/monitoring';

interface ChangeEventTimelineProps {
  events: MonitoringEvent[];
  onSelectEvent: (event: MonitoringEvent) => void;
  onNavigateReport: () => void;
  onNavigateOffers: () => void;
  onNavigateWorkbench: () => void;
  onNavigateDiscoveryBoundary: () => void;
  onToggleReviewed: (eventId: string) => void;
  reviewedEventIds: Set<string>;
}

export const ChangeEventTimeline: React.FC<ChangeEventTimelineProps> = ({
  events,
  onSelectEvent,
  onNavigateReport,
  onNavigateOffers,
  onNavigateWorkbench,
  onNavigateDiscoveryBoundary,
  onToggleReviewed,
  reviewedEventIds
}) => {
  const getPriorityBadge = (priority: MonitoringPriority) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertOctagon className="w-3 h-3 text-rose-600" />
            CRITICAL
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            HIGH
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Info className="w-3 h-3 text-blue-600" />
            MEDIUM
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-stone-100 text-stone-700 border border-stone-200">
            <Clock className="w-3 h-3 text-stone-500" />
            LOW
          </span>
        );
    }
  };

  const getEvidenceStateBadge = (state: MonitoringEvidenceState) => {
    switch (state) {
      case 'MERCHANT_VERIFIED':
        return (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            MERCHANT VERIFIED
          </span>
        );
      case 'OBSERVED':
        return (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-orange-50 text-[#F97316] border border-orange-200">
            OBSERVED
          </span>
        );
      case 'CONFLICT':
        return (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
            CONFLICT
          </span>
        );
      case 'MISSING':
        return (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-red-50 text-red-700 border border-red-200">
            MISSING
          </span>
        );
      case 'DERIVED':
        return (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">
            DERIVED
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-medium bg-stone-100 text-stone-600 border border-stone-200">
            UNKNOWN
          </span>
        );
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'offer_intelligence':
        return <DollarSign className="w-3.5 h-3.5 text-emerald-600" />;
      case 'evidence_integrity':
        return <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />;
      case 'variant_integrity':
        return <Layers className="w-3.5 h-3.5 text-rose-600" />;
      case 'discovery_readiness':
        return <Sparkles className="w-3.5 h-3.5 text-purple-600" />;
      case 'product_intelligence':
      default:
        return <Package className="w-3.5 h-3.5 text-[#F97316]" />;
    }
  };

  if (events.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 my-6 shadow-2xs">
        <Clock className="w-10 h-10 text-stone-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-stone-900 mb-1">
          No Monitoring Events Matched
        </h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Try expanding your search query or relaxing priority and state filters to see representative intelligence observations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">
            Recent Intelligence Changes
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
            {events.length} Events Logged
          </span>
        </div>
        <span className="text-[11px] font-mono text-stone-400">
          *All entries are Representative Preview Events
        </span>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.map((evt) => {
          const isReviewed = reviewedEventIds.has(evt.id);

          return (
            <div
              key={evt.id}
              className={`p-4 rounded-2xl border transition-all shadow-2xs ${
                isReviewed 
                  ? 'bg-stone-50/80 border-stone-200 opacity-75' 
                  : evt.priority === 'Critical'
                  ? 'bg-white border-rose-200 hover:border-rose-400'
                  : evt.priority === 'High'
                  ? 'bg-white border-amber-200 hover:border-amber-400'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              {/* Event Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-100">
                <div className="flex flex-wrap items-center gap-2">
                  {getPriorityBadge(evt.priority)}

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200">
                    {getCategoryIcon(evt.category)}
                    <span className="capitalize">{evt.category.replace('_', ' ')}</span>
                  </div>

                  {getEvidenceStateBadge(evt.evidenceState)}

                  <span className="text-[10px] font-mono text-stone-500 px-2 py-0.5 rounded-full bg-stone-50 border border-stone-200">
                    Representative event
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-stone-500">
                  <span title="Representative observation timestamp">
                    {evt.detectedAt}
                  </span>
                  <span className="text-stone-300">·</span>
                  <span className="text-[11px] text-[#F97316] font-bold">
                    {evt.confidence}% conf.
                  </span>
                </div>
              </div>

              {/* Event Body */}
              <div className="py-3.5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Left: Product & Attribute Context */}
                <div className="lg:col-span-4 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-stone-900 hover:text-[#F97316] cursor-pointer transition-colors"
                      onClick={() => onSelectEvent(evt)}
                    >
                      {evt.productName}
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-mono">
                    <span>SKU: {evt.productSku}</span>
                    <span>·</span>
                    <span>GTIN: {evt.productGtin}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-xs font-bold text-[#F97316]">
                      {evt.changeTitle}
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Attribute: <span className="text-stone-700 font-semibold">{evt.attribute}</span>
                    </p>
                  </div>
                </div>

                {/* Center: Before vs After Diff View */}
                <div className="lg:col-span-5 p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-stone-500 block mb-0.5">Previous Value</span>
                      <span className="font-mono text-rose-600 line-through text-[11px] break-words font-medium">
                        {evt.previousValue}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-emerald-700 block mb-0.5 font-bold">Current Value</span>
                      <span className="font-mono text-emerald-800 font-bold text-[11px] break-words">
                        {evt.currentValue}
                      </span>
                    </div>
                  </div>

                  {evt.difference && (
                    <div className="text-[10px] font-mono text-[#F97316] pt-1.5 border-t border-stone-200 flex items-center justify-between">
                      <span>Variation / Diff:</span>
                      <span className="font-bold">{evt.difference}</span>
                    </div>
                  )}

                  <div className="text-[10px] text-stone-500 flex items-center justify-between pt-0.5">
                    <span className="truncate max-w-[200px]">Source: {evt.source}</span>
                    <span className="font-mono text-stone-400">Valid: {evt.validUntil}</span>
                  </div>
                </div>

                {/* Right: Impact, Deterministic Reason & Action */}
                <div className="lg:col-span-3 space-y-2">
                  <div className="text-xs">
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Impact:</span>
                    <span className="text-xs text-stone-800 font-semibold">{evt.impact}</span>
                  </div>

                  <p className="text-[11px] text-stone-500 leading-relaxed italic line-clamp-2" title={evt.reason}>
                    "{evt.reason}"
                  </p>

                  <div className="pt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectEvent(evt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F97316] border border-orange-200 text-xs font-bold transition-colors cursor-pointer shadow-3xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Change</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleReviewed(evt.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border shadow-3xs ${
                        isReviewed
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                      title="Toggle reviewed status (Local preview only)"
                    >
                      <Check className={`w-3 h-3 ${isReviewed ? 'text-emerald-700' : 'text-stone-400'}`} />
                      <span>{isReviewed ? 'Reviewed' : 'Review'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Event Footer Context */}
              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-700">Recommended Next Step:</span>
                  <span>{evt.recommendedNextStep}</span>
                </div>

                <div className="flex items-center gap-2 font-bold">
                  {evt.targetAction === 'view_offers' && (
                    <button
                      type="button"
                      onClick={onNavigateOffers}
                      className="text-[#F97316] hover:text-orange-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Offers (P07)</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  {evt.targetAction === 'review_evidence' && (
                    <button
                      type="button"
                      onClick={onNavigateReport}
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Review Evidence (P04)</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  {evt.targetAction === 'view_product' && (
                    <button
                      type="button"
                      onClick={onNavigateWorkbench}
                      className="text-emerald-600 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Products Workbench (P06)</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  {evt.targetAction === 'view_discovery' && (
                    <button
                      type="button"
                      onClick={onNavigateDiscoveryBoundary}
                      className="text-purple-600 hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Discovery Intelligence (P08)</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                  {evt.targetAction === 'inspect' && (
                    <button
                      type="button"
                      onClick={() => onSelectEvent(evt)}
                      className="text-[#F97316] hover:text-orange-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Extraction Diff</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
