// src/services/vocabularyService.ts
// Vocabulary Variety & Type-Token Ratio (TTR) Richness Analyzer service for Build 42.
// Connects to: src/components/VocabularyRichness.svelte, src/App.svelte
// Created: 2026-07-25

export interface OverusedWordItem {
  word: string;
  count: number;
  percentage: number;
  synonyms: string[];
}

export interface VocabularyMetrics {
  totalWords: number;
  uniqueWords: number;
  typeTokenRatio: number; // 0 to 100%
  richnessGrade: '🌟 Exceptional' | '📖 High Variety' | '📝 Moderate Variety' | '🔁 Repetitive';
  overusedWords: OverusedWordItem[];
}

const COMMON_SYNONYMS: Record<string, string[]> = {
  good: ['excellent', 'superb', 'outstanding', 'fine'],
  bad: ['poor', 'subpar', 'defective', 'unfavorable'],
  big: ['large', 'substantial', 'massive', 'immense'],
  small: ['compact', 'tiny', 'modest', 'minor'],
  said: ['stated', 'remarked', 'expressed', 'uttered'],
  make: ['create', 'craft', 'generate', 'produce'],
  think: ['believe', 'consider', 'ponder', 'reflect'],
  important: ['vital', 'crucial', 'essential', 'pivotal'],
  very: ['extremely', 'exceptionally', 'exceedingly', 'remarkably'],
  fast: ['rapid', 'swift', 'expeditious', 'brisk'],
  slow: ['gradual', 'leisurely', 'unhurried', 'deliberate']
};

const STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'is', 'are', 'was', 'were'
]);

export function analyzeVocabularyRichness(text: string): VocabularyMetrics {
  if (!text.trim()) {
    return {
      totalWords: 0,
      uniqueWords: 0,
      typeTokenRatio: 0,
      richnessGrade: '🔁 Repetitive',
      overusedWords: []
    };
  }

  const rawWords = text.toLowerCase().match(/\b[a-z0-9'-]+\b/g) || [];
  const totalWords = rawWords.length;
  if (totalWords === 0) {
    return { totalWords: 0, uniqueWords: 0, typeTokenRatio: 0, richnessGrade: '🔁 Repetitive', overusedWords: [] };
  }

  const uniqueSet = new Set(rawWords);
  const uniqueWords = uniqueSet.size;
  const typeTokenRatio = Math.round((uniqueWords / totalWords) * 100);

  let richnessGrade: '🌟 Exceptional' | '📖 High Variety' | '📝 Moderate Variety' | '🔁 Repetitive' = '📖 High Variety';
  if (typeTokenRatio >= 70) richnessGrade = '🌟 Exceptional';
  else if (typeTokenRatio >= 50) richnessGrade = '📖 High Variety';
  else if (typeTokenRatio >= 35) richnessGrade = '📝 Moderate Variety';
  else richnessGrade = '🔁 Repetitive';

  // Identify overused non-stop words
  const counts: Record<string, number> = {};
  rawWords.forEach(w => {
    if (!STOP_WORDS.has(w) && w.length > 2) {
      counts[w] = (counts[w] || 0) + 1;
    }
  });

  const overusedWords: OverusedWordItem[] = Object.entries(counts)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word, count]) => {
      const percentage = Math.round((count / totalWords) * 100);
      const synonyms = COMMON_SYNONYMS[word] || ['alternative', 'synonym', 'variation'];
      return {
        word,
        count,
        percentage,
        synonyms
      };
    });

  return {
    totalWords,
    uniqueWords,
    typeTokenRatio,
    richnessGrade,
    overusedWords
  };
}
