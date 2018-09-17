# Allspeak<br/>ᚨᛚᛚᛊᛈᛖᚨᚲ

Front-end standalone i18n library

| Build type            | File size |
| --------------------- | --------: |
| Development           | 35.9 kB   |
| Production (minified) | 12.5 kB   |
| Production (gzipped)  | 3.1 kB    |

## Installation

Download or clone the Allspeak repository

```
git clone https://github.com/Schlipak/Allspeak.git
```

## Usage

Import the Allspeak package in your HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>...</head>
<body>
  <div data-key="key">Default value</div>
  <div data-key="nested.key">Another default value</div>

  <script src="scripts/allspeak.min.js"></script>
  <script src="scripts/main.js"></script>
</body>
</html>
```

Or use the ES6 import in your JavaScript

```js
import Allspeak from 'allspeak';
```

Script your translations

```js
// Define your translations
const translations = {
  key: {
    en: 'Value',
    fr: 'Valeur',
  },
  nested: {
    key: {
      en: 'Another value',
      fr: 'Une autre valeur',
    },
  },
};

// Translations can also be loaded from a JSON file
// Simply replace the translation object with a string URL of the file

const options = {
  asyncLoad: false,           // Changes the translation loading strategy to async
                              // > See `Asynchronously load translations`
  dataKey: 'data-key',        // Attribute key used to lookup the translations

                              // Attribute added to a node when its translation is missing
  dataMissingTranslation: 'data-missing-translation',

                              // Attribute added to a node during its translation
  dataTranslatingKey: 'data-translating',

  debug: false,               // Prints debug information to the console.
                              // > Does nothing in production builds.
  defaultLocale: 'en',        // Locale to default to if no translation is found
  defaultOnMissing: false,    // Attempt to translate to defaultLocale on missing translation
                              // > A `Missing translation` message will be displayed if false
  escapeTranslation: true,    // Escape the translation results. If false, outputs raw HTML.
  hideDuringTrans: false,     // Hides the scope during translation to prevent seeing the content flash
                              // > Only use this option if you are translating the document right away
  rootElement: document.body, // Default scope in which translations are applied
  scopeKey: 'data-scope',     // Attribute used to lookup translation scopes by name
};

/**
 * Use Allspeak#trans to translate the document
 * Allspeak handles regional locales:
 *
 * const translations = {
 *   colour: {
 *     'en-GB': 'colour',
 *     'en-US': 'color',
 *   },
 *   foo: {
 *     en: 'bar',
 *   },
 * };
 *
 * The key 'foo' will be translated as 'bar' no matter the regional english locale, but the
 * key 'colour' will be translated accordingly.
*/
new Allspeak(translations, options).then(speak => {
  /**
   * scopes : HTMLElement|string
   *
   * Scope in which translations are applied
   * Optional, defaults to options.rootElement
   * Scope can be specified as a string, in which case the corresponding element will be
   * located according to the value of the option.scopeKey attribute.
   *
   * String-specified scopes are cached after the first fetch.
   *
   * You can specify multiple scopes to translate at once.
   */
  const scopes = [document.body];

  speak.trans(navigator.language, ...scopes);
});
```

## Asynchronously load translations

By default, Allspeak will load a single JSON blob, which is expected to contain all your translations.

If your application has a loarge amount of translations, this may be detrimental, as it will load a large amount
of data at once, and slow down your application.

You can instead separate your translations into different files, and use the `asyncLoad` option.
With `asyncLoad: true`, Allspeak will expect a translation URL in the form `path/to/translations.{}.json` where `{}` is a placeholder which will be replaced by the locale.
In this example, you will need to create a file named `translations.en.json` for your English locales.

Locale resolutions will work the same as in synchronous mode ; it will attempt to use regional locales where relevant, and fallback to a more general locale if not found.

Please note that the `Allspeak#trans` method will now return a Promise when used in async mode.

```js
new Allspeak('translations/{}.json', { asyncLoad: true }).then(speak => {
  speak.trans(navigator.language).then(() => {
    // After async translation
  });
});
```

You can retreive the current in-memory translation data using the `Allspeak.translations` property. You can also subscribe to `onTranslationLoaded` to be notified when translation data changes:

```js
new Allspeak('translations/{}.json', { asyncLoad: true }).then(speak => {
  // ...

  speak.onTranslationLoaded(translations => {
    // Do something with the new translation data.
    // In async mode, newly loaded translations do not replace the data, they are appended.
  });
});
```
