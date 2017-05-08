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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("jsonfile");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("onesky-utils");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var onesky = __webpack_require__(1);
var jsonfile = __webpack_require__(0);
var path = __webpack_require__(2);

var multiLanguage = 'I18NEXT_MULTILINGUAL_JSON';
var opts = {};

var processOptions = function processOptions(opts) {
    var pluginName = 'Webpack OneSky';
    if (!opts.apiKey || !opts.secret) {
        throw new Error(pluginName + ' - Something is wrong :/ Public and Secret Key must be specified :)');
    }

    if (!opts.projectId) {
        throw new Error(pluginName + ' - Something is wrong :/ Please specify the Project ID');
    }

    if (!opts.fileName) {
        throw new gutil.PluginError(pluginName + ' - Something is wrong :/ We need to know the fileName to download :p');
    }

    if (!opts.language) {
        opts.language = 'en_EN';
    }

    if (opts.multiLanguage && !opts.format) {
        opts.format = multiLanguage;
    }

    if (!opts.outputFile) {
        opts.outputFile = opts.fileName;
    }

    opts.onCompleted = opts.onCompleted || function (res) {
        return res;
    };

    return opts;
};

function WebpackOneSky(options) {
    opts = processOptions(options);
}

WebpackOneSky.prototype = {
    apply: function apply(compiler) {
        compiler.plugin('run', function () {
            var file = path.join(compiler.options.context, opts.outputFile);

            var request = opts.format === multiLanguage ? onesky.getMultilingualFile(opts) : onesky.getFile(opts);
            request.catch(function (error) {
                throw new Error(error);
            });

            return request.then(function (data) {
                jsonfile.writeFile(file, opts.onCompleted(JSON.parse(data)), function (error) {
                    if (error) {
                        throw new Error(error);
                    }
                });
            });
        });
    }
};

module.exports = WebpackOneSky;

/***/ })
/******/ ]);