/**
 * AIXSHOP — Task-First Review & Approve Workflow Types
 * Grounded in existing IssueItem and EvidenceRecord structures.
 */

export type ReviewDecision = 'pending' | 'approved' | 'rejected';

export interface ReviewItemState {
  issueId: string;
  decision: ReviewDecision;
  editedValue?: string;
  decidedAt?: string;
}

export type ReviewSessionState = Record<string, ReviewItemState>;

export type TaskCategory = 'all' | 'missing' | 'conflict' | 'other';

export interface TaskCategorySummary {
  category: TaskCategory;
  title: string;
  description: string;
  count: number;
  issueIds: string[];
}
