import React from 'react';
import { 
  Search, 
  X, 
  RotateCcw, 
  Filter, 
  Tag, 
  AlertTriangle, 
  Layers, 
  ListFilter,
  DollarSign
} from 'lucide-react';
import { 
  OfferFiltersState, 
  OfferEvidenceState, 
  CommercialAvailability, 
  PriceCondition, 
  OfferConfidence 
} from '../../types/offers';

interface OffersFiltersBarProps {
  filters: OfferFiltersState;
  onFilterChange: (filters: OfferFiltersState) => void;
  onResetFilters: () => void;
  viewMode: 'flat' | 'grouped';
  onViewModeChange: (mode: 'flat' | 'grouped') => void;
  totalOffers: number;
  filteredOffersCount: number;
  filteredProductsCount: number;
}

export const OffersFiltersBar: React.FC<OffersFiltersBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  totalOffers,
  filteredOffersCount,
  filteredProductsCount
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleSellerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, seller: e.target.value });
  };

  const handleOfferStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, offerState: e.target.value as OfferEvidenceState | 'All' });
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, availability: e.target.value as CommercialAvailability | 'All' });
  };

  const handlePriceConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, priceCondition: e.target.value as PriceCondition | 'All' });
  };

  const handleConfidenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, confidence: e.target.value as OfferConfidence | 'All' });
  };

  const handleIssueStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, issueStatus: e.target.value as any });
  };

  const togglePromotions = () => {
    onFilterChange({ ...filters, onlyPromotions: !filters.onlyPromotions });
  };

  const toggleConflicts = () => {
    onFilterChange({ ...filters, onlyConflicts: !filters.onlyConflicts });
  };

  // Check how many filters are active
  const hasActiveFilters = 
    filters.searchQuery.trim() !== '' ||
    filters.seller !== 'All' ||
    filters.offerState !== 'All' ||
    filters.availability !== 'All' ||
    filters.priceCondition !== 'All' ||
    filters.confidence !== 'All' ||
    filters.issueStatus !== 'All' ||
    filters.onlyPromotions ||
    filters.onlyConflicts;

  return (
    <div className="w-full bg-white border-b border-stone-200 p-4 space-y-3.5 shadow-2xs">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Top Filter Bar: Search, View Mode, Quick Toggles */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search product name, brand, model, SKU, GTIN, MPN, seller..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all font-sans"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Controls: Quick Toggles + View Mode Selector */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Toggle: Promotions Only */}
            <button
              type="button"
              onClick={togglePromotions}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                filters.onlyPromotions 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold' 
                  : 'bg-stone-50 text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Promotions Only (6)</span>
            </button>

            {/* Quick Toggle: Conflicts Only */}
            <button
              type="button"
              onClick={toggleConflicts}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                filters.onlyConflicts 
                  ? 'bg-rose-50 text-rose-700 border border-rose-300 font-semibold' 
                  : 'bg-stone-50 text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Conflicts Only (4)</span>
            </button>

            {/* View Mode: Group by Product vs Flat */}
            <div className="flex items-center rounded-xl bg-stone-100 p-1 border border-stone-200">
              <button
                type="button"
                onClick={() => onViewModeChange('grouped')}
                className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grouped'
                    ? 'bg-white text-stone-900 font-bold shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Group offers under canonical Product"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Group by Product</span>
              </button>

              <button
                type="button"
                onClick={() => onViewModeChange('flat')}
                className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'flat'
                    ? 'bg-white text-stone-900 font-bold shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Flat table of all 42 individual offers"
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Flat Offer View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Dropdowns Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
          {/* Seller Dropdown */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-stone-500 mb-1 font-semibold">Seller</label>
            <select
              value={filters.seller}
              onChange={handleSellerChange}
              className="w-full px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
            >
              <option value="All">All Sellers</option>
              <option value="AeroPulse Direct">AeroPulse Direct (18)</option>
              <option value="Authorized Retailer">Authorized Retailers (14)</option>
              <option value="Marketplace Seller">Marketplace Sellers (6)</option>
              <option value="Third-Party Reseller">Third-Party Resellers (4)</option>
            </select>
          </div>

          {/* Offer Evidence State */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-stone-500 mb-1 font-semibold">Evidence State</label>
            <select
              value={filters.offerState}
              onChange={handleOfferStateChange}
              className="w-full px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
            >
              <option value="All">All Evidence States</option>
              <option value="OBSERVED">OBSERVED</option>
              <option value="MERCHANT_VERIFIED">MERCHANT VERIFIED</option>
              <option value="CONFLICT">CONFLICT</option>
              <option value="MISSING">MISSING</option>
              <option value="DERIVED">DERIVED</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-stone-500 mb-1 font-semibold">Availability</label>
            <select
              value={filters.availability}
              onChange={handleAvailabilityChange}
              className="w-full px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
            >
              <option value="All">All Availabilities</option>
              <option value="In Stock">In Stock</option>
              <option value="Limited">Limited</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          {/* Price Condition */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-stone-500 mb-1 font-semibold">Price Condition</label>
            <select
              value={filters.priceCondition}
              onChange={handlePriceConditionChange}
              className="w-full px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
            >
              <option value="All">All Conditions</option>
              <option value="Normal">Normal Price</option>
              <option value="Promotional">Promotional</option>
              <option value="Member-Only">Member-Only</option>
              <option value="Clearance">Clearance</option>
            </select>
          </div>

          {/* Confidence */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-stone-500 mb-1 font-semibold">Confidence</label>
            <select
              value={filters.confidence}
              onChange={handleConfidenceChange}
              className="w-full px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
            >
              <option value="All">All Confidences</option>
              <option value="High">High Confidence</option>
              <option value="Medium">Medium Confidence</option>
              <option value="Low">Low Confidence</option>
            </select>
          </div>

          {/* Issue Status */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-stone-500 mb-1 font-semibold">Issue Status</label>
            <select
              value={filters.issueStatus}
              onChange={handleIssueStatusChange}
              className="w-full px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316]"
            >
              <option value="All">All Statuses</option>
              <option value="No Issue">No Issues</option>
              <option value="Needs Review">Needs Review</option>
              <option value="Conflict">Conflict</option>
              <option value="Missing Evidence">Missing Evidence</option>
            </select>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-stone-500 text-[11px] font-mono">
              Showing <strong className="text-[#F97316] font-bold">{filteredOffersCount}</strong> of {totalOffers} offers 
              {viewMode === 'grouped' && ` (across ${filteredProductsCount} products)`}:
            </span>

            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 text-[11px] font-medium">
                Search: "{filters.searchQuery}"
                <button type="button" onClick={() => onFilterChange({ ...filters, searchQuery: '' })} className="hover:text-orange-900 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.seller !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-[11px]">
                Seller: {filters.seller}
                <button type="button" onClick={() => onFilterChange({ ...filters, seller: 'All' })} className="hover:text-stone-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.offerState !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-[11px]">
                State: {filters.offerState}
                <button type="button" onClick={() => onFilterChange({ ...filters, offerState: 'All' })} className="hover:text-stone-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.availability !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-[11px]">
                Avail: {filters.availability}
                <button type="button" onClick={() => onFilterChange({ ...filters, availability: 'All' })} className="hover:text-stone-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.onlyPromotions && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                Promotions Only
                <button type="button" onClick={togglePromotions} className="hover:text-emerald-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.onlyConflicts && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-medium">
                Conflicts Only
                <button type="button" onClick={toggleConflicts} className="hover:text-rose-950 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-[11px] text-[#F97316] hover:text-orange-700 flex items-center gap-1 font-mono transition-colors cursor-pointer font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
