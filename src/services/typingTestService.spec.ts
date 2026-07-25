// src/services/typingTestService.spec.ts
// Unit tests for typingTestService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { evaluateTypingTest, TYPING_PROMPTS } from './typingTestService';

describe('typingTestService', () => {
  it('should evaluate typing accuracy and WPM accurately', () => {
    const prompt = 'Svelte reactivity is fast.';
    const typed = 'Svelte reactivity is fast.';

    // 26 correct chars in 30 seconds = (26/5) / 0.5 = 10.4 -> 10 WPM
    const scorecard = evaluateTypingTest(prompt, typed, 30);

    expect(scorecard.accuracy).toBe(100);
    expect(scorecard.errorCount).toBe(0);
    expect(scorecard.wpm).toBeGreaterThan(0);
  });

  it('should detect typos and compute lower accuracy percentage', () => {
    const prompt = 'Svelte reactivity';
    const typed = 'Svelte xxxxxxxxxx';

    const scorecard = evaluateTypingTest(prompt, typed, 30);

    expect(scorecard.accuracy).toBeLessThan(100);
    expect(scorecard.errorCount).toBeGreaterThan(0);
  });

  it('should load typing practice prompts dataset', () => {
    expect(TYPING_PROMPTS.length).toBeGreaterThanOrEqual(4);
    expect(TYPING_PROMPTS[0].title).toBe('The Beauty of Svelte Reactivity');
  });
});
