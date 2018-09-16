export { default, DEFAULT_OPTIONS } from './core';
import Allspeak from './core';

if (window) {
  window.Allspeak = Allspeak;
}
