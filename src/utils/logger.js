/* eslint-disable no-console */
export default {
  /* develblock:start */
  isDebugMode: false,
  /* develblock:end */

  /* develblock:start */
  setDebugMode(state) {
    this.isDebugMode = state;
  },
  /* develblock:end */

  /* develblock:start */
  debug() {
    if (this.isDebugMode) {
      console.debug(...this.modeMessage('ᚨ', 'debug'), ...arguments);
    }
  },
  /* develblock:end */

  /* develblock:start */
  log() {
    if (this.isDebugMode) {
      console.log(...this.modeMessage('ᚨ', 'log'), ...arguments);
    }
  },
  /* develblock:end */

  /* develblock:start */
  info() {
    if (this.isDebugMode) {
      console.info(...this.modeMessage('ᚨ', 'info'), ...arguments);
    }
  },
  /* develblock:end */

  /* develblock:start */
  warn() {
    if (this.isDebugMode) {
      console.warn(...this.modeMessage('ᚨ', 'warn'), ...arguments);
    }
  },
  /* develblock:end */

  /* develblock:start */
  error() {
    if (this.isDebugMode) {
      console.error(...this.modeMessage('ᚨ', 'error'), ...arguments);
    }
  },
  /* develblock:end */

  /* develblock:start */
  style(message, style) {
    if (this.isDebugMode) {
      console.log(`%c${message}`, style);
    }
  },
  /* develblock:end */

  /* develblock:start */
  modeMessage(message, mode) {
    return [`%c${message}`, this.renderStyle(mode)];
  },
  /* develblock:end */

  /* develblock:start */
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
  /* develblock:end */
};
/* eslint-enable no-console */
