<!-- src/components/TextAnonymizer.svelte -->
<!-- Text Anonymizer & PII Redactor component. -->
<!-- Connects to: src/services/piiAnonymizerService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { text, updateText } from '../stores/textStore';
  import { redactPii, DEFAULT_ANONYMIZER_OPTIONS, type AnonymizerOptions } from '../services/piiAnonymizerService';

  let options: AnonymizerOptions = { ...DEFAULT_ANONYMIZER_OPTIONS };
  let isCopied = false;

  $: result = redactPii($text, options);

  function applyRedactedToEditor() {
    if (result.totalRedactions > 0) {
      updateText(result.anonymizedText);
    }
  }

  async function copyRedactedText() {
    if (result.anonymizedText) {
      await navigator.clipboard.writeText(result.anonymizedText);
      isCopied = true;
      setTimeout(() => isCopied = false, 2000);
    }
  }
</script>

<div class="anonymizer-container card">
  <div class="anon-header">
    <div>
      <h4>🛡️ Text Anonymizer & PII Redactor</h4>
      <p class="subtitle">Detects and redacts sensitive data (Emails, Phone Numbers, SSNs, Credit Cards, IP Addresses) before sharing copy.</p>
    </div>

    <span class="redact-count-badge" class:has-matches={result.totalRedactions > 0}>
      {result.totalRedactions} {result.totalRedactions === 1 ? 'Redaction' : 'Redactions'}
    </span>
  </div>

  <!-- Redaction Option Toggles Bar -->
  <div class="toggles-bar card">
    <label class="toggle-item">
      <input type="checkbox" bind:checked={options.redactEmail} /> 📧 Emails ({result.typeCounts.email})
    </label>
    <label class="toggle-item">
      <input type="checkbox" bind:checked={options.redactPhone} /> 📞 Phone Numbers ({result.typeCounts.phone})
    </label>
    <label class="toggle-item">
      <input type="checkbox" bind:checked={options.redactSsn} /> 🆔 SSNs ({result.typeCounts.ssn})
    </label>
    <label class="toggle-item">
      <input type="checkbox" bind:checked={options.redactCc} /> 💳 Credit Cards ({result.typeCounts.credit_card})
    </label>
    <label class="toggle-item">
      <input type="checkbox" bind:checked={options.redactIp} /> 🌐 IP Addresses ({result.typeCounts.ip_address})
    </label>
  </div>

  <!-- Anonymized Text Preview Window -->
  {#if result.totalRedactions > 0}
    <div class="preview-box card fade-in">
      <div class="box-head">
        <span class="prev-title">👁️ Anonymized Text Preview:</span>
        <div class="action-btns">
          <button type="button" on:click={applyRedactedToEditor} class="btn btn-primary">
            🛡️ Apply Redacted Text to Editor
          </button>
          <button type="button" on:click={copyRedactedText} class="btn btn-secondary">
            {isCopied ? '✅ Copied!' : '📋 Copy Redacted Text'}
          </button>
        </div>
      </div>

      <p class="preview-body">{result.anonymizedText}</p>
    </div>
  {:else if $text.trim()}
    <div class="clean-box card">
      🔒 <strong>No sensitive PII detected!</strong> Your text is clean of emails, phone numbers, SSNs, credit cards, or IP addresses.
    </div>
  {/if}
</div>

<style>
  .anonymizer-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: rgba(239, 68, 68, 0.04);
    border-color: rgba(239, 68, 68, 0.3);
  }

  .anon-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .anon-header h4 { font-size: 16px; color: var(--text-primary); }
  .subtitle { font-size: 12px; color: var(--text-secondary); }

  .redact-count-badge {
    font-size: 12px;
    font-weight: 800;
    color: var(--text-muted);
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid var(--border-color);
  }

  .redact-count-badge.has-matches {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.15);
    border-color: rgba(239, 68, 68, 0.4);
  }

  .toggles-bar {
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  .toggle-item {
    font-size: 12px;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .preview-box {
    padding: 14px;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .box-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .prev-title { font-size: 11px; font-weight: 800; color: #ef4444; text-transform: uppercase; }

  .action-btns {
    display: flex;
    gap: 8px;
  }

  .preview-body {
    font-size: 14px;
    color: var(--text-primary);
    line-height: 1.6;
    white-space: pre-wrap;
    background: rgba(255, 255, 255, 0.03);
    padding: 10px;
    border-radius: var(--radius-sm);
  }

  .clean-box {
    padding: 14px;
    background: rgba(16, 185, 129, 0.1);
    border-color: var(--accent-emerald);
    color: var(--text-primary);
    font-size: 13px;
  }
</style>
