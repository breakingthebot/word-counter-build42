// src/services/zenFocusService.ts
// Ambient Distraction-Free Zen Focus Mode service for Build 42.
// Connects to: src/components/ZenFocusModal.svelte, src/App.svelte
// Created: 2026-07-25

export interface ZenTheme {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
  border: string;
}

export const ZEN_THEMES: ZenTheme[] = [
  { id: 'nord', name: '❄️ Nord Frost', bg: '#2e3440', text: '#eceff4', accent: '#88c0d0', border: '#4c566a' },
  { id: 'cyberpunk', name: '⚡ Cyberpunk Neon', bg: '#0d0221', text: '#00f6ff', accent: '#ff007f', border: '#261447' },
  { id: 'obsidian', name: '🖤 Obsidian Dark', bg: '#0f172a', text: '#f8fafc', accent: '#38bdf8', border: '#1e293b' },
  { id: 'sepia', name: '📜 Vintage Sepia', bg: '#fbf0d9', text: '#5f4b32', accent: '#b45309', border: '#e7d7b7' },
  { id: 'emerald', name: '🌲 Emerald Forest', bg: '#062016', text: '#a7f3d0', accent: '#10b981', border: '#064e3b' }
];

export function getThemeById(id: string): ZenTheme {
  return ZEN_THEMES.find(t => t.id === id) || ZEN_THEMES[0];
}

// Web Audio API Typewriter Click Synthesizer
let audioCtx: AudioContext | null = null;

export function playTypewriterSound() {
  try {
    if (typeof window === 'undefined') return;
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400 + Math.random() * 200, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
}
