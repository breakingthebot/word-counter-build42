<!-- src/components/WritingFlawScanner.svelte -->
<!-- Grammar & Writing Flaws Scanner component. -->
<!-- Connects to: src/services/flawScannerService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { text } from '../stores/textStore';
  import { scanTextFlaws, type WritingFlaw } from '../services/flawScannerService';

  let selectedFilter = 'All';

  $: flaws = scanTextFlaws($text);

  $: filteredFlaws = selectedFilter === 'All' 
    ? flaws 
    : flaws.filter(f => f.type === selectedFilter);

  $: counts = {
    passive: flaws.filter(f => f.type === 'Passive Voice').length,
    cliche: flaws.filter(f => f.type === 'Cliche').length,
    wordy: flaws.filter(f => f.type === 'Wordy Phrase').length,
    hard: flaws.filter(f => f.type === 'Hard Sentence').length
  };
</script>

<div class="flaw-scanner card">
  <div class="scanner-header">
    <div>
      <h4>🔍 Grammar & Writing Style Flaw Scanner</h4>
      <p class="subtitle">Real-time passive voice, clichés, wordy constructions, and sentence length audit.</p>
    </div>

    <!-- Summary Badges -->
    <div class="summary-pills">
      <span class="pill-badge warning">⚠️ {counts.passive} Passive</span>
      <span class="pill-badge suggestion">💡 {counts.cliche} Clichés</span>
      <span class="pill-badge suggestion">🧹 {counts.wordy} Wordy</span>
      <span class="pill-badge error">🛑 {counts.hard} Hard</span>
    </div>
  </div>

  <!-- Filter Chips Row -->
  <div class="filter-chips">
    <button on:click={() => selectedFilter = 'All'} class="chip-btn" class:active={selectedFilter === 'All'}>
      All ({flaws.length})
    </button>
    <button on:click={() => selectedFilter = 'Passive Voice'} class="chip-btn" class:active={selectedFilter === 'Passive Voice'}>
      Passive Voice ({counts.passive})
    </button>
    <button on:click={() => selectedFilter = 'Cliche'} class="chip-btn" class:active={selectedFilter === 'Cliche'}>
      Clichés ({counts.cliche})
    </button>
    <button on:click={() => selectedFilter = 'Wordy Phrase'} class="chip-btn" class:active={selectedFilter === 'Wordy Phrase'}>
      Wordy Phrases ({counts.wordy})
    </button>
    <button on:click={() => selectedFilter = 'Hard Sentence'} class="chip-btn" class:active={selectedFilter === 'Hard Sentence'}>
      Hard Sentences ({counts.hard})
    </button>
  </div>

  <!-- Flaws Feed List -->
  {#if filteredFlaws.length > 0}
    <div class="flaws-grid">
      {#each filteredFlaws as flaw}
        <div class="flaw-card card" class:warning={flaw.severity === 'warning'} class:error={flaw.severity === 'error'}>
          <div class="flaw-head">
            <span class="flaw-type">{flaw.type}</span>
            <span class="severity-tag">{flaw.severity}</span>
          </div>

          <p class="flaw-text">"{flaw.text}"</p>

          <div class="suggestion-box card">
            <span class="sugg-lbl">💡 Suggestion:</span>
            <strong class="sugg-val">{flaw.suggestion}</strong>
          </div>

          <p class="explanation">{flaw.explanation}</p>
        </div>
      {/each}
    </div>
  {:else}
    <div class="clean-msg card">
      ✨ <strong>Great prose clarity!</strong> No writing flaws or passive voice constructions detected in your current text filter.
    </div>
  {/if}
</div>

<style>
  .flaw-scanner {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(245, 158, 11, 0.04);
    border-color: rgba(245, 158, 11, 0.3);
  }

  .scanner-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .scanner-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .summary-pills {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .pill-badge {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: var(--radius-sm);
  }

  .pill-badge.warning { background: rgba(245, 158, 11, 0.15); color: var(--accent-amber); }
  .pill-badge.suggestion { background: rgba(6, 182, 212, 0.15); color: var(--accent-cyan); }
  .pill-badge.error { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

  .filter-chips {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .chip-btn {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .chip-btn.active {
    background: var(--accent-amber);
    color: #000;
    border-color: var(--accent-amber);
  }

  .flaws-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;

    @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .flaw-card {
    padding: 14px;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .flaw-card.warning { border-color: rgba(245, 158, 11, 0.3); }
  .flaw-card.error { border-color: rgba(239, 68, 68, 0.3); }

  .flaw-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flaw-type { font-size: 12px; font-weight: 800; color: var(--accent-amber); }
  .severity-tag { font-size: 10px; text-transform: uppercase; color: var(--text-muted); }

  .flaw-text { font-size: 13px; color: var(--text-primary); font-style: italic; }

  .suggestion-box {
    padding: 8px 10px;
    background: rgba(255, 255, 255, 0.03);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sugg-lbl { font-size: 11px; color: var(--accent-cyan); font-weight: 700; }
  .sugg-val { font-size: 12px; color: var(--text-primary); }

  .explanation { font-size: 11px; color: var(--text-muted); line-height: 1.3; }

  .clean-msg {
    padding: 14px;
    background: rgba(16, 185, 129, 0.1);
    border-color: var(--accent-emerald);
    color: var(--text-primary);
    font-size: 13px;
  }
</style>
