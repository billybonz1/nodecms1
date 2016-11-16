"use strict";
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
    entry: __dirname + '/app/public/js/app.js',
    output: {
        path: __dirname + "/app/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['latest']
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']},
            { test: /\.html$/, loader: 'raw' },
            { test: /\.jade$/, loader: 'jade-loader' },
            // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            // helps to load bootstrap's css.
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff' },
            { test: /\.woff2$/,
                loader: 'url?limit=10000&minetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml' }
        ]
    },
    plugins: [

    ],
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        inline: true
    },
    watch: NODE_ENV == "development",
    devtool: NODE_ENV == "development" ? "eval" : null
};


if(NODE_ENV == 'production'){
    module.exports.plugins.push(
        new UglifyJsPlugin({
              beautify: false, //prod
              mangle: { screw_ie8 : true }, //prod
              compress: { screw_ie8: true }, //prod
              comments: false //prod
        })
    );
}