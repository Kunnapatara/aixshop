import React from 'react';
import { Layers, ShoppingBag, Store, ShieldAlert, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

export type UserJourney = 'shopper' | 'merchant' | 'admin';

interface GlobalJourneyBarProps {
  currentJourney: UserJourney;
  onSelectJourney: (journey: UserJourney) => void;
  onNavigateLanding?: () => void;
}

export const GlobalJourneyBar: React.FC<GlobalJourneyBarProps> = ({
  currentJourney,
  onSelectJourney,
  onNavigateLanding
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateLanding}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center shadow-sm shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-stone-900 font-sans">AIXSHOP</span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200/70">
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium hidden md:block">
                  Multi-Source Product Intelligence
                </p>
              </div>
            </button>
          </div>

          {/* Center: The 3 User Journeys Switcher (QRxMENU Pill Design) */}
          <div className="flex items-center bg-stone-100/90 p-1 rounded-2xl border border-stone-200/80 shadow-xs">
            {/* Shopper Journey */}
            <button
              type="button"
              onClick={() => onSelectJourney('shopper')}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentJourney === 'shopper'
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Shopper</span>
              {currentJourney === 'shopper' && (
                <span className="hidden lg:inline text-[10px] opacity-90 font-normal ml-0.5">· Trust & Buy</span>
              )}
            </button>

            {/* Merchant Journey */}
            <button
              type="button"
              onClick={() => onSelectJourney('merchant')}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentJourney === 'merchant'
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Merchant</span>
              {currentJourney === 'merchant' && (
                <span className="hidden lg:inline text-[10px] opacity-90 font-normal ml-0.5">· SaaS Workspace</span>
              )}
            </button>

            {/* Admin Journey */}
            <button
              type="button"
              onClick={() => onSelectJourney('admin')}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                currentJourney === 'admin'
                  ? 'bg-[#F97316] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin</span>
              {currentJourney === 'admin' && (
                <span className="hidden lg:inline text-[10px] opacity-90 font-normal ml-0.5">· Control Tower</span>
              )}
            </button>
          </div>

          {/* Right: Environment Pills & Landing Overview Link */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Production Pipeline</span>
              </span>
            </div>

            {onNavigateLanding && (
              <button
                type="button"
                onClick={onNavigateLanding}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer border border-transparent hover:border-stone-200"
              >
                <span>Docs / Engine</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
