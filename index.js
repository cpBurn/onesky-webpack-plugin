var request = require('request');
var onesky = require('onesky-utils');
var jsonfile = require('jsonfile');

var multiLanguage = 'I18NEXT_MULTILINGUAL_JSON';

var processOptions = function (opts) {
    var pluginName = 'Webpack OneSky';
    if (!opts.publicKey || !opts.secretKey)
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
        opts.outputFile = opts.sourceFile + '.i18n.json';

    return {
        'secret': opts.secretKey,
        'apiKey': opts.publicKey,
        'projectId': opts.projectId,
        'fileName': opts.fileName,
        'language': opts.language,
        'format': opts.format
    }
};

function WebpackOneSky(opts) {
    this.opts = processOptions(opts);
}

WebpackOneSky.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function (compilation, params) {
        compilation.plugin('before-chunk-assets', function () {
            var file = this.opts.outputFile;

            var request =  this.opts.format === multiLanguage ? onesky.getMultilingualFile(options) : onesky.getFile(this.opts);
            request.catch(function (error) {
                throw new Error(error);
            });

            return request.then(function(data) {
                jsonfile.writeFile(file, data, function (error)  {
                    throw new Error(error);
                });
            });
        });
    });
};
