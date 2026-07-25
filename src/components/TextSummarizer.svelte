<!-- src/components/TextSummarizer.svelte -->
<!-- Text Summarizer & Key Bullet Point Generator component. -->
<!-- Connects to: src/services/summarizerService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { text } from '../stores/textStore';
  import { generateExtractiveSummary } from '../services/summarizerService';

  let targetSentences = 3;
  let isCopied = false;

  $: summary = generateExtractiveSummary($text, targetSentences);

  async function copySummary() {
    if (summary.keyBulletPoints.length > 0) {
      const summaryText = summary.keyBulletPoints.join('\n');
      await navigator.clipboard.writeText(summaryText);
      isCopied = true;
      setTimeout(() => isCopied = false, 2000);
    }
  }
</script>

<div class="summarizer-container card">
  <div class="sum-header">
    <div>
      <h4>📌 Text Summarizer & Executive Bullet Point Generator</h4>
      <p class="subtitle">Extracts key lead sentences and generates executive bullet point summaries using tf-idf frequency scoring.</p>
    </div>

    <!-- Sentence Count Presets -->
    <div class="count-presets">
      <button type="button" on:click={() => targetSentences = 1} class="preset-btn" class:active={targetSentences === 1}>1 Sentence</button>
      <button type="button" on:click={() => targetSentences = 3} class="preset-btn" class:active={targetSentences === 3}>3 Sentences</button>
      <button type="button" on:click={() => targetSentences = 5} class="preset-btn" class:active={targetSentences === 5}>5 Sentences</button>
    </div>
  </div>

  {#if summary.summarySentences.length > 0}
    <!-- Summary Stats Bar -->
    <div class="stats-row card">
      <div class="stat-box">
        <span class="s-lbl">Original Sentences</span>
        <span class="s-val">{summary.originalSentenceCount}</span>
      </div>
      <div class="stat-box">
        <span class="s-lbl">Summary Sentences</span>
        <span class="s-val">{summary.summarizedSentenceCount}</span>
      </div>
      <div class="stat-box">
        <span class="s-lbl">Compression Ratio</span>
        <span class="s-val green">{summary.compressionRatio}% smaller</span>
      </div>
    </div>

    <!-- Key Bullet Points Card -->
    <div class="summary-box card fade-in">
      <div class="box-head">
        <span class="head-title">💡 Executive Summary & Key Takeaways:</span>
        <button type="button" on:click={copySummary} class="btn btn-secondary">
          {isCopied ? '✅ Copied!' : '📋 Copy Summary'}
        </button>
      </div>

      <ul class="bullet-list">
        {#each summary.keyBulletPoints as bp}
          <li class="bullet-item">{bp.replace(/^•\s*/, '')}</li>
        {/each}
      </ul>
    </div>
  {:else}
    <div class="empty-box card">
      ✍️ Type text in the editor above to extract a key bullet point summary.
    </div>
  {/if}
</div>

<style>
  .summarizer-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(245, 158, 11, 0.04);
    border-color: rgba(245, 158, 11, 0.3);
  }

  .sum-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .sum-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .count-presets {
    display: flex;
    gap: 6px;
  }

  .preset-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .preset-btn.active {
    background: var(--accent-amber);
    color: #000;
    border-color: var(--accent-amber);
  }

  .stats-row {
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .stat-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .s-lbl { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
  .s-val { font-size: 18px; font-weight: 800; color: var(--text-primary); font-family: var(--font-mono); }
  .s-val.green { color: var(--accent-emerald); }

  .summary-box {
    padding: 16px;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .box-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .head-title { font-size: 12px; font-weight: 800; color: var(--accent-amber); text-transform: uppercase; }

  .bullet-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    margin: 0;
  }

  .bullet-item {
    font-size: 14px;
    color: var(--text-primary);
    line-height: 1.6;
  }

  .empty-box {
    padding: 14px;
    background: rgba(0, 0, 0, 0.2);
    color: var(--text-muted);
    font-size: 13px;
  }
</style>
