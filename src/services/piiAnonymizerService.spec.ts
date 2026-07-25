// src/services/piiAnonymizerService.spec.ts
// Unit tests for piiAnonymizerService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { redactPii } from './piiAnonymizerService';

describe('piiAnonymizerService', () => {
  it('should redact email addresses and phone numbers', () => {
    const text = 'Contact john.doe@example.com or call 555-123-4567 for inquiries.';
    const result = redactPii(text);

    expect(result.totalRedactions).toBe(2);
    expect(result.anonymizedText).toContain('[REDACTED_EMAIL]');
    expect(result.anonymizedText).toContain('[REDACTED_PHONE]');
    expect(result.anonymizedText).not.toContain('john.doe@example.com');
  });

  it('should redact SSN and credit card numbers accurately', () => {
    const text = 'SSN is 123-45-6789 and Card is 4111-2222-3333-4444.';
    const result = redactPii(text);

    expect(result.typeCounts.ssn).toBe(1);
    expect(result.typeCounts.credit_card).toBe(1);
    expect(result.anonymizedText).toContain('[REDACTED_SSN]');
    expect(result.anonymizedText).toContain('[REDACTED_CREDIT_CARD]');
  });
});
