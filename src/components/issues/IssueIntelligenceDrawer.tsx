// src/components/issues/IssueIntelligenceDrawer.tsx
// Deep Intelligence Drawer for Page 10 — Issues & Recovery

import React, { useState } from 'react';
import { 
  X, 
  AlertCircle, 
  AlertOctagon, 
  ShieldAlert, 
  CheckCircle2, 
  UserCheck, 
  Sparkles, 
  ExternalLink, 
  ArrowRight, 
  RefreshCw, 
  Check, 
  Ban, 
  Info, 
  Cpu, 
  Layers, 
  GitBranch, 
  FileCode, 
  HelpCircle,
  Database,
  History,
  Tag,
  Wrench,
  Compass,
  DollarSign,
  ShieldCheck,
  Lock,
  ListOrdered,
  Building2
} from 'lucide-react';
import { 
  IssueItem, 
  IssueEvidenceState, 
  IssueRecoveryState, 
  BuyerIntentArchetype 
} from '../../types/issues';
import { deriveMerchantActionIntegrity } from '../../data/telemetrySelectors';

interface IssueIntelligenceDrawerProps {
  issue: IssueItem | null;
  onClose: () => void;
  onUpdateIssueState: (issueId: string, updates: Partial<IssueItem>) => void;
  onNavigateFixWorkflow?: () => void;
  onOpenProductReport?: (productId: string) => void;
  onNavigateWorkbench?: () => void;
  onNavigateOffers?: () => void;
  onNavigateDiscovery?: () => void;
}

