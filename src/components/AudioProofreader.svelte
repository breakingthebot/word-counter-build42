<!-- src/components/AudioProofreader.svelte -->
<!-- Text-to-Speech Audio Proofreader component. -->
<!-- Connects to: src/services/speechSynthesisService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { text } from '../stores/textStore';
  import { isSpeechSupported, getAvailableVoices, clampSpeechRate } from '../services/speechSynthesisService';

  let voices: SpeechSynthesisVoice[] = [];
  let selectedVoiceURI = '';
  let speechRate = 1.0;
  let isPlaying = false;
  let isPaused = false;
  let currentWordIndex = -1;
  let currentUtterance: SpeechSynthesisUtterance | null = null;

  $: words = $text.trim() ? $text.trim().split(/\s+/) : [];

  onMount(() => {
    if (isSpeechSupported()) {
      voices = getAvailableVoices();
      if (voices.length > 0) {
        selectedVoiceURI = voices[0].voiceURI;
      }
      window.speechSynthesis.onvoiceschanged = () => {
        voices = getAvailableVoices();
        if (voices.length > 0 && !selectedVoiceURI) {
          selectedVoiceURI = voices[0].voiceURI;
        }
      };
    }
  });

  function playAudio() {
    if (!isSpeechSupported() || !$text.trim()) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      isPlaying = true;
      isPaused = false;
      return;
    }

    window.speechSynthesis.cancel();
    currentUtterance = new SpeechSynthesisUtterance($text);
    currentUtterance.rate = clampSpeechRate(speechRate);

    if (selectedVoiceURI) {
      const v = voices.find(voice => voice.voiceURI === selectedVoiceURI);
      if (v) currentUtterance.voice = v;
    }

    currentUtterance.onboundary = (e: SpeechSynthesisEvent) => {
      if (e.name === 'word') {
        const textUpToBoundary = $text.substring(0, e.charIndex);
        currentWordIndex = textUpToBoundary.trim().split(/\s+/).length - 1;
      }
    };

    currentUtterance.onend = () => {
      isPlaying = false;
      isPaused = false;
      currentWordIndex = -1;
    };

    currentUtterance.onerror = () => {
      isPlaying = false;
      isPaused = false;
      currentWordIndex = -1;
    };

    window.speechSynthesis.speak(currentUtterance);
    isPlaying = true;
    isPaused = false;
  }

  function pauseAudio() {
    if (isSpeechSupported() && isPlaying) {
      window.speechSynthesis.pause();
      isPlaying = false;
      isPaused = true;
    }
  }

  function stopAudio() {
    if (isSpeechSupported()) {
      window.speechSynthesis.cancel();
      isPlaying = false;
      isPaused = false;
      currentWordIndex = -1;
    }
  }

  onDestroy(() => {
    if (isSpeechSupported()) {
      window.speechSynthesis.cancel();
    }
  });
</script>

<div class="audio-proofreader card">
  <div class="audio-header">
    <div>
      <h4>🎧 Text-to-Speech Audio Proofreader</h4>
      <p class="subtitle">Listen to your copy read aloud to catch awkward phrasing, typos, and rhythm gaps.</p>
    </div>

    <!-- Speed Controls -->
    <div class="speed-presets">
      <button type="button" on:click={() => speechRate = 0.75} class="preset-btn" class:active={speechRate === 0.75}>0.75x</button>
      <button type="button" on:click={() => speechRate = 1.0} class="preset-btn" class:active={speechRate === 1.0}>1.0x Normal</button>
      <button type="button" on:click={() => speechRate = 1.25} class="preset-btn" class:active={speechRate === 1.25}>1.25x</button>
      <button type="button" on:click={() => speechRate = 1.5} class="preset-btn" class:active={speechRate === 1.5}>1.5x Fast</button>
    </div>
  </div>

  <!-- Audio Controls Bar -->
  <div class="controls-bar card">
    <div class="playback-btns">
      {#if !isPlaying}
        <button type="button" on:click={playAudio} disabled={!$text.trim()} class="btn btn-primary">
          ▶️ {isPaused ? 'Resume Audio' : 'Play Audio Proofreader'}
        </button>
      {:else}
        <button type="button" on:click={pauseAudio} class="btn btn-secondary">
          ⏸️ Pause
        </button>
      {/if}

      <button type="button" on:click={stopAudio} disabled={!isPlaying && !isPaused} class="btn btn-secondary">
        ⏹️ Stop
      </button>
    </div>

    <!-- Voice Selector Dropdown -->
    {#if voices.length > 0}
      <div class="voice-select-box">
        <label for="voice-selector" class="v-lbl">Voice:</label>
        <select id="voice-selector" bind:value={selectedVoiceURI} class="voice-select">
          {#each voices as v}
            <option value={v.voiceURI}>{v.name} ({v.lang})</option>
          {/each}
        </select>
      </div>
    {/if}
  </div>

  <!-- Active Word Highlight Display Box -->
  {#if isPlaying || isPaused}
    <div class="narration-box card fade-in">
      <span class="narr-head">🔊 Live Audio Narration:</span>
      <div class="words-flow">
        {#each words as word, idx}
          <span class="word-tag" class:active-word={idx === currentWordIndex}>{word} </span>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .audio-proofreader {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(16, 185, 129, 0.04);
    border-color: rgba(16, 185, 129, 0.3);
  }

  .audio-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .audio-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .speed-presets {
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
    background: var(--accent-emerald);
    color: #000;
    border-color: var(--accent-emerald);
  }

  .controls-bar {
    padding: 14px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .playback-btns {
    display: flex;
    gap: 8px;
  }

  .voice-select-box {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .v-lbl { font-size: 12px; color: var(--text-muted); font-weight: 700; }

  .voice-select {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: #fff;
    font-size: 12px;
    padding: 4px 8px;
    max-width: 250px;
  }

  .narration-box {
    padding: 14px;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .narr-head { font-size: 11px; font-weight: 800; color: var(--accent-emerald); text-transform: uppercase; }

  .words-flow {
    line-height: 1.8;
    font-size: 14px;
  }

  .word-tag {
    color: var(--text-secondary);
    transition: all 0.2s ease;
  }

  .word-tag.active-word {
    background: var(--accent-emerald);
    color: #000;
    font-weight: 800;
    padding: 2px 4px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }
</style>
