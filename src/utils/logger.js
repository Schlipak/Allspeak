/* eslint-disable no-console */
export default {
  isDebugMode: false,

  setDebugMode(state) {
    this.isDebugMode = state;
  },

  /* develblock:start */
  debug() {
    if (this.isDebugMode) {
      console.debug(...arguments);
    }
  },

  log() {
    if (this.isDebugMode) {
      console.log(...arguments);
    }
  },

  info() {
    if (this.isDebugMode) {
      console.info(...arguments);
    }
  },

  warn() {
    if (this.isDebugMode) {
      console.warn(...arguments);
    }
  },

  error() {
    if (this.isDebugMode) {
      console.error(...arguments);
    }
  },

  style(message, style) {
    this.log(`%c${message}`, style);
  },
  /* develblock:end */
};
/* eslint-enable no-console */
