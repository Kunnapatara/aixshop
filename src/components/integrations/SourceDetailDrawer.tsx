import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Trash2, 
  Activity, 
  Layers, 
  Info,
  Clock,
  Database,
  ArrowRight
} from 'lucide-react';
import { IntegrationSource } from '../../types/integrations';

interface SourceDetailDrawerProps {
  source: IntegrationSource | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenRevokeModal: (source: IntegrationSource) => void;
  onNavigateMonitoring?: () => void;
  onNavigateIssues?: () => void;
}

export const SourceDetailDrawer: React.FC<SourceDetailDrawerProps> = ({
  source,
  isOpen,
  onClose,
  onOpenRevokeModal,
  onNavigateMonitoring,
  onNavigateIssues
}) => {
  if (!isOpen || !source) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity" 
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between overflow-y-auto">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-200 bg-[#FAF8F5] sticky top-0 z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-800 font-bold px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200 shadow-3xs">
                    {source.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {source.connectionMethod}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-stone-900">
                  {source.name}
                </h2>
                <div className="mt-1 text-xs font-mono text-stone-500">
                  Provider: <span className="text-stone-800 font-semibold">{source.provider}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white text-stone-500 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer shadow-3xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scope & Status Pill */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-white border border-stone-200 text-xs shadow-3xs">
              <div>
                <span className="text-stone-400 font-mono text-[10px] uppercase font-semibold block">Assigned Scope:</span>
                <span className="font-mono text-stone-900 font-bold">{source.scope}</span>
              </div>
              <div>
                <span className="text-stone-400 font-mono text-[10px] uppercase font-semibold block">Status:</span>
                <span className="font-mono text-emerald-700 font-bold">{source.status}</span>
              </div>
            </div>
          </div>

          {/* Drawer Content Body */}
          <div className="p-6 space-y-6 flex-1 text-xs">
            
            {/* Purpose & Why Needed */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold">
                Source Purpose & Intelligence Role
              </h3>
              <p className="text-stone-600 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200">
                {source.detailedPurpose}
              </p>
              <div className="text-[11px] text-stone-500 px-1">
                <strong className="text-stone-800">Why needed: </strong>{source.whyNeeded}
              </div>
            </div>

            {/* Attention Warning if any */}
            {source.attentionNotice && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 space-y-1.5 shadow-3xs">
                <div className="font-bold flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Observation Attention Required</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900">
                  {source.attentionNotice}
                </p>
                {onNavigateIssues && (
                  <button
                    type="button"
                    onClick={onNavigateIssues}
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-mono text-amber-800 font-bold hover:underline cursor-pointer"
                  >
                    <span>Inspect corresponding issue on Page 10</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Zero Customer PII Guarantee Box */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Customer PII Policy (Enforced)</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                AIXSHOP operates solely on product intelligence, specifications, and commercial offer pricing. 
                Customer personal identities, email addresses, order histories, and payment credentials are 
                never requested and strictly excluded at API handshake.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px] text-center">
                <div className="p-2 rounded-xl bg-white border border-emerald-200 text-stone-600 shadow-3xs">
                  Customers: <strong className="text-emerald-700 block mt-0.5 font-bold">Not Requested</strong>
                </div>
                <div className="p-2 rounded-xl bg-white border border-emerald-200 text-stone-600 shadow-3xs">
                  Orders: <strong className="text-emerald-700 block mt-0.5 font-bold">Not Requested</strong>
                </div>
                <div className="p-2 rounded-xl bg-white border border-emerald-200 text-stone-600 shadow-3xs">
                  Payments: <strong className="text-emerald-700 block mt-0.5 font-bold">Not Requested</strong>
                </div>
              </div>
            </div>

            {/* Permissions Breakdown: READ vs WRITE */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold">
                  Authorized Permission Scopes
                </h3>
                <span className="text-[10px] font-mono text-orange-800 font-bold">Least-Privilege Model</span>
              </div>

              {/* READ Permissions */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-stone-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>READ SCOPES (Authorized)</span>
                </div>
                <div className="space-y-1.5">
                  {source.readPermissions.map((perm, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-stone-900">{perm.name}</div>
                        <div className="text-[11px] text-stone-500 leading-tight mt-0.5">{perm.description}</div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-orange-50 text-orange-800 border border-orange-200 font-bold shrink-0">
                        READ
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WRITE Permissions */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <div className="text-[11px] font-mono text-stone-500 font-semibold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  <span>WRITE SCOPES (Disabled by Default)</span>
                </div>
                <div className="space-y-1.5">
                  {source.writePermissions.map((perm, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-stone-50/60 border border-stone-200/80 flex items-start justify-between gap-3 opacity-75">
                      <div>
                        <div className="font-semibold text-stone-500">{perm.name}</div>
                        <div className="text-[11px] text-stone-400 leading-tight mt-0.5">{perm.description}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-stone-200 text-stone-600 font-medium shrink-0">
                        DISABLED
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Data Coverage Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-stone-200">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold">
                Observed Data Coverage
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 shadow-3xs">
                  <div className="text-[10px] text-stone-400 font-semibold uppercase">Products</div>
                  <div className="text-sm font-bold text-stone-900">{source.coverage.productsCount}</div>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 shadow-3xs">
                  <div className="text-[10px] text-stone-400 font-semibold uppercase">Variants</div>
                  <div className="text-sm font-bold text-stone-900">{source.coverage.variantsCount}</div>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 shadow-3xs">
                  <div className="text-[10px] text-stone-400 font-semibold uppercase">Offers</div>
                  <div className="text-sm font-bold text-blue-700">{source.coverage.offersCount}</div>
                </div>
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 shadow-3xs">
                  <div className="text-[10px] text-stone-400 font-semibold uppercase">Evidence Records</div>
                  <div className="text-sm font-bold text-emerald-700">{source.coverage.evidenceRecordsCount}</div>
                </div>
              </div>
            </div>

            {/* Health Dimensions in Drawer */}
            <div className="space-y-2 pt-2 border-t border-stone-200">
              <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400 font-bold">
                Diagnostic Health Dimensions
              </h3>
              <div className="space-y-1.5">
                {source.healthDimensions.map((dim, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-stone-700 font-mono text-[11px] font-medium">{dim.name}</span>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md font-bold ${
                      dim.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      dim.status === 'Needs Attention' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      'bg-stone-200 text-stone-600'
                    }`}>
                      {dim.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-stone-200 bg-[#FAF8F5] sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-3">
            {source.status === 'CONNECTED' ? (
              <button
                type="button"
                onClick={() => onOpenRevokeModal(source)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-colors cursor-pointer shadow-3xs"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Revoke Connection</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-stone-400">
                Connection Preview Model
              </span>
            )}

            <div className="flex items-center gap-2">
              {onNavigateMonitoring && (
                <button
                  type="button"
                  onClick={onNavigateMonitoring}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors cursor-pointer border border-stone-200 shadow-3xs"
                >
                  <Activity className="w-3.5 h-3.5 text-stone-500" />
                  <span>Monitoring</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
