import React, { useState } from 'react';
import { 
  Grid, 
  AlertTriangle, 
  Info
} from 'lucide-react';
import { ProductVariantItem, EvidenceState } from '../../types/landing';

interface VariantIntelligenceSectionProps {
  variants: ProductVariantItem[];
  onOpenStateModal: (state: EvidenceState) => void;
}

export const VariantIntelligenceSection: React.FC<VariantIntelligenceSectionProps> = ({
  variants,
  onOpenStateModal
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[1]?.id || variants[0]?.id);

  const selectedVariant = variants.find(v => v.id === selectedVariantId) || variants[0];

  return (
    <section id="variant-intelligence" className="space-y-4">
      {/* Title & Diagnostic Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <Grid className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Variant Intelligence Matrix
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Decoupled SKU architecture mapping variant attributes, individual barcodes, and stock realities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-300 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-3xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            1 Barcode Anomaly Flagged
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Variant Table (Left 2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-3.5 bg-stone-50/80 border-b border-stone-200 flex items-center justify-between text-xs font-mono">
            <span className="text-stone-900 font-bold uppercase">
              Canonical Variants ({variants.length} Observed)
            </span>
            <span className="text-stone-500 text-[11px]">Representative Preview Data</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100/60 text-[10px] font-mono text-stone-600 uppercase tracking-wider">
                  <th className="py-2.5 px-3 font-bold">Variant Name</th>
                  <th className="py-2.5 px-3 font-bold">Size / Color</th>
                  <th className="py-2.5 px-3 font-bold">Variant ID</th>
                  <th className="py-2.5 px-3 font-bold">GTIN (GS1)</th>
                  <th className="py-2.5 px-3 font-bold">State</th>
                  <th className="py-2.5 px-3 text-right font-bold">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono text-xs">
                {variants.map((v) => {
                  const isSelected = v.id === selectedVariant.id;
                  const isConflict = v.evidenceState === 'CONFLICT';

                  return (
                    <tr
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-orange-50/80 text-stone-900 font-medium' 
                          : 'hover:bg-stone-50/80 text-stone-700'
                      }`}
                    >
                      <td className="py-3 px-3 font-sans font-bold text-stone-900">
                        <div className="flex items-center gap-1.5">
                          <span>{v.variantName}</span>
                          {isConflict && (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-stone-700">
                        {v.size} · {v.color}
                      </td>
                      <td className="py-3 px-3 text-stone-500 text-[11px]">
                        {v.variantId}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`text-[11px] ${isConflict ? 'text-amber-800 font-bold underline' : 'text-stone-800'}`}>
                          {v.gtin}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenStateModal(v.evidenceState);
                          }}
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-opacity hover:opacity-80 cursor-pointer ${
                            isConflict
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-blue-50 text-blue-800 border-blue-200'
                          }`}
                        >
                          {v.evidenceState}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className={`text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full border ${
                          v.availability === 'In Stock' 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {v.availability}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Variant Detail Card (Right 1 col) */}
        <div className="rounded-2xl bg-white border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-stone-200">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider font-bold">
                Variant Inspector
              </span>
              <span className="text-xs font-mono text-[#F97316] font-bold bg-orange-50 px-2 py-0.5 rounded-md">
                {selectedVariant.variantId}
              </span>
            </div>

            <div className="mt-3">
              <h4 className="text-base font-bold text-stone-900">
                {selectedVariant.variantName}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5 font-medium">
                Colorway: {selectedVariant.color} · Size: {selectedVariant.size}
              </p>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between shadow-3xs">
                <span className="text-stone-500 font-mono font-medium">Barcode (GTIN-14):</span>
                <span className="font-mono text-stone-900 font-bold">{selectedVariant.gtin}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between shadow-3xs">
                <span className="text-stone-500 font-mono font-medium">Catalog Status:</span>
                <span className="text-emerald-700 font-bold">{selectedVariant.availability}</span>
              </div>

              {selectedVariant.diagnosticNote && (
                <div className={`p-3.5 rounded-xl border text-xs leading-relaxed shadow-3xs ${
                  selectedVariant.evidenceState === 'CONFLICT'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}>
                  <span className="text-[10px] font-mono uppercase text-stone-500 font-bold block mb-1">
                    Diagnostic Finding:
                  </span>
                  <p className="font-medium">{selectedVariant.diagnosticNote}</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200 text-[11px] text-stone-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <p>
              AIXSHOP maintains separate barcodes per variant so retail channels match the precise size and colorway without splitting canonical search equity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
