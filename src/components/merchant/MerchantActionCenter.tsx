// src/components/merchant/MerchantActionCenter.tsx
// AIXSHOP — Task-First Merchant Action Center & Guided Review-Approve Workflow
// Answers the 10 Merchant Questions:
// 1. What is happening with my catalog?
// 2. What needs my attention?
// 3. What should I do next?
// 4. What does AIXSHOP suggest changing?
// 5. Why does AIXSHOP suggest it?
// 6. What evidence supports the suggestion?
// 7. Can I edit it?
// 8. Can I approve or reject it?
// 9. What happens after I approve it?
// 10. Can I recheck the result?

import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  RefreshCw, 
  Edit3, 
  Check, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  Eye, 
  HelpCircle, 
  Filter, 
  Clock, 
  ArrowUpRight, 
  Info, 
  Lock, 
  Tag,
  ChevronDown,
  ChevronUp,
  FileCheck,
  ThumbsUp,
  SlidersHorizontal,
  Workflow
} from 'lucide-react';
import { IssueItem, IssueSeverity } from '../../types/issues';
import { CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';

export interface ActionItemReviewState {
  status: 'pending' | 'approved' | 'dismissed';
  customValue?: string;
  approvedAt?: string;
  notes?: string;
}

interface MerchantActionCenterProps {
  issues: IssueItem[];
  onApproveIssue?: (issueId: string, customValue?: string) => void;
  onDismissIssue?: (issueId: string) => void;
  onInspectIssue?: (issue: IssueItem) => void;
  onNavigateCatalog?: () => void;
  onNavigateReadiness?: () => void;
  onNavigateIntegrations?: () => void;
  onAddProducts?: () => void;
  readinessScore?: number;
}

export const MerchantActionCenter: React.FC<MerchantActionCenterProps> = ({
  issues,
  onApproveIssue,
  onDismissIssue,
  onInspectIssue,
  onNavigateCatalog,
  onNavigateReadiness,
  onNavigateIntegrations,
  onAddProducts,
  readinessScore = 79
}) => {
  // Local review state tracking approvals and edits per issue ID
  const [reviewStates, setReviewStates] = useState<Record<string, ActionItemReviewState>>(() => {
    const initial: Record<string, ActionItemReviewState> = {};
    issues.forEach(iss => {
      initial[iss.id] = {
        status: iss.isResolved ? 'approved' : 'pending',
        customValue: iss.recoveryWorkspace?.diff?.proposedValue || ''
      };
    });
    return initial;
  });

  // Track editable input mode per card
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editInputValue, setEditInputValue] = useState<string>('');

  // Filtering & view mode
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'dismissed' | 'all'>('pending');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'Critical' | 'High' | 'Medium' | 'Low'>('all');
  
  // Recheck simulation state
  const [isRechecking, setIsRechecking] = useState(false);
  const [recheckFeedback, setRecheckFeedback] = useState<{
    success: boolean;
    score: number;
    message: string;
    timestamp: string;
  } | null>(null);

  // Guided wizard modal for step-by-step review
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardIndex, setWizardIndex] = useState(0);

  // Derive counts
  const totalOpen = useMemo(() => {
    return issues.filter(i => (reviewStates[i.id]?.status ?? (i.isResolved ? 'approved' : 'pending')) === 'pending').length;
  }, [issues, reviewStates]);

  const totalApproved = useMemo(() => {
    return issues.filter(i => (reviewStates[i.id]?.status ?? (i.isResolved ? 'approved' : 'pending')) === 'approved').length;
  }, [issues, reviewStates]);

  const totalDismissed = useMemo(() => {
    return issues.filter(i => reviewStates[i.id]?.status === 'dismissed').length;
  }, [issues, reviewStates]);

  // Dynamic simulated readiness score based on approved fixes
  const currentReadinessScore = useMemo(() => {
    if (recheckFeedback) return recheckFeedback.score;
    const base = readinessScore;
    const boost = totalApproved * 2.5; // up to ~99%
    return Math.min(99, Math.round(base + boost));
  }, [readinessScore, totalApproved, recheckFeedback]);

  // Filtered issues list
  const filteredIssues = useMemo(() => {
    return issues.filter(iss => {
      const state = reviewStates[iss.id]?.status ?? (iss.isResolved ? 'approved' : 'pending');
      if (activeTab === 'pending' && state !== 'pending') return false;
      if (activeTab === 'approved' && state !== 'approved') return false;
      if (activeTab === 'dismissed' && state !== 'dismissed') return false;
      if (severityFilter !== 'all' && iss.severity !== severityFilter) return false;
      return true;
    });
  }, [issues, reviewStates, activeTab, severityFilter]);

  // Handle Approve Action
  const handleApprove = (issueId: string, customVal?: string) => {
    setReviewStates(prev => ({
      ...prev,
      [issueId]: {
        status: 'approved',
        customValue: customVal || prev[issueId]?.customValue || '',
        approvedAt: 'Just now'
      }
    }));
    setEditingCardId(null);
    if (onApproveIssue) {
      onApproveIssue(issueId, customVal);
    }
  };

  // Handle Dismiss Action
  const handleDismiss = (issueId: string) => {
    setReviewStates(prev => ({
      ...prev,
      [issueId]: {
        status: 'dismissed',
        notes: 'Dismissed by merchant'
      }
    }));
    setEditingCardId(null);
    if (onDismissIssue) {
      onDismissIssue(issueId);
    }
  };

  // Handle Batch Approve All
  const handleApproveAll = () => {
    setReviewStates(prev => {
      const updated = { ...prev };
      issues.forEach(iss => {
        if ((updated[iss.id]?.status ?? 'pending') === 'pending') {
          updated[iss.id] = {
            status: 'approved',
            customValue: updated[iss.id]?.customValue || iss.recoveryWorkspace?.diff?.proposedValue || '',
            approvedAt: 'Just now'
          };
          if (onApproveIssue) {
            onApproveIssue(iss.id);
          }
        }
      });
      return updated;
    });
  };

  // Handle Recheck Simulation
  const handleRunRecheck = () => {
    setIsRechecking(true);
    setRecheckFeedback(null);
    setTimeout(() => {
      setIsRechecking(false);
      const remainingPending = issues.filter(i => reviewStates[i.id]?.status === 'pending').length;
      const newScore = remainingPending === 0 ? 98 : Math.min(96, 79 + totalApproved * 2.5);
      setRecheckFeedback({
        success: true,
        score: Math.round(newScore),
        message: remainingPending === 0 
          ? 'Simulation complete: All critical issues verified against Schema.org and Google Merchant Center specifications. 100% ready for feed export.' 
          : `Simulation complete: ${totalApproved} approved fixes verified. ${remainingPending} items still awaiting merchant review.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 1200);
  };

  // Start Edit Mode
  const startEditing = (issue: IssueItem) => {
    setEditingCardId(issue.id);
    setEditInputValue(reviewStates[issue.id]?.customValue || issue.recoveryWorkspace?.diff?.proposedValue || '');
  };

  // Helper for human-friendly plain language severity
  const getPlainSeverity = (severity: IssueSeverity) => {
    switch (severity) {
      case 'Critical':
        return { label: 'Blocks AI Purchasing', bg: 'bg-rose-50 text-rose-800 border-rose-200' };
      case 'High':
        return { label: 'Damages Search Ranking', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'Medium':
        return { label: 'Catalog Inconsistency', bg: 'bg-blue-50 text-blue-800 border-blue-200' };
      default:
        return { label: 'Minor Suggestion', bg: 'bg-stone-50 text-stone-700 border-stone-200' };
    }
  };

  return (
    <div className="space-y-6">

      {/* 1. TOP ACTION CENTER HERO CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200 tracking-wide inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>MERCHANT ACTION CENTER</span>
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {CANONICAL_SYSTEM_KPIS.totalCatalogProducts} Products Analyzed
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {totalOpen > 0 ? (
                <span>Your catalog has <span className="text-orange-600 underline decoration-orange-300 underline-offset-4">{totalOpen} things worth reviewing</span>.</span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 inline-block" />
                  Your catalog is verified & ready for AI commerce!
                </span>
              )}
            </h1>

            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              AIXSHOP scanned your 24 products across AI shopping engines (ChatGPT, Google Gemini, Perplexity) and external retail channels. Review and approve the suggested fixes below to ensure AI assistants recommend your products accurately.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto shrink-0">
            {totalOpen > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => { setWizardIndex(0); setWizardOpen(true); }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <FileCheck className="w-4 h-4 text-orange-400" />
                  <span>Start Guided Review ({totalOpen})</span>
                </button>
                <button
                  type="button"
                  onClick={handleApproveAll}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  title="Approve all AIXSHOP recommended updates"
                >
                  <ThumbsUp className="w-4 h-4 text-orange-600" />
                  <span>Approve All Recommended</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={handleRunRecheck}
              disabled={isRechecking}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-full border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isRechecking 
                  ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200 shadow-2xs'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isRechecking ? 'animate-spin text-orange-600' : 'text-stone-600'}`} />
              <span>{isRechecking ? 'Simulating Recheck...' : 'Run Recheck'}</span>
            </button>
          </div>
        </div>

        {/* RECHECK NOTICE BANNER */}
        {recheckFeedback && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-start sm:items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="font-bold">{recheckFeedback.message}</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Evaluated at {recheckFeedback.timestamp} · Representative preview simulation against Schema.org standards
                </p>
              </div>
            </div>
            {onNavigateReadiness && (
              <button
                type="button"
                onClick={onNavigateReadiness}
                className="inline-flex items-center gap-1 font-bold text-xs text-emerald-800 hover:text-emerald-950 underline self-start sm:self-auto cursor-pointer"
              >
                <span>View AI Readiness Score ({recheckFeedback.score}%)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* 2. GUIDED WORKFLOW PIPELINE: Add → Check → Review → Approve → Recheck → Ready */}
        <div className="mt-8 pt-6 border-t border-stone-100">
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <Workflow className="w-4 h-4 text-orange-600" />
              <span>Merchant Mental Model: Add → Check → Review → Approve → Recheck → Ready</span>
            </div>
            <span className="text-stone-500 font-medium hidden sm:inline">
              Step 3 & 4 in Progress
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* 1. Add */}
            <div 
              onClick={onAddProducts}
              className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span>01</span>
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <p className="text-xs font-bold text-stone-900 group-hover:text-orange-600 transition-colors mt-1">Add</p>
              <p className="text-[10px] text-stone-500 truncate">24 SKUs Connected</p>
            </div>

            {/* 2. Check */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span>02</span>
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <p className="text-xs font-bold text-stone-900 mt-1">Check</p>
              <p className="text-[10px] text-stone-500 truncate">Scan Complete</p>
            </div>

            {/* 3. Review */}
            <div className={`p-3 rounded-2xl border transition-all ${
              totalOpen > 0 ? 'bg-orange-50/70 border-orange-300 shadow-2xs' : 'bg-stone-50 border-stone-200/80'
            }`}>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={totalOpen > 0 ? 'text-orange-600 font-bold' : 'text-stone-400'}>03</span>
                {totalOpen > 0 ? (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-orange-200 text-orange-900">{totalOpen} Open</span>
                ) : (
                  <Check className="w-3 h-3 text-emerald-600" />
                )}
              </div>
              <p className="text-xs font-bold text-stone-900 mt-1">Review</p>
              <p className="text-[10px] text-stone-600 truncate">{totalOpen} to review</p>
            </div>

            {/* 4. Approve */}
            <div className={`p-3 rounded-2xl border transition-all ${
              totalApproved > 0 ? 'bg-emerald-50/70 border-emerald-300' : 'bg-stone-50 border-stone-200/80'
            }`}>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={totalApproved > 0 ? 'text-emerald-700 font-bold' : 'text-stone-400'}>04</span>
                {totalApproved > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-900">{totalApproved} Approved</span>
                )}
              </div>
              <p className="text-xs font-bold text-stone-900 mt-1">Approve</p>
              <p className="text-[10px] text-stone-600 truncate">{totalApproved} applied</p>
            </div>

            {/* 5. Recheck */}
            <div 
              onClick={handleRunRecheck}
              className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-orange-300 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span>05</span>
                <RefreshCw className={`w-3 h-3 ${isRechecking ? 'animate-spin text-orange-600' : 'text-stone-400'}`} />
              </div>
              <p className="text-xs font-bold text-stone-900 group-hover:text-orange-600 transition-colors mt-1">Recheck</p>
              <p className="text-[10px] text-stone-500 truncate">Run Simulation</p>
            </div>

            {/* 6. Ready */}
            <div 
              onClick={onNavigateReadiness}
              className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-300 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span>06</span>
                <span className="font-bold text-emerald-600">{currentReadinessScore}%</span>
              </div>
              <p className="text-xs font-bold text-stone-900 group-hover:text-emerald-700 transition-colors mt-1">Ready</p>
              <p className="text-[10px] text-stone-500 truncate">{currentReadinessScore}% AI Commerce Ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER & QUEUE BAR */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tabs: Needs Review | Approved | Dismissed | All */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span>Needs Review</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'pending' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
            }`}>
              {totalOpen}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('approved')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'approved'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span>Approved & Applied</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'approved' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {totalApproved}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dismissed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'dismissed'
                ? 'bg-stone-700 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span>Dismissed</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === 'dismissed' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
            }`}>
              {totalDismissed}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-stone-900 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span>All ({issues.length})</span>
          </button>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-xs text-stone-500 font-medium">Filter by urgency:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-stone-700 font-medium focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
          >
            <option value="all">All Urgencies</option>
            <option value="Critical">Critical (Blocks Purchasing)</option>
            <option value="High">High (Ranking Degradation)</option>
            <option value="Medium">Medium (Data Quality)</option>
            <option value="Low">Low (Minor Cleanup)</option>
          </select>
        </div>
      </div>

      {/* 3. REVIEW-APPROVE ACTION CARDS (Answers the 10 Questions) */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">No items match this filter</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {activeTab === 'pending' 
                ? 'All suggestions have been approved or dismissed! Run a recheck to verify your updated readiness score.'
                : 'Try switching filters to view all catalog items.'}
            </p>
            {activeTab === 'pending' && (
              <button
                type="button"
                onClick={handleRunRecheck}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-bold hover:bg-black cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
                <span>Run Recheck Simulation</span>
              </button>
            )}
          </div>
        ) : (
          filteredIssues.map((issue) => {
            const reviewState = reviewStates[issue.id]?.status ?? (issue.isResolved ? 'approved' : 'pending');
            const isApproved = reviewState === 'approved';
            const isDismissed = reviewState === 'dismissed';
            const isEditing = editingCardId === issue.id;
            const plainSeverity = getPlainSeverity(issue.severity);
            const proposedValue = reviewStates[issue.id]?.customValue || issue.recoveryWorkspace?.diff?.proposedValue || '';
            const currentValue = issue.recoveryWorkspace?.diff?.currentValue || 'Missing / Not detected';

            return (
              <div 
                key={issue.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-200 ${
                  isApproved 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : isDismissed 
                      ? 'border-stone-200 opacity-60' 
                      : 'border-stone-200/90 hover:border-orange-300 shadow-xs'
                }`}
              >
                {/* Header Row: Product, SKU, Issue Title & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-stone-100">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-stone-400">
                        {issue.issueNumber}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${plainSeverity.bg}`}>
                        {issue.severity}: {plainSeverity.label}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600">
                        {issue.scope}
                      </span>
                      {isApproved && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Approved & Applied</span>
                        </span>
                      )}
                      {isDismissed && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-stone-200 text-stone-700">
                          Dismissed
                        </span>
                      )}
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-stone-900 mt-1">
                      {issue.title}
                    </h2>

                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-medium text-stone-700">{issue.productName}</span>
                      <span>·</span>
                      <span className="font-mono text-[11px]">SKU: {issue.productSku}</span>
                      {issue.productVariant && (
                        <>
                          <span>·</span>
                          <span className="text-stone-600">{issue.productVariant}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions shortcut or drawer inspector */}
                  {onInspectIssue && (
                    <button
                      type="button"
                      onClick={() => onInspectIssue(issue)}
                      className="self-start sm:self-auto inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-900 cursor-pointer"
                    >
                      <span>Deep Audit</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Question 4: What does AIXSHOP suggest changing? (Diff View) */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Current State */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-bold text-stone-700">Current in your store / feeds:</span>
                      <span className="font-mono text-[10px] text-stone-400">
                        Field: {issue.recoveryWorkspace?.diff?.field || 'attribute'}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-rose-700 bg-white p-2.5 rounded-xl border border-rose-100 break-words">
                      {currentValue}
                    </div>
                  </div>

                  {/* Suggested Fix */}
                  <div className={`p-4 rounded-2xl border space-y-1.5 ${
                    isApproved ? 'bg-emerald-50/40 border-emerald-200' : 'bg-orange-50/40 border-orange-200/80'
                  }`}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                        <span>AIXSHOP Suggested Value:</span>
                      </span>
                      {!isApproved && !isEditing && (
                        <button
                          type="button"
                          onClick={() => startEditing(issue)}
                          className="text-[11px] font-bold text-orange-700 hover:text-orange-900 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editInputValue}
                          onChange={(e) => setEditInputValue(e.target.value)}
                          className="w-full text-xs font-mono bg-white border border-orange-400 rounded-xl p-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleApprove(issue.id, editInputValue)}
                            className="px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold cursor-pointer"
                          >
                            Save & Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingCardId(null)}
                            className="px-3 py-1 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="font-mono text-xs text-emerald-800 bg-white p-2.5 rounded-xl border border-emerald-100 break-words font-semibold">
                        {proposedValue}
                      </div>
                    )}
                  </div>
                </div>

                {/* Question 5 & 6: Why does AIXSHOP suggest it? & What evidence supports it? */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  {/* Why it matters (Plain English for merchant) */}
                  <div className="md:col-span-7 p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/70 space-y-1">
                    <p className="font-bold text-stone-800 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-stone-500" />
                      <span>Why this matters to shoppers & AI assistants:</span>
                    </p>
                    <p className="text-stone-600 leading-relaxed font-normal">
                      {issue.whyItMatters}
                    </p>
                  </div>

                  {/* Evidence source */}
                  <div className="md:col-span-5 p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/70 space-y-1">
                    <p className="font-bold text-stone-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                      <span>Corroborated Evidence:</span>
                    </p>
                    <p className="text-stone-600 font-normal">
                      <strong>Source:</strong> {issue.evidenceRecord?.source || 'Storefront crawl'}<br />
                      <strong>Confidence:</strong> {issue.evidenceRecord?.confidence || 'High'} ({issue.evidenceRecord?.state || 'Verified'})
                    </p>
                  </div>
                </div>

                {/* Question 7, 8, 9: Actions (Can I edit? Can I approve/reject? What happens next?) */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-500">
                    {isApproved ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Fix applied to catalog. Next step: Run Recheck to verify and stage for feeds.
                      </span>
                    ) : isDismissed ? (
                      <span className="text-stone-500">
                        Suggestion dismissed. Item remains unaltered in your catalog.
                      </span>
                    ) : (
                      <span>
                        Approving will stage this fix for Google Merchant Center and AI answer engine feeds.
                      </span>
                    )}
                  </div>

                  {/* Button Group */}
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    {!isApproved && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleDismiss(issue.id)}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          Dismiss
                        </button>
                        {!isEditing && (
                          <button
                            type="button"
                            onClick={() => startEditing(issue)}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3 text-stone-500" />
                            <span>Edit</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleApprove(issue.id)}
                          className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-xs hover:shadow transition-all cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Approve Suggestion</span>
                        </button>
                      </>
                    )}

                    {isApproved && (
                      <button
                        type="button"
                        onClick={() => {
                          setReviewStates(prev => ({
                            ...prev,
                            [issue.id]: { status: 'pending' }
                          }));
                        }}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        Undo Approval
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* 4. GUIDED STEP-BY-STEP REVIEW WIZARD MODAL */}
      {wizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600">
                  Step-by-Step Guided Review ({wizardIndex + 1} of {issues.length})
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  {issues[wizardIndex]?.title}
                </h3>
                <p className="text-xs text-stone-500">
                  {issues[wizardIndex]?.productName} · SKU: {issues[wizardIndex]?.productSku}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWizardOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {issues[wizardIndex] && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-1">
                  <p className="font-bold text-orange-950">What AIXSHOP suggests:</p>
                  <p className="font-mono text-emerald-900 bg-white p-2.5 rounded-xl border border-orange-200 font-semibold">
                    {reviewStates[issues[wizardIndex].id]?.customValue || issues[wizardIndex].recoveryWorkspace?.diff?.proposedValue}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <p className="font-bold text-stone-800">Why this matters:</p>
                  <p className="text-stone-600 leading-relaxed font-normal">
                    {issues[wizardIndex].whyItMatters}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <p className="font-bold text-stone-800">Supporting Evidence:</p>
                  <p className="text-stone-600 font-normal">
                    {issues[wizardIndex].evidenceRecord?.source} · Confidence: {issues[wizardIndex].evidenceRecord?.confidence}
                  </p>
                </div>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between border-t border-stone-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  if (wizardIndex > 0) setWizardIndex(wizardIndex - 1);
                }}
                disabled={wizardIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleDismiss(issues[wizardIndex].id);
                    if (wizardIndex < issues.length - 1) {
                      setWizardIndex(wizardIndex + 1);
                    } else {
                      setWizardOpen(false);
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleApprove(issues[wizardIndex].id);
                    if (wizardIndex < issues.length - 1) {
                      setWizardIndex(wizardIndex + 1);
                    } else {
                      setWizardOpen(false);
                      handleRunRecheck();
                    }
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-xs cursor-pointer inline-flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve & Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
