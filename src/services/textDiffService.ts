// src/services/textDiffService.ts
// Text Comparison & Diff Viewer service for Build 42.
// Connects to: src/components/TextDiffViewer.svelte, src/App.svelte
// Created: 2026-07-25

export interface DiffPart {
  value: string;
  type: 'added' | 'removed' | 'unchanged';
}

export interface DiffResult {
  parts: DiffPart[];
  additionsCount: number;
  deletionsCount: number;
  unchangedCount: number;
  similarityPercentage: number;
}

export function compareTexts(original: string, revised: string): DiffResult {
  const origWords = original.trim() ? original.trim().split(/\s+/) : [];
  const revWords = revised.trim() ? revised.trim().split(/\s+/) : [];

  if (origWords.length === 0 && revWords.length === 0) {
    return {
      parts: [],
      additionsCount: 0,
      deletionsCount: 0,
      unchangedCount: 0,
      similarityPercentage: 100
    };
  }

  const parts: DiffPart[] = [];
  let additionsCount = 0;
  let deletionsCount = 0;
  let unchangedCount = 0;

  let i = 0;
  let j = 0;

  while (i < origWords.length || j < revWords.length) {
    if (i < origWords.length && j < revWords.length && origWords[i] === revWords[j]) {
      parts.push({ value: origWords[i] + ' ', type: 'unchanged' });
      unchangedCount++;
      i++;
      j++;
    } else if (j < revWords.length && (!origWords.slice(i).includes(revWords[j]))) {
      parts.push({ value: revWords[j] + ' ', type: 'added' });
      additionsCount++;
      j++;
    } else if (i < origWords.length) {
      parts.push({ value: origWords[i] + ' ', type: 'removed' });
      deletionsCount++;
      i++;
    } else {
      break;
    }
  }

  const totalWords = Math.max(origWords.length, revWords.length, 1);
  const similarityPercentage = Math.min(100, Math.max(0, Math.round((unchangedCount / totalWords) * 100)));

  return {
    parts,
    additionsCount,
    deletionsCount,
    unchangedCount,
    similarityPercentage
  };
}
