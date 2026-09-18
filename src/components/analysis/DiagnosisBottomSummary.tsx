import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ShoppingBag, 
  Compass, 
  ShieldAlert, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Lock
} from 'lucide-react';

interface DiagnosisBottomSummaryProps {
  onViewFullReport: () => void;
  onAnalyzeAnother: () => void;
}

export const DiagnosisBottomSummary: React.FC<DiagnosisBottomSummaryProps> = ({
  onViewFullReport,
  onAnalyzeAnother
}) => {
  const diagnosisPoints = [
    {
      label: 'Identity',
      value: 'Resolved',
      status: 'resolved',
      desc: 'Canonical product entity established across GTIN, MPN, and brand taxonomy.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40 border-emerald-500/30'
    },
    {
      label: 'Specifications',
      value: 'Some gaps',
      status: 'gaps',
      desc: 'Core biomechanics present (7/10), but arch support & training cadence missing.',
      icon: AlertCircle,
      color: 'text-amber-400',
      bg: 'bg-amber-950/40 border-amber-500/30'
    },
    {
      label: 'Evidence',
      value: 'Traceable with missing/conflicting facts',
      status: 'conflict',
      desc: 'Upper material conflicts between sources; return policy lacks structured schema.',
      icon: AlertCircle,
      color: 'text-amber-400',
      bg: 'bg-amber-950/40 border-amber-500/30'
    },
    {
      label: 'Offers',
      value: 'Multiple seller observations',
      status: 'offers',
      desc: '3 active seller listings tracked ($199–$240) strictly decoupled from product reality.',
      icon: ShoppingBag,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/40 border-cyan-500/30'
    },
    {
      label: 'Discovery',
      value: 'Readiness gaps detected',
      status: 'gaps',
      desc: 'AI search models can cite physical specs, but lack official merchant guarantee data.',
      icon: Compass,
      color: 'text-indigo-400',
      bg: 'bg-indigo-950/40 border-indigo-500/30'
    },
    {
      label: 'Priority',
      value: 'Merchant verification recommended',
      status: 'action',
      desc: 'Signing off on conflicting upper material & adding return policy resolves primary gaps.',
      icon: ShieldAlert,
      color: 'text-rose-400',
      bg: 'bg-rose-950/40 border-rose-500/30'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <span>Executive Diagnosis</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Section 13</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          What AIXSHOP Found
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          A high-trust executive summary of your product reality, current discovery obstacles, and actionable verification priorities.
        </p>
      </div>

      {/* 6-point Business Diagnosis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {diagnosisPoints.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.label}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${item.bg} ${item.color}`}>
                    <Icon className="w-3 h-3" />
                    {item.value}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary & Secondary Action Bar (Section 14) */}
      <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">
            Ready to proceed with verified product intelligence?
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            View full attribute lineage, author verified claims, and resolve catalog conflicts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={onAnalyzeAnother}
            className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Analyze Another Product</span>
          </button>

          <button
            onClick={onViewFullReport}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Full Product Intelligence</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
