import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Barcode, 
  Cpu, 
  Grid
} from 'lucide-react';
import { CanonicalProductPreview, EvidenceState } from '../../types/landing';

interface CanonicalProductModelProps {
  product: CanonicalProductPreview;
  onOpenStateModal: (state: EvidenceState) => void;
}

export const CanonicalProductModel: React.FC<CanonicalProductModelProps> = ({
  product
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    identity: true,
    identifiers: true,
    attributes: true,
    variants: true
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="canonical-model" className="space-y-4">
      {/* Section Title & Purpose Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Canonical Product Model
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            How AIXSHOP represents the immutable product independently from individual seller commercial conditions.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-stone-600 bg-white px-3 py-1 rounded-xl border border-stone-200 shadow-3xs self-start sm:self-auto">
          Schema: Schema.org/Product (Canonical)
        </span>
      </div>

      {/* Structured Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Group 1: Identity */}
        <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleSection('identity')}
            className="w-full px-5 py-3.5 bg-stone-50/80 flex items-center justify-between hover:bg-stone-100/70 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-sm font-bold text-stone-900">
              <Layers className="w-4 h-4 text-[#F97316]" />
              <span>1. Identity Attributes</span>
            </div>
            {openSections.identity ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>

          {openSections.identity && (
            <div className="p-5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Brand</span>
                <span className="font-bold text-stone-900 font-mono">{product.brand}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Product Name</span>
                <span className="font-bold text-stone-900 font-mono">{product.name}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Model Code</span>
                <span className="font-semibold text-stone-700 font-mono">VaporStride-CE</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Category</span>
                <span className="text-stone-700 font-medium">{product.category}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-stone-500 font-medium">Product Type</span>
                <span className="text-stone-800 font-medium">Unisex Road Racing Footwear</span>
              </div>
            </div>
          )}
        </div>

        {/* Group 2: Identifiers */}
        <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleSection('identifiers')}
            className="w-full px-5 py-3.5 bg-stone-50/80 flex items-center justify-between hover:bg-stone-100/70 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-sm font-bold text-stone-900">
              <Barcode className="w-4 h-4 text-[#F97316]" />
              <span>2. Global Identifiers</span>
            </div>
            {openSections.identifiers ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>

          {openSections.identifiers && (
            <div className="p-5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Canonical GTIN (GS1-14)</span>
                <span className="font-mono text-[#F97316] font-bold">{product.gtin}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Manufacturer Part Number (MPN)</span>
                <span className="font-mono text-stone-800 font-semibold">{product.mpn}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Canonical Product ID</span>
                <span className="font-mono text-stone-900 font-bold">{product.canonicalId}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">SKU Family Root</span>
                <span className="font-mono text-stone-700">AP-VSE-SERIES-2026</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-stone-500 font-medium">Barcode Standard</span>
                <span className="text-emerald-700 font-mono font-bold">EAN-13 / UPC-A Compatible</span>
              </div>
            </div>
          )}
        </div>

        {/* Group 3: Physical & Technical Attributes */}
        <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleSection('attributes')}
            className="w-full px-5 py-3.5 bg-stone-50/80 flex items-center justify-between hover:bg-stone-100/70 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-sm font-bold text-stone-900">
              <Cpu className="w-4 h-4 text-[#F97316]" />
              <span>3. Physical & Technical Attributes</span>
            </div>
            {openSections.attributes ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>

          {openSections.attributes && (
            <div className="p-5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Target Weight</span>
                <span className="font-mono text-stone-900 font-bold">320 g (Size US 9)</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Propulsion Plate</span>
                <span className="font-mono text-emerald-700 font-bold">Full-length carbon composite</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Midsole Foam</span>
                <span className="font-mono text-stone-800">Nitrogen-PEBA Supercritical</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Stack Height & Drop</span>
                <span className="font-mono text-stone-800">39mm heel / 31mm forefoot (8mm drop)</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-stone-500 font-medium">Outsole Traction</span>
                <span className="font-mono text-stone-800">Zonal Liquid-Grip Rubber</span>
              </div>
            </div>
          )}
        </div>

        {/* Group 4: Canonical Variant Model */}
        <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => toggleSection('variants')}
            className="w-full px-5 py-3.5 bg-stone-50/80 flex items-center justify-between hover:bg-stone-100/70 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-sm font-bold text-stone-900">
              <Grid className="w-4 h-4 text-[#F97316]" />
              <span>4. Variant Schema Definition</span>
            </div>
            {openSections.variants ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>

          {openSections.variants && (
            <div className="p-5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Variant Axes</span>
                <span className="font-mono text-stone-900 font-bold">Size (US Men) × Primary Colorway</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Size Range Sampled</span>
                <span className="font-mono text-stone-800">US 10.0, 10.5, 11.0</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Observed Colorways</span>
                <span className="font-mono text-stone-800">Onyx Black, Glacier White</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500 font-medium">Variant GTIN Mapping</span>
                <span className="font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">1 Anomaly flagged for audit</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-stone-500 font-medium">Commercial Decoupling</span>
                <span className="text-emerald-700 font-bold">Variants carry zero merchant pricing</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
