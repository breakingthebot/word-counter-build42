<!-- src/components/TextToolsBar.svelte -->
<!-- Text transformation and cleanup tool buttons. -->
<!-- Connects to: src/services/textAnalysisService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { applyTransformation } from '../stores/textStore';
  import { 
    toUpperCase, 
    toLowerCase, 
    toTitleCase, 
    toSentenceCase, 
    toSlugify, 
    removeExtraSpaces, 
    removeLineBreaks, 
    stripHtml, 
    removeDuplicateLines 
  } from '../services/textAnalysisService';
</script>

<div class="tools-bar card">
  <div class="tools-section">
    <span class="section-label">🔤 Case Conversions:</span>
    <div class="tool-group">
      <button on:click={() => applyTransformation(toUpperCase)} class="tool-chip">🔠 UPPERCASE</button>
      <button on:click={() => applyTransformation(toLowerCase)} class="tool-chip">🔡 lowercase</button>
      <button on:click={() => applyTransformation(toTitleCase)} class="tool-chip">🔤 Title Case</button>
      <button on:click={() => applyTransformation(toSentenceCase)} class="tool-chip">📝 Sentence case</button>
      <button on:click={() => applyTransformation(toSlugify)} class="tool-chip">🔗 Slugify</button>
    </div>
  </div>

  <div class="tools-section">
    <span class="section-label">🧹 Text Cleanup:</span>
    <div class="tool-group">
      <button on:click={() => applyTransformation(removeExtraSpaces)} class="tool-chip">🧹 Remove Extra Spaces</button>
      <button on:click={() => applyTransformation(removeLineBreaks)} class="tool-chip">↵ Remove Line Breaks</button>
      <button on:click={() => applyTransformation(stripHtml)} class="tool-chip">🏷️ Strip HTML Tags</button>
      <button on:click={() => applyTransformation(removeDuplicateLines)} class="tool-chip">✂️ Deduplicate Lines</button>
    </div>
  </div>
</div>

<style>
  .tools-bar {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: rgba(255, 255, 255, 0.02);
  }

  .tools-section {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .section-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-muted);
    min-width: 140px;
  }

  .tool-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tool-chip {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: var(--font-sans);
    transition: all 0.2s ease;
  }

  .tool-chip:hover {
    background: rgba(6, 182, 212, 0.15);
    color: var(--accent-cyan);
    border-color: var(--accent-cyan);
  }
</style>
