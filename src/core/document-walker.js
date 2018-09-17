import { Logger } from '../utils';

export default class DocumentWalker {
  constructor(dataKey) {
    this.dataKey = dataKey;
  }

  prepareWalk(locale, scope, options) {
    return new Promise((resolve, reject) => {
      if (scope.getAttribute('lang') === locale) {
        Logger.info(`== Skipping walk, root is already in locale ${locale}`);

        return reject();
      }

      Logger.log('Preparing document walk...');

      const elements = Array.from(scope.querySelectorAll(`[${this.dataKey}]`));
      elements.forEach(element =>
        element.setAttribute(options.dataTranslatingKey, '')
      );

      resolve(elements);
    });
  }

  walk(locale, scope, elements, options, callback) {
    Logger.log('Walking document...');

    elements.forEach(element => {
      const key = element.getAttribute(this.dataKey);

      if (key) {
        Logger.log('Found target element:', element);

        callback(element, key, locale);
        element.removeAttribute(options.dataTranslatingKey);
      }
    });
  }
}
