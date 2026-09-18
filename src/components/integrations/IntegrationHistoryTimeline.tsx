import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Workflow, 
  Activity,
  History,
  Info
} from 'lucide-react';
import { sampleIntegrationHistory } from '../../data/sampleIntegrationsData';
import { IntegrationHistoryEvent } from '../../types/integrations';

export const IntegrationHistoryTimeline: React.FC = () => {
  const renderEventTypeBadge = (type: IntegrationHistoryEvent['eventType']) => {
    switch (type) {
      case 'OBSERVATION_RECEIVED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-50 text-orange-800 border border-orange-200 shadow-3xs">
            OBSERVATION RECEIVED
          </span>
        );
      case 'EVIDENCE_GENERATED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-3xs">
            EVIDENCE GENERATED
          </span>
        );
      case 'AUTH_CHECK':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-stone-100 text-stone-700 border border-stone-200 shadow-3xs">
            AUTH CHECK
          </span>
        );
      case 'HEALTH_WARNING':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-3xs">
            HEALTH WARNING
          </span>
        );
      case 'SCHEMA_CHANGE':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200 shadow-3xs">
            SCHEMA DIAGNOSTIC
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-stone-100 text-stone-600 border border-stone-200 shadow-3xs">
            SYNC EVENT
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-3xl bg-white border border-stone-200/80 p-6 shadow-xs space-y-5">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-[#F97316] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 flex items-center gap-1 shadow-3xs">
                <History className="w-3.5 h-3.5 text-[#F97316]" />
                Audit Trail & Sync History
              </span>
              <span className="text-xs font-mono text-stone-400">
                Representative Observation Chronology
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 font-sans">
              Recent Observation & Ingestion Events
            </h2>
            <p className="text-xs text-stone-500 mt-1 max-w-2xl leading-relaxed">
              Chronological log of data acquisitions, robots.txt verifications, feed syncs, and resulting 
              evidence state transitions. Every event preserves cryptographic lineage.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-500 bg-stone-50 px-3.5 py-1.5 rounded-xl border border-stone-200 shadow-3xs">
            <Info className="w-3.5 h-3.5 text-stone-400" />
            <span>Preview Mode · Representative Event Log</span>
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-3">
          {sampleIntegrationHistory.map(evt => (
            <div 
              key={evt.id}
              className="rounded-2xl bg-stone-50/70 border border-stone-200 p-4 hover:border-orange-200 hover:bg-stone-50 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4 text-xs shadow-3xs"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0 text-[#F97316] mt-0.5 shadow-3xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">{evt.headline}</span>
                    {renderEventTypeBadge(evt.eventType)}
                  </div>
                  <div className="text-[11px] font-mono text-[#F97316] font-semibold">
                    Source: {evt.sourceName}
                  </div>
                  <p className="text-stone-600 leading-relaxed max-w-2xl text-xs">
                    {evt.detail}
                  </p>
                </div>
              </div>

              <div className="flex md:flex-col items-end justify-between md:justify-center gap-1 shrink-0 font-mono text-right text-[11px]">
                <div className="text-stone-800 font-bold">{evt.timeAgo}</div>
                <div className="text-stone-400 text-[10px]">{evt.timestamp}</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-stone-400">Records:</span>
                  <span className="text-stone-900 font-extrabold">{evt.recordsAffected}</span>
                  {evt.evidenceGenerated !== 'NONE' && (
                    <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold shadow-3xs">
                      → {evt.evidenceGenerated}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
