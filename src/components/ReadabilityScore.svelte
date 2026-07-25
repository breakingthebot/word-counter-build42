<!-- src/components/ReadabilityScore.svelte -->
<!-- Readability scoring and reading duration analyzer component. -->
<!-- Connects to: src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { metrics } from '../stores/textStore';
</script>

<div class="readability-card card">
  <div class="card-header">
    <div>
      <h4>📊 Readability Score & Timing Analyzer</h4>
      <p class="subtitle">Estimated reading/speaking duration & Flesch-Kincaid Grade Level</p>
    </div>
    <span class="grade-badge">{$metrics.readabilityGrade}</span>
  </div>

  <div class="readability-content">
    <!-- Timing Metrics -->
    <div class="time-box">
      <div class="time-item card">
        <span class="t-icon">⏱️</span>
        <div>
          <span class="t-val">{$metrics.readingTimeMinutes} min</span>
          <span class="t-lbl">Silent Reading Time</span>
        </div>
      </div>

      <div class="time-item card">
        <span class="t-icon">🎙️</span>
        <div>
          <span class="t-val">{$metrics.speakingTimeMinutes} min</span>
          <span class="t-lbl">Public Speaking Time</span>
        </div>
      </div>
    </div>

    <!-- Flesch Ease Score Gauge -->
    <div class="flesch-gauge-box card">
      <div class="flesch-row">
        <span class="f-lbl">Flesch Reading Ease Score:</span>
        <strong class="f-val">{$metrics.fleschScore} / 100</strong>
      </div>

      <div class="flesch-bar-bg">
        <div 
          class="flesch-bar-fill" 
          style="width: {$metrics.fleschScore}%;"
        ></div>
      </div>
      <p class="flesch-hint">Higher scores (70-100) indicate plain, accessible reading for general audiences.</p>
    </div>
  </div>
</div>

<style>
  .readability-card {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(168, 85, 247, 0.04);
    border-color: rgba(168, 85, 247, 0.3);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .card-header h4 {
    font-size: 16px;
    color: var(--text-primary);
  }

  .subtitle {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .grade-badge {
    font-size: 12px;
    font-weight: 800;
    color: var(--accent-purple);
    background: rgba(168, 85, 247, 0.15);
    padding: 4px 12px;
    border-radius: 20px;
  }

  .readability-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (min-width: 768px) {
    .readability-content {
      grid-template-columns: 1fr 1fr;
    }
  }

  .time-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .time-item {
    padding: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(0, 0, 0, 0.25);
  }

  .t-icon { font-size: 24px; }
  .t-val { font-size: 18px; font-weight: 800; color: var(--text-primary); display: block; }
  .t-lbl { font-size: 11px; color: var(--text-secondary); }

  .flesch-gauge-box {
    padding: 16px;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .flesch-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .f-lbl { color: var(--text-secondary); }
  .f-val { color: var(--accent-purple); font-weight: 800; }

  .flesch-bar-bg {
    height: 8px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    overflow: hidden;
  }

  .flesch-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .flesch-hint {
    font-size: 11px;
    color: var(--text-muted);
    line-height: 1.4;
  }
</style>
