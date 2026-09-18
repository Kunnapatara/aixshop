// src/components/monitoring/ChangeIsNotAnIssueBanner.tsx
import React, { useState } from 'react';
import { 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  AlertOctagon, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  ZapOff 
} from 'lucide-react';

export const ChangeIsNotAnIssueBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-stone-50/70 border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl bg-white border border-stone-200 p-4 shadow-2xs">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shrink-0 mt-0.5 shadow-3xs">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">
                    A Change Is Not Automatically an Issue
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
                    Mandatory Diagnostic Principle
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  QRxMENU interprets changes in context. An observation (such as a price drop or spec update) is evaluated through deterministic impact analysis and evidence validation before declaring priority or recommending action.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs font-semibold border border-stone-200 transition-colors shrink-0 cursor-pointer shadow-3xs"
            >
              <span>{isExpanded ? 'Hide Model Details' : 'View Pipeline Examples'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
            </button>
          </div>

          {/* Expanded Pipeline Comparison */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-stone-100 space-y-4 animate-in fade-in duration-200">
              {/* Pipeline sequence visual */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] font-mono text-stone-600 flex flex-wrap items-center justify-center gap-2">
                <span className="text-stone-700 font-semibold">SOURCE</span>
                <ArrowRight className="w-3 h-3 text-[#F97316]" />
                <span className="text-stone-700 font-semibold">OBSERVATION</span>
                <ArrowRight className="w-3 h-3 text-[#F97316]" />
                <span className="text-[#F97316] font-bold">CHANGE DETECTION</span>
                <ArrowRight className="w-3 h-3 text-[#F97316]" />
                <span className="text-stone-700 font-semibold">IMPACT ANALYSIS</span>
                <ArrowRight className="w-3 h-3 text-[#F97316]" />
                <span className="text-stone-700 font-semibold">EVIDENCE VALIDATION</span>
                <ArrowRight className="w-3 h-3 text-[#F97316]" />
                <span className="text-amber-700 font-bold">PRIORITY</span>
                <ArrowRight className="w-3 h-3 text-[#F97316]" />
                <span className="text-emerald-700 font-bold">ACTION</span>
              </div>

              {/* Contrast Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Example 1: Non-Critical Commercial Change */}
                <div className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900">
                      Scenario 1: Commercial Offer Price Change
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 font-bold">
                      Review / Informational
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-stone-600">
                      <span className="w-24 text-[11px] font-mono text-stone-500 font-medium">1. Detection:</span>
                      <span className="font-mono text-stone-900 font-semibold">$219.00 USD → $199.00 USD</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <span className="w-24 text-[11px] font-mono text-stone-500 font-medium">2. Impact Check:</span>
                      <span className="text-stone-700">Commercial offer proposition only; no evidence conflict</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <span className="w-24 text-[11px] font-mono text-stone-500 font-medium">3. System Action:</span>
                      <span className="text-emerald-700 font-bold">Logged as informational review. Does not trigger false emergency.</span>
                    </div>
                  </div>
                </div>

                {/* Example 2: Critical Canonical Identity Conflict */}
                <div className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900">
                      Scenario 2: Canonical GTIN Barcode Alteration
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 font-bold">
                      Critical Priority
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-stone-600">
                      <span className="w-24 text-[11px] font-mono text-stone-500 font-medium">1. Detection:</span>
                      <span className="font-mono text-stone-900 font-semibold">GTIN: 00849201948172 → 00849201948127</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <span className="w-24 text-[11px] font-mono text-stone-500 font-medium">2. Impact Check:</span>
                      <span className="text-rose-700 font-medium">Canonical GS1 identity affected; potential collision</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <span className="w-24 text-[11px] font-mono text-stone-500 font-medium">3. System Action:</span>
                      <span className="text-rose-700 font-bold">Elevated to Critical. Flags immediate risk of marketplace indexing failure.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
