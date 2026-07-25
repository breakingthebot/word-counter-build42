<!-- src/components/CustomSpeedEstimator.svelte -->
<!-- Custom Reading Speed Estimator & Audience Comparison component. -->
<!-- Connects to: src/services/customReadingSpeedService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { metrics } from '../stores/textStore';
  import { AUDIENCE_PROFILES, calculateCustomReadingTime } from '../services/customReadingSpeedService';

  let customWpm = 225; // default 225 WPM

  $: customReadingTime = calculateCustomReadingTime($metrics.wordCount, customWpm);
</script>

<div class="custom-speed-card card">
  <div class="card-header">
    <div>
      <h4>⏱️ Custom Reading Speed & Audience Estimator</h4>
      <p class="subtitle">Adjust WPM slider or compare reading durations across audience profiles.</p>
    </div>

    <span class="speed-badge">⏱️ {customReadingTime.formattedText} ({customWpm} WPM)</span>
  </div>

  <!-- Interactive WPM Slider -->
  <div class="slider-box card">
    <div class="slider-meta">
      <span class="slider-lbl">Reading Speed WPM:</span>
      <strong class="slider-val">{customWpm} WPM</strong>
    </div>

    <input 
      type="range" 
      bind:value={customWpm} 
      min="50" 
      max="500" 
      step="10" 
      class="wpm-slider"
    />
  </div>

  <!-- Audience Profiles Comparison Grid -->
  <div class="audience-grid">
    {#each AUDIENCE_PROFILES as profile}
      <button 
        type="button"
        class="profile-card card" 
        class:active={customWpm === profile.wpm}
        on:click={() => customWpm = profile.wpm}
      >
        <div class="prof-head">
          <span class="prof-icon">{profile.icon}</span>
          <strong class="prof-name">{profile.name}</strong>
        </div>

        <div class="prof-time">
          {calculateCustomReadingTime($metrics.wordCount, profile.wpm).formattedText}
        </div>

        <span class="prof-wpm">{profile.wpm} WPM</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .custom-speed-card {
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

  .speed-badge {
    font-size: 12px;
    font-weight: 800;
    color: var(--accent-cyan);
    background: rgba(6, 182, 212, 0.15);
    padding: 4px 12px;
    border-radius: 20px;
  }

  .slider-box {
    padding: 14px;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .slider-meta {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .slider-lbl { color: var(--text-secondary); }
  .slider-val { color: var(--accent-cyan); font-weight: 800; }

  .wpm-slider {
    width: 100%;
    accent-color: var(--accent-cyan);
    cursor: pointer;
  }

  .audience-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .profile-card {
    padding: 12px;
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    flex-direction: column;
    gap: 6px;
    cursor: pointer;
    text-align: left;
    border: 1px solid var(--border-color);
  }

  .profile-card:hover, .profile-card.active {
    border-color: var(--accent-cyan);
    background: rgba(6, 182, 212, 0.1);
  }

  .prof-head {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .prof-icon { font-size: 16px; }
  .prof-name { font-size: 11px; color: var(--text-primary); }

  .prof-time {
    font-size: 14px;
    font-weight: 800;
    color: var(--accent-cyan);
    font-family: var(--font-mono);
  }

  .prof-wpm {
    font-size: 10px;
    color: var(--text-muted);
  }
</style>
