import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  AlertTriangle, 
  RefreshCw, 
  Compass, 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { sampleIssuesMetrics } from '../../data/sampleIssuesData';
import { CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';

interface MerchantMentalModelWorkflowProps {
  onAddProducts: () => void;
  onNavigateScan: () => void;
  onNavigateFix: () => void;
  onNavigateReady: () => void;
  onNavigateConnect: () => void;
  activeStage?: 'add' | 'scan' | 'fix' | 'recheck' | 'ready' | 'connect' | 'check' | 'review' | 'approve';
  openIssuesCount?: number;
  approvedCount?: number;
  readinessPct?: number;
  isRechecking?: boolean;
  recheckSuccess?: boolean;
  onRecheck?: () => void;
}

export const MerchantMentalModelWorkflow: React.FC<MerchantMentalModelWorkflowProps> = ({
  onAddProducts,
  onNavigateScan,
  onNavigateFix,
  onNavigateReady,
  onNavigateConnect,
  activeStage,
  openIssuesCount = sampleIssuesMetrics.openIssues,
  approvedCount = 0,
  readinessPct = CANONICAL_SYSTEM_KPIS.discoveryReadinessPct,
  isRechecking: propIsRechecking,
  recheckSuccess: propRecheckSuccess,
  onRecheck
}) => {
  const [internalRechecking, setInternalRechecking] = useState(false);
  const [internalSuccess, setInternalSuccess] = useState(false);

  const isRechecking = propIsRechecking !== undefined ? propIsRechecking : internalRechecking;
  const recheckSuccess = propRecheckSuccess !== undefined ? propRecheckSuccess : internalSuccess;

  const handleRecheckClick = () => {
    if (onRecheck) {
      onRecheck();
    }
    if (propIsRechecking === undefined) {
      setInternalRechecking(true);
      setInternalSuccess(false);
      setTimeout(() => {
        setInternalRechecking(false);
        setInternalSuccess(true);
        setTimeout(() => setInternalSuccess(false), 3500);
      }, 1000);
    }
  };

  const steps = [
    {
      id: 'add',
      stepNum: '01',
      title: 'Add',
      subtitle: '24 SKUs Connected',
      actionLabel: '+ Add SKUs',
      icon: PlusCircle,
      onClick: onAddProducts,
      status: 'complete'
    },
    {
      id: 'check',
      stepNum: '02',
      title: 'Check',
      subtitle: 'Catalog Audited',
      actionLabel: 'Inspect Hero',
      icon: Search,
      onClick: onNavigateScan,
      status: 'complete'
    },
    {
      id: 'review',
      stepNum: '03',
      title: 'Review',
      subtitle: `${openIssuesCount} Issues Found`,
      actionLabel: 'Triage Issues',
      icon: AlertTriangle,
      onClick: onNavigateFix,
      status: openIssuesCount > 0 ? 'attention' : 'complete',
      badge: `${openIssuesCount} Open`
    },
    {
      id: 'approve',
      stepNum: '04',
      title: 'Approve',
      subtitle: approvedCount > 0 ? `${approvedCount} Applied` : 'Review & Apply',
      actionLabel: 'Review Tasks',
      icon: CheckCircle2,
      onClick: onNavigateFix,
      status: approvedCount > 0 ? 'complete' : 'ready',
      badge: approvedCount > 0 ? `${approvedCount} Done` : undefined
    },
    {
      id: 'recheck',
      stepNum: '05',
      title: 'Recheck',
      subtitle: recheckSuccess ? 'Simulation Complete' : 'Preview (18m ago)',
      actionLabel: isRechecking ? 'Simulating...' : 'Run Recheck',
      icon: RefreshCw,
      onClick: handleRecheckClick,
      status: recheckSuccess ? 'complete' : 'ready',
      isLoading: isRechecking
    },
    {
      id: 'ready',
      stepNum: '06',
      title: 'Ready',
      subtitle: `${readinessPct}% AI Ready`,
      actionLabel: 'View Readiness',
      icon: Compass,
      onClick: onNavigateReady,
      status: 'active',
      badge: `${readinessPct}%`
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600 block">
            Merchant Mental Model & Value Loop
          </span>
          <h2 className="text-sm sm:text-base font-bold text-stone-900 mt-0.5">
            Catalog-to-AI Commerce Pipeline
          </h2>
        </div>
        <div className="text-xs text-stone-500 font-medium">
          Add → Check → Review → Approve → Recheck → Ready
        </div>
      </div>

      {recheckSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between gap-2 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Recheck simulation complete (representative preview). Continuous validation rules evaluated against catalog specifications.</span>
          </div>
          <button 
            onClick={onNavigateReady}
            className="text-emerald-700 underline font-bold hover:text-emerald-800 text-[11px]"
          >
            View Readiness →
          </button>
        </div>
      )}

      {/* 6 Step Interactive Linear Pipeline */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isCurrent = activeStage === s.id;

          return (
            <div
              key={s.id}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-2.5 ${
                s.status === 'attention'
                  ? 'bg-amber-50/40 border-amber-200/80 hover:border-amber-300'
                  : isCurrent
                    ? 'bg-orange-50/60 border-orange-300 shadow-2xs'
                    : 'bg-stone-50/60 border-stone-200/80 hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-stone-400">
                  {s.stepNum}
                </span>
                {s.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    s.status === 'attention' 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {s.badge}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${
                    s.status === 'attention'
                      ? 'text-amber-600'
                      : s.isLoading
                        ? 'text-orange-600 animate-spin'
                        : 'text-stone-700'
                  }`} />
                  <span className="text-xs font-bold text-stone-900 tracking-tight">
                    {s.title}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 font-medium truncate mt-0.5">
                  {s.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={s.onClick}
                disabled={s.isLoading}
                className={`w-full py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  s.status === 'attention'
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-2xs'
                    : s.id === 'add'
                      ? 'bg-stone-900 hover:bg-black text-white shadow-2xs'
                      : 'bg-white hover:bg-stone-100 text-stone-800 border border-stone-200'
                }`}
              >
                <span>{s.actionLabel}</span>
                {s.id !== 'recheck' && <ArrowRight className="w-3 h-3" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
