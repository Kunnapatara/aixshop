import { CanonicalProductPreview } from '../types/landing';

export const sampleCanonicalProduct: CanonicalProductPreview = {
  id: 'prod_aero_pulse_01',
  brand: 'AeroPulse Athletics',
  name: 'VaporStride Carbon Elite',
  category: 'Running Shoes / Road Racing',
  canonicalId: 'AIX-PROD-8942-ROAD',
  gtin: '00849201948172',
  mpn: 'AP-VSE-BLK-10',
  heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
  summary: 'Dual-density PEBA cushioned marathon racing shoe with full-length carbon composite propulsion plate engineered for high-cadence road racing.',
  lowestObservedPrice: 199.00,
  officialPrice: 240.00,
  totalOffers: 3,
  facts: [
    {
      id: 'fact-1',
      name: 'Heel-to-Toe Drop',
      category: 'Biomechanics',
      value: '8 mm (Stack: 39mm heel / 31mm forefoot)',
      source: 'Brand Official Tech Sheet (JSON-LD Microdata)',
      detectedAt: '2 hours ago',
      confidence: 100,
      state: 'OBSERVED',
      note: 'Meets World Athletics stack height regulation (< 40mm).'
    },
    {
      id: 'fact-2',
      name: 'Shoe Weight (Men US 9)',
      category: 'Specifications',
      value: '204 g / 7.2 oz',
      source: 'Brand Spec Sheet',
      detectedAt: '2 hours ago',
      confidence: 99,
      state: 'OBSERVED',
      note: 'Verified from primary laboratory specification.'
    },
    {
      id: 'fact-3',
      name: 'Midsole Compound',
      category: 'Cushioning',
      value: 'Supercritical Nitrogen-Infused PEBA Foam',
      source: 'AeroPulse Lab Verification Portal',
      detectedAt: 'Yesterday',
      confidence: 100,
      state: 'MERCHANT_VERIFIED',
      note: 'Confirmed by brand product engineer.'
    },
    {
      id: 'fact-4',
      name: 'Gait / Pronation Profile',
      category: 'Fit & Support',
      value: 'Neutral (High-efficiency forward roll)',
      source: 'Extracted from user review syntax & run tests',
      detectedAt: '12 hours ago',
      confidence: 84,
      state: 'DERIVED',
      note: 'Inferred from torsional rigidity testing and geometry data.'
    },
    {
      id: 'fact-5',
      name: 'Upper Material Composition',
      category: 'Materials',
      value: 'Conflict: Matrix Mono-Mesh vs 100% Recycled Polyester',
      source: 'Brand Site vs Marketplace Feed',
      detectedAt: '3 hours ago',
      confidence: 62,
      state: 'CONFLICT',
      conflictDetails: {
        sourceA: { name: 'Brand Product Page', value: 'Proprietary Ultra-Weave Mono-Mesh' },
        sourceB: { name: 'Marketplace Feed', value: '100% Recycled Standard Polyester Mesh' }
      },
      note: 'Multiple authoritative channels conflict. Flagged for merchant confirmation.'
    },
    {
      id: 'fact-6',
      name: 'Arch Support Type',
      category: 'Fit & Support',
      value: 'Missing / Unspecified',
      source: 'None across 4 inspected sources',
      detectedAt: '2 hours ago',
      confidence: 0,
      state: 'MISSING',
      note: 'Crucial for runners with flat feet. Missing from all structured schemas.'
    },
    {
      id: 'fact-7',
      name: 'Outsole Rubber Compound',
      category: 'Durability',
      value: 'Zonal Liquid-Grip Rubber with Laser Siping',
      source: 'Technical Specifications Table',
      detectedAt: '2 hours ago',
      confidence: 98,
      state: 'OBSERVED',
      note: 'Wet-surface traction validated.'
    }
  ],
  offers: [
    {
      id: 'offer-1',
      sellerName: 'AeroPulse Official Flagship',
      sellerType: 'Official Store',
      price: 240.00,
      currency: 'USD',
      availability: 'In Stock',
      shipping: 'Free 2-Day Priority Shipping',
      returnPolicy: '30-Day Wear-Test Guarantee',
      detectedAt: '15 mins ago',
      isOfficial: true,
      buyUrl: 'https://example.com/aeropulse/vaporstride'
    },
    {
      id: 'offer-2',
      sellerName: 'FleetRunner Specialty Athletics',
      sellerType: 'Authorized Retailer',
      price: 219.00,
      currency: 'USD',
      availability: 'In Stock (4 pairs left)',
      shipping: 'Free Ground Shipping over $150',
      returnPolicy: '60-Day Unworn Returns',
      detectedAt: '42 mins ago',
      buyUrl: 'https://example.com/fleetrunner/vaporstride'
    },
    {
      id: 'offer-3',
      sellerName: 'ProVelocity Express on Marketplace',
      sellerType: 'Third-Party Marketplace',
      price: 199.00,
      currency: 'USD',
      availability: 'Low Stock (Sizes 9, 10 only)',
      shipping: '$14.95 Standard Courier',
      returnPolicy: 'Final Sale / Non-Returnable',
      detectedAt: '1 hour ago',
      buyUrl: 'https://example.com/marketplace/item/8942'
    }
  ],
  intents: [
    {
      id: 'intent-1',
      query: 'best marathon carbon plate running shoes for 2026',
      archetype: 'Discovery',
      isSupported: true,
      matchedFact: 'Carbon plate & Supercritical PEBA',
      diagnosticNote: 'Strong attribute alignment with competitive road racing intent.'
    },
    {
      id: 'intent-2',
      query: 'VaporStride Carbon Elite weight in grams',
      archetype: 'Specification',
      isSupported: true,
      matchedFact: '204 g / 7.2 oz',
      diagnosticNote: 'Directly answerable by AI engines; structured schema present.'
    },
    {
      id: 'intent-3',
      query: 'AeroPulse VaporStride vs Nike Vaporfly 3 comparison',
      archetype: 'Comparison',
      isSupported: true,
      matchedFact: '8mm drop / 39mm stack / PEBA foam',
      diagnosticNote: 'Direct physical specs enable AI agents to perform head-to-head comparison.'
    },
    {
      id: 'intent-4',
      query: 'is VaporStride Carbon Elite good for flat feet runners',
      archetype: 'Problem',
      isSupported: false,
      diagnosticNote: 'Unanswered: Arch Support attribute is currently MISSING in all data feeds.'
    },
    {
      id: 'intent-5',
      query: 'where to buy VaporStride on sale with return warranty',
      archetype: 'Purchase',
      isSupported: true,
      matchedFact: 'Multiple seller offers tracked ($199–$240)',
      diagnosticNote: 'Differentiates official warranty from non-returnable discount offers.'
    },
    {
      id: 'intent-6',
      query: 'can I use VaporStride for daily recovery training',
      archetype: 'Use Case',
      isSupported: false,
      diagnosticNote: 'Unanswered: Explicit training cadence and recovery guidelines missing in structured product payload.'
    },
    {
      id: 'intent-7',
      query: 'is AeroPulse an authentic brand with authorized warranty and certified returns',
      archetype: 'Trust',
      isSupported: false,
      diagnosticNote: 'Unanswered: Official merchant warranty policy & authorized reseller certificates are missing from payload.'
    }
  ],
  surfaces: [
    {
      surfaceId: 'surf-google-search',
      name: 'Traditional Search (Organic & Rich Snippets)',
      type: 'Search',
      readinessStatus: 'Gaps Detected',
      completenessPercentage: 74,
      diagnosticFinding: 'Missing ReturnPolicy in schema markup limits merchant trust signals in search rich snippets.'
    },
    {
      surfaceId: 'surf-ai-answer',
      name: 'AI Search / Answer Engines (ChatGPT, Gemini, Perplexity)',
      type: 'AI',
      readinessStatus: 'Ready',
      completenessPercentage: 88,
      diagnosticFinding: 'Physical specifications (plate, stack height, PEBA foam) are machine-readable and citeable.'
    },
    {
      surfaceId: 'surf-google-shopping',
      name: 'Commerce Feeds / Marketplaces',
      type: 'Commerce',
      readinessStatus: 'Needs Attention',
      completenessPercentage: 62,
      diagnosticFinding: 'Variant GTIN consistency requires verification across 2 distributor inventory feeds.'
    },
    {
      surfaceId: 'surf-aix-native',
      name: 'AIXSHOP Product Discovery',
      type: 'AIXSHOP',
      readinessStatus: 'Ready',
      completenessPercentage: 92,
      diagnosticFinding: 'Canonical product entity established with separate verified seller offer records.'
    }
  ]
};

