import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  FileCode2, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { defaultFeedConfig, sampleFeedValidationRules } from '../../data/sampleIntegrationsData';
import { FeedConfigModel } from '../../types/integrations';

interface FeedConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveConfig?: (config: FeedConfigModel) => void;
}

export const FeedConfigurationModal: React.FC<FeedConfigurationModalProps> = ({
  isOpen,
  onClose,
  onSaveConfig
}) => {
  const [feedConfig, setFeedConfig] = useState<FeedConfigModel>(defaultFeedConfig);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationDone, setValidationDone] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSimulateValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setValidationDone(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 space-y-5 z-10">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-3 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shrink-0 shadow-3xs">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-bold px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 shadow-3xs">
                  Feed Configuration Preview
                </span>
                <span className="text-xs font-mono text-stone-400">Deterministic Validator</span>
              </div>
              <h3 className="text-lg font-extrabold text-stone-900 font-sans mt-0.5">
                Configure Structured Product Feed
              </h3>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Form Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          {/* Feed Name */}
          <div className="space-y-1 sm:col-span-2">
            <label className="text-stone-400 font-mono text-[11px] uppercase font-semibold">Feed Name</label>
            <input
              type="text"
              value={feedConfig.feedName}
              onChange={e => setFeedConfig({ ...feedConfig, feedName: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white font-mono transition-colors"
            />
          </div>

          {/* Format */}
          <div className="space-y-1">
            <label className="text-stone-400 font-mono text-[11px] uppercase font-semibold">Feed Format</label>
            <select
              value={feedConfig.format}
              onChange={e => setFeedConfig({ ...feedConfig, format: e.target.value as any })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white font-mono cursor-pointer transition-colors"
            >
              <option value="XML">Google Shopping XML (RSS 2.0)</option>
              <option value="CSV">Delimited CSV / TSV</option>
              <option value="JSON">JSON Feed / Schema.org</option>
              <option value="URL">Remote Endpoint URL</option>
            </select>
          </div>

          {/* Primary Identifier */}
          <div className="space-y-1">
            <label className="text-stone-400 font-mono text-[11px] uppercase font-semibold">Primary Product Anchor</label>
            <select
              value={feedConfig.productIdentifier}
              onChange={e => setFeedConfig({ ...feedConfig, productIdentifier: e.target.value as any })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white font-mono cursor-pointer transition-colors"
            >
              <option value="GTIN">GTIN / Barcode (Recommended)</option>
              <option value="MPN">Manufacturer Part Number (MPN)</option>
              <option value="SKU">Merchant Internal SKU</option>
            </select>
          </div>

          {/* Endpoint URL */}
          <div className="space-y-1 sm:col-span-2">
            <label className="text-stone-400 font-mono text-[11px] uppercase font-semibold">Feed Endpoint URL (HTTPS)</label>
            <input
              type="text"
              value={feedConfig.feedUrl}
              onChange={e => setFeedConfig({ ...feedConfig, feedUrl: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white font-mono text-xs transition-colors"
            />
          </div>

          {/* Refresh Strategy */}
          <div className="space-y-1">
            <label className="text-stone-400 font-mono text-[11px] uppercase font-semibold">Refresh Strategy</label>
            <select
              value={feedConfig.refreshStrategy}
              onChange={e => setFeedConfig({ ...feedConfig, refreshStrategy: e.target.value as any })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white font-mono cursor-pointer transition-colors"
            >
              <option value="Daily Polling">Daily Scheduled Poll (02:00 UTC)</option>
              <option value="Hourly Poll">Hourly Sentinel Verification</option>
              <option value="Webhook Notification">Webhook on Merchant Catalog Change</option>
            </select>
          </div>

          {/* Currency */}
          <div className="space-y-1">
            <label className="text-stone-400 font-mono text-[11px] uppercase font-semibold">Default Offer Currency</label>
            <select
              value={feedConfig.currency}
              onChange={e => setFeedConfig({ ...feedConfig, currency: e.target.value as any })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white font-mono cursor-pointer transition-colors"
            >
              <option value="USD">USD ($ United States Dollar)</option>
              <option value="EUR">EUR (€ Euro)</option>
              <option value="GBP">GBP (£ British Pound)</option>
            </select>
          </div>

        </div>

        {/* Deterministic Validation Preview Section */}
        <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-900 font-bold">
                Deterministic Validation Preview
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold shadow-3xs">
                6 PASS · 1 WARNING
              </span>
            </div>

            <button
              type="button"
              onClick={handleSimulateValidation}
              disabled={isValidating}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-[11px] font-mono transition-colors cursor-pointer border border-stone-200 shadow-3xs"
            >
              <RefreshCw className={`w-3 h-3 text-[#F97316] ${isValidating ? 'animate-spin' : ''}`} />
              <span>{isValidating ? 'Evaluating...' : 'Re-test Rules'}</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {sampleFeedValidationRules.map((rule, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-start justify-between gap-2 text-xs shadow-3xs">
                <div className="space-y-0.5">
                  <div className="text-stone-900 font-semibold font-mono text-[11px]">{rule.field}</div>
                  <div className="text-[10px] text-stone-500 leading-tight">{rule.detail}</div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 shadow-3xs ${
                  rule.status === 'PASS' 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {rule.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notice Box */}
        <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 text-[11px] text-orange-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
          <span>
            Validation tests feed schema deterministically. In this preview environment, no external HTTP network call is executed.
          </span>
        </div>

        {/* Footer Actions */}
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
              onSaveConfig?.(feedConfig);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            Save Feed Configuration Preview
          </button>
        </div>

      </div>
    </div>
  );
};
