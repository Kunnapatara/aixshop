/**
 * AIXSHOP — Canonical Merchant Navigation Configuration & Types
 * Single authoritative source of truth for merchant navigation items,
 * secondary dropdown destinations, and tab resolution.
 */

export type MerchantTab = 
  | 'home' 
  | 'catalog' 
  | 'issues' 
  | 'readiness' 
  | 'offers' 
  | 'monitoring' 
  | 'analytics' 
  | 'integrations' 
  | 'billing' 
  | 'report'
  // Backward compatibility aliases
  | 'overview' 
  | 'products' 
  | 'discovery';

export interface MerchantNavItem {
  id: 'home' | 'catalog' | 'issues' | 'readiness';
  label: string;
  iconName: string;
  badgeType?: 'count' | 'percentage' | 'alert';
}

export interface MerchantMoreItem {
  id: 'offers' | 'monitoring' | 'analytics' | 'integrations' | 'billing';
  label: string;
  description: string;
  iconName: string;
}

/**
 * The 4 canonical primary navigation tabs.
 * 'More ▾' is the 5th fixed primary navigation anchor.
 */
export const MERCHANT_PRIMARY_NAV_ITEMS: readonly MerchantNavItem[] = [
  { id: 'home', label: 'Home', iconName: 'LayoutDashboard' },
  { id: 'catalog', label: 'Catalog', iconName: 'Package', badgeType: 'count' },
  { id: 'issues', label: 'Issues', iconName: 'AlertTriangle', badgeType: 'alert' },
  { id: 'readiness', label: 'Readiness', iconName: 'Compass', badgeType: 'percentage' },
] as const;

/**
 * Invariant: The More dropdown button must ALWAYS display 'More',
 * even when a child tab is currently active.
 */
export const MORE_DROPDOWN_LABEL = 'More';

/**
 * Secondary operational intelligence tools housed in the 'More ▾' dropdown.
 */
export const MERCHANT_MORE_NAV_ITEMS: readonly MerchantMoreItem[] = [
  { 
    id: 'offers', 
    label: 'Offers & Pricing', 
    description: 'Multi-seller commercial offer intelligence & price tracking',
    iconName: 'Tag' 
  },
  { 
    id: 'monitoring', 
    label: 'Continuous Monitoring', 
    description: 'Continuous ground-truth drift detection & regression alerts',
    iconName: 'Activity' 
  },
  { 
    id: 'analytics', 
    label: 'Quality & Recovery Analytics', 
    description: 'Catalog intelligence coverage & recovery curves',
    iconName: 'BarChart3' 
  },
  { 
    id: 'integrations', 
    label: 'Connections & Feeds', 
    description: 'Store connectors, feeds & syndication endpoints',
    iconName: 'Cpu' 
  },
  { 
    id: 'billing', 
    label: 'Subscription & SKU Limits', 
    description: 'Merchant plan tier, quotas & catalog limits',
    iconName: 'CreditCard' 
  },
] as const;

/**
 * Resolves any tab string or alias into a canonical MerchantTab.
 */
export function resolveMerchantTab(tab?: string): MerchantTab {
  if (!tab) return 'home';
  if (tab === 'overview') return 'home';
  if (tab === 'products') return 'catalog';
  if (tab === 'discovery') return 'readiness';
  
  const validTabs: MerchantTab[] = [
    'home', 
    'catalog', 
    'issues', 
    'readiness', 
    'offers', 
    'monitoring', 
    'analytics', 
    'integrations', 
    'billing', 
    'report'
  ];
  
  return validTabs.includes(tab as MerchantTab) ? (tab as MerchantTab) : 'home';
}

/**
 * Checks if a tab is one of the secondary tools under More.
 */
export function isMoreSecondaryTab(tab: MerchantTab): boolean {
  const normalized = resolveMerchantTab(tab);
  return ['offers', 'monitoring', 'analytics', 'integrations', 'billing'].includes(normalized);
}

/**
 * 6-Stage Merchant Mental Model Pipeline
 */
export const MERCHANT_MENTAL_MODEL_STAGES = [
  { stage: 'add', stepNum: '01', title: 'Add', actionLabel: '+ Add SKUs' },
  { stage: 'scan', stepNum: '02', title: 'Scan', actionLabel: 'Inspect Hero' },
  { stage: 'fix', stepNum: '03', title: 'Fix', actionLabel: 'Triage Issues' },
  { stage: 'recheck', stepNum: '04', title: 'Recheck', actionLabel: 'Run Recheck' },
  { stage: 'ready', stepNum: '05', title: 'Ready', actionLabel: 'View Readiness' },
  { stage: 'connect', stepNum: '06', title: 'Connect', actionLabel: 'Manage Feeds' },
] as const;
