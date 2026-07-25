// src/services/socialComplianceService.ts
// SEO & Social Media Post Compliance Checker service for Build 42.
// Connects to: src/components/SocialComplianceChecker.svelte, src/App.svelte
// Created: 2026-07-25

export interface PlatformRule {
  id: string;
  name: string;
  icon: string;
  limit: number;
  minRecommended: number;
  maxRecommended: number;
  description: string;
}

export const PLATFORM_RULES: PlatformRule[] = [
  { id: 'twitter', name: 'Twitter / X Post', icon: '𝕏', limit: 280, minRecommended: 50, maxRecommended: 270, description: 'Single post character limit on X.' },
  { id: 'seo_title', name: 'SEO Page Title', icon: '🔍', limit: 60, minRecommended: 30, maxRecommended: 60, description: 'Google search result headline snippet limit.' },
  { id: 'seo_meta', name: 'SEO Meta Description', icon: '📝', limit: 160, minRecommended: 120, maxRecommended: 155, description: 'Search result summary snippet below title.' },
  { id: 'linkedin', name: 'LinkedIn Post', icon: '💼', limit: 3000, minRecommended: 150, maxRecommended: 1300, description: 'Optimal post length before "see more" fold.' },
  { id: 'instagram', name: 'Instagram Caption', icon: '📸', limit: 2200, minRecommended: 100, maxRecommended: 1000, description: 'Caption limit on Instagram posts.' },
  { id: 'sms', name: 'SMS Message (1 Segment)', icon: '💬', limit: 160, minRecommended: 10, maxRecommended: 160, description: 'Single standard cellular SMS segment.' }
];

export interface ComplianceResult {
  rule: PlatformRule;
  charCount: number;
  limit: number;
  remainingChars: number;
  percentUsed: number;
  status: 'optimal' | 'warning' | 'exceeded';
  message: string;
}

export function evaluatePlatformCompliance(text: string, rule: PlatformRule): ComplianceResult {
  const charCount = text.length;
  const remainingChars = rule.limit - charCount;
  const percentUsed = Math.min(100, Math.round((charCount / rule.limit) * 100));

  let status: 'optimal' | 'warning' | 'exceeded' = 'optimal';
  let message = 'Within platform limits';

  if (charCount > rule.limit) {
    status = 'exceeded';
    message = `Exceeds limit by ${Math.abs(remainingChars)} chars`;
  } else if (charCount >= rule.maxRecommended) {
    status = 'warning';
    message = 'Approaching character limit';
  } else if (charCount < rule.minRecommended && charCount > 0) {
    status = 'warning';
    message = 'Below recommended minimum length';
  }

  return {
    rule,
    charCount,
    limit: rule.limit,
    remainingChars,
    percentUsed,
    status,
    message
  };
}

export function checkAllPlatforms(text: string): ComplianceResult[] {
  return PLATFORM_RULES.map(rule => evaluatePlatformCompliance(text, rule));
}

export function trimTextToLimit(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit);
}
