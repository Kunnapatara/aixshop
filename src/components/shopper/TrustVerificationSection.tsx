import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { VerificationAuditPoint } from '../../types/shopper';

interface TrustVerificationSectionProps {
  canVerify: VerificationAuditPoint[];
  cannotVerify: VerificationAuditPoint[];
}

export const TrustVerificationSection: React.FC<TrustVerificationSectionProps> = ({
  canVerify,
  cannotVerify
}) => {
  return (
    <div className="rounded-2xl bg-[#090E18] border border-slate-800/90 shadow-xl p-5 sm:p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Trust & Verification Boundaries
          </h3>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          AIXSHOP builds trust by being explicit about what empirical evidence can prove—and where intelligence stops.
        </p>
      </div>

      {/* Two-Column Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: What AIXSHOP Can Verify */}
        <div className="rounded-xl bg-gradient-to-b from-[#0A1424] to-[#070E1A] border border-emerald-500/30 p-5 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold pb-3 border-b border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
              <span>What AIXSHOP Can Verify ({canVerify.length})</span>
            </div>

            <ul className="mt-4 space-y-3.5">
              {canVerify.map((item) => (
                <li key={item.id} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-100">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      {item.description}
                    </div>
                    {item.evidenceRef && (
                      <span className="inline-block text-[9px] font-mono text-emerald-400/90 bg-emerald-950/60 px-2 py-0.5 rounded mt-1 border border-emerald-500/20">
                        Basis: {item.evidenceRef}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-emerald-500/20 text-[11px] text-slate-400 font-mono">
            Directly verified against manufacturer & schema provenance
          </div>
        </div>

        {/* Right: What AIXSHOP Cannot Verify */}
        <div className="rounded-xl bg-gradient-to-b from-[#181114] to-[#0E090C] border border-slate-700/80 p-5 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center gap-2 text-slate-300 font-mono text-xs uppercase font-bold pb-3 border-b border-slate-700">
              <XCircle className="w-4 h-4 text-slate-400" />
              <span>What AIXSHOP Cannot Verify ({cannotVerify.length})</span>
            </div>

            <ul className="mt-4 space-y-3.5">
              {cannotVerify.map((item) => (
                <li key={item.id} className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-700/80 text-[11px] text-slate-400 font-mono">
            Requires real-time warehouse feeds or external merchant policy data
          </div>
        </div>
      </div>
    </div>
  );
};
