import { Logger } from '../utils';

export default class DocumentWalker {
  constructor(dataKey) {
    this.dataKey = dataKey;
  }

  prepareWalk(locale, scope, options) {
    return new Promise((resolve, reject) => {
      if (scope.getAttribute('lang') === locale) {
        /* develblock:start */
        Logger.info(`== Skipping walk, root is already in locale ${locale}`);
        /* develblock:end */
        return reject();
      }

      /* develblock:start */
      Logger.log('Preparing document walk...');
      /* develblock:end */

      const elements = Array.from(scope.querySelectorAll(`[${this.dataKey}]`));
      elements.forEach(element =>
        element.setAttribute(options.dataTranslatingKey, '')
      );

      resolve(elements);
    });
  }

  walk(locale, scope, elements, options, callback) {
    /* develblock:start */
    Logger.log('Walking document...');
    /* develblock:end */

    elements.forEach(element => {
      const key = element.getAttribute(this.dataKey);

      if (key) {
        /* develblock:start */
        Logger.log('Found target element:', element);
        /* develblock:end */

        callback(element, key, locale);
        element.removeAttribute(options.dataTranslatingKey);
      }
    });
  }
}
