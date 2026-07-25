<!-- src/components/ZenFocusModal.svelte -->
<!-- Ambient Distraction-Free Zen Focus Mode component. -->
<!-- Connects to: src/services/zenFocusService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { text, updateText, metrics } from '../stores/textStore';
  import { ZEN_THEMES, getThemeById, playTypewriterSound } from '../services/zenFocusService';

  export let isOpen = false;

  let currentThemeId = 'nord';
  let enableTypewriterSound = true;

  $: activeTheme = getThemeById(currentThemeId);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      isOpen = false;
    } else if (enableTypewriterSound && e.key.length === 1) {
      playTypewriterSound();
    }
  }

  function onInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    if (target) {
      updateText(target.value);
    }
  }

  function closeZenMode() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <!-- Fullscreen Zen Canvas Overlay -->
  <div 
    class="zen-overlay fade-in" 
    style="background: {activeTheme.bg}; color: {activeTheme.text};"
    on:keydown={handleKeyDown}
    tabindex="0"
    role="dialog"
    aria-modal="true"
  >
    <!-- Top Floating Controls Header -->
    <header class="zen-header" style="border-color: {activeTheme.border};">
      <div class="header-title">
        <span class="zen-logo">🧘 Zen Focus Mode</span>
        <span class="esc-tip">Press <kbd>ESC</kbd> to exit</span>
      </div>

      <!-- Theme Selector Bar -->
      <div class="theme-bar">
        {#each ZEN_THEMES as t}
          <button 
            type="button" 
            on:click={() => currentThemeId = t.id} 
            class="theme-pill"
            class:selected={t.id === currentThemeId}
            style="border-color: {t.accent};"
          >
            {t.name}
          </button>
        {/each}
      </div>

      <!-- Audio Toggle & Exit Button -->
      <div class="right-actions">
        <button 
          type="button" 
          on:click={() => enableTypewriterSound = !enableTypewriterSound} 
          class="audio-toggle-btn"
        >
          {enableTypewriterSound ? '🔊 Typewriter Sound On' : '🔇 Muted'}
        </button>

        <button type="button" on:click={closeZenMode} class="exit-btn">
          ❌ Exit
        </button>
      </div>
    </header>

    <!-- Centered Fullscreen Text Area -->
    <main class="zen-editor-wrapper">
      <textarea
        value={$text}
        on:input={onInput}
        on:keydown={handleKeyDown}
        placeholder="Unleash your thoughts into quiet focus..."
        class="zen-textarea"
        style="color: {activeTheme.text}; font-family: 'Merriweather', 'Inter', Georgia, serif;"
        autofocus
      ></textarea>
    </main>

    <!-- Bottom Floating Metrics Footer -->
    <footer class="zen-footer" style="border-color: {activeTheme.border};">
      <div class="footer-metrics">
        <span>⚡ <strong>{$metrics.wordCount}</strong> words</span>
        <span>•</span>
        <span>📝 <strong>{$metrics.characterCount}</strong> chars</span>
        <span>•</span>
        <span>⏱️ <strong>{$metrics.readingTimeMinutes} min</strong> read time</span>
      </div>
    </footer>
  </div>
{/if}

<style>
  .zen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;
    box-sizing: border-box;
    outline: none;
  }

  .zen-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid;
    flex-wrap: wrap;
    gap: 12px;
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .zen-logo { font-size: 18px; font-weight: 800; }
  .esc-tip { font-size: 11px; opacity: 0.7; }

  kbd {
    background: rgba(255, 255, 255, 0.15);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }

  .theme-bar {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .theme-pill {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid;
    color: inherit;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s ease;
  }

  .theme-pill.selected, .theme-pill:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  .right-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .audio-toggle-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: inherit;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .exit-btn {
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.5);
    color: inherit;
    padding: 6px 14px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
  }

  .zen-editor-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 0;
  }

  .zen-textarea {
    width: 100%;
    max-width: 800px;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    font-size: 22px;
    line-height: 1.8;
  }

  .zen-footer {
    display: flex;
    justify-content: center;
    padding-top: 16px;
    border-top: 1px solid;
  }

  .footer-metrics {
    display: flex;
    gap: 12px;
    font-size: 14px;
    opacity: 0.8;
  }
</style>
