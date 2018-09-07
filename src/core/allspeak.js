import { Logger } from '../utils';
import DocumentWalker from './document-walker';
import Translator from './translator';

export const DEFAULT_OPTIONS = {
  dataKey: 'data-key',
  dataMissingTranslation: 'data-missing-translation',
  debug: false,
  defaultLocale: 'en',
  defaultOnMissing: false,
  escapeTranslation: true,
  hideDuringTrans: false,
  rootElement: document.body,
  scopeKey: 'data-scope',
};

const ALLSPEAK_INFO_STYLE = `background: #467972;
  color: #FFF;
  font-size: 1.5em;
  padding: .5em 1em;
  border-radius: 1.5em;`;

export default class Allspeak {
  constructor(translations = {}, options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    /* develblock:start */
    Logger.setDebugMode(this.options.debug);
    /* develblock:end */

    if (this.options.hideDuringTrans) {
      this.options.rootElement.style = 'display: none;';
    }

    return new Promise((resolve, reject) => {
      if (typeof translations === typeof '') {
        fetch(translations, { method: 'GET' })
          .then(response => {
            if (response.ok) {
              return response.json();
            }

            throw new Error(`Request rejected with status ${response.status}`);
          })
          .then(json => {
            this.__initialize(json);
            resolve(this);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        this.__initialize(translations);
        resolve(this);
      }
    });
  }

  __initialize(translations) {
    Object.defineProperty(this, 'translator', {
      value: new Translator(translations),
      enumerable: false,
      configurable: false,
      writable: false,
    });

    Object.defineProperty(this, 'documentWalker', {
      value: new DocumentWalker(this.options.dataKey),
      enumerable: false,
      configurable: false,
      writable: false,
    });

    Object.defineProperty(this, 'translations', {
      value: translations,
      enumerable: true,
      configurable: false,
      writable: false,
    });

    Object.defineProperty(this, 'scopes', {
      value: {},
      enumerable: false,
      configurable: false,
      writable: true,
    });

    /* develblock:start */
    Logger.style('Allspeak // Front-end i18n library', ALLSPEAK_INFO_STYLE);
    /* develblock:end */
  }

  trans(locale, scope = this.options.rootElement, ...otherScopes) {
    if (typeof scope === typeof '') {
      if (this.scopes[scope]) {
        scope = this.scopes[scope];
      } else {
        const scopeElement = document.querySelector(
          `[${this.options.scopeKey}="${scope}"]`
        );
        this.scopes[scope] = scopeElement;

        /* develblock:start */
        Logger.info('Caching element', scopeElement, `with scope "${scope}"`);
        /* develblock:end */

        scope = scopeElement;
      }
    }

    /* develblock:start */
    Logger.info('=== Translating scope', scope, `to locale ${locale}`);
    /* develblock:end */

    this.documentWalker.walk(locale, scope, (node, key, locale) => {
      /* develblock:start */
      Logger.log(`-- Starting translation for '${key}'`);
      /* develblock:end */

      const translation = this.translator.getTranslation(
        key,
        locale,
        this.options
      );

      if (!this.options.escapeTranslation) {
        /* develblock:start */
        Logger.log('- Applying raw translation...');
        /* develblock:end */

        node.innerHTML = translation.text;
      } else {
        /* develblock:start */
        Logger.log('- Applying escaped translation...');
        /* develblock:end */

        const escapedTranslation = document.createElement('DIV');

        escapedTranslation.appendChild(
          document.createTextNode(translation.text)
        );
        node.innerHTML = escapedTranslation.innerHTML;
      }

      if (translation.missing) {
        node.setAttribute(this.options.dataMissingTranslation, '');
      } else {
        node.removeAttribute(this.options.dataMissingTranslation);
      }

      /* develblock:start */
      Logger.log('-- Translation done');
      /* develblock:end */
    });

    /* develblock:start */
    Logger.info('=== Finished document translation');
    /* develblock:end */

    scope.setAttribute('lang', locale);
    if (this.options.hideDuringTrans) {
      scope.style = '';
    }

    if (otherScopes && otherScopes.length) {
      this.trans(locale, ...otherScopes);
    }
  }
}
