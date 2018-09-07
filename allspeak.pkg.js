/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tmp/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./tmp/core/allspeak.js":
/*!******************************!*\
  !*** ./tmp/core/allspeak.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.DEFAULT_OPTIONS = undefined;\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./tmp/utils/index.js\");\n\nvar _documentWalker = __webpack_require__(/*! ./document-walker */ \"./tmp/core/document-walker.js\");\n\nvar _documentWalker2 = _interopRequireDefault(_documentWalker);\n\nvar _translator = __webpack_require__(/*! ./translator */ \"./tmp/core/translator.js\");\n\nvar _translator2 = _interopRequireDefault(_translator);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar DEFAULT_OPTIONS = exports.DEFAULT_OPTIONS = {\n  dataKey: 'data-key',\n  dataMissingTranslation: 'data-missing-translation',\n  debug: false,\n  defaultLocale: 'en',\n  defaultOnMissing: false,\n  escapeTranslation: true,\n  hideDuringTrans: false,\n  rootElement: document.body,\n  scopeKey: 'data-scope'\n};\n\nvar ALLSPEAK_INFO_STYLE = 'background: #467972;\\n  color: #FFF;\\n  font-size: 1.5em;\\n  padding: .5em 1em;\\n  border-radius: 1.5em;';\n\nvar Allspeak = function () {\n  function Allspeak() {\n    var _this = this;\n\n    var translations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _classCallCheck(this, Allspeak);\n\n    this.options = Object.assign({}, DEFAULT_OPTIONS, options);\n\n    /* develblock:start */\n    _utils.Logger.setDebugMode(this.options.debug);\n    /* develblock:end */\n\n    if (this.options.hideDuringTrans) {\n      this.options.rootElement.style = 'display: none;';\n    }\n\n    return new Promise(function (resolve, reject) {\n      if ((typeof translations === 'undefined' ? 'undefined' : _typeof(translations)) === _typeof('')) {\n        fetch(translations, { method: 'GET' }).then(function (response) {\n          if (response.ok) {\n            return response.json();\n          }\n\n          throw new Error('Request rejected with status ' + response.status);\n        }).then(function (json) {\n          _this.__initialize(json);\n          resolve(_this);\n        }).catch(function (error) {\n          reject(error);\n        });\n      } else {\n        _this.__initialize(translations);\n        resolve(_this);\n      }\n    });\n  }\n\n  _createClass(Allspeak, [{\n    key: '__initialize',\n    value: function __initialize(translations) {\n      Object.defineProperty(this, 'translator', {\n        value: new _translator2.default(translations),\n        enumerable: false,\n        configurable: false,\n        writable: false\n      });\n\n      Object.defineProperty(this, 'documentWalker', {\n        value: new _documentWalker2.default(this.options.dataKey),\n        enumerable: false,\n        configurable: false,\n        writable: false\n      });\n\n      Object.defineProperty(this, 'scopes', {\n        value: {},\n        enumerable: false,\n        configurable: false,\n        writable: true\n      });\n\n      /* develblock:start */\n      _utils.Logger.style('Allspeak // Front-end i18n library', ALLSPEAK_INFO_STYLE);\n      /* develblock:end */\n    }\n  }, {\n    key: 'trans',\n    value: function trans(locale) {\n      var _this2 = this;\n\n      var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.rootElement;\n\n      if ((typeof scope === 'undefined' ? 'undefined' : _typeof(scope)) === _typeof('')) {\n        if (this.scopes[scope]) {\n          scope = this.scopes[scope];\n        } else {\n          var scopeElement = document.querySelector('[' + this.options.scopeKey + '=\"' + scope + '\"]');\n          this.scopes[scope] = scopeElement;\n\n          /* develblock:start */\n          _utils.Logger.info('Caching element', scopeElement, 'with scope \"' + scope + '\"');\n          /* develblock:end */\n\n          scope = scopeElement;\n        }\n      }\n\n      /* develblock:start */\n      _utils.Logger.info('=== Translating scope', scope, 'to locale ' + locale);\n      /* develblock:end */\n\n      this.documentWalker.walk(locale, scope, function (node, key, locale) {\n        /* develblock:start */\n        _utils.Logger.log('-- Starting translation for \\'' + key + '\\'');\n        /* develblock:end */\n\n        var translation = _this2.translator.getTranslation(key, locale, _this2.options);\n\n        if (!_this2.options.escapeTranslation) {\n          /* develblock:start */\n          _utils.Logger.log('- Applying raw translation...');\n          /* develblock:end */\n\n          node.innerHTML = translation.text;\n        } else {\n          /* develblock:start */\n          _utils.Logger.log('- Applying escaped translation...');\n          /* develblock:end */\n\n          var escapedTranslation = document.createElement('DIV');\n\n          escapedTranslation.appendChild(document.createTextNode(translation.text));\n          node.innerHTML = escapedTranslation.innerHTML;\n        }\n\n        if (translation.missing) {\n          node.setAttribute(_this2.options.dataMissingTranslation, '');\n        } else {\n          node.removeAttribute(_this2.options.dataMissingTranslation);\n        }\n\n        /* develblock:start */\n        _utils.Logger.log('-- Translation done');\n        /* develblock:end */\n      });\n\n      /* develblock:start */\n      _utils.Logger.info('=== Finished document translation');\n      /* develblock:end */\n\n      scope.setAttribute('lang', locale);\n      if (this.options.hideDuringTrans) {\n        scope.style = '';\n      }\n\n      for (var _len = arguments.length, otherScopes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n        otherScopes[_key - 2] = arguments[_key];\n      }\n\n      if (otherScopes && otherScopes.length) {\n        this.trans.apply(this, [locale].concat(otherScopes));\n      }\n    }\n  }]);\n\n  return Allspeak;\n}();\n\nexports.default = Allspeak;\n\n//# sourceURL=webpack:///./tmp/core/allspeak.js?");

