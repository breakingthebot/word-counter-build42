// src/services/socialComplianceService.spec.ts
// Unit tests for socialComplianceService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { checkAllPlatforms, evaluatePlatformCompliance, trimTextToLimit, PLATFORM_RULES } from './socialComplianceService';

describe('socialComplianceService', () => {
  it('should evaluate Twitter limit compliance accurately', () => {
    const validText = 'Svelte 5 brings fine-grained reactivity and build-time compilation for modern web apps.';
    const twitterRule = PLATFORM_RULES.find(r => r.id === 'twitter')!;

    const result = evaluatePlatformCompliance(validText, twitterRule);

    expect(result.status).toBe('optimal');
    expect(result.remainingChars).toBe(280 - validText.length);
  });

  it('should flag exceeded limit status when text exceeds platform limit', () => {
    const longText = 'a'.repeat(300);
    const twitterRule = PLATFORM_RULES.find(r => r.id === 'twitter')!;

    const result = evaluatePlatformCompliance(longText, twitterRule);

    expect(result.status).toBe('exceeded');
    expect(result.remainingChars).toBe(-20);
  });

  it('should trim text to platform character limit', () => {
    const text = 'Hello world from Svelte!';
    const trimmed = trimTextToLimit(text, 10);

    expect(trimmed.length).toBe(10);
    expect(trimmed).toBe('Hello worl');
  });

  it('should evaluate all 6 platform rules', () => {
    const results = checkAllPlatforms('Test copy string');
    expect(results.length).toBe(6);
  });
});
