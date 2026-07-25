// src/services/summarizerService.ts
// Text Summarizer & Key Bullet Point Generator service for Build 42.
// Connects to: src/components/TextSummarizer.svelte, src/App.svelte
// Created: 2026-07-25

export interface SummaryResult {
  summarySentences: string[];
  keyBulletPoints: string[];
  compressionRatio: number; // % length reduction
  originalSentenceCount: number;
  summarizedSentenceCount: number;
}

const STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'is', 'are', 'was', 'were'
]);

export function generateExtractiveSummary(text: string, targetSentenceCount: number = 3): SummaryResult {
  if (!text.trim()) {
    return {
      summarySentences: [],
      keyBulletPoints: [],
      compressionRatio: 0,
      originalSentenceCount: 0,
      summarizedSentenceCount: 0
    };
  }

  // Split text into sentences
  const sentences = text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 0);
  const totalSentences = sentences.length;

  if (totalSentences <= targetSentenceCount) {
    return {
      summarySentences: sentences,
      keyBulletPoints: sentences.map(s => `• ${s}`),
      compressionRatio: 0,
      originalSentenceCount: totalSentences,
      summarizedSentenceCount: totalSentences
    };
  }

  // 1. Calculate word frequencies (excluding stop words)
  const wordFreq: Record<string, number> = {};
  text.toLowerCase().match(/\b[a-z0-9'-]+\b/g)?.forEach(w => {
    if (!STOP_WORDS.has(w) && w.length > 2) {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    }
  });

  // 2. Score each sentence
  const scored = sentences.map((sentence, index) => {
    const words = sentence.toLowerCase().match(/\b[a-z0-9'-]+\b/g) || [];
    let score = 0;

    words.forEach(w => {
      if (wordFreq[w]) score += wordFreq[w];
    });

    // Lead sentence boost
    if (index === 0) score *= 1.4;
    // Normalize by sentence length to prevent favoring excessively long sentences
    score = words.length > 0 ? score / Math.sqrt(words.length) : 0;

    return { index, sentence, score };
  });

  // 3. Select top N scored sentences and sort by original chronological index
  const topScored = [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(targetSentenceCount, totalSentences))
    .sort((a, b) => a.index - b.index);

  const summarySentences = topScored.map(s => s.sentence);
  const keyBulletPoints = summarySentences.map(s => `• ${s}`);

  const originalLength = text.length;
  const summaryLength = summarySentences.join(' ').length;
  const compressionRatio = Math.max(0, Math.round(((originalLength - summaryLength) / originalLength) * 100));

  return {
    summarySentences,
    keyBulletPoints,
    compressionRatio,
    originalSentenceCount: totalSentences,
    summarizedSentenceCount: summarySentences.length
  };
}
