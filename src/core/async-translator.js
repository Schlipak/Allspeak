import { Logger } from '../utils';
import { Translator, DEFAULT_OPTIONS } from '.';

export default class AsyncTranslator extends Translator {
  constructor(path) {
    super(null);
    this.path = path;

    this.translations = {};
  }

  // eslint-disable-next-line no-unused-vars
  preload(translations = null) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      // Resolve without doing anything, locales are loaded dynamically
      resolve();
    });
  }

  loadLocale(locale) {
    return new Promise((resolve, reject) => {
      if (this.translations[locale]) {
        return resolve(locale);
      } else if (locale.includes('-')) {
        const superLocale = locale.split('-')[0];

        if (this.translations[superLocale]) {
          return resolve(superLocale);
        }
      }

      super
        .preload(this.path.replace('{}', locale), false)
        .then(translations => {
          this.translations[locale] = translations;
          return resolve(locale);
        })
        .catch(error => {
          if (locale.includes('-')) {
            const superLocale = locale.split('-')[0];
            /* develblock:start */
            Logger.warn(
              `Missing locale for '${locale}', trying with superLocale '${superLocale}'`
            );
            /* develblock:end */

            this.loadLocale(superLocale)
              .then(() => {
                resolve(superLocale);
              })
              .catch(error => {
                /* develblock:start */
                Logger.error(error);
                /* develblock:end */

                reject(error);
              });
          } else {
            reject(error);
          }
        });
    });
  }

  _findLocale(translations, locale, options, fullKey) {
    if (typeof translations[locale] === typeof {}) {
      return [translations[locale], locale];
    }

    if (locale.includes('-')) {
      const superLocale = locale.split('-')[0];

      /* develblock:start */
      Logger.warn(
        `Missing locale for '${fullKey}.${locale}', trying with superLocale '${superLocale}'`
      );
      /* develblock:end */

      return this._findLocale(translations, superLocale, options, fullKey);
    }

    if (options.defaultOnMissing && locale !== options.defaultLocale) {
      /* develblock:start */
      Logger.warn(
        `Missing locale for '${fullKey}.${locale}', replacing with '${
          options.defaultLocale
        }'`
      );
      /* develblock:end */

      return this._findLocale(
        translations,
        options.defaultLocale,
        options,
        fullKey
      );
    }

    return [null, locale];
  }

  _fetchTranslation(
    key,
    locale,
    options = {},
    translations = this.translations,
    fullKey = key
  ) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    if (fullKey === key) {
      /* develblock:start */
      Logger.log(`Translating key '${locale}.${key}'`);
      /* develblock:end */
    } else {
      /* develblock:start */
      Logger.log(`> Translating sub-key '${locale}.${key}'`);
      /* develblock:end */
    }

    const [resolvedTranslations, resolvedLocale] = this._findLocale(
      translations,
      locale,
      options,
      fullKey
    );

    if (!resolvedTranslations) {
      /* develblock:start */
      Logger.error(`Missing translation for '${resolvedLocale}.${fullKey}'`);
      /* develblock:end */

      return {
        text: `Missing translation: ${resolvedLocale}.${fullKey}`,
        missing: true,
      };
    }

    return this._deepFetchTranslation(
      resolvedTranslations,
      resolvedLocale,
      fullKey
    );
  }

  _deepFetchTranslation(translations, locale, key, fullKey = key) {
    if (typeof translations[key] === typeof '') {
      /* develblock:start */
      Logger.log(`Found translation for '${locale}.${fullKey}'`);
      /* develblock:end */

      return {
        text: translations[key],
        missing: false,
      };
    }

    const [primary, ...segments] = key.split('.');
    if (typeof translations[primary] === typeof {}) {
      const subKey = segments.join('.');

      /* develblock:start */
      Logger.info(
        `Missing top-level translation for '${locale}.${fullKey}', trying sub-key '${locale}->>${subKey}'`
      );
      /* develblock:end */

      return this._deepFetchTranslation(translations[primary], locale, subKey, fullKey);
    }

    /* develblock:start */
    Logger.error(`Missing translation for '${locale}.${fullKey}'`);
    /* develblock:end */

    return { text: `Missing translation: ${locale}.${fullKey}`, missing: true };
  }
}