import { CriticalFindingItem, AnalysisPipelineStage, InspectedEvidenceAttribute } from '../types/landing';
export type { InspectedEvidenceAttribute };

export const sampleAnalysisStages: AnalysisPipelineStage[] = [
  {
    id: 'stage-1',
    title: 'Resolving Product Identity',
    status: 'completed',
    description: 'Matching GTIN, MPN, Brand, and Model against global commerce identifiers.'
  },
  {
    id: 'stage-2',
    title: 'Extracting Product Facts',
    status: 'completed',
    description: 'Scanning structured JSON-LD microdata, specification tables, and product attributes.'
  },
  {
    id: 'stage-3',
    title: 'Mapping Specifications',
    status: 'completed',
    description: 'Normalizing technical attributes, biomechanics, dimensions, and materials.'
  },
  {
    id: 'stage-4',
    title: 'Separating Product & Offers',
    status: 'completed',
    description: 'Decoupling intrinsic product attributes from seller-specific price, shipping, and inventory.'
  },
  {
    id: 'stage-5',
    title: 'Checking Evidence',
    status: 'completed',
    description: 'Verifying provenance, detecting conflicting sources, and flagging missing proof.'
  },
  {
    id: 'stage-6',
    title: 'Assessing Discovery Readiness',
    status: 'completed',
    description: 'Evaluating machine readability across 4 commerce discovery surfaces and 7 buyer intents.'
  }
];

