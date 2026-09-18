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
    id: 'starter',
    name: 'Starter',
    badge: 'Standard Catalog',
    priceMonthly: 49,
    priceAnnualMonthly: 39,
    productCapacity: 100,
    description: 'Entry-level product intelligence for emerging brands and curated DTC specialty catalogs.',
    features: {
      productCapacity: 'Up to 100 products',
      productIntelligence: true,
      evidenceIntelligence: true,
      offerIntelligence: true,
      buyerIntent: true,
      discoveryIntelligence: true,
      monitoring: 'Standard monitoring (24h cadence)',
      recoveryIntelligence: 'Standard recovery & gap triage',
      sourceConnections: 'Standard connectors (Shopify, GMC)',
      apiInfrastructure: false
    },
    recommendedFor: 'Catalogs with fewer than 100 high-priority active SKUs'
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Current Plan',
    highlight: true,
    priceMonthly: 299,
    priceAnnualMonthly: 239,
    productCapacity: 2000,
    description: 'High-coverage intelligence suite for growing omnichannel merchants with multi-source distribution.',
    features: {
      productCapacity: 'Up to 2,000 products',
      productIntelligence: true,
      evidenceIntelligence: true,
      offerIntelligence: true,
      buyerIntent: true,
      discoveryIntelligence: true,
      monitoring: 'Expanded monitoring (hourly cadence)',
      recoveryIntelligence: 'Enhanced arbitration & live diagnostics',
      sourceConnections: 'Expanded connectors (GDSN, RunRepeat, feeds)',
      apiInfrastructure: false
    },
    recommendedFor: 'Growing merchants needing continuous multi-channel offer & evidence reconciliation'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Custom Scale',
    priceMonthly: null,
    priceAnnualMonthly: null,
    productCapacity: 'Custom',
    description: 'Dedicated enterprise infrastructure, custom catalog partitions, and real-time headless API feeds.',
    features: {
      productCapacity: 'Custom (10,000+ products)',
      productIntelligence: true,
      evidenceIntelligence: true,
      offerIntelligence: true,
      buyerIntent: true,
      discoveryIntelligence: true,
      monitoring: 'Advanced real-time webhook monitors',
      recoveryIntelligence: 'Advanced automated ERP sync & custom rules',
      sourceConnections: 'Custom endpoints, EDI, direct PIM sync',
      apiInfrastructure: true
    },
    recommendedFor: 'Enterprise retailers and international brands with complex supply chains'
  }
];

export const currentSubscriptionData: CurrentSubscriptionState = {
  planId: 'pro',
  planName: 'Pro Plan',
  status: 'active',
  statusLabel: 'Active · Preview',
  billingCycle: 'monthly',
  currentPeriodStart: '2026-09-15',
  currentPeriodEnd: '2026-10-15',
  amount: 299,
  currency: 'USD',
  productCapacity: 2000,
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
    description: 'Active catalog validated at 24 monitored products (1.2% capacity utilized; 1,976 Products headroom available).',
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
    threshold: '100% of Product Quota (2,000 / 2,000)',
    behavior: 'All 2,000 active products remain continuously observed, verified, and monitored. Newly ingested products above 2,000 are staged in queue.',
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
