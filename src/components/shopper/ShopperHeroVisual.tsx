import React, { useState } from 'react';
import { Maximize2, X, AlertCircle, Info, Sparkles, CheckCircle2 } from 'lucide-react';

interface ShopperHeroVisualProps {
  brand: string;
  model: string;
}

export const ShopperHeroVisual: React.FC<ShopperHeroVisualProps> = ({ brand, model }) => {
  const [selectedAngle, setSelectedAngle] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Curated representative visual angles demonstrating marathon racing shoe features
  const angles = [
    {
      id: 'lateral',
      label: 'Lateral Profile',
      tag: 'Full Shoe Geometry',
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      caption: 'Full-length side profile showing 39mm/31mm stack height and continuous carbon propulsion curve.'
    },
    {
      id: 'plate',
      label: 'Carbon Plate / Outsole',
      tag: 'Propulsion Geometry',
      url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop',
      caption: 'Midsole cutaway highlighting internal composite carbon-fiber plate and laser-siped rubber.'
    },
    {
      id: 'mesh',
      label: 'Mono-Mesh Upper',
      tag: 'Material Weave',
      url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
      caption: 'High-tensile engineered mono-mesh weave designed for maximum breathability during marathon racing.'
    },
    {
      id: 'midsole',
      label: 'PEBA Cushioning',
      tag: 'Nitrogen Foam Cell',
      url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1200&auto=format&fit=crop',
      caption: 'Supercritical PEBA foam compound engineered for 84% dynamic energy return.'
    }
  ];

  const currentVisual = angles[selectedAngle];

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image Frame */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#0F1626] to-[#0A0E1A] border border-slate-800/90 overflow-hidden group shadow-2xl">
        {/* Preview Mode Badge Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 text-[10px] font-mono font-medium text-slate-300 backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Representative Product Visual
          </span>
          <span className="text-[9px] font-mono text-slate-400 pl-1">
            Preview Mode · Not authentic merchant photography
          </span>
        </div>

        {/* Zoom Button */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          aria-label="Expand image preview"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Hero Image */}
        <div className="aspect-[4/3] sm:aspect-[16/11] w-full flex items-center justify-center p-6 sm:p-10 relative overflow-hidden">
          <img
            src={currentVisual.url}
            alt={`${brand} ${model} - ${currentVisual.label}`}
            className="w-full h-full object-contain object-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Bottom Image Caption Bar */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">{currentVisual.label}</span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] text-slate-400">{currentVisual.tag}</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400/90">
            Angle {selectedAngle + 1} of {angles.length}
          </span>
        </div>
      </div>

      {/* Detail Thumbnails Row */}
      <div className="grid grid-cols-4 gap-2.5">
        {angles.map((angle, idx) => {
          const isSelected = selectedAngle === idx;
          return (
            <button
              key={angle.id}
              type="button"
              onClick={() => setSelectedAngle(idx)}
              className={`relative rounded-xl border p-1 text-left transition-all cursor-pointer overflow-hidden ${
                isSelected 
                  ? 'border-cyan-500 bg-cyan-950/20 ring-1 ring-cyan-500/50' 
                  : 'border-slate-800 bg-[#0A0E18] hover:border-slate-700 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src={angle.url}
                  alt={angle.label}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-1.5 px-0.5 pb-0.5">
                <div className={`text-[10px] font-medium truncate ${isSelected ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}>
                  {angle.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in-50 duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#0B0F1A] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {brand} {model} — {currentVisual.label}
                </h4>
                <p className="text-xs text-slate-400">{currentVisual.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-8 flex items-center justify-center bg-gradient-to-b from-[#090D15] to-[#04060A] min-h-[450px]">
              <img
                src={currentVisual.url}
                alt={currentVisual.label}
                className="max-h-[70vh] object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="px-5 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px] text-cyan-400">
                Representative Preview Visual · GTIN 00849201948172
              </span>
              <span className="text-[11px] text-slate-400">
                Press ESC or click anywhere outside to close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
