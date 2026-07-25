// src/services/multiFormatExportService.spec.ts
// Unit tests for multiFormatExportService in Build 42.
// Created: 2026-07-25

import { describe, it, expect } from 'vitest';
import { generateMarkdownDocument, generateHtmlDocument } from './multiFormatExportService';

describe('multiFormatExportService', () => {
  it('should generate valid Markdown document string with frontmatter', () => {
    const text = 'Svelte makes reactive UI development fast and intuitive.';
    const md = generateMarkdownDocument(text, 'Svelte Notes');

    expect(md).toContain('title: "Svelte Notes"');
    expect(md).toContain('words: 8');
    expect(md).toContain('# Svelte Notes');
  });

  it('should generate valid HTML document string', () => {
    const text = 'First paragraph.\n\nSecond paragraph.';
    const html = generateHtmlDocument(text, 'Test HTML');

    expect(html).toContain('<h1>Test HTML</h1>');
    expect(html).toContain('<p>First paragraph.</p>');
    expect(html).toContain('<p>Second paragraph.</p>');
  });
});