/***/ }),

/***/ "./tmp/core/document-walker.js":
/*!*************************************!*\
  !*** ./tmp/core/document-walker.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./tmp/utils/index.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar DocumentWalker = function () {\n  function DocumentWalker(dataKey) {\n    _classCallCheck(this, DocumentWalker);\n\n    this.dataKey = dataKey;\n  }\n\n  _createClass(DocumentWalker, [{\n    key: 'walk',\n    value: function walk(locale, scope, callback) {\n      var _this = this;\n\n      if (scope.getAttribute('lang') === locale) {\n        /* develblock:start */\n        _utils.Logger.info('=== Skipping translation, root is already in locale ' + locale);\n        /* develblock:end */\n        return;\n      }\n\n      /* develblock:start */\n      _utils.Logger.log('Walking document...');\n      /* develblock:end */\n\n      Array.from(scope.querySelectorAll('[' + this.dataKey + ']')).forEach(function (element) {\n        var key = element.getAttribute(_this.dataKey);\n\n        if (key) {\n          /* develblock:start */\n          _utils.Logger.log('Found target element:', element);\n          /* develblock:end */\n\n          callback(element, key, locale);\n        }\n      });\n    }\n  }]);\n\n  return DocumentWalker;\n}();\n\nexports.default = DocumentWalker;\n\n//# sourceURL=webpack:///./tmp/core/document-walker.js?");

/***/ }),

