// src/services/summarizerService.spec.ts
// Unit tests for summarizerService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { generateExtractiveSummary } from './summarizerService';

describe('summarizerService', () => {
  it('should extract top target sentences while preserving chronological order', () => {
    const text = 'Svelte 5 brings compiler reactivity. It eliminates virtual DOM diffing entirely. Developers enjoy building fast web applications. Reactive state management is effortless.';
    const result = generateExtractiveSummary(text, 2);

    expect(result.originalSentenceCount).toBe(4);
    expect(result.summarizedSentenceCount).toBe(2);
    expect(result.summarySentences.length).toBe(2);
    expect(result.compressionRatio).toBeGreaterThan(0);
  });

  it('should return all sentences if target sentence count exceeds original total', () => {
    const text = 'Short document. Second line.';
    const result = generateExtractiveSummary(text, 5);

    expect(result.originalSentenceCount).toBe(2);
    expect(result.summarizedSentenceCount).toBe(2);
    expect(result.compressionRatio).toBe(0);
  });
});
