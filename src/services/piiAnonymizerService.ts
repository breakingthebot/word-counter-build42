// src/services/piiAnonymizerService.ts
// Text Anonymizer & PII Redactor service for Build 42.
// Connects to: src/components/TextAnonymizer.svelte, src/App.svelte
// Created: 2026-07-25

export type PiiType = 'email' | 'phone' | 'ssn' | 'credit_card' | 'ip_address';

export interface PiiMatch {
  type: PiiType;
  rawText: string;
  redactedText: string;
}

export interface AnonymizerOptions {
  redactEmail: boolean;
  redactPhone: boolean;
  redactSsn: boolean;
  redactCc: boolean;
  redactIp: boolean;
}

export const DEFAULT_ANONYMIZER_OPTIONS: AnonymizerOptions = {
  redactEmail: true,
  redactPhone: true,
  redactSsn: true,
  redactCc: true,
  redactIp: true
};

export interface AnonymizerResult {
  anonymizedText: string;
  totalRedactions: number;
  matches: PiiMatch[];
  typeCounts: Record<PiiType, number>;
}

const REGEX_PATTERNS: Record<PiiType, { pattern: RegExp; placeholder: string }> = {
  email: {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    placeholder: '[REDACTED_EMAIL]'
  },
  phone: {
    pattern: /\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}\b/g,
    placeholder: '[REDACTED_PHONE]'
  },
  ssn: {
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
    placeholder: '[REDACTED_SSN]'
  },
  credit_card: {
    pattern: /\b(?:\d{4}[- ]?){3}\d{4}\b/g,
    placeholder: '[REDACTED_CREDIT_CARD]'
  },
  ip_address: {
    pattern: /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g,
    placeholder: '[REDACTED_IP]'
  }
};

export function redactPii(
  text: string,
  options: AnonymizerOptions = DEFAULT_ANONYMIZER_OPTIONS
): AnonymizerResult {
  if (!text) {
    return {
      anonymizedText: '',
      totalRedactions: 0,
      matches: [],
      typeCounts: { email: 0, phone: 0, ssn: 0, credit_card: 0, ip_address: 0 }
    };
  }

  let anonymizedText = text;
  const matches: PiiMatch[] = [];
  const typeCounts: Record<PiiType, number> = {
    email: 0,
    phone: 0,
    ssn: 0,
    credit_card: 0,
    ip_address: 0
  };

  const activeTypes: { type: PiiType; enabled: boolean }[] = [
    { type: 'email', enabled: options.redactEmail },
    { type: 'phone', enabled: options.redactPhone },
    { type: 'ssn', enabled: options.redactSsn },
    { type: 'credit_card', enabled: options.redactCc },
    { type: 'ip_address', enabled: options.redactIp }
  ];

  activeTypes.forEach(({ type, enabled }) => {
    if (!enabled) return;
    const { pattern, placeholder } = REGEX_PATTERNS[type];
    
    // Reset regex index
    pattern.lastIndex = 0;
    const rawMatches = anonymizedText.match(pattern);

    if (rawMatches) {
      rawMatches.forEach(rawText => {
        matches.push({
          type,
          rawText,
          redactedText: placeholder
        });
        typeCounts[type]++;
      });

      anonymizedText = anonymizedText.replace(pattern, placeholder);
    }
  });

  return {
    anonymizedText,
    totalRedactions: matches.length,
    matches,
    typeCounts
  };
}
