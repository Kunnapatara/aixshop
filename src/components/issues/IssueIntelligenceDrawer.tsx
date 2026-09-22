// src/components/issues/IssueIntelligenceDrawer.tsx
// Phase 2.3 — Fix Center & Issue Intelligence Workspace
// Sequential Workflow: Issue & Scope → Evidence → Explanation → Fix Preview → Validation → Verify / Rescan → Resolution

import React, { useState } from 'react';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  Wrench, 
  RefreshCw, 
  History, 
  ShieldAlert, 
  Database, 
  Tag, 
  Compass, 
  Building2, 
  Lock, 
  Check, 
  UserCheck, 
  Ban, 
  ListOrdered, 
  Layers, 
  DollarSign, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  Info,
  CheckSquare,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { 
  IssueItem, 
  BuyerIntentArchetype, 
  IssueRecoveryState, 
  ValidationRuleResult,
  IssueHistoryEvent
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

  // Derive Merchant Action Integrity & Boundary Contract
  const integrity = deriveMerchantActionIntegrity(issue);

  // Local verification and fix staging states
  const [selectedVerificationChoice, setSelectedVerificationChoice] = useState<string | null>(null);
  const [customVerifiedInput, setCustomVerifiedInput] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);
  const [isStagingFix, setIsStagingFix] = useState<boolean>(false);

  // Rescan simulation state
  const [isRescanning, setIsRescanning] = useState<boolean>(false);
  const [rescanResult, setRescanResult] = useState<{
    status: 'Resolved' | 'Still Open' | 'Blocked' | 'Requires External Update';
    message: string;
    timestamp: string;
    blockingRule?: string;
  } | null>(null);

  // Active step navigation in workflow header
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'all' | 'evidence' | 'fix' | 'validation' | 'verify'>('all');

  // Handle Controlled Merchant Verification (Class B / Evidence-Gated)
  // CRITICAL RULE: A button click is NOT proof of resolution.
  // This records what the merchant verified, updates preview evidence state, runs deterministic validation rules,
  // but does NOT mark the issue resolved until Verify / Rescan is executed!
  const handleConfirmVerification = (choice: 'sourceA' | 'sourceB' | 'custom' | 'unresolved') => {
    setIsVerifying(true);
    setVerificationFeedback(null);
    setRescanResult(null);

    setTimeout(() => {
      if (choice === 'unresolved') {
        setIsVerifying(false);
        setVerificationFeedback('Merchant confirmed: Left in unresolved CONFLICT state per instruction. Resolution remains BLOCKED at Evidence Gate.');
        
        // Record arbitration event in history
        const updatedHistory: IssueHistoryEvent[] = [
          ...issue.history,
          {
            stage: 'ARBITRATION',
            timestamp: 'Just now',
            title: 'Conflict Left Unresolved',
            description: 'Merchant inspected contradictory evidence sources and opted to leave conflict unresolved. State remains BLOCKED.',
            state: 'Blocked'
          }
        ];

        onUpdateIssueState(issue.id, {
          recoveryState: 'Blocked',
          isResolved: false,
          history: updatedHistory
        });
        return;
      }

      let resolvedValue = '';
      let sourceName = '';

      if (choice === 'sourceA' && issue.evidenceRecord.sourceDetails?.sourceA) {
        resolvedValue = issue.evidenceRecord.sourceDetails.sourceA.value;
        sourceName = issue.evidenceRecord.sourceDetails.sourceA.name;
      } else if (choice === 'sourceB' && issue.evidenceRecord.sourceDetails?.sourceB) {
        resolvedValue = issue.evidenceRecord.sourceDetails.sourceB.value;
        sourceName = issue.evidenceRecord.sourceDetails.sourceB.name;
      } else if (choice === 'custom') {
        resolvedValue = customVerifiedInput.trim() || 'Merchant Authoritative Input';
        sourceName = 'Merchant Manual Verification';
      }

      // Re-evaluate validation rules deterministically
      const updatedRules: ValidationRuleResult[] = issue.recoveryWorkspace.deterministicValidationRules.map(rule => {
        if (rule.status === 'BLOCKED') {
          return {
            ...rule,
            status: 'PASS',
            detail: `Verified: Confirmed authoritative input "${resolvedValue}" from ${sourceName}.`
          };
        }
        return rule;
      });

      // Update history with progression
      const updatedHistory: IssueHistoryEvent[] = [
        ...issue.history,
        {
          stage: 'MERCHANT_VERIFIED',
          timestamp: 'Just now',
          title: 'Merchant Verified Authoritative Value',
          description: `Merchant attested authoritative value: "${resolvedValue}". Staged into AIXSHOP preview model as MERCHANT_VERIFIED. (External write-back to Shopify / marketplace unchanged).`,
          state: 'Validation Required'
        },
        {
          stage: 'VALIDATE',
          timestamp: 'Just now',
          title: 'Deterministic Rules Evaluated',
          description: `Evaluated ${updatedRules.length} deterministic validation rules: PASS (${updatedRules.filter(r => r.status === 'PASS').length}/${updatedRules.length}). Awaiting Verify / Rescan to confirm resolution.`,
          state: 'Validation Required'
        }
      ];

      // Update issue in master state (note: recoveryState is 'Validation Required', isResolved remains false!)
      onUpdateIssueState(issue.id, {
        evidenceState: 'MERCHANT_VERIFIED',
        recoveryState: 'Validation Required',
        isResolved: false,
        evidenceRecord: {
          ...issue.evidenceRecord,
          value: resolvedValue,
          state: 'MERCHANT_VERIFIED',
          confidence: 'High',
          detectedAt: 'Just now (Merchant Verified in Preview)'
        },
        recoveryWorkspace: {
          ...issue.recoveryWorkspace,
          verificationStatus: 'VERIFIED',
          deterministicValidationRules: updatedRules,
          diff: {
            ...issue.recoveryWorkspace.diff,
            proposedValue: resolvedValue,
            proposedEvidenceState: 'MERCHANT_VERIFIED',
            validationResult: 'PASS',
            validationReason: `Merchant human-in-the-loop verification authenticated authoritative truth "${resolvedValue}". Ready for verification rescan.`
          }
        },
        history: updatedHistory
      });

      setIsVerifying(false);
      setSelectedVerificationChoice(choice);
      setVerificationFeedback(
        `Authoritative value recorded: "${resolvedValue}". AIXSHOP preview evidence state upgraded to MERCHANT_VERIFIED. All validation rules evaluated: PASS. Run "Preview Rescan" below to confirm resolution.`
      );
    }, 450);
  };

  // Handle Deterministic Fix Staging (Class A / Deterministic)
  // Staging the fix updates the proposed diff and executes validation rules, but does NOT mark as Resolved.
  const handleApplyDeterministicFix = () => {
    setIsStagingFix(true);
    setVerificationFeedback(null);
    setRescanResult(null);

    setTimeout(() => {
      // Re-evaluate deterministic validation rules
      const updatedRules: ValidationRuleResult[] = issue.recoveryWorkspace.deterministicValidationRules.map(rule => ({
        ...rule,
        status: 'PASS',
        detail: `Verified against canonical schema rules. Transformation staged in preview cache.`
      }));

      const updatedHistory: IssueHistoryEvent[] = [
        ...issue.history,
        {
          stage: 'FIX_PREPARED',
          timestamp: 'Just now',
          title: 'Deterministic Fix Staged',
          description: `Staged proposed transformation: ${issue.recoveryWorkspace.proposedRecoveryAction}. Staged in local preview cache; external systems unchanged.`,
          state: 'Validation Required'
        },
        {
          stage: 'VALIDATE',
          timestamp: 'Just now',
          title: 'Deterministic Rules Evaluated',
          description: `All deterministic rules evaluated: PASS (${updatedRules.length}/${updatedRules.length}). Awaiting Verify / Rescan to conclude resolution.`,
          state: 'Validation Required'
        }
      ];

      onUpdateIssueState(issue.id, {
        recoveryState: 'Validation Required',
        isResolved: false,
        recoveryWorkspace: {
          ...issue.recoveryWorkspace,
          verificationStatus: 'VERIFIED',
          deterministicValidationRules: updatedRules,
          diff: {
            ...issue.recoveryWorkspace.diff,
            validationResult: 'PASS',
            validationReason: 'Deterministic remediation staged in preview cache. Ready for verification rescan.'
          }
        },
        history: updatedHistory
      });

      setIsStagingFix(false);
      setVerificationFeedback(
        `Deterministic remediation staged into AIXSHOP preview cache. All validation rules evaluated: PASS. Run "Preview Rescan" below to verify resolution.`
      );
    }, 400);
  };

  // Handle Preview Rescan & Verification Evaluation
  // Evaluates actual validation semantics: RESOLVED, STILL_OPEN, BLOCKED, or REQUIRES_EXTERNAL_UPDATE
  const handlePreviewRescan = () => {
    setIsRescanning(true);
    setRescanResult(null);

    setTimeout(() => {
      setIsRescanning(false);

      // 1. If issue is already resolved, recheck confirms it
      if (issue.recoveryState === 'Resolved' || issue.isResolved) {
        setRescanResult({
          status: 'Resolved',
          message: 'Preview crawler re-evaluated catalog cache. All schema, identity, and evidence rules PASS. Issue remains Resolved.',
          timestamp: 'Just now (Rep. Preview)'
        });
        return;
      }

      // 2. Check live validation rules in recovery workspace
      const currentRules = issue.recoveryWorkspace.deterministicValidationRules;
      const failingOrBlockedRules = currentRules.filter(r => r.status === 'FAIL' || r.status === 'BLOCKED');

      if (failingOrBlockedRules.length > 0) {
        // Validation semantics do not support resolution
        const firstBlock = failingOrBlockedRules[0];
        const isConflict = issue.evidenceRecord.state === 'CONFLICT' || issue.recoveryState === 'Blocked';

        const blockedStatus = isConflict ? 'Blocked' : 'Still Open';
        const failMessage = isConflict
          ? `Halted at Evidence Gate: Rule "${firstBlock.ruleName}" is ${firstBlock.status} (${firstBlock.detail}). Conflicting sources must be arbitrated by merchant before resolution can occur.`
          : `Validation Gate Failed: Rule "${firstBlock.ruleName}" is ${firstBlock.status} (${firstBlock.detail}). Missing evidence must be verified before resolution.`;

        setRescanResult({
          status: blockedStatus,
          message: failMessage,
          timestamp: 'Just now (Rep. Preview)',
          blockingRule: firstBlock.ruleName
        });

        // Record failed rescan attempt in history
        const updatedHistory: IssueHistoryEvent[] = [
          ...issue.history,
          {
            stage: 'RECHECK',
            timestamp: 'Just now',
            title: 'Rescan Halted at Evidence Gate',
            description: `Verification crawl re-evaluated: ${failingOrBlockedRules.length} validation rule(s) blocked/failed. Automatic resolution prevented by zero-hallucination mandate.`,
            state: issue.recoveryState
          }
        ];

        onUpdateIssueState(issue.id, {
          history: updatedHistory
        });
        return;
      }

      // 3. All validation rules PASS!
      // Check if external write-back is required (Class C or external source boundary)
      if (issue.recoveryClass === 'CLASS_C_EXTERNAL_WRITEBACK') {
        setRescanResult({
          status: 'Requires External Update',
          message: `Validation passed in AIXSHOP preview. However, the authoritative Source of Record is external (${integrity.sourceOwnership.sourceOfRecord}). You must perform this change directly in ${integrity.sourceOwnership.systemLocation} to achieve external synchronization.`,
          timestamp: 'Just now (Rep. Preview)'
        });

        const updatedHistory: IssueHistoryEvent[] = [
          ...issue.history,
          {
            stage: 'RECHECK',
            timestamp: 'Just now',
            title: 'Requires External Source Update',
            description: `Preview validation passed. External update required in ${integrity.sourceOwnership.systemLocation}.`,
            state: 'Validation Required'
          }
        ];

        onUpdateIssueState(issue.id, {
          recoveryState: 'Validation Required',
          isResolved: false,
          history: updatedHistory
        });
        return;
      }

      // 4. Truthful Resolution for Class A or Verified Class B
      setRescanResult({
        status: 'Resolved',
        message: 'Preview crawler confirmed: All schema, identity, and evidence rules PASS. Zero disparities detected in preview model. Issue transitioned to Resolved.',
        timestamp: 'Just now (Rep. Preview)'
      });

      const updatedHistory: IssueHistoryEvent[] = [
        ...issue.history,
        {
          stage: 'RECHECK',
          timestamp: 'Just now',
          title: 'Verification Rescan Passed',
          description: 'Crawl snapshot evaluated against canonical rules: all deterministic validation gates passed. Issue marked Resolved in AIXSHOP preview model.',
          state: 'Resolved'
        }
      ];

      // Update master state to Resolved!
      onUpdateIssueState(issue.id, {
        recoveryState: 'Resolved',
        isResolved: true,
        history: updatedHistory
      });

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
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Evidence Blocked':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Unknown':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Not Affected':
      default:
        return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  const allRulesPass = issue.recoveryWorkspace.deterministicValidationRules.every(r => r.status === 'PASS');
  const hasBlockedRules = issue.recoveryWorkspace.deterministicValidationRules.some(r => r.status === 'BLOCKED' || r.status === 'FAIL');

  return (
    <div 
      id="issue-intelligence-drawer-modal"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200"
    >
      <div 
        className="w-full max-w-4xl bg-[#FAF8F5] border-l border-stone-300 shadow-2xl flex flex-col h-full overflow-hidden text-stone-900 selection:bg-orange-500/20 selection:text-orange-900"
      >
        
        {/* ========================================================================= */}
        {/* 1. TOP HEADER & IDENTITY BAR */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-start justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
                {issue.issueNumber}
              </span>

              {/* Explicit Domain Scope: Product ≠ Offer */}
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                integrity.scope === 'PRODUCT'
                  ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {integrity.scope} SCOPE
              </span>

              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                {issue.issueType}
              </span>

              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                issue.severity === 'Critical'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : issue.severity === 'High'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                {issue.severity}
              </span>

              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                issue.recoveryState === 'Resolved'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : issue.recoveryState === 'Blocked'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : issue.recoveryState === 'Validation Required'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-stone-100 text-stone-700 border-stone-200'
              }`}>
                STATE: {issue.recoveryState.toUpperCase()}
              </span>

              <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                {issue.previewBadge}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              {issue.title}
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <span>Target:</span>
              <button
                type="button"
                onClick={() => onOpenProductReport && onOpenProductReport(issue.productId)}
                className="font-semibold text-stone-900 hover:text-[#F97316] underline cursor-pointer inline-flex items-center gap-1"
                title="View Product Report"
              >
                <span>{issue.productName}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <span className="text-stone-300">·</span>
              <span className="font-mono text-stone-600 font-medium">SKU: {issue.productSku}</span>
              {issue.productVariant && (
                <>
                  <span className="text-stone-300">·</span>
                  <span className="inline-flex items-center gap-1 text-[#F97316] font-mono text-[11px] font-semibold bg-orange-50 px-1.5 py-0.2 rounded border border-orange-200">
                    <Tag className="w-2.5 h-2.5" />
                    Variant: {issue.productVariant}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer border border-stone-200"
              title="Close Workspace"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SEQUENTIAL FLOW PIPELINE BAR */}
        {/* ========================================================================= */}
        <div className="px-5 py-2.5 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1 sm:gap-2 text-[11px] font-mono text-stone-500 overflow-x-auto py-1">
            <span className="font-bold text-stone-700 uppercase">Workflow:</span>
            <span className="px-2 py-0.5 rounded bg-white text-stone-800 border border-stone-200 font-semibold">1. Scope & Issue</span>
            <ArrowRight className="w-3 h-3 text-stone-400" />
            <span className="px-2 py-0.5 rounded bg-white text-stone-800 border border-stone-200 font-semibold">2. Evidence</span>
            <ArrowRight className="w-3 h-3 text-stone-400" />
            <span className="px-2 py-0.5 rounded bg-white text-stone-800 border border-stone-200 font-semibold">3. Explanation</span>
            <ArrowRight className="w-3 h-3 text-stone-400" />
            <span className="px-2 py-0.5 rounded bg-orange-50 text-[#F97316] border border-orange-200 font-bold">4. Fix</span>
            <ArrowRight className="w-3 h-3 text-stone-400" />
            <span className="px-2 py-0.5 rounded bg-white text-stone-800 border border-stone-200 font-semibold">5. Validate</span>
            <ArrowRight className="w-3 h-3 text-stone-400" />
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">6. Verify / Rescan</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {onNavigateWorkbench && (
              <button
                type="button"
                onClick={onNavigateWorkbench}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 transition-colors font-medium cursor-pointer text-[11px]"
              >
                Workbench
              </button>
            )}
            {onNavigateOffers && (
              <button
                type="button"
                onClick={onNavigateOffers}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 transition-colors font-medium cursor-pointer text-[11px]"
              >
                Offers
              </button>
            )}
            {onNavigateDiscovery && (
              <button
                type="button"
                onClick={onNavigateDiscovery}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 transition-colors font-medium cursor-pointer text-[11px]"
              >
                Discovery
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DRAWER BODY (SCROLLABLE DIAGNOSTIC WORKSPACE) */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* STEP 1: DOMAIN SCOPE & WHAT IS WRONG? */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Step 1 · Issue Problem & Domain Scope</span>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                integrity.scope === 'PRODUCT'
                  ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {integrity.scope} DOMAIN
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-stone-900 leading-snug">
                {integrity.problem}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {issue.whyItMatters}
              </p>
            </div>

            {/* Product ≠ Offer Architectural Callout */}
            <div className={`p-3 rounded-xl border text-xs font-mono ${
              integrity.scope === 'PRODUCT'
                ? 'bg-cyan-50/50 border-cyan-200 text-cyan-900'
                : 'bg-amber-50/50 border-amber-200 text-amber-900'
            }`}>
              <strong className="font-bold">Domain Separation Principle: </strong>
              {integrity.scope === 'PRODUCT' 
                ? 'This issue pertains to canonical Product identity, GTIN barcodes, or physical specifications. It does not alter commercial offer terms or merchant prices.' 
                : 'This issue pertains to commercial Offer terms, return policies, shipping, or merchant pricing. It does not alter immutable product biomechanical identity.'}
            </div>
          </div>

          {/* STEP 2: WHAT EVIDENCE PROVES IT? (FIRST-CLASS EVIDENCE RECORD) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                <Database className="w-4 h-4 text-cyan-600" />
                <span>Step 2 · First-Class Evidence Record</span>
              </div>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                issue.evidenceRecord.state === 'CONFLICT'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : issue.evidenceRecord.state === 'MISSING'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : issue.evidenceRecord.state === 'MERCHANT_VERIFIED'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-stone-100 text-stone-700 border-stone-200'
              }`}>
                STATE: {issue.evidenceRecord.state}
              </span>
            </div>

            {/* Evidence Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10.5px] text-stone-500 uppercase block font-semibold">Observed Value</span>
                <span className="text-stone-900 font-bold block truncate mt-1 text-sm" title={issue.evidenceRecord.value}>
                  {issue.evidenceRecord.value}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10.5px] text-stone-500 uppercase block font-semibold">Authoritative Source</span>
                <span className="text-stone-900 font-bold block truncate mt-1 text-sm" title={issue.evidenceRecord.source}>
                  {issue.evidenceRecord.source}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10.5px] text-stone-500 uppercase block font-semibold">Confidence & Detected</span>
                <span className="text-stone-900 font-bold block mt-1 text-sm">
                  {issue.evidenceRecord.confidence} Confidence · {issue.evidenceRecord.detectedAt}
                </span>
              </div>
            </div>

            {/* CONFLICT Comparison: Sources Disagree (Rule 6: Never Average Conflicting Evidence) */}
            {issue.evidenceRecord.sourceDetails && (
              <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-800">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Authoritative Source Contradiction (Non-Averaging Principle)</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Two authoritative sources provide conflicting values. AIXSHOP strictly refuses to average values or guess a compromise without an explicit rule or merchant arbitration.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-1">
                  <div className="p-3 rounded-xl bg-white border border-rose-200 shadow-2xs">
                    <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider block">SOURCE A (Authoritative Registry / GS1 / Brand)</span>
                    <div className="text-stone-900 font-bold text-sm my-1">
                      {issue.evidenceRecord.sourceDetails.sourceA?.value}
                    </div>
                    <span className="text-[10.5px] text-stone-500">
                      {issue.evidenceRecord.sourceDetails.sourceA?.name} · {issue.evidenceRecord.sourceDetails.sourceA?.detectedAt}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-rose-200 shadow-2xs">
                    <span className="text-[10px] text-rose-700 font-bold uppercase tracking-wider block">SOURCE B (Merchant Storefront / Feed)</span>
                    <div className="text-stone-900 font-bold text-sm my-1">
                      {issue.evidenceRecord.sourceDetails.sourceB?.value}
                    </div>
                    <span className="text-[10.5px] text-stone-500">
                      {issue.evidenceRecord.sourceDetails.sourceB?.name} · {issue.evidenceRecord.sourceDetails.sourceB?.detectedAt}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-stone-500 pt-2 border-t border-stone-100">
              <span>Required Grounding: <strong className="text-stone-800">{integrity.evidence.expectedCondition}</strong></span>
              <span>Valid Until: <strong className="text-stone-800">{issue.evidenceRecord.validUntil}</strong></span>
            </div>
          </div>

          {/* STEP 3: DETERMINISTIC EXPLANATION */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-cyan-600" />
              <span>Step 3 · Deterministic Explanation (Why AIXSHOP Created This Issue)</span>
            </div>
            <p className="text-sm text-stone-800 leading-relaxed font-sans">
              {integrity.reason}
            </p>
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono text-stone-600 flex items-center justify-between">
              <span>Zero-Hallucination Mandate: Missing parameters remain Unknown; never fabricated by generative AI.</span>
              <span className="font-bold text-stone-800">Deterministic Engine</span>
            </div>
          </div>

          {/* STEP 4: BUYER INTENT IMPACT (7 IMMUTABLE ARCHETYPES) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#F97316]" />
                <span>Step 4 · Downstream Buyer Intent Impact (7 Archetypes)</span>
              </div>
              <span className="text-[11px] font-mono text-stone-500">
                Deterministic Agent Assessment
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {intentArchetypes.map(archetype => {
                const impact = issue.buyerImpacts[archetype];
                if (!impact) return null;

                return (
                  <div
                    key={archetype}
                    className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-stone-900 font-mono text-xs">
                        {archetype} Intent
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getIntentBadge(impact.status)}`}>
                        {impact.status}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-stone-600 leading-normal">
                      {impact.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 5: SOURCE OF RECORD & AUTHORITY BOUNDARY */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-purple-600" />
                <span>Step 5 · Source of Record & Authority Boundary</span>
              </div>
              <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-semibold">
                Owner: {integrity.sourceOwnership.ownerType}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10.5px] text-stone-500 uppercase block font-semibold">Authoritative Source of Record</span>
                <span className="text-stone-900 font-bold block text-sm">
                  {integrity.sourceOwnership.sourceOfRecord}
                </span>
                <span className="text-[11px] text-purple-700 block">
                  Field: {integrity.sourceOwnership.dataFieldToChange}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-[10.5px] text-stone-500 uppercase block font-semibold">System Location to Update</span>
                <span className="text-stone-900 font-bold block text-sm">
                  {integrity.sourceOwnership.systemLocation}
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Target: {integrity.nextAction.actionLabel}
                </span>
              </div>
            </div>

            {/* AIXSHOP vs Merchant Responsibility Boundaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-cyan-50/50 border border-cyan-200 space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-cyan-900 uppercase flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-cyan-600" />
                  What AIXSHOP Can Do:
                </span>
                <ul className="space-y-1 text-stone-700 text-[11.5px] list-disc list-inside">
                  {integrity.boundary.aixshopCan.map((item, idx) => (
                    <li key={idx} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-200 space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-purple-900 uppercase flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                  What Merchant Must Do:
                </span>
                <ul className="space-y-1 text-stone-700 text-[11.5px] list-disc list-inside">
                  {integrity.boundary.merchantMust.map((item, idx) => (
                    <li key={idx} className="leading-snug">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Explicit Non-Writeback Guarantee (Rule 7 & 8) */}
            <div className="p-3 rounded-xl bg-stone-100 border border-stone-300 flex items-start gap-2.5 text-xs text-stone-700">
              <Ban className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-stone-900 block text-[11px] uppercase">
                  Immutable AIXSHOP Truth & Write-Back Boundary:
                </span>
                <p className="text-stone-600 text-xs mt-0.5 leading-normal">
                  {integrity.boundary.cannotClaim} AIXSHOP validates and stages verified data within its intelligence preview model; it does not pretend that external production checkout platforms or external feeds were modified.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 6: FIX PREVIEW & BEFORE/AFTER DIFF (PROPOSED vs PUBLISHED) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-[#F97316]" />
                <span>Step 6 · Fix Preview & Visual Attribute Diff</span>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                issue.recoveryWorkspace.diff.validationResult === 'PASS'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                Validation Gate: {issue.recoveryWorkspace.diff.validationResult}
              </span>
            </div>

            <div className="text-xs text-stone-600">
              <strong className="font-bold text-stone-900">Transformation Goal: </strong>
              {issue.recoveryWorkspace.proposedRecoveryAction}
            </div>

            {/* Before / After Diff (Rule 9: Distinct PROPOSED vs PUBLISHED) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              {/* CURRENT */}
              <div className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-rose-800 uppercase">CURRENT ({issue.recoveryWorkspace.diff.field})</span>
                  <span className="font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                    {issue.recoveryWorkspace.diff.currentEvidenceState}
                  </span>
                </div>
                <pre className="text-rose-900 font-mono text-xs whitespace-pre-wrap break-all p-2 bg-white rounded-lg border border-rose-200">
                  {issue.recoveryWorkspace.diff.currentValue}
                </pre>
                <span className="text-[10.5px] text-stone-500 block">
                  Observed in live storefront crawl snapshot.
                </span>
              </div>

              {/* PROPOSED (STAGED IN PREVIEW) */}
              <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-emerald-800 uppercase">PROPOSED (Staged in Preview)</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {issue.recoveryWorkspace.diff.proposedEvidenceState}
                  </span>
                </div>
                <pre className="text-emerald-900 font-mono text-xs whitespace-pre-wrap break-all p-2 bg-white rounded-lg border border-emerald-200">
                  {issue.recoveryWorkspace.diff.proposedValue}
                </pre>
                <div className="flex items-center justify-between text-[10.5px] text-stone-500">
                  <span className="text-emerald-700 font-bold">Staged in AIXSHOP Model</span>
                  <span className="text-stone-400">NOT PUBLISHED to External System</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-600">
              <strong className="text-stone-900 font-bold">Validation Gate Reason: </strong>
              {issue.recoveryWorkspace.diff.validationReason}
            </div>
          </div>

          {/* STEP 7: LIVE DETERMINISTIC VALIDATION ENGINE PRE-CHECK */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Step 7 · Deterministic Validation Pre-Check Rules</span>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                allRulesPass 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {allRulesPass ? 'ALL RULES PASS' : 'VALIDATION GATES BLOCKED'}
              </span>
            </div>

            <p className="text-xs text-stone-600">
              Every fix candidate is evaluated against strict deterministic validation rules. Resolution is prohibited if any gate is BLOCKED or FAILS.
            </p>

            <div className="space-y-2 font-mono text-xs">
              {issue.recoveryWorkspace.deterministicValidationRules.map(rule => (
                <div
                  key={rule.id}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-stone-600 border border-stone-200 font-bold uppercase">
                      {rule.category}
                    </span>
                    <span className="text-stone-900 font-bold text-xs">
                      {rule.ruleName}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-stone-600 max-w-sm">
                      {rule.detail}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                      rule.status === 'PASS'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : rule.status === 'BLOCKED'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {rule.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 8: FIX / VERIFICATION ACTION WORKSPACE */}
          <div className="bg-white border-2 border-[#F97316]/30 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F97316] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#F97316]" />
                <span>Step 8 · Fix & Verification Action Workspace</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-50 text-[#F97316] border border-orange-200">
                {issue.recoveryWorkspace.recoveryClassLabel}
              </span>
            </div>

            {/* CASE A: CLASS B / EVIDENCE-GATED & MERCHANT REQUIRED */}
            {(issue.recoveryEligibility === 'Merchant Required' || issue.recoveryEligibility === 'Evidence-Gated') && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-stone-900">
                    Controlled Merchant Verification Arbitration
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Confirm authoritative ground truth to upgrade this parameter from <code className="text-rose-700 font-mono font-bold">CONFLICT</code> / <code className="text-amber-700 font-mono font-bold">MISSING</code> to <code className="text-emerald-700 font-mono font-bold">MERCHANT_VERIFIED</code> in the preview model.
                  </p>
                </div>

                {/* Source Selection or Arbitration */}
                {issue.evidenceRecord.sourceDetails ? (
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-stone-700 uppercase block">
                      Select Authoritative Source Candidate:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <button
                        type="button"
                        onClick={() => handleConfirmVerification('sourceA')}
                        disabled={isVerifying}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer group ${
                          selectedVerificationChoice === 'sourceA'
                            ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-400'
                            : 'bg-stone-50 border-stone-200 hover:border-purple-300'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-purple-700 uppercase font-bold block mb-1">
                          Candidate 1: {issue.evidenceRecord.sourceDetails.sourceA?.name}
                        </span>
                        <span className="font-mono font-bold text-stone-900 text-sm block truncate">
                          {issue.evidenceRecord.sourceDetails.sourceA?.value}
                        </span>
                        <span className="text-[11px] text-stone-500 mt-1 block">
                          Attest Source A as verified ground truth
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleConfirmVerification('sourceB')}
                        disabled={isVerifying}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer group ${
                          selectedVerificationChoice === 'sourceB'
                            ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-400'
                            : 'bg-stone-50 border-stone-200 hover:border-purple-300'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-purple-700 uppercase font-bold block mb-1">
                          Candidate 2: {issue.evidenceRecord.sourceDetails.sourceB?.name}
                        </span>
                        <span className="font-mono font-bold text-stone-900 text-sm block truncate">
                          {issue.evidenceRecord.sourceDetails.sourceB?.value}
                        </span>
                        <span className="text-[11px] text-stone-500 mt-1 block">
                          Attest Source B as verified ground truth
                        </span>
                      </button>
                    </div>

                    {/* Custom input & Unresolved option */}
                    <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={customVerifiedInput}
                        onChange={e => setCustomVerifiedInput(e.target.value)}
                        placeholder="Or input custom verified physical box/spec value..."
                        className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder-stone-400 font-mono focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleConfirmVerification('custom')}
                        disabled={isVerifying || !customVerifiedInput.trim()}
                        className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-medium text-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                      >
                        Attest Custom Value
                      </button>
                      <button
                        type="button"
                        onClick={() => handleConfirmVerification('unresolved')}
                        disabled={isVerifying}
                        className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 font-medium text-xs transition-colors cursor-pointer shrink-0"
                        title="Leave in Conflict without picking a side"
                      >
                        Leave in Conflict
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Missing Evidence Verification (e.g. Return Policy) */
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-stone-700 uppercase block">
                      Attest Authoritative Policy / Missing Parameter:
                    </span>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={customVerifiedInput}
                        onChange={e => setCustomVerifiedInput(e.target.value)}
                        placeholder="e.g., 30-Day Return Window, Free Returns, Return by Mail..."
                        className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder-stone-400 font-mono focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleConfirmVerification('custom')}
                        disabled={isVerifying}
                        className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-medium text-xs transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                      >
                        {isVerifying ? 'Recording...' : 'Verify Policy in AIXSHOP'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs font-mono text-purple-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-purple-700" />
                    <span>Integrity Guardrail (Action Boundary):</span>
                  </div>
                  <p className="text-[11.5px] leading-normal text-purple-800">
                    Merchant verification updates AIXSHOP's internal evidence state to <code className="font-bold">MERCHANT_VERIFIED</code> in the preview model. It does not automatically update your Shopify theme or publish external contract changes.
                  </p>
                </div>
              </div>
            )}

            {/* CASE B: CLASS A / DETERMINISTIC REMEDIATION */}
            {issue.recoveryClass === 'CLASS_A_DETERMINISTIC' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-stone-900">
                    Deterministic Schema Transformation
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    AIXSHOP has derived the canonical Schema.org representation based on deterministic parsing rules. Click below to stage this transformation into the local preview cache.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleApplyDeterministicFix}
                    disabled={isStagingFix || issue.recoveryState === 'Resolved'}
                    className="px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs disabled:opacity-50 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isStagingFix ? 'Staging Remediation...' : 'Stage Deterministic Remediation in Preview'}</span>
                  </button>

                  <span className="text-xs font-mono text-stone-500">
                    Applies proposed normalization to preview model
                  </span>
                </div>
              </div>
            )}

            {/* CASE C: CLASS C / EXTERNAL WRITEBACK */}
            {issue.recoveryClass === 'CLASS_C_EXTERNAL_WRITEBACK' && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-mono font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>External Source Writeback Required</span>
                </div>
                <p className="text-stone-700 leading-relaxed">
                  This issue requires changes directly inside <strong className="font-bold">{integrity.sourceOwnership.sourceOfRecord}</strong>. AIXSHOP does not possess automated write permissions to alter this external data source.
                </p>
              </div>
            )}

            {/* Action Feedback Banner */}
            {verificationFeedback && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold block">Action Recorded Successfully</span>
                  <p className="text-[11.5px] text-emerald-900 leading-normal">{verificationFeedback}</p>
                </div>
              </div>
            )}
          </div>

          {/* STEP 9: VERIFY / RESCAN ENGINE */}
          <div className="bg-white border-2 border-emerald-500/40 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                <RefreshCw className="w-4 h-4 text-emerald-600" />
                <span>Step 9 · Verification / Rescan Engine</span>
              </div>
              <span className="text-[11px] font-mono text-stone-500">
                Authoritative Evaluation Gate
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-stone-900">
                  Re-evaluate State Against Catalog Crawl
                </h4>
                <p className="text-xs text-stone-600">
                  Execute crawl simulation to verify whether current evidence and validation rules permit transitioning to <code className="font-bold text-emerald-700">RESOLVED</code>.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePreviewRescan}
                disabled={isRescanning}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${isRescanning ? 'animate-spin' : ''}`} />
                <span>{isRescanning ? 'Evaluating Crawl...' : 'Preview Rescan'}</span>
              </button>
            </div>

            {/* Rescan Result Display */}
            {rescanResult && (
              <div className={`p-4 rounded-xl border text-xs font-mono space-y-1.5 ${
                rescanResult.status === 'Resolved'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : rescanResult.status === 'Blocked'
                  ? 'bg-rose-50 border-rose-300 text-rose-900'
                  : rescanResult.status === 'Requires External Update'
                  ? 'bg-purple-50 border-purple-300 text-purple-900'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {rescanResult.status === 'Resolved' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {rescanResult.status === 'Blocked' && <Ban className="w-4 h-4 text-rose-600" />}
                    {rescanResult.status === 'Still Open' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    {rescanResult.status === 'Requires External Update' && <Info className="w-4 h-4 text-purple-600" />}
                    <span>Evaluation Result: {rescanResult.status.toUpperCase()}</span>
                  </div>
                  <span className="text-[10px] text-stone-500">{rescanResult.timestamp}</span>
                </div>
                <p className="text-xs leading-relaxed font-sans">{rescanResult.message}</p>
                {rescanResult.status === 'Resolved' && (
                  <div className="pt-2 border-t border-emerald-200 text-[11px] text-emerald-800 font-semibold">
                    ✓ Issue state updated to Resolved in AIXSHOP telemetry. Open issues counter decremented.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* STEP 10: IMMUTABLE RECOVERY AUDIT HISTORY */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                <History className="w-4 h-4 text-stone-500" />
                <span>Step 10 · Immutable Recovery Audit History</span>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                {issue.history.length} audit stages recorded
              </span>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {issue.history.map((evt, idx) => (
                <div key={idx} className="relative group">
                  <div className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full border-2 ${
                    evt.state === 'Resolved'
                      ? 'bg-emerald-600 border-white'
                      : evt.state === 'Blocked'
                      ? 'bg-rose-600 border-white'
                      : evt.state === 'Validation Required'
                      ? 'bg-amber-600 border-white'
                      : 'bg-stone-700 border-white'
                  }`} />
                  <div className="text-xs font-mono font-bold text-stone-900 flex items-center gap-2">
                    <span className="px-1.5 py-0.2 rounded bg-stone-100 text-stone-700 border border-stone-200 text-[10px]">
                      {evt.stage}
                    </span>
                    <span>{evt.title}</span>
                    <span className="text-stone-400 text-[10px] ml-auto font-normal">{evt.timestamp}</span>
                  </div>
                  <p className="text-[11.5px] text-stone-600 mt-1 leading-normal font-sans">
                    {evt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM FOOTER */}
        {/* ========================================================================= */}
        <div className="p-4 border-t border-stone-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
          <div className="text-stone-500 text-[11px] font-mono">
            <span>Issue ID: </span>
            <span className="text-stone-900 font-bold">{issue.id}</span>
            <span className="mx-2 text-stone-300">·</span>
            <span>Target: </span>
            <span className="text-stone-700">{issue.productSku}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors cursor-pointer border border-stone-200"
            >
              Close Workspace
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
