<!-- src/components/KeywordDensity.svelte -->
<!-- Keyword frequency density visualizer component. -->
<!-- Connects to: src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { keywordFrequencies, text } from '../stores/textStore';

  let searchFilter = '';

  $: filteredKeywords = $keywordFrequencies.filter(kw => 
    kw.word.toLowerCase().includes(searchFilter.toLowerCase())
  );

  $: queriedCount = searchFilter.trim() 
    ? ($text.toLowerCase().match(new RegExp(searchFilter.trim().toLowerCase(), 'g')) || []).length
    : 0;
</script>

<div class="keyword-density-card card">
  <div class="card-header">
    <div>
      <h4>🔤 Keyword Frequency & Density Analyzer</h4>
      <p class="subtitle">Top occurrence words excluding common English stop words.</p>
    </div>

    <!-- Quick Query Search Filter -->
    <div class="search-box">
      <input 
        type="text" 
        bind:value={searchFilter} 
        placeholder="Query specific word (e.g. svelte)..." 
        class="query-input"
      />
    </div>
  </div>

  {#if searchFilter.trim()}
    <div class="query-banner card">
      🔍 Word <strong>"{searchFilter}"</strong> appears <strong>{queriedCount}</strong> time(s) in your text.
    </div>
  {/if}

  {#if filteredKeywords.length > 0}
    <div class="kw-list">
      {#each filteredKeywords as kw}
        <div class="kw-row card">
          <div class="kw-meta">
            <span class="kw-word">{kw.word}</span>
            <span class="kw-count">{kw.count} count ({kw.percentage}%)</span>
          </div>

          <div class="bar-bg">
            <div class="bar-fill" style="width: {kw.percentage * 3}%;"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="empty-msg">No significant keywords detected. Type or paste more text to see density results!</p>
  {/if}
</div>

<style>
  .keyword-density-card {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(6, 182, 212, 0.04);
    border-color: rgba(6, 182, 212, 0.3);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .card-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .query-input {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: #fff;
    font-size: 12px;
    padding: 6px 12px;
    font-family: var(--font-sans);
    outline: none;
    min-width: 220px;
  }

  .query-input:focus {
    border-color: var(--accent-cyan);
  }

  .query-banner {
    padding: 10px 14px;
    background: rgba(6, 182, 212, 0.15);
    border-color: var(--accent-cyan);
    font-size: 13px;
    color: var(--text-primary);
  }

  .kw-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  @media (min-width: 600px) {
    .kw-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .kw-row {
    padding: 10px 14px;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .kw-meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }

  .kw-word { font-weight: 700; color: var(--text-primary); }
  .kw-count { font-weight: 600; color: var(--accent-cyan); }

  .bar-bg {
    height: 4px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 2px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    background: var(--accent-cyan);
    border-radius: 2px;
  }

  .empty-msg {
    font-size: 12px;
    color: var(--text-muted);
    font-style: italic;
  }
</style>
