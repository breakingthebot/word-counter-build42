# Changelog

All notable changes to **Build 42 (GourmetWord — Reactive Svelte Live Word & Character Counter)** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.12.0] - 2026-07-25

### Added
- Integrated **Sentence Structure & Length Rhythm Inspector** in `src/services/sentenceRhythmService.ts` and `src/components/SentenceRhythmInspector.svelte`.
- Added sentence length classification thresholds (`short`, `medium`, `long`, `extra_long`).
- Added sentence breakdown distribution bar, average sentence length counter, and rhythm health status (`🌊 Excellent Flow`, `⚡ Energetic & Punchy`, `📜 Dense & Complex`, `🔁 Monotonous`).
- Added visual prose rhythm heatmap canvas highlighting sentence length pills.
- Added unit tests in `src/services/sentenceRhythmService.spec.ts`.

## [0.11.0] - 2026-07-25

### Added
- Integrated **Ambient Distraction-Free Zen Focus Mode** in `src/services/zenFocusService.ts` and `src/components/ZenFocusModal.svelte`.
- Added 5 ambient color themes (*Nord Frost*, *Cyberpunk Neon*, *Obsidian Dark*, *Vintage Sepia*, *Emerald Forest*).
- Added Web Audio API typewriter click sound effect generator.
- Added fullscreen writing canvas with floating live word count & reading time footer and `ESC` key exit shortcut.
- Added launcher button in `src/components/Header.svelte`.
- Added unit tests in `src/services/zenFocusService.spec.ts`.

## [0.10.0] - 2026-07-25

### Added
- Integrated **Vocabulary Variety & Type-Token Ratio (TTR) Richness Analyzer** in `src/services/vocabularyService.ts` and `src/components/VocabularyRichness.svelte`.
- Added Type-Token Ratio percentage gauge (0 - 100%), unique word ratio, and richness grade badges (`🌟 Exceptional`, `📖 High Variety`, `📝 Moderate Variety`, `🔁 Repetitive`).
- Added overused word detection and 1-Click synonym pills.
- Added unit tests in `src/services/vocabularyService.spec.ts`.

## [0.9.0] - 2026-07-25

### Added
- Integrated **Text-to-Speech Audio Proofreader** in `src/services/speechSynthesisService.ts` and `src/components/AudioProofreader.svelte`.
- Added Web Speech API playback controls (`▶️ Play`, `⏸️ Pause`, `⏹️ Stop`).
- Added voice selection dropdown, speech rate controls (`0.75x`, `1.0x`, `1.25x`, `1.5x`), and active word highlight narration window.
- Added unit tests in `src/services/speechSynthesisService.spec.ts`.

## [0.8.0] - 2026-07-25

### Added
- Integrated **SEO & Social Media Post Compliance Checker** in `src/services/socialComplianceService.ts` and `src/components/SocialComplianceChecker.svelte`.
- Added platform character limit meters for Twitter/X (280 chars), SEO Titles (60 chars), SEO Meta Descriptions (160 chars), LinkedIn posts (3,000 chars), Instagram captions (2,200 chars), and SMS messages (160 chars).
- Added progress bars with dynamic status indicators (`optimal`, `warning`, `exceeded`).
- Added 1-Click `✂️ Trim to Limit` action buttons.
- Added unit tests in `src/services/socialComplianceService.spec.ts`.

## [0.7.0] - 2026-07-25

### Added
- Integrated **Paragraph Typing Test Mode** in `src/services/typingTestService.ts` and `src/components/WritingSprintTimer.svelte`.
- Added practice paragraph dataset across 4 categories (`Tech & Coding`, `Productivity`, `Philosophy`, `Literature`).
- Added real-time character accuracy rate (%), typo error counter, WPM speed scoring, and grade badges.
- Added mode toggle between `⚡ Freeform Writing Sprint` and `⌨️ Paragraph Typing Test`.
- Added unit tests in `src/services/typingTestService.spec.ts`.

## [0.6.0] - 2026-07-25

### Added
- Integrated **Text Comparison & Diff Viewer** in `src/services/textDiffService.ts` and `src/components/TextDiffViewer.svelte`.
- Added side-by-side text comparison textareas with 1-click loading from main editor.
- Added real-time diff metric badges (`+ Additions`, `- Deletions`, `🎯 Similarity Score`).
- Added color-coded diff output view (green additions, red strikethrough deletions).
- Added unit tests in `src/services/textDiffService.spec.ts`.

## [0.5.0] - 2026-07-25

### Added
- Integrated **Reading Time Estimator for Custom Speeds** in `src/services/customReadingSpeedService.ts` and `src/components/CustomSpeedEstimator.svelte`.
- Added interactive WPM slider (50 - 500 WPM) with real-time recalculated reading duration.
- Added 5 audience reading profiles comparison grid (`⚡ Fast Skimmer`, `📖 Standard Adult`, `🎙️ Audiobook`, `🎓 Academic`, `🌍 ESL Learner`).
- Updated `README.md` with live Vercel deployment URL (`https://word-counter-build42.vercel.app`).
- Fixed accessibility (`A11y`) button markup in Svelte components.
- Added unit tests in `src/services/customReadingSpeedService.spec.ts`.

## [0.4.0] - 2026-07-25

### Added
- Integrated **Multi-Format Document Exporter (PDF, Markdown, HTML)** in `src/services/multiFormatExportService.ts`.
- Added Markdown document exporter (`📄 Export Markdown (.md)`) with frontmatter metadata (`title`, `words`, `date`).
- Added HTML document exporter (`🌐 Export HTML (.html)`) and Printable PDF document window (`🖨️ Printable PDF`).
- Updated `AGENTS.md` standard for GitHub repository description and topics, and updated GitHub metadata via `gh repo edit`.
- Added unit tests in `src/services/multiFormatExportService.spec.ts`.

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
