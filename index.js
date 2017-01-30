'use strict';

var request = require('request');
var onesky = require('onesky-utils');
var jsonfile = require('jsonfile');

var multiLanguage = 'I18NEXT_MULTILINGUAL_JSON';
var opts = {};

var processOptions = function (opts) {
    var pluginName = 'Webpack OneSky';
    if (!opts.apiKey || !opts.secret)
        throw new Error(pluginName + ' - Something is wrong :/ Public and Secret Key must be specified :)');

    if (!opts.projectId)
        throw new Error(pluginName + ' - Something is wrong :/ Please specify the Project ID');

    if (!opts.fileName)
        throw new gutil.PluginError(pluginName + ' - Something is wrong :/ We need to know the fileName to download :p');

    if (!opts.language) {
        opts.language = 'en_EN';
    }

    if (opts.multiLanguage && !opts.format) {
        opts.format = multiLanguage;
    }

    if (!opts.outputFile)
        opts.outputFile = opts.fileName;

    return opts;
};

function WebpackOneSky(options) {
    opts = processOptions(options);
}

WebpackOneSky.prototype = {
    apply: function(compiler) {
        compiler.plugin('compilation', function (compilation, params) {
            var file = './' + opts.outputFile;

            var request = opts.format === multiLanguage ? onesky.getMultilingualFile(opts) : onesky.getFile(opts);
            request.catch(function (error) {
                throw new Error(error);
            });

            console.log('Downloading OneSky file...');
            return request.then(function (data) {
                jsonfile.writeFile(file, JSON.parse(data), function (error) {
                    if (error)
                        throw new Error(error);

                    console.log('File downloaded! ' + opts.outputFile);
                });
            });
        });
    }
};

module.exports = WebpackOneSky;
