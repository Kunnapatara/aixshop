import React from 'react';
import { ArrowRight, RefreshCw, ArrowLeft } from 'lucide-react';

interface ReportBottomActionBarProps {
  onReviewFixIssues: () => void;
  onAnalyzeAnother: () => void;
  onBackToAnalysis: () => void;
}

export const ReportBottomActionBar: React.FC<ReportBottomActionBarProps> = ({
  onReviewFixIssues,
  onAnalyzeAnother,
  onBackToAnalysis
}) => {
  return (
    <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-center sm:text-left">
        <h4 className="text-base font-bold text-stone-900">
          Ready to verify claims or address intelligence gaps?
        </h4>
        <p className="text-xs text-stone-500 mt-0.5">
          Proceed to the Fix & Verification workflow or explore another product URL.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
        {/* Tertiary: Back to Analysis */}
        <button
          type="button"
          onClick={onBackToAnalysis}
          className="px-4 py-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-3xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Analysis</span>
        </button>

        {/* Secondary: Analyze Another Product */}
        <button
          type="button"
          onClick={onAnalyzeAnother}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-3xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
          <span>Analyze Another Product</span>
        </button>

        {/* Primary: Review & Fix Issues */}
        <button
          type="button"
          onClick={onReviewFixIssues}
          className="px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-[0.98]"
        >
          <span>Review & Fix Issues</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
