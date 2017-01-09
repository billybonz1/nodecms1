const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: [
        './app/public/app.module.js'
    ],
    output: {
        path: './app/public/',
        filename: 'bundle.js'
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'Webpack Starter Angular - kitconcept',
        //     template: 'app/index.html',
        //     minify: {
        //         collapseWhitespace: true,
        //         removeComments: true,
        //         removeRedundantAttributes: true,
        //         removeScriptTypeAttributes: true,
        //         removeStyleLinkTypeAttributes: true
        //     }
        // })
        new ngAnnotatePlugin({
            add: true,
            // other ng-annotate options here
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']},
            { test: /\.html$/, loader: 'raw' },
            { test: /\.jade$/, loader: 'jade-loader' },
            // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            // helps to load bootstrap's css.
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        inline: true
    }
};
