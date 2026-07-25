<!-- src/App.svelte -->
<!-- Root App component for WordCraft Live Text & Word Counter. -->
<!-- Connects to: src/components/*, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import Header from './components/Header.svelte';
  import MetricsOverview from './components/MetricsOverview.svelte';
  import WritingSprintTimer from './components/WritingSprintTimer.svelte';
  import TextEditor from './components/TextEditor.svelte';
  import WritingFlawScanner from './components/WritingFlawScanner.svelte';
  import SocialComplianceChecker from './components/SocialComplianceChecker.svelte';
  import TextToolsBar from './components/TextToolsBar.svelte';
  import CustomSpeedEstimator from './components/CustomSpeedEstimator.svelte';
  import AudioProofreader from './components/AudioProofreader.svelte';
  import VocabularyRichness from './components/VocabularyRichness.svelte';
  import SentenceRhythmInspector from './components/SentenceRhythmInspector.svelte';
  import TextDiffViewer from './components/TextDiffViewer.svelte';
  import ReadabilityScore from './components/ReadabilityScore.svelte';
  import KeywordDensity from './components/KeywordDensity.svelte';
  import ExportToolbar from './components/ExportToolbar.svelte';
  import ZenFocusModal from './components/ZenFocusModal.svelte';

  let isZenOpen = false;
</script>

<main class="container">
  <Header on:openZenMode={() => isZenOpen = true} />

  <MetricsOverview />

  <WritingSprintTimer />

  <TextEditor />

  <WritingFlawScanner />

  <SocialComplianceChecker />

  <TextToolsBar />

  <CustomSpeedEstimator />

  <AudioProofreader />

  <VocabularyRichness />

  <SentenceRhythmInspector />

  <TextDiffViewer />

  <div class="analytics-grid">
    <ReadabilityScore />
    <KeywordDensity />
  </div>

  <ExportToolbar />

  <footer class="app-footer">
    <p>WordCraft — Built with Svelte, Vite, & TypeScript • Open Source MIT License</p>
  </footer>
</main>

<ZenFocusModal bind:isOpen={isZenOpen} />

<style>
  .analytics-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (min-width: 900px) {
    .analytics-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .app-footer {
    text-align: center;
    padding: 16px;
    font-size: 12px;
    color: var(--text-muted);
    border-top: 1px solid var(--border-color);
  }
</style>
