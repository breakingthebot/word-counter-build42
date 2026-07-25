<!-- src/components/VocabularyRichness.svelte -->
<!-- Vocabulary Variety & Type-Token Ratio (TTR) Richness Analyzer component. -->
<!-- Connects to: src/services/vocabularyService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { text } from '../stores/textStore';
  import { analyzeVocabularyRichness } from '../services/vocabularyService';

  $: vocab = analyzeVocabularyRichness($text);
</script>

<div class="vocab-container card">
  <div class="vocab-header">
    <div>
      <h4>📊 Vocabulary Variety & Type-Token Ratio (TTR) Analyzer</h4>
      <p class="subtitle">Measures vocabulary richness, unique word diversity, and overused word repetitions.</p>
    </div>

    <span class="richness-badge">{vocab.richnessGrade} ({vocab.typeTokenRatio}% TTR)</span>
  </div>

  <!-- Metrics Summary Row -->
  <div class="metrics-row card">
    <div class="m-box">
      <span class="m-lbl">Type-Token Ratio</span>
      <div class="m-val">{vocab.typeTokenRatio}%</div>
    </div>

    <div class="m-box">
      <span class="m-lbl">Unique Words</span>
      <div class="m-val">{vocab.uniqueWords} <span class="sub-val">/ {vocab.totalWords}</span></div>
    </div>

    <div class="m-box">
      <span class="m-lbl">Repetition Alert</span>
      <div class="m-val">{vocab.overusedWords.length} <span class="sub-val">words flagged</span></div>
    </div>
  </div>

  <!-- Overused Words & Synonyms Grid -->
  {#if vocab.overusedWords.length > 0}
    <div class="overused-box card">
      <span class="box-title">🔁 Overused Word Repetitions & Synonym Suggestions:</span>
      <div class="words-grid">
        {#each vocab.overusedWords as item}
          <div class="word-card card">
            <div class="w-head">
              <strong class="w-name">"{item.word}"</strong>
              <span class="w-count">{item.count}x ({item.percentage}%)</span>
            </div>

            <div class="synonym-pills">
              {#each item.synonyms as syn}
                <span class="syn-pill">💡 {syn}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:else if vocab.totalWords > 0}
    <div class="clean-box card">
      ✨ <strong>Excellent vocabulary variety!</strong> No overused word repetitions detected in your current text.
    </div>
  {/if}
</div>

<style>
  .vocab-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(236, 72, 153, 0.04);
    border-color: rgba(236, 72, 153, 0.3);
  }

  .vocab-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .vocab-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .richness-badge {
    font-size: 12px;
    font-weight: 800;
    color: var(--accent-pink, #ec4899);
    background: rgba(236, 72, 153, 0.15);
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid rgba(236, 72, 153, 0.3);
  }

  .metrics-row {
    padding: 14px;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .m-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .m-lbl { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
  .m-val { font-size: 22px; font-weight: 800; color: var(--text-primary); font-family: var(--font-mono); }
  .sub-val { font-size: 13px; color: var(--text-muted); font-weight: normal; }

  .overused-box {
    padding: 14px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .box-title { font-size: 12px; font-weight: 800; color: var(--accent-amber); text-transform: uppercase; }

  .words-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;

    @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .word-card {
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.03);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .w-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .w-name { font-size: 14px; color: var(--text-primary); }
  .w-count { font-size: 11px; color: var(--accent-amber); font-weight: 700; }

  .synonym-pills {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .syn-pill {
    font-size: 11px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 2px 8px;
    border-radius: 12px;
  }

  .clean-box {
    padding: 14px;
    background: rgba(16, 185, 129, 0.1);
    border-color: var(--accent-emerald);
    color: var(--text-primary);
    font-size: 13px;
  }
</style>
