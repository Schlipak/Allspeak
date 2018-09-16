# Allspeak<br/>ᚨᛚᛚᛊᛈᛖᚨᚲ

Front-end standalone i18n library

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
  dataKey: 'data-key',        // Attribute key used to lookup the translations

                              // Attribute added to a node when its translation is missing
  dataMissingTranslation: 'data-missing-translation',

  debug: false,               // Prints debug information to the console.
                              // > Does nothing in production builds.
  defaultLocale: 'en',        // Locale to default to if no translation is found
  defaultOnMissing: false,    // Attempt to translate to defaultLocale on missing translation
                              // > A `Missing translation` message will be displayed if false
  escapeTranslation: true,    // Escape the translation results. If false, outputs raw HTML.
  hideDuringTrans: false,     // Hides the scope during translation to prevent seeing the content flash
                              // Only use this option if you are going to translate the document right away
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
