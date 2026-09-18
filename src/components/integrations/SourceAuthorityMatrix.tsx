import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Sliders, 
  Layers, 
  Scale, 
  Info,
  ExternalLink
} from 'lucide-react';
import { sampleSourceAuthorityItems } from '../../data/sampleIntegrationsData';
import { SourceAuthorityItem } from '../../types/integrations';

interface SourceAuthorityMatrixProps {
  onNavigateIssues?: () => void;
  onNavigateVerification?: () => void;
}

export const SourceAuthorityMatrix: React.FC<SourceAuthorityMatrixProps> = ({
  onNavigateIssues,
  onNavigateVerification
}) => {
  const [selectedItem, setSelectedItem] = useState<SourceAuthorityItem>(sampleSourceAuthorityItems[1]); // Default to the weight conflict

  const renderStateBadge = (state: SourceAuthorityItem['evidenceState']) => {
    switch (state) {
      case 'MERCHANT_VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-orange-50 text-orange-800 border border-orange-200 shadow-3xs">
            <ShieldCheck className="w-3 h-3 text-[#F97316]" />
            MERCHANT VERIFIED
          </span>
        );
      case 'CONFLICT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-3xs">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            CONFLICT
          </span>
        );
      case 'DERIVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200 shadow-3xs">
            DERIVED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-3xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            OBSERVED
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-3xl bg-white border border-stone-200/80 p-6 shadow-xs space-y-5">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-[#F97316] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 flex items-center gap-1 shadow-3xs">
                <Scale className="w-3 h-3 text-[#F97316]" />
                Source Authority & Conflict Resolution
              </span>
              <span className="text-xs font-mono text-stone-400">
                Evidence Semantics
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 font-sans">
              Connecting a Source Does Not Make Every Value "Verified"
            </h2>
            <p className="text-xs text-stone-500 mt-1 max-w-2xl leading-relaxed">
              AIXSHOP rejects universal hierarchy rules ("Source A is always right"). Every acquired attribute 
              carries its own authority context, confidence score, and conflict status.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 max-w-xs leading-relaxed shadow-3xs">
            <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
              <span>Evidence Principle</span>
            </div>
            <span className="text-stone-500">A Shopify or Feed connection supplies <strong className="text-stone-800">OBSERVED</strong> data. Only signed merchant arbitration achieves <strong className="text-[#F97316]">MERCHANT VERIFIED</strong>.</span>
          </div>
        </div>

        {/* Table of Source Authority Items */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-mono uppercase text-[10px]">
                <th className="py-3 px-3">Attribute & Category</th>
                <th className="py-3 px-3">Contributing Source(s)</th>
                <th className="py-3 px-3">Observed Value</th>
                <th className="py-3 px-3">Resulting State</th>
                <th className="py-3 px-3">Authority Context</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80">
              {sampleSourceAuthorityItems.map(item => {
                const isSelected = selectedItem.id === item.id;

                return (
                  <tr 
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`transition-colors cursor-pointer ${
                      isSelected ? 'bg-orange-50/50' : 'hover:bg-stone-50'
                    }`}
                  >
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-stone-900">{item.attributeName}</div>
                      <div className="text-[11px] font-mono text-stone-400">{item.category}</div>
                    </td>

                    <td className="py-3.5 px-3 font-mono text-stone-700">
                      <div className="font-medium">{item.sourceName}</div>
                      <div className="text-[10px] text-stone-400">{item.sourceType}</div>
                    </td>

                    <td className="py-3.5 px-3 font-mono font-bold text-stone-900">
                      {item.observedValue}
                    </td>

                    <td className="py-3.5 px-3">
                      {renderStateBadge(item.evidenceState)}
                    </td>

                    <td className="py-3.5 px-3 text-stone-500 max-w-xs truncate text-[11px]">
                      {item.authorityContext}
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      {item.conflictStatus === 'ACTIVE_CONFLICT' && onNavigateIssues ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateIssues();
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-mono font-bold transition-colors shadow-3xs cursor-pointer"
                        >
                          <span>Triage Issue</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-[11px] font-mono text-stone-400">
                          {item.conflictStatus}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Item Deep Callout */}
        {selectedItem && (
          <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row items-start justify-between gap-4 text-xs">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase text-stone-400 font-semibold">Inspecting Attribute:</span>
                <span className="font-bold text-stone-900">{selectedItem.attributeName}</span>
                {renderStateBadge(selectedItem.evidenceState)}
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                <strong className="text-stone-900">Resolution Logic: </strong>
                {selectedItem.resolutionNote}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
              <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-600 shadow-3xs">
                Confidence: <strong className="text-stone-900">{selectedItem.confidence}%</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-600 shadow-3xs">
                Audit Trail: <strong className="text-emerald-700 font-bold">SHA-256 Verified</strong>
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
