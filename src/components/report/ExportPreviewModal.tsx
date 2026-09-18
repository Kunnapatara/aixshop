import React from 'react';
import { X, FileText, Info } from 'lucide-react';

interface ExportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const ExportPreviewModal: React.FC<ExportPreviewModalProps> = ({
  isOpen,
  onClose,
  productName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-3xl bg-white border border-stone-200 shadow-xl p-6 sm:p-7 text-stone-900 relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">Export Intelligence Report</h3>
            <p className="text-xs font-mono text-[#F97316] font-bold">Preview Mode · Feature Boundary</p>
          </div>
        </div>

        <div className="space-y-3.5 text-sm text-stone-600 leading-relaxed mb-6">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-mono space-y-1 shadow-3xs">
            <div className="text-stone-500 font-medium">Target Entity:</div>
            <div className="text-stone-900 font-bold text-sm">{productName}</div>
            <div className="text-stone-500">Format: JSON-LD Canonical & PDF Audit Summary</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-amber-900 shadow-3xs">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Export Preview Only:</strong> AIXSHOP does not generate production downloadable files during this prototype demonstration. In production, this exports verified GS1-compatible product data models and discovery audit logs.
            </span>
          </div>

          <p className="text-xs text-stone-500">
            All data currently displayed reflects representative example intelligence for the AeroPulse Athletics VaporStride Carbon Elite model.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-sm font-bold transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
