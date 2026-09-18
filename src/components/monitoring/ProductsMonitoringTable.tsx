// src/components/monitoring/ProductsMonitoringTable.tsx
import React from 'react';
import { 
  Package, 
  AlertOctagon, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  HelpCircle, 
  Clock, 
  ChevronRight, 
  FileCheck2, 
  DollarSign, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { MonitoredProductSummary, MonitoringPriority, MonitoringState } from '../../types/monitoring';

interface ProductsMonitoringTableProps {
  products: MonitoredProductSummary[];
  onSelectProduct: (product: MonitoredProductSummary) => void;
  onNavigateWorkbench: () => void;
  onNavigateOffers: () => void;
}

export const ProductsMonitoringTable: React.FC<ProductsMonitoringTableProps> = ({
  products,
  onSelectProduct,
  onNavigateWorkbench,
  onNavigateOffers
}) => {
  const getPriorityBadge = (priority: MonitoringPriority) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertOctagon className="w-3 h-3 text-rose-600" />
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Medium
          </span>
        );
      case 'Low':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-stone-100 text-stone-600 border border-stone-200">
            Low
          </span>
        );
    }
  };

  const getStateBadge = (state: MonitoringState) => {
    switch (state) {
      case 'stable':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Stable
          </span>
        );
      case 'changed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-orange-50 text-[#F97316] border border-orange-200">
            <Activity className="w-3 h-3 text-[#F97316]" />
            Changed
          </span>
        );
      case 'needs_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <HelpCircle className="w-3 h-3 text-amber-600" />
            Needs Review
          </span>
        );
      case 'conflict':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertOctagon className="w-3 h-3 text-rose-600" />
            Conflict
          </span>
        );
      case 'stale_unknown':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-stone-100 text-stone-600 border border-stone-200">
            <Clock className="w-3 h-3 text-stone-500" />
            Stale / Unknown
          </span>
        );
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">
            Products Requiring Monitoring Attention
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
            {products.length} Products Monitored
          </span>
        </div>
        <span className="text-[11px] font-mono text-stone-400">
          Representative Catalog View
        </span>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs text-stone-700">
          <thead className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-mono uppercase text-stone-500">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Product</th>
              <th className="py-3.5 px-3 font-semibold">State</th>
              <th className="py-3.5 px-3 font-semibold text-center">Changes</th>
              <th className="py-3.5 px-3 font-semibold text-center">Evidence</th>
              <th className="py-3.5 px-3 font-semibold text-center">Offers</th>
              <th className="py-3.5 px-3 font-semibold text-center">Discovery</th>
              <th className="py-3.5 px-3 font-semibold">Priority</th>
              <th className="py-3.5 px-4 font-semibold">Last Observation</th>
              <th className="py-3.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map((p) => {
              const isAttention = p.priority === 'Critical' || p.priority === 'High';

              return (
                <tr
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className={`hover:bg-stone-50 transition-colors cursor-pointer ${
                    isAttention ? 'bg-orange-50/15' : 'bg-transparent'
                  }`}
                >
                  {/* Product */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <div className="font-bold text-stone-900 hover:text-[#F97316] transition-colors">
                        {p.name}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400">
                        <span>SKU: {p.sku}</span>
                        <span>·</span>
                        <span>GTIN: {p.gtin}</span>
                      </div>
                    </div>
                  </td>

                  {/* State */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {getStateBadge(p.monitoringState)}
                  </td>

                  {/* Changes Total */}
                  <td className="py-3.5 px-3 text-center">
                    <span className={`font-mono font-bold ${p.totalChanges > 0 ? 'text-[#F97316]' : 'text-stone-400'}`}>
                      {p.totalChanges}
                    </span>
                  </td>

                  {/* Evidence Changes */}
                  <td className="py-3.5 px-3 text-center">
                    <span className={`font-mono ${p.evidenceChanges > 0 ? 'text-blue-700 font-bold' : 'text-stone-400'}`}>
                      {p.evidenceChanges}
                    </span>
                  </td>

                  {/* Offer Changes */}
                  <td className="py-3.5 px-3 text-center">
                    <span className={`font-mono ${p.offerChanges > 0 ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
                      {p.offerChanges}
                    </span>
                  </td>

                  {/* Discovery Changes */}
                  <td className="py-3.5 px-3 text-center">
                    <span className={`font-mono ${p.discoveryChanges > 0 ? 'text-purple-700 font-bold' : 'text-stone-400'}`}>
                      {p.discoveryChanges}
                    </span>
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {getPriorityBadge(p.priority)}
                  </td>

                  {/* Last Observation */}
                  <td className="py-3.5 px-4 text-[11px] font-mono text-stone-500 whitespace-nowrap">
                    {p.lastObservation}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(p);
                      }}
                      className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-[#F97316] transition-colors cursor-pointer"
                      title="Inspect Product Monitoring"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Stack */}
      <div className="md:hidden space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelectProduct(p)}
            className="p-4 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-2.5 active:bg-stone-50 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold text-stone-900">
                  {p.name}
                </h4>
                <div className="text-[10px] font-mono text-stone-400 mt-0.5">
                  SKU: {p.sku} · GTIN: {p.gtin}
                </div>
              </div>
              {getPriorityBadge(p.priority)}
            </div>

            <div className="flex items-center justify-between text-xs py-2 border-y border-stone-100">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-stone-500 font-medium">State:</span>
                {getStateBadge(p.monitoringState)}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-stone-500">Changes:</span>
                <span className="font-bold text-[#F97316]">{p.totalChanges}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-400 block mb-0.5">Evidence</span>
                <span className="font-bold text-blue-700">{p.evidenceChanges}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Offers</span>
                <span className="font-bold text-emerald-700">{p.offerChanges}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Discovery</span>
                <span className="font-bold text-purple-700">{p.discoveryChanges}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 pt-1">
              <span>Observed: {p.lastObservation}</span>
              <span className="text-[#F97316] font-bold inline-flex items-center gap-0.5">
                Inspect <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