export const sampleCriticalFindings: CriticalFindingItem[] = [
  {
    id: 'finding-1',
    severity: 'CRITICAL',
    title: 'Return policy evidence is missing',
    summary: 'No machine-readable return terms detected across product schemas or canonical offer data.',
    whatHappened: 'Commerce discovery adapters found zero structured return policy attributes (returnWindow, returnFees, or merchantGuarantee) in the product page markup.',
    whyItMatters: 'Commerce discovery surfaces and AI recommendation engines may not have enough verified information to represent the merchant’s return terms, leading to suppressed trust signals or exclusion from high-intent purchase recommendations.',
    evidenceState: 'MISSING',
    suggestedAction: 'Add structured merchantReturnPolicy schema or verify return terms directly in the AIXSHOP console.'
  },
  {
    id: 'finding-2',
    severity: 'WARNING',
    title: 'Variant GTIN consistency requires verification',
    summary: 'Discrepancy detected between the main product listing GTIN and authorized secondary distributor feeds.',
    whatHappened: 'The primary page reports GTIN 00849201948172, but an authorized retail distributor feed lists a mismatched barcode identifier for size variant US 10.',
    whyItMatters: 'Inconsistent GTINs cause AI search agents and Google Shopping to split one product into separate fragmented listings or mistakenly associate unauthorized third-party counterfeit offers.',
    evidenceState: 'CONFLICT',
    suggestedAction: 'Audit variant barcode master list and declare official canonical GTIN hierarchy for each SKU variant.'
  },
  {
    id: 'finding-3',
    severity: 'INFORMATION',
    title: 'Product identity successfully resolved',
    summary: 'Canonical entity established with high confidence across brand, model, and category taxonomies.',
    whatHappened: 'Brand "AeroPulse Athletics", Model "VaporStride Carbon Elite", and Category "Running Shoes / Road Racing" were cross-verified with 99.4% confidence score.',
    whyItMatters: 'A clearly resolved canonical identity enables discovery engines to aggregate all seller offers under your official product graph without attribute corruption.',
    evidenceState: 'OBSERVED',
    suggestedAction: 'Maintain this verified canonical record to anchor future multi-seller distributed commerce queries.'
  }
];

