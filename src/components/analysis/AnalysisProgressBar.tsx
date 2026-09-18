import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  RotateCw, 
  HelpCircle, 
  Eye, 
  Layers, 
  Fingerprint, 
  FileSearch, 
  Scale, 
  ShieldCheck, 
  Compass,
  Play,
  Pause
} from 'lucide-react';
import { sampleAnalysisStages } from '../../data/sampleIntelligence';

interface AnalysisProgressBarProps {
  onSimulationComplete?: () => void;
}

export const AnalysisProgressBar: React.FC<AnalysisProgressBarProps> = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(sampleAnalysisStages.length - 1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const stageIcons = [
    Fingerprint,
    FileSearch,
    Scale,
    Layers,
    ShieldCheck,
    Compass
  ];

  const handleReplaySimulation = () => {
    setActiveStageIndex(0);
    setIsSimulating(true);
  };

  useEffect(() => {
    if (!isSimulating) return;

    if (activeStageIndex < sampleAnalysisStages.length - 1) {
      const timer = setTimeout(() => {
        setActiveStageIndex(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setIsSimulating(false);
    }
  }, [isSimulating, activeStageIndex]);

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-6 mb-8 backdrop-blur-sm relative overflow-hidden">
      {/* Subtle indicator tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Preview Analysis Pipeline
          </h2>
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Simulated Transition · No live network crawler executed
          </span>
        </div>

        <button
          onClick={handleReplaySimulation}
          disabled={isSimulating}
          className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Demonstrating pipeline steps...' : 'Replay Pipeline Preview'}</span>
        </button>
      </div>

      {/* 6 Conceptual Pipeline Stages Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {sampleAnalysisStages.map((stage, idx) => {
          const isDone = idx <= activeStageIndex;
          const isCurrent = idx === activeStageIndex && isSimulating;
          const Icon = stageIcons[idx] || CheckCircle2;

          return (
            <div 
              key={stage.id}
              className={`p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                isCurrent 
                  ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                  : isDone 
                    ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  0{idx + 1}
                </span>
                {isCurrent ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 font-medium">
                    <Clock className="w-2.5 h-2.5 animate-spin" />
                    Analyzing
                  </span>
                ) : isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-cyan-400' : isDone ? 'text-cyan-500' : 'text-slate-600'}`} />
                <h3 className="text-xs font-semibold text-white leading-tight">
                  {stage.title}
                </h3>
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug mt-1">
                {stage.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
