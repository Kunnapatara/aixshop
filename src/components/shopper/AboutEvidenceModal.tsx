import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Info,
  Scale,
  ExternalLink
} from 'lucide-react';

interface AboutEvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutEvidenceModal: React.FC<AboutEvidenceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in-50 duration-200"
      onClick={onClose}
    >
      <div 
        className="max-w-2xl w-full bg-[#0A0E1A] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0C1222] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                About AIXSHOP Product Intelligence & Evidence
              </h3>
              <p className="text-[11px] font-mono text-cyan-400">
                Core Principles Governing Shopper Trust
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs text-slate-300 leading-relaxed">
          {/* Principle 1 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>1. Evidence Over Persuasion</span>
            </div>
            <p className="text-slate-400">
              Traditional e-commerce surfaces focus on promotional persuasion. AIXSHOP focuses on empirical verification. Every product specification displays its diagnostic source, detection timestamp, and verification state.
            </p>
          </div>

          {/* Principle 2 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>2. Product ≠ Offer Distinction</span>
            </div>
            <p className="text-slate-400">
              A product is an immutable physical item (e.g. weight, materials, dimensions, drop). An offer is a commercial agreement by a specific seller (e.g. price, shipping speed, return window, stock). AIXSHOP strictly separates the two so shoppers never confuse seller terms with product truth.
            </p>
          </div>

          {/* Principle 3 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>3. The 5 Evidence States</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-mono font-bold text-cyan-300">Observed from source</span>
                <p className="text-slate-400 mt-0.5">Directly observed from structured schema or manufacturer data.</p>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-mono font-bold text-emerald-300">Verified by merchant</span>
                <p className="text-slate-400 mt-0.5">Formally verified by the product brand's engineering team.</p>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-mono font-bold text-blue-300">Derived from verified information</span>
                <p className="text-slate-400 mt-0.5">Calculated deterministically from proven specifications.</p>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="font-mono font-bold text-amber-300">Sources disagree</span>
                <p className="text-slate-400 mt-0.5">Authoritative sources conflict; we surface both instead of guessing.</p>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800 sm:col-span-2">
                <span className="font-mono font-bold text-slate-400">Not verified</span>
                <p className="text-slate-400 mt-0.5">No evidence found. We leave it as missing rather than inventing plausible text.</p>
              </div>
            </div>
          </div>

          {/* Principle 4 */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
            <div className="font-bold text-cyan-300 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>4. AIXSHOP is Not the Seller</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              AIXSHOP does not hold inventory, operate warehouses, or process payments. When you decide to purchase, you visit the verified merchant's storefront where their commercial policies apply.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0C1222] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
