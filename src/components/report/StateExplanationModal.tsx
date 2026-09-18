import React from 'react';
import { X, Eye, Sparkles, ShieldCheck, HelpCircle, AlertTriangle, Shield } from 'lucide-react';
import { EvidenceState } from '../../types/landing';

interface StateExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedState: EvidenceState | null;
}

export const StateExplanationModal: React.FC<StateExplanationModalProps> = ({
  isOpen,
  onClose,
  selectedState
}) => {
  if (!isOpen) return null;

  const stateDefinitions: Record<EvidenceState, {
    title: string;
    badgeClass: string;
    icon: React.ReactNode;
    summary: string;
    rule: string;
    example: string;
  }> = {
    OBSERVED: {
      title: 'Observed Fact',
      badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: <Eye className="w-4 h-4 text-blue-600" />,
      summary: 'Directly extracted from verifiable, public structured markup or authoritative technical documentation.',
      rule: 'Raw fact recorded directly from a detected digital artifact without inference.',
      example: 'Weight: 320g extracted from official manufacturer JSON-LD schema table.'
    },
    DERIVED: {
      title: 'Derived Fact',
      badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      summary: 'Inferred mathematically or syntactically from multiple observed ground-truth data points.',
      rule: 'Derived facts always reference the specific observed sources from which they were calculated.',
      example: 'Heel drop: 8mm calculated from 39mm heel stack minus 31mm forefoot stack.'
    },
    MERCHANT_VERIFIED: {
      title: 'Merchant Verified',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      summary: 'Directly confirmed or signed off by the authoritative brand owner or verified merchant entity.',
      rule: 'Highest confidence rank. Overrides conflicting third-party scraper observations.',
      example: 'Full-length carbon plate verified by AeroPulse Product Engineering signoff.'
    },
    MISSING: {
      title: 'Missing Evidence',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: <HelpCircle className="w-4 h-4 text-rose-600" />,
      summary: 'No ground-truth evidence detected across any scanned public source or structured merchant feed.',
      rule: 'AIXSHOP strictly preserves Unknown as Unknown. It never fabricates facts to fill empty slots.',
      example: 'Return Policy: 0 schema elements found across 4 scanned sources.'
    },
    CONFLICT: {
      title: 'Evidence Conflict',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      summary: 'Two or more authoritative sources assert contradictory, irreconcilable values for the same attribute.',
      rule: 'AIXSHOP never uses statistical guessing to pick a winner. Conflicts are isolated until verified.',
      example: 'Upper material: Source A states "Mesh" while Source B states "Engineered synthetic".'
    }
  };

  const activeState = selectedState || 'OBSERVED';
  const def = stateDefinitions[activeState];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-3xl bg-white border border-stone-200 shadow-xl p-6 sm:p-7 text-stone-900 relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#F97316]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">Fact State Reference</h3>
            <p className="text-xs font-mono text-stone-500">AIXSHOP Epistemic Evidence Model</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-stone-600">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-stone-100">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${def.badgeClass}`}>
              {def.icon}
              <span>{activeState}</span>
            </span>
            <span className="text-base font-bold text-stone-900">{def.title}</span>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
              <span className="text-stone-500 font-bold block mb-1">Definition:</span>
              <p className="text-stone-800">{def.summary}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
              <span className="text-stone-500 font-bold block mb-1">Core Epistemic Law:</span>
              <p className="text-stone-800 font-mono text-[11px]">{def.rule}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 shadow-3xs">
              <span className="text-orange-950 font-bold block mb-1">Representative Example:</span>
              <p className="text-stone-800">{def.example}</p>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-[11px] font-mono text-stone-500 text-center">
              Observed ≠ Derived ≠ Merchant Verified · Conflict ≠ Guess · Unknown must remain Unknown
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
