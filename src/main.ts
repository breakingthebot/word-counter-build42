// src/main.ts
// Main entry point for GourmetWord Svelte application.
// Created: 2026-07-25

import './app.css';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app')!
});

export default app;