export const IssueIntelligenceDrawer: React.FC<IssueIntelligenceDrawerProps> = ({
  issue,
  onClose,
  onUpdateIssueState,
  onNavigateFixWorkflow,
  onOpenProductReport,
  onNavigateWorkbench,
  onNavigateOffers,
  onNavigateDiscovery
}) => {
  if (!issue) return null;

  // Phase 2.2: Authoritative Merchant Action Integrity derivation (Contract 1-6)
  const integrity = deriveMerchantActionIntegrity(issue);

  // Local verification interactive simulation state
  const [selectedVerificationChoice, setSelectedVerificationChoice] = useState<string | null>(null);
  const [customVerifiedInput, setCustomVerifiedInput] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  // Rescan simulation state
  const [isRescanning, setIsRescanning] = useState<boolean>(false);
  const [rescanResult, setRescanResult] = useState<{
    status: 'Resolved' | 'Still Open' | 'Blocked';
    message: string;
    timestamp: string;
  } | null>(null);

  // Handle Merchant Verification Action
  const handleConfirmVerification = (choice: 'sourceA' | 'sourceB' | 'custom' | 'unresolved') => {
    setIsVerifying(true);
    setTimeout(() => {
      let resolvedValue = '';
      if (choice === 'sourceA' && issue.evidenceRecord.sourceDetails?.sourceA) {
        resolvedValue = issue.evidenceRecord.sourceDetails.sourceA.value;
      } else if (choice === 'sourceB' && issue.evidenceRecord.sourceDetails?.sourceB) {
        resolvedValue = issue.evidenceRecord.sourceDetails.sourceB.value;
      } else if (choice === 'custom') {
        resolvedValue = customVerifiedInput.trim() || 'Merchant Authoritative Input';
      } else {
        // Leave unresolved
        setIsVerifying(false);
        setVerificationFeedback('Left in unresolved CONFLICT state per merchant instruction.');
        return;
      }

      // Update local issue state
      onUpdateIssueState(issue.id, {
        evidenceState: 'MERCHANT_VERIFIED',
        recoveryState: 'Resolved',
        isResolved: true,
        recoveryWorkspace: {
          ...issue.recoveryWorkspace,
          verificationStatus: 'VERIFIED',
          diff: {
            ...issue.recoveryWorkspace.diff,
            proposedValue: resolvedValue,
            proposedEvidenceState: 'MERCHANT_VERIFIED',
            validationResult: 'PASS',
            validationReason: 'Merchant human-in-the-loop verification authenticated authoritative truth.'
          }
        }
      });

      setIsVerifying(false);
      setVerificationFeedback(
        `Verified as "${resolvedValue}". State upgraded to MERCHANT VERIFIED within AIXSHOP preview model.`
      );
    }, 450);
  };

  // Handle Preview Rescan simulation
  const handlePreviewRescan = () => {
    setIsRescanning(true);
    setRescanResult(null);

    setTimeout(() => {
      setIsRescanning(false);
      if (issue.recoveryState === 'Resolved' || issue.evidenceState === 'MERCHANT_VERIFIED') {
        setRescanResult({
          status: 'Resolved',
          message: 'Preview crawler confirmed verified value in catalog cache. Issue remains Resolved.',
          timestamp: 'Just now (Rep. Preview)'
        });
      } else if (issue.recoveryEligibility === 'Evidence-Gated') {
        setRescanResult({
          status: 'Blocked',
          message: 'Source conflict still persists across feeds. Blocked from automatic resolution.',
          timestamp: 'Just now (Rep. Preview)'
        });
      } else {
        setRescanResult({
          status: 'Still Open',
          message: 'Crawl completed. Schema disparity continues to exceed tolerance. Recovery proposed.',
          timestamp: 'Just now (Rep. Preview)'
        });
      }
    }, 600);
  };

  const intentArchetypes: BuyerIntentArchetype[] = [
    'Discovery',
    'Problem',
    'Comparison',
    'Specification',
    'Purchase',
    'Use Case',
    'Trust'
  ];

  const getIntentBadge = (status: string) => {
    switch (status) {
      case 'Affected':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'Evidence Blocked':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Unknown':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Not Affected':
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-4xl bg-[#090D16] border-l border-slate-800 shadow-2xl flex flex-col h-full overflow-hidden text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
        
        {/* TOP BAR: IDENTITY & ACTIONS */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0C111E] flex items-start justify-between gap-4 sticky top-0 z-10">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                {issue.issueNumber}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {issue.issueType}
              </span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                issue.severity === 'Critical'
                  ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                  : issue.severity === 'High'
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                  : 'bg-blue-500/15 text-blue-300 border-blue-500/40'
              }`}>
                {issue.severity}
              </span>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                {issue.previewBadge}
              </span>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                integrity.scope === 'PRODUCT'
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                  : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
              }`}>
                {integrity.scope} SCOPE
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {issue.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span>Product:</span>
              <button
                type="button"
                onClick={() => onOpenProductReport && onOpenProductReport(issue.productId)}
                className="font-medium text-cyan-400 hover:text-cyan-300 underline cursor-pointer inline-flex items-center gap-1"
                title="View Product Report (Page 03)"
              >
                <span>{issue.productName}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-slate-400">SKU: {issue.productSku}</span>
              {issue.productVariant && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="inline-flex items-center gap-1 text-cyan-300 font-mono text-[11px]">
                    <Tag className="w-2.5 h-2.5" />
                    {issue.productVariant}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
              title="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DRAWER BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* QUICK CROSS-PAGE TRANSITIONS BAR */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs">
            <span className="font-mono text-slate-400 font-semibold text-[11px]">
              Connected Intelligence Surfaces:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {onNavigateFixWorkflow && (
                <button
                  type="button"
                  onClick={onNavigateFixWorkflow}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 transition-colors font-medium cursor-pointer"
                >
                  <Wrench className="w-3 h-3" />
                  <span>Review Fix in Fix & Verification (P04)</span>
                </button>
              )}
              {onNavigateWorkbench && (
                <button
                  type="button"
                  onClick={onNavigateWorkbench}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-medium cursor-pointer"
                >
                  <Layers className="w-3 h-3" />
                  <span>Workbench (P06)</span>
                </button>
              )}
              {onNavigateOffers && (
                <button
                  type="button"
                  onClick={onNavigateOffers}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-medium cursor-pointer"
                >
                  <DollarSign className="w-3 h-3" />
                  <span>Offers (P07)</span>
                </button>
              )}
              {onNavigateDiscovery && (
                <button
                  type="button"
                  onClick={onNavigateDiscovery}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-medium cursor-pointer"
                >
                  <Compass className="w-3 h-3" />
                  <span>Discovery (P08)</span>
                </button>
              )}
            </div>
          </div>

          {/* SECTION B: WHY AIXSHOP CREATED THIS ISSUE (DETERMINISTIC) */}
          <div className="p-4 rounded-xl bg-[#0E1424] border border-cyan-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              <Cpu className="w-4 h-4" />
              <span>Deterministic Diagnostic Reason (Why AIXSHOP Created This Issue)</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {issue.diagnosticReason}
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Rule Engine Grounding: Strict non-hallucination mandate</span>
              <span className="text-cyan-400">Never inferred by generative guesses</span>
            </div>
          </div>

          {/* PHASE 2.2: EXPLAINABILITY & ACTION AUTHORITY CARD */}
          <div 
            id="merchant-action-integrity-card"
            className="p-5 rounded-xl bg-gradient-to-b from-[#0D1527] to-[#0A0F1D] border border-cyan-500/40 shadow-xl space-y-5"
          >
            {/* Header & Domain Scope Separation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                      Explainability & Action Authority
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-500/30">
                      Phase 2.2
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    Deterministic issue explainability, evidence verification, and source-of-record boundary contract.
                  </p>
                </div>
              </div>

              {/* Product != Offer Separation Badge */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold border ${
                  integrity.scope === 'PRODUCT'
                    ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40'
                    : 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                }`}>
                  <Tag className="w-3.5 h-3.5" />
                  <span>DOMAIN: {integrity.scope} SCOPE</span>
                </span>
              </div>
            </div>

            {/* 1. WHAT IS WRONG? */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>1. What is Wrong?</span>
              </div>
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-200 text-sm font-sans leading-relaxed">
                {integrity.problem}
              </div>
            </div>

            {/* 2. WHAT EVIDENCE PROVES IT? */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                <Database className="w-3.5 h-3.5" />
                <span>2. What Evidence Proves It?</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2.5 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Observed Evidence Value:</span>
                    <span className="text-white font-semibold block truncate" title={integrity.evidence.observedValue}>
                      {integrity.evidence.observedValue}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Authoritative Source:</span>
                    <span className="text-cyan-300 font-semibold block truncate" title={integrity.evidence.source}>
                      {integrity.evidence.source}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Evidence State / Confidence:</span>
                    <span className="text-amber-300 font-semibold">
                      {integrity.evidence.evidenceState} · {integrity.evidence.confidence} Confidence
                    </span>
                  </div>
                </div>

                {integrity.evidence.sourceDetails && (
                  <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                      <span className="text-slate-400 block font-bold">Source A ({integrity.evidence.sourceDetails.sourceA.name}):</span>
                      <span className="text-slate-200 font-mono">{integrity.evidence.sourceDetails.sourceA.value}</span>
                      <span className="text-slate-400 block text-[10px] mt-0.5">{integrity.evidence.sourceDetails.sourceA.detectedAt}</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                      <span className="text-slate-400 block font-bold">Source B ({integrity.evidence.sourceDetails.sourceB.name}):</span>
                      <span className="text-slate-200 font-mono">{integrity.evidence.sourceDetails.sourceB.value}</span>
                      <span className="text-slate-400 block text-[10px] mt-0.5">{integrity.evidence.sourceDetails.sourceB.detectedAt}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800 text-[11px] flex flex-wrap items-center justify-between gap-1 text-slate-400">
                  <span>Required Grounding: <strong className="text-slate-200">{integrity.evidence.expectedCondition}</strong></span>
                  <span>Detected: <strong className="text-slate-300">{integrity.evidence.detectedAt}</strong></span>
                </div>
              </div>
            </div>

            {/* 3. WHY WAS THE ISSUE CREATED? */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>3. Why Was The Issue Created?</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
                {integrity.reason}
              </div>
            </div>

            {/* 4. WHAT SHOULD THE MERCHANT DO NEXT? */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>4. What Should the Merchant Do Next?</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 font-bold">
                  ACTION: {integrity.nextAction.actionCode}
                </span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {integrity.nextAction.actionLabel}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {integrity.nextAction.summary}
                    </p>
                  </div>
                </div>

                {/* Step-by-Step Procedure */}
                <div className="space-y-1.5 pt-1 border-t border-slate-800">
                  <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase">
                    Ordered Execution Steps:
                  </span>
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {integrity.nextAction.steps.map((step) => (
                      <div 
                        key={step.stepNumber}
                        className="p-2 rounded bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5 text-xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-500/40 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                          {step.stepNumber}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-slate-200 font-mono text-xs">{step.label}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 shrink-0">
                              {step.targetSystem}
                            </span>
                          </div>
                          <p className="text-slate-400 text-xs mt-0.5 leading-normal">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. WHAT SOURCE OR DATA SHOULD BE CHANGED? */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>5. What Source or Data Should Be Changed?</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 text-[10.5px] uppercase block">Authoritative Source of Record:</span>
                  <span className="text-white font-semibold text-xs mt-0.5 block">
                    {integrity.sourceOwnership.sourceOfRecord}
                  </span>
                  <span className="text-[11px] text-cyan-400 mt-1 block">
                    Owner: {integrity.sourceOwnership.ownerType}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 text-[10.5px] uppercase block">System Navigation Location:</span>
                  <span className="text-slate-200 font-semibold text-xs mt-0.5 block">
                    {integrity.sourceOwnership.systemLocation}
                  </span>
                  <span className="text-[11px] text-amber-400 mt-1 block">
                    Field: {integrity.sourceOwnership.dataFieldToChange}
                  </span>
                </div>
              </div>
            </div>

            {/* 6. WHAT MUST REMAIN UNCHANGED BECAUSE AIXSHOP DOES NOT OWN THE SOURCE OF TRUTH? */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>6. Authority Boundary (What Must Remain Unchanged)</span>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* AIXSHOP Capabilities */}
                  <div className="p-2.5 rounded bg-cyan-950/20 border border-cyan-500/20 space-y-1.5">
                    <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      What AIXSHOP Can Do:
                    </span>
                    <ul className="space-y-1 text-slate-300 text-[11.5px] list-disc list-inside">
                      {integrity.boundary.aixshopCan.map((item, idx) => (
                        <li key={idx} className="leading-tight">{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Merchant Responsibilities */}
                  <div className="p-2.5 rounded bg-purple-950/20 border border-purple-500/20 space-y-1.5">
                    <span className="text-[11px] font-mono font-bold text-purple-300 uppercase flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                      What Merchant Must Do:
                    </span>
                    <ul className="space-y-1 text-slate-300 text-[11.5px] list-disc list-inside">
                      {integrity.boundary.merchantMust.map((item, idx) => (
                        <li key={idx} className="leading-tight">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Explicit Non-Writeback Guarantee */}
                <div className="p-2.5 rounded bg-rose-950/30 border border-rose-500/30 flex items-start gap-2 text-xs text-rose-200">
                  <Ban className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-rose-300 block text-[11px] uppercase">
                      Immutable AIXSHOP Truth & Write-Back Boundary:
                    </span>
                    <p className="text-slate-300 text-xs mt-0.5 leading-normal">
                      {integrity.boundary.cannotClaim}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: EVIDENCE RECORD */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>First-Class Evidence Record</span>
              </div>
              <span className={`text-[10.5px] font-mono font-bold px-2 py-0.5 rounded border ${
                issue.evidenceRecord.state === 'CONFLICT'
                  ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                  : issue.evidenceRecord.state === 'MISSING'
                  ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                  : issue.evidenceRecord.state === 'MERCHANT_VERIFIED'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}>
                STATE: {issue.evidenceRecord.state}
              </span>
            </div>

            {/* Structured Evidence Schema Table */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">VALUE</div>
                <div className="text-slate-200 font-semibold truncate" title={issue.evidenceRecord.value}>
                  {issue.evidenceRecord.value}
                </div>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">SOURCE</div>
                <div className="text-slate-200 truncate" title={issue.evidenceRecord.source}>
                  {issue.evidenceRecord.source}
                </div>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">DETECTED_AT</div>
                <div className="text-slate-300">{issue.evidenceRecord.detectedAt}</div>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">VALID_UNTIL</div>
                <div className="text-slate-400">{issue.evidenceRecord.validUntil}</div>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">CONFIDENCE</div>
                <div className="text-cyan-300 font-semibold">{issue.evidenceRecord.confidence}</div>
              </div>
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">EVIDENCE STATE</div>
                <div className="text-amber-300 font-semibold">{issue.evidenceRecord.state}</div>
              </div>
            </div>

            {/* Explicit Conflict Comparison if state is CONFLICT */}
            {issue.evidenceRecord.sourceDetails && (
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-300">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Authoritative Source Contradiction (Non-Averaging Principle)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Two authoritative sources provide conflicting values. AIXSHOP strictly refuses to average values or select one without an explicit rule.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="p-2.5 rounded bg-slate-900 border border-rose-500/30">
                    <div className="text-[10px] text-rose-400 font-semibold">SOURCE A (GS1 / Manufacturer)</div>
                    <div className="text-white font-bold text-sm my-0.5">
                      {issue.evidenceRecord.sourceDetails.sourceA?.value}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {issue.evidenceRecord.sourceDetails.sourceA?.name} · {issue.evidenceRecord.sourceDetails.sourceA?.detectedAt}
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-rose-500/30">
                    <div className="text-[10px] text-rose-400 font-semibold">SOURCE B (Merchant / Feed)</div>
                    <div className="text-white font-bold text-sm my-0.5">
                      {issue.evidenceRecord.sourceDetails.sourceB?.value}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {issue.evidenceRecord.sourceDetails.sourceB?.name} · {issue.evidenceRecord.sourceDetails.sourceB?.detectedAt}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION D: BUYER IMPACT (7 IMMUTABLE ARCHETYPES) */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Buyer Impact Across 7 Intent Archetypes</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Deterministic consumer intent analysis
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {intentArchetypes.map(archetype => {
                const impact = issue.buyerImpacts[archetype];
                if (!impact) return null;

                return (
                  <div
                    key={archetype}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-slate-200 font-mono text-[11px]">
                        {archetype} Intent
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${getIntentBadge(impact.status)}`}>
                        {impact.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {impact.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION E: RECOVERY CLASSIFICATION & WORKSPACE */}
          <div className="p-4 rounded-xl bg-[#0B101D] border border-cyan-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>{issue.recoveryWorkspace.recoveryClassLabel}</span>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded border font-semibold ${
                issue.recoveryEligibility === 'Eligible'
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                  : issue.recoveryEligibility === 'Merchant Required'
                  ? 'bg-purple-500/15 text-purple-300 border-purple-500/40'
                  : 'bg-rose-500/15 text-rose-300 border-rose-500/40'
              }`}>
                Eligibility: {issue.recoveryEligibility}
              </span>
            </div>

            {/* Recovery Sequence Step-by-Step */}
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">1. Current Known State</span>
                <span className="text-slate-200">{issue.recoveryWorkspace.currentStateSummary}</span>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">2. Inconsistency / Problem</span>
                <span className="text-slate-200">{issue.recoveryWorkspace.problemDescription}</span>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-mono text-cyan-400 uppercase block">3. Proposed Recovery Transformation</span>
                <span className="text-slate-100 font-medium">{issue.recoveryWorkspace.proposedRecoveryAction}</span>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] font-mono text-amber-400 uppercase block">4. Grounded Evidence Requirement</span>
                <span className="text-slate-200">{issue.recoveryWorkspace.evidenceRequirement}</span>
              </div>
            </div>

            {/* BEFORE / AFTER DIFF (Section 15) */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Visual Attribute Diff & State Audit</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded border ${
                  issue.recoveryWorkspace.diff.validationResult === 'PASS'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                }`}>
                  Validation Result: {issue.recoveryWorkspace.diff.validationResult}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase flex items-center justify-between">
                    <span>CURRENT ({issue.recoveryWorkspace.diff.field})</span>
                    <span className="text-amber-400 font-semibold">{issue.recoveryWorkspace.diff.currentEvidenceState}</span>
                  </div>
                  <pre className="text-rose-300 mt-1 whitespace-pre-wrap font-mono text-[11px] overflow-x-auto">
                    {issue.recoveryWorkspace.diff.currentValue}
                  </pre>
                </div>

                <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase flex items-center justify-between">
                    <span>PROPOSED RECOVERY</span>
                    <span className="text-emerald-400 font-semibold">{issue.recoveryWorkspace.diff.proposedEvidenceState}</span>
                  </div>
                  <pre className="text-emerald-300 mt-1 whitespace-pre-wrap font-mono text-[11px] overflow-x-auto">
                    {issue.recoveryWorkspace.diff.proposedValue}
                  </pre>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800/80 text-[11px] text-slate-400">
                <strong className="text-slate-300 font-medium">Validation Gate:</strong>{' '}
                {issue.recoveryWorkspace.diff.validationReason}
              </div>
            </div>

            {/* SECTION 17: DETERMINISTIC VALIDATION ENGINE PREVIEW */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Deterministic Validation Pre-check
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                {issue.recoveryWorkspace.deterministicValidationRules.map(rule => (
                  <div
                    key={rule.id}
                    className="p-2 rounded bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                        {rule.category}
                      </span>
                      <span className="text-slate-200 font-medium text-[11px]">
                        {rule.ruleName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] text-slate-400 hidden sm:inline truncate max-w-xs">
                        {rule.detail}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        rule.status === 'PASS'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : rule.status === 'BLOCKED'
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}>
                        {rule.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 16: CONTROLLED MERCHANT VERIFICATION ACTION (EVIDENCE-GATED) */}
            {issue.recoveryEligibility === 'Merchant Required' || issue.recoveryEligibility === 'Evidence-Gated' ? (
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
                  <UserCheck className="w-4 h-4" />
                  <span>Controlled Merchant Verification Arbitration</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Confirm the authoritative ground-truth value to upgrade this attribute from <code className="text-amber-300 font-mono">MISSING</code> / <code className="text-rose-300 font-mono">CONFLICT</code> to <code className="text-emerald-300 font-mono">MERCHANT VERIFIED</code> within AIXSHOP.
                </p>

                {issue.evidenceRecord.sourceDetails ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleConfirmVerification('sourceA')}
                        disabled={isVerifying}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-purple-500 text-left transition-colors cursor-pointer group"
                      >
                        <span className="text-[10px] font-mono text-purple-400 block mb-1">
                          Select Source A (GS1 / Spec):
                        </span>
                        <span className="font-bold text-white font-mono text-xs block truncate">
                          {issue.evidenceRecord.sourceDetails.sourceA?.value}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Certify {issue.evidenceRecord.sourceDetails.sourceA?.name}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleConfirmVerification('sourceB')}
                        disabled={isVerifying}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-purple-500 text-left transition-colors cursor-pointer group"
                      >
                        <span className="text-[10px] font-mono text-purple-400 block mb-1">
                          Select Source B (Catalog Feed):
                        </span>
                        <span className="font-bold text-white font-mono text-xs block truncate">
                          {issue.evidenceRecord.sourceDetails.sourceB?.value}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Certify {issue.evidenceRecord.sourceDetails.sourceB?.name}
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={customVerifiedInput}
                        onChange={e => setCustomVerifiedInput(e.target.value)}
                        placeholder="Or provide custom verified physical box value..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleConfirmVerification('custom')}
                        disabled={isVerifying || !customVerifiedInput.trim()}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Certify Value
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customVerifiedInput}
                        onChange={e => setCustomVerifiedInput(e.target.value)}
                        placeholder="Enter authoritative return policy text or URL..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleConfirmVerification('custom')}
                        disabled={isVerifying}
                        className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Certify Policy
                      </button>
                    </div>
                  </div>
                )}

                {verificationFeedback && (
                  <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{verificationFeedback}</span>
                  </div>
                )}

                <p className="text-[11px] text-slate-400 italic">
                  Merchant verification establishes the value as verified within AIXSHOP. It does not automatically publish or write-back the value to an external commerce system.
                </p>
              </div>
            ) : null}

            {/* SECTION 18: CONCEPTUAL RESCAN & DIFF */}
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div>
                <span className="font-mono font-semibold text-slate-300 block">
                  Preview Rescan & Diff
                </span>
                <span className="text-[11px] text-slate-400">
                  Re-evaluates issue state against representative catalog snapshot.
                </span>
              </div>

              <button
                type="button"
                onClick={handlePreviewRescan}
                disabled={isRescanning}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 transition-colors font-mono text-xs cursor-pointer self-start sm:self-auto disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRescanning ? 'animate-spin text-cyan-400' : ''}`} />
                <span>{isRescanning ? 'Evaluating...' : 'Preview Rescan'}</span>
              </button>
            </div>

            {rescanResult && (
              <div className="p-2.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Re-evaluation Result:</span>
                  <span className={`font-bold ${
                    rescanResult.status === 'Resolved'
                      ? 'text-emerald-400'
                      : rescanResult.status === 'Blocked'
                      ? 'text-rose-400'
                      : 'text-amber-400'
                  }`}>
                    {rescanResult.status}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">{rescanResult.message}</p>
                <div className="text-[10px] text-slate-500 text-right">{rescanResult.timestamp}</div>
              </div>
            )}
          </div>

          {/* SECTION 19: RECOVERY HISTORY TIMELINE */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              <History className="w-4 h-4 text-cyan-400" />
              <span>Immutable Recovery Audit History</span>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {issue.history.map((evt, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full border-2 ${
                    evt.state === 'Resolved'
                      ? 'bg-emerald-500 border-emerald-300'
                      : evt.state === 'Blocked'
                      ? 'bg-rose-500 border-rose-300'
                      : 'bg-cyan-500 border-cyan-300'
                  }`} />
                  <div className="text-xs font-mono font-semibold text-slate-200 flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">{evt.stage}</span>
                    <span className="text-slate-500">·</span>
                    <span>{evt.title}</span>
                    <span className="text-slate-500 text-[10px] ml-auto">{evt.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {evt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM DRAWER FOOTER */}
        <div className="p-4 border-t border-slate-800 bg-[#0C111E] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 text-[11px]">
            <span>Issue ID: </span>
            <span className="font-mono text-slate-300">{issue.id}</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateFixWorkflow && (
              <button
                type="button"
                onClick={onNavigateFixWorkflow}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Fix in Page 04</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              Close Drawer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