export const sampleInspectedAttributes: InspectedEvidenceAttribute[] = [
  {
    id: 'attr-weight',
    name: 'Weight',
    category: 'Technical Specifications',
    value: '320 g (US Men 9)',
    state: 'OBSERVED',
    source: 'Manufacturer product specification (JSON-LD Spec Table)',
    detectedAt: '2026-09-14',
    confidence: 'High',
    note: 'Extracted directly from authoritative brand specification sheet.'
  },
  {
    id: 'attr-carbon-plate',
    name: 'Carbon Plate',
    category: 'Biomechanics / Propulsion',
    value: 'Full-length carbon plate (Curved 3D Geometry)',
    state: 'MERCHANT_VERIFIED',
    source: 'AeroPulse Engineering Portal (Signed Verification)',
    detectedAt: '2026-09-12',
    confidence: 'High',
    note: 'Merchant verified by certified product director.'
  },
  {
    id: 'attr-return-policy',
    name: 'Return Policy',
    category: 'Customer Trust & Guarantee',
    value: 'Unknown / Unspecified',
    state: 'MISSING',
    source: 'Inspected 4 data sources — No return data',
    detectedAt: '2026-09-14',
    confidence: 'Unverified',
    note: 'Missing across all feeds. Discovery engines cannot verify buyer protection.'
  },
  {
    id: 'attr-upper-material',
    name: 'Upper Material',
    category: 'Materials & Construction',
    value: 'Conflict: Mesh upper vs Engineered synthetic upper',
    state: 'CONFLICT',
    source: 'Multiple conflicting authoritative sources',
    detectedAt: '2026-09-14',
    confidence: 'Medium',
    conflictDetails: {
      sourceA: { name: 'Source A: Brand Product Page', value: 'Mesh upper (Ultra-breathable open weave)' },
      sourceB: { name: 'Source B: Retailer Distributor Feed', value: 'Engineered synthetic upper (Coated poly-fiber)' }
    },
    note: 'AIXSHOP does not guess when evidence conflicts. Flagged for merchant confirmation.'
  },
  {
    id: 'attr-midsole',
    name: 'Midsole Compound',
    category: 'Cushioning & Foam',
    value: 'Supercritical Nitrogen-Infused PEBA Foam',
    state: 'MERCHANT_VERIFIED',
    source: 'AeroPulse Lab Verification Portal',
    detectedAt: '2026-09-12',
    confidence: 'High',
    note: 'Verified by brand product engineer; 85% energy return rating.'
  },
  {
    id: 'attr-drop',
    name: 'Heel-to-Toe Drop',
    category: 'Biomechanics',
    value: '8 mm (Stack: 39mm heel / 31mm forefoot)',
    state: 'OBSERVED',
    source: 'Brand Official Tech Sheet (JSON-LD Microdata)',
    detectedAt: '2026-09-14',
    confidence: 'High',
    note: 'Meets World Athletics stack height regulation (< 40mm).'
  },
  {
    id: 'attr-outsole',
    name: 'Outsole Rubber',
    category: 'Durability & Traction',
    value: 'Zonal Liquid-Grip Rubber with Laser Siping',
    state: 'OBSERVED',
    source: 'Laboratory Specifications Table',
    detectedAt: '2026-09-14',
    confidence: 'High',
    note: 'Optimized for wet road adhesion.'
  },
  {
    id: 'attr-arch-support',
    name: 'Arch Support',
    category: 'Fit & Ergonomics',
    value: 'Missing / Unspecified',
    state: 'MISSING',
    source: 'No structured schema or microdata found across 4 sources',
    detectedAt: '2026-09-14',
    confidence: 'Low',
    note: 'Crucial for runners with flat feet or overpronation. Missing from all structured schemas.'
  }
];

import { ProductVariantItem, IntelligenceTimelineEvent, IntelligenceGapItem } from '../types/landing';

export const sampleVariants: ProductVariantItem[] = [
  {
    id: 'var-1',
    variantName: 'Black / US 10',
    size: 'US 10',
    color: 'Onyx Black',
    variantId: 'AP-VSE-BLK-10',
    gtin: '00849201948172',
    evidenceState: 'OBSERVED',
    availability: 'In Stock',
    price: 240.00,
    diagnosticNote: 'Canonical reference SKU. GTIN verified in GS1 barcode database.'
  },
  {
    id: 'var-2',
    variantName: 'Black / US 10.5',
    size: 'US 10.5',
    color: 'Onyx Black',
    variantId: 'AP-VSE-BLK-105',
    gtin: '00849201948189',
    evidenceState: 'CONFLICT',
    availability: 'In Stock',
    price: 240.00,
    diagnosticNote: 'GTIN consistency requires verification. Distributor feed listed 00849201948999.'
  },
  {
    id: 'var-3',
    variantName: 'Black / US 11',
    size: 'US 11',
    color: 'Onyx Black',
    variantId: 'AP-VSE-BLK-11',
    gtin: '00849201948196',
    evidenceState: 'OBSERVED',
    availability: 'Low Stock',
    price: 240.00,
    diagnosticNote: 'Low inventory detected across 2 secondary channels.'
  },
  {
    id: 'var-4',
    variantName: 'White / US 10',
    size: 'US 10',
    color: 'Glacier White',
    variantId: 'AP-VSE-WHT-10',
    gtin: '00849201948202',
    evidenceState: 'OBSERVED',
    availability: 'In Stock',
    price: 240.00,
    diagnosticNote: 'Clean multi-channel match across primary retailer feeds.'
  },
  {
    id: 'var-5',
    variantName: 'White / US 10.5',
    size: 'US 10.5',
    color: 'Glacier White',
    variantId: 'AP-VSE-WHT-105',
    gtin: '00849201948219',
    evidenceState: 'OBSERVED',
    availability: 'Low Stock',
    price: 240.00,
    diagnosticNote: 'Verified canonical variant attributes.'
  }
];

