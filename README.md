# WordCraft — Reactive Svelte Live Word, Character & Readability Counter

A lightning-fast, reactive text analysis tool built with Svelte 4 (`^4.2.0`), Vite, and TypeScript. Provides live character, word, sentence, and paragraph counts as you type, along with Flesch-Kincaid readability scoring, top keyword frequency density analysis, writing sprint timer, paragraph typing test mode, prose flaw scanner, SEO & social media compliance checker, text-to-speech audio proofreader, vocabulary variety (TTR) analyzer, ambient Zen focus mode, sentence rhythm inspector, side-by-side text comparison diff viewer, custom speed estimator, multi-format export (PDF, Markdown, HTML, TXT), and browser draft history.

## Stack
- **Framework**: Svelte 4 (`^4.2.0`) + Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Dark Glassmorphic Theme with HSL gradients)
- **State Management**: Svelte Writable & Derived Stores (`svelte/store`)
- **Testing**: Vitest

## Setup
```bash
# Clone the repository
git clone https://github.com/breakingthebot/word-counter-build42.git
cd word-counter-build42

# Install dependencies
npm install

# Run dev server
npm run dev
```

## Environment Variables
Refer to `.env.example`:
```
VITE_APP_TITLE=WordCraft Live Text & Word Counter
```

## Running Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Running Tests
```bash
npm run test
```

## Deployed
- **Live Vercel Production**: [https://word-counter-build42.vercel.app](https://word-counter-build42.vercel.app)
- **GitHub Repository**: [https://github.com/breakingthebot/word-counter-build42](https://github.com/breakingthebot/word-counter-build42)

## Architecture Notes
Plain English explanation of what was built and why:
"I built WordCraft as a reactive live text counter in Svelte 4. Svelte's compile-time reactivity makes computing text statistics (words, characters, sentences, paragraphs, reading speed, and Flesch-Kincaid readability grade) virtually instantaneous on every keystroke with zero UI lag using Svelte's Writable and Derived stores. I implemented text transformation tools (case conversions, line deduplication, HTML stripping), multi-format export engines (PDF, Markdown, HTML, TXT), paragraph typing test modes, speech synthesis proofreading, SEO compliance checkers, and local browser storage (`localStorage`) draft management."

## Features
- ⚡ **Reactive Real-Time Metrics**: Character count (with & without spaces), word count, sentence count, and paragraph count.
- 🎯 **Target Word Goal Gauge**: Visual progress bar tracking word goals (250, 500, 1000, 2000 words).
- 📊 **Flesch Reading Ease & Grade Level**: Automatic readability scoring and silent reading / public speaking time estimates.
- ⏱️ **Writing Sprint & Typing Test Mode**: Timed freeform sprints or practice paragraph typing speed & accuracy tests.
- 🚨 **Prose Flaw Scanner**: Real-time detection for passive voice, overused clichés, wordy phrases, and long sentences.
- 🕮 **SEO & Social Media Compliance**: Live character limit meters for Twitter/X (280 chars), SEO Titles (60 chars), Meta Descriptions (160 chars), LinkedIn, Instagram, and SMS.
- 🎧 **Text-to-Speech Audio Proofreader**: Web Speech API narrator with speed controls (0.75x - 1.5x) and active word highlighting.
- 📊 **Vocabulary Variety (TTR) Analyzer**: Type-Token Ratio richness score, overused word repetition flags, and synonym pills.
- 🧘 **Ambient Zen Focus Mode**: Fullscreen writing canvas with 5 color themes (*Nord*, *Cyberpunk*, *Obsidian*, *Sepia*, *Emerald*) and Web Audio API typewriter sounds.
- 🌊 **Sentence Rhythm Inspector**: Visual sentence length breakdown and prose rhythm heatmap canvas.
- 🔤 **Top Keyword Density Analyzer**: Keyword occurrence table excluding stop words with search filtering.
- 🔍 **Side-by-Side Text Diff Viewer**: Dual-pane text comparison with color-coded additions, deletions, and similarity score %.
- 🔠 **Case Conversion Tools**: UPPERCASE, lowercase, Title Case, Sentence case, Slugify.
- 🧹 **Text Cleanup Utilities**: Remove extra spaces, remove line breaks, strip HTML tags, deduplicate lines.
- 📥 **Multi-Format Exporter**: Download PDF, Markdown (`.md`), HTML (`.html`), TXT (`.txt`), copy to clipboard, or save named browser drafts.

## Data Handling
Default posture: All live text analysis and metrics processing happen client-side in browser memory. Drafts explicitly saved by the user are persisted locally in the browser's `localStorage`. Zero user text data is transmitted to external servers or third-party APIs.

## License
MIT License
