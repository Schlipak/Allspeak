# Allspeak<br/>ᚨᛚᛚᛊᛈᛖᚨᚲ

Front-end standalone i18n library

| Build type            | File size |
| --------------------- | --------: |
| Development           | 23.2 kB   |
| Production (minified) | 9.5 kB    |
| Production (gzipped)  | 2.8 kB    |

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

Create your translation files

```json
// /translations/en.json
{
  "key": "Value",
  "nested": {
    "key": "Another value"
  }
}

// /translations/fr.json
{
  "key": "Valeur",
  "nested": {
    "key": "Une autre valeur"
  }
}
```

Script your translations

```js
const options = {
  dataKey: 'data-key',        // Attribute key used to lookup the translations

                              // Attribute added to a node when its translation is missing
  dataMissingTranslation: 'data-missing-translation',

                              // Attribute added to a node during its translation
  dataTranslatingKey: 'data-translating',

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
 * A locale such as en-GB will attempt to load the en-GB.json file,
 * but will gracefully fallback to the default en.json if a localized
 * translation is not found.
 *
 * The path given to the Allspeak constructor must be a template path to your translations,
 * where {} will be replaced by the locale.
*/
new Allspeak('translations/{}.json', options).then(speak => {
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

  speak.trans(navigator.language, ...scopes).then(translatedScopes => {
    // Run after all translations are done
  });
});
```

You can retreive the current in-memory translation data using the `Allspeak.translations` property.
You can also subscribe to `onTranslationLoaded` to be notified when translation data changes:

```js
new Allspeak('translations/{}.json', { asyncLoad: true }).then(speak => {
  // ...

  speak.onTranslationLoaded(translations => {
    // Do something with the new translation data.
    // In async mode, newly loaded translations do not replace the data, they are appended.
  });
});
```
