module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("jsonfile");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("onesky-utils");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _oneskyUtils = __webpack_require__(2);

var _oneskyUtils2 = _interopRequireDefault(_oneskyUtils);

var _jsonfile = __webpack_require__(1);

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _chalk = __webpack_require__(0);

var _chalk2 = _interopRequireDefault(_chalk);

var _path = __webpack_require__(3);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var multiLanguage = 'I18NEXT_MULTILINGUAL_JSON';
var opts = {};

var logError = function logError(msg) {
    return console.log(_chalk2.default.red(msg));
};
var onCompleted = function onCompleted(res) {
    return res;
};
var onError = function onError(error) {
    return logError(error.message);
};

var processOptions = function processOptions(opts) {
    var pluginName = 'Webpack OneSky';

    if (!opts.language) {
        opts.language = 'en_EN';
    }

    if (opts.multiLanguage && !opts.format) {
        opts.format = multiLanguage;
    }

    if (!opts.outputFile) {
        opts.outputFile = opts.fileName;
    }

    opts.onCompleted = opts.onCompleted || onCompleted;
    opts.onError = opts.onError || onError;

    if (!opts.apiKey || !opts.secret) {
        opts.onError({
            message: pluginName + ' - Something is wrong :/ Public and Secret Key must be specified :)'
        });
    }

    if (!opts.projectId) {
        opts.onError({
            message: pluginName + ' - Something is wrong :/ Please specify the Project ID'
        });
    }

    if (!opts.fileName) {
        opts.onError({
            message: pluginName + ' - Something is wrong :/ We need to know the fileName to download :p'
        });
    }

    return opts;
};

var WebpackOneSky = function WebpackOneSky(options) {
    opts = processOptions(options);
};

WebpackOneSky.prototype = {
    apply: function apply(compiler) {
        compiler.plugin('run', function () {
            var file = _path2.default.join(compiler.options.context, opts.outputFile);
            var request = opts.format === multiLanguage ? _oneskyUtils2.default.getMultilingualFile(opts) : _oneskyUtils2.default.getFile(opts);
            request.catch(opts.onError(error));

            return request.then(function (data) {
                _jsonfile2.default.writeFile(file, opts.onCompleted(JSON.parse(data)), opts.onError(error));
            });
        });
    }
};

module.exports = WebpackOneSky;

/***/ })
/******/ ]);