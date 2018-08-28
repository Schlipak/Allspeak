# Allspeak

Front-end standalone i18n library

## Installation

Download or clone the Allspeak repository

```
git clone https://github.com/Schlipak/Allspeak.git
```

## Usage

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

const options = {
  dataKey: 'data-key',        // Attribute key used to lookup the translations
  debug: false,               // Prints debug information to the console
  defaultLocale: 'en',        // Locale to default to if no translation is found
  defaultOnMissing: false,    // Attempt to translate to defaultLocale on missing translation
  escapeTranslation: true,    // Escape the translation results. If false, outputs HTML.
  rootElement: document.body, // Scope in which translations are applied
};

const speak = new Allspeak(translations, options);

/*
Use Allspeak#trans to translate the document
Allspeak handles regional locales:

const translations = {
  colour: {
    'en-GB': 'colour',
    'en-US': 'color',
  },
  foo: {
    en: 'bar',
  },
};

The key 'foo' will be translated as 'bar' no matter the regional english locale, but the
key 'colour' will be translated accordingly.
*/
speak.trans(navigator.language);
```
