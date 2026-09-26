import { 
  BillingPlan, 
  CurrentSubscriptionState, 
  BillingHistoryRecord, 
  BillingEventRecord, 
  BillingPrinciple, 
  CapacityPolicyTier 
} from '../types/billing';

export const canonicalPlans: BillingPlan[] = [
  {
    id: 'free_10',
    name: 'Free',
    badge: 'Free Tier · 10 SKUs',
    priceMonthly: 0,
    priceAnnualMonthly: 0,
    productCapacity: 10,
    description: 'Full diagnostic audit and product intelligence foundation for up to 10 priority catalog products.',
    isPricingConfigured: true,
    pricingNote: 'Free forever · No credit card required',
    features: {
      productCapacity: '10 products',
      productIntelligence: true,
      evidenceIntelligence: true,
      offerIntelligence: true,
      buyerIntent: true,
      discoveryIntelligence: true,
      monitoring: 'Standard weekly audit',
      recoveryIntelligence: 'Deterministic gap triage',
      sourceConnections: 'Manual URL & CSV import',
      apiInfrastructure: false
    },
    recommendedFor: 'Merchants testing AI readiness on top 10 catalog items'
  },
  {
    id: 'paid_50',
    name: 'Catalog 50',
    badge: '50 SKUs',
    priceMonthly: 29,
    priceAnnualMonthly: 24,
    productCapacity: 50,
    description: 'Continuous multi-source intelligence and monitoring for emerging boutiques and focused DTC stores.',
    isPricingConfigured: true,
    pricingNote: 'Pricing Configuration · Tier Architecture',
    features: {
      productCapacity: 'Up to 50 products',
      productIntelligence: true,
      evidenceIntelligence: true,
      offerIntelligence: true,
      buyerIntent: true,
      discoveryIntelligence: true,
      monitoring: 'Daily autonomous monitoring',
      recoveryIntelligence: 'Guided Fix Center & verification',
      sourceConnections: 'Shopify connector + Google Merchant feed',
      apiInfrastructure: false
    },
    recommendedFor: 'Curated specialty DTC catalogs with up to 50 products'
  },
  {
    id: 'paid_150',
    name: 'Catalog 150',
    badge: '150 SKUs',
    priceMonthly: 79,
    priceAnnualMonthly: 64,
    productCapacity: 150,
    description: 'Expanded catalog coverage with daily drift detection and multi-channel feed validation.',
    isPricingConfigured: true,
    pricingNote: 'Pricing Configuration · Tier Architecture',
    features: {
      productCapacity: 'Up to 150 products',
      productIntelligence: true,
      evidenceIntelligence: true,
      offerIntelligence: true,
      buyerIntent: true,
      discoveryIntelligence: true,
      monitoring: 'Daily autonomous monitoring (12h cycle)',
      recoveryIntelligence: 'Enhanced arbitration & live diagnostics',
      sourceConnections: 'Shopify, GMC, and custom product feeds',
      apiInfrastructure: false
    },
    recommendedFor: 'Fast-growing brands managing up to 150 active products'
  },
  {
    id: 'paid_500',
    name: 'Catalog 500',
    badge: '500 SKUs · Current Plan',
    highlight: true,
    priceMonthly: 199,
    priceAnnualMonthly: 159,
    productCapacity: 500,
    description: 'Comprehensive product intelligence engine with hourly drift monitoring and full discovery feed export.',
    isPricingConfigured: true,
    pricingNote: 'Pricing Configuration · Tier Architecture',
    features: {
      productCapacity: 'Up to 500 products',
      productIntelligence: true,
      evidenceIntelligence: true,
      offerIntelligence: true,
      buyerIntent: true,
      discoveryIntelligence: true,
      monitoring: 'Hourly autonomous monitoring',
      recoveryIntelligence: 'Automated recovery queue & feed export',
      sourceConnections: 'Shopify, GMC, GS1 GDSN, marketplace feeds',
      apiInfrastructure: false
    },
    recommendedFor: 'Omnichannel retailers with up to 500 catalog items'
  },
  {
    id: 'paid_1000',
    name: 'Catalog 1,000',
    badge: '1,000 SKUs',
    priceMonthly: 349,
    priceAnnualMonthly: 279,
    productCapacity: 1000,
    description: 'High-volume catalog intelligence with priority queueing, dedicated channel feeds, and automated recovery.',
    isPricingConfigured: true,
    pricingNote: 'Pricing Configuration · Tier Architecture',
    features: {
      productCapacity: 'Up to 1,000 products',
      productIntelligence: true,
      evidenceIntelligence: true,
      offerIntelligence: true,
      buyerIntent: true,
      discoveryIntelligence: true,
      monitoring: 'Continuous real-time sentinel',
      recoveryIntelligence: 'Multi-source arbitration & automated writeback',
      sourceConnections: 'All standard & high-throughput connectors',
      apiInfrastructure: true
    },
    recommendedFor: 'Established merchants with deep 1,000 SKU catalogs'
  },
  {
    id: 'paid_1000_plus',
    name: 'Scale 1,000+',
    badge: '1,000+ SKUs · Custom',
    priceMonthly: null,
    priceAnnualMonthly: null,
    productCapacity: '1,000+',
    description: 'Custom catalog partition infrastructure, dedicated server nodes, ERP integrations, and headless API access.',
    isPricingConfigured: true,
    pricingNote: 'Pricing Configuration · Custom Volume Agreement',
    features: {
      productCapacity: '1,000+ products (custom scale)',
      productIntelligence: true,
      evidenceIntelligence: true,
      offerIntelligence: true,
      buyerIntent: true,
      discoveryIntelligence: true,
      monitoring: 'Real-time webhook sentinel & custom SLAs',
      recoveryIntelligence: 'Enterprise ERP writeback & governance rules',
      sourceConnections: 'Direct PIM, ERP, EDI, custom APIs',
      apiInfrastructure: true
    },
    recommendedFor: 'Enterprise merchants and department stores with catalogs beyond 1,000 products'
  }
];

