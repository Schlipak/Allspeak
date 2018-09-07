/* eslint-disable no-console */
export default {
  isDebugMode: false,

  setDebugMode(state) {
    this.isDebugMode = state;
  },

  debug() {
    if (this.isDebugMode) {
      console.debug(...this.modeMessage('ᚨ', 'debug'), ...arguments);
    }
  },

  log() {
    if (this.isDebugMode) {
      console.log(...this.modeMessage('ᚨ', 'log'), ...arguments);
    }
  },

  info() {
    if (this.isDebugMode) {
      console.info(...this.modeMessage('ᚨ', 'info'), ...arguments);
    }
  },

  warn() {
    if (this.isDebugMode) {
      console.warn(...this.modeMessage('ᚨ', 'warn'), ...arguments);
    }
  },

  error() {
    if (this.isDebugMode) {
      console.error(...this.modeMessage('ᚨ', 'error'), ...arguments);
    }
  },

  style(message, style) {
    if (this.isDebugMode) {
      console.log(`%c${message}`, style);
    }
  },

  modeMessage(message, mode) {
    return [`%c${message}`, this.renderStyle(mode)];
  },

  renderStyle(mode) {
    const color = {
      log: '#212121',
      info: '#2980b9',
      debug: '#9b59b6',
      warn: '#d35400',
      error: '#c0392b',
    }[mode];

    return `
      background: ${color}30;
      color: ${color};
      font-size: 1em;
      font-weight: bold;
      padding: 0.4em 0.675em;
      border-radius: 2em;
    `;
  },
};
/* eslint-enable no-console */
