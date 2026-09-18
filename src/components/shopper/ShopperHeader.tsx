import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Compass, 
  Info, 
  CheckCircle2, 
  ArrowRight,
  X
} from 'lucide-react';
import { sampleSearchProducts } from '../../data/sampleShopperData';

interface ShopperHeaderProps {
  onAboutEvidenceClick: () => void;
  onSelectProduct?: (productId: string) => void;
  onNavigateMerchant?: () => void;
  onNavigateHome?: () => void;
}

export const ShopperHeader: React.FC<ShopperHeaderProps> = ({
  onAboutEvidenceClick,
  onSelectProduct,
  onNavigateMerchant,
  onNavigateHome
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredProducts = sampleSearchProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.gtin.includes(searchQuery) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#090D15]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top micro-disclosure banner */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-cyan-950/40 border-b border-cyan-500/20 px-4 py-1.5 text-center text-xs text-slate-300 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="font-medium text-cyan-300">Public Product Intelligence Surface</span>
        <span className="text-slate-500 hidden sm:inline">|</span>
        <span className="text-slate-400 hidden sm:inline">Representative Product Preview Mode</span>
        <span className="text-slate-500 hidden md:inline">|</span>
        <span className="text-slate-400 text-[11px] hidden md:inline">AIXSHOP is an intelligence layer, not a merchant</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Route */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-base shadow-sm shadow-cyan-500/30">
              A
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                AIXSHOP<span className="text-cyan-400">.APP</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                Product Intelligence
              </div>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded">
              /p/vaporstride-carbon-elite
            </span>
          </div>
        </div>

        {/* Central Search Bar */}
        <div className="flex-1 max-w-md relative" ref={searchRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search by product, brand, GTIN, or model..."
              className="w-full pl-9 pr-8 py-1.5 text-xs rounded-lg bg-slate-900/90 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50 animate-in fade-in-50 duration-100">
              <div className="px-3 py-2 text-[10px] font-mono text-slate-400 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
                <span>REPRESENTATIVE CATALOG INDEX</span>
                <span>{filteredProducts.length} PRODUCTS</span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/60">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(p.id);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-cyan-950/30 hover:border-l-2 hover:border-cyan-500 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                          {p.brand} {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{p.category}</span>
                          <span className="text-slate-600">·</span>
                          <span className="font-mono text-slate-500 text-[10px]">GTIN {p.gtin}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-cyan-300">{p.priceRange}</span>
                        <div className="text-[9px] text-emerald-400">{p.status}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center text-xs text-slate-400">
                    No matching products found in representative preview.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onAboutEvidenceClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>About Evidence</span>
          </button>

          {onNavigateMerchant && (
            <button
              type="button"
              onClick={onNavigateMerchant}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/50 border border-cyan-500/40 text-cyan-300 text-xs font-medium transition-colors cursor-pointer"
              title="Return to Merchant Workspace"
            >
              <span className="hidden sm:inline">Merchant View</span>
              <span className="sm:hidden">Merchant</span>
              <ArrowRight className="w-3 h-3 text-cyan-400" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
