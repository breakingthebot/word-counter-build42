<!-- src/components/TextDiffViewer.svelte -->
<!-- Text Comparison & Diff Viewer component. -->
<!-- Connects to: src/services/textDiffService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { text } from '../stores/textStore';
  import { compareTexts } from '../services/textDiffService';

  let originalText = 'Welcome to WordCraft live text counter.';
  let revisedText = 'Welcome to WordCraft live reactive text counter and speed analyzer.';

  $: diffResult = compareTexts(originalText, revisedText);

  function loadFromMainEditor() {
    originalText = $text;
  }
</script>

<div class="diff-container card">
  <div class="diff-header">
    <div>
      <h4>🔍 Side-by-Side Text Comparison & Diff Viewer</h4>
      <p class="subtitle">Compare draft revisions with color-coded word additions and deletions.</p>
    </div>

    <button type="button" on:click={loadFromMainEditor} class="btn btn-secondary btn-sm">
      📥 Load Editor Text into Original
    </button>
  </div>

  <!-- Summary Metrics Row -->
  <div class="diff-metrics">
    <div class="metric-pill add">
      <span class="m-lbl">Additions</span>
      <strong class="m-val">+{diffResult.additionsCount}</strong>
    </div>

    <div class="metric-pill del">
      <span class="m-lbl">Deletions</span>
      <strong class="m-val">-{diffResult.deletionsCount}</strong>
    </div>

    <div class="metric-pill score">
      <span class="m-lbl">Similarity Score</span>
      <strong class="m-val">{diffResult.similarityPercentage}%</strong>
    </div>
  </div>

  <!-- Text Input Dual Pane -->
  <div class="pane-grid">
    <div class="pane card">
      <label class="pane-title" for="original-text-input">Original Version</label>
      <textarea 
        id="original-text-input"
        bind:value={originalText} 
        placeholder="Original text version..." 
        class="diff-textarea"
      ></textarea>
    </div>

    <div class="pane card">
      <label class="pane-title" for="revised-text-input">Revised Version</label>
      <textarea 
        id="revised-text-input"
        bind:value={revisedText} 
        placeholder="Revised text version..." 
        class="diff-textarea"
      ></textarea>
    </div>
  </div>

  <!-- Rendered Diff Output Window -->
  <div class="diff-output card">
    <span class="out-title">Visual Diff Output</span>
    <div class="diff-render">
      {#each diffResult.parts as part}
        {#if part.type === 'added'}
          <span class="diff-tag added">+{part.value}</span>
        {:else if part.type === 'removed'}
          <span class="diff-tag removed">-{part.value}</span>
        {:else}
          <span class="diff-tag unchanged">{part.value}</span>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  .diff-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(16, 185, 129, 0.04);
    border-color: rgba(16, 185, 129, 0.3);
  }

  .diff-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .diff-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .diff-metrics {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .metric-pill {
    padding: 8px 14px;
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.3);
  }

  .metric-pill.add { border: 1px solid var(--accent-emerald); }
  .metric-pill.add .m-val { color: var(--accent-emerald); }

  .metric-pill.del { border: 1px solid #ef4444; }
  .metric-pill.del .m-val { color: #ef4444; }

  .metric-pill.score { border: 1px solid var(--accent-cyan); }
  .metric-pill.score .m-val { color: var(--accent-cyan); }

  .m-lbl { font-size: 10px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; }
  .m-val { font-size: 16px; font-weight: 800; font-family: var(--font-mono); }

  .pane-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .pane {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: rgba(0, 0, 0, 0.25);
  }

  .pane-title { font-size: 12px; font-weight: 700; color: var(--text-secondary); }

  .diff-textarea {
    width: 100%;
    min-height: 100px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: #fff;
    font-size: 13px;
    padding: 8px;
    resize: vertical;
  }

  .diff-output {
    padding: 14px;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .out-title { font-size: 12px; font-weight: 800; color: var(--accent-emerald); text-transform: uppercase; }

  .diff-render {
    line-height: 1.8;
    font-size: 14px;
  }

  .diff-tag.added {
    background: rgba(16, 185, 129, 0.25);
    color: var(--accent-emerald);
    padding: 2px 4px;
    border-radius: 4px;
    font-weight: 700;
  }

  .diff-tag.removed {
    background: rgba(239, 68, 68, 0.25);
    color: #ef4444;
    text-decoration: line-through;
    padding: 2px 4px;
    border-radius: 4px;
  }

  .diff-tag.unchanged {
    color: var(--text-secondary);
  }
</style>
