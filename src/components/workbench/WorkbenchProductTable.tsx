import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  Flame, 
  HelpCircle, 
  Layers, 
  Tag, 
  DollarSign, 
  ExternalLink,
  Info,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Activity,
  Footprints,
  Dumbbell,
  Mountain,
  Shirt,
  Compass,
  Barcode
} from 'lucide-react';
import { WorkbenchProduct, WorkbenchCategory } from '../../types/workbench';

interface WorkbenchProductTableProps {
  products: WorkbenchProduct[];
  selectedProductIds: string[];
  onToggleSelectProduct: (productId: string) => void;
  onToggleSelectAllVisible: () => void;
  onSelectProductRow: (product: WorkbenchProduct) => void;
  onOpenEvidenceModal: (product: WorkbenchProduct) => void;
  onResetFilters: () => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

// Category visual icon mapper for neutral representation (no fake duplicate photos)
const CategoryGlyph: React.FC<{ category: WorkbenchCategory }> = ({ category }) => {
  switch (category) {
    case 'Running':
      return <Footprints className="w-4 h-4 text-[#F97316]" />;
    case 'Training':
      return <Dumbbell className="w-4 h-4 text-emerald-600" />;
    case 'Outdoor':
      return <Mountain className="w-4 h-4 text-amber-600" />;
    case 'Apparel':
      return <Shirt className="w-4 h-4 text-indigo-600" />;
    case 'Accessories':
      return <Compass className="w-4 h-4 text-blue-600" />;
    default:
      return <Layers className="w-4 h-4 text-stone-400" />;
  }
};

export const WorkbenchProductTable: React.FC<WorkbenchProductTableProps> = ({
  products,
  selectedProductIds,
  onToggleSelectProduct,
  onToggleSelectAllVisible,
  onSelectProductRow,
  onOpenEvidenceModal,
  onResetFilters,
  currentPage,
  pageSize,
  onPageChange
}) => {
  // Active popover explanation for identity column
  const [activeIdentityTooltip, setActiveIdentityTooltip] = useState<string | null>(null);

  // Pagination calculation
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentProducts = products.slice(startIndex, endIndex);

  const isAllVisibleSelected = 
    currentProducts.length > 0 && 
    currentProducts.every(p => selectedProductIds.includes(p.id));

  if (products.length === 0) {
    return (
      <div className="p-12 rounded-2xl bg-white border border-stone-200/80 text-center space-y-3 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-stone-400">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-stone-900">No representative products match your current filters.</h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Adjust or reset your search query, status criteria, or evidence state filters to display catalog items.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-2 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F97316] border border-orange-200 text-xs font-semibold transition-colors cursor-pointer"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Container (Desktop view) */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200/80 bg-stone-50/80 text-[11px] font-semibold text-stone-600 uppercase tracking-wider select-none">
              {/* Checkbox column */}
              <th className="p-3.5 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllVisibleSelected}
                  onChange={onToggleSelectAllVisible}
                  className="w-4 h-4 rounded border-stone-300 text-[#F97316] focus:ring-orange-500/40 cursor-pointer accent-[#F97316]"
                  title="Select all visible products"
                />
              </th>

              {/* Product Identity */}
              <th className="p-3.5 font-semibold text-stone-700">Product</th>

              {/* Identity Status */}
              <th className="p-3.5 font-semibold text-stone-700">Identity</th>

              {/* Coverage */}
              <th className="p-3.5 font-semibold text-stone-700 text-right">Coverage</th>

              {/* Evidence */}
              <th className="p-3.5 font-semibold text-stone-700">Evidence State</th>

              {/* Issues */}
              <th className="p-3.5 font-semibold text-stone-700">Issues</th>

              {/* Offers (Product != Offer) */}
              <th className="p-3.5 font-semibold text-stone-700">Offers Snapshot</th>

              {/* Discovery */}
              <th className="p-3.5 font-semibold text-stone-700">Discovery Readiness</th>

              {/* Priority */}
              <th className="p-3.5 font-semibold text-stone-700">Priority</th>

              {/* Quick Action */}
              <th className="p-3.5 w-16 text-center">Inspect</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 text-xs">
            {currentProducts.map((product) => {
              const isSelected = selectedProductIds.includes(product.id);

              return (
                <tr
                  key={product.id}
                  onClick={() => onSelectProductRow(product)}
                  className={`group transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50/50 hover:bg-orange-50/70'
                      : 'hover:bg-stone-50/80'
                  }`}
                >
                  {/* Selection Checkbox */}
                  <td 
                    className="p-3.5 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelectProduct(product.id)}
                      className="w-4 h-4 rounded border-stone-300 text-[#F97316] focus:ring-orange-500/40 cursor-pointer accent-[#F97316]"
                    />
                  </td>

                  {/* Product Details (Thumbnail glyph, Name, Brand, Category, Variant count) */}
                  <td className="p-3.5">
                    <div className="flex items-start gap-3">
                      {/* Neutral representative placeholder with category glyph */}
                      <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200/80 flex items-center justify-center shrink-0 group-hover:border-[#F97316]/40 transition-colors">
                        <CategoryGlyph category={product.category} />
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900 text-xs tracking-tight truncate max-w-[230px]">
                            {product.name}
                          </span>
                          {product.isPrimaryExample && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-orange-100 text-orange-800 border border-orange-200 font-bold shrink-0">
                              Primary Model
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
                          <span>{product.brand}</span>
                          <span className="text-stone-300">•</span>
                          <span className="text-stone-700 font-medium">{product.category}</span>
                          <span className="text-stone-300">•</span>
                          <span className="text-stone-500">{product.variantCount} vars</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Identity Column */}
                  <td 
                    className="p-3.5 whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIdentityTooltip(activeIdentityTooltip === product.id ? null : product.id);
                    }}
                  >
                    <div className="relative inline-block">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-medium border ${
                        product.identityStatus === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        <Barcode className="w-3 h-3" />
                        <span>{product.identityStatus}</span>
                      </span>

                      {/* Small popover explanation */}
                      {activeIdentityTooltip === product.id && (
                        <div 
                          className="absolute left-0 top-7 z-30 w-64 p-3 rounded-xl bg-white border border-stone-200 shadow-xl text-[11px] text-stone-700 font-sans"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="font-semibold text-stone-900 mb-1 font-mono text-xs">
                            Identity Grounding:
                          </div>
                          <p className="leading-relaxed">{product.identityDetail}</p>
                          <div className="mt-2 text-[10px] font-mono text-stone-400">
                            GTIN: {product.gtin} · SKU: {product.sku}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Coverage Column */}
                  <td 
                    className="p-3.5 text-right whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEvidenceModal(product);
                    }}
                  >
                    <div className="inline-flex flex-col items-end hover:opacity-80 transition-opacity">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-sm text-[#F97316]">
                          {product.intelligenceCoverage}%
                        </span>
                        <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md ${
                          product.coverageStatus === 'Strong'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : product.coverageStatus === 'Needs Attention'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {product.coverageStatus}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium text-stone-400 hover:text-[#F97316]">
                        View breakdown
                      </span>
                    </div>
                  </td>

                  {/* Evidence Column */}
                  <td 
                    className="p-3.5 whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEvidenceModal(product);
                    }}
                  >
                    <div className="space-y-0.5 hover:opacity-80 transition-opacity">
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        {product.dominantEvidenceState === 'CONFLICT' ? (
                          <span className="text-rose-600 flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5" />
                            <span>Conflict</span>
                          </span>
                        ) : product.dominantEvidenceState === 'MISSING' ? (
                          <span className="text-amber-600 flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Missing</span>
                          </span>
                        ) : product.dominantEvidenceState === 'MERCHANT_VERIFIED' ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="text-blue-700 flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5" />
                            <span>Observed</span>
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-stone-500">
                        {product.unresolvedClaimsCount > 0 
                          ? `${product.unresolvedClaimsCount} unresolved claims`
                          : 'Fully corroborated'}
                      </div>
                    </div>
                  </td>

                  {/* Issues Column */}
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="space-y-0.5">
                      {product.criticalIssuesCount > 0 || product.highIssuesCount > 0 ? (
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          {product.criticalIssuesCount > 0 && (
                            <span className="text-rose-700 font-bold">
                              {product.criticalIssuesCount} Crit
                            </span>
                          )}
                          {product.highIssuesCount > 0 && (
                            <span className="text-amber-700 font-medium">
                              {product.highIssuesCount} High
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] font-mono text-emerald-700">
                          No Priority Issues
                        </span>
                      )}
                      <div className="text-[10px] text-stone-500 truncate max-w-[140px]">
                        {product.topIssues[0] || 'Clean model'}
                      </div>
                    </div>
                  </td>

                  {/* Offers Column (Snapshot only, Product != Offer) */}
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="space-y-0.5 font-mono">
                      <div className="text-xs font-semibold text-stone-800 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-emerald-600" />
                        <span>{product.observedOffersCount} Offers</span>
                      </div>
                      <div className="text-[10px] text-stone-500">
                        ${product.observedPriceMin.toFixed(0)}–${product.observedPriceMax.toFixed(0)} {product.currency}
                      </div>
                    </div>
                  </td>

                  {/* Discovery Column (Readiness %, not search ranking) */}
                  <td className="p-3.5 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="font-bold text-stone-800">{product.discoveryReadiness}%</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                          product.discoveryStatus === 'Strong'
                            ? 'text-emerald-700 bg-emerald-50'
                            : product.discoveryStatus === 'Needs Attention'
                            ? 'text-amber-700 bg-amber-50'
                            : 'text-rose-700 bg-rose-50'
                        }`}>
                          {product.discoveryStatus}
                        </span>
                      </div>
                      <div className="text-[10px] text-stone-400">
                        Diagnostic readiness
                      </div>
                    </div>
                  </td>

                  {/* Remediation Priority */}
                  <td className="p-3.5 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold border ${
                      product.priority === 'Critical'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : product.priority === 'High'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : product.priority === 'Medium'
                        ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
                        : product.priority === 'Low'
                        ? 'bg-stone-100 text-stone-700 border-stone-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {product.priority}
                    </span>
                  </td>

                  {/* Inspect CTA */}
                  <td className="p-3.5 text-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProductRow(product);
                      }}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-[#F97316] hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Inspect Product Intelligence Drawer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Transformation Layout */}
      <div className="lg:hidden space-y-3">
        {currentProducts.map((product) => {
          const isSelected = selectedProductIds.includes(product.id);

          return (
            <div
              key={product.id}
              className={`p-4 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-orange-50/50 border-orange-300'
                  : 'bg-white border-stone-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelectProduct(product.id)}
                    className="w-4 h-4 rounded border-stone-300 text-[#F97316] focus:ring-orange-500/40 accent-[#F97316]"
                  />
                  <div className="w-7 h-7 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0">
                    <CategoryGlyph category={product.category} />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">{product.name}</h4>
                    <span className="text-[10px] font-mono text-stone-500">
                      {product.brand} · {product.category}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-lg font-bold ${
                  product.priority === 'Critical' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  product.priority === 'High' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-stone-100 text-stone-700'
                }`}>
                  {product.priority}
                </span>
              </div>

              {/* Grid of Key Diagnostics */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-stone-100 my-2 text-center font-mono text-xs">
                <div className="p-1.5 rounded-xl bg-stone-50">
                  <div className="text-[9px] text-stone-500 uppercase">Coverage</div>
                  <div className="font-bold text-[#F97316]">{product.intelligenceCoverage}%</div>
                </div>
                <div className="p-1.5 rounded-xl bg-stone-50">
                  <div className="text-[9px] text-stone-500 uppercase">Evidence</div>
                  <div className="font-bold text-stone-800">{product.dominantEvidenceState}</div>
                </div>
                <div className="p-1.5 rounded-xl bg-stone-50">
                  <div className="text-[9px] text-stone-500 uppercase">Discovery</div>
                  <div className="font-bold text-stone-800">{product.discoveryReadiness}%</div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-stone-500">
                  {product.observedOffersCount} Offers observed
                </span>
                <button
                  type="button"
                  onClick={() => onSelectProductRow(product)}
                  className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F97316] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>View Intelligence</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Local Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-stone-200/80 text-xs text-stone-600 shadow-xs">
        <div>
          Showing <strong className="text-stone-900">{startIndex + 1}–{endIndex}</strong> of {totalItems} representative products
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-xl border transition-colors ${
              currentPage === 1
                ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                : 'border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer'
            }`}
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isCurrent = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={`w-7 h-7 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-[#F97316] text-white font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-1.5 rounded-xl border transition-colors ${
              currentPage === totalPages
                ? 'border-stone-200 text-stone-300 cursor-not-allowed'
                : 'border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer'
            }`}
            title="Next Page"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
