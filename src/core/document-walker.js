export default class DocumentWalker {
  constructor(dataKey) {
    this.dataKey = dataKey;
  }

  prepareWalk(locale, scope, options) {
    return new Promise((resolve) => {
      if (scope.getAttribute('lang') === locale) {
        throw new Error(`Scope is already in target locale '${locale}'`);
      }

      const elements = Array.from(scope.querySelectorAll(`[${this.dataKey}]`));

      elements.forEach(element => element.setAttribute(options.dataTranslatingKey, ''));
      resolve(elements);
    });
  }

  walk(locale, scope, elements, options, callback) {
    elements.forEach((element) => {
      const key = element.getAttribute(this.dataKey);

      if (key) {
        callback(element, key, locale);
        element.removeAttribute(options.dataTranslatingKey);
      }
    });
  }
}
