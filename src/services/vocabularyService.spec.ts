// src/services/vocabularyService.spec.ts
// Unit tests for vocabularyService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { analyzeVocabularyRichness } from './vocabularyService';

describe('vocabularyService', () => {
  it('should calculate Type-Token Ratio (TTR) and unique words accurately', () => {
    const text = 'Svelte reactivity brings clean modular state management to web applications.';
    const metrics = analyzeVocabularyRichness(text);

    expect(metrics.totalWords).toBe(10);
    expect(metrics.uniqueWords).toBe(10);
    expect(metrics.typeTokenRatio).toBe(100);
    expect(metrics.richnessGrade).toBe('🌟 Exceptional');
  });

  it('should detect overused non-stop words and provide synonyms', () => {
    const text = 'This is very very very good and very important work that is very very good.';
    const metrics = analyzeVocabularyRichness(text);

    expect(metrics.overusedWords.length).toBeGreaterThanOrEqual(1);
    const veryMatch = metrics.overusedWords.find(w => w.word === 'very');
    expect(veryMatch).toBeDefined();
    expect(veryMatch?.synonyms.length).toBeGreaterThan(0);
  });
});
