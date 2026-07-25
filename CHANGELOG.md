# Changelog

All notable changes to **Build 42 (GourmetWord — Reactive Svelte Live Word & Character Counter)** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
