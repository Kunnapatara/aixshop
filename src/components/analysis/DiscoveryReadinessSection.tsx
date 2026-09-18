import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  BrainCircuit, 
  ShoppingBag, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { sampleCanonicalProduct } from '../../data/sampleIntelligence';
import { DiscoverySurfaceSignal } from '../../types/landing';

export const DiscoveryReadinessSection: React.FC = () => {
  const surfaces = sampleCanonicalProduct.surfaces;
  const [selectedSurfaceId, setSelectedSurfaceId] = useState<string>(surfaces[0].surfaceId);

  const selectedSurface = surfaces.find(s => s.surfaceId === selectedSurfaceId) || surfaces[0];

  const getSurfaceIcon = (type: DiscoverySurfaceSignal['type']) => {
    switch (type) {
      case 'Search':
        return <Search className="w-4 h-4 text-cyan-400" />;
      case 'AI':
        return <BrainCircuit className="w-4 h-4 text-indigo-400" />;
      case 'Commerce':
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'AIXSHOP':
        return <Compass className="w-4 h-4 text-amber-400" />;
    }
  };

  const getStatusBadge = (status: DiscoverySurfaceSignal['readinessStatus']) => {
    switch (status) {
      case 'Ready':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Ready
          </span>
        );
      case 'Gaps Detected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertCircle className="w-3 h-3" /> Gaps Detected
          </span>
        );
      case 'Needs Attention':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <AlertCircle className="w-3 h-3" /> Needs Attention
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 mb-12 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Multi-Channel Evaluation</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Section 11</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Discovery Readiness Preview
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Diagnostic signals evaluating structured machine readability across primary modern commerce surfaces.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-950 border border-slate-800 text-slate-400 self-start sm:self-auto">
          <span>Click surface to view diagnostic breakdown</span>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="mb-6 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <span className="font-semibold text-white">Diagnostic Signal Notice: </span>
          These metrics indicate schema completeness, attribute verifiability, and machine readability. They are <strong className="text-cyan-300 font-semibold">diagnostic signals, not ranking guarantees</strong> or promotional visibility scores.
        </div>
      </div>

      {/* Grid of 4 Surfaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {surfaces.map((surface) => {
          const isSelected = surface.surfaceId === selectedSurfaceId;

          return (
            <button
              key={surface.surfaceId}
              onClick={() => setSelectedSurfaceId(surface.surfaceId)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {getSurfaceIcon(surface.type)}
                  </div>
                  {getStatusBadge(surface.readinessStatus)}
                </div>

                <h3 className="text-sm font-bold text-white mb-1">
                  {surface.name}
                </h3>
                <div className="text-[11px] font-mono text-slate-400 mb-3">
                  Channel: {surface.type}
                </div>
              </div>

              <div>
                {/* Coverage metric */}
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                  <span className="text-slate-400">Machine Readability:</span>
                  <span className="font-mono font-bold text-cyan-400">{surface.completenessPercentage}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-full rounded-full transition-all"
                    style={{ width: `${surface.completenessPercentage}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Diagnostic Detail Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
              Surface Diagnostic Finding:
            </span>
            <span className="text-sm font-bold text-white">
              {selectedSurface.name}
            </span>
          </div>
          <div className="text-xs text-slate-400">
            Readiness Signal: <strong className="text-slate-200">{selectedSurface.readinessStatus}</strong>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
          {selectedSurface.diagnosticFinding}
        </p>

        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verifying missing attributes improves autonomous AI model comprehension without paid ranking schemes.</span>
        </div>
      </div>
    </div>
  );
};
