import React from 'react';
import { Globe, ArrowLeft, AlertTriangle, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

interface AnalysisHeaderProps {
  submittedUrl: string;
  onBackToLanding: () => void;
}

export const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({ submittedUrl, onBackToLanding }) => {
  return (
    <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button 
                onClick={onBackToLanding}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors mr-1 cursor-pointer"
                title="Return to URL input"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change URL</span>
              </button>
              <span className="text-slate-600">/</span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Analyze Product
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                Example Analysis · Preview Mode
              </span>
            </div>

            {/* Submitted URL source bar */}
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg max-w-2xl overflow-hidden">
              <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-slate-400 text-xs shrink-0">Source:</span>
              <span className="truncate text-cyan-200">{submittedUrl}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium text-slate-300 flex items-center gap-1.5 justify-end">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Evidence-Driven Engine</span>
              </div>
              <div className="text-[11px] text-slate-500">Live web crawling disabled in preview</div>
            </div>
            <button
              onClick={onBackToLanding}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
            >
              Analyze Another URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
