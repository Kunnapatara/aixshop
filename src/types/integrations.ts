export type IntegrationCategory = 
  | 'COMMERCE_PLATFORM'
  | 'COMMERCE_FEED'
  | 'STRUCTURED_SOURCE'
  | 'MARKETPLACE_SOURCE'
  | 'MERCHANT_VERIFICATION';

export type IntegrationStatus = 
  | 'CONNECTED'
  | 'NOT_CONNECTED'
  | 'NEEDS_ATTENTION'
  | 'REVOKED'
  | 'ERROR'
  | 'PARTIAL'
  | 'PREVIEW'
  | 'UNKNOWN';

export type HealthStatus = 'Healthy' | 'Needs Attention' | 'Partial' | 'Unknown';

export interface PermissionItem {
  name: string;
  category: 'READ' | 'WRITE' | 'EXCLUDED';
  description: string;
  isGranted: boolean;
  isDefaultOff?: boolean;
}

export interface SourceHealthDimension {
  name: string;
  status: HealthStatus;
  detail: string;
}

export interface IntegrationSource {
  id: string;
  name: string;
  slug: string;
  category: IntegrationCategory;
  categoryLabel: string;
  status: IntegrationStatus;
  provider: string;
  connectionMethod: 'Authorized OAuth' | 'Structured Feed' | 'Direct HTML/JSON-LD' | 'Internal Portal' | 'Partner API';
  scope: string;
  shortDescription: string;
  detailedPurpose: string;
  whyNeeded: string;
  
  // Data Coverage
  coverage: {
    productsCount: number;
    variantsCount: number;
    offersCount: number;
    imagesCount: number;
    evidenceRecordsCount: number;
  };

  // Permissions
  readPermissions: PermissionItem[];
  writePermissions: PermissionItem[];
  customerDataStatus: 'Not Requested' | 'Strictly Prohibited';
  ordersStatus: 'Not Requested' | 'Strictly Prohibited';
  paymentsStatus: 'Not Requested' | 'Strictly Prohibited';
  writeAccessEnabled: boolean;

  // Evidence contribution
  evidenceStatesContributed: ('OBSERVED' | 'DERIVED' | 'MERCHANT_VERIFIED')[];
  lastObservation: string;
  observationFreshnessMinutes: number;
  
  // Health
  healthState: HealthStatus;
  healthDimensions: SourceHealthDimension[];
  
  // Warnings / Notes
  attentionNotice?: string;
  previewLabel: string;
  canConfigureFeed?: boolean;
}

export interface IntegrationHistoryEvent {
  id: string;
  timestamp: string;
  timeAgo: string;
  sourceId: string;
  sourceName: string;
  eventType: 'OBSERVATION_RECEIVED' | 'AUTH_CHECK' | 'FEED_REFRESH' | 'SCHEMA_CHANGE' | 'EVIDENCE_GENERATED' | 'HEALTH_WARNING';
  headline: string;
  detail: string;
  recordsAffected: number;
  evidenceGenerated: 'OBSERVED' | 'MERCHANT_VERIFIED' | 'DERIVED' | 'NONE';
}

export interface SourceAuthorityItem {
  id: string;
  attributeName: string;
  category: string;
  sourceName: string;
  sourceType: string;
  observedValue: string;
  evidenceState: 'OBSERVED' | 'DERIVED' | 'MERCHANT_VERIFIED' | 'CONFLICT';
  confidence: number;
  authorityContext: string;
  conflictStatus: 'RESOLVED' | 'ACTIVE_CONFLICT' | 'SINGLE_SOURCE' | 'MERCHANT_CONFIRMED';
  resolutionNote: string;
}

export interface FeedValidationRule {
  field: string;
  status: 'PASS' | 'WARNING' | 'FAIL';
  detail: string;
}

export interface FeedConfigModel {
  feedName: string;
  format: 'CSV' | 'XML' | 'JSON' | 'URL';
  feedUrl: string;
  refreshStrategy: 'Hourly Poll' | 'Daily Polling' | 'Webhook Notification';
  productIdentifier: 'GTIN' | 'MPN' | 'SKU';
  currency: 'USD' | 'EUR' | 'GBP';
  offerFieldsIncluded: string[];
  status: 'NOT_CONNECTED' | 'PREVIEW_VALIDATED';
}

export interface IntegrationsFilterState {
  searchQuery: string;
  category: 'ALL' | IntegrationCategory;
  status: 'ALL' | IntegrationStatus;
  dataScope: 'ALL' | 'Product' | 'Variant' | 'Offer' | 'Evidence' | 'Inventory' | 'Images';
}
