import { Logger } from '../utils';

export default class DocumentWalker {
  constructor(dataKey) {
    this.dataKey = dataKey;
  }

  walk(locale, scope, callback) {
    if (scope.getAttribute('lang') === locale) {
      /* develblock:start */
      Logger.info(
        `=== Skipping translation, root is already in locale ${locale}`
      );
      /* develblock:end */
      return;
    }

    /* develblock:start */
    Logger.log('Walking document...');
    /* develblock:end */

    Array.from(scope.querySelectorAll(`[${this.dataKey}]`)).forEach(
      element => {
        const key = element.getAttribute(this.dataKey);

        if (key) {
          /* develblock:start */
          Logger.log('Found target element:', element);
          /* develblock:end */

          callback(element, key, locale);
        }
      }
    );
  }
}