export const currentSubscriptionData: CurrentSubscriptionState = {
  planId: 'paid_500',
  planName: 'Catalog 500',
  status: 'active',
  statusLabel: 'Active · Preview',
  billingCycle: 'monthly',
  currentPeriodStart: '2026-09-15',
  currentPeriodEnd: '2026-10-15',
  amount: 199,
  currency: 'USD',
  productCapacity: 500,
  usedProducts: 24,
  observedVariants: 68,
  observedOffers: 42,
  monitoredSourcesCount: 4,
  activeIssuesCount: 8,
  paymentMethod: {
    brand: 'Visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2028,
    billingEmail: 'billing@aeropulse.athletics.com',
    isRepresentative: true
  }
};

export const sampleBillingHistory: BillingHistoryRecord[] = [
  {
    id: 'inv_2026_08_15',
    invoiceNumber: 'INV-PREV-2026-0815',
    date: '2026-08-15',
    description: 'Pro Subscription (Monthly)',
    planName: 'Pro Plan',
    amount: 299.00,
    currency: 'USD',
    status: 'preview',
    statusLabel: 'Preview · Simulated',
    periodStart: '2026-08-15',
    periodEnd: '2026-09-15',
    productsBilled: 24,
    items: [
      {
        description: 'Pro Product Intelligence Tier (Up to 2,000 Products)',
        quantity: 1,
        unitPrice: 299.00,
        amount: 299.00
      }
    ]
  },
  {
    id: 'inv_2026_07_15',
    invoiceNumber: 'INV-PREV-2026-0715',
    date: '2026-07-15',
    description: 'Pro Subscription (Monthly)',
    planName: 'Pro Plan',
    amount: 299.00,
    currency: 'USD',
    status: 'preview',
    statusLabel: 'Preview · Simulated',
    periodStart: '2026-07-15',
    periodEnd: '2026-08-15',
    productsBilled: 24,
    items: [
      {
        description: 'Pro Product Intelligence Tier (Up to 2,000 Products)',
        quantity: 1,
        unitPrice: 299.00,
        amount: 299.00
      }
    ]
  },
  {
    id: 'inv_2026_06_15',
    invoiceNumber: 'INV-PREV-2026-0615',
    date: '2026-06-15',
    description: 'Pro Subscription (Monthly)',
    planName: 'Pro Plan',
    amount: 299.00,
    currency: 'USD',
    status: 'preview',
    statusLabel: 'Preview · Simulated',
    periodStart: '2026-06-15',
    periodEnd: '2026-07-15',
    productsBilled: 24,
    items: [
      {
        description: 'Pro Product Intelligence Tier (Up to 2,000 Products)',
        quantity: 1,
        unitPrice: 299.00,
        amount: 299.00
      }
    ]
  },
  {
    id: 'inv_2026_05_15',
    invoiceNumber: 'INV-PREV-2026-0515',
    date: '2026-05-15',
    description: 'Pro Subscription (Monthly)',
    planName: 'Pro Plan',
    amount: 299.00,
    currency: 'USD',
    status: 'preview',
    statusLabel: 'Preview · Simulated',
    periodStart: '2026-05-15',
    periodEnd: '2026-06-15',
    productsBilled: 24,
    items: [
      {
        description: 'Pro Product Intelligence Tier (Up to 2,000 Products)',
        quantity: 1,
        unitPrice: 299.00,
        amount: 299.00
      }
    ]
  }
];

