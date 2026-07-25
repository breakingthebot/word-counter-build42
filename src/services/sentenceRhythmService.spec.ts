// src/services/sentenceRhythmService.spec.ts
// Unit tests for sentenceRhythmService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { analyzeSentenceRhythm, classifySentenceLength } from './sentenceRhythmService';

describe('sentenceRhythmService', () => {
  it('should classify sentence lengths into short, medium, long, and extra_long', () => {
    expect(classifySentenceLength(5).classification).toBe('short');
    expect(classifySentenceLength(15).classification).toBe('medium');
    expect(classifySentenceLength(25).classification).toBe('long');
    expect(classifySentenceLength(35).classification).toBe('extra_long');
  });

  it('should analyze sentence rhythm and distribution across multiple sentences', () => {
    const text = 'Svelte is fast. It simplifies reactive web development with compiler optimizations. Writers love clean code.';
    const rhythm = analyzeSentenceRhythm(text);

    expect(rhythm.totalSentences).toBe(3);
    expect(rhythm.shortCount).toBe(3);
    expect(rhythm.sentences.length).toBe(3);
    expect(rhythm.averageSentenceLength).toBeGreaterThan(0);
  });
});
