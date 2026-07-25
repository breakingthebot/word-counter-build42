// src/services/sentenceRhythmService.ts
// Sentence Structure & Length Rhythm Inspector service for Build 42.
// Connects to: src/components/SentenceRhythmInspector.svelte, src/App.svelte
// Created: 2026-07-25

export type SentenceClassification = 'short' | 'medium' | 'long' | 'extra_long';

export interface SentenceItem {
  index: number;
  text: string;
  wordCount: number;
  characterCount: number;
  classification: SentenceClassification;
  badge: string;
}

export interface RhythmSummary {
  totalSentences: number;
  shortCount: number;
  mediumCount: number;
  longCount: number;
  extraLongCount: number;
  averageSentenceLength: number;
  rhythmHealth: '🌊 Excellent Flow' | '⚡ Energetic & Punchy' | '📜 Dense & Complex' | '🔁 Monotonous';
  sentences: SentenceItem[];
}

export function classifySentenceLength(wordCount: number): { classification: SentenceClassification; badge: string } {
  if (wordCount <= 9) return { classification: 'short', badge: '⚡ Short' };
  if (wordCount <= 20) return { classification: 'medium', badge: '📖 Standard' };
  if (wordCount <= 30) return { classification: 'long', badge: '📝 Long' };
  return { classification: 'extra_long', badge: '⚠️ Very Long' };
}

export function analyzeSentenceRhythm(text: string): RhythmSummary {
  if (!text.trim()) {
    return {
      totalSentences: 0,
      shortCount: 0,
      mediumCount: 0,
      longCount: 0,
      extraLongCount: 0,
      averageSentenceLength: 0,
      rhythmHealth: '🌊 Excellent Flow',
      sentences: []
    };
  }

  // Split text into sentences using punctuation boundaries
  const rawSentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
  if (rawSentences.length === 0) {
    return {
      totalSentences: 0,
      shortCount: 0,
      mediumCount: 0,
      longCount: 0,
      extraLongCount: 0,
      averageSentenceLength: 0,
      rhythmHealth: '🌊 Excellent Flow',
      sentences: []
    };
  }

  let shortCount = 0;
  let mediumCount = 0;
  let longCount = 0;
  let extraLongCount = 0;
  let totalWordsSum = 0;

  const sentences: SentenceItem[] = rawSentences.map((sentenceText, idx) => {
    const words = sentenceText.trim().match(/\b[\w'-]+\b/g) || [];
    const wordCount = words.length;
    totalWordsSum += wordCount;

    const { classification, badge } = classifySentenceLength(wordCount);

    if (classification === 'short') shortCount++;
    else if (classification === 'medium') mediumCount++;
    else if (classification === 'long') longCount++;
    else extraLongCount++;

    return {
      index: idx + 1,
      text: sentenceText.trim(),
      wordCount,
      characterCount: sentenceText.length,
      classification,
      badge
    };
  });

  const totalSentences = sentences.length;
  const averageSentenceLength = Math.round((totalWordsSum / totalSentences) * 10) / 10;

  let rhythmHealth: '🌊 Excellent Flow' | '⚡ Energetic & Punchy' | '📜 Dense & Complex' | '🔁 Monotonous' = '🌊 Excellent Flow';
  if (shortCount / totalSentences > 0.6) rhythmHealth = '⚡ Energetic & Punchy';
  else if ((extraLongCount + longCount) / totalSentences > 0.5) rhythmHealth = '📜 Dense & Complex';
  else if (shortCount > 0 && mediumCount > 0) rhythmHealth = '🌊 Excellent Flow';
  else rhythmHealth = '🔁 Monotonous';

  return {
    totalSentences,
    shortCount,
    mediumCount,
    longCount,
    extraLongCount,
    averageSentenceLength,
    rhythmHealth,
    sentences
  };
}
