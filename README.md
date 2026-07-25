# GourmetWord — Reactive Svelte Live Word, Character & Readability Counter

A lightning-fast, reactive text analysis tool built with Svelte 4, Vite, and TypeScript. Provides live character, word, sentence, and paragraph counts as you type, along with Flesch-Kincaid readability scoring, top keyword frequency density analysis, case conversions, text cleanup utilities, and 1-click `.txt` file export.

## Stack
- **Framework**: Svelte 4 + Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Dark Glassmorphic Theme with HSL gradients)
- **State Management**: Svelte Writable & Derived Stores
- **Testing**: Vitest

## Setup
```bash
# Clone the repository
git clone https://github.com/breakingthebot/word-counter-build42.git
cd Build_42

# Install dependencies
npm install

# Run dev server
npm run dev
```

## Environment Variables
Refer to `.env.example`:
```
VITE_APP_TITLE=GourmetWord Live Text & Word Counter
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
"I built GourmetWord as a reactive live text counter in Svelte. Svelte's compile-time reactivity makes computing text statistics (words, characters, sentences, paragraphs, reading speed, and Flesch-Kincaid readability grade) virtually instantaneous on every keystroke with zero UI lag. I implemented text transformation tools (case conversions, line deduplication, HTML stripping) and an export engine that packages text into downloadable `.txt` files or saves drafts to local browser storage."

## Features
- ⚡ **Reactive Real-Time Metrics**: Character count (with & without spaces), word count, sentence count, and paragraph count.
- 🎯 **Target Word Goal Gauge**: Visual progress bar tracking word goals (250, 500, 1000, 2000 words).
- 📊 **Flesch Reading Ease & Grade Level**: Automatic readability scoring and silent reading / public speaking time estimates.
- 🔤 **Top Keyword Density Analyzer**: Keyword occurrence table excluding stop words with search filtering.
- 🔠 **Case Conversion Tools**: UPPERCASE, lowercase, Title Case, Sentence case, Slugify.
- 🧹 **Text Cleanup Utilities**: Remove extra spaces, remove line breaks, strip HTML tags, deduplicate lines.
- 📥 **Export & Drafts**: Download `.txt` files, copy to clipboard, or save named browser drafts.

## Data Handling
Default posture: Process everything locally in memory. Zero user text data is transmitted to external servers.

## License
MIT License
