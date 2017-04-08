module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        filename: 'index.js',
        path: './lib',
        library: 'onesky-webpack-plugin',
        libraryTarget: 'commonjs2',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, ]
    },
    externals: {
        "jsonfile": {
            commonjs2: "jsonfile"
        },
        "onesky-utils": {
            commonjs2: "onesky-utils"
        }
    }
};