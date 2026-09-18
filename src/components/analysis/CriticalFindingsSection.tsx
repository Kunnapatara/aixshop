import React, { useState } from 'react';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { sampleCriticalFindings } from '../../data/sampleIntelligence';
import { CriticalFindingItem } from '../../types/landing';

export const CriticalFindingsSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('finding-1');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? '' : id);
  };

  const getSeverityBadge = (severity: CriticalFindingItem['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <AlertCircle className="w-3.5 h-3.5" />
            CRITICAL
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            WARNING
          </span>
        );
      case 'INFORMATION':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Info className="w-3.5 h-3.5" />
            INFORMATION
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-7 mb-12 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Prioritized Diagnostics</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Section 08</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Critical Findings
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Key merchant attention points: missing proof, schema conflict, and verified anchors.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-950 border border-slate-800 text-slate-400 self-start sm:self-auto">
          <span>Example Diagnostic Findings · Click to Expand Details</span>
        </div>
      </div>

      <div className="space-y-3">
        {sampleCriticalFindings.map((finding) => {
          const isExpanded = expandedId === finding.id;

          return (
            <div 
              key={finding.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                finding.severity === 'CRITICAL' 
                  ? 'bg-slate-950/70 border-rose-900/40 hover:border-rose-500/50' 
                  : finding.severity === 'WARNING'
                    ? 'bg-slate-950/70 border-amber-900/40 hover:border-amber-500/50'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header (Clickable) */}
              <button
                onClick={() => toggleExpand(finding.id)}
                className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="shrink-0">{getSeverityBadge(finding.severity)}</div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white">
                      {finding.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {finding.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hidden sm:inline-block">
                    State: {finding.evidenceState}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expandable Detail Content */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-slate-800/60 bg-slate-900/40 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* What Happened */}
                    <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        What Happened
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {finding.whatHappened}
                      </p>
                    </div>

                    {/* Why It Matters */}
                    <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                      <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                        Why It Matters
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {finding.whyItMatters}
                      </p>
                    </div>
                  </div>

                  {/* Evidence State & Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 font-medium">Evidence State:</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        finding.evidenceState === 'MISSING' 
                          ? 'bg-rose-500/20 text-rose-300' 
                          : finding.evidenceState === 'CONFLICT'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-cyan-500/20 text-cyan-300'
                      }`}>
                        {finding.evidenceState}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-cyan-300">
                      <span className="text-slate-400">Suggested Action:</span>
                      <span className="font-medium text-slate-200">{finding.suggestedAction}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
