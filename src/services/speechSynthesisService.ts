// src/services/speechSynthesisService.ts
// Text-to-Speech Audio Proofreader service for Build 42.
// Connects to: src/components/AudioProofreader.svelte, src/App.svelte
// Created: 2026-07-25

export interface SpeechConfig {
  rate: number; // 0.5 to 2.0
  pitch: number; // 0.8 to 1.2
  voiceURI?: string;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSupported()) return [];
  return window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
}

export function clampSpeechRate(rate: number): number {
  return Math.min(2.0, Math.max(0.5, rate));
}

export function clampSpeechPitch(pitch: number): number {
  return Math.min(1.2, Math.max(0.8, pitch));
}
