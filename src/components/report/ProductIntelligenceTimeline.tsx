import React from 'react';
import { 
  Clock, 
  History, 
  CheckCircle2, 
  AlertTriangle, 
  Store, 
  FileCode, 
  Radio,
  Info 
} from 'lucide-react';
import { IntelligenceTimelineEvent } from '../../types/landing';

interface ProductIntelligenceTimelineProps {
  events: IntelligenceTimelineEvent[];
}

export const ProductIntelligenceTimeline: React.FC<ProductIntelligenceTimelineProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'identity':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'specification':
        return <FileCode className="w-3.5 h-3.5 text-[#F97316]" />;
      case 'conflict':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
      case 'offer':
        return <Store className="w-3.5 h-3.5 text-blue-600" />;
      case 'diagnostic':
        return <Radio className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-stone-400" />;
    }
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-stone-600" />
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Intelligence History
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Chronological log of facts detected, evidence corroborated, and diagnostic evaluations.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-300 px-3 py-1 rounded-xl shadow-3xs">
          Preview Timeline — not persistent history
        </span>
      </div>

      {/* Timeline List */}
      <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-xs">
        <div className="relative border-l border-stone-200 ml-3 space-y-6 py-2">
          {events.map((event) => (
            <div key={event.id} className="relative pl-6">
              {/* Event node icon */}
              <div className="absolute -left-3 top-0.5 w-6 h-6 rounded-full bg-white border border-stone-300 flex items-center justify-center shadow-3xs">
                {getEventIcon(event.type)}
              </div>

              {/* Event Content */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-xs text-stone-900">
                    {event.title}
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {event.timestamp}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                    {event.source}
                  </span>
                </div>

                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span>Note: In production with database integration, this timeline tracks verifiable audit signatures and state changes over time.</span>
        </div>
      </div>
    </section>
  );
};
