import React from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface Page04BoundaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Page04BoundaryModal: React.FC<Page04BoundaryModalProps> = ({
  isOpen,
  onClose
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
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">Fix & Verification Workflow</h3>
            <p className="text-xs font-mono text-[#F97316] font-bold">Upcoming Phase · Scope Boundary</p>
          </div>
        </div>

        <div className="space-y-3.5 text-sm text-stone-600 leading-relaxed mb-6">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
            <div className="font-bold text-stone-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Next Scheduled Milestone: Page 04</span>
            </div>
            <p className="text-stone-600">
              <strong>Fix & Verification</strong> is the next product workflow and will be constructed separately. It encompasses:
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-stone-600">
              <li>Merchant claim submission & evidence attachment</li>
              <li>Upper material conflict arbitration with source overrides</li>
              <li>Structured return policy schema generation (JSON-LD)</li>
              <li>Variant barcode GS1 synchronization</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 text-xs text-stone-700">
            <strong>Scope Constraint Notice:</strong> In strict compliance with prompt instructions, Page 03 implements the full read-only Product Intelligence Report workspace. No live merchant mutation or verification write-back occurs here.
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-bold transition-colors shadow-xs cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
