import React, { useState } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Download, 
  RefreshCw, 
  MoreHorizontal, 
  Check, 
  Copy, 
  FileCode
} from 'lucide-react';

interface ReportHeaderProps {
  onAnalyzeAnother: () => void;
  onOpenExportModal: () => void;
  onBackToAnalysis: () => void;
  onNavigateDashboard?: () => void;
  canonicalId: string;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({
  onAnalyzeAnother,
  onOpenExportModal,
  onBackToAnalysis,
  onNavigateDashboard,
  canonicalId
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCanonicalId = () => {
    navigator.clipboard.writeText(canonicalId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-16 z-30 shadow-3xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top bar: Breadcrumb & Context Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs">
          {/* Breadcrumb Hierarchy */}
          <nav className="flex items-center gap-1.5 text-stone-500 font-mono" aria-label="Breadcrumb">
            {onNavigateDashboard ? (
              <button 
                onClick={onNavigateDashboard}
                className="hover:text-[#F97316] text-stone-600 transition-colors flex items-center gap-1 font-semibold"
              >
                <span>Merchant Overview</span>
              </button>
            ) : (
              <button 
                onClick={onAnalyzeAnother}
                className="hover:text-stone-900 transition-colors font-semibold"
              >
                Products
              </button>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-500">AeroPulse Athletics</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#F97316] font-bold">VaporStride Carbon Elite</span>
          </nav>

          {/* Quick Back to Analysis link & Dashboard link */}
          <div className="flex items-center gap-3">
            {onNavigateDashboard && (
              <button
                type="button"
                onClick={onNavigateDashboard}
                className="inline-flex items-center gap-1.5 text-[#F97316] hover:text-orange-600 font-bold transition-colors cursor-pointer"
              >
                <span>Overview Dashboard →</span>
              </button>
            )}
            <button
              type="button"
              onClick={onBackToAnalysis}
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Analysis</span>
            </button>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Product Intelligence
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-50 text-orange-800 border border-orange-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse"></span>
                Example Product · Preview Mode
              </span>
            </div>
            <p className="text-sm text-stone-500 mt-1">
              Canonical intelligence model for one product
            </p>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={onAnalyzeAnother}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold border border-stone-200 shadow-3xs transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
              <span>Analyze Another Product</span>
            </button>

            <button
              type="button"
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report — Preview</span>
            </button>

            {/* More Options Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 shadow-3xs transition-all cursor-pointer"
                aria-label="More options"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showMoreMenu && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-stone-200 shadow-xl py-2 z-40 text-xs text-stone-800"
                  onMouseLeave={() => setShowMoreMenu(false)}
                >
                  <button
                    type="button"
                    onClick={handleCopyCanonicalId}
                    className="w-full px-4 py-2 text-left hover:bg-stone-50 flex items-center justify-between transition-colors font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <Copy className="w-3.5 h-3.5 text-stone-400" />
                      Copy Canonical ID
                    </span>
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMoreMenu(false);
                      onOpenExportModal();
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-stone-50 flex items-center gap-2 transition-colors font-medium"
                  >
                    <FileCode className="w-3.5 h-3.5 text-stone-400" />
                    Inspect JSON-LD Model
                  </button>
                  <div className="my-1.5 border-t border-stone-200"></div>
                  <div className="px-4 py-1 text-[10px] text-stone-400 font-mono">
                    AIXSHOP Schema v1.4-preview
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
