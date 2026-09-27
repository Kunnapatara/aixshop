import React, { useState } from 'react';
import { 
  PlusCircle, 
  X, 
  Link2, 
  UploadCloud, 
  Store, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface AddProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanUrl: (url: string) => void;
  onImportSample?: () => void;
}

export const AddProductsModal: React.FC<AddProductsModalProps> = ({
  isOpen,
  onClose,
  onScanUrl,
  onImportSample
}) => {
  const [activeMethod, setActiveMethod] = useState<'url' | 'csv' | 'store'>('url');
  const [productUrl, setProductUrl] = useState('https://shop.aeropulse.com/products/vaporstride-carbon-elite');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productUrl.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onScanUrl(productUrl.trim());
      onClose();
    }, 600);
  };

  const handleQuickDemoSelect = (url: string) => {
    setProductUrl(url);
  };

  const handleSampleImportClick = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMsg('24 canonical representative products synced into Catalog.');
      setTimeout(() => {
        setSuccessMsg(null);
        if (onImportSample) onImportSample();
        onClose();
      }, 900);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-products-modal-title"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-100 flex items-start justify-between gap-4 bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shadow-2xs">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="add-products-modal-title" className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
                Add Products to AIXSHOP
              </h2>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                Scan, connect, or import products to audit what AI systems understand about your catalog.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ingestion Method Tabs */}
        <div className="px-6 pt-4 border-b border-stone-100 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveMethod('url')}
            className={`flex items-center gap-2 pb-3 px-1 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeMethod === 'url'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>Product URL Scan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMethod('csv')}
            className={`flex items-center gap-2 pb-3 px-1 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeMethod === 'csv'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>CSV / Feed Import</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMethod('store')}
            className={`flex items-center gap-2 pb-3 px-1 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeMethod === 'store'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Store Connector</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeMethod === 'url' && (
            <form onSubmit={handleScanSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Enter Product URL to Audit
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                      placeholder="https://yourstore.com/products/your-product"
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-2xl focus:bg-white focus:border-orange-500 focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing || !productUrl.trim()}
                    className="px-5 py-3 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-2xl shadow-xs transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <span>{isProcessing ? 'Auditing...' : 'Audit & Scan'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Demo URLs */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-stone-500 block">
                  Or select a representative sample SKU to audit:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoSelect('https://shop.aeropulse.com/products/vaporstride-carbon-elite')}
                    className="p-3 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-orange-50/60 hover:border-orange-200 text-left transition-all cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-stone-900 group-hover:text-orange-600">
                      VaporStride Carbon Elite
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      Hero SKU · 84% Ready · 1 Attribute Conflict
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoSelect('https://shop.aeropulse.com/products/aeroshield-windbreaker')}
                    className="p-3 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-orange-50/60 hover:border-orange-200 text-left transition-all cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-stone-900 group-hover:text-orange-600">
                      AeroShield Pro Windbreaker
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      Variant SKU · Missing GTIN & Size Range
                    </div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeMethod === 'csv' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-stone-200 rounded-3xl p-8 text-center bg-stone-50/50 hover:bg-stone-50 transition-colors">
                <FileSpreadsheet className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h3 className="text-xs sm:text-sm font-bold text-stone-800">
                  Upload Product Feed or Catalog File
                </h3>
                <p className="text-[11px] text-stone-500 mt-1 max-w-sm mx-auto">
                  Supports Google Merchant Center XML, Shopify Catalog CSV, GS1 EPCIS, or custom TSV feeds.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <label className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-colors">
                    Browse File
                    <input type="file" className="hidden" accept=".csv,.xml,.tsv,.json" />
                  </label>
                  <button
                    type="button"
                    onClick={handleSampleImportClick}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                  >
                    Load 24 Sample SKUs
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeMethod === 'store' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-stone-200 bg-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                    S
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Shopify Store Connector</div>
                    <div className="text-[11px] text-stone-500">Connected: shop.aeropulse.com (24 SKUs synced)</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 flex items-center justify-between gap-4 opacity-75">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    W
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">WooCommerce Connector</div>
                    <div className="text-[11px] text-stone-500">Sync products via REST API v3</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                >
                  Connect
                </button>
              </div>
            </div>
          )}

          {/* Truth Boundary Note */}
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/70 flex items-start gap-2.5 text-xs text-orange-950">
            <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Deterministic Truth Boundary: </span>
              AIXSHOP audits what AI commerce models can understand from your real canonical catalog data. It never fabricates prices, GTINs, or product specifications.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between">
          <span className="text-[11px] text-stone-400 font-medium">
            Mental Model: Add → Scan → Fix → Recheck → Ready → Connect
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
