// src/data/canonicalCatalog.ts
// AIXSHOP Authoritative Canonical Catalog & Telemetry Metrics
// Single source of truth for representative merchant, product identity, variants, and telemetry funnel

import { EvidenceState } from '../types/landing';

export interface CanonicalProductIdentity {
  id: string;
  gtin: string;
  mpn: string;
  baseModelSku: string;
  name: string;
  brand: string;
  category: string;
  categoryPath: string[];
  imageUrl: string;
}

export const CANONICAL_MERCHANT = {
  id: 'merch-aeropulse',
  name: 'AeroPulse Athletics',
  slug: 'aeropulse-athletics',
  domain: 'shop.aeropulse.com',
  country: 'US',
  currency: 'USD',
  tier: 'PRO',
  catalogSize: 24,
  activeChildVariants: 68,
  activeCommercialOffers: 42
} as const;

export const CANONICAL_REPRESENTATIVE_PRODUCT: CanonicalProductIdentity = {
  id: 'aix-prod-849201948172',
  gtin: '00849201948172',
  mpn: 'AP-VSE-BLK-10',
  baseModelSku: 'AP-VSE-2026-01',
  name: 'AeroPulse VaporStride Carbon Elite',
  brand: 'AeroPulse Athletics',
  category: 'Running Shoes',
  categoryPath: ['Footwear', 'Performance Running', 'Marathon Racing'],
  imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200'
};

// Aliases and standard legacy mappings to ensure 100% resolution across views
export const CANONICAL_PRODUCT_ID = CANONICAL_REPRESENTATIVE_PRODUCT.id;
export const CANONICAL_PRODUCT_GTIN = CANONICAL_REPRESENTATIVE_PRODUCT.gtin;
export const CANONICAL_PRODUCT_MPN = CANONICAL_REPRESENTATIVE_PRODUCT.mpn;
export const CANONICAL_PRODUCT_SKU = CANONICAL_REPRESENTATIVE_PRODUCT.baseModelSku;
export const CANONICAL_PRODUCT_NAME = CANONICAL_REPRESENTATIVE_PRODUCT.name;

// Canonical 5 Child Variants for the representative product
export const CANONICAL_REPRESENTATIVE_VARIANTS = [
  {
    id: 'var-vse-blk-100',
    variantSku: 'AP-VSE-BLK-10',
    parentProductId: CANONICAL_PRODUCT_ID,
    size: '10.0',
    color: 'Obsidian / Solar Red',
    gtin: '00849201948172',
    inventoryStatus: 'IN_STOCK',
    stockQuantity: 14
  },
  {
    id: 'var-vse-blk-105',
    variantSku: 'AP-VSE-BLK-105',
    parentProductId: CANONICAL_PRODUCT_ID,
    size: '10.5',
    color: 'Obsidian / Solar Red',
    gtin: '00849201948189',
    inventoryStatus: 'LOW_STOCK',
    stockQuantity: 3
  },
  {
    id: 'var-vse-blk-110',
    variantSku: 'AP-VSE-BLK-110',
    parentProductId: CANONICAL_PRODUCT_ID,
    size: '11.0',
    color: 'Obsidian / Solar Red',
    gtin: '00849201948196',
    inventoryStatus: 'IN_STOCK',
    stockQuantity: 9
  },
  {
    id: 'var-vse-wht-100',
    variantSku: 'AP-VSE-WHT-10',
    parentProductId: CANONICAL_PRODUCT_ID,
    size: '10.0',
    color: 'Summit White / Cyan',
    gtin: '00849201948202',
    inventoryStatus: 'IN_STOCK',
    stockQuantity: 12
  },
  {
    id: 'var-vse-wht-105',
    variantSku: 'AP-VSE-WHT-105',
    parentProductId: CANONICAL_PRODUCT_ID,
    size: '10.5',
    color: 'Summit White / Cyan',
    gtin: '00849201948219',
    inventoryStatus: 'OUT_OF_STOCK',
    stockQuantity: 0
  }
] as const;

// Canonical Telemetry Funnel & System-Wide KPIs
export const CANONICAL_TELEMETRY_FUNNEL = {
  rawObservations: 384,
  normalizedFacts: 240,
  provenanceEvidenceRecords: 194,
  resolvedProducts: 24,
  verifiedLocks: 42
} as const;

export const CANONICAL_SYSTEM_KPIS = {
  totalCatalogProducts: 24,
  totalChildVariants: 68,
  totalCommercialOffers: 42,
  openIssuesCount: 8,
  resolvedIssuesCount: 4,
  totalPreservedConflicts: 6,
  intelligenceCoveragePct: 78,
  evidenceCompletenessPct: 70,
  discoveryReadinessPct: 79,
  buyerIntentArchetypesCount: 7,
  discoverySurfacesCount: 4
} as const;
