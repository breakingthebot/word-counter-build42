<!-- src/components/MetricsOverview.svelte -->
<!-- Reactive metric overview cards displaying real-time text counts. -->
<!-- Connects to: src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { metrics } from '../stores/textStore';
</script>

<div class="metrics-grid">
  <!-- Words Card -->
  <div class="metric-card card">
    <div class="card-head">
      <span class="icon">📖</span>
      <span class="lbl">Total Words</span>
    </div>
    <div class="val">{$metrics.wordCount.toLocaleString()}</div>
    <div class="subtext">Target goal: {$metrics.goalProgressPercent}%</div>
  </div>

  <!-- Characters Card -->
  <div class="metric-card card">
    <div class="card-head">
      <span class="icon">🔤</span>
      <span class="lbl">Characters</span>
    </div>
    <div class="val">{$metrics.characterCount.toLocaleString()}</div>
    <div class="subtext">Excl. spaces: {$metrics.characterNoSpaceCount.toLocaleString()}</div>
  </div>

  <!-- Sentences Card -->
  <div class="metric-card card">
    <div class="card-head">
      <span class="icon">💬</span>
      <span class="lbl">Sentences</span>
    </div>
    <div class="val">{$metrics.sentenceCount.toLocaleString()}</div>
    <div class="subtext">Avg words/sent: {$metrics.avgSentenceLength}</div>
  </div>

  <!-- Paragraphs Card -->
  <div class="metric-card card">
    <div class="card-head">
      <span class="icon">📄</span>
      <span class="lbl">Paragraphs</span>
    </div>
    <div class="val">{$metrics.paragraphCount.toLocaleString()}</div>
    <div class="subtext">Avg char/word: {$metrics.avgWordLength}</div>
  </div>
</div>

<style>
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (min-width: 768px) {
    .metrics-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .metric-card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: rgba(255, 255, 255, 0.02);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .metric-card:hover {
    border-color: var(--accent-cyan);
    transform: translateY(-2px);
  }

  .card-head {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon {
    font-size: 18px;
  }

  .lbl {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .val {
    font-size: 28px;
    font-weight: 800;
    color: var(--text-primary);
    font-family: var(--font-mono);
  }

  .subtext {
    font-size: 11px;
    color: var(--text-secondary);
  }
</style>
