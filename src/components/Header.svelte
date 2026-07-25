<!-- src/components/Header.svelte -->
<!-- Header component with target word goal calculator and Zen Focus launcher. -->
<!-- Connects to: src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { wordGoal, metrics, setWordGoal } from '../stores/textStore';

  const dispatch = createEventDispatcher();
  let customGoalInput = $wordGoal;

  function handleGoalChange(e: Event) {
    const val = parseInt((e.target as HTMLInputElement).value, 10);
    if (!isNaN(val) && val > 0) {
      setWordGoal(val);
      customGoalInput = val;
    }
  }

  function selectPresetGoal(target: number) {
    setWordGoal(target);
    customGoalInput = target;
  }

  function openZen() {
    dispatch('openZenMode');
  }
</script>

<header class="app-header card">
  <div class="header-main">
    <div class="brand-row">
      <span class="logo-icon">📝</span>
      <div>
        <h1 class="app-title">WordCraft</h1>
        <p class="app-subtitle">Reactive Svelte Live Word, Character & Readability Counter</p>
      </div>

      <button type="button" on:click={openZen} class="zen-launch-btn">
        🧘 Zen Focus Mode
      </button>
    </div>

    <!-- Word Target Goal Controls -->
    <div class="goal-widget">
      <div class="goal-meta">
        <span class="goal-lbl">🎯 Target Word Goal:</span>
        <div class="preset-pills">
          <button on:click={() => selectPresetGoal(250)} class="preset-btn" class:active={$wordGoal === 250}>250</button>
          <button on:click={() => selectPresetGoal(500)} class="preset-btn" class:active={$wordGoal === 500}>500</button>
          <button on:click={() => selectPresetGoal(1000)} class="preset-btn" class:active={$wordGoal === 1000}>1,000</button>
          <button on:click={() => selectPresetGoal(2000)} class="preset-btn" class:active={$wordGoal === 2000}>2,000</button>
        </div>

        <input 
          type="number" 
          value={customGoalInput} 
          on:change={handleGoalChange} 
          class="goal-input" 
          min="50" 
          step="50"
        />
      </div>

      <!-- Goal Progress Bar -->
      <div class="goal-gauge">
        <div class="gauge-bar-bg">
          <div 
            class="gauge-bar-fill" 
            style="width: {$metrics.goalProgressPercent}%;"
          ></div>
        </div>

        <span class="gauge-pct">{$metrics.wordCount} / {$wordGoal} words ({$metrics.goalProgressPercent}%)</span>
      </div>
    </div>
  </div>
</header>

<style>
  .app-header {
    padding: 20px 24px;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.12), rgba(15, 23, 42, 0.7));
    border-color: rgba(6, 182, 212, 0.3);
  }

  .header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .brand-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .logo-icon {
    font-size: 36px;
  }

  .app-title {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(135deg, #fff, var(--accent-cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .app-subtitle {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .zen-launch-btn {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(6, 182, 212, 0.25));
    border: 1px solid rgba(168, 85, 247, 0.5);
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    padding: 6px 14px;
    border-radius: 20px;
    cursor: pointer;
    margin-left: 12px;
  }

  .zen-launch-btn:hover {
    background: rgba(168, 85, 247, 0.5);
    transform: translateY(-1px);
  }

  .goal-widget {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 280px;
  }

  .goal-meta {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .goal-lbl {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-muted);
  }

  .preset-pills {
    display: flex;
    gap: 4px;
  }

  .preset-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    cursor: pointer;
  }

  .preset-btn.active {
    background: var(--accent-cyan);
    color: #000;
    border-color: var(--accent-cyan);
  }

  .goal-input {
    width: 65px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: #fff;
    font-size: 12px;
    padding: 3px 6px;
    font-family: var(--font-sans);
    text-align: center;
  }

  .goal-gauge {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .gauge-bar-bg {
    height: 8px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    overflow: hidden;
  }

  .gauge-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald));
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .gauge-pct {
    font-size: 11px;
    color: var(--accent-cyan);
    font-weight: 700;
    text-align: right;
  }
</style>
