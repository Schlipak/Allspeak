import { ProxyObject, Logger } from '../utils';
import DocumentWalker from './document-walker';
import Translator from './translator';

export const DEFAULT_OPTIONS = {
  dataKey: 'data-key',
  debug: false,
  defaultLocale: 'en',
  defaultOnMissing: false,
  escapeTranslation: true,
  rootElement: document.body,
};

const ALLSPEAK_INFO_STYLE = `background: #467972;
  color: #FFF;
  font-size: 1.5em;
  padding: .5em 1em;
  border-radius: 1.5em;`;

export default class Allspeak extends ProxyObject {
  constructor(translations = {}, options = {}) {
    super(...arguments);
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    /* develblock:start */
    Logger.setDebugMode(this.options.debug);
    /* develblock:end */

    Object.defineProperty(this, 'translator', {
      value: new Translator(translations),
      enumerable: false,
      configurable: false,
      writable: false,
    });

    Object.defineProperty(this, 'documentWalker', {
      value: new DocumentWalker(this.options.rootElement, this.options.dataKey),
      enumerable: false,
      configurable: false,
      writable: false,
    });

    /* develblock:start */
    Logger.style('Allspeak // Front-end i18n', ALLSPEAK_INFO_STYLE);
    /* develblock:end */
  }

  trans(locale) {
    /* develblock:start */
    Logger.info(`=== Translating document to ${locale}`);
    /* develblock:end */

    this.documentWalker.walk(locale, (node, key, locale) => {
      /* develblock:start */
      Logger.log(`-- Starting translation for '${key}'`);
      /* develblock:end */

      const rawTranslation = this.translator.getTranslation(
        key,
        locale,
        this.options
      );

      if (!this.options.escapeTranslation) {
        /* develblock:start */
        Logger.log('- Applying raw translation...');
        /* develblock:end */

        node.innerHTML = rawTranslation;
      } else {
        /* develblock:start */
        Logger.log('- Applying escaped translation...');
        /* develblock:end */

        const escapedTranslation = document.createElement('DIV');

        escapedTranslation.appendChild(document.createTextNode(rawTranslation));
        node.innerHTML = escapedTranslation.innerHTML;
      }

      /* develblock:start */
      Logger.log('-- Translation done');
      /* develblock:end */
    });

    /* develblock:start */
    Logger.info('=== Finished document translation');
    /* develblock:end */

    this.options.rootElement.setAttribute('lang', locale);
  }
}
