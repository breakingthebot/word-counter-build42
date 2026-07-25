<!-- src/components/ExportToolbar.svelte -->
<!-- Multi-format export toolbar (.txt, .md, .html, Printable PDF) & draft manager component. -->
<!-- Connects to: src/services/multiFormatExportService.ts, src/stores/textStore.ts -->
<!-- Created: 2026-07-25 -->

<script lang="ts">
  import { text, draftHistory, saveCurrentDraft, loadDraftContent, deleteDraftItem } from '../stores/textStore';
  import { generateMarkdownDocument, generateHtmlDocument, triggerFileDownload } from '../services/multiFormatExportService';

  let showDraftsModal = false;
  let copyNotification = false;
  let draftTitleInput = '';

  function handleExportTxt() {
    if (!$text.trim()) return;
    triggerFileDownload($text, `WordCraft_Export_${Date.now()}.txt`, 'text/plain');
  }

  function handleExportMarkdown() {
    if (!$text.trim()) return;
    const md = generateMarkdownDocument($text, 'WordCraft Document');
    triggerFileDownload(md, `WordCraft_Doc_${Date.now()}.md`, 'text/markdown');
  }

  function handleExportHtml() {
    if (!$text.trim()) return;
    const html = generateHtmlDocument($text, 'WordCraft Document');
    triggerFileDownload(html, `WordCraft_Doc_${Date.now()}.html`, 'text/html');
  }

  function handleExportPdfPrint() {
    if (!$text.trim()) return;
    const html = generateHtmlDocument($text, 'WordCraft Document');
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(html);
      printWin.document.close();
      printWin.focus();
    }
  }

  function handleCopyToClipboard() {
    if (!$text.trim()) return;
    navigator.clipboard.writeText($text).then(() => {
      copyNotification = true;
      setTimeout(() => copyNotification = false, 2500);
    });
  }

  function handleSaveDraft() {
    saveCurrentDraft(draftTitleInput.trim() || undefined);
    draftTitleInput = '';
  }
</script>

<div class="export-toolbar card">
  <div class="action-buttons">
    <button on:click={handleExportTxt} disabled={!$text.trim()} class="btn btn-primary">
      📥 Export .txt
    </button>

    <button on:click={handleExportMarkdown} disabled={!$text.trim()} class="btn btn-secondary">
      📄 Export Markdown (.md)
    </button>

    <button on:click={handleExportHtml} disabled={!$text.trim()} class="btn btn-secondary">
      🌐 Export HTML (.html)
    </button>

    <button on:click={handleExportPdfPrint} disabled={!$text.trim()} class="btn btn-secondary">
      🖨️ Printable PDF
    </button>

    <button on:click={handleCopyToClipboard} disabled={!$text.trim()} class="btn btn-secondary">
      📋 Copy Text
    </button>

    <button on:click={() => showDraftsModal = !showDraftsModal} class="btn btn-secondary">
      💾 Saved Drafts ({$draftHistory.length})
    </button>
  </div>

  {#if copyNotification}
    <div class="toast-alert fade-in">
      ✓ Text copied to clipboard successfully!
    </div>
  {/if}

  <!-- Drafts Modal Overlay -->
  {#if showDraftsModal}
    <div class="drafts-modal card fade-in">
      <div class="modal-head">
        <h5>💾 Saved Browser Drafts</h5>
        <button on:click={() => showDraftsModal = false} class="close-btn">✕</button>
      </div>

      <div class="save-draft-row">
        <input 
          type="text" 
          bind:value={draftTitleInput} 
          placeholder="Draft title (optional)..." 
          class="draft-input"
        />
        <button on:click={handleSaveDraft} disabled={!$text.trim()} class="btn btn-primary btn-sm">
          💾 Save Current Text
        </button>
      </div>

      {#if $draftHistory.length > 0}
        <div class="drafts-list">
          {#each $draftHistory as d}
            <div class="draft-card card">
              <div class="draft-meta">
                <strong class="d-title">{d.title}</strong>
                <span class="d-info">{d.wordCount} words • {d.updatedAt}</span>
              </div>

              <div class="draft-btns">
                <button on:click={() => loadDraftContent(d.content)} class="btn btn-secondary btn-sm">Load</button>
                <button on:click={() => deleteDraftItem(d.id)} class="btn btn-secondary btn-sm del-btn">Delete</button>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="empty-msg">No saved drafts found in your browser store.</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .export-toolbar {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
  }

  .action-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .toast-alert {
    padding: 10px 16px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(15, 23, 42, 0.8));
    border: 1px solid var(--accent-emerald);
    color: var(--accent-emerald);
    font-size: 13px;
    font-weight: 700;
    border-radius: var(--radius-md);
  }

  .drafts-modal {
    padding: 16px;
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid var(--accent-cyan);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .modal-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-head h5 { font-size: 15px; color: var(--accent-cyan); }

  .close-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 16px;
    cursor: pointer;
  }

  .save-draft-row {
    display: flex;
    gap: 8px;
  }

  .draft-input {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: #fff;
    font-size: 13px;
    padding: 6px 10px;
  }

  .drafts-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 250px;
    overflow-y: auto;
  }

  .draft-card {
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.03);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .draft-meta {
    display: flex;
    flex-direction: column;
  }

  .d-title { font-size: 13px; color: var(--text-primary); }
  .d-info { font-size: 11px; color: var(--text-muted); }

  .draft-btns { display: flex; gap: 6px; }
  .del-btn:hover { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
  .empty-msg { font-size: 12px; color: var(--text-muted); font-style: italic; }
</style>
