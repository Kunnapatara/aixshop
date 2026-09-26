export type BillingPlanTier = 
  | 'free_10' 
  | 'paid_50' 
  | 'paid_150' 
  | 'paid_500' 
  | 'paid_1000' 
  | 'paid_1000_plus'
  | 'starter' 
  | 'pro' 
  | 'enterprise';

export type BillingCycle = 'monthly' | 'annual';

export interface PlanFeature {
  name: string;
  included: boolean;
  note?: string;
}

export interface BillingPlan {
  id: BillingPlanTier;
  name: string;
  badge?: string;
  priceMonthly: number | null; // null for custom / 1,000+
  priceAnnualMonthly: number | null; // discounted monthly rate if billed annually
  productCapacity: number | string; // 10, 50, 150, 500, 1000, "1,000+"
  description: string;
  highlight?: boolean;
  isPricingConfigured?: boolean; // clearly indicates tier pricing configuration
  pricingNote?: string;
  features: {
    productCapacity: string;
    productIntelligence: boolean | string;
    evidenceIntelligence: boolean | string;
    offerIntelligence: boolean | string;
    buyerIntent: boolean | string;
    discoveryIntelligence: boolean | string;
    monitoring: string;
    recoveryIntelligence: string;
    sourceConnections: string;
    apiInfrastructure: boolean | string;
  };
  recommendedFor: string;
}

export interface CurrentSubscriptionState {
  planId: BillingPlanTier;
  planName: string;
  status: 'active' | 'trial' | 'past_due' | 'canceled';
  statusLabel: string;
  billingCycle: BillingCycle;
  currentPeriodStart: string; // ISO date
  currentPeriodEnd: string; // ISO date
  amount: number;
  currency: string;
  productCapacity: number;
  usedProducts: number;
  observedVariants: number;
  observedOffers: number;
  monitoredSourcesCount: number;
  activeIssuesCount: number;
  paymentMethod: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    billingEmail: string;
    isRepresentative: boolean;
  };
}

export interface BillingHistoryRecord {
  id: string;
  invoiceNumber: string;
  date: string;
  description: string;
  planName: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'preview';
  statusLabel: string;
  periodStart: string;
  periodEnd: string;
  productsBilled: number;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
}

export interface BillingEventRecord {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  category: 'cycle' | 'capacity' | 'connector' | 'audit' | 'preview';
  badge: string;
}

export interface BillingPrinciple {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CapacityPolicyTier {
  id: string;
  title: string;
  threshold: string;
  behavior: string;
  actionRequired: string;
  badgeColor: string;
}
