// src/services/sprintTimerService.ts
// Writing Goal Timer & Productivity Sprint Tracker service for Build 42.
// Connects to: src/components/WritingSprintTimer.svelte, src/stores/textStore.ts
// Created: 2026-07-25

export interface SprintSession {
  durationMinutes: number;
  initialWordCount: number;
  currentWordCount: number;
  secondsElapsed: number;
  targetWords: number;
}

export function calculateSprintWpm(wordsWritten: number, secondsElapsed: number): number {
  if (secondsElapsed <= 0) return 0;
  const minutes = secondsElapsed / 60;
  return Math.round(wordsWritten / minutes);
}

export function formatTimerSeconds(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function calculateSprintProgress(wordsWritten: number, targetWords: number): number {
  if (targetWords <= 0) return 100;
  return Math.min(100, Math.round((wordsWritten / targetWords) * 100));
}
