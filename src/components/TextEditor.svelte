<!-- src/components/TextEditor.svelte -->
<!-- Reactive textarea editor component with live character/line tracking. -->
<!-- Connects to: src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { text, updateText, clearText } from '../stores/textStore';

  let isMonospace = false;
  let cursorLine = 1;
  let cursorCol = 1;

  function handleInput(e: Event) {
    const val = (e.target as HTMLTextAreaElement).value;
    updateText(val);
    updateCursorPos(e.target as HTMLTextAreaElement);
  }

  function handleSelectionChange(e: Event) {
    updateCursorPos(e.target as HTMLTextAreaElement);
  }

  function updateCursorPos(textarea: HTMLTextAreaElement) {
    const pos = textarea.selectionStart || 0;
    const textUpToCursor = textarea.value.substring(0, pos);
    const lines = textUpToCursor.split('\n');
    cursorLine = lines.length;
    cursorCol = lines[lines.length - 1].length + 1;
  }

  function pasteSampleText() {
    updateText(`Svelte 5 is a groundbreaking web framework that brings true fine-grained reactivity to modern frontend development.

By compiling components down to lightweight, frameworkless JavaScript, Svelte apps load instantaneously and execute with minimal overhead.

This live word counter application demonstrates real-time reactive binding, character analytics, readability scoring, and file export functionality.`);
  }
</script>

<div class="editor-container card">
  <div class="editor-toolbar">
    <div class="cursor-status">
      <span class="status-badge">Ln {cursorLine}, Col {cursorCol}</span>
      <button on:click={() => isMonospace = !isMonospace} class="tool-btn">
        {isMonospace ? '🔤 Sans-Serif Font' : '💻 Monospace Font'}
      </button>
    </div>

    <div class="editor-actions">
      <button on:click={pasteSampleText} class="btn btn-secondary btn-sm">📋 Paste Sample Text</button>
      <button on:click={clearText} class="btn btn-secondary btn-sm clear-btn">🗑️ Clear Text</button>
    </div>
  </div>

  <textarea
    value={$text}
    on:input={handleInput}
    on:keyup={handleSelectionChange}
    on:click={handleSelectionChange}
    placeholder="Type or paste your text here to begin live counting..."
    class="text-input"
    class:monospace={isMonospace}
    rows="12"
  ></textarea>
</div>

<style>
  .editor-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid var(--border-color);
    flex-wrap: wrap;
    gap: 8px;
  }

  .cursor-status {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .status-badge {
    font-size: 11px;
    font-family: var(--font-mono);
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.05);
    padding: 2px 8px;
    border-radius: var(--radius-sm);
  }

  .tool-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 12px;
    cursor: pointer;
    font-weight: 500;
  }

  .tool-btn:hover {
    color: var(--accent-cyan);
  }

  .editor-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-sm {
    padding: 4px 10px;
    font-size: 12px;
  }

  .clear-btn:hover {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.3);
  }

  .text-input {
    width: 100%;
    padding: 16px;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 15px;
    font-family: var(--font-sans);
    line-height: 1.6;
    outline: none;
    resize: vertical;
    min-height: 240px;
  }

  .text-input.monospace {
    font-family: var(--font-mono);
  }

  .text-input::placeholder {
    color: var(--text-muted);
  }
</style>
