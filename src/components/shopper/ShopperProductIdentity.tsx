import React from 'react';
import { Fingerprint, CheckCircle2, ShieldCheck, Layers, HelpCircle, Info } from 'lucide-react';
import { ShopperProductIdentity as IdentityType } from '../../types/shopper';

interface ShopperProductIdentityProps {
  identity: IdentityType;
}

export const ShopperProductIdentity: React.FC<ShopperProductIdentityProps> = ({ identity }) => {
  return (
    <div className="rounded-2xl bg-[#0A0F1D]/80 border border-slate-800/80 p-5 shadow-lg flex flex-col gap-4">
      {/* Identity Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <Fingerprint className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
            Canonical Product Identity
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-medium">
          <CheckCircle2 className="w-3 h-3" />
          <span>{identity.status}</span>
        </div>
      </div>

      {/* Grid of Canonical Identifiers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Brand</div>
          <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate">{identity.brand}</div>
        </div>

        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Model</div>
          <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate">{identity.model}</div>
        </div>

        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Category</div>
          <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate">{identity.category}</div>
        </div>

        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase">GTIN Barcode</div>
          <div className="text-xs font-mono font-bold text-cyan-300 mt-0.5">{identity.gtin}</div>
        </div>

        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase">MPN</div>
          <div className="text-xs font-mono text-slate-300 mt-0.5">{identity.mpn}</div>
        </div>

        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Canonical ID</div>
          <div className="text-xs font-mono text-slate-300 mt-0.5 truncate">{identity.canonicalId}</div>
        </div>
      </div>

      {/* Why Identity Matters Callout */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800/80 p-3.5 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 leading-relaxed">
          <span className="font-semibold text-slate-200">Why this identity matters: </span>
          AIXSHOP separates the underlying product from individual seller offers so shoppers can compare offers without confusing them with different products.
        </div>
      </div>
    </div>
  );
};
