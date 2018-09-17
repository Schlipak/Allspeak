import { Logger } from '../utils';
import { DEFAULT_OPTIONS } from '.';

export default class Translator {
  constructor(translations) {
    this.translations = translations;
  }

  preload(translations = this.translations, assign = true) {
    return new Promise((resolve, reject) => {
      if (typeof translations === typeof '') {
        // Path given

        fetch(translations, { method: 'GET' })
          .then(response => {
            if (response.ok) {
              return response.json();
            }

            throw new Error(`Request rejected with status ${response.status}`);
          })
          .then(json => {
            if (assign) this.translations = json;
            resolve(json);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        // Translation Object given

        if (assign) this.translations = translations;
        resolve(translations);
      }
    });
  }

  loadLocale(locale) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      // Resolve right away, translations are already loaded by #preload
      resolve(locale);
    });
  }

  getTranslation(
    key,
    locale,
    options = {},
    translations = this.translations,
    fullKey = key
  ) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      resolve(
        this._fetchTranslation(key, locale, options, translations, fullKey)
      );
    });
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
      Logger.log(`Translating key '${key}.${locale}'`);
    } else {
      Logger.log(`> Translating sub-key '${key}.${locale}'`);
    }

    if (typeof translations[key] === typeof {}) {
      if (typeof translations[key][locale] === typeof '') {
        Logger.log(`Found translation for '${fullKey}.${locale}'`);

        return { text: translations[key][locale], missing: false };
      } else {
        if (locale.includes('-')) {
          const superLocale = locale.split('-')[0];

          Logger.warn(
            `Missing locale for '${fullKey}.${locale}', trying with superLocale '${superLocale}'`
          );

          return this._fetchTranslation(
            key,
            superLocale,
            options,
            translations,
            fullKey
          );
        }

        if (options.defaultOnMissing && locale !== options.defaultLocale) {
          Logger.warn(
            `Missing locale for '${fullKey}.${locale}', replacing with '${
              options.defaultLocale
            }'`
          );

          return this._fetchTranslation(
            key,
            options.defaultLocale,
            options,
            translations,
            fullKey
          );
        }

        Logger.error(`Missing translation for '${fullKey}.${locale}'`);

        return {
          text: `Missing translation: ${fullKey}.${locale}`,
          missing: true,
        };
      }
    }

    const [primary, ...segments] = key.split('.');

    if (translations[primary]) {
      const subKey = segments.join('.');

      Logger.info(
        `Missing top-level translation for '${fullKey}.${locale}', trying sub-key '${subKey}.${locale}'`
      );

      return this._fetchTranslation(
        subKey,
        locale,
        options,
        translations[primary],
        fullKey
      );
    }

    if (options.defaultOnMissing && locale !== options.defaultLocale) {
      Logger.warn(
        `Missing locale for '${fullKey}.${locale}', replacing with '${
          options.defaultLocale
        }'`
      );

      return this._fetchTranslation(
        key,
        options.defaultLocale,
        options,
        translations,
        fullKey
      );
    }

    Logger.error(`Missing translation for '${fullKey}.${locale}'`);

    return { text: `Missing translation: ${fullKey}.${locale}`, missing: true };
  }
}
