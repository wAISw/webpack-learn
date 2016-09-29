'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/frontend',
    entry: {
        home: "./home",
        app: "./app",
        about: "./about",
        common: ["./welcome", "./common"]
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: "[name].js",
        library: "[name]"
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,
    plugins: [
        new webpack.ProvidePlugin({
            pluck: 'lodash/map'
        }),
        new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /ru|en-gb/),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['about', 'home']
        })
    ],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
        root: __dirname + '/vendor',
        alias: {
            old: 'old/dist/old'
        }
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: __dirname + '/frontend',
            loader: 'babel',
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }, {
            test: /old.js$/,
            loader: "imports?workSettings=>{delay:500}!exports?Work"
        }],
        noParse: /\/node_modules\/(angular\/angular|jquery)/
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}