// src/services/speechSynthesisService.spec.ts
// Unit tests for speechSynthesisService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { clampSpeechRate, clampSpeechPitch } from './speechSynthesisService';

describe('speechSynthesisService', () => {
  it('should clamp speech rate within 0.5x to 2.0x limits', () => {
    expect(clampSpeechRate(1.0)).toBe(1.0);
    expect(clampSpeechRate(3.0)).toBe(2.0);
    expect(clampSpeechRate(0.1)).toBe(0.5);
  });

  it('should clamp speech pitch within 0.8 to 1.2 limits', () => {
    expect(clampSpeechPitch(1.0)).toBe(1.0);
    expect(clampSpeechPitch(1.5)).toBe(1.2);
    expect(clampSpeechPitch(0.5)).toBe(0.8);
  });
});
