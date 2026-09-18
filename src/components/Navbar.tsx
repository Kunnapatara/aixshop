import React from 'react';
import { Layers, ArrowRight, Server } from 'lucide-react';

interface NavbarProps {
  onAnalyzeClick: () => void;
  activeView?: 'landing' | 'analysis' | 'report' | 'dashboard' | 'workbench' | 'offers' | 'monitoring' | 'issues' | 'shopper' | 'integrations' | 'analytics' | 'billing' | 'admin';
  onNavigateHome?: () => void;
  onNavigateAnalysis?: () => void;
  onNavigateReport?: () => void;
  onNavigateDashboard?: () => void;
  onNavigateWorkbench?: () => void;
  onNavigateOffers?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateIssues?: () => void;
  onNavigateShopper?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
  onNavigateBilling?: () => void;
  onNavigateAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onAnalyzeClick, 
  activeView = 'landing',
  onNavigateHome,
  onNavigateAnalysis,
  onNavigateReport,
  onNavigateDashboard,
  onNavigateWorkbench,
  onNavigateOffers,
  onNavigateMonitoring,
  onNavigateIssues,
  onNavigateShopper,
  onNavigateIntegrations,
  onNavigateAnalytics,
  onNavigateBilling,
  onNavigateAdmin
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#090D14]/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onNavigateHome || onAnalyzeClick}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg tracking-wider text-white">AIXSHOP</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700/60 font-semibold tracking-wider">
                {activeView === 'analysis' ? 'Analysis' : activeView === 'report' ? 'Report' : activeView === 'dashboard' ? 'Merchant' : 'Intelligence'}
              </span>
            </div>
          </button>

          {activeView === 'analysis' && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 pl-3 border-l border-slate-800">
              <span>Page 02</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-200 font-medium">First Moment of Value</span>
            </div>
          )}

          {activeView === 'report' && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 pl-3 border-l border-slate-800">
              <span>Page 03</span>
              <span className="text-slate-600">/</span>
              <span className="text-cyan-400 font-medium font-mono">Product Intelligence Report</span>
            </div>
          )}

          {activeView === 'dashboard' && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 pl-3 border-l border-slate-800">
              <span>Page 05</span>
              <span className="text-slate-600">/</span>
              <span className="text-cyan-400 font-medium font-mono">Merchant Overview</span>
            </div>
          )}
        </div>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {activeView === 'landing' ? (
            <>
              <a href="#preview" className="hover:text-white transition-colors">
                Product Intelligence
              </a>
              <a href="#how-it-works" className="hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#principles" className="hover:text-white transition-colors">
                Trust & Principles
              </a>
              {onNavigateDashboard && (
                <button
                  type="button"
                  onClick={onNavigateDashboard}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
                >
                  <span>Overview (P05)</span>
                </button>
              )}
              {onNavigateWorkbench && (
                <button
                  type="button"
                  onClick={onNavigateWorkbench}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  <span>Products (P06)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    24 SKUs
                  </span>
                </button>
              )}
              {onNavigateOffers && (
                <button
                  type="button"
                  onClick={onNavigateOffers}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  <span>Offers (P07)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    42
                  </span>
                </button>
              )}
              {onNavigateMonitoring && (
                <button
                  type="button"
                  onClick={onNavigateMonitoring}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  <span>Monitoring (P09)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    12 Alerts
                  </span>
                </button>
              )}
              {onNavigateIssues && (
                <button
                  type="button"
                  onClick={onNavigateIssues}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
                >
                  <span>Issues (P10)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950/60 text-rose-300 border border-rose-500/40">
                    8 Open
                  </span>
                </button>
              )}
              {onNavigateShopper && (
                <button
                  type="button"
                  onClick={onNavigateShopper}
                  className="flex items-center gap-1.5 text-cyan-300 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  <span>Shopper (P11)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Public
                  </span>
                </button>
              )}
              {onNavigateIntegrations && (
                <button
                  type="button"
                  onClick={onNavigateIntegrations}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
                >
                  <span>Integrations (P12)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    Active
                  </span>
                </button>
              )}
              {onNavigateAnalytics && (
                <button
                  type="button"
                  onClick={onNavigateAnalytics}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
                >
                  <span>Analytics (P13)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Preview
                  </span>
                </button>
              )}
              {onNavigateBilling && (
                <button
                  type="button"
                  onClick={onNavigateBilling}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
                >
                  <span>Billing (P14)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Pro
                  </span>
                </button>
              )}
              {onNavigateAdmin && (
                <button
                  type="button"
                  onClick={onNavigateAdmin}
                  className="flex items-center gap-1.5 text-indigo-300 hover:text-white font-semibold transition-colors cursor-pointer px-2 py-1 rounded bg-indigo-950/60 border border-indigo-500/40"
                >
                  <Server className="w-3 h-3 text-indigo-400" />
                  <span>Admin (P15)</span>
                </button>
              )}
            </>
          ) : activeView === 'report' ? (
            <div className="flex items-center gap-4 text-xs font-medium">
              <button 
                onClick={onNavigateHome} 
                className="hover:text-white text-slate-400 transition-colors cursor-pointer"
              >
                Landing (P01)
              </button>
              <span className="text-slate-600">·</span>
              <button 
                onClick={onNavigateAnalysis} 
                className="hover:text-white text-slate-400 transition-colors cursor-pointer"
              >
                Analysis (P02)
              </button>
              {onNavigateDashboard && (
                <>
                  <span className="text-slate-600">·</span>
                  <button 
                    onClick={onNavigateDashboard} 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-semibold"
                  >
                    Overview (P05)
                  </button>
                </>
              )}
              {onNavigateWorkbench && (
                <>
                  <span className="text-slate-600">·</span>
                  <button 
                    onClick={onNavigateWorkbench} 
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer font-semibold"
                  >
                    Products (P06)
                  </button>
                </>
              )}
            </div>
          ) : activeView === 'dashboard' ? (
            <div className="flex items-center gap-4 text-xs font-medium">
              <button 
                onClick={onNavigateHome} 
                className="hover:text-white text-slate-400 transition-colors cursor-pointer"
              >
                Landing Page (P01)
              </button>
              <span className="text-slate-600">·</span>
              <button 
                onClick={onNavigateAnalysis} 
                className="hover:text-white text-slate-400 transition-colors cursor-pointer"
              >
                Analysis (P02)
              </button>
              <span className="text-slate-600">·</span>
              <button 
                onClick={onNavigateReport} 
                className="hover:text-white text-slate-400 transition-colors cursor-pointer"
              >
                Product Report (P03)
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-xs font-medium">
              <button 
                onClick={onNavigateHome} 
                className="hover:text-white text-slate-400 transition-colors cursor-pointer text-sm"
              >
                ← Back to Landing Page
              </button>
              {onNavigateDashboard && (
                <>
                  <span className="text-slate-600">·</span>
                  <button 
                    onClick={onNavigateDashboard} 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-semibold text-xs"
                  >
                    Merchant Overview (P05)
                  </button>
                </>
              )}
            </div>
          )}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {activeView === 'landing' ? (
            <div className="flex items-center gap-2">
              {onNavigateDashboard && (
                <button
                  type="button"
                  onClick={onNavigateDashboard}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer"
                >
                  <span>Merchant Control</span>
                </button>
              )}
              <button
                type="button"
                onClick={onAnalyzeClick}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-cyan-500/50 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>Analyze a Product</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          ) : activeView === 'dashboard' ? (
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 rotate-180" />
              <span>Analyze a Product (P01)</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
            >
              <span>New Analysis</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
