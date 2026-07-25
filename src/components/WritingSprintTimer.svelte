<!-- src/components/WritingSprintTimer.svelte -->
<!-- Writing Goal Timer, Productivity Sprint Tracker, & Paragraph Typing Test component. -->
<!-- Connects to: src/services/sprintTimerService.ts, src/services/typingTestService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { onDestroy } from 'svelte';
  import { metrics, text, clearText } from '../stores/textStore';
  import { calculateSprintWpm, formatTimerSeconds, calculateSprintProgress } from '../services/sprintTimerService';
  import { TYPING_PROMPTS, evaluateTypingTest, type TypingPrompt } from '../services/typingTestService';

  // Mode Selection
  let mode: 'sprint' | 'typing_test' = 'sprint';

  // Freeform Sprint State
  let selectedDuration = 15; // default 15 mins
  let targetWordsGoal = 300;
  let isActive = false;
  let isPaused = false;
  let secondsRemaining = selectedDuration * 60;
  let secondsElapsed = 0;
  let initialWordCount = 0;
  let timerInterval: any = null;
  let isCompleted = false;

  // Typing Test State
  let selectedPrompt: TypingPrompt = TYPING_PROMPTS[0];

  $: {
    if ($metrics.wordCount < initialWordCount && isActive) {
      initialWordCount = 0;
    }
  }

  $: wordsWritten = isActive || isCompleted ? Math.max(0, $metrics.wordCount - initialWordCount) : 0;
  $: currentWpm = calculateSprintWpm(wordsWritten, secondsElapsed);
  $: progressPercent = calculateSprintProgress(wordsWritten, targetWordsGoal);

  // Typing Test Scorecard Calculation
  $: testScorecard = evaluateTypingTest(selectedPrompt.text, $text, secondsElapsed);

  function startSprint(clearEditor: boolean = false) {
    if (clearEditor || mode === 'typing_test') {
      clearText();
      initialWordCount = 0;
    } else {
      initialWordCount = $metrics.wordCount;
    }

    isActive = true;
    isPaused = false;
    isCompleted = false;
    secondsElapsed = 0;
    secondsRemaining = mode === 'typing_test' ? 60 : selectedDuration * 60; // 1-min default for typing test

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!isPaused && secondsRemaining > 0) {
        secondsRemaining = secondsRemaining - 1;
        secondsElapsed = secondsElapsed + 1;

        if (secondsRemaining <= 0) {
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
    secondsRemaining = mode === 'typing_test' ? 60 : selectedDuration * 60;
    secondsElapsed = 0;
    initialWordCount = 0;
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

  function handleSelectPrompt(promptId: string) {
    const found = TYPING_PROMPTS.find(p => p.id === promptId);
    if (found) {
      selectedPrompt = found;
      resetSprint();
    }
  }

  function onPromptSelect(e: Event) {
    const target = e.target as HTMLSelectElement;
    if (target) {
      handleSelectPrompt(target.value);
    }
  }

  onDestroy(() => {
    clearInterval(timerInterval);
  });
</script>

<div class="sprint-container card">
  <div class="sprint-header">
    <div>
      <div class="title-row">
        <h4>⚡ Writing Goal Sprint & Paragraph Typing Test</h4>
        {#if isActive && !isPaused}
          <span class="active-badge pulse">🟢 TIMER ACTIVE</span>
        {:else if isPaused}
          <span class="paused-badge">⏸️ PAUSED</span>
        {/if}
      </div>
      <p class="subtitle">Timed freeform writing sprints or real paragraph typing speed & accuracy tests.</p>
    </div>

    <!-- Mode Switcher -->
    <div class="mode-switcher">
      <button 
        type="button" 
        on:click={() => { mode = 'sprint'; resetSprint(); }} 
        class="mode-btn" 
        class:active={mode === 'sprint'}
      >
        ⚡ Freeform Sprint
      </button>
      <button 
        type="button" 
        on:click={() => { mode = 'typing_test'; resetSprint(); }} 
        class="mode-btn" 
        class:active={mode === 'typing_test'}
      >
        ⌨️ Paragraph Typing Test
      </button>
    </div>
  </div>

  <!-- Paragraph Selection Bar for Typing Test Mode -->
  {#if mode === 'typing_test'}
    <div class="prompt-select-bar card fade-in">
      <div class="select-col">
        <label for="practice-prompt-select" class="select-lbl">🎯 Choose Practice Paragraph:</label>
        <select 
          id="practice-prompt-select"
          on:change={onPromptSelect}
          class="prompt-dropdown"
        >
          {#each TYPING_PROMPTS as p}
            <option value={p.id}>{p.title} ({p.difficulty} • {p.category})</option>
          {/each}
        </select>
      </div>

      <!-- Practice Prompt Reference Box -->
      <div class="prompt-reference-box card">
        <span class="ref-title">⌨️ Paragraph to Type:</span>
        <p class="prompt-body">{selectedPrompt.text}</p>
      </div>
    </div>
  {/if}

  <!-- Active Dashboard Bar -->
  <div class="sprint-dashboard card">
    <div class="dash-row">
      <!-- Countdown Clock -->
      <div class="timer-box">
        <span class="timer-lbl">Time Remaining</span>
        <div class="timer-display">{formatTimerSeconds(secondsRemaining)}</div>
      </div>

      {#if mode === 'sprint'}
        <!-- WPM Speedometer -->
        <div class="wpm-box">
          <span class="wpm-lbl">Writing Speed</span>
          <div class="wpm-display">⚡ {currentWpm} <span class="unit">WPM</span></div>
        </div>

        <!-- Words Progress -->
        <div class="progress-box">
          <span class="p-lbl">Sprint Words</span>
          <div class="p-val">{wordsWritten} / {targetWordsGoal} words</div>
        </div>
      {:else}
        <!-- Typing Test Accuracy & WPM -->
        <div class="wpm-box">
          <span class="wpm-lbl">Typing Speed</span>
          <div class="wpm-display">⚡ {testScorecard.wpm} <span class="unit">WPM</span></div>
        </div>

        <div class="progress-box">
          <span class="p-lbl">Typing Accuracy</span>
          <div class="p-val">{testScorecard.accuracy}% <span class="err-count">({testScorecard.errorCount} errors)</span></div>
        </div>
      {/if}

      <!-- Controls -->
      <div class="controls-box">
        {#if !isActive}
          <button type="button" on:click={() => startSprint(mode === 'typing_test')} class="btn btn-primary">
            🚀 {mode === 'typing_test' ? 'Start Typing Test' : 'Start Sprint'}
          </button>
        {:else if isPaused}
          <button type="button" on:click={resumeSprint} class="btn btn-primary">▶️ Resume</button>
          <button type="button" on:click={resetSprint} class="btn btn-secondary">🔄 Reset</button>
        {:else}
          <button type="button" on:click={pauseSprint} class="btn btn-secondary">⏸️ Pause</button>
          <button type="button" on:click={resetSprint} class="btn btn-secondary">🔄 Reset</button>
        {/if}
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="sprint-bar-bg">
      <div class="sprint-bar-fill" style="width: {mode === 'sprint' ? progressPercent : testScorecard.accuracy}%;"></div>
    </div>
  </div>

  <!-- Test Scorecard / Celebration Modal -->
  {#if isCompleted}
    <div class="celebration-box card fade-in">
      {#if mode === 'sprint'}
        🎉 <strong>Sprint Completed!</strong> You wrote <strong>{wordsWritten} words</strong> in {selectedDuration} minutes at an average speed of <strong>{currentWpm} WPM</strong>!
      {:else}
        🏆 <strong>Typing Test Scorecard:</strong>
        <span class="badge-tag">{testScorecard.gradeBadge}</span> — Speed: <strong>{testScorecard.wpm} WPM</strong> • Accuracy: <strong>{testScorecard.accuracy}%</strong> • Errors: <strong>{testScorecard.errorCount}</strong>
      {/if}
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

  .title-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sprint-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .mode-switcher {
    display: flex;
    gap: 6px;
  }

  .mode-btn {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    padding: 5px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .mode-btn.active {
    background: var(--accent-cyan);
    color: #000;
    border-color: var(--accent-cyan);
  }

  .prompt-select-bar {
    padding: 14px;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .select-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .select-lbl { font-size: 12px; font-weight: 700; color: var(--accent-cyan); }

  .prompt-dropdown {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: #fff;
    font-size: 13px;
    padding: 6px 10px;
  }

  .prompt-reference-box {
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border-left: 3px solid var(--accent-cyan);
  }

  .ref-title { font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
  .prompt-body { font-size: 14px; color: var(--text-primary); font-family: var(--font-mono); line-height: 1.5; margin-top: 4px; }

  .active-badge {
    font-size: 10px;
    font-weight: 800;
    color: var(--accent-emerald);
    background: rgba(16, 185, 129, 0.2);
    padding: 2px 8px;
    border-radius: 12px;
    border: 1px solid var(--accent-emerald);
  }

  .paused-badge {
    font-size: 10px;
    font-weight: 800;
    color: var(--accent-amber);
    background: rgba(245, 158, 11, 0.2);
    padding: 2px 8px;
    border-radius: 12px;
    border: 1px solid var(--accent-amber);
  }

  .pulse { animation: pulse-anim 1.5s infinite; }

  @keyframes pulse-anim {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
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

  .err-count { font-size: 12px; color: var(--text-muted); font-weight: normal; }

  .controls-box {
    display: flex;
    gap: 8px;
    align-items: center;
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

  .badge-tag {
    font-weight: 800;
    color: var(--accent-cyan);
    margin-right: 6px;
  }
</style>
