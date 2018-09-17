import { Logger } from '../utils';
import { DocumentWalker, Translator, AsyncTranslator } from '.';

export const DEFAULT_OPTIONS = {
  asyncLoad: false,
  dataKey: 'data-key',
  dataMissingTranslation: 'data-missing-translation',
  dataTranslatingKey: 'data-translating',
  debug: false,
  defaultLocale: 'en',
  defaultOnMissing: false,
  escapeTranslation: true,
  hideDuringTrans: false,
  rootElement: document.body,
  scopeKey: 'data-scope',
};

/* develblock:start */
const ALLSPEAK_INFO_STYLE = `background: #467972;
  color: #FFF;
  font-size: 1.5em;
  padding: .5em 1em;
  border-radius: 1.5em;`;
/* develblock:end */

export default class Allspeak {
  constructor(translations = {}, options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    Logger.setDebugMode(this.options.debug);

    if (this.options.hideDuringTrans) {
      this.options.rootElement.style = 'display: none;';
    }

    return this.__initialize(translations);
  }

  __initialize(translations) {
    const translator = this.options.asyncLoad
      ? new AsyncTranslator(translations)
      : new Translator(translations);

    Object.defineProperty(this, 'translator', {
      value: translator,
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

    Object.defineProperty(this, 'scopes', {
      value: {},
      enumerable: false,
      configurable: false,
      writable: true,
    });

    Logger.style('Allspeak // Front-end i18n library', ALLSPEAK_INFO_STYLE);

    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      translator.preload().then(() => {
        resolve(this);
      });
    });
  }

  get translations() {
    return this.translator.translations;
  }

  onTranslationLoaded(callback) {
    this.onTranslationLoadedCallback = callback;
  }

  triggerOnTranslationLoaded() {
    if (this.onTranslationLoadedCallback) {
      this.onTranslationLoadedCallback(this.translations);
    }
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

        Logger.info('Caching element', scopeElement, `with scope "${scope}"`);

        scope = scopeElement;
      }
    }

    Logger.info('=== Translating scope', scope, `to locale ${locale}`);

    this.documentWalker
      .prepareWalk(locale, scope, this.options)
      .then(elements => {
        this.translator.loadLocale(locale, this.options).then(locale => {
          const transPromises = [];

          this.triggerOnTranslationLoaded();
          this.documentWalker.walk(
            locale,
            scope,
            elements,
            this.options,
            (node, key, locale) => {
              const promise = this.translator
                .getTranslation(key, locale, this.options)
                .then(translation => {
                  Logger.log(`-- Starting translation for '${key}'`);

                  if (!this.options.escapeTranslation) {
                    Logger.log('- Applying raw translation...');

                    node.innerHTML = translation.text;
                  } else {
                    Logger.log('- Applying escaped translation...');

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

                  Logger.log('-- Translation done');
                }); // end getTranslation

              transPromises.push(promise);
            }
          ); // end walk

          Promise.all(transPromises).then(() => {
            Logger.info('=== Finished document translation');

            scope.setAttribute('lang', locale);
            if (this.options.hideDuringTrans) {
              scope.style = '';
            }

            if (otherScopes && otherScopes.length) {
              this.trans(locale, ...otherScopes);
            }
          });
        }); // end loadLocale
      })
      .catch(() => {
        Logger.warn('=== Walk skipped, skipping translation as well');
      }); // end prepareWalk
  }
}
