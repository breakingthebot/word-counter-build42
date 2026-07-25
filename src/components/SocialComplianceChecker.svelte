<!-- src/components/SocialComplianceChecker.svelte -->
<!-- SEO & Social Media Post Compliance Checker component. -->
<!-- Connects to: src/services/socialComplianceService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { text, updateText } from '../stores/textStore';
  import { checkAllPlatforms, trimTextToLimit, type ComplianceResult } from '../services/socialComplianceService';

  $: complianceList = checkAllPlatforms($text);

  function handleTrimToLimit(limit: number) {
    const trimmed = trimTextToLimit($text, limit);
    updateText(trimmed);
  }
</script>

<div class="compliance-container card">
  <div class="comp-header">
    <div>
      <h4>🕮 SEO & Social Media Post Compliance Checker</h4>
      <p class="subtitle">Live character limit meters for Twitter/X, SEO Page Titles, Meta Descriptions, LinkedIn, & Instagram.</p>
    </div>
  </div>

  <!-- Platform Cards Grid -->
  <div class="platform-grid">
    {#each complianceList as c}
      <div 
        class="platform-card card" 
        class:optimal={c.status === 'optimal'} 
        class:warning={c.status === 'warning'} 
        class:exceeded={c.status === 'exceeded'}
      >
        <div class="p-head">
          <div class="title-box">
            <span class="p-icon">{c.rule.icon}</span>
            <strong class="p-name">{c.rule.name}</strong>
          </div>

          <span class="status-tag" class:exceeded={c.status === 'exceeded'}>
            {c.status}
          </span>
        </div>

        <div class="count-row">
          <div class="count-val">
            <strong class="curr">{c.charCount}</strong>
            <span class="max">/ {c.limit} chars</span>
          </div>

          <span class="rem-val" class:neg={c.remainingChars < 0}>
            {c.remainingChars >= 0 ? `${c.remainingChars} left` : `${Math.abs(c.remainingChars)} over`}
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="progress-bg">
          <div 
            class="progress-fill" 
            class:optimal={c.status === 'optimal'} 
            class:warning={c.status === 'warning'} 
            class:exceeded={c.status === 'exceeded'}
            style="width: {c.percentUsed}%;"
          ></div>
        </div>

        <div class="card-foot">
          <span class="msg">{c.message}</span>
          {#if c.status === 'exceeded'}
            <button 
              type="button" 
              on:click={() => handleTrimToLimit(c.limit)} 
              class="trim-btn"
            >
              ✂️ Trim to {c.limit}
            </button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .compliance-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(168, 85, 247, 0.04);
    border-color: rgba(168, 85, 247, 0.3);
  }

  .comp-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .platform-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;

    @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .platform-card {
    padding: 14px;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .platform-card.optimal { border-color: rgba(16, 185, 129, 0.3); }
  .platform-card.warning { border-color: rgba(245, 158, 11, 0.3); }
  .platform-card.exceeded { border-color: rgba(239, 68, 68, 0.5); background: rgba(239, 68, 68, 0.05); }

  .p-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-box {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .p-icon { font-size: 16px; }
  .p-name { font-size: 13px; color: var(--text-primary); }

  .status-tag {
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 800;
    color: var(--text-muted);
  }

  .status-tag.exceeded { color: #ef4444; }

  .count-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .curr { font-size: 18px; font-weight: 800; color: var(--text-primary); font-family: var(--font-mono); }
  .max { font-size: 12px; color: var(--text-muted); }
  .rem-val { font-size: 12px; font-weight: 700; color: var(--accent-emerald); }
  .rem-val.neg { color: #ef4444; }

  .progress-bg {
    height: 6px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .progress-fill.optimal { background: var(--accent-emerald); }
  .progress-fill.warning { background: var(--accent-amber); }
  .progress-fill.exceeded { background: #ef4444; }

  .card-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
  }

  .msg { color: var(--text-muted); }

  .trim-btn {
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.4);
    color: #ef4444;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
  }

  .trim-btn:hover {
    background: #ef4444;
    color: #fff;
  }
</style>
