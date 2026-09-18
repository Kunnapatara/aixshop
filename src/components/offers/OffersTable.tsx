import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink, 
  AlertTriangle, 
  Tag, 
  ShieldCheck, 
  Clock, 
  Eye, 
  HelpCircle,
  Package,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  CommercialOffer, 
  ProductOfferGroup, 
  OfferSortField, 
  OfferSortDirection,
  OfferEvidenceState 
} from '../../types/offers';

interface OffersTableProps {
  offers: CommercialOffer[];
  productGroups: ProductOfferGroup[];
  viewMode: 'flat' | 'grouped';
  sortField: OfferSortField;
  sortDirection: OfferSortDirection;
  onSort: (field: OfferSortField) => void;
  onSelectOffer: (offer: CommercialOffer) => void;
  onNavigateReport?: () => void;
}

export const OffersTable: React.FC<OffersTableProps> = ({
  offers,
  productGroups,
  viewMode,
  sortField,
  sortDirection,
  onSort,
  onSelectOffer,
  onNavigateReport
}) => {
  // Collapsed states for grouped view (by default all open)
  const [collapsedProducts, setCollapsedProducts] = useState<Record<string, boolean>>({});

  const toggleProductCollapse = (productId: string) => {
    setCollapsedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const getEvidenceStateBadge = (state: OfferEvidenceState) => {
    switch (state) {
      case 'MERCHANT_VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-bold">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            <span>VERIFIED</span>
          </span>
        );
      case 'OBSERVED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 text-[10px] font-mono font-semibold">
            <Eye className="w-3 h-3 text-[#F97316]" />
            <span>OBSERVED</span>
          </span>
        );
      case 'DERIVED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-mono font-semibold">
            <span>DERIVED</span>
          </span>
        );
      case 'CONFLICT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono font-bold">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            <span>CONFLICT</span>
          </span>
        );
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-mono font-semibold">
            <HelpCircle className="w-3 h-3 text-amber-600" />
            <span>MISSING</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getAvailabilityBadge = (avail: string) => {
    switch (avail) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>In Stock</span>
          </span>
        );
      case 'Limited':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            <span>Limited</span>
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            <span>Out of Stock</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-500 text-[11px]">
            <span>Unknown</span>
          </span>
        );
    }
  };

  const getSellerBadge = (type: string) => {
    switch (type) {
      case 'Brand Direct':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-semibold">
            Brand Direct
          </span>
        );
      case 'Authorized Retailer':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
            Authorized
          </span>
        );
      case 'Marketplace Seller':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
            Marketplace
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
            Reseller
          </span>
        );
    }
  };

  const renderSortHeader = (label: string, field: OfferSortField) => {
    const isActive = sortField === field;
    return (
      <button
        type="button"
        onClick={() => onSort(field)}
        className="flex items-center gap-1.5 text-[11px] uppercase font-mono tracking-wider text-stone-500 hover:text-stone-900 transition-colors cursor-pointer group font-semibold"
      >
        <span>{label}</span>
        <ArrowUpDown className={`w-3 h-3 ${isActive ? 'text-[#F97316] font-bold' : 'text-stone-400 group-hover:text-stone-600'}`} />
      </button>
    );
  };

  if (offers.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center bg-white rounded-3xl border border-stone-200 my-6 shadow-xs">
        <Package className="w-12 h-12 text-stone-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-stone-900 mb-1">No Matching Offers Found</h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
          No commercial offers match the selected filters or search terms. Try loosening your criteria or resetting filters.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF8F5] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ---------------------------------------------------- */}
        {/* VIEW MODE 1: GROUPED BY PRODUCT (Section 19 & 3)     */}
        {/* ---------------------------------------------------- */}
        {viewMode === 'grouped' ? (
          <div className="space-y-4">
            {productGroups.map((group) => {
              const isCollapsed = collapsedProducts[group.productId] || false;

              return (
                <div 
                  key={group.productId}
                  className="rounded-3xl bg-white border border-stone-200/80 shadow-xs overflow-hidden transition-all"
                >
                  {/* Canonical Product Group Header */}
                  <div className="p-4 sm:p-5 bg-stone-50/70 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <button
                        type="button"
                        onClick={() => toggleProductCollapse(group.productId)}
                        className="mt-1 p-1.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer shadow-2xs"
                        title={isCollapsed ? 'Expand product offers' : 'Collapse product offers'}
                      >
                        {isCollapsed ? (
                          <ChevronRight className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono text-[#F97316] uppercase tracking-wider font-semibold">
                            {group.brand}
                          </span>
                          <span className="text-stone-300">·</span>
                          <span className="text-xs text-stone-500 font-mono">
                            GTIN: {group.gtin}
                          </span>
                          <span className="text-stone-300">·</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                            {group.category}
                          </span>
                          {group.isPrimaryExample && (
                            <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 text-[10px] font-mono font-bold flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>P03 Primary SKU</span>
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-baseline gap-3">
                          <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                            {group.productName}
                          </h2>
                          <span className="text-xs font-mono text-stone-600 font-semibold bg-stone-100 px-3 py-0.5 rounded-full border border-stone-200">
                            {group.observedOffersCount} observed {group.observedOffersCount === 1 ? 'offer' : 'offers'} for this product
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Product-Level Offer Dispersion Metrics */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-5 self-start md:self-auto pl-10 md:pl-0">
                      {/* Price Range */}
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-mono text-stone-400 font-medium">
                          Observed Offer Range
                        </div>
                        <div className="text-sm font-bold text-stone-900 font-mono">
                          ${group.lowestPrice?.toFixed(2)} — ${group.highestPrice?.toFixed(2)} {group.currency}
                        </div>
                        <div className="text-[9px] font-mono text-stone-400">
                          Observed offer-price range · Preview data
                        </div>
                      </div>

                      {/* Spread */}
                      {group.spread !== null && group.spread > 0 && (
                        <div className="text-right pl-3 border-l border-stone-200">
                          <div className="text-[10px] uppercase font-mono text-amber-600 font-medium">
                            Observed Spread
                          </div>
                          <div className="text-sm font-bold text-amber-600 font-mono">
                            ${group.spread.toFixed(2)}
                          </div>
                          <div className="text-[9px] font-mono text-stone-400">
                            Derived from observed offers
                          </div>
                        </div>
                      )}

                      {/* Diagnostic Flags */}
                      <div className="flex items-center gap-1.5">
                        {group.hasPriceConflict && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono font-bold" title="Price Disagreement Detected">
                            Price Conflict
                          </span>
                        )}
                        {group.hasAvailabilityConflict && (
                          <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-mono font-bold" title="Stock Disparity between sources">
                            Stock Conflict
                          </span>
                        )}
                        {group.hasPromotion && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-semibold" title="Observed Promotional Conditions">
                            Promotion
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Nested Offers Table */}
                  {!isCollapsed && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-stone-100/60 text-stone-500 font-mono text-[10px] uppercase border-b border-stone-200">
                            <th className="py-3 px-4">Seller & Type</th>
                            <th className="py-3 px-4">Observed Price</th>
                            <th className="py-3 px-4">Availability</th>
                            <th className="py-3 px-4">Promotion Condition</th>
                            <th className="py-3 px-4">Evidence</th>
                            <th className="py-3 px-4">Observed At</th>
                            <th className="py-3 px-4">Confidence</th>
                            <th className="py-3 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {group.offers.map((offer) => (
                            <tr 
                              key={offer.id}
                              onClick={() => onSelectOffer(offer)}
                              className="hover:bg-orange-50/30 transition-colors cursor-pointer group"
                            >
                              <td className="py-3 px-4">
                                <div className="font-semibold text-stone-900 group-hover:text-[#F97316] transition-colors">
                                  {offer.seller}
                                </div>
                                <div className="mt-0.5 flex items-center gap-1.5">
                                  {getSellerBadge(offer.sellerType)}
                                  <span className="text-[10px] text-stone-400 font-mono truncate max-w-[140px]">
                                    {offer.source.replace('https://', '')}
                                  </span>
                                </div>
                              </td>

                              <td className="py-3 px-4 font-mono">
                                <div className="text-sm font-bold text-stone-900">
                                  ${offer.offerPrice?.toFixed(2)} <span className="text-[10px] text-stone-400 font-normal">{offer.currency}</span>
                                </div>
                                {offer.promotion.hasPromotion && offer.promotion.promotionalPrice && (
                                  <div className="text-[10px] text-emerald-600 font-sans flex items-center gap-1 mt-0.5 font-semibold">
                                    <Tag className="w-2.5 h-2.5" />
                                    <span>Promo: ${offer.promotion.promotionalPrice.toFixed(2)}</span>
                                  </div>
                                )}
                              </td>

                              <td className="py-3 px-4">
                                {getAvailabilityBadge(offer.availability)}
                              </td>

                              <td className="py-3 px-4">
                                {offer.promotion.hasPromotion ? (
                                  <div className="space-y-0.5 max-w-[200px]">
                                    <span className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                                      <Tag className="w-3 h-3 text-emerald-600" />
                                      {offer.promotion.type}
                                    </span>
                                    <p className="text-[10px] text-stone-500 truncate" title={offer.promotion.conditionDescription}>
                                      {offer.promotion.conditionDescription}
                                    </p>
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-stone-400 font-mono">None (Base Price)</span>
                                )}
                              </td>

                              <td className="py-3 px-4">
                                {getEvidenceStateBadge(offer.dominantEvidenceState)}
                              </td>

                              <td className="py-3 px-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-stone-400" />
                                  <span>{offer.observedAt}</span>
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                  offer.confidence === 'High' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' :
                                  offer.confidence === 'Medium' ? 'text-amber-700 bg-amber-50 border border-amber-200' : 'text-stone-600 bg-stone-100 border border-stone-200'
                                }`}>
                                  {offer.confidence} Confidence
                                </span>
                              </td>

                              <td className="py-3 px-4 text-right">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectOffer(offer);
                                  }}
                                  className="px-3 py-1 rounded-xl bg-stone-100 hover:bg-orange-50 text-stone-700 hover:text-[#F97316] border border-stone-200 font-medium text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <span>Inspect</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* ---------------------------------------------------- */
          /* VIEW MODE 2: FLAT OFFER VIEW (42 Individual Offers)   */
          /* ---------------------------------------------------- */
          <div className="rounded-3xl bg-white border border-stone-200/80 shadow-xs overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100/60 text-stone-500 font-mono text-[10px] uppercase border-b border-stone-200">
                    <th className="py-3 px-4">{renderSortHeader('Product', 'product')}</th>
                    <th className="py-3 px-4">{renderSortHeader('Seller', 'seller')}</th>
                    <th className="py-3 px-4">{renderSortHeader('Observed Price', 'price')}</th>
                    <th className="py-3 px-4">{renderSortHeader('Availability', 'availability')}</th>
                    <th className="py-3 px-4">Promotion Condition</th>
                    <th className="py-3 px-4">Evidence</th>
                    <th className="py-3 px-4">{renderSortHeader('Observed At', 'observedAt')}</th>
                    <th className="py-3 px-4">{renderSortHeader('Confidence', 'confidence')}</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {offers.map((offer) => (
                    <tr 
                      key={offer.id}
                      onClick={() => onSelectOffer(offer)}
                      className="hover:bg-orange-50/30 transition-colors cursor-pointer group"
                    >
                      {/* Product Column */}
                      <td className="py-3 px-4 max-w-[220px]">
                        <div className="font-bold text-stone-900 group-hover:text-[#F97316] transition-colors truncate">
                          {offer.productName}
                        </div>
                        <div className="text-[10px] font-mono text-stone-400 flex items-center gap-1.5 mt-0.5">
                          <span>{offer.brand}</span>
                          <span className="text-stone-300">·</span>
                          <span>{offer.sku}</span>
                        </div>
                      </td>

                      {/* Seller Column */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">
                          {offer.seller}
                        </div>
                        <div className="mt-0.5">
                          {getSellerBadge(offer.sellerType)}
                        </div>
                      </td>

                      {/* Offer Price Column */}
                      <td className="py-3 px-4 font-mono">
                        <div className="text-sm font-bold text-stone-900">
                          ${offer.offerPrice?.toFixed(2)} <span className="text-[10px] text-stone-400 font-normal">{offer.currency}</span>
                        </div>
                        {offer.promotion.hasPromotion && offer.promotion.promotionalPrice && (
                          <div className="text-[10px] text-emerald-600 font-sans flex items-center gap-1 mt-0.5 font-semibold">
                            <Tag className="w-2.5 h-2.5" />
                            <span>Promo: ${offer.promotion.promotionalPrice.toFixed(2)}</span>
                          </div>
                        )}
                      </td>

                      {/* Availability Column */}
                      <td className="py-3 px-4">
                        {getAvailabilityBadge(offer.availability)}
                      </td>

                      {/* Promotion Condition */}
                      <td className="py-3 px-4">
                        {offer.promotion.hasPromotion ? (
                          <div className="space-y-0.5 max-w-[180px]">
                            <span className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                              <Tag className="w-3 h-3 text-emerald-600" />
                              {offer.promotion.type}
                            </span>
                            <p className="text-[10px] text-stone-500 truncate" title={offer.promotion.conditionDescription}>
                              {offer.promotion.conditionDescription}
                            </p>
                          </div>
                        ) : (
                          <span className="text-[11px] text-stone-400 font-mono">None</span>
                        )}
                      </td>

                      {/* Evidence State */}
                      <td className="py-3 px-4">
                        {getEvidenceStateBadge(offer.dominantEvidenceState)}
                      </td>

                      {/* Observed At */}
                      <td className="py-3 px-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                        {offer.observedAt}
                      </td>

                      {/* Confidence */}
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          offer.confidence === 'High' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' :
                          offer.confidence === 'Medium' ? 'text-amber-700 bg-amber-50 border border-amber-200' : 'text-stone-600 bg-stone-100 border border-stone-200'
                        }`}>
                          {offer.confidence}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectOffer(offer);
                          }}
                          className="px-3 py-1 rounded-xl bg-stone-100 hover:bg-orange-50 text-stone-700 hover:text-[#F97316] border border-stone-200 font-medium text-[11px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Inspect</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile & Tablet Card Layout (Section 31 - No horizontal scroll) */}
            <div className="block lg:hidden divide-y divide-stone-100">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  onClick={() => onSelectOffer(offer)}
                  className="p-4 hover:bg-stone-50/80 transition-colors cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-mono text-[#F97316] font-semibold">{offer.brand}</div>
                      <h4 className="text-sm font-bold text-stone-900">{offer.productName}</h4>
                      <div className="text-[10px] font-mono text-stone-400">{offer.sku}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-stone-900 font-mono">
                        ${offer.offerPrice?.toFixed(2)} {offer.currency}
                      </div>
                      <div className="mt-0.5">{getAvailabilityBadge(offer.availability)}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-800">{offer.seller}</span>
                      {getSellerBadge(offer.sellerType)}
                    </div>
                    {getEvidenceStateBadge(offer.dominantEvidenceState)}
                  </div>

                  {offer.promotion.hasPromotion && (
                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{offer.promotion.type}: {offer.promotion.conditionDescription}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-1">
                    <span>Observed: {offer.observedAt}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOffer(offer);
                      }}
                      className="text-[#F97316] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
