// src/services/textAnalysisService.ts
// Core text analysis, metrics calculation, readability, and transformation service for Build 42.
// Connects to: src/stores/textStore.ts, src/components/MetricsOverview.svelte
// Created: 2026-07-25

export interface TextMetrics {
  characterCount: number;
  characterNoSpaceCount: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  avgWordLength: number;
  avgSentenceLength: number;
  fleschScore: number;
  readabilityGrade: string;
  goalProgressPercent: number;
}

export interface KeywordFrequency {
  word: string;
  count: number;
  percentage: number;
}

const COMMON_STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot',
  'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has',
  'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into',
  'is', 'it', 'its', 'itself', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some',
  'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this',
  'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where',
  'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves'
]);

export function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

export function analyzeText(text: string, targetWordGoal: number = 500): TextMetrics {
  const charCount = text.length;
  const charNoSpace = text.replace(/\s/g, '').length;

  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const wordCount = words.length === 1 && words[0] === '' ? 0 : words.length;

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentenceCountCalc(text);

  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphCount = text.trim() ? paragraphs.length : 0;

  const readingTimeMinutes = Math.ceil(wordCount / 225);
  const speakingTimeMinutes = Math.ceil(wordCount / 130);

  const avgWordLength = wordCount > 0 ? Math.round((charNoSpace / wordCount) * 10) / 10 : 0;
  const avgSentenceLength = sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;

  // Flesch Reading Ease
  let totalSyllables = 0;
  words.forEach(w => totalSyllables += countSyllables(w));

  let fleschScore = 100;
  if (wordCount > 0 && sentenceCount > 0) {
    fleschScore = Math.round(206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount));
    fleschScore = Math.max(0, Math.min(100, fleschScore));
  }

  let readabilityGrade = '5th Grade (Very Easy)';
  if (fleschScore < 30) readabilityGrade = 'College Graduate (Very Difficult)';
  else if (fleschScore < 50) readabilityGrade = 'College Level (Difficult)';
  else if (fleschScore < 60) readabilityGrade = 'High School (Standard)';
  else if (fleschScore < 70) readabilityGrade = '8th & 9th Grade (Plain English)';
  else if (fleschScore < 80) readabilityGrade = '7th Grade (Easy)';

  const goalProgressPercent = targetWordGoal > 0 ? Math.min(100, Math.round((wordCount / targetWordGoal) * 100)) : 100;

  return {
    characterCount: charCount,
    characterNoSpaceCount: charNoSpace,
    wordCount,
    sentenceCount,
    paragraphCount,
    readingTimeMinutes,
    speakingTimeMinutes,
    avgWordLength,
    avgSentenceLength,
    fleschScore,
    readabilityGrade,
    goalProgressPercent
  };
}

function sentenceCountCalc(text: string): number {
  if (!text.trim()) return 0;
  const s = text.split(/[.!?]+/).filter(st => st.trim().length > 0);
  return s.length > 0 ? s.length : 1;
}

export function getKeywordFrequencies(text: string, limit: number = 8): KeywordFrequency[] {
  if (!text.trim()) return [];

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !COMMON_STOP_WORDS.has(w));

  const totalWords = words.length;
  if (totalWords === 0) return [];

  const counts: Record<string, number> = {};
  words.forEach(w => {
    counts[w] = (counts[w] || 0) + 1;
  });

  const sorted = Object.entries(counts)
    .map(([word, count]) => ({
      word,
      count,
      percentage: Math.round((count / totalWords) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  return sorted.slice(0, limit);
}

// Case transformations
export function toUpperCase(text: string): string { return text.toUpperCase(); }
export function toLowerCase(text: string): string { return text.toLowerCase(); }
export function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export function toSentenceCase(text: string): string {
  return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
}
export function toSlugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

// Text cleanup helpers
export function removeExtraSpaces(text: string): string {
  return text.replace(/[ \t]+/g, ' ').replace(/\n /g, '\n').trim();
}
export function removeLineBreaks(text: string): string {
  return text.replace(/[\r\n]+/g, ' ').trim();
}
export function stripHtml(text: string): string {
  return text.replace(/<[^>]*>?/gm, '');
}
export function removeDuplicateLines(text: string): string {
  const lines = text.split('\n');
  const unique = Array.from(new Set(lines));
  return unique.join('\n');
}
