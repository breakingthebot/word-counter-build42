// src/services/customReadingSpeedService.spec.ts
// Unit tests for customReadingSpeedService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { calculateCustomReadingTime, AUDIENCE_PROFILES } from './customReadingSpeedService';

describe('customReadingSpeedService', () => {
  it('should calculate custom reading duration accurately for different WPM settings', () => {
    // 450 words at 300 WPM = 1 min 30 sec
    const result = calculateCustomReadingTime(450, 300);

    expect(result.minutes).toBe(1);
    expect(result.seconds).toBe(30);
    expect(result.formattedText).toBe('1 min 30 sec');
  });

  it('should handle zero words or invalid WPM gracefully', () => {
    const emptyResult = calculateCustomReadingTime(0, 225);

    expect(emptyResult.minutes).toBe(0);
    expect(emptyResult.seconds).toBe(0);
    expect(emptyResult.formattedText).toBe('0 sec');
  });

  it('should contain 5 audience reading profiles', () => {
    expect(AUDIENCE_PROFILES.length).toBe(5);
    expect(AUDIENCE_PROFILES[0].wpm).toBe(350);
  });
});
