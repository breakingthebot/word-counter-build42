// src/services/flawScannerService.spec.ts
// Unit tests for flawScannerService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { scanTextFlaws } from './flawScannerService';

describe('flawScannerService', () => {
  it('should detect passive voice, clichés, and wordy phrases', () => {
    const text = 'The code was written in order to think outside the box at the end of the day.';
    const flaws = scanTextFlaws(text);

    expect(flaws.length).toBeGreaterThanOrEqual(3);
    const types = flaws.map(f => f.type);
    expect(types).toContain('Passive Voice');
    expect(types).toContain('Wordy Phrase');
    expect(types).toContain('Cliche');
  });

  it('should detect hard-to-read sentences over 30 words', () => {
    const longSentence = 'This is an extraordinarily long sentence designed specifically to test the grammar flaw scanner engine by exceeding the thirty word threshold limit so that it triggers a hard sentence warning in our writing quality auditor.';
    const flaws = scanTextFlaws(longSentence);

    const hardSentences = flaws.filter(f => f.type === 'Hard Sentence');
    expect(hardSentences.length).toBe(1);
    expect(hardSentences[0].severity).toBe('error');
  });
});
