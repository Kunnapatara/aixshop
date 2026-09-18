// src/components/issues/IssuesExportModal.tsx
// Export preview modal for JSON and CSV exports of issues report on Page 10

import React, { useState } from 'react';
import { X, Download, Copy, Check, FileJson, FileSpreadsheet } from 'lucide-react';
import { IssueItem } from '../../types/issues';

interface IssuesExportModalProps {
  issues: IssueItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const IssuesExportModal: React.FC<IssuesExportModalProps> = ({
  issues,
  isOpen,
  onClose
}) => {
  const [exportFormat, setExportFormat] = useState<'JSON' | 'CSV'>('JSON');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Build structured export records based on prompt section 21:
  // issue_id, product_id, product_name, issue_type, severity, evidence_state, buyer_impact, recovery_class, recovery_state, detected_at, source, diagnostic_reason, verification_state
  const exportRecords = issues.map(issue => ({
    issue_id: issue.id,
    issue_number: issue.issueNumber,
    product_id: issue.productId,
    product_name: issue.productName,
    product_sku: issue.productSku,
    issue_type: issue.issueType,
    severity: issue.severity,
    evidence_state: issue.evidenceState,
    buyer_impact: (Object.entries(issue.buyerImpacts) as [string, { status: string }][])
      .filter(([_, val]) => val.status === 'Affected')
      .map(([key]) => key)
      .join('; ') || 'None Direct',
    recovery_class: issue.recoveryClass,
    recovery_state: issue.recoveryState,
    detected_at: issue.detectedAt,
    source: issue.evidenceRecord.source,
    diagnostic_reason: issue.diagnosticReason,
    verification_state: issue.recoveryWorkspace.verificationStatus
  }));

  const jsonContent = JSON.stringify(exportRecords, null, 2);

  // Generate CSV
  const csvHeaders = [
    'issue_id',
    'issue_number',
    'product_id',
    'product_name',
    'product_sku',
    'issue_type',
    'severity',
    'evidence_state',
    'buyer_impact',
    'recovery_class',
    'recovery_state',
    'detected_at',
    'source',
    'diagnostic_reason',
    'verification_state'
  ];

  const csvRows = exportRecords.map(rec => [
    `"${rec.issue_id}"`,
    `"${rec.issue_number}"`,
    `"${rec.product_id}"`,
    `"${rec.product_name}"`,
    `"${rec.product_sku}"`,
    `"${rec.issue_type}"`,
    `"${rec.severity}"`,
    `"${rec.evidence_state}"`,
    `"${rec.buyer_impact}"`,
    `"${rec.recovery_class}"`,
    `"${rec.recovery_state}"`,
    `"${rec.detected_at}"`,
    `"${rec.source.replace(/"/g, '""')}"`,
    `"${rec.diagnostic_reason.replace(/"/g, '""')}"`,
    `"${rec.verification_state}"`
  ].join(','));

  const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');

  const activeContent = exportFormat === 'JSON' ? jsonContent : csvContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], {
      type: exportFormat === 'JSON' ? 'application/json' : 'text/csv'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aixshop-issues-report-${exportFormat.toLowerCase()}-${Date.now()}.${exportFormat.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#090E1A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0C1222] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Issue Report Export Preview
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Export Preview
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Structured snapshot of {issues.length} issues matching current filter parameters.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selectors and Actions */}
        <div className="p-3 px-5 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[11px]">Format:</span>
            <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setExportFormat('JSON')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                  exportFormat === 'JSON'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>
              <button
                type="button"
                onClick={() => setExportFormat('CSV')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                  exportFormat === 'CSV'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-mono transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy to Clipboard'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="p-4 flex-1 overflow-auto bg-slate-950 font-mono text-[11px] text-slate-300">
          <pre className="whitespace-pre overflow-x-auto leading-relaxed">
            {activeContent}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-3 px-5 border-t border-slate-800 bg-[#0C1222] flex items-center justify-between text-xs text-slate-500">
          <span>Client-side Preview Model · No external server persistence</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
