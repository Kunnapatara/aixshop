import { ShopperProductData } from '../types/shopper';

export const sampleShopperProduct: ShopperProductData = {
  identity: {
    brand: 'AeroPulse Athletics',
    model: 'VaporStride Carbon Elite',
    category: 'Running Shoes · Road Racing',
    gtin: '00849201948172',
    mpn: 'AP-VSE-2026-01',
    canonicalId: 'aix-prod-849201948172',
    status: 'Identity Resolved',
    evidenceState: 'MERCHANT_VERIFIED',
    publicRoute: '/p/vaporstride-carbon-elite',
    summary: 'Marathon competition road racing shoe featuring a full-length carbon-fiber propulsion plate and nitrogen-infused supercritical PEBA cushioning engineered for high-cadence distance performance.'
  },
  priceRange: {
    min: 199.00,
    max: 240.00,
    currency: 'USD',
    totalObserved: 3
  },
  facts: [
    {
      id: 'fact-weight',
      name: 'Weight',
      category: 'Specifications',
      value: '204g / 7.2 oz (Men US 9)',
      state: 'OBSERVED',
      shopperLabel: 'Observed from source',
      source: 'Manufacturer structured data (JSON-LD Product Microdata)',
      detectedAt: '2 hours ago',
      validUntil: '30 days from scan',
      confidence: 99,
      note: 'Extracted directly from AeroPulse official catalog specification table.'
    },
    {
      id: 'fact-plate',
      name: 'Plate Structure',
      category: 'Biomechanics',
      value: 'Full-length Carbon-fiber propulsion plate',
      state: 'MERCHANT_VERIFIED',
      shopperLabel: 'Verified by merchant',
      source: 'Merchant authoritative engineering signoff',
      detectedAt: 'Yesterday at 14:22 UTC',
      confidence: 100,
      note: 'Verified directly by AeroPulse Athletics lead product engineer.'
    },
    {
      id: 'fact-midsole',
      name: 'Midsole Compound',
      category: 'Cushioning',
      value: 'Supercritical Nitrogen-infused PEBA foam',
      state: 'OBSERVED',
      shopperLabel: 'Observed from source',
      source: 'Brand technical documentation',
      detectedAt: '3 hours ago',
      confidence: 96,
      note: 'Extracted from technical tear-down and official specification schema.'
    },
    {
      id: 'fact-drop',
      name: 'Heel-to-Toe Drop',
      category: 'Biomechanics',
      value: '8mm (Stack: 39mm heel / 31mm forefoot)',
      state: 'OBSERVED',
      shopperLabel: 'Observed from source',
      source: 'Manufacturer structured data',
      detectedAt: '2 hours ago',
      confidence: 98,
      note: 'Meets World Athletics competition road compliance limit (< 40mm stack).'
    },
    {
      id: 'fact-upper',
      name: 'Upper Material',
      category: 'Materials',
      value: 'Conflict: Engineered Mesh vs Synthetic Textile',
      state: 'CONFLICT',
      shopperLabel: 'Sources disagree',
      source: 'Manufacturer Direct Page vs Marketplace Feed',
      detectedAt: '1 hour ago',
      confidence: 50,
      note: 'AIXSHOP has not selected one value because available authoritative sources conflict.',
      conflictDetails: {
        sourceA: {
          name: 'Manufacturer Official Direct Page',
          value: 'Engineered Mesh (Mono-filament weave)',
          timestamp: 'Scanned 2 hours ago'
        },
        sourceB: {
          name: 'Authorized Retailer Product Catalog',
          value: 'Synthetic Textile (Standard woven knit)',
          timestamp: 'Scanned 4 hours ago'
        },
        explanation: 'Source A describes a technical mono-filament mesh, while Source B lists standard synthetic textile. AIXSHOP surfaces both rather than guessing.'
      }
    },
    {
      id: 'fact-category',
      name: 'Category',
      category: 'Specifications',
      value: 'Road Racing · Marathon Competition',
      state: 'OBSERVED',
      shopperLabel: 'Observed from source',
      source: 'Structured product taxonomy',
      detectedAt: '2 hours ago',
      confidence: 100,
      note: 'Classified under competitive distance road athletics.'
    },
    {
      id: 'fact-intended-use',
      name: 'Intended Use',
      category: 'Fit & Support',
      value: 'Competitive Road Running / High-Cadence Racing',
      state: 'DERIVED',
      shopperLabel: 'Derived from verified information',
      source: 'Derived from plate geometry, stack height, and outsole compound',
      detectedAt: '3 hours ago',
      confidence: 92,
      note: 'Synthesized from biomechanical specifications and propulsion geometry.'
    },
    {
      id: 'fact-returns',
      name: 'Return Policy',
      category: 'Commercial Policy',
      value: 'Not verified across feeds',
      state: 'MISSING',
      shopperLabel: 'Not verified',
      source: 'Missing from structured e-commerce feeds',
      detectedAt: 'Checked 1 hour ago',
      confidence: 0,
      note: 'No structured merchantReturnPolicy schema was observed. Each seller governs return terms individually.'
    }
  ],
  offers: [
    {
      id: 'offer-aeropulse-direct',
      sellerName: 'AeroPulse Direct',
      sellerType: 'Official Store',
      sellerStatus: 'Authorized Direct',
      price: 199.00,
      originalPrice: 240.00,
      currency: 'USD',
      availability: 'In Stock',
      availabilityDetail: 'Observed active product listing on brand portal',
      shipping: 'Unknown',
      shippingState: 'Unknown',
      returnPolicy: 'Unknown',
      returnPolicyState: 'Unknown',
      promotion: 'None observed',
      promotionState: 'None Observed',
      source: 'Manufacturer Direct Online Store',
      observedAt: 'Observed 15 mins ago',
      evidenceState: 'OBSERVED',
      shopperLabel: 'Observed from source',
      isOfficial: true,
      visitUrl: 'https://shop.aeropulse.com/products/vaporstride-carbon-elite',
      notes: 'Direct manufacturer listing. Lowest observed snapshot price during recent observation pass.'
    },
    {
      id: 'offer-authorized-retailer',
      sellerName: 'Authorized Retailer (FleetRunner)',
      sellerType: 'Authorized Retailer',
      sellerStatus: 'Authorized Retailer',
      price: 219.00,
      originalPrice: 240.00,
      currency: 'USD',
      availability: 'Limited Stock',
      availabilityDetail: 'Limited inventory recorded on merchant storefront',
      shipping: 'Unknown',
      shippingState: 'Unknown',
      returnPolicy: '30 days',
      returnPolicyState: 'Observed',
      promotion: 'None observed',
      promotionState: 'None Observed',
      source: 'Authorized Partner Merchant Feed',
      observedAt: 'Observed 42 mins ago',
      evidenceState: 'OBSERVED',
      shopperLabel: 'Observed from source',
      isOfficial: false,
      visitUrl: 'https://fleetrunner-athletics.example.com/item/aero-vse',
      notes: 'Authorized retail distribution partner. 30-day return window observed in merchant terms.'
    },
    {
      id: 'offer-marketplace-seller',
      sellerName: 'Marketplace Seller (ProVelocity)',
      sellerType: 'Third-Party Marketplace',
      sellerStatus: 'Marketplace Seller',
      price: 240.00,
      currency: 'USD',
      availability: 'In Stock',
      availabilityDetail: 'Third-party seller merchant listing',
      shipping: 'Unknown',
      shippingState: 'Unknown',
      returnPolicy: 'Unknown',
      returnPolicyState: 'Unknown',
      promotion: 'Member offer ($10 loyalty credit)',
      promotionState: 'Observed',
      source: 'Marketplace Product Feed Snapshot',
      observedAt: 'Observed 1 hour ago',
      evidenceState: 'OBSERVED',
      shopperLabel: 'Observed from source',
      isOfficial: false,
      visitUrl: 'https://marketplace.example.com/provelocity/vaporstride-carbon',
      notes: 'Secondary marketplace merchant. Loyalty credit promotion detected in feed.'
    }
  ],
  intents: [
    {
      id: 'intent-discovery',
      archetype: 'Discovery',
      question: 'What type of product is this?',
      isAnswerable: true,
      answerSummary: 'A high-cadence road marathon racing shoe designed with lightweight geometry and a full-length carbon propulsion plate.',
      evidenceBasis: 'Observed Category, Plate Structure, and Drop specifications.'
    },
    {
      id: 'intent-problem',
      archetype: 'Problem',
      question: 'What need is it designed to address?',
      isAnswerable: true,
      answerSummary: 'Maximizing energy return and minimizing muscular fatigue over 21K to 42K road running distances.',
      evidenceBasis: 'Observed PEBA midsole compound and carbon propulsion plate mechanics.'
    },
    {
      id: 'intent-comparison',
      archetype: 'Comparison',
      question: 'How does it differ from alternatives or other offers?',
      isAnswerable: true,
      answerSummary: 'Features an 8mm drop with a 39mm stack height. Three seller offers differ by $41 across price and return policy terms.',
      evidenceBasis: 'Observed specifications table and 3 observed seller offer records.'
    },
    {
      id: 'intent-specification',
      archetype: 'Specification',
      question: 'What are the measurable product attributes?',
      isAnswerable: true,
      answerSummary: 'Weight: 320g; Drop: 8mm; Stack: 39mm/31mm; Midsole: Supercritical PEBA; Plate: Carbon composite.',
      evidenceBasis: 'Manufacturer structured data and merchant engineering verification.'
    },
    {
      id: 'intent-purchase',
      archetype: 'Purchase',
      question: 'What seller offers have been observed?',
      isAnswerable: true,
      answerSummary: 'Three observed offers ranging from $199.00 to $240.00 observed between 15 and 60 minutes ago.',
      evidenceBasis: 'Observed offer snapshots from AeroPulse Direct, FleetRunner, and Marketplace.',
      limitations: 'Offer availability and pricing are time-dependent snapshots, not live guarantees.'
    },
    {
      id: 'intent-use-case',
      archetype: 'Use Case',
      question: 'Who is this product designed for?',
      isAnswerable: true,
      answerSummary: 'Neutral-pronation runners seeking high-speed road racing and marathon personal best attempts.',
      evidenceBasis: 'Derived biomechanics profile and stack height regulation compliance.'
    },
    {
      id: 'intent-trust',
      archetype: 'Trust',
      question: 'Which claims are supported by evidence?',
      isAnswerable: true,
      answerSummary: 'Product identity and specifications are corroborated by manufacturer structured feeds; upper material remains in conflict.',
      evidenceBasis: 'AIXSHOP provenance records. Upper material disagreement is explicitly exposed.'
    }
  ],
  canVerify: [
    {
      id: 'verify-identity',
      title: 'Canonical Product Identity',
      description: 'GTIN 00849201948172 and MPN AP-VSE-2026-01 match manufacturer barcodes and catalog index.',
      evidenceRef: 'GS1 Barcode Validation & Manufacturer Microdata'
    },
    {
      id: 'verify-manufacturer',
      title: 'Manufacturer Source Detected',
      description: 'Direct authoritative data feed confirmed from AeroPulse Athletics official domain.',
      evidenceRef: 'JSON-LD Product Microdata Schema'
    },
    {
      id: 'verify-weight',
      title: 'Physical Weight Specification',
      description: '320g specification confirmed via manufacturer primary engineering specifications.',
      evidenceRef: 'Engineering Laboratory Spec Sheet'
    },
    {
      id: 'verify-plate',
      title: 'Carbon Plate Mechanics',
      description: 'Full-length carbon composite plate architecture formally verified by merchant engineering.',
      evidenceRef: 'Merchant Authoritative Signoff'
    },
    {
      id: 'verify-offers',
      title: 'Three Distinct Observed Offers',
      description: 'Multiple active seller offerings successfully separated from the underlying canonical product.',
      evidenceRef: 'Observed Offer Snapshots'
    }
  ],
  cannotVerify: [
    {
      id: 'unverified-inventory',
      title: 'Current Physical Warehouse Inventory',
      description: 'AIXSHOP records observed snapshot availability, not real-time physical warehouse stock counts.'
    },
    {
      id: 'unverified-shipping',
      title: 'Actual Transit Delivery Time',
      description: 'Carrier transit times, localized regional delays, and warehouse processing windows are not observed.'
    },
    {
      id: 'unverified-return',
      title: 'Universal Return Policy Terms',
      description: 'No structured merchant return policy schema was detected for direct and marketplace offers.'
    },
    {
      id: 'unverified-upper-material',
      title: 'Conflicting Upper Material Claims',
      description: 'Source A reports Engineered Mesh while Source B reports Synthetic Textile. Unresolved conflict.'
    },
    {
      id: 'unverified-search-visibility',
      title: 'External Search Engine Ranking',
      description: 'AIXSHOP does not guarantee external AI engine answer visibility or third-party ranking placement.'
    }
  ],
  timeline: [
    {
      id: 'time-1',
      timeframe: '15 mins ago',
      title: 'Offer Observation Recorded',
      source: 'AeroPulse Direct Web Store',
      details: 'Price $199.00 USD and In Stock status detected during scheduled catalog observation pass.',
      state: 'OBSERVED'
    },
    {
      id: 'time-2',
      timeframe: '42 mins ago',
      title: 'Retail Partner Offer Recorded',
      source: 'FleetRunner Partner Feed',
      details: 'Price $219.00 USD and 30-day return policy recorded.',
      state: 'OBSERVED'
    },
    {
      id: 'time-3',
      timeframe: '2 hours ago',
      title: 'Weight & Biomechanics Detected',
      source: 'Manufacturer Structured Data',
      details: 'Weight 320g and 8mm heel-to-toe drop extracted from JSON-LD schema.',
      state: 'OBSERVED'
    },
    {
      id: 'time-4',
      timeframe: 'Yesterday',
      title: 'Carbon Plate Verification Confirmed',
      source: 'Merchant Authoritative Portal',
      details: 'Lead engineer confirmed carbon-fiber propulsion plate architecture.',
      state: 'MERCHANT_VERIFIED'
    },
    {
      id: 'time-5',
      timeframe: '3 days ago',
      title: 'Canonical Identity Resolved',
      source: 'GS1 & Barcode Registry',
      details: 'GTIN 00849201948172 mapped to canonical product aix-prod-849201948172.',
      state: 'MERCHANT_VERIFIED'
    }
  ],
  whatWeKnow: {
    identity: 'Resolved (GTIN 00849201948172)',
    specs: '7 of 8 attributes verified or observed',
    offers: '3 distinct seller offers recorded',
    evidence: 'Mixed (Observed + Merchant Verified)',
    conflicts: '1 unresolved (Upper Material)'
  },
  whatNeedsCaution: [
    'Return policy structured evidence is missing across two observed sellers.',
    'Upper material sources conflict (Engineered Mesh vs Synthetic Textile).',
    'Offer pricing ($199–$240) and stock availability are time-dependent observations, not live guarantees.'
  ]
};

export const sampleSearchProducts = [
  {
    id: 'aix-prod-849201948172',
    name: 'VaporStride Carbon Elite',
    brand: 'AeroPulse Athletics',
    category: 'Road Racing',
    gtin: '00849201948172',
    priceRange: '$199 – $240',
    status: 'Identity Resolved',
    route: '/p/vaporstride-carbon-elite'
  },
  {
    id: 'aix-prod-712849103841',
    name: 'AeroPulse CloudRacer 2',
    brand: 'AeroPulse Athletics',
    category: 'Tempo Trainer',
    gtin: '00849201948999',
    priceRange: '$160 – $180',
    status: 'Identity Resolved',
    route: '/p/cloudracer-2'
  },
  {
    id: 'aix-prod-948102847192',
    name: 'HyperGrip Mountain Pro',
    brand: 'ApexTerrain Equipment',
    category: 'Trail Running',
    gtin: '00918237461928',
    priceRange: '$185 – $210',
    status: 'Evidence Mixed',
    route: '/p/hypergrip-mountain-pro'
  }
];
