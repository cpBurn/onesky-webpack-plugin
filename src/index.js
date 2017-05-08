'use strict';

import onesky from 'onesky-utils';
import jsonfile from 'jsonfile';
import path from 'path';

const multiLanguage = 'I18NEXT_MULTILINGUAL_JSON';
let opts = {};

const logError = (msg) => console.log(chalk.red(msg));
const onCompleted = (res) => res;
const onError = (error) => logError(error.message);

const processOptions = (opts) => {
    const pluginName = 'Webpack OneSky';
    if (!opts.apiKey || !opts.secret) {
        logError(pluginName + ' - Something is wrong :/ Public and Secret Key must be specified :)');
    }

    if (!opts.projectId) {
        logError(pluginName + ' - Something is wrong :/ Please specify the Project ID');
    }

    if (!opts.fileName) {
        logError(pluginName + ' - Something is wrong :/ We need to know the fileName to download :p');
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

    opts.onCompleted = opts.onCompleted || onCompleted;
    opts.onError = opts.onError || onError;

    return opts;
};

const WebpackOneSky = (options) => {
    opts = processOptions(options);
};

WebpackOneSky.prototype = {
    apply: (compiler) => {
        compiler.plugin('run', () => {
            const file = path.join(compiler.options.context, opts.outputFile);
            const request = (opts.format === multiLanguage) ? onesky.getMultilingualFile(opts) : onesky.getFile(opts);
            request.catch(opts.onError(error));

            return request.then((data) => {
                jsonfile.writeFile(file, opts.onCompleted(JSON.parse(data)), opts.onError(error));
            });
        });
    }
};

module.exports = WebpackOneSky;
