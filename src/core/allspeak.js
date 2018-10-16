import DocumentWalker from './document-walker';
import AsyncTranslator from './async-translator';

import DEFAULT_OPTIONS from './default-options';

export default class Allspeak {
  constructor(translations = {}, options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    if (this.options.hideDuringTrans) {
      this.options.rootElement.style = 'display: none;';
    }

    return this.initialize(translations);
  }

  initialize(translations) {
    Object.defineProperty(this, 'translator', {
      value: new AsyncTranslator(translations),
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

    return new Promise(resolve => resolve(this));
  }

  get translations() {
    return this.translator.translations;
  }

  onTranslationLoaded(callback) {
    this.translator.onTranslationLoaded(callback);
  }

  trans(locale, scope = this.options.rootElement, ...otherScopes) {
    let scopeElement = scope;

    if (typeof scope === typeof '') {
      if (this.scopes[scope]) {
        scopeElement = this.scopes[scope];
      } else {
        const element = document.querySelector(`[${this.options.scopeKey}="${scope}"]`);

        this.scopes[scope] = element;
        scopeElement = element;
      }
    }

    return new Promise((resolve) => {
      this.documentWalker
        .prepareWalk(locale, scopeElement, this.options)
        .then((elements) => {
          this.translator.loadLocale(locale, this.options).then((selectedLocale) => {
            const transPromises = [];

            this.documentWalker.walk(
              selectedLocale,
              scopeElement,
              elements,
              this.options,
              (node, key, finalLocale) => {
                const promise = this.translator
                  .getTranslation(key, finalLocale, this.options)
                  .then((translation) => {
                    if (!this.options.escapeTranslation) {
                      node.innerHTML = translation.text;
                    } else {
                      const escapedTranslation = document.createElement('DIV');

                      escapedTranslation.appendChild(document.createTextNode(translation.text));
                      node.innerHTML = escapedTranslation.innerHTML;
                    }

                    if (translation.missing) {
                      node.setAttribute(this.options.dataMissingTranslation, '');
                    } else {
                      node.removeAttribute(this.options.dataMissingTranslation);
                    }
                  }); // end getTranslation

                transPromises.push(promise);
              },
            ); // end walk

            Promise.all(transPromises).then(() => {
              scopeElement.setAttribute('lang', locale);
              if (this.options.hideDuringTrans) {
                scopeElement.style = '';
              }

              if (otherScopes && otherScopes.length) {
                this.trans(locale, ...otherScopes).then((innerScopes) => {
                  resolve([{ key: scope, element: scopeElement }, ...innerScopes]);
                });
              } else {
                resolve([{ key: scope, element: scopeElement }]);
              }
            });
          }); // end loadLocale
        })
        .catch(() => {}); // end prepareWalk
    }); // end Promise
  }
}
