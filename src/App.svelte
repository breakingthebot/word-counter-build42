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
  import TextToolsBar from './components/TextToolsBar.svelte';
  import ReadabilityScore from './components/ReadabilityScore.svelte';
  import CustomSpeedEstimator from './components/CustomSpeedEstimator.svelte';
  import KeywordDensity from './components/KeywordDensity.svelte';
  import ExportToolbar from './components/ExportToolbar.svelte';
</script>

<main class="container">
  <Header />

  <MetricsOverview />

  <WritingSprintTimer />

  <TextEditor />

  <WritingFlawScanner />

  <TextToolsBar />

  <CustomSpeedEstimator />

  <div class="analytics-grid">
    <ReadabilityScore />
    <KeywordDensity />
  </div>

  <ExportToolbar />

  <footer class="app-footer">
    <p>WordCraft — Built with Svelte, Vite, & TypeScript • Open Source MIT License</p>
  </footer>
</main>

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
