import React from 'react';
import { X, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface Page03PlaceholderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Page03PlaceholderModal: React.FC<Page03PlaceholderModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              Next Construction Phase
            </span>
            <h3 className="text-lg font-bold text-white">
              Page 03 — Product Intelligence Report
            </h3>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-300 mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <p className="leading-relaxed">
            You clicked <strong className="text-white font-semibold">"View Full Product Intelligence"</strong>.
          </p>
          <p className="leading-relaxed text-slate-400">
            In accordance with the strict iterative roadmap guidelines:
          </p>
          <div className="space-y-1.5 pl-2 border-l-2 border-cyan-500/40 text-slate-300">
            <div>• <strong className="text-white">Page 01</strong>: Merchant Landing & URL Entry (Implemented)</div>
            <div>• <strong className="text-white">Page 02</strong>: Product Analysis & First Moment of Value (Active)</div>
            <div>• <strong className="text-cyan-300 font-semibold">Page 03</strong>: Full Product Intelligence Report (Scheduled for next prompt)</div>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Full report modules (Variant Matrix, Authoritative Evidence Console, and Merchant Claim Verification) will be constructed in Prompt 03.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Continue Inspecting Page 02
          </button>
        </div>
      </div>
    </div>
  );
};
