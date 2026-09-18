import React, { useState } from 'react';
import { 
  ArrowRight, 
  Workflow, 
  Lock, 
  Eye, 
  Shuffle, 
  Fingerprint, 
  ShieldCheck, 
  BrainCircuit, 
  Activity, 
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface PipelineStage {
  id: string;
  stepNumber: string;
  name: string;
  shortDesc: string;
  icon: React.FC<{ className?: string }>;
  inputExample: string;
  outputExample: string;
  concreteExplanation: string;
  provenanceState: string;
  connectedPage: string;
}

const pipelineStages: PipelineStage[] = [
  {
    id: 'source',
    stepNumber: '01',
    name: 'SOURCE',
    shortDesc: 'Origin of raw merchant & catalog data',
    icon: Workflow,
    inputExample: 'Shopify Product / Google Shopping XML / Brand Lab Spec',
    outputExample: 'Raw JSON / XML / HTML payloads',
    concreteExplanation: 'Merchant-owned platforms, official product feeds, and direct engineering spec sheets serve as original product data origins.',
    provenanceState: 'Source declared',
    connectedPage: 'Page 12 (Integrations)'
  },
  {
    id: 'authorized_access',
    stepNumber: '02',
    name: 'AUTHORIZED ACCESS',
    shortDesc: 'OAuth, API tokens, or permitted public extraction',
    icon: Lock,
    inputExample: 'GraphQL OAuth scope: read_products, read_inventory',
    outputExample: 'Authenticated HTTPS session with zero customer PII',
    concreteExplanation: 'Access is explicitly authorized via least-privilege permissions. Customer names, orders, and payment records are strictly excluded.',
    provenanceState: 'Access authenticated',
    connectedPage: 'Page 12 (Integrations)'
  },
  {
    id: 'observation',
    stepNumber: '03',
    name: 'OBSERVATION',
    shortDesc: 'Raw attribute ingest with cryptographic timestamp',
    icon: Eye,
    inputExample: '<g:gtin>00849201948172</g:gtin>, "weight": "204g"',
    outputExample: 'Raw Observation Object + SHA-256 Digest + 2026-09-14 08:42 UTC',
    concreteExplanation: 'Observations are frozen as immutable snapshots with source URL, timestamp, and payload hash. Never overwritten silently.',
    provenanceState: 'OBSERVED (Raw)',
    connectedPage: 'Page 02 & Page 12'
  },
  {
    id: 'normalization',
    stepNumber: '04',
    name: 'NORMALIZATION',
    shortDesc: 'Standardizing units, currencies, and taxonomy',
    icon: Shuffle,
    inputExample: '"7.2 oz" → 204 grams; "$240.00 USD" → numeric float',
    outputExample: 'Canonical Schema: mass=204g, currency=USD, price=240.00',
    concreteExplanation: 'Converts fragmented retailer schemas, imperial/metric variations, and currency symbols into standardized Schema.org and GS1 types.',
    provenanceState: 'Normalized schema',
    connectedPage: 'Page 03 (Intelligence Report)'
  },
  {
    id: 'identity_resolution',
    stepNumber: '05',
    name: 'IDENTITY RESOLUTION',
    shortDesc: 'GTIN / MPN anchor and variant separation',
    icon: Fingerprint,
    inputExample: 'Barcode: 00849201948172 + MPN: AP-VSE-BLK-10',
    outputExample: 'Canonical ID: AIX-PROD-8942-ROAD (VaporStride Carbon Elite)',
    concreteExplanation: 'Separates physical canonical products from transient multi-seller offers. Binds variant color and size trees to universal GS1 barcodes.',
    provenanceState: 'Identity Resolved',
    connectedPage: 'Page 06 (Products Workbench)'
  },
  {
    id: 'evidence',
    stepNumber: '06',
    name: 'EVIDENCE',
    shortDesc: 'Source attribution & conflict evaluation',
    icon: ShieldCheck,
    inputExample: 'Lab spec (204g) vs Retailer listing (235g)',
    outputExample: 'Weight → CONFLICT; Midsole → MERCHANT_VERIFIED; Drop → OBSERVED',
    concreteExplanation: 'Connecting a source does not make every value "true". Multi-source contradictions are elevated to CONFLICT rather than averaged or guessed.',
    provenanceState: 'Evidence Classified',
    connectedPage: 'Page 03 & Page 11'
  },
  {
    id: 'product_intelligence',
    stepNumber: '07',
    name: 'PRODUCT INTELLIGENCE',
    shortDesc: 'Canonical product model & buyer intent synthesis',
    icon: BrainCircuit,
    inputExample: 'Verified specs + Multi-seller pricing ($179.99 – $240.00)',
    outputExample: 'Complete AI-ready product graph with intent diagnostics',
    concreteExplanation: 'Synthesizes authoritative specifications, offer matrix, and buyer intent answers into a queryable semantic model for search and AI discovery.',
    provenanceState: 'Canonical Graph Active',
    connectedPage: 'Page 03, 07, 11'
  },
  {
    id: 'monitoring',
    stepNumber: '08',
    name: 'MONITORING',
    shortDesc: 'Continuous ground-truth drift & schema sentinel',
    icon: Activity,
    inputExample: 'Third-party retailer discounts price to $179.99 or changes weight',
    outputExample: 'Monitoring Event #EVT-4819: Drift detected (-$20.01)',
    concreteExplanation: 'Continuous sentinels watch connected sources and public endpoints for price changes, out-of-stock events, or schema regressions.',
    provenanceState: 'Sentinel Continuous',
    connectedPage: 'Page 09 (Monitoring)'
  },
  {
    id: 'recovery',
    stepNumber: '09',
    name: 'ISSUE & RECOVERY',
    shortDesc: 'Automated triage, verification, and schema remediation',
    icon: AlertCircle,
    inputExample: 'Monitoring Event creates Issue #ISSUE-8942',
    outputExample: 'Diagnosis: Weight Conflict → Recovery: Merchant Verification Required',
    concreteExplanation: 'When source schema shifts or evidence conflicts arise, AIXSHOP routes the finding to the Page 10 recovery workspace for operator arbitration.',
    provenanceState: 'Issue Arbitrated',
    connectedPage: 'Page 10 (Issues & Recovery)'
  }
];

export const DataFlowPipelineSection: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('evidence');
  const activeStage = pipelineStages.find(s => s.id === selectedStageId) || pipelineStages[5];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-3xl bg-white border border-stone-200/80 p-6 shadow-xs">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono text-[#F97316] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 shadow-3xs">
                Architectural Data Pipeline
              </span>
              <span className="text-xs text-stone-400 font-mono">
                From Integration to Recovery
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 font-sans">
              How Source Data Becomes Product Intelligence
            </h2>
            <p className="text-xs text-stone-500 mt-1 max-w-2xl leading-relaxed">
              AIXSHOP does not guess or overwrite merchant sources. Data flows through a deterministic 9-stage 
              pipeline preserving cryptographic provenance at every step. Click any stage to inspect the live transformation.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-600 bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200 shadow-3xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Representative Example: VaporStride Carbon Elite</span>
          </div>
        </div>

        {/* 9-Stage Stepper Bar */}
        <div className="py-6 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[860px] gap-2">
            {pipelineStages.map((stage, idx) => {
              const isSelected = stage.id === selectedStageId;
              const Icon = stage.icon;

              return (
                <React.Fragment key={stage.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`flex-1 flex flex-col items-center text-center p-2.5 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-50/80 border-2 border-[#F97316] text-stone-900 shadow-xs scale-105'
                        : 'bg-stone-50 border border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-100/70 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-1 text-[10px] font-mono">
                      <span className={isSelected ? 'text-[#F97316] font-bold' : 'text-stone-400'}>
                        {stage.stepNumber}
                      </span>
                    </div>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 shadow-3xs ${
                      isSelected ? 'bg-[#F97316] text-white' : 'bg-stone-200 text-stone-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold tracking-tight uppercase truncate max-w-[90px]">
                      {stage.name}
                    </span>
                  </button>

                  {idx < pipelineStages.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Active Stage Deep Inspection Card */}
        <div className="mt-4 rounded-2xl bg-stone-50/80 border border-stone-200 p-5">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            {/* Left: Stage Description & Logic */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-orange-50 text-orange-800 border border-orange-200">
                  STAGE {activeStage.stepNumber}
                </span>
                <h3 className="text-base font-bold text-stone-900">
                  {activeStage.name}: {activeStage.shortDesc}
                </h3>
              </div>
              
              <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
                {activeStage.concreteExplanation}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-600 shadow-3xs">
                  <span className="text-stone-400">Provenance State:</span>
                  <span className="text-[#F97316] font-bold">{activeStage.provenanceState}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-600 shadow-3xs">
                  <span className="text-stone-400">Operating Surface:</span>
                  <span className="text-stone-800 font-semibold">{activeStage.connectedPage}</span>
                </div>
              </div>
            </div>

            {/* Right: Concrete Example Transformation Box */}
            <div className="lg:w-96 rounded-2xl bg-white border border-stone-200 p-4 space-y-3 font-mono text-xs shrink-0 shadow-xs">
              <div className="text-[10px] uppercase text-stone-400 font-bold tracking-wider">
                VaporStride Example Transformation
              </div>
              
              <div>
                <div className="text-[10px] text-stone-400 uppercase font-semibold mb-1">Input</div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 text-[11px] break-all leading-relaxed">
                  {activeStage.inputExample}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-[#F97316] uppercase font-semibold mb-1">Resulting Output</div>
                <div className="p-2.5 rounded-xl bg-orange-50/60 border border-orange-200 text-stone-900 font-semibold text-[11px] break-all leading-relaxed">
                  {activeStage.outputExample}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
