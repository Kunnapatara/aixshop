import React, { useState } from 'react';
import { History, Clock, ChevronDown, ChevronUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ShopperTimelineEvent } from '../../types/shopper';

interface ShopperTimelineProps {
  timeline: ShopperTimelineEvent[];
}

export const ShopperTimeline: React.FC<ShopperTimelineProps> = ({ timeline }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayItems = isExpanded ? timeline : timeline.slice(0, 3);

  return (
    <div className="rounded-2xl bg-[#090E18] border border-slate-800/90 shadow-xl p-5 sm:p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Product Intelligence Timeline
          </h3>
        </div>

        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
          Representative Intelligence History · Preview Mode
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {displayItems.map((event) => (
          <div key={event.id} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-[#090E18] group-hover:scale-125 transition-transform"></div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                {event.title}
              </div>
              <span className="text-[10px] font-mono text-cyan-400/90">
                {event.timeframe}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
              {event.details}
            </p>

            <div className="text-[9px] font-mono text-slate-500 mt-1 flex items-center gap-2">
              <span>Source: {event.source}</span>
              <span className="text-slate-700">·</span>
              <span className="text-slate-400">{event.state}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Expand/Collapse Toggle */}
      {timeline.length > 3 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
        >
          <span>{isExpanded ? 'Show fewer timeline events' : `View all ${timeline.length} recorded events`}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
};
