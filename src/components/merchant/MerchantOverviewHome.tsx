import React from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Eye, 
  Search, 
  ShieldCheck, 
  ShoppingBag,
  Layers,
  Clock,
  ChevronRight,
  Info
} from 'lucide-react';
import { sampleCatalogDimensions, sampleHealthDistribution, sampleRecentEvents } from '../../data/sampleDashboardData';
import { CANONICAL_SYSTEM_KPIS, CANONICAL_TELEMETRY_FUNNEL } from '../../data/canonicalCatalog';
import { sampleIssuesMetrics } from '../../data/sampleIssuesData';

interface MerchantOverviewHomeProps {
  onNavigateIssues: () => void;
  onNavigateProducts: () => void;
  onNavigateOffers: () => void;
  onNavigateDiscovery: () => void;
  onNavigateMonitoring: () => void;
  onNavigateReport: () => void;
}

export const MerchantOverviewHome: React.FC<MerchantOverviewHomeProps> = ({
  onNavigateIssues,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateDiscovery,
  onNavigateMonitoring,
  onNavigateReport
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Top Section Greeting & Intro (Exact Prompt Specification) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200/80 tracking-wide">
                CATALOG INTELLIGENCE DASHBOARD
              </span>
              <span className="text-xs text-stone-400 font-mono">AeroPulse Pro Account</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Good morning, AeroPulse
            </h1>
            
            <p className="text-xs sm:text-sm text-stone-500 font-normal">
              Your catalog intelligence at a glance. Continuous multi-channel corroboration and discovery governance.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={onNavigateReport}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200/70 text-stone-800 text-xs font-semibold transition-colors cursor-pointer border border-stone-200"
            >
              <Eye className="w-3.5 h-3.5 text-stone-600" />
              <span>Inspect Hero Product</span>
            </button>
            <button
              type="button"
              onClick={onNavigateIssues}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <span>Review {sampleIssuesMetrics.openIssues} Issues</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Structured KPI Hierarchy (Primary vs Secondary per Prompt) */}
      <div className="space-y-4">
        
        {/* PRIMARY KPIS (Large emphasis: Coverage & Discovery) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Primary 1: Intelligence Coverage */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">
                  Core Metric · Primary
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">Intelligence Coverage</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Proportion of catalog attributes corroborated across brand & retail feeds
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                +4.2% this week
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">{CANONICAL_SYSTEM_KPIS.intelligenceCoveragePct}%</span>
                <span className="text-xs text-stone-500 font-medium">Goal: 85% Target</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                <div className="bg-[#F97316] h-full rounded-full transition-all" style={{ width: `${CANONICAL_SYSTEM_KPIS.intelligenceCoveragePct}%` }}></div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>{CANONICAL_TELEMETRY_FUNNEL.provenanceEvidenceRecords} Attested Evidence Records</span>
              <button 
                onClick={onNavigateProducts}
                className="text-orange-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Products</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Primary 2: Discovery Readiness */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">
                  Core Metric · Primary
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">Discovery Readiness</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Deterministic synthesis score across Google, AI engines, and marketplace feeds
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Healthy Standard
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">{CANONICAL_SYSTEM_KPIS.discoveryReadinessPct}%</span>
                <span className="text-xs text-stone-500 font-medium">{CANONICAL_SYSTEM_KPIS.discoverySurfacesCount} Discovery Surfaces</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${CANONICAL_SYSTEM_KPIS.discoveryReadinessPct}%` }}></div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>AI Answer Engines at 68% (Gated)</span>
              <button 
                onClick={onNavigateDiscovery}
                className="text-orange-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect Surfaces</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* SECONDARY KPIS (Compact Row: Products, Issues, Offers) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Secondary 1: Monitored Products */}
          <div 
            onClick={onNavigateProducts}
            className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div>
              <span className="text-xs text-stone-500 font-medium block">Monitored Catalog</span>
              <span className="text-2xl font-extrabold text-stone-900 mt-0.5 block group-hover:text-orange-600 transition-colors">
                {CANONICAL_SYSTEM_KPIS.totalCatalogProducts} Products
              </span>
              <span className="text-[11px] text-stone-400 mt-0.5 block font-mono">1,976 Pro Headroom</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-orange-50 group-hover:text-orange-600 flex items-center justify-center text-stone-600 transition-colors">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          {/* Secondary 2: Open Issues */}
          <div 
            onClick={onNavigateIssues}
            className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:border-rose-300 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div>
              <span className="text-xs text-stone-500 font-medium block">Action Needed</span>
              <span className="text-2xl font-extrabold text-rose-600 mt-0.5 block">
                {sampleIssuesMetrics.openIssues} Open Issues
              </span>
              <span className="text-[11px] text-rose-700 mt-0.5 block font-medium">
                {sampleIssuesMetrics.criticalIssues} Critical · {sampleIssuesMetrics.evidenceBlocked} Evidence-Blocked
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          {/* Secondary 3: Observed Offers */}
          <div 
            onClick={onNavigateOffers}
            className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:border-orange-300 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div>
              <span className="text-xs text-stone-500 font-medium block">Commercial Reach</span>
              <span className="text-2xl font-extrabold text-stone-900 mt-0.5 block group-hover:text-orange-600 transition-colors">
                {CANONICAL_SYSTEM_KPIS.totalCommercialOffers} Offers
              </span>
              <span className="text-[11px] text-stone-400 mt-0.5 block font-mono">18 Distinct Sellers</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-orange-50 group-hover:text-orange-600 flex items-center justify-center text-stone-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

        </div>

      </div>

      {/* 3. "WHAT NEEDS ATTENTION?" ACTION HERO BLOCK (Exact Prompt Specification) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight">
                What needs attention?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 font-normal">
              <strong>8 products need attention:</strong> 6 evidence conflicts, 4 missing attributes, and 3 discovery blockers require merchant signoff.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateIssues}
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-xs hover:shadow transition-all cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>Review Issues</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* The 3 Core Question Answers: 1. What is happening? 2. What is wrong? 3. What should I do next? */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          
          {/* Card 1: What is happening? */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-700">1</span>
              <span>What is happening?</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Continuous monitoring ingested {CANONICAL_TELEMETRY_FUNNEL.rawObservations} raw signals. {CANONICAL_SYSTEM_KPIS.totalCommercialOffers} external retail offers are active with 5 price updates observed in the last 24 hours.
            </p>
          </div>

          {/* Card 2: What is wrong? */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center text-xs font-bold text-rose-800">2</span>
              <span>What is wrong?</span>
            </div>
            <p className="text-xs text-rose-950/80 leading-relaxed font-normal">
              Retailers are presenting contradictory upper material claims (Engineered Mesh vs Synthetic Knit), causing AI answer engines to drop citation confidence.
            </p>
          </div>

          {/* Card 3: What should I do next? */}
          <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2">
            <div className="flex items-center gap-2 text-orange-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center text-xs font-bold text-orange-800">3</span>
              <span>What should I do next?</span>
            </div>
            <p className="text-xs text-orange-950/80 leading-relaxed font-normal">
              Open the Issues workspace to lock authoritative manufacturer specifications. Resolving {sampleIssuesMetrics.criticalIssues} critical issues unblocks AI engine discovery.
            </p>
          </div>

        </div>
      </div>

      {/* 4. Catalog Intelligence Dimensions & Product Health (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 6 Dimensions of Catalog Intelligence */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">Catalog Intelligence Dimensions</h3>
              <p className="text-xs text-stone-500">6 structural facets of modern e-commerce readiness</p>
            </div>
            <span className="text-xs text-stone-400 font-mono">24 Products</span>
          </div>

          <div className="space-y-4">
            {sampleCatalogDimensions.map((dim) => (
              <div key={dim.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">{dim.dimensionName}</span>
                  <span className="font-mono font-bold text-stone-800">{dim.coveragePercentage}%</span>
                </div>
                <div className="w-full bg-stone-200/70 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#F97316] h-full rounded-full" 
                    style={{ width: `${dim.coveragePercentage}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-stone-500 leading-normal">{dim.keyObservation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Health Distribution & Recent Timeline */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Product Health Distribution Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900">Health Distribution</h3>
            <p className="text-xs text-stone-500">Catalog categorization by corroboration quality</p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">High Readiness</span>
                  <span className="text-[11px] text-emerald-700">Multi-source corroborated</span>
                </div>
                <span className="text-xl font-extrabold text-emerald-900">14 SKUs</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-900 block">Needs Attention</span>
                  <span className="text-[11px] text-amber-700">Missing return schema or drop specs</span>
                </div>
                <span className="text-xl font-extrabold text-amber-900">7 SKUs</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-rose-900 block">Critical Conflict</span>
                  <span className="text-[11px] text-rose-700">Direct opposing claims</span>
                </div>
                <span className="text-xl font-extrabold text-rose-900">3 SKUs</span>
              </div>
            </div>
          </div>

          {/* Recent Live Events */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900">Live Ingestion Feed</h3>
              <button 
                onClick={onNavigateMonitoring}
                className="text-xs text-orange-600 font-semibold hover:underline cursor-pointer"
              >
                Monitoring →
              </button>
            </div>

            <div className="space-y-3">
              {sampleRecentEvents.slice(0, 3).map((evt) => (
                <div key={evt.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs space-y-1">
                  <div className="flex items-center justify-between text-stone-400 font-mono text-[10px]">
                    <span>{evt.time}</span>
                    <span className="text-stone-500">{evt.target}</span>
                  </div>
                  <p className="font-semibold text-stone-900">{evt.title}</p>
                  <p className="text-stone-500 text-[11px] line-clamp-1">{evt.detail}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
