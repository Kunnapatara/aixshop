import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  Clock
} from 'lucide-react';
import { InspectedEvidenceAttribute, EvidenceState } from '../../types/landing';

interface AttributeIntelligenceTableProps {
  attributes: InspectedEvidenceAttribute[];
  selectedAttributeId: string;
  onSelectAttribute: (attr: InspectedEvidenceAttribute) => void;
  onOpenStateModal: (state: EvidenceState) => void;
}

export const AttributeIntelligenceTable: React.FC<AttributeIntelligenceTableProps> = ({
  attributes,
  selectedAttributeId,
  onSelectAttribute,
  onOpenStateModal
}) => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const toggleRowExpansion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRowId(prev => prev === id ? null : id);
  };

  const getStateBadge = (state: EvidenceState) => {
    switch (state) {
      case 'MERCHANT_VERIFIED':
        return {
          label: 'MERCHANT VERIFIED',
          classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <ShieldCheck className="w-3 h-3 text-emerald-600" />
        };
      case 'OBSERVED':
        return {
          label: 'OBSERVED',
          classes: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: <Eye className="w-3 h-3 text-blue-600" />
        };
      case 'DERIVED':
        return {
          label: 'DERIVED',
          classes: 'bg-purple-50 text-purple-800 border-purple-200',
          icon: <Sparkles className="w-3 h-3 text-purple-600" />
        };
      case 'CONFLICT':
        return {
          label: 'CONFLICT',
          classes: 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse',
          icon: <AlertTriangle className="w-3 h-3 text-amber-600" />
        };
      case 'MISSING':
        return {
          label: 'MISSING',
          classes: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: <HelpCircle className="w-3 h-3 text-rose-600" />
        };
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-stone-50/80 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">
            Attribute Intelligence Matrix
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">
            Click row to load evidence provenance · Expand for in-place source excerpt
          </p>
        </div>
        <span className="text-[11px] font-mono font-bold text-orange-800 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200 self-start sm:self-auto">
          {attributes.length} Ground-Truth Attributes
        </span>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-100/60 text-[11px] font-mono text-stone-600 uppercase tracking-wider">
              <th className="py-2.5 px-3 w-8"></th>
              <th className="py-2.5 px-3 font-bold">Attribute</th>
              <th className="py-2.5 px-3 font-bold">Value</th>
              <th className="py-2.5 px-3 font-bold">State</th>
              <th className="py-2.5 px-3 hidden md:table-cell font-bold">Source</th>
              <th className="py-2.5 px-3 text-right font-bold">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {attributes.map((attr) => {
              const isSelected = attr.id === selectedAttributeId;
              const isExpanded = expandedRowId === attr.id;
              const badge = getStateBadge(attr.state);

              return (
                <React.Fragment key={attr.id}>
                  <tr
                    onClick={() => onSelectAttribute(attr)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-orange-50/80 text-stone-900 font-medium'
                        : 'hover:bg-stone-50/80 text-stone-700'
                    }`}
                  >
                    {/* Expand toggle */}
                    <td className="py-3 px-2 text-center">
                      <button
                        type="button"
                        onClick={(e) => toggleRowExpansion(attr.id, e)}
                        className="p-1 rounded-lg hover:bg-stone-200/60 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                        aria-label="Toggle details"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-[#F97316]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>

                    {/* Attribute Name */}
                    <td className="py-3 px-3 font-bold text-stone-900">
                      <div className="flex items-center gap-1.5">
                        <span>{attr.name}</span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-ping"></span>
                        )}
                      </div>
                      <div className="text-[10px] text-stone-400 font-normal">
                        {attr.category}
                      </div>
                    </td>

                    {/* Attribute Value */}
                    <td className="py-3 px-3 font-mono font-medium max-w-xs truncate">
                      {attr.state === 'MISSING' ? (
                        <span className="text-rose-600 font-semibold italic">Unknown / No Evidence</span>
                      ) : attr.state === 'CONFLICT' ? (
                        <span className="text-amber-700 font-bold">Conflict Detected</span>
                      ) : (
                        <span className="text-stone-900">{attr.value}</span>
                      )}
                    </td>

                    {/* State Badge */}
                    <td className="py-3 px-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenStateModal(attr.state);
                        }}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border transition-all hover:scale-105 cursor-pointer ${badge.classes}`}
                        title="Click to view epistemic state definition"
                      >
                        {badge.icon}
                        <span>{badge.label}</span>
                      </button>
                    </td>

                    {/* Source */}
                    <td className="py-3 px-3 hidden md:table-cell text-stone-500 font-mono text-[11px] truncate max-w-[180px]">
                      {attr.source}
                    </td>

                    {/* Confidence */}
                    <td className="py-3 px-3 text-right">
                      <span className={`font-mono font-bold text-[11px] ${
                        attr.confidence === 'High' ? 'text-emerald-700' :
                        attr.confidence === 'Medium' ? 'text-amber-700' : 'text-stone-400'
                      }`}>
                        {attr.confidence}
                      </span>
                    </td>
                  </tr>

                  {/* Expandable in-line row */}
                  {isExpanded && (
                    <tr className="bg-stone-50 border-b border-stone-200">
                      <td colSpan={6} className="p-4 text-xs space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-3xs">
                            <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block mb-1">
                              Source Provenance
                            </span>
                            <div className="text-stone-800 font-mono text-[11px]">
                              {attr.source}
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-3xs">
                            <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block mb-1">
                              Detection Timestamp
                            </span>
                            <div className="text-stone-800 font-mono text-[11px] flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-stone-400" />
                              <span>{attr.detectedAt} (UTC Observation)</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-3xs">
                            <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block mb-1">
                              Epistemic State Rule
                            </span>
                            <div className="text-[#F97316] font-semibold text-[11px]">
                              {attr.state === 'CONFLICT' 
                                ? 'Conflict remains unresolved. AIXSHOP does not guess.'
                                : attr.state === 'MISSING'
                                ? 'Unknown must remain Unknown until evidence is provided.'
                                : 'Verified ground truth directly mapped from digital evidence.'}
                            </div>
                          </div>
                        </div>

                        {/* Source Excerpt / Conflict Details */}
                        {attr.conflictDetails ? (
                          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-2">
                            <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                              <span>Two Conflicting Public Claims Detected:</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                              <div className="p-2.5 rounded-lg bg-white border border-amber-200 shadow-3xs">
                                <span className="text-stone-500 block text-[10px] font-bold">Claim 1:</span>
                                <span className="text-stone-900 font-bold">{attr.conflictDetails.sourceA.value}</span>
                                <span className="text-[10px] text-stone-500 block mt-1">({attr.conflictDetails.sourceA.name})</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-white border border-amber-200 shadow-3xs">
                                <span className="text-stone-500 block text-[10px] font-bold">Claim 2:</span>
                                <span className="text-stone-900 font-bold">{attr.conflictDetails.sourceB.value}</span>
                                <span className="text-[10px] text-stone-500 block mt-1">({attr.conflictDetails.sourceB.name})</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs shadow-3xs">
                            <span className="text-stone-400 font-mono text-[10px] font-bold block mb-1">
                              Diagnostic Excerpt Note:
                            </span>
                            <p className="italic text-stone-600">"{attr.note}"</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
