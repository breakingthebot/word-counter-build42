<!-- src/components/SentenceRhythmInspector.svelte -->
<!-- Sentence Structure & Length Rhythm Inspector component. -->
<!-- Connects to: src/services/sentenceRhythmService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { text } from '../stores/textStore';
  import { analyzeSentenceRhythm } from '../services/sentenceRhythmService';

  $: rhythm = analyzeSentenceRhythm($text);
</script>

<div class="rhythm-container card">
  <div class="rhythm-header">
    <div>
      <h4>🌊 Sentence Structure & Length Rhythm Inspector</h4>
      <p class="subtitle">Visual prose rhythm heatmap analyzing sentence length variation and pacing flow.</p>
    </div>

    {#if rhythm.totalSentences > 0}
      <span class="health-badge">{rhythm.rhythmHealth} ({rhythm.averageSentenceLength} avg words/sent)</span>
    {/if}
  </div>

  {#if rhythm.totalSentences > 0}
    <!-- Sentence Length Breakdown Meter -->
    <div class="breakdown-bar card">
      <div class="b-pill short">⚡ Short (&lt;10 words): <strong>{rhythm.shortCount}</strong></div>
      <div class="b-pill medium">📖 Medium (10-20 words): <strong>{rhythm.mediumCount}</strong></div>
      <div class="b-pill long">📝 Long (21-30 words): <strong>{rhythm.longCount}</strong></div>
      <div class="b-pill extra-long">⚠️ Extra Long (&gt;30 words): <strong>{rhythm.extraLongCount}</strong></div>
    </div>

    <!-- Visual Heatmap Canvas -->
    <div class="heatmap-box card">
      <span class="box-title">🎨 Sentence Rhythm Heatmap:</span>
      <div class="sentences-flow">
        {#each rhythm.sentences as s}
          <div 
            class="sentence-pill card" 
            class:short={s.classification === 'short'} 
            class:medium={s.classification === 'medium'} 
            class:long={s.classification === 'long'} 
            class:extra-long={s.classification === 'extra_long'}
          >
            <span class="s-badge">{s.badge} • {s.wordCount} words</span>
            <p class="s-text">{s.text}</p>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="empty-box card">
      ✍️ Type text in the editor above to view a live sentence length rhythm heatmap.
    </div>
  {/if}
</div>

<style>
  .rhythm-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(59, 130, 246, 0.04);
    border-color: rgba(59, 130, 246, 0.3);
  }

  .rhythm-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .rhythm-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .health-badge {
    font-size: 12px;
    font-weight: 800;
    color: var(--accent-cyan);
    background: rgba(6, 182, 212, 0.15);
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid rgba(6, 182, 212, 0.3);
  }

  .breakdown-bar {
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .b-pill {
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 12px;
    font-weight: 600;
  }

  .b-pill.short { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
  .b-pill.medium { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
  .b-pill.long { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
  .b-pill.extra-long { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }

  .heatmap-box {
    padding: 14px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .box-title { font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }

  .sentences-flow {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sentence-pill {
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-left: 4px solid;
  }

  .sentence-pill.short { border-left-color: #60a5fa; background: rgba(59, 130, 246, 0.03); }
  .sentence-pill.medium { border-left-color: #34d399; background: rgba(16, 185, 129, 0.03); }
  .sentence-pill.long { border-left-color: #fbbf24; background: rgba(245, 158, 11, 0.03); }
  .sentence-pill.extra-long { border-left-color: #f87171; background: rgba(239, 68, 68, 0.05); }

  .s-badge {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .s-text {
    font-size: 14px;
    color: var(--text-primary);
    line-height: 1.5;
  }

  .empty-box {
    padding: 14px;
    background: rgba(0, 0, 0, 0.2);
    color: var(--text-muted);
    font-size: 13px;
  }
</style>
