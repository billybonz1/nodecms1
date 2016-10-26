"use strict";

module.exports = {
    context: __dirname + '/app/public',
    entry: './index.js',
    output: {
        path: __dirname + "/app/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: "/\.js$/", loader: 'babel'}
        ]
    },
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        inline: true
    },
    watch: true
};