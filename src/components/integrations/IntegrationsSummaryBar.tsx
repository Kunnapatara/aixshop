import React from 'react';
import { 
  CheckCircle2, 
  Workflow, 
  Package, 
  Clock, 
  ShieldAlert, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { sampleIntegrationsSummary } from '../../data/sampleIntegrationsData';

interface IntegrationsSummaryBarProps {
  onFilterStatus?: (status: string) => void;
}

export const IntegrationsSummaryBar: React.FC<IntegrationsSummaryBarProps> = ({
  onFilterStatus
}) => {
  const s = sampleIntegrationsSummary;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* 1. Connected Sources */}
        <div 
          onClick={() => onFilterStatus?.('CONNECTED')}
          className="rounded-2xl bg-white border border-stone-200/80 p-4 hover:border-orange-300 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Connected</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-stone-900">{s.connectedSources}</span>
            <span className="text-[10px] font-mono text-stone-400">Active</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">
            2 of 7 authorized
          </div>
        </div>

        {/* 2. Available Sources */}
        <div 
          onClick={() => onFilterStatus?.('ALL')}
          className="rounded-2xl bg-white border border-stone-200/80 p-4 hover:border-orange-300 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Available</span>
            <Workflow className="w-4 h-4 text-[#F97316] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-stone-900">{s.availableSources}</span>
            <span className="text-[10px] font-mono text-stone-400">Connectors</span>
          </div>
          <div className="mt-1 text-[11px] text-stone-500 font-medium">
            Commerce, feeds, specs
          </div>
        </div>

        {/* 3. Products Covered */}
        <div className="rounded-2xl bg-white border border-stone-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Covered</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-stone-900">{s.productsCovered}</span>
            <span className="text-[10px] font-mono text-stone-400">Products</span>
          </div>
          <div className="mt-1 text-[11px] text-stone-500 font-medium">
            68 variants / 42 offers
          </div>
        </div>

        {/* 4. Last Observation */}
        <div className="rounded-2xl bg-white border border-stone-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Observed</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-stone-900">{s.lastObservation}</span>
          </div>
          <div className="mt-1 text-[11px] text-stone-500 font-medium">
            Representative snapshot
          </div>
        </div>

        {/* 5. Permission Warnings */}
        <div className="rounded-2xl bg-white border border-stone-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Perm. Warnings</span>
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-700">{s.permissionWarnings}</span>
            <span className="text-[10px] font-mono text-stone-400">Flags</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">
            Least privilege enforced
          </div>
        </div>

        {/* 6. Sources Requiring Attention */}
        <div 
          onClick={() => onFilterStatus?.('NEEDS_ATTENTION')}
          className="rounded-2xl bg-amber-50/60 border border-amber-200 p-4 hover:border-amber-400 shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-amber-800 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Attention</span>
            <AlertTriangle className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-900">{s.sourcesRequiringAttention}</span>
            <span className="text-[10px] font-mono text-stone-500">Source</span>
          </div>
          <div className="mt-1 text-[11px] text-amber-800 font-medium truncate">
            Weight conflict detected
          </div>
        </div>

      </div>

      {/* Representative Label Disclaimer */}
      <div className="mt-2.5 flex items-center justify-end gap-1 text-[11px] text-stone-400 font-mono">
        <Info className="w-3 h-3 text-stone-400" />
        <span>Representative preview values · Independent observation environment</span>
      </div>
    </div>
  );
};
