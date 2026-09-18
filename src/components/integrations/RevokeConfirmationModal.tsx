import React from 'react';
import { 
  AlertTriangle, 
  Trash2, 
  X, 
  ShieldAlert, 
  Database, 
  Info, 
  Clock 
} from 'lucide-react';
import { IntegrationSource } from '../../types/integrations';

interface RevokeConfirmationModalProps {
  source: IntegrationSource | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRevocation: (sourceId: string) => void;
}

export const RevokeConfirmationModal: React.FC<RevokeConfirmationModalProps> = ({
  source,
  isOpen,
  onClose,
  onConfirmRevocation
}) => {
  if (!isOpen || !source) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Dialog Card */}
      <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 space-y-5 z-10">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0 shadow-3xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-extrabold text-stone-900 font-sans">
              Revoke Authorization for {source.name}?
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Confirm source disconnection and review audit retention impact.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Distinction Explanation */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5 text-xs text-stone-700">
          <div className="font-bold text-stone-900 flex items-center gap-1.5 font-mono text-[11px]">
            <Database className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Connection Revocation vs Data Retention Policy</span>
          </div>
          <p className="leading-relaxed text-stone-600 text-[11px]">
            Revoking access <strong>immediately suspends all future data acquisition</strong> and scheduled sentinel crawls from this endpoint.
          </p>
          <div className="border-t border-stone-200 pt-2.5 space-y-1.5 text-[11px] font-mono">
            <div className="flex items-center gap-2 text-rose-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
              <span>Future observations: Terminated immediately</span>
            </div>
            <div className="flex items-center gap-2 text-stone-800 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
              <span>Historical evidence ({source.coverage.evidenceRecordsCount} records): Retained in cryptographic audit ledger</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
              <span>Canonical Product Identities: Unaltered (GS1 anchors preserved)</span>
            </div>
          </div>
        </div>

        {/* Simulation Notice */}
        <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 text-[11px] text-orange-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
          <span>
            <strong>Representative Simulation:</strong> Confirming will transition this source to REVOKED status in your local preview state. No external credentials will be affected.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors cursor-pointer border border-stone-200 shadow-3xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmRevocation(source.id);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            Confirm Revocation
          </button>
        </div>

      </div>
    </div>
  );
};
