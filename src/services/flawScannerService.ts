// src/services/flawScannerService.ts
// Grammar & Writing Flaws Scanner service for Build 42.
// Connects to: src/components/WritingFlawScanner.svelte, src/App.svelte
// Created: 2026-07-25

export interface WritingFlaw {
  id: string;
  type: 'Passive Voice' | 'Cliche' | 'Wordy Phrase' | 'Hard Sentence';
  text: string;
  suggestion: string;
  severity: 'warning' | 'suggestion' | 'error';
  explanation: string;
}

const PASSIVE_VOICE_PATTERNS = [
  { regex: /\b(?:am|is|are|was|were|be|been|being)\s+(?:\w+ed|written|made|done|taken|given|seen|built|chosen)\b/gi, explanation: 'Consider converting to active voice for stronger impact.' }
];

const CLICHE_PHRASES = [
  { phrase: 'at the end of the day', suggestion: 'ultimately' },
  { phrase: 'think outside the box', suggestion: 'think creatively' },
  { phrase: 'low hanging fruit', suggestion: 'easy targets' },
  { phrase: 'few and far between', suggestion: 'rare' },
  { phrase: 'in a nutshell', suggestion: 'briefly' },
  { phrase: 'hit the nail on the head', suggestion: 'be exact' },
  { phrase: 'touch base', suggestion: 'contact' },
  { phrase: 'take it to the next level', suggestion: 'improve' }
];

const WORDY_PHRASES = [
  { phrase: 'due to the fact that', suggestion: 'because' },
  { phrase: 'in order to', suggestion: 'to' },
  { phrase: 'at this point in time', suggestion: 'now' },
  { phrase: 'in the event that', suggestion: 'if' },
  { phrase: 'until such time as', suggestion: 'until' },
  { phrase: 'for the purpose of', suggestion: 'for' },
  { phrase: 'with the exception of', suggestion: 'except' },
  { phrase: 'has the ability to', suggestion: 'can' }
];

export function scanTextFlaws(text: string): WritingFlaw[] {
  if (!text.trim()) return [];

  const flaws: WritingFlaw[] = [];
  let flawId = 1;

  // 1. Passive Voice Detection
  PASSIVE_VOICE_PATTERNS.forEach(p => {
    let match;
    while ((match = p.regex.exec(text)) !== null) {
      flaws.push({
        id: `flaw-${flawId++}`,
        type: 'Passive Voice',
        text: match[0],
        suggestion: 'Rephrase using active subject',
        severity: 'warning',
        explanation: p.explanation
      });
    }
  });

  // 2. Cliche Detection
  const lowerText = text.toLowerCase();
  CLICHE_PHRASES.forEach(item => {
    if (lowerText.includes(item.phrase)) {
      flaws.push({
        id: `flaw-${flawId++}`,
        type: 'Cliche',
        text: item.phrase,
        suggestion: `Use "${item.suggestion}" instead`,
        severity: 'suggestion',
        explanation: 'Overused cliché phrase that weakens prose clarity.'
      });
    }
  });

  // 3. Wordy Phrases Detection
  WORDY_PHRASES.forEach(item => {
    if (lowerText.includes(item.phrase)) {
      flaws.push({
        id: `flaw-${flawId++}`,
        type: 'Wordy Phrase',
        text: item.phrase,
        suggestion: `Simplify to "${item.suggestion}"`,
        severity: 'suggestion',
        explanation: 'Wordy construction that can be stated more concisely.'
      });
    }
  });

  // 4. Hard-to-Read Sentences (Sentences > 30 words)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  sentences.forEach(sent => {
    const wordCount = sent.trim().split(/\s+/).length;
    if (wordCount > 30) {
      const snippet = sent.trim().slice(0, 50) + '...';
      flaws.push({
        id: `flaw-${flawId++}`,
        type: 'Hard Sentence',
        text: snippet,
        suggestion: 'Break into 2 shorter sentences',
        severity: 'error',
        explanation: `Long sentence containing ${wordCount} words (ideal length is under 25 words).`
      });
    }
  });

  return flaws;
}
