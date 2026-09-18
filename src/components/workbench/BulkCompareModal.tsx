import React from 'react';
import { X, CheckCircle2, Flame, Layers, Compass, Barcode, ShieldAlert } from 'lucide-react';
import { WorkbenchProduct } from '../../types/workbench';

interface BulkCompareModalProps {
  selectedProducts: WorkbenchProduct[];
  isOpen: boolean;
  onClose: () => void;
  onInspectProduct: (product: WorkbenchProduct) => void;
}

export const BulkCompareModal: React.FC<BulkCompareModalProps> = ({
  selectedProducts,
  isOpen,
  onClose,
  onInspectProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl bg-[#FAF8F5] border border-stone-200 rounded-3xl shadow-2xl overflow-hidden text-stone-900 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-medium">
                Cross-Product Intelligence Comparison
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Comparing {selectedProducts.length} Products
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              Comparative Intelligence Ground Truth
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Matrix Table */}
        <div className="flex-1 overflow-auto p-5">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="p-3 font-mono text-[11px] text-stone-500 uppercase w-48 sticky left-0 bg-[#FAF8F5] z-10">
                  Dimension
                </th>
                {selectedProducts.map((p) => (
                  <th key={p.id} className="p-3 font-semibold text-stone-900 min-w-[200px]">
                    <div className="font-bold text-xs truncate">{p.name}</div>
                    <div className="text-[10px] font-mono text-stone-500">{p.sku}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80 font-mono text-xs">
              {/* Identity Status */}
              <tr className="hover:bg-white/60">
                <td className="p-3 text-stone-600 font-sans font-medium sticky left-0 bg-[#FAF8F5]">
                  Identity Status
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      p.identityStatus === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {p.identityStatus}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Intelligence Coverage */}
              <tr className="hover:bg-white/60">
                <td className="p-3 text-stone-600 font-sans font-medium sticky left-0 bg-[#FAF8F5]">
                  Intelligence Coverage
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#F97316]">{p.intelligenceCoverage}%</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        p.coverageStatus === 'Strong' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        p.coverageStatus === 'Needs Attention' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {p.coverageStatus}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Dominant Evidence */}
              <tr className="hover:bg-white/60">
                <td className="p-3 text-stone-600 font-sans font-medium sticky left-0 bg-[#FAF8F5]">
                  Dominant Evidence
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    <div className="text-stone-900 font-semibold">{p.dominantEvidenceState}</div>
                    <div className="text-[10px] text-stone-500">
                      {p.evidenceBreakdown.verified} Ver / {p.evidenceBreakdown.observed} Obs / {p.evidenceBreakdown.conflict} Conf
                    </div>
                  </td>
                ))}
              </tr>

              {/* Active Conflicts */}
              <tr className="hover:bg-white/60">
                <td className="p-3 text-stone-600 font-sans font-medium sticky left-0 bg-[#FAF8F5]">
                  Active Conflicts
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className={p.evidenceBreakdown.conflict > 0 ? 'text-rose-600 font-bold' : 'text-stone-400'}>
                      {p.evidenceBreakdown.conflict} Claims
                    </span>
                  </td>
                ))}
              </tr>

              {/* Unresolved Issues */}
              <tr className="hover:bg-white/60">
                <td className="p-3 text-stone-600 font-sans font-medium sticky left-0 bg-[#FAF8F5]">
                  Issues (Crit / High)
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className="text-stone-700">
                      {p.criticalIssuesCount} Critical, {p.highIssuesCount} High
                    </span>
                  </td>
                ))}
              </tr>

              {/* Discovery Readiness */}
              <tr className="hover:bg-white/60">
                <td className="p-3 text-stone-600 font-sans font-medium sticky left-0 bg-[#FAF8F5]">
                  Discovery Readiness
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className="text-stone-900 font-bold">{p.discoveryReadiness}%</span>
                    <span className="text-[10px] text-stone-500 ml-1.5">({p.discoveryStatus})</span>
                  </td>
                ))}
              </tr>

              {/* Priority Score */}
              <tr className="hover:bg-white/60">
                <td className="p-3 text-stone-600 font-sans font-medium sticky left-0 bg-[#FAF8F5]">
                  Remediation Priority
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.priority === 'Critical' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      p.priority === 'High' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                      p.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-stone-100 text-stone-600'
                    }`}>
                      {p.priority}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Primary Gap */}
              <tr className="hover:bg-white/60">
                <td className="p-3 text-stone-600 font-sans font-medium sticky left-0 bg-[#FAF8F5]">
                  Primary Evidence Gap
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3 font-sans text-[11px] text-stone-600 leading-normal">
                    {p.whatAIXShopCannotVerify[0] || 'No active verification gaps'}
                  </td>
                ))}
              </tr>

              {/* Action row */}
              <tr>
                <td className="p-3 text-stone-400 font-sans sticky left-0 bg-[#FAF8F5]">
                  Action
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onInspectProduct(p);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F97316] text-xs font-semibold font-mono transition-colors cursor-pointer border border-orange-200"
                    >
                      Inspect Drawer →
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex items-center justify-between text-xs shrink-0">
          <span className="text-stone-500 font-mono text-[11px]">
            Comparative preview view. Real-time diff algorithms operate locally on representative model.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
