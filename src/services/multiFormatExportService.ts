// src/services/multiFormatExportService.ts
// Multi-Format Document Exporter (PDF, Markdown, HTML) service for Build 42.
// Connects to: src/components/ExportToolbar.svelte, src/App.svelte
// Created: 2026-07-25

export function generateMarkdownDocument(text: string, title: string = 'WordCraft Document'): string {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const now = new Date().toLocaleDateString();

  return `---
title: "${title}"
date: "${now}"
words: ${wordCount}
generated_by: "WordCraft Reactive Svelte Counter"
---

# ${title}

${text}
`;
}

export function generateHtmlDocument(text: string, title: string = 'WordCraft Document'): string {
  const paragraphs = text.split(/\n\s*\n/).map(p => `<p>${p.trim()}</p>`).join('\n');
  const now = new Date().toLocaleDateString();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      max-width: 750px;
      margin: 40px auto;
      padding: 24px;
      line-height: 1.6;
      color: #1e293b;
      background: #fff;
    }
    h1 { border-bottom: 2px solid #06b6d4; padding-bottom: 8px; color: #0f172a; }
    .meta { font-size: 12px; color: #64748b; margin-bottom: 24px; }
    p { margin-bottom: 16px; font-size: 15px; }
    @media print {
      body { margin: 0; padding: 0; }
    }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div class="meta">Exported on ${now} via WordCraft Reactive Svelte App</div>
  ${paragraphs}
</body>
</html>`;
}

export function triggerFileDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
