// src/services/zenFocusService.spec.ts
// Unit tests for zenFocusService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { getThemeById, ZEN_THEMES } from './zenFocusService';

describe('zenFocusService', () => {
  it('should return correct Zen theme by id', () => {
    const theme = getThemeById('nord');
    expect(theme.name).toContain('Nord Frost');
    expect(theme.bg).toBe('#2e3440');
  });

  it('should fallback to first theme if theme id is unknown', () => {
    const theme = getThemeById('unknown_theme');
    expect(theme.id).toBe('nord');
  });

  it('should list all 5 Zen themes', () => {
    expect(ZEN_THEMES.length).toBe(5);
  });
});
