// src/components/monitoring/MonitoringPrinciplesSection.tsx
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  History, 
  FileCheck2, 
  AlertOctagon, 
  Layers, 
  Clock, 
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const MonitoringPrinciplesSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const principles = [
    {
      title: "Detect, Don't Assume",
      desc: "A change is evidence of an observed difference, not proof of an error, fraud, or misconfiguration.",
      icon: ShieldCheck,
      color: "text-cyan-400"
    },
    {
      title: "Preserve History",
      desc: "Both before and after values are captured with timestamps and source identifiers to maintain an immutable audit trail.",
      icon: History,
      color: "text-blue-400"
    },
    {
      title: "Evidence First",
      desc: "Every material claim must be backed by a verifiable source. Changes in evidence state are tracked as first-class events.",
      icon: FileCheck2,
      color: "text-emerald-400"
    },
    {
      title: "No Silent Resolution",
      desc: "Discrepancies remain explicit CONFLICTS. AIXSHOP will never calculate silent averages (e.g. 320g vs 325g never becomes 322.5g).",
      icon: AlertOctagon,
      color: "text-rose-400"
    },
    {
      title: "Product ≠ Offer",
      desc: "Commercial offer changes (price, availability, shipping) never overwrite or alter canonical product specifications or identity.",
      icon: Layers,
      color: "text-purple-400"
    },
    {
      title: "No False Freshness",
      desc: "If validUntil is unspecified, validity remains explicitly 'Unknown'. Systems must not invent false expiration dates.",
      icon: Clock,
      color: "text-amber-400"
    },
    {
      title: "Explain Priority",
      desc: "Every priority classification is deterministic and accompanied by an explicit, auditable rationale explaining why attention is required.",
      icon: HelpCircle,
      color: "text-teal-400"
    }
  ];

  return (
    <div className="bg-stone-100/50 border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">
              QRxMENU Monitoring Principles
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
              7 Foundational Laws
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 text-xs text-[#F97316] hover:text-orange-700 font-bold transition-colors cursor-pointer"
          >
            <span>{isOpen ? 'Collapse Principles' : 'Review Principles'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4 pt-3 border-t border-stone-200 animate-in fade-in duration-200">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${p.color} shrink-0`} />
                    <h4 className="text-xs font-bold text-stone-900">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
