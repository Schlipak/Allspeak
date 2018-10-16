import DEFAULT_OPTIONS from './default-options';

export default class AsyncTranslator {
  constructor(path) {
    this.path = path;
    this.translations = {};
    this.onTranslationLoadedCallback = null;
  }

  onTranslationLoaded(callback) {
    this.onTranslationLoadedCallback = callback;
  }

  triggerOnTranslationLoaded() {
    if (this.onTranslationLoadedCallback) {
      this.onTranslationLoadedCallback(this.translations);
    }
  }

  preload(translations = this.translations) {
    return new Promise((resolve, reject) => {
      fetch(translations, { method: 'GET' })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return reject(`Request rejected with status ${response.status}`);
        })
        .then(json => resolve(json))
        .catch(err => reject(`Request error: ${err}`));
    });
  }

  loadLocale(locale) {
    return new Promise((resolve) => {
      if (this.translations[locale]) {
        return resolve(locale);
      }

      if (locale.includes('-')) {
        const superLocale = locale.split('-')[0];

        if (this.translations[superLocale]) {
          return resolve(superLocale);
        }
      }

      return this.preload(this.path.replace('{}', locale), false).then(
        (translations) => {
          this.translations[locale] = translations;
          this.triggerOnTranslationLoaded();
          return resolve(locale);
        },
        () => {
          if (locale.includes('-')) {
            this.loadLocale(locale.split('-')[0]).then(superLocale => resolve(superLocale));
          }
        },
      );
    });
  }

  findLocale(translations, locale, options, fullKey) {
    return new Promise((resolve) => {
      if (typeof translations[locale] !== typeof {}) {
        return this.loadLocale(locale).then((resolvedLocale) => {
          const args = [translations, resolvedLocale, options, fullKey];
          return resolve(this.findLocale(...args));
        });
      }

      if (typeof translations[locale] === typeof {}) {
        return resolve([translations[locale], locale]);
      }

      if (locale.includes('-')) {
        const superLocale = locale.split('-')[0];
        const args = [translations, superLocale, options, fullKey];

        return this.findLocale(...args).then(resLoc => resolve(resLoc));
      }

      if (options.defaultOnMissing && locale !== options.defaultLocale) {
        const args = [translations, options.defaultLocale, options, fullKey];

        return this.findLocale(...args).then(resLoc => resolve(resLoc));
      }

      return resolve([null, locale]);
    });
  }

  getTranslation(key, locale, options = {}, translations = this.translations, fullKey = key) {
    return new Promise((resolve) => {
      resolve(this.fetchTranslation(key, locale, options, translations, fullKey));
    }).catch((err) => {
      throw new Error(`getTranslation failed with ${err}`);
    });
  }

  fetchTranslation(key, locale, userOptions = {}, translations = this.translations, fullKey = key) {
    return new Promise((resolve) => {
      const options = { ...DEFAULT_OPTIONS, ...userOptions };

      this.findLocale(translations, locale, options, fullKey).then(
        ([resolvedTranslations, resolvedLocale]) => {
          if (!resolvedTranslations) {
            resolve({
              text: `Missing translation: ${resolvedLocale}.${fullKey}`,
              missing: true,
            });
          }

          const translation = this.deepFetchTranslation(
            resolvedTranslations,
            resolvedLocale,
            fullKey,
          );

          if (
            translation.missing
            && options.defaultOnMissing
            && resolvedLocale !== options.defaultLocale
          ) {
            resolve(
              this.fetchTranslation(key, options.defaultLocale, userOptions, translations, fullKey),
            );
          }

          resolve(translation);
        },
      );
    });
  }

  deepFetchTranslation(translations, locale, key, fullKey = key) {
    if (typeof translations[key] === typeof '') {
      return {
        text: translations[key],
        missing: false,
      };
    }

    const [primary, ...segments] = key.split('.');
    if (typeof translations[primary] === typeof {}) {
      const subKey = segments.join('.');
      return this.deepFetchTranslation(translations[primary], locale, subKey, fullKey);
    }

    return { text: `Missing translation: ${locale}.${fullKey}`, missing: true };
  }
}
