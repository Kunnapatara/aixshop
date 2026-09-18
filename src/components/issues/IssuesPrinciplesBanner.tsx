// src/components/issues/IssuesPrinciplesBanner.tsx
// Principle banner communicating "Change ≠ Issue" and the Recovery Pipeline

import React, { useState } from 'react';
import { 
  GitCommit, 
  ShieldAlert, 
  Check, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Scale, 
  HelpCircle,
  Binary
} from 'lucide-react';

export const IssuesPrinciplesBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const pipelineSteps = [
    { code: '01', name: 'DETECT', desc: 'Observe source delta', role: 'Page 09' },
    { code: '02', name: 'DIAGNOSE', desc: 'Evaluate integrity impact', role: 'Rule Engine' },
    { code: '03', name: 'CLASSIFY', desc: 'Assign Class A/B/C', role: 'Taxonomy' },
    { code: '04', name: 'PRIORITIZE', desc: 'Compute buyer impact', role: 'Formula' },
    { code: '05', name: 'PROPOSE RECOVERY', desc: 'Generate transformation', role: 'Artifact' },
    { code: '06', name: 'VALIDATE', desc: 'Run deterministic checks', role: 'Pre-check' },
    { code: '07', name: 'VERIFY', desc: 'Authenticate source truth', role: 'Human/Gate' },
    { code: '08', name: 'CLOSE', desc: 'Model resolution', role: 'Audit Log' }
  ];

  return (
    <div className="bg-orange-50/50 border-y border-orange-200/80 py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-100/80 border border-orange-300/60 text-[#F97316] shrink-0 shadow-3xs">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F97316]">
                  Foundational Principle
                </span>
                <span className="text-stone-300">·</span>
                <h3 className="text-sm font-bold text-stone-900">
                  A Change Is Not Automatically An Issue (Change ≠ Issue)
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                Monitoring events from Page 09 become Issues only when deterministic diagnosis establishes an actual intelligence, evidence, variant, or offer integrity violation.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(prev => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs font-mono font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer self-start md:self-auto shrink-0 shadow-3xs"
          >
            <span>{isExpanded ? 'Hide Pipeline Architecture' : 'View Recovery Pipeline'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#F97316]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#F97316]" />}
          </button>
        </div>

        {/* Collapsible Pipeline Representation */}
        {isExpanded && (
          <div className="pt-3 border-t border-orange-200/80 space-y-4">
            <div>
              <div className="text-[11px] font-mono font-bold text-stone-600 uppercase tracking-wider mb-2">
                Deterministic Recovery Pipeline
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {pipelineSteps.map((step, idx) => (
                  <div
                    key={step.code}
                    className="p-2.5 rounded-xl bg-white border border-stone-200 flex flex-col justify-between relative group shadow-3xs"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#F97316] font-bold mb-1">
                        <span>{step.code}</span>
                        <span className="text-stone-400 text-[9px] font-normal">{step.role}</span>
                      </div>
                      <div className="text-[11px] font-bold text-stone-900 tracking-tight">
                        {step.name}
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">
                        {step.desc}
                      </p>
                    </div>

                    {idx < pipelineSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="w-3 h-3 text-stone-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Core Architectural Tenets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-3xs">
                <div className="flex items-center gap-1.5 text-[#F97316] font-mono font-bold text-[11px] mb-1">
                  <Binary className="w-3.5 h-3.5" />
                  <span>Deterministic Rules Before AI</span>
                </div>
                <p className="text-stone-500 text-[11px] leading-relaxed">
                  Detection, classification, validation rules, and recovery eligibility are 100% deterministic code. AI models provide natural language explanations, but never act as the factual authority.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-3xs">
                <div className="flex items-center gap-1.5 text-amber-600 font-mono font-bold text-[11px] mb-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Unknown Remains Unknown</span>
                </div>
                <p className="text-stone-500 text-[11px] leading-relaxed">
                  When evidence is absent or sources contradict each other, AIXSHOP preserves <code className="text-amber-700 bg-amber-50 px-1 py-0.5 rounded font-mono">MISSING</code> or <code className="text-rose-700 bg-rose-50 px-1 py-0.5 rounded font-mono">CONFLICT</code>. We never guess, fabricate defaults, or average.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-3xs">
                <div className="flex items-center gap-1.5 text-purple-600 font-mono font-bold text-[11px] mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Recovery ≠ Just a Click</span>
                </div>
                <p className="text-stone-500 text-[11px] leading-relaxed">
                  An issue is not resolved by dismissing it. A recovery is certified only when deterministic validation rules pass and required human merchant verification is explicitly recorded in the audit log.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