/***/ "./tmp/core/index.js":
/*!***************************!*\
  !*** ./tmp/core/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _allspeak = __webpack_require__(/*! ./allspeak */ \"./tmp/core/allspeak.js\");\n\nObject.defineProperty(exports, 'default', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_allspeak).default;\n  }\n});\nObject.defineProperty(exports, 'DEFAULT_OPTIONS', {\n  enumerable: true,\n  get: function get() {\n    return _allspeak.DEFAULT_OPTIONS;\n  }\n});\n\nvar _documentWalker = __webpack_require__(/*! ./document-walker */ \"./tmp/core/document-walker.js\");\n\nObject.defineProperty(exports, 'DocumentWalker', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_documentWalker).default;\n  }\n});\n\nvar _translator = __webpack_require__(/*! ./translator */ \"./tmp/core/translator.js\");\n\nObject.defineProperty(exports, 'Translator', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_translator).default;\n  }\n});\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./tmp/core/index.js?");

/***/ }),

/***/ "./tmp/core/translator.js":
/*!********************************!*\
  !*** ./tmp/core/translator.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./tmp/utils/index.js\");\n\nvar _ = __webpack_require__(/*! . */ \"./tmp/core/index.js\");\n\nfunction _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Translator = function () {\n  function Translator(translations) {\n    _classCallCheck(this, Translator);\n\n    this.translations = translations;\n  }\n\n  _createClass(Translator, [{\n    key: 'getTranslation',\n    value: function getTranslation(key, locale) {\n      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n      var translations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.translations;\n      var fullKey = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : key;\n\n      options = Object.assign({}, _.DEFAULT_OPTIONS, options);\n\n      if (fullKey === key) {\n        /* develblock:start */\n        _utils.Logger.log('Translating key \\'' + key + '.' + locale + '\\'');\n        /* develblock:end */\n      } else {\n        /* develblock:start */\n        _utils.Logger.log('> Translating sub-key \\'' + key + '.' + locale + '\\'');\n        /* develblock:end */\n      }\n\n      if (_typeof(translations[key]) === _typeof({})) {\n        if (_typeof(translations[key][locale]) === _typeof('')) {\n          /* develblock:start */\n          _utils.Logger.log('Found translation for \\'' + fullKey + '.' + locale + '\\'');\n          /* develblock:end */\n\n          return { text: translations[key][locale], missing: false };\n        } else {\n          if (locale.includes('-')) {\n            var superLocale = locale.split('-')[0];\n\n            /* develblock:start */\n            _utils.Logger.warn('Missing locale for \\'' + fullKey + '.' + locale + '\\', trying with superLocale \\'' + superLocale + '\\'');\n            /* develblock:end */\n\n            return this.getTranslation(key, superLocale, options, translations, fullKey);\n          }\n\n          if (options.defaultOnMissing && locale !== options.defaultLocale) {\n            /* develblock:start */\n            _utils.Logger.warn('Missing locale for \\'' + fullKey + '.' + locale + '\\', replacing with \\'' + options.defaultLocale + '\\'');\n            /* develblock:end */\n\n            return this.getTranslation(key, options.defaultLocale, options, translations, fullKey);\n          }\n\n          /* develblock:start */\n          _utils.Logger.error('Missing translation for \\'' + fullKey + '.' + locale + '\\'');\n          /* develblock:end */\n\n          return {\n            text: 'Missing translation: ' + fullKey + '.' + locale,\n            missing: true\n          };\n        }\n      }\n\n      var _key$split = key.split('.'),\n          _key$split2 = _toArray(_key$split),\n          primary = _key$split2[0],\n          segments = _key$split2.slice(1);\n\n      if (translations[primary]) {\n        var subKey = segments.join('.');\n\n        /* develblock:start */\n        _utils.Logger.info('Missing top-level translation for \\'' + fullKey + '.' + locale + '\\', trying sub-key \\'' + subKey + '.' + locale + '\\'');\n        /* develblock:end */\n\n        return this.getTranslation(subKey, locale, options, translations[primary], fullKey);\n      }\n\n      if (options.defaultOnMissing && locale !== options.defaultLocale) {\n        /* develblock:start */\n        _utils.Logger.warn('Missing locale for \\'' + fullKey + '.' + locale + '\\', replacing with \\'' + options.defaultLocale + '\\'');\n        /* develblock:end */\n\n        return this.getTranslation(key, options.defaultLocale, options, translations, fullKey);\n      }\n\n      /* develblock:start */\n      _utils.Logger.error('Missing translation for \\'' + fullKey + '.' + locale + '\\'');\n      /* develblock:end */\n\n      return { text: 'Missing translation: ' + fullKey + '.' + locale, missing: true };\n    }\n  }]);\n\n  return Translator;\n}();\n\nexports.default = Translator;\n\n//# sourceURL=webpack:///./tmp/core/translator.js?");

