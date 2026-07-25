// src/services/customReadingSpeedService.ts
// Custom Reading Speed & Audience Profile Estimator service for Build 42.
// Connects to: src/components/CustomSpeedEstimator.svelte, src/App.svelte
// Created: 2026-07-25

export interface AudienceProfile {
  id: string;
  name: string;
  wpm: number;
  description: string;
  icon: string;
}

export const AUDIENCE_PROFILES: AudienceProfile[] = [
  { id: 'fast', name: '⚡ Fast Skimmer', wpm: 350, description: 'Speed readers and quick web skimmers', icon: '⚡' },
  { id: 'standard', name: '📖 Standard Adult', wpm: 225, description: 'Average adult silent reading speed', icon: '📖' },
  { id: 'audiobook', name: '🎙️ Audiobook / Speech', wpm: 150, description: 'Clear spoken narration & podcasts', icon: '🎙️' },
  { id: 'academic', name: '🎓 Technical / Academic', wpm: 120, description: 'Complex dense scientific research', icon: '🎓' },
  { id: 'esl', name: '🌍 Language Learner', wpm: 100, description: 'ESL and beginner readers', icon: '🌍' }
];

export interface CustomReadingTime {
  minutes: number;
  seconds: number;
  formattedText: string;
  wpm: number;
}

export function calculateCustomReadingTime(wordCount: number, wpm: number): CustomReadingTime {
  if (wordCount <= 0 || wpm <= 0) {
    return { minutes: 0, seconds: 0, formattedText: '0 sec', wpm };
  }

  const totalSeconds = Math.round((wordCount / wpm) * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  let formattedText = '';
  if (minutes > 0) {
    formattedText = `${minutes} min ${seconds} sec`;
  } else {
    formattedText = `${seconds} sec`;
  }

  return {
    minutes,
    seconds,
    formattedText,
    wpm
  };
}
