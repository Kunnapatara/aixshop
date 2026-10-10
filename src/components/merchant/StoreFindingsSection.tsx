// src/components/merchant/StoreFindingsSection.tsx
// Store-First Findings Grouped by Priority: Must Fix | Improve | Healthy
// Features affected products drill-down directly into Product Audit

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Package, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Tag, 
  ShieldAlert, 
  Wrench, 
  Sparkles,
  Info
} from 'lucide-react';
import { IssueItem } from '../../types/issues';
import { CANONICAL_CATALOG_PRODUCTS } from '../../data/canonicalCatalog';

interface StoreFindingsSectionProps {
  issues: IssueItem[];
  onInspectProduct?: (productId: string, productName: string) => void;
  onOpenActionCenter?: () => void;
  onResolveIssue?: (issueId: string) => void;
}

export const StoreFindingsSection: React.FC<StoreFindingsSectionProps> = ({
  issues,
  onInspectProduct,
  onOpenActionCenter,
  onResolveIssue
}) => {
  const [activePriorityTab, setActivePriorityTab] = useState<'critical' | 'improvement' | 'good'>('critical');
  const [expandedFindingId, setExpandedFindingId] = useState<string | null>('find-1');

  // Representative finding groups mapped to canonical issues & products
  const criticalFindings = [
    {
      id: 'find-1',
      title: 'Incomplete Product Specifications for Core Queries',
      scope: 'PRODUCT',
      affectedCount: '8 Products',
      impactText: 'Shoppers asking technical questions (drop, upper mesh, carbon plate) receive incomplete answers from AI models.',
      recommendedAction: 'Add missing structured specifications in your merchant backend (Shopify / WooCommerce).',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[0].id, name: CANONICAL_CATALOG_PRODUCTS[0].name, missing: ['Upper Material', 'Foam Stack Height', 'Return Policy'] },
        { id: CANONICAL_CATALOG_PRODUCTS[1].id, name: CANONICAL_CATALOG_PRODUCTS[1].name, missing: ['HydroGuard Waterproofing', 'Outsole Grip Tech'] },
        { id: CANONICAL_CATALOG_PRODUCTS[2].id, name: CANONICAL_CATALOG_PRODUCTS[2].name, missing: ['Spike Pin Count', 'GTIN Barcode Checksum'] }
      ]
    },
    {
      id: 'find-2',
      title: 'Price Discrepancy Between Direct Store and Reseller Feeds',
      scope: 'OFFER',
      affectedCount: '3 Offers',
      impactText: 'AI assistants lower confidence score when store pricing conflicts with third-party merchant listings.',
      recommendedAction: 'Verify offer price and promotions in your catalog feed connections.',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[0].id, name: CANONICAL_CATALOG_PRODUCTS[0].name, missing: ['Promo Price $189 vs MSRP $199'] },
        { id: CANONICAL_CATALOG_PRODUCTS[1].id, name: CANONICAL_CATALOG_PRODUCTS[1].name, missing: ['Shipping Fee Unspecified'] }
      ]
    },
    {
      id: 'find-3',
      title: 'Missing Structured Return Policy (Schema.org)',
      scope: 'STORE',
      affectedCount: 'Store-Wide',
      impactText: 'Shoppers hesitate to buy if AI cannot verify return terms, turnaround windows, or warranty eligibility.',
      recommendedAction: 'Implement Schema.org MerchantReturnPolicy in your storefront settings.',
      productsAffected: []
    }
  ];

  const improvementFindings = [
    {
      id: 'find-4',
      title: 'High-Resolution Imagery with Pure White Background',
      scope: 'PRODUCT',
      affectedCount: '6 Products',
      impactText: 'Images do not meet Google Shopping 800x800px pure white background standard for rich cards.',
      recommendedAction: 'Upload 800x800px product photos with isolated white background.',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[0].id, name: CANONICAL_CATALOG_PRODUCTS[0].name, missing: ['White Background Main Shot'] },
        { id: CANONICAL_CATALOG_PRODUCTS[2].id, name: CANONICAL_CATALOG_PRODUCTS[2].name, missing: ['High-Res Lateral Profile'] }
      ]
    },
    {
      id: 'find-5',
      title: 'Shipping Transit Times & Cut-Off Schedules',
      scope: 'OFFER',
      affectedCount: '4 Products',
      impactText: 'Shoppers with urgent delivery needs cannot evaluate delivery windows.',
      recommendedAction: 'Specify same-day cut-off time and free shipping thresholds in store admin.',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[1].id, name: CANONICAL_CATALOG_PRODUCTS[1].name, missing: ['Daily Shipping Cut-Off Window'] }
      ]
    },
    {
      id: 'find-6',
      title: 'Natural Language Product Descriptions for Conversational Search',
      scope: 'PRODUCT',
      affectedCount: '5 Products',
      impactText: 'Conversational queries like "marathon shoe for flat feet" fail to match product summaries.',
      recommendedAction: 'Add intended biomechanical use cases and runner archetypes to product overview paragraphs.',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[0].id, name: CANONICAL_CATALOG_PRODUCTS[0].name, missing: ['Runner Arch Profile Description'] },
        { id: CANONICAL_CATALOG_PRODUCTS[1].id, name: CANONICAL_CATALOG_PRODUCTS[1].name, missing: ['Terrain Suitability Details'] }
      ]
    },
    {
      id: 'find-7',
      title: 'Universal Barcodes (GTIN-14) on Size/Color Variants',
      scope: 'PRODUCT',
      affectedCount: '6 Variants',
      impactText: 'AI cannot distinguish specific SKU variants when shoppers search by size.',
      recommendedAction: 'Assign valid GS1 GTIN barcodes to each variant in your inventory management.',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[2].id, name: CANONICAL_CATALOG_PRODUCTS[2].name, missing: ['GTIN-14 Variant Checksum'] }
      ]
    },
    {
      id: 'find-8',
      title: 'Standardize Specification Measurement Units',
      scope: 'PRODUCT',
      affectedCount: '2 Products',
      impactText: 'Unstructured text like "8mm drop" hinders numeric range filtering across search engines.',
      recommendedAction: 'Change raw text to quantitative structured properties with standardized unit codes.',
      productsAffected: [
        { id: CANONICAL_CATALOG_PRODUCTS[0].id, name: CANONICAL_CATALOG_PRODUCTS[0].name, missing: ['Foam Stack Numeric (mm)'] }
      ]
    }
  ];

  const goodFindings = [
    {
      id: 'find-9',
      title: 'Clear Product Titles & Standardized Brand Identity',
      affectedCount: '24 Products',
      detail: 'Clear brand name AeroPulse Athletics and model titles without keyword stuffing.'
    },
    {
      id: 'find-10',
      title: 'Stock Availability Synchronized with Checkout',
      affectedCount: '24 Products',
      detail: 'Shoppers and AI assistants can rely on real-time availability states.'
    },
    {
      id: 'find-11',
      title: 'Currency & Pricing ISO 4217 Compliance (USD)',
      affectedCount: '42 Offers',
      detail: 'Structured numeric prices prevent currency conversion and parsing errors.'
    },
    {
      id: 'find-12',
      title: 'Catalog Syndication & Domain Architecture Ready',
      affectedCount: 'Store-Wide',
      detail: 'SSL certificates and XML sitemaps are verified and indexable.'
    }
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200/80 shadow-xs space-y-5 sm:space-y-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">
            Needs attention
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 tracking-tight mt-0.5">
            Catalog Issues & Source Actions
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-normal">
            Grouped by priority — resolve at store source (Shopify, WooCommerce, Catalog), then re-check to confirm.
          </p>
        </div>

        {onOpenActionCenter && (
          <button
            type="button"
            onClick={onOpenActionCenter}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>Open Action Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 3 Priority Tabs — Responsive 3-column on mobile */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 sm:flex sm:items-center border-b border-stone-200/70 pb-3">
        <button
          type="button"
          onClick={() => setActivePriorityTab('critical')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
            activePriorityTab === 'critical'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="leading-tight">Must Fix <span className="opacity-80 text-[10px] sm:text-xs font-normal sm:font-bold">(3<span className="hidden sm:inline"> issues</span>)</span></span>
        </button>

        <button
          type="button"
          onClick={() => setActivePriorityTab('improvement')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
            activePriorityTab === 'improvement'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span className="leading-tight">Improve <span className="opacity-80 text-[10px] sm:text-xs font-normal sm:font-bold">(5<span className="hidden sm:inline"> issues</span>)</span></span>
        </button>

        <button
          type="button"
          onClick={() => setActivePriorityTab('good')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center ${
            activePriorityTab === 'good'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span className="leading-tight">Healthy <span className="opacity-80 text-[10px] sm:text-xs font-normal sm:font-bold">(4<span className="hidden sm:inline"> items</span>)</span></span>
        </button>
      </div>

      {/* Tab Content 1: Must Fix (Critical) */}
      {activePriorityTab === 'critical' && (
        <div className="space-y-4">
          {criticalFindings.map((finding) => {
            const isExpanded = expandedFindingId === finding.id;
            return (
              <div 
                key={finding.id} 
                className="rounded-2xl border border-rose-200 bg-rose-50/30 overflow-hidden transition-all"
              >
                {/* Header row */}
                <div 
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-rose-50/60"
                  onClick={() => setExpandedFindingId(isExpanded ? null : finding.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                      <h4 className="text-sm font-bold text-stone-900">
                        {finding.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        {finding.affectedCount}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">
                      <strong>Impact:</strong> {finding.impactText}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <span className="text-xs font-bold text-rose-700 hidden sm:inline">
                      {isExpanded ? 'Collapse Details' : 'View Affected Products'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-rose-700" /> : <ChevronDown className="w-4 h-4 text-rose-700" />}
                  </div>
                </div>

                {/* Expanded Details & Affected Products Drill-Down */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-rose-100 bg-white space-y-4">
                    {/* Solution instruction */}
                    <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 flex items-start gap-3">
                      <Wrench className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div className="text-xs text-orange-950">
                        <strong className="block text-orange-900 font-bold mb-0.5">Action at Source:</strong>
                        {finding.recommendedAction} — After updating in your Shopify or WooCommerce admin, click Re-check to verify changes.
                      </div>
                    </div>

                    {/* Products Affected List */}
                    {finding.productsAffected && finding.productsAffected.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-700 block">
                          Affected Products ({finding.productsAffected.length} sample items):
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {finding.productsAffected.map((prod) => (
                            <div 
                              key={prod.id} 
                              className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-orange-300 transition-colors"
                            >
                              <div className="space-y-1">
                                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                                  <Package className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                                  <span>{prod.name}</span>
                                </div>
                                <div className="text-[11px] text-rose-700 flex flex-wrap gap-1">
                                  <span>Missing:</span>
                                  {prod.missing.map((m, idx) => (
                                    <span key={idx} className="bg-rose-100/70 text-rose-900 px-1.5 py-0.2 rounded text-[10px] font-medium">
                                      {m}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onInspectProduct) {
                                    onInspectProduct(prod.id, prod.name);
                                  }
                                }}
                                className="w-full sm:w-auto text-center px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                              >
                                Audit Product →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content 2: Improve */}
      {activePriorityTab === 'improvement' && (
        <div className="space-y-4">
          {improvementFindings.map((finding) => {
            const isExpanded = expandedFindingId === finding.id;
            return (
              <div 
                key={finding.id} 
                className="rounded-2xl border border-amber-200 bg-amber-50/30 overflow-hidden transition-all"
              >
                {/* Header row */}
                <div 
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-amber-50/60"
                  onClick={() => setExpandedFindingId(isExpanded ? null : finding.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      <h4 className="text-sm font-bold text-stone-900">
                        {finding.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {finding.affectedCount}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600">
                      <strong>Impact:</strong> {finding.impactText}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <span className="text-xs font-bold text-amber-800 hidden sm:inline">
                      {isExpanded ? 'Collapse Details' : 'View Affected Products'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-800" /> : <ChevronDown className="w-4 h-4 text-amber-800" />}
                  </div>
                </div>

                {/* Expanded Details & Affected Products Drill-Down */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-amber-100 bg-white space-y-4">
                    {/* Solution instruction */}
                    <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                      <Wrench className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-950">
                        <strong className="block text-amber-900 font-bold mb-0.5">Action at Source:</strong>
                        {finding.recommendedAction} — After updating in your Shopify or WooCommerce admin, click Re-check to verify changes.
                      </div>
                    </div>

                    {/* Products Affected List */}
                    {finding.productsAffected && finding.productsAffected.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-700 block">
                          Affected Products ({finding.productsAffected.length} sample items):
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {finding.productsAffected.map((prod) => (
                            <div 
                              key={prod.id} 
                              className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3 hover:border-amber-300 transition-colors"
                            >
                              <div className="space-y-1">
                                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                                  <Package className="w-3.5 h-3.5 text-stone-500" />
                                  <span>{prod.name}</span>
                                </div>
                                <div className="text-[11px] text-amber-800 flex flex-wrap gap-1">
                                  <span>Missing:</span>
                                  {prod.missing.map((m, idx) => (
                                    <span key={idx} className="bg-amber-100/70 text-amber-900 px-1.5 py-0.2 rounded text-[10px] font-medium">
                                      {m}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onInspectProduct) {
                                    onInspectProduct(prod.id, prod.name);
                                  }
                                }}
                                className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-black text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                              >
                                Audit Product →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content 3: Healthy (Good / Passed) */}
      {activePriorityTab === 'good' && (
        <div className="space-y-3">
          {goodFindings.map((finding) => (
            <div 
              key={finding.id} 
              className="p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                    {finding.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {finding.affectedCount}
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  {finding.detail}
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-700 shrink-0">
                Verified Healthy ✓
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