export const sampleBillingEvents: BillingEventRecord[] = [
  {
    id: 'evt-001',
    timestamp: '2026-09-15T00:00:00Z',
    title: 'Billing Cycle Renewed (Simulated)',
    description: 'Monthly intelligence cycle initiated for Pro Tier. Capacity confirmed at 2,000 SKUs.',
    category: 'cycle',
    badge: 'Representative Event'
  },
  {
    id: 'evt-002',
    timestamp: '2026-09-10T14:32:10Z',
    title: 'Source Connector Activated',
    description: 'GS1 GDSN Registry connection enabled. Multi-source evidence observation included without additional per-source surcharge.',
    category: 'connector',
    badge: 'Infrastructure'
  },
  {
    id: 'evt-003',
    timestamp: '2026-08-15T00:00:00Z',
    title: 'Billing Statement Generated (Simulated)',
    description: 'Monthly statement INV-PREV-2026-0815 issued for $299.00 under representative subscription state.',
    category: 'cycle',
    badge: 'Statement'
  },
  {
    id: 'evt-004',
    timestamp: '2026-08-02T09:15:00Z',
    title: 'Catalog Capacity Verified',
    description: 'Active catalog validated at 24 monitored products (4.8% capacity utilized; 476 Products headroom available).',
    category: 'capacity',
    badge: 'Audit'
  },
  {
    id: 'evt-005',
    timestamp: '2026-07-15T00:00:00Z',
    title: 'Billing Statement Generated (Simulated)',
    description: 'Monthly statement INV-PREV-2026-0715 issued for $299.00 under representative subscription state.',
    category: 'cycle',
    badge: 'Statement'
  }
];

export const sampleCapacityPolicyTiers: CapacityPolicyTier[] = [
  {
    id: 'approaching',
    title: 'Approaching Capacity',
    threshold: '80% – 99% of Product Quota',
    behavior: 'Proactive dashboard banner and email advisory. Existing monitored products continue full real-time intelligence coverage without interruption.',
    actionRequired: 'Optional: Review inactive catalog items or plan for voluntary upgrade to larger capacity tier.',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10'
  },
  {
    id: 'at_capacity',
    title: 'At Capacity',
    threshold: '100% of Product Quota (500 / 500)',
    behavior: 'All 500 active products remain continuously observed, verified, and monitored. Newly ingested products above 500 are staged in queue.',
    actionRequired: 'Merchant decision: Authorize capacity upgrade or archive discontinued products to free up active slots.',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10'
  },
  {
    id: 'over_capacity',
    title: 'Over Capacity Policy',
    threshold: 'Surplus Ingestion Requests',
    behavior: 'AIXSHOP strictly never charges surprise automated overage fees. We never silently auto-upgrade your monthly invoice without explicit merchant consent.',
    actionRequired: 'Zero automated surprise charges. Plan upgrades require merchant action through authenticated billing settings.',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
  }
];

export const sampleBillingPrinciples: BillingPrinciple[] = [
  {
    id: 'prin-1',
    title: 'No Silent Upgrades',
    description: 'AIXSHOP never automatically bumps your tier or charges surprise overages when catalog thresholds are reached. Upgrades require explicit merchant authorization.',
    iconName: 'ShieldAlert'
  },
  {
    id: 'prin-2',
    title: 'No Hidden AI-Token Charges',
    description: 'We do not bill by prompt, completion token, or LLM chat query. You pay for continuous product intelligence capacity and structured infrastructure.',
    iconName: 'Coins'
  },
  {
    id: 'prin-3',
    title: 'Product Capacity Is Explicit',
    description: 'Pricing is anchored directly to the number of monitored parent products in your catalog. You always know your headroom and unit cost.',
    iconName: 'Package'
  },
  {
    id: 'prin-4',
    title: 'Offers & Variants Are Not Extra SKUs',
    description: 'Variants and multi-seller observed market offers are intelligence dimensions tied to the base product. They never consume separate billable product capacity seats.',
    iconName: 'GitBranch'
  },
  {
    id: 'prin-5',
    title: 'Deterministic Commercial Auditing',
    description: 'Every billing period, statement, and capacity audit is logged with full transparency. Receipts break down exactly what capacity was reserved.',
    iconName: 'FileCheck'
  },
  {
    id: 'prin-6',
    title: 'Payment Provider Security Separation',
    description: 'Production billing and card processing are handled via PCI-compliant external payment infrastructure. AIXSHOP never stores raw credit card details.',
    iconName: 'Lock'
  }
];
