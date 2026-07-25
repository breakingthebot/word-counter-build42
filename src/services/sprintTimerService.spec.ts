// src/services/sprintTimerService.spec.ts
// Unit tests for sprintTimerService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { calculateSprintWpm, formatTimerSeconds, calculateSprintProgress } from './sprintTimerService';

describe('sprintTimerService', () => {
  it('should calculate words per minute (WPM) accurately', () => {
    expect(calculateSprintWpm(100, 120)).toBe(50); // 100 words in 2 mins = 50 WPM
    expect(calculateSprintWpm(150, 180)).toBe(50); // 150 words in 3 mins = 50 WPM
    expect(calculateSprintWpm(0, 60)).toBe(0);
  });

  it('should format total seconds into MM:SS format', () => {
    expect(formatTimerSeconds(90)).toBe('01:30');
    expect(formatTimerSeconds(1500)).toBe('25:00');
    expect(formatTimerSeconds(5)).toBe('00:05');
  });

  it('should compute sprint progress percentage accurately', () => {
    expect(calculateSprintProgress(250, 500)).toBe(50);
    expect(calculateSprintProgress(500, 500)).toBe(100);
  });
});
