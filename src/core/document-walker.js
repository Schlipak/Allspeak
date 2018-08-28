import { Logger } from '../utils';

export default class DocumentWalker {
  constructor(root, dataKey) {
    this.root = root;
    this.dataKey = dataKey;
  }

  walk(locale, callback) {
    /* develblock:start */
    Logger.log('Walking document...');
    /* develblock:end */

    Array.from(this.root.querySelectorAll(`[${this.dataKey}]`)).forEach(
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
