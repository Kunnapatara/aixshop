import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Scale, AlertCircle } from 'lucide-react';
import { ShopperProductData } from '../../types/shopper';

interface ShopperSummaryCardsProps {
  whatWeKnow: ShopperProductData['whatWeKnow'];
  whatNeedsCaution: string[];
}

export const ShopperSummaryCards: React.FC<ShopperSummaryCardsProps> = ({
  whatWeKnow,
  whatNeedsCaution
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* What We Know */}
      <div className="rounded-2xl bg-gradient-to-b from-[#0A1220] to-[#070D18] border border-emerald-500/30 p-4 sm:p-5 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
                What We Know
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Corroborated Facts
            </span>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Product Identity</span>
              <span className="font-semibold text-slate-200">{whatWeKnow.identity}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Physical Specifications</span>
              <span className="font-semibold text-slate-200">{whatWeKnow.specs}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Observed Seller Offers</span>
              <span className="font-semibold text-cyan-300 font-mono">{whatWeKnow.offers}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Evidence State</span>
              <span className="font-semibold text-slate-200">{whatWeKnow.evidence}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400">Active Conflicts</span>
              <span className="font-semibold text-amber-400">{whatWeKnow.conflicts}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 text-[11px] text-slate-400 font-mono">
          Factual diagnostic status · No synthetic score applied
        </div>
      </div>

      {/* What Needs Caution */}
      <div className="rounded-2xl bg-gradient-to-b from-[#161010] to-[#0D0909] border border-amber-500/30 p-4 sm:p-5 shadow-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                What Needs Caution
              </h3>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              Shopper Advisory
            </span>
          </div>

          <ul className="mt-3 space-y-2.5">
            {whatNeedsCaution.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 pt-2 text-[11px] text-slate-400 font-mono">
          AIXSHOP surfaces gaps rather than fabricating assumptions
        </div>
      </div>
    </div>
  );
};
