// src/services/typingTestService.ts
// Paragraph Typing Test & Accuracy Scoring service for Build 42.
// Connects to: src/components/WritingSprintTimer.svelte, src/App.svelte
// Created: 2026-07-25

export interface TypingPrompt {
  id: string;
  category: 'Tech & Coding' | 'Literature' | 'Philosophy' | 'Productivity';
  title: string;
  text: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const TYPING_PROMPTS: TypingPrompt[] = [
  {
    id: 'prompt-1',
    category: 'Tech & Coding',
    title: 'The Beauty of Svelte Reactivity',
    text: 'Svelte shifts reactivity from runtime interpretation to build-time compilation. Instead of using virtual DOM diffing, Svelte generates surgical JavaScript that updates the DOM directly whenever local state changes.',
    difficulty: 'Easy'
  },
  {
    id: 'prompt-2',
    category: 'Productivity',
    title: 'The Art of Deep Work',
    text: 'Deep work is the ability to focus without distraction on a cognitively demanding task. It allows you to quickly master complicated information and produce better results in less time.',
    difficulty: 'Easy'
  },
  {
    id: 'prompt-3',
    category: 'Philosophy',
    title: 'Reflections on Craftsmanship',
    text: 'Great craftsmanship requires patience, discipline, and attention to detail. Every line of code, paragraph of prose, or design element should serve a purpose and convey clarity.',
    difficulty: 'Medium'
  },
  {
    id: 'prompt-4',
    category: 'Literature',
    title: 'The Speed of Thought',
    text: 'Writing is thought captured on paper. As words flow seamlessly from mind to keyboard, the rhythm of typing becomes an instrument for expressing complex human ideas.',
    difficulty: 'Hard'
  }
];

export interface TypingTestScorecard {
  wpm: number;
  accuracy: number; // 0 to 100%
  correctChars: number;
  errorCount: number;
  totalChars: number;
  gradeBadge: string;
}

export function evaluateTypingTest(promptText: string, typedText: string, secondsElapsed: number): TypingTestScorecard {
  if (secondsElapsed <= 0 || !typedText) {
    return { wpm: 0, accuracy: 100, correctChars: 0, errorCount: 0, totalChars: 0, gradeBadge: '🌱 Starter' };
  }

  let correctChars = 0;
  let errorCount = 0;

  const minLength = Math.min(promptText.length, typedText.length);
  for (let i = 0; i < minLength; i++) {
    if (promptText[i] === typedText[i]) {
      correctChars++;
    } else {
      errorCount++;
    }
  }

  // Extra typed characters beyond prompt length count as errors
  if (typedText.length > promptText.length) {
    errorCount += typedText.length - promptText.length;
  }

  const accuracy = Math.max(0, Math.round((correctChars / Math.max(1, typedText.length)) * 100));

  // Standard WPM formula: (correct characters / 5) / (seconds / 60)
  const minutes = secondsElapsed / 60;
  const wpm = Math.round((correctChars / 5) / Math.max(0.1, minutes));

  let gradeBadge = '🌱 Starter Typist';
  if (wpm >= 80 && accuracy >= 95) gradeBadge = '⚡ Speed Master (80+ WPM)';
  else if (wpm >= 60 && accuracy >= 90) gradeBadge = '🎯 Precision Typist (60+ WPM)';
  else if (wpm >= 40) gradeBadge = '✍️ Fluent Typist (40+ WPM)';
  else if (wpm >= 25) gradeBadge = '📖 Steady Typist (25+ WPM)';

  return {
    wpm,
    accuracy,
    correctChars,
    errorCount,
    totalChars: typedText.length,
    gradeBadge
  };
}
