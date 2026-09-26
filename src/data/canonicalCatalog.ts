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
  imageUrl: '/src/assets/images/hero_product_shoe_1790429818724.jpg'
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

// Authoritative Canonical Product Interface (One Product Domain)
export interface CanonicalCatalogProduct {
  id: string; // Canonical ID: aix-prod-849201948xxx
  legacySlug?: string; // Historical slug alias (e.g. prod-horizon-trail)
  name: string;
  brand: string;
  category: 'Running' | 'Outdoor' | 'Apparel' | 'Accessories' | 'Training';
  categoryPath: string[];
  sku: string; // Base model SKU
  gtin: string; // GS1 GTIN-14 / GTIN-13
  mpn: string; // Manufacturer Part Number
  modelNumber: string;
  variantCount: number;
  imageUrl: string;
  whatAIXShopKnows: string;
  whatAIXShopCannotVerify: string[];
  description: string;
  isPrimaryExample?: boolean;
}

// Authoritative 24 Products of AeroPulse Athletics (The Single Canonical Product Universe)
export const CANONICAL_CATALOG_PRODUCTS: CanonicalCatalogProduct[] = [
  // 0. Primary Representative Model
  {
    id: CANONICAL_PRODUCT_ID,
    legacySlug: 'prod-vaporstride-carbon-elite',
    name: CANONICAL_PRODUCT_NAME,
    brand: 'AeroPulse Athletics',
    category: 'Running',
    categoryPath: ['Footwear', 'Performance Running', 'Marathon Racing'],
    sku: CANONICAL_PRODUCT_SKU,
    gtin: CANONICAL_PRODUCT_GTIN,
    mpn: CANONICAL_PRODUCT_MPN,
    modelNumber: 'VSC-2024-X',
    variantCount: 12,
    imageUrl: '/src/assets/images/hero_product_shoe_1790429818724.jpg',
    whatAIXShopKnows: 'Weight (198g, Men US 9), Heel Drop (8mm), Full-length Carbon Plate, PEBA midsole verified via tech spec sheet.',
    whatAIXShopCannotVerify: [
      'Exact percentage of post-consumer recycled upper polyester',
      'Authorized return window across multi-brand third-party sellers'
    ],
    description: 'Flagship marathon road racing shoe with curved carbon propulsion plate and nitrogen-infused supercritical PEBA foam midsole.',
    isPrimaryExample: true
  },
  // 1. Horizon Trail Hydro
  {
    id: 'aix-prod-849201948450',
    legacySlug: 'prod-horizon-trail',
    name: 'AeroPulse Horizon Trail Hydro',
    brand: 'AeroPulse Athletics',
    category: 'Outdoor',
    categoryPath: ['Footwear', 'Trail Running', 'All-Weather Waterproof'],
    sku: 'AP-HTH-002',
    gtin: '0084012398450',
    mpn: 'AP-HTH-400',
    modelNumber: 'HTH-GTX-24',
    variantCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Vibram Megagrip rubber compound and rock plate presence corroborated across 3 retailers.',
    whatAIXShopCannotVerify: [
      'Waterproof membrane brand (HydroGuard vs Gore-Tex) differs across regional distributor feeds'
    ],
    description: 'Waterproof technical trail shoe engineered for alpine terrain with high-traction lug architecture and ballistic rock shield.'
  },
  // 2. ApexVelocity Spikes Pro
  {
    id: 'aix-prod-849201948499',
    legacySlug: 'prod-apex-spikes',
    name: 'ApexVelocity Spikes Pro',
    brand: 'AeroPulse Athletics',
    category: 'Running',
    categoryPath: ['Footwear', 'Track & Field', 'Sprint Spikes'],
    sku: 'AP-AVS-003',
    gtin: '0084012398499',
    mpn: 'AP-AVS-TRACK-01',
    modelNumber: 'AVS-PRO-01',
    variantCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: '6-pin spike layout with Pebax spike plate confirmed on factory spec sheet.',
    whatAIXShopCannotVerify: ['Replacement pin thread standard'],
    description: 'Ultra-lightweight sprint spike designed for 100m to 400m track events with rigid Pebax propulsion plate.'
  },
  // 3. HydroVest 10L Pro
  {
    id: 'aix-prod-849201948512',
    legacySlug: 'prod-hydrovest-10l',
    name: 'AeroPulse HydroVest 10L Pro',
    brand: 'AeroPulse Athletics',
    category: 'Accessories',
    categoryPath: ['Hydration & Packs', 'Running Vests', 'Ultra Endurance'],
    sku: 'AP-ACC-HV10',
    gtin: '0084012398512',
    mpn: 'AP-HV10-BK',
    modelNumber: 'HV-10L-2024',
    variantCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Ripstop 70D nylon fabric and front pole attachment loops observed in photos.',
    whatAIXShopCannotVerify: ['Total volume certification method across laboratory tests'],
    description: 'Ergonomic 10-liter hydration vest for ultramarathon and mountain trail running with dual soft flask harnesses.'
  },
  // 4. AeroCarbon Road TriSuit Speed
  {
    id: 'aix-prod-849201948544',
    legacySlug: 'prod-trisuit-aerocarbon',
    name: 'AeroCarbon Road TriSuit Speed',
    brand: 'AeroPulse Athletics',
    category: 'Apparel',
    categoryPath: ['Apparel', 'Triathlon', 'Race Suits'],
    sku: 'AP-APP-TS05',
    gtin: '0084012398544',
    mpn: 'AP-TS-SPEED-MEN',
    modelNumber: 'TS-AERO-24',
    variantCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Italian Dimple aero fabric on shoulders and micro-perforated back panel.',
    whatAIXShopCannotVerify: ['UPF rating certification compliance'],
    description: 'Aerodynamic one-piece triathlon race suit engineered with textured boundary-layer channel fabric.'
  },
  // 5. ApexStride Pro Marathoner
  {
    id: 'aix-prod-849201948577',
    legacySlug: 'prod-apexstride-marathoner',
    name: 'ApexStride Pro Marathoner',
    brand: 'AeroPulse Athletics',
    category: 'Running',
    categoryPath: ['Footwear', 'Performance Running', 'Long Distance'],
    sku: 'AP-ASM-006',
    gtin: '0084012398577',
    mpn: 'AP-ASM-MARATHON',
    modelNumber: 'ASM-M2-24',
    variantCount: 10,
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Dual-density nitrogen infused superfoam and carbon wing plate confirmed.',
    whatAIXShopCannotVerify: ['Heel stack tolerance between men and women lasts'],
    description: 'High-cushion carbon-plated marathon road trainer tuned for maximum energy conservation over 42.2 kilometers.'
  },
  // 6. CloudDrift Daily Trainer v3
  {
    id: 'aix-prod-849201948601',
    legacySlug: 'prod-clouddrift-v3',
    name: 'CloudDrift Daily Trainer v3',
    brand: 'AeroPulse Athletics',
    category: 'Running',
    categoryPath: ['Footwear', 'Daily Running', 'Neutral Cushion'],
    sku: 'AP-CDT-007',
    gtin: '0084012398601',
    mpn: 'AP-CDT-V3-MEN',
    modelNumber: 'CDT-300-24',
    variantCount: 14,
    imageUrl: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Engineered jacquard upper and high-abrasion rubber outsole confirmed.',
    whatAIXShopCannotVerify: ['Recycled foam compound ratio'],
    description: 'Reliable everyday neutral running shoe delivering balanced cushioning, smooth heel-to-toe transitions, and extended durability.'
  },
  // 7. AeroKnit Recovery Slide Cushion
  {
    id: 'aix-prod-849201948634',
    legacySlug: 'prod-aeroknit-slide',
    name: 'AeroKnit Recovery Slide Cushion',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    categoryPath: ['Footwear', 'Recovery', 'Post-Run Slides'],
    sku: 'AP-REC-008',
    gtin: '0084012398634',
    mpn: 'AP-REC-SLIDE-01',
    modelNumber: 'REC-SL-24',
    variantCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Dual-density EVA foam and textured footbed cradle modeled accurately.',
    whatAIXShopCannotVerify: ['Antimicrobial top-sheet wash longevity'],
    description: 'Therapeutic post-workout recovery slide featuring deep anatomical arch support and plush impact absorption foam.'
  },
  // 8. AeroTempo Thermal Half-Zip
  {
    id: 'aix-prod-849201948668',
    legacySlug: 'prod-tempo-halfzip',
    name: 'AeroTempo Thermal Half-Zip',
    brand: 'AeroPulse Athletics',
    category: 'Apparel',
    categoryPath: ['Apparel', 'Tops', 'Cold Weather Midlayers'],
    sku: 'AP-APP-THZ09',
    gtin: '0084012398668',
    mpn: 'AP-HZ-THERMAL-M',
    modelNumber: 'HZ-TH-24',
    variantCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Brushed fleece interior and YKK semi-autolock zipper verified.',
    whatAIXShopCannotVerify: ['Reflective tape candlepower coefficient'],
    description: 'Technical grid-fleece running midlayer with integrated thumbhole cuffs and 360-degree reflective visibility bands.'
  },
  // 9. AeroPulse TrailGaiter Low Pro
  {
    id: 'aix-prod-849201948692',
    legacySlug: 'prod-trailgaiter-pro',
    name: 'AeroPulse TrailGaiter Low Pro',
    brand: 'AeroPulse Athletics',
    category: 'Accessories',
    categoryPath: ['Accessories', 'Trail Accessories', 'Gaiters'],
    sku: 'AP-ACC-TG10',
    gtin: '0084012398692',
    mpn: 'AP-TG-LOW-01',
    modelNumber: 'TG-LOW-24',
    variantCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Abrasion-resistant elastane stretch fabric and rear velcro tab verified.',
    whatAIXShopCannotVerify: ['Compatibility with external shoe brands lacking heel velcro'],
    description: 'Low-profile stretch trail gaiter providing debris and gravel barrier protection without restricting ankle mobility.'
  },
  // 10. CoreImpact Cast Iron Kettlebell 16kg
  {
    id: 'aix-prod-849201948725',
    legacySlug: 'prod-coreimpact-kb',
    name: 'CoreImpact Cast Iron Kettlebell 16kg',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    categoryPath: ['Equipment', 'Strength & Conditioning', 'Kettlebells'],
    sku: 'AP-TRN-KB16',
    gtin: '0084012398725',
    mpn: 'AP-KB-16KG-POWDER',
    modelNumber: 'KB-16-24',
    variantCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Single-piece gravity cast iron with color-coded handle bands.',
    whatAIXShopCannotVerify: ['Tolerance weight variance (+/- 1%)'],
    description: 'Commercial-grade gravity cast iron kettlebell coated in matte powder coat for superior grip retention.'
  },
  // 11. AeroStrobe NightVision Headlamp 400
  {
    id: 'aix-prod-849201948758',
    legacySlug: 'prod-aerostrobe-headlamp',
    name: 'AeroStrobe NightVision Headlamp 400',
    brand: 'AeroPulse Athletics',
    category: 'Accessories',
    categoryPath: ['Accessories', 'Lighting', 'Headlamps'],
    sku: 'AP-ACC-HL400',
    gtin: '0084012398758',
    mpn: 'AP-HL-400-LUMEN',
    modelNumber: 'HL-400-NV',
    variantCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'USB-C charging port, 400-lumen burst mode, and IPX7 immersion rating.',
    whatAIXShopCannotVerify: ['Battery cycle degradation threshold'],
    description: 'Rechargeable 400-lumen trail headlamp featuring reactive sensor dimming and wide-angle peripheral beam.'
  },
  // 12. AeroSprint Targeted Compression Tights
  {
    id: 'aix-prod-849201948791',
    legacySlug: 'prod-compression-tights',
    name: 'AeroSprint Targeted Compression Tights',
    brand: 'AeroPulse Athletics',
    category: 'Apparel',
    categoryPath: ['Apparel', 'Bottoms', 'Compression Tights'],
    sku: 'AP-APP-CT13',
    gtin: '0084012398791',
    mpn: 'AP-CT-MENS-BLK',
    modelNumber: 'CT-AERO-24',
    variantCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'High-filament nylon/elastane blend and flatlock anti-chafing seams verified.',
    whatAIXShopCannotVerify: ['Graduated compression gradient mmHG verification'],
    description: 'Graduated compression tights with anatomical muscle mapping zones to support quadricep and calf stabilization.'
  },
  // 13. AeroHydro Titanium Double-Wall Flask 750ml
  {
    id: 'aix-prod-849201948824',
    legacySlug: 'prod-hydroflask-750',
    name: 'AeroHydro Titanium Double-Wall Flask 750ml',
    brand: 'AeroPulse Athletics',
    category: 'Accessories',
    categoryPath: ['Hydration & Packs', 'Bottles & Flasks', 'Insulated'],
    sku: 'AP-ACC-FL750',
    gtin: '0084012398824',
    mpn: 'AP-FLASK-TI-750',
    modelNumber: 'FL-TI-24',
    variantCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Grade 1 titanium inner wall and vacuum seal technology verified.',
    whatAIXShopCannotVerify: ['Dishwasher safe thermal insulation integrity'],
    description: 'Ultra-durable vacuum-insulated pure titanium sports bottle offering featherweight thermal efficiency.'
  },
  // 14. AeroPulse TempoFlow Everyday Trainer
  {
    id: 'aix-prod-849201948857',
    legacySlug: 'prod-tempoflow-trainer',
    name: 'AeroPulse TempoFlow Everyday Trainer',
    brand: 'AeroPulse Athletics',
    category: 'Running',
    categoryPath: ['Footwear', 'Performance Running', 'Tempo & Interval'],
    sku: 'AP-TFT-015',
    gtin: '0084012398857',
    mpn: 'AP-TFT-GEN3',
    modelNumber: 'TFT-300',
    variantCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Weight (245g), 6mm drop, and dual-compound EVA/PEBA foam midsole.',
    whatAIXShopCannotVerify: ['Lifespan mileage benchmark across high-mileage runners'],
    description: 'Versatile speedwork and tempo shoe combining responsive supercritical foam with a rockered toe geometry.'
  },
  // 15. AeroPulse Velocity Carbon Pro 5K/10K
  {
    id: 'aix-prod-849201948880',
    legacySlug: 'prod-velocity-carbon-pro',
    name: 'AeroPulse Velocity Carbon Pro 5K/10K',
    brand: 'AeroPulse Athletics',
    category: 'Running',
    categoryPath: ['Footwear', 'Performance Running', 'Road Racing'],
    sku: 'AP-VCP-016',
    gtin: '0084012398880',
    mpn: 'AP-VCP-RACE',
    modelNumber: 'VCP-5K10K',
    variantCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Stack height (34mm heel / 28mm forefoot) and carbon fork plate confirmed.',
    whatAIXShopCannotVerify: ['Traction compound grip on wet painted road stripes'],
    description: 'Short-to-medium distance road racing weapon featuring aggressive carbon propulsion and ultra-light upper.'
  },
  // 16. AeroPulse TrailCore X Mountain Shoe
  {
    id: 'aix-prod-849201948913',
    legacySlug: 'prod-trailcore-x',
    name: 'AeroPulse TrailCore X Mountain Shoe',
    brand: 'AeroPulse Athletics',
    category: 'Outdoor',
    categoryPath: ['Footwear', 'Trail Running', 'Technical Mountain'],
    sku: 'AP-TCX-017',
    gtin: '0084012398913',
    mpn: 'AP-TCX-MTN',
    modelNumber: 'TCX-2024',
    variantCount: 10,
    imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Lug depth (5.0mm multidirectional) and Kevlar-reinforced side panels verified.',
    whatAIXShopCannotVerify: ['Gaiter attachment ring strength threshold'],
    description: 'Rugged mountain running shoe built with ballistic side protection and aggressive multi-surface claw lugs.'
  },
  // 17. AeroGlide Post-Run Recovery Mule
  {
    id: 'aix-prod-849201948946',
    legacySlug: 'prod-aeroglide-mule',
    name: 'AeroGlide Post-Run Recovery Mule',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    categoryPath: ['Footwear', 'Recovery', 'Mules'],
    sku: 'AP-REC-ML18',
    gtin: '0084012398946',
    mpn: 'AP-REC-MULE-UNISEX',
    modelNumber: 'MULE-REC-24',
    variantCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Arch support elevation (32mm contoured) and breathable vented forefoot.',
    whatAIXShopCannotVerify: ['Machine wash cycle temperature resistance'],
    description: 'Enclosed-toe recovery mule crafted from supportive bio-based foam to decompress joints after hard training.'
  },
  // 18. AeroZero Featherweight Race Singlet
  {
    id: 'aix-prod-849201948979',
    legacySlug: 'prod-aerozero-singlet',
    name: 'AeroZero Featherweight Race Singlet',
    brand: 'AeroPulse Athletics',
    category: 'Apparel',
    categoryPath: ['Apparel', 'Tops', 'Race Singlets'],
    sku: 'AP-APP-RS19',
    gtin: '0084012398979',
    mpn: 'AP-RS-MENS-AERO',
    modelNumber: 'RS-ZERO-24',
    variantCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: 'Garment weight (48g size M) and bonded seamless hem construction verified.',
    whatAIXShopCannotVerify: ['Anti-odor silver ion thread durability'],
    description: 'Sub-50-gram marathon competition singlet engineered with laser micro-perforations for zero cling.'
  },
  // 19. AeroPulse SpeedSplit 3" Racing Shorts
  {
    id: 'aix-prod-849201949002',
    legacySlug: 'prod-speedsplit-shorts',
    name: 'AeroPulse SpeedSplit 3" Racing Shorts',
    brand: 'AeroPulse Athletics',
    category: 'Apparel',
    categoryPath: ['Apparel', 'Bottoms', 'Split Shorts'],
    sku: 'AP-APP-SS20',
    gtin: '0084012399002',
    mpn: 'AP-SS-3INCH-M',
    modelNumber: 'SS-3IN-24',
    variantCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: '3-inch inseam, integrated gel pockets, and moisture-wicking brief liner confirmed.',
    whatAIXShopCannotVerify: ['Sweat retention weight delta'],
    description: 'Traditional split racing short engineered with ultralight stretch fabric and zero-bounce gel storage.'
  },
  // 20. ApexGrip Pure Magnesium Carbonate Chalk
  {
    id: 'aix-prod-849201949035',
    legacySlug: 'prod-apexgrip-chalk',
    name: 'ApexGrip Pure Magnesium Carbonate Chalk',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    categoryPath: ['Equipment', 'Grip & Chalk', 'Gym Chalk'],
    sku: 'AP-TRN-CH21',
    gtin: '0084012399035',
    mpn: 'AP-CHALK-8PACK',
    modelNumber: 'CH-MG-24',
    variantCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: '8x 56g blocks of 100% pure magnesium carbonate without drying additives.',
    whatAIXShopCannotVerify: ['Dust emission index'],
    description: 'Ultra-pure gymnastic and barbell training chalk block formulation for maximum moisture absorption.'
  },
  // 21. AeroPulse SpeedRope Dual-Bearing Speed Rope
  {
    id: 'aix-prod-849201949068',
    legacySlug: 'prod-speedrope-pro',
    name: 'AeroPulse SpeedRope Dual-Bearing Speed Rope',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    categoryPath: ['Equipment', 'Conditioning', 'Jump Ropes'],
    sku: 'AP-TRN-SR22',
    gtin: '0084012399068',
    mpn: 'AP-SR-BEARING-01',
    modelNumber: 'SR-PRO-24',
    variantCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: '3-meter adjustable wire cable and dual ball-bearing aluminum handles verified.',
    whatAIXShopCannotVerify: ['Outdoor asphalt cable abrasion lifespan'],
    description: 'High-rpm competition speed rope with knurled aviation aluminum handles and 360-degree rotation bearings.'
  },
  // 22. AeroPulse High-Density EPP Foam Roller 36"
  {
    id: 'aix-prod-849201949091',
    legacySlug: 'prod-foam-roller-36',
    name: 'AeroPulse High-Density EPP Foam Roller 36"',
    brand: 'AeroPulse Athletics',
    category: 'Training',
    categoryPath: ['Equipment', 'Mobility & Recovery', 'Foam Rollers'],
    sku: 'AP-TRN-FR23',
    gtin: '0084012399091',
    mpn: 'AP-FR-36INCH-EPP',
    modelNumber: 'FR-EPP-36',
    variantCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: '36 inch x 6 inch diameter solid molded expanded polypropylene core.',
    whatAIXShopCannotVerify: ['Compression set percentage after 5 years'],
    description: 'Full-length high-density EPP foam roller providing firm, unyielding deep-tissue myofascial release.'
  },
  // 23. AeroPulse Ultralight Race Day Perforated Cap
  {
    id: 'aix-prod-849201949124',
    legacySlug: 'prod-raceday-cap',
    name: 'AeroPulse Ultralight Race Day Perforated Cap',
    brand: 'AeroPulse Athletics',
    category: 'Accessories',
    categoryPath: ['Accessories', 'Headwear', 'Running Caps'],
    sku: 'AP-ACC-RC24',
    gtin: '0084012399124',
    mpn: 'AP-RC-AERO-CAP',
    modelNumber: 'RC-CAP-24',
    variantCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000',
    whatAIXShopKnows: '32g weight, UPF 50+ brim, and laser-perforated cooling side panels.',
    whatAIXShopCannotVerify: ['Brim flotation in saltwater'],
    description: 'Featherweight moisture-wicking running cap with flexible packable visor and anti-glare dark undervisor.'
  }
];

// Helper Functions for Canonical Product Domain Resolution
export function getCanonicalProducts(): CanonicalCatalogProduct[] {
  return CANONICAL_CATALOG_PRODUCTS;
}

export function getCanonicalProductById(idOrSlug: string): CanonicalCatalogProduct | undefined {
  if (!idOrSlug) return undefined;
  return CANONICAL_CATALOG_PRODUCTS.find(p => p.id === idOrSlug || p.legacySlug === idOrSlug);
}

export function resolveCanonicalProductId(idOrSlug: string): string {
  if (!idOrSlug) return CANONICAL_PRODUCT_ID;
  const match = getCanonicalProductById(idOrSlug);
  return match ? match.id : idOrSlug;
}

