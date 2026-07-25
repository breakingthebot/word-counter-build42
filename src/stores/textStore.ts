// src/stores/textStore.ts
// Svelte reactive store for text state, word goal, draft history, and metrics.
// Connects to: src/services/textAnalysisService.ts, src/App.svelte
// Created: 2026-07-25

import { writable, derived } from 'svelte/store';
import { analyzeText, getKeywordFrequencies, type TextMetrics, type KeywordFrequency } from '../services/textAnalysisService';

export interface DraftItem {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  updatedAt: string;
}

const DEFAULT_SAMPLE_TEXT = `Welcome to WordCraft — the ultra-fast, reactive Svelte word and text counter.

Type or paste your text here to get real-time metrics including character count, word count, sentence count, reading time, and Flesch-Kincaid readability scoring.

Key Features:
- Real-time live character, word, sentence, & paragraph counter
- Reading time & speaking duration estimation
- Flesch Reading Ease score & Grade Level analyzer
- Top keyword frequency density visualizer
- Text case conversions (UPPERCASE, lowercase, Title Case, Slugify)
- 1-Click Export to .txt file or Copy to Clipboard
- Saved draft history manager`;

// Writable Stores
export const text = writable<string>(DEFAULT_SAMPLE_TEXT);
export const wordGoal = writable<number>(500);

// Load drafts from localStorage if available
const initialDrafts: DraftItem[] = [];
export const draftHistory = writable<DraftItem[]>(initialDrafts);

// Derived Metrics Store
export const metrics = derived([text, wordGoal], ([$text, $wordGoal]): TextMetrics => {
  return analyzeText($text, $wordGoal);
});

// Derived Keyword Frequency Store
export const keywordFrequencies = derived(text, ($text): KeywordFrequency[] => {
  return getKeywordFrequencies($text, 8);
});

// Helper Actions
export function updateText(newText: string) {
  text.set(newText);
}

export function setWordGoal(goal: number) {
  wordGoal.set(Math.max(50, goal));
}

export function applyTransformation(transformFn: (txt: string) => string) {
  text.update(t => transformFn(t));
}

export function saveCurrentDraft(customTitle?: string) {
  text.subscribe(currentText => {
    if (!currentText.trim()) return;

    const words = currentText.trim().split(/\s+/).length;
    const title = customTitle || currentText.slice(0, 30).trim() + '...';

    draftHistory.update(list => {
      const newDraft: DraftItem = {
        id: `draft-${Date.now()}`,
        title,
        content: currentText,
        wordCount: words,
        updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      return [newDraft, ...list.slice(0, 19)]; // Keep up to 20 drafts
    });
  })();
}

export function loadDraftContent(draftContent: string) {
  text.set(draftContent);
}

export function deleteDraftItem(id: string) {
  draftHistory.update(list => list.filter(d => d.id !== id));
}

export function clearText() {
  text.set('');
}
