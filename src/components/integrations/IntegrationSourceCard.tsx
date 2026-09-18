import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Lock, 
  ArrowUpRight, 
  Layers, 
  Database,
  FileCode2,
  Share2,
  ExternalLink,
  ChevronRight,
  Sliders
} from 'lucide-react';
import { IntegrationSource } from '../../types/integrations';

interface IntegrationSourceCardProps {
  source: IntegrationSource;
  onInspect: (source: IntegrationSource) => void;
  onOpenPermissions: (source: IntegrationSource) => void;
  onStartConnect: (source: IntegrationSource) => void;
}

export const IntegrationSourceCard: React.FC<IntegrationSourceCardProps> = ({
  source,
  onInspect,
  onOpenPermissions,
  onStartConnect
}) => {
  const renderStatusBadge = () => {
    switch (source.status) {
      case 'CONNECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-3xs">
            <CheckCircle2 className="w-3 h-3" />
            CONNECTED
          </span>
        );
      case 'NEEDS_ATTENTION':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-3xs">
            <AlertTriangle className="w-3 h-3" />
            NEEDS ATTENTION
          </span>
        );
      case 'NOT_CONNECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-stone-100 text-stone-600 border border-stone-200 shadow-3xs">
            <Clock className="w-3 h-3" />
            NOT CONNECTED
          </span>
        );
      case 'PARTIAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-orange-50 text-orange-800 border border-orange-200 shadow-3xs">
            <Sliders className="w-3 h-3" />
            PARTIAL SCOPE
          </span>
        );
      case 'REVOKED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200 shadow-3xs">
            <AlertCircle className="w-3 h-3" />
            REVOKED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-stone-100 text-stone-700 border border-stone-200 shadow-3xs">
            PREVIEW
          </span>
        );
    }
  };

  return (
    <div className={`rounded-3xl border transition-all flex flex-col justify-between ${
      source.status === 'CONNECTED'
        ? 'bg-white border-stone-200/90 hover:border-orange-300 shadow-xs'
        : source.status === 'NEEDS_ATTENTION'
        ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300 shadow-xs'
        : 'bg-white border-stone-200/80 hover:border-stone-300 shadow-xs'
    } p-5 group`}>
      
      {/* Card Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-800 font-bold px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200">
                {source.categoryLabel}
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                {source.connectionMethod}
              </span>
            </div>
            <h3 className="text-base font-bold text-stone-900 group-hover:text-[#F97316] transition-colors">
              {source.name}
            </h3>
          </div>
          {renderStatusBadge()}
        </div>

        {/* Short Description */}
        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mt-1 mb-3">
          {source.shortDescription}
        </p>

        {/* Attention Notice if present */}
        {source.attentionNotice && (
          <div className="mb-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span className="font-medium">{source.attentionNotice}</span>
          </div>
        )}

        {/* Scope & Provider Detail */}
        <div className="rounded-2xl bg-stone-50 border border-stone-200/80 p-3 space-y-2 mb-3.5 text-xs">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-mono text-stone-400">Scope:</span>
            <span className="font-mono text-stone-800 font-medium text-right truncate max-w-[200px]">{source.scope}</span>
          </div>
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-mono text-stone-400">Provider:</span>
            <span className="text-stone-800 font-medium text-right truncate max-w-[200px]">{source.provider}</span>
          </div>
          {source.status === 'CONNECTED' && (
            <div className="flex items-center justify-between text-stone-500 pt-1 border-t border-stone-200">
              <span className="text-[11px] font-mono text-stone-400">Last Observation:</span>
              <span className="font-mono text-[#F97316] font-semibold">{source.lastObservation}</span>
            </div>
          )}
        </div>

        {/* Least Privilege Summary Tags */}
        <div className="space-y-1.5 mb-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold">
            Permissions & Data Boundary
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200 font-mono text-[10px]">
              READ: {source.readPermissions.length} Scopes
            </span>
            <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200 font-mono text-[10px] flex items-center gap-1">
              <Lock className="w-3 h-3 text-stone-400" />
              WRITE: Disabled
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px] font-medium">
              Zero PII
            </span>
          </div>
        </div>

        {/* Coverage Counters if Connected */}
        {source.status === 'CONNECTED' && (
          <div className="grid grid-cols-3 gap-1.5 mb-4 p-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-center font-mono">
            <div>
              <div className="text-[10px] text-stone-400 uppercase font-semibold">Products</div>
              <div className="text-xs font-bold text-stone-900">{source.coverage.productsCount}</div>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 uppercase font-semibold">Offers</div>
              <div className="text-xs font-bold text-blue-700">{source.coverage.offersCount}</div>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 uppercase font-semibold">Evidence</div>
              <div className="text-xs font-bold text-emerald-700">{source.coverage.evidenceRecordsCount}</div>
            </div>
          </div>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenPermissions(source)}
          className="text-xs font-semibold text-stone-500 hover:text-stone-900 px-2.5 py-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
        >
          Permissions
        </button>

        <div className="flex items-center gap-2">
          {source.status === 'CONNECTED' ? (
            <button
              type="button"
              onClick={() => onInspect(source)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold transition-colors cursor-pointer shadow-3xs"
            >
              <span>Inspect Source</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : source.canConfigureFeed ? (
            <button
              type="button"
              onClick={() => onStartConnect(source)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs font-bold transition-colors cursor-pointer shadow-3xs"
            >
              <span>Configure Feed</span>
              <Sliders className="w-3.5 h-3.5 text-stone-500" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onStartConnect(source)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>Connect Preview</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
