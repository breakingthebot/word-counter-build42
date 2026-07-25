<!-- src/components/WritingSprintTimer.svelte -->
<!-- Writing Goal Timer & Productivity Sprint Tracker component. -->
<!-- Connects to: src/services/sprintTimerService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { onDestroy } from 'svelte';
  import { metrics } from '../stores/textStore';
  import { calculateSprintWpm, formatTimerSeconds, calculateSprintProgress } from '../services/sprintTimerService';

  let selectedDuration = 15; // default 15 mins
  let targetWordsGoal = 300;
  let isActive = false;
  let isPaused = false;
  let secondsRemaining = selectedDuration * 60;
  let secondsElapsed = 0;
  let initialWordCount = 0;
  let timerInterval: any = null;
  let isCompleted = false;

  $: wordsWritten = Math.max(0, $metrics.wordCount - initialWordCount);
  $: currentWpm = calculateSprintWpm(wordsWritten, secondsElapsed);
  $: progressPercent = calculateSprintProgress(wordsWritten, targetWordsGoal);

  function startSprint() {
    isActive = true;
    isPaused = false;
    isCompleted = false;
    initialWordCount = $metrics.wordCount;
    secondsElapsed = 0;
    secondsRemaining = selectedDuration * 60;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!isPaused && secondsRemaining > 0) {
        secondsRemaining--;
        secondsElapsed++;
        if (secondsRemaining === 0) {
          completeSprint();
        }
      }
    }, 1000);
  }

  function pauseSprint() {
    isPaused = true;
  }

  function resumeSprint() {
    isPaused = false;
  }

  function resetSprint() {
    clearInterval(timerInterval);
    isActive = false;
    isPaused = false;
    isCompleted = false;
    secondsRemaining = selectedDuration * 60;
    secondsElapsed = 0;
  }

  function completeSprint() {
    clearInterval(timerInterval);
    isActive = false;
    isCompleted = true;
  }

  function selectPreset(mins: number, words: number) {
    selectedDuration = mins;
    targetWordsGoal = words;
    secondsRemaining = mins * 60;
  }

  onDestroy(() => {
    clearInterval(timerInterval);
  });
</script>

<div class="sprint-container card">
  <div class="sprint-header">
    <div>
      <h4>⚡ Writing Goal Sprint & Productivity Tracker</h4>
      <p class="subtitle">Timed writing sprints with live WPM speed gauge & word goal tracking.</p>
    </div>

    <!-- Duration Preset Selector -->
    {#if !isActive}
      <div class="preset-group">
        <button on:click={() => selectPreset(5, 100)} class="preset-pill" class:active={selectedDuration === 5}>⚡ 5m Quick</button>
        <button on:click={() => selectPreset(15, 300)} class="preset-pill" class:active={selectedDuration === 15}>🔥 15m Focus</button>
        <button on:click={() => selectPreset(25, 500)} class="preset-pill" class:active={selectedDuration === 25}>⏱️ 25m Pomodoro</button>
      </div>
    {/if}
  </div>

  <!-- Active Sprint Dashboard -->
  <div class="sprint-dashboard card">
    <div class="dash-row">
      <!-- Countdown Clock -->
      <div class="timer-box">
        <span class="timer-lbl">Time Remaining</span>
        <div class="timer-display">{formatTimerSeconds(secondsRemaining)}</div>
      </div>

      <!-- Live Speedometer -->
      <div class="wpm-box">
        <span class="wpm-lbl">Writing Speed</span>
        <div class="wpm-display">⚡ {currentWpm} <span class="unit">WPM</span></div>
      </div>

      <!-- Words Progress -->
      <div class="progress-box">
        <span class="p-lbl">Sprint Words</span>
        <div class="p-val">{wordsWritten} / {targetWordsGoal} words</div>
      </div>

      <!-- Controls -->
      <div class="controls-box">
        {#if !isActive}
          <button on:click={startSprint} class="btn btn-primary">🚀 Start Sprint</button>
        {:else if isPaused}
          <button on:click={resumeSprint} class="btn btn-primary">▶️ Resume</button>
          <button on:click={resetSprint} class="btn btn-secondary">🔄 Reset</button>
        {:else}
          <button on:click={pauseSprint} class="btn btn-secondary">⏸️ Pause</button>
          <button on:click={resetSprint} class="btn btn-secondary">🔄 Reset</button>
        {/if}
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="sprint-bar-bg">
      <div class="sprint-bar-fill" style="width: {progressPercent}%;"></div>
    </div>
  </div>

  <!-- Sprint Completion Celebration Modal -->
  {#if isCompleted}
    <div class="celebration-box card fade-in">
      🎉 <strong>Sprint Completed!</strong> You wrote <strong>{wordsWritten} words</strong> in {selectedDuration} minutes at an average speed of <strong>{currentWpm} WPM</strong>!
    </div>
  {/if}
</div>

<style>
  .sprint-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(6, 182, 212, 0.04);
    border-color: rgba(6, 182, 212, 0.3);
  }

  .sprint-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .sprint-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .preset-group {
    display: flex;
    gap: 6px;
  }

  .preset-pill {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .preset-pill.active {
    background: var(--accent-cyan);
    color: #000;
    border-color: var(--accent-cyan);
  }

  .sprint-dashboard {
    padding: 16px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .dash-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .timer-lbl, .wpm-lbl, .p-lbl {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 700;
    text-transform: uppercase;
  }

  .timer-display {
    font-size: 26px;
    font-weight: 800;
    font-family: var(--font-mono);
    color: var(--accent-cyan);
  }

  .wpm-display {
    font-size: 24px;
    font-weight: 800;
    color: var(--accent-emerald);
  }

  .unit { font-size: 12px; font-weight: 600; color: var(--text-muted); }

  .p-val {
    font-size: 16px;
    font-weight: 800;
    color: var(--text-primary);
  }

  .controls-box {
    display: flex;
    gap: 8px;
  }

  .sprint-bar-bg {
    height: 6px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 3px;
    overflow: hidden;
  }

  .sprint-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald));
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .celebration-box {
    padding: 14px 18px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(15, 23, 42, 0.8));
    border-color: var(--accent-emerald);
    color: var(--text-primary);
    font-size: 14px;
  }
</style>
