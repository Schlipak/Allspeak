import { Logger } from '../utils';

export default class Translator {
  constructor(translations) {
    this.translations = translations;
  }

  getTranslation(
    key,
    locale,
    options,
    translations = this.translations,
    fullKey = key
  ) {
    if (fullKey === key) {
      /* develblock:start */
      Logger.log(`Translating key '${key}.${locale}'`);
      /* develblock:end */
    } else {
      /* develblock:start */
      Logger.log(`> Translating sub-key '${key}.${locale}'`);
      /* develblock:end */
    }

    if (translations[key]) {
      if (translations[key][locale]) {
        /* develblock:start */
        Logger.log(`Found translation for '${fullKey}.${locale}'`);
        /* develblock:end */

        return { text: translations[key][locale], missing: false };
      } else {
        if (locale.includes('-')) {
          const superLocale = locale.split('-')[0];

          /* develblock:start */
          Logger.warn(
            `Missing locale for '${fullKey}.${locale}', trying with superLocale '${superLocale}'`
          );
          /* develblock:end */

          return this.getTranslation(
            key,
            superLocale,
            options,
            translations,
            fullKey
          );
        }

        if (options.defaultOnMissing && locale !== options.defaultLocale) {
          /* develblock:start */
          Logger.warn(
            `Missing locale for '${fullKey}.${locale}', replacing with '${
              options.defaultLocale
            }'`
          );
          /* develblock:end */

          return this.getTranslation(
            key,
            options.defaultLocale,
            options,
            translations,
            fullKey
          );
        }

        /* develblock:start */
        Logger.error(`Missing translation for '${fullKey}.${locale}'`);
        /* develblock:end */

        return {
          text: `Missing translation: ${fullKey}.${locale}`,
          missing: true,
        };
      }
    }

    const [primary, ...segments] = key.split('.');

    if (translations[primary]) {
      const subKey = segments.join('.');

      /* develblock:start */
      Logger.info(
        `Missing top-level translation for '${fullKey}.${locale}', trying sub-key '${subKey}.${locale}'`
      );
      /* develblock:end */

      return this.getTranslation(
        subKey,
        locale,
        options,
        translations[primary],
        fullKey
      );
    }

    if (options.defaultOnMissing && locale !== options.defaultLocale) {
      /* develblock:start */
      Logger.warn(
        `Missing locale for '${fullKey}.${locale}', replacing with '${
          options.defaultLocale
        }'`
      );
      /* develblock:end */

      return this.getTranslation(
        key,
        options.defaultLocale,
        options,
        translations,
        fullKey
      );
    }

    /* develblock:start */
    Logger.error(`Missing translation for '${fullKey}.${locale}'`);
    /* develblock:end */

    return { text: `Missing translation: ${fullKey}.${locale}`, missing: true };
  }
}
