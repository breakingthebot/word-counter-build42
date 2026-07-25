// src/services/textAnalysisService.spec.ts
// Unit tests for textAnalysisService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { 
  analyzeText, 
  getKeywordFrequencies, 
  toTitleCase, 
  toSlugify, 
  removeExtraSpaces, 
  stripHtml 
} from './textAnalysisService';

describe('textAnalysisService', () => {
  it('should accurately analyze word, character, sentence, and paragraph counts', () => {
    const sample = 'Svelte is a radical new approach to building user interfaces. It compiles code to small frameworkless JS.';
    const metrics = analyzeText(sample, 500);

    expect(metrics.characterCount).toBe(sample.length);
    expect(metrics.wordCount).toBe(17);
    expect(metrics.sentenceCount).toBe(2);
    expect(metrics.readingTimeMinutes).toBe(1);
    expect(metrics.fleschScore).toBeGreaterThan(0);
  });

  it('should compute keyword frequencies excluding stop words', () => {
    const text = 'Svelte framework Svelte components build reactive Svelte web apps.';
    const keywords = getKeywordFrequencies(text, 5);

    expect(keywords.length).toBeGreaterThan(0);
    expect(keywords[0].word).toBe('svelte');
    expect(keywords[0].count).toBe(3);
  });

  it('should convert text cases correctly', () => {
    expect(toTitleCase('hello world recipe')).toBe('Hello World Recipe');
    expect(toSlugify('Live Word Counter 2026!')).toBe('live-word-counter-2026');
  });

  it('should clean up extra spaces and strip HTML tags', () => {
    expect(removeExtraSpaces('  hello    world  ')).toBe('hello world');
    expect(stripHtml('<h1>GourmetWord</h1><p>Text</p>')).toBe('GourmetWordText');
  });
});
