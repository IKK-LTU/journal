require('@testing-library/jest-dom');

// jsdom gaps that real browsers have:

// React Router uses TextEncoder/TextDecoder.
const { TextEncoder, TextDecoder } = require('util');
Object.assign(global, { TextEncoder, TextDecoder });

// MUI's light/dark "system" mode reads prefers-color-scheme.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}
