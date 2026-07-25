# Changelog

All notable changes to **Build 42 (GourmetWord — Reactive Svelte Live Word & Character Counter)** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-07-25

### Added
- Integrated **Grammar & Writing Style Flaw Scanner** in `src/services/flawScannerService.ts` and `src/components/WritingFlawScanner.svelte`.
- Rebranded application from `GourmetWord` to **WordCraft** to eliminate prefix drift from Build 41.
- Added real-time detection for passive voice constructions, clichés, wordy phrases, and long/hard sentences (>30 words).
- Added filter tabs and actionable 1-click writing improvement suggestions.
- Embedded flaw scanner into `src/App.svelte`.
- Added unit tests in `src/services/flawScannerService.spec.ts`.

## [0.2.0] - 2026-07-25

### Added
- Integrated **Writing Goal Timer & Productivity Sprint Tracker** in `src/services/sprintTimerService.ts` and `src/components/WritingSprintTimer.svelte`.
- Added preset sprint duration buttons (5m Quick, 15m Focus, 25m Pomodoro).
- Added live countdown timer, real-time WPM speedometer gauge (`⚡ WPM`), target word goal progress bar, and completion celebration modal.
- Embedded sprint timer widget into `src/App.svelte`.
- Added unit tests in `src/services/sprintTimerService.spec.ts`.

## [0.1.0] - 2026-07-25

### Added
- Initialized Svelte 4 + Vite + TypeScript project for Build 42.
- Created `src/services/textAnalysisService.ts` for text metrics calculation (words, characters, sentences, paragraphs, Flesch Reading Ease score, reading/speaking speed, keyword frequency density).
- Added text transformation functions (UPPERCASE, lowercase, Title Case, Sentence case, Slugify).
- Added text cleanup helpers (remove extra spaces, remove line breaks, strip HTML tags, deduplicate lines).
- Created Svelte stores in `src/stores/textStore.ts` for reactive state, target word goals, and saved draft history.
- Created Svelte components: `Header.svelte`, `MetricsOverview.svelte`, `TextEditor.svelte`, `TextToolsBar.svelte`, `ReadabilityScore.svelte`, `KeywordDensity.svelte`, `ExportToolbar.svelte`.
- Integrated `.txt` file export downloader, clipboard copying, and browser draft history manager.
- Added unit tests in `src/services/textAnalysisService.spec.ts`.
