// src/services/textDiffService.spec.ts
// Unit tests for textDiffService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { compareTexts } from './textDiffService';

describe('textDiffService', () => {
  it('should detect word additions and deletions', () => {
    const original = 'The brown fox jumps quickly over the lazy dog';
    const revised = 'The brown fox jumps quickly over a lazy dog';

    const result = compareTexts(original, revised);

    expect(result.additionsCount).toBeGreaterThanOrEqual(1);
    expect(result.deletionsCount).toBeGreaterThanOrEqual(1);
    expect(result.similarityPercentage).toBeGreaterThan(50);
  });

  it('should return 100% similarity for identical texts', () => {
    const text = 'Svelte reactive text counter';
    const result = compareTexts(text, text);

    expect(result.additionsCount).toBe(0);
    expect(result.deletionsCount).toBe(0);
    expect(result.similarityPercentage).toBe(100);
  });
});