/***/ }),

/***/ "./tmp/index.js":
/*!**********************!*\
  !*** ./tmp/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _core = __webpack_require__(/*! ./core */ \"./tmp/core/index.js\");\n\nObject.keys(_core).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _core[key];\n    }\n  });\n});\n\nvar _core2 = _interopRequireDefault(_core);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nif (window) {\n  window.Allspeak = _core2.default;\n}\n\n//# sourceURL=webpack:///./tmp/index.js?");

/***/ }),

/***/ "./tmp/utils/index.js":
/*!****************************!*\
  !*** ./tmp/utils/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _logger = __webpack_require__(/*! ./logger */ \"./tmp/utils/logger.js\");\n\nObject.defineProperty(exports, 'Logger', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_logger).default;\n  }\n});\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./tmp/utils/index.js?");

/***/ }),

/***/ "./tmp/utils/logger.js":
/*!*****************************!*\
  !*** ./tmp/utils/logger.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/* eslint-disable no-console */\nexports.default = {\n  isDebugMode: false,\n\n  setDebugMode: function setDebugMode(state) {\n    this.isDebugMode = state;\n  },\n  debug: function debug() {\n    if (this.isDebugMode) {\n      var _console;\n\n      (_console = console).debug.apply(_console, _toConsumableArray(this.modeMessage('ᚨ', 'debug')).concat(Array.prototype.slice.call(arguments)));\n    }\n  },\n  log: function log() {\n    if (this.isDebugMode) {\n      var _console2;\n\n      (_console2 = console).log.apply(_console2, _toConsumableArray(this.modeMessage('ᚨ', 'log')).concat(Array.prototype.slice.call(arguments)));\n    }\n  },\n  info: function info() {\n    if (this.isDebugMode) {\n      var _console3;\n\n      (_console3 = console).info.apply(_console3, _toConsumableArray(this.modeMessage('ᚨ', 'info')).concat(Array.prototype.slice.call(arguments)));\n    }\n  },\n  warn: function warn() {\n    if (this.isDebugMode) {\n      var _console4;\n\n      (_console4 = console).warn.apply(_console4, _toConsumableArray(this.modeMessage('ᚨ', 'warn')).concat(Array.prototype.slice.call(arguments)));\n    }\n  },\n  error: function error() {\n    if (this.isDebugMode) {\n      var _console5;\n\n      (_console5 = console).error.apply(_console5, _toConsumableArray(this.modeMessage('ᚨ', 'error')).concat(Array.prototype.slice.call(arguments)));\n    }\n  },\n  style: function style(message, _style) {\n    if (this.isDebugMode) {\n      console.log('%c' + message, _style);\n    }\n  },\n  modeMessage: function modeMessage(message, mode) {\n    return ['%c' + message, this.renderStyle(mode)];\n  },\n  renderStyle: function renderStyle(mode) {\n    var color = {\n      log: '#212121',\n      info: '#2980b9',\n      debug: '#9b59b6',\n      warn: '#d35400',\n      error: '#c0392b'\n    }[mode];\n\n    return '\\n      background: ' + color + '30;\\n      color: ' + color + ';\\n      font-size: 1em;\\n      font-weight: bold;\\n      padding: 0.4em 0.675em;\\n      border-radius: 2em;\\n    ';\n  }\n};\n/* eslint-enable no-console */\n\n//# sourceURL=webpack:///./tmp/utils/logger.js?");

/***/ })

/******/ });