export const sampleTimelineEvents: IntelligenceTimelineEvent[] = [
  {
    id: 'event-1',
    title: 'Product identity detected',
    timestamp: '2026-09-14 16:32 UTC',
    type: 'identity',
    description: 'GTIN 00849201948172 and MPN AP-VSE-BLK-10 resolved to AeroPulse Athletics VaporStride Carbon Elite.',
    source: 'Schema.org JSON-LD Microdata'
  },
  {
    id: 'event-2',
    title: 'Specification observed',
    timestamp: '2026-09-14 16:33 UTC',
    type: 'specification',
    description: 'Extracted weight (320g), 8mm drop, 39mm stack height, and carbon composite propulsion plate.',
    source: 'Technical Specifications Table'
  },
  {
    id: 'event-3',
    title: 'Evidence conflict detected',
    timestamp: '2026-09-14 16:34 UTC',
    type: 'conflict',
    description: 'Upper material discrepancy flagged: Brand page states "Mesh upper" while Distributor feed states "Engineered synthetic upper".',
    source: 'Multi-Source Evidence Adapter'
  },
  {
    id: 'event-4',
    title: 'Seller offers observed',
    timestamp: '2026-09-14 16:35 UTC',
    type: 'offer',
    description: 'Indexed 3 seller offers ($199–$240 USD) decoupled from canonical product specifications.',
    source: 'Marketplace Ingestion Feeds'
  },
  {
    id: 'event-5',
    title: 'Discovery diagnostic updated',
    timestamp: '2026-09-14 16:36 UTC',
    type: 'diagnostic',
    description: 'Machine readability evaluated across 4 surfaces; return policy identified as primary missing trust signal.',
    source: 'AIXSHOP Commerce Diagnostic Engine'
  }
];

export const sampleIntelligenceGaps: IntelligenceGapItem[] = [
  {
    id: 'gap-1',
    category: 'Missing',
    severity: 'Critical',
    title: 'Return policy evidence is missing',
    affectedEntity: 'Seller Terms & Trust Signals',
    currentState: 'MISSING',
    whyItMatters: 'AI discovery engines and Google Shopping exclude merchant trust badges when customer return terms cannot be verified.',
    evidenceNote: 'No structured merchantReturnPolicy schema detected across 4 inspected sources.'
  },
  {
    id: 'gap-2',
    category: 'Conflict',
    severity: 'Warning',
    title: 'Upper material conflict unresolved',
    affectedEntity: 'Technical Specifications (Materials)',
    currentState: 'CONFLICT',
    whyItMatters: 'Discovery agents give inconsistent answers to runners asking about breathability and weather resistance.',
    evidenceNote: 'Source A states "Mesh upper"; Source B states "Engineered synthetic upper". AIXSHOP does not guess.'
  },
  {
    id: 'gap-3',
    category: 'Needs Verification',
    severity: 'Warning',
    title: 'Variant GTIN consistency requires verification',
    affectedEntity: 'SKU Variant AP-VSE-BLK-105',
    currentState: 'CONFLICT',
    whyItMatters: 'Mismatched barcode values split search traffic and dilute canonical listing authority.',
    evidenceNote: 'Distributor feed listed 00849201948999 vs canonical 00849201948189.'
  },
  {
    id: 'gap-4',
    category: 'Complete',
    severity: 'Info',
    title: 'Canonical product identity resolved',
    affectedEntity: 'Global Identifiers & Taxonomy',
    currentState: 'OBSERVED',
    whyItMatters: 'Strong global identifier anchors your product across AI answer engines.',
    evidenceNote: 'High confidence cross-match across brand, model, and category registry.'
  }
];

export const sampleEvidenceAttributes = sampleInspectedAttributes;